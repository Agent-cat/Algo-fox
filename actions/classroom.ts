"use server";

import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { cacheKey, cachedFetch, CACHE_CONFIG, deleteFromCache } from "@/lib/cache-utils";

const classroomSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    section: z.string().optional().or(z.literal("")),
    subject: z.string().optional().or(z.literal("")),
    institutionId: z.string(),
});

function generateJoinCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

/**
 * Creates a new classroom.
 * Only ADMIN, INSTITUTION_MANAGER, or TEACHER roles can create classrooms.
 */
export async function createClassroom(data: z.infer<typeof classroomSchema>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    // Security check
    if (!["ADMIN", "INSTITUTION_MANAGER", "TEACHER"].includes(currentUser.role)) {
        return { success: false, error: "Unauthorized. Only teachers or managers can create classrooms." };
    }

    try {
        const validatedData = classroomSchema.parse(data);

        // Generate unique 6-character join code
        let joinCode = "";
        let isUnique = false;
        let attempts = 0;
        while (!isUnique && attempts < 10) {
            joinCode = generateJoinCode();
            const existing = await prisma.classroom.findUnique({
                where: { joinCode },
            });
            if (!existing) isUnique = true;
            attempts++;
        }

        if (!isUnique) {
            return { success: false, error: "Failed to generate a unique join code. Please try again." };
        }

        const classroom = await prisma.classroom.create({
            data: {
                name: validatedData.name,
                section: validatedData.section || null,
                subject: validatedData.subject || null,
                joinCode,
                institutionId: validatedData.institutionId,
                teacherId: currentUser.id,
            },
        });

        // Invalidate relevant caches
        revalidateTag(`teacher-classrooms-${currentUser.id}`, "max");
        revalidateTag(`institution-classrooms-${validatedData.institutionId}`, "max");
        revalidatePath("/dashboard/institution/classrooms");

        return { success: true, data: classroom };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: error.issues[0].message };
        }
        console.error("Failed to create classroom:", error);
        return { success: false, error: "Failed to create classroom" };
    }
}

/**
 * Allows a student to join a classroom using a 6-character code.
 * Also onboards the student to the institution if they are not already associated.
 */
export async function joinClassroom(code: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    try {

        const classroom = await prisma.classroom.findUnique({
            where: { joinCode: code.toUpperCase() },
            include: {
                students: {
                    where: { id: currentUser.id },
                },
            },
        });

        if (!classroom) {
            return { success: false, error: "Invalid join code." };
        }

        if (classroom.students.length > 0) {
            return { success: false, error: "You are already enrolled in this classroom." };
        }


        // Institution Check:
        // 1. If user belongs to an institution, they can only join classrooms from THAT institution.
        // 2. If user has NO institution, they are assigned to this classroom's institution.

        if (currentUser.institutionId && currentUser.institutionId !== classroom.institutionId) {
             return {
                success: false,
                error: "You cannot join this classroom because it belongs to a different institution."
             };
        }

        // Add student to classroom
        await prisma.classroom.update({
            where: { id: classroom.id },
            data: {
                students: {
                    connect: { id: currentUser.id },
                },
            },
        });

        // Onboard student to institution if null
        const updateData: any = {
            onboardingCompleted: true,
        };

        if (!currentUser.institutionId) {
            updateData.institutionId = classroom.institutionId;
        }

        await prisma.user.update({
            where: { id: currentUser.id },
            data: updateData,
        });

        // Redis Integration: Cache student IDs per classroom
        const redisKey = `classroom:students:${classroom.id}`;
        await redis.sadd(redisKey, currentUser.id);

        // Invalidate caches
        revalidateTag(`student-classrooms-${currentUser.id}`, "max");
        revalidateTag(`classroom-${classroom.id}`, "max");
        revalidatePath("/dashboard/classrooms");

        return { success: true, message: `Successfully joined ${classroom.name}` };
    } catch (error) {
        console.error("Failed to join classroom:", error);
        return { success: false, error: "Failed to join classroom" };
    }
}

/**
 * Fetches classrooms created by the currently logged-in teacher (CACHED).
 */
export async function getTeacherClassrooms() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    const fetchClassrooms = unstable_cache(
        async () => {
            return await prisma.classroom.findMany({
                where: { teacherId: userId },
                include: {
                    _count: {
                        select: { students: true },
                    },
                },
                orderBy: { createdAt: "desc" },
            });
        },
        [`teacher-classrooms-${userId}`],
        { tags: [`teacher-classrooms-${userId}`], revalidate: 120 }
    );

    try {
        const classrooms = await fetchClassrooms();
        return { success: true, classrooms };
    } catch (error) {
        console.error("Failed to fetch teacher classrooms:", error);
        return { success: false, error: "Failed to fetch classrooms" };
    }
}

/**
 * Fetches classrooms where the currently logged-in student is enrolled (CACHED).
 */
export async function getStudentClassrooms() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    const fetchClassrooms = unstable_cache(
        async () => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    enrolledClassrooms: {
                        include: {
                            teacher: {
                                select: { name: true },
                            },
                        },
                        orderBy: { createdAt: "desc" },
                    },
                },
            });
            return user?.enrolledClassrooms || [];
        },
        [`student-classrooms-${userId}`],
        { tags: [`student-classrooms-${userId}`], revalidate: 120 }
    );

    try {
        const classrooms = await fetchClassrooms();
        return { success: true, classrooms };
    } catch (error) {
        console.error("Failed to fetch student classrooms:", error);
        return { success: false, error: "Failed to fetch classrooms" };
    }
}

/**
 * Fetches details of a specific classroom, including the student list for the leaderboard (CACHED).
 * Supports pagination for large student lists.
 */
export async function getClassroomWithStudents(
    id: string,
    page: number = 1,
    limit: number = 50
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const skip = (page - 1) * limit;

    const fetchClassroom = unstable_cache(
        async () => {
            const [classroom, totalStudents] = await Promise.all([
                prisma.classroom.findUnique({
                    where: { id },
                    select: {
                        id: true,
                        name: true,
                        subject: true,
                        section: true,
                        joinCode: true,
                        isTrackingActive: true,
                        trackingStartedAt: true,
                        teacher: {
                            select: { name: true, id: true },
                        },
                        students: {
                            select: {
                                id: true,
                                name: true,
                                totalScore: true,
                                image: true,
                            },
                            orderBy: { totalScore: "desc" },
                            skip,
                            take: limit,
                        },
                    },
                }),
                prisma.user.count({
                    where: {
                        enrolledClassrooms: {
                            some: { id }
                        }
                    }
                })
            ]);

            return { classroom, totalStudents };
        },
        [`classroom-${id}-page-${page}`],
        { tags: [`classroom-${id}`], revalidate: 60 }
    );

    try {
        const { classroom, totalStudents } = await fetchClassroom();

        if (!classroom) {
            return { success: false, error: "Classroom not found" };
        }

        return {
            success: true,
            classroom,
            pagination: {
                total: totalStudents,
                pages: Math.ceil(totalStudents / limit),
                current: page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch classroom detail:", error);
        return { success: false, error: "Failed to fetch classroom" };
    }
}

export async function toggleClassroomTracking(classroomId: string, active: boolean) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const classroom = await prisma.classroom.findUnique({
        where: { id: classroomId },
        select: { teacherId: true }
    });

    if (!classroom || (classroom.teacherId !== session.user.id && (session.user as any).role !== "ADMIN")) {
        return { success: false, error: "Access denied" };
    }

    await prisma.classroom.update({
        where: { id: classroomId },
        data: {
            isTrackingActive: active,
            trackingStartedAt: active ? new Date() : null
        }
    });

    await deleteFromCache(cacheKey("live-tracking", classroomId));
    revalidateTag(`classroom-${classroomId}`, "max");
    revalidatePath(`/dashboard/classrooms/${classroomId}`);
    return { success: true };
}

export async function getClassroomLiveTracking(classroomId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    // Use Redis cache for live tracking data (short TTL)
    const cacheKeyName = cacheKey("live-tracking", classroomId);

    const fetchTracking = async () => {
        const classroom = await prisma.classroom.findUnique({
            where: { id: classroomId },
            select: {
                isTrackingActive: true,
                trackingStartedAt: true,
                students: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        submissions: {
                            where: {
                                mode: "SUBMIT",
                            },
                            orderBy: { createdAt: 'desc' },
                            take: 20,
                            include: {
                                problem: { select: { title: true } }
                            }
                        }
                    }
                }
            }
        });

        if (!classroom) return null;

        // Filter submissions if tracking is active
        const studentsData = classroom.students.map(student => {
            const filteredSubmissions = student.submissions.filter(sub =>
                classroom.isTrackingActive &&
                classroom.trackingStartedAt &&
                new Date(sub.createdAt) >= new Date(classroom.trackingStartedAt)
            ).map(sub => ({
                id: sub.id,
                code: sub.code,
                status: sub.status,
                problemTitle: sub.problem.title,
                createdAt: sub.createdAt
            }));

            return {
                id: student.id,
                name: student.name,
                image: student.image,
                submissions: filteredSubmissions
            };
        });

        return {
            isTrackingActive: classroom.isTrackingActive,
            trackingStartedAt: classroom.trackingStartedAt,
            students: studentsData
        };
    };

    try {
        const data = await cachedFetch(cacheKeyName, fetchTracking, CACHE_CONFIG.SHORT.ttl);

        if (!data) {
            return { success: false, error: "Classroom not found" };
        }

        return {
            success: true,
            ...data
        };
    } catch (error) {
        console.error("Failed to fetch live tracking:", error);
        return { success: false, error: "Failed to fetch tracking data" };
    }
}

/**
 * Fetches all classrooms for an institution (CACHED with pagination).
 */
export async function getInstitutionClassrooms(page: number = 1, limit: number = 20) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    if (currentUser.role !== "ADMIN" && currentUser.role !== "INSTITUTION_MANAGER") {
        return { success: false, error: "Unauthorized" };
    }

    const institutionId = currentUser.institutionId;
    const skip = (page - 1) * limit;

    const fetchClassrooms = unstable_cache(
        async () => {
            const [classrooms, total] = await Promise.all([
                prisma.classroom.findMany({
                    where: { institutionId },
                    include: {
                        teacher: {
                            select: { name: true, email: true }
                        },
                        _count: {
                            select: { students: true }
                        }
                    },
                    orderBy: { createdAt: "desc" },
                    skip,
                    take: limit,
                }),
                prisma.classroom.count({
                    where: { institutionId }
                })
            ]);

            return { classrooms, total };
        },
        [`institution-classrooms-${institutionId}-page-${page}`],
        { tags: [`institution-classrooms-${institutionId}`], revalidate: 120 }
    );

    try {
        const { classrooms, total } = await fetchClassrooms();
        return {
            success: true,
            classrooms,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                current: page,
                limit
            }
        };
    } catch (error) {
        console.error("Failed to fetch institution classrooms:", error);
        return { success: false, error: "Failed to fetch classrooms" };
    }
}

export async function removeStudentFromClassroom(classroomId: string, studentId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;
    const isPowerful = ["ADMIN", "INSTITUTION_MANAGER"].includes(currentUser.role);

    try {
        const classroom = await prisma.classroom.findUnique({
            where: { id: classroomId },
            select: { teacherId: true, institutionId: true },
        });

        if (!classroom) {
            return { success: false, error: "Classroom not found" };
        }

        // Only allow if powerful role OR if current user is the teacher
        if (!isPowerful && classroom.teacherId !== currentUser.id) {
            return { success: false, error: "Unauthorized" };
        }

        await prisma.classroom.update({
            where: { id: classroomId },
            data: {
                students: {
                    disconnect: { id: studentId },
                },
            },
        });

        // Remove from Redis set
        const redisKey = `classroom:students:${classroomId}`;
        await redis.srem(redisKey, studentId);

        // Invalidate caches
        revalidateTag(`classroom-${classroomId}`, "max");
        revalidateTag(`student-classrooms-${studentId}`, "max");
        revalidatePath(`/dashboard/classrooms/${classroomId}`);

        return { success: true };
    } catch (error) {
        console.error("Failed to remove student:", error);
        return { success: false, error: "Failed to remove student" };
    }
}
