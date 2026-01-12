"use server";

import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

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
        // Key format: classroom:students:<id>
        const redisKey = `classroom:students:${classroom.id}`;
        await redis.sadd(redisKey, currentUser.id);

        revalidatePath("/dashboard/classrooms");
        return { success: true, message: `Successfully joined ${classroom.name}` };
    } catch (error) {
        console.error("Failed to join classroom:", error);
        return { success: false, error: "Failed to join classroom" };
    }
}

/**
 * Fetches classrooms created by the currently logged-in teacher.
 */
export async function getTeacherClassrooms() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const classrooms = await prisma.classroom.findMany({
            where: { teacherId: session.user.id },
            include: {
                _count: {
                    select: { students: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return { success: true, classrooms };
    } catch (error) {
        console.error("Failed to fetch teacher classrooms:", error);
        return { success: false, error: "Failed to fetch classrooms" };
    }
}

/**
 * Fetches classrooms where the currently logged-in student is enrolled.
 */
export async function getStudentClassrooms() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
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

        return { success: true, classrooms: user?.enrolledClassrooms || [] };
    } catch (error) {
        console.error("Failed to fetch student classrooms:", error);
        return { success: false, error: "Failed to fetch classrooms" };
    }
}

/**
 * Fetches details of a specific classroom, including the student list for the leaderboard.
 */
export async function getClassroomWithStudents(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const classroom = await prisma.classroom.findUnique({
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
                },
            },
        });

        if (!classroom) {
            return { success: false, error: "Classroom not found" };
        }

        return { success: true, classroom };
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

    revalidatePath(`/dashboard/classrooms/${classroomId}`);
    return { success: true };
}

export async function getClassroomLiveTracking(classroomId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

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

    if (!classroom) return { success: false, error: "Classroom not found" };

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
        success: true,
        isTrackingActive: classroom.isTrackingActive,
        trackingStartedAt: classroom.trackingStartedAt,
        students: studentsData
    };
}
