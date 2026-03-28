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
 * Fetches basic details of a classroom by its join code.
 * Used for the join classroom page.
 */
export async function getClassroomByCode(code: string) {
    try {
        const classroom = await prisma.classroom.findUnique({
            where: { joinCode: code.toUpperCase() },
            select: {
                id: true,
                name: true,
                subject: true,
                section: true,
                teacher: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                _count: {
                    select: { students: true }
                }
            }
        });

        if (!classroom) {
            return { success: false, error: "Classroom not found" };
        }

        const session = await auth.api.getSession({
            headers: await headers(),
        });

        const isEnrolled = session?.user ? await prisma.classroom.findFirst({
            where: {
                id: classroom.id,
                students: { some: { id: session.user.id } }
            }
        }) : false;

        return {
            success: true,
            classroom,
            isEnrolled: !!isEnrolled
        };
    } catch (error) {
        console.error("Failed to fetch classroom by code:", error);
        return { success: false, error: "Failed to fetch classroom" };
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
                                collegeId: true,
                                collegeName: true,
                                branch: true,
                                year: true,
                                totalScore: true,
                                problemsSolved: true,
                                image: true,
                                codeChefHandle: true,
                                leetCodeHandle: true,
                                codeforcesHandle: true,
                                leetCodeRating: true,
                                leetCodeSolved: true,
                                leetCodeContests: true,
                                codeforcesRating: true,
                                codeforcesSolved: true,
                                codeforcesContests: true,
                                codeChefRating: true,
                                codeChefSolved: true,
                                codeChefContests: true,
                                updatedAt: true,
                                _count: {
                                    select: {
                                        submissions: {
                                            where: { status: "ACCEPTED" }
                                        },
                                        contestParticipations: true
                                    }
                                }
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
        // Query minimal classroom meta first
        const classroomMeta = await prisma.classroom.findUnique({
            where: { id: classroomId },
            select: { isTrackingActive: true, trackingStartedAt: true }
        });

        if (!classroomMeta) return null;

        const { isTrackingActive, trackingStartedAt } = classroomMeta;

        // Fetch students and ONLY fetch valid realtime submissions at DB-level
        const studentsRaw = await prisma.user.findMany({
            where: { enrolledClassrooms: { some: { id: classroomId } } },
            select: {
                id: true,
                name: true,
                image: true,
                submissions: isTrackingActive && trackingStartedAt ? {
                    where: {
                        mode: "SUBMIT",
                        createdAt: { gte: trackingStartedAt }
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                    include: { problem: { select: { title: true } } }
                } : false
            }
        });

        const studentsData = studentsRaw.map((student) => {
            const subs = Array.isArray(student.submissions) ? student.submissions.map((sub: any) => ({
                id: sub.id,
                code: sub.code || "",
                status: sub.status,
                problemTitle: sub.problem.title,
                createdAt: sub.createdAt
            })) : [];

            return {
                id: student.id,
                name: student.name,
                image: student.image,
                submissions: subs
            };
        });

        return {
            isTrackingActive,
            trackingStartedAt,
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

/**
 * Fetches detailed contest performance for all students in a classroom.
 * Aggregates scores across all classroom-linked contests.
 */
export async function getClassroomContestPerformance(classroomId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        // 1. Fetch classroom students and contests
        const [classroom, contests] = await Promise.all([
            prisma.classroom.findUnique({
                where: { id: classroomId },
                include: {
                    students: {
                        select: {
                            id: true,
                            name: true,
                            collegeId: true,
                            branch: true,
                            image: true,
                        }
                    }
                }
            }),
            prisma.contest.findMany({
                where: { classroomId },
                include: {
                    problems: {
                        include: {
                            problem: { select: { id: true, score: true } }
                        }
                    }
                }
            })
        ]);

        if (!classroom) return { success: false, error: "Classroom not found" };
        if (contests.length === 0) return { success: true, data: [] };

        const contestIds = contests.map(c => c.id);
        const studentIds = classroom.students.map(s => s.id);

        // 2. Fetch all successful submissions for these contests
        const allSubmissions = await prisma.submission.findMany({
            where: {
                contestId: { in: contestIds },
                userId: { in: studentIds },
                status: "ACCEPTED",
                mode: "SUBMIT"
            },
            select: {
                userId: true,
                contestId: true,
                problemId: true,
                createdAt: true
            }
        });

        // 3. Aggregate scores
        // Map: contestId -> userId -> problemId -> points
        const scoreTracker = new Map<string, Map<string, Map<string, number>>>();

        // Initialize maps for all contests and problems
        contests.forEach(contest => {
            const userMap = new Map<string, Map<string, number>>();
            scoreTracker.set(contest.id, userMap);
        });

        // Process submissions
        allSubmissions.forEach(sub => {
            if (!sub.contestId || !sub.userId || !sub.problemId) return;

            const contest = contests.find(c => c.id === sub.contestId);
            if (!contest) return;

            // check if submission is within contest time
            if (sub.createdAt < contest.startTime || sub.createdAt > contest.endTime) return;

            const userMap = scoreTracker.get(sub.contestId)!;
            const probMap = userMap.get(sub.userId) || new Map<string, number>();

            if (!userMap.has(sub.userId)) userMap.set(sub.userId, probMap);

            const problemDetail = contest.problems.find(p => p.problemId === sub.problemId);
            const points = problemDetail?.problem.score || 0;

            // Only track max points per problem (though status is already ACCEPTED)
            if (!probMap.has(sub.problemId)) {
                probMap.set(sub.problemId, points);
            }
        });

        // 4. Flatten into rows
        const performanceData: any[] = [];
        const studentTotals = new Map<string, number>();

        classroom.students.forEach(student => {
            let studentTotal = 0;

            contests.forEach(contest => {
                const userMap = scoreTracker.get(contest.id)!;
                const probMap = userMap.get(student.id);

                const contestPoints = probMap
                    ? Array.from(probMap.values()).reduce((a, b) => a + b, 0)
                    : 0;

                studentTotal += contestPoints;

                performanceData.push({
                    studentName: student.name || "Anonymous",
                    collegeId: student.collegeId || "N/A",
                    branch: student.branch || "N/A",
                    image: student.image,
                    studentId: student.id,
                    contestName: contest.title,
                    contestPoints: contestPoints,
                });
            });

            studentTotals.set(student.id, studentTotal);
        });

        // 5. Add final totals to each row
        const finalData = performanceData.map(row => ({
            ...row,
            totalPoints: studentTotals.get(row.studentId) || 0
        }));

        return { success: true, data: finalData };
    } catch (error) {
        console.error("Failed to generate classroom performance report:", error);
        return { success: false, error: "Internal server error" };
    }
}
