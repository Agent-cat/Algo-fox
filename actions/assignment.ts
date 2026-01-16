"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidateTag, unstable_cache } from "next/cache";

/**
 * Get all assignments for a specific classroom (CACHED)
 * Use this for initial page loads
 */
export async function getClassroomAssignments(classroomId: string) {
    // Filter out assignments older than 3 weeks
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    const fetchAssignments = unstable_cache(
        async () => {
            return await prisma.assignment.findMany({
                where: {
                    classroomId,
                    createdAt: { gte: threeWeeksAgo }
                },
                include: {
                    _count: {
                        select: { problems: true }
                    }
                },
                orderBy: { createdAt: "desc" }
            });
        },
        [`classroom-assignments-${classroomId}`],
        { tags: [`assignments-classroom-${classroomId}`, 'assignments-all'], revalidate: 60 }
    );

    return await fetchAssignments();
}

/**
 * Get all assignments for a specific classroom (UNCACHED)
 * Use this for refetching after mutations to get fresh data
 */
export async function refreshClassroomAssignments(classroomId: string) {
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    return await prisma.assignment.findMany({
        where: {
            classroomId,
            createdAt: { gte: threeWeeksAgo }
        },
        include: {
            _count: {
                select: { problems: true }
            }
        },
        orderBy: { createdAt: "desc" }
    });
}

/**
 * Create a new assignment for a classroom
 */
export async function createAssignment(
    classroomId: string,
    data: {
        title: string;
        description?: string;
        dueDate?: Date;
        problemIds: string[];
    }
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || session.user.role !== "TEACHER") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Verify teacher owns the classroom
        const classroom = await prisma.classroom.findUnique({
            where: { id: classroomId },
            select: { teacherId: true }
        });

        if (!classroom || classroom.teacherId !== session.user.id) {
            return { success: false, error: "Unauthorized access to classroom" };
        }

        const assignment = await prisma.assignment.create({
            data: {
                title: data.title,
                description: data.description,
                dueDate: data.dueDate,
                classroomId,
                problems: {
                    create: data.problemIds.map((id, index) => ({
                        problemId: id,
                        order: index
                    }))
                }
            }
        });

        // Revalidate classroom-specific and global assignment caches
        revalidateTag(`assignments-classroom-${classroomId}`, "max");
        revalidateTag('assignments-all', "max"); // Invalidate student assignments cache

        return { success: true, assignmentId: assignment.id };
    } catch (error) {
        console.error("Create assignment error:", error);
        return { success: false, error: "Failed to create assignment" };
    }
}

/**
 * Get details of a specific assignment, including problems
 */
export async function getAssignmentDetails(assignmentId: string) {
    const fetchDetails = unstable_cache(
        async () => {
            return await prisma.assignment.findUnique({
                where: { id: assignmentId },
                include: {
                    problems: {
                        include: {
                            problem: {
                                select: {
                                    id: true,
                                    title: true,
                                    slug: true,
                                    difficulty: true,
                                    type: true,
                                    domain: true,
                                }
                            }
                        },
                        orderBy: { order: "asc" }
                    },
                    classroom: {
                        select: {
                            name: true,
                            id: true
                        }
                    }
                }
            });
        },
        [`assignment-details-${assignmentId}`],
        { tags: [`assignment-${assignmentId}`], revalidate: 3600 } // Cache for 1 hour
    );

    return await fetchDetails();
}

/**
 * Get all assignments for the current student across all enrolled classrooms
 */
export async function getStudentAssignments() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) return [];

    // Filter out assignments older than 3 weeks
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

    const fetchStudentAssignments = unstable_cache(
        async () => {
            const userId = session.user.id;

            // First get enrolled classrooms
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    enrolledClassrooms: {
                        select: { id: true }
                    }
                }
            });

            if (!user || user.enrolledClassrooms.length === 0) return [];

            const classroomIds = user.enrolledClassrooms.map(c => c.id);

            // Fetch assignments for these classrooms (excluding older than 3 weeks)
            const assignments = await prisma.assignment.findMany({
                where: {
                    classroomId: { in: classroomIds },
                    createdAt: { gte: threeWeeksAgo }
                },
                include: {
                    classroom: {
                        select: { name: true }
                    },
                    _count: {
                        select: { problems: true }
                    }
                },
                orderBy: { dueDate: "asc" } // Due soonest first
            });

            return assignments;
        },
        [`student-assignments-${session.user.id}`],
        { tags: [`student-assignments-${session.user.id}`, 'assignments-all'], revalidate: 60 }
    );

    return await fetchStudentAssignments();
}

/**
 * Check completion status of problems in an assignment for a specific user
 */
export async function getAssignmentProgress(assignmentId: string, userId?: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return null;

    // Get assignment problems
    const assignment = await getAssignmentDetails(assignmentId);
    if (!assignment) return null;

    const problemIds = assignment.problems.map(p => p.problemId);

    // Fetch successful submissions for these problems by the user
    // We don't cache this strictly because submissions happen frequently
    // But maybe we can cache it short term
    const submissions = await prisma.submission.findMany({
        where: {
            userId: targetUserId,
            problemId: { in: problemIds },
            status: "ACCEPTED"
        },
        select: {
            problemId: true,
            createdAt: true
        },
        distinct: ["problemId"] // Just need one success per problem
    });

    const solvedProblemIds = new Set(submissions.map(s => s.problemId));

    // Map progress back to assignment structure
    // Return { total: X, completed: Y, problems: { [id]: boolean } }
    const progressMap: Record<string, boolean> = {};
    let completedCount = 0;

    assignment.problems.forEach(p => {
        const isSolved = solvedProblemIds.has(p.problemId);
        progressMap[p.problemId] = isSolved;
        if (isSolved) completedCount++;
    });

    return {
        total: assignment.problems.length,
        completed: completedCount,
        progressMap
    };
}

/**
 * Teacher Analytics: Get progress of all students in a classroom for a specific assignment
 */
export async function getTeacherAssignmentAnalytics(assignmentId: string, classroomId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || session.user.role !== "TEACHER") {
        throw new Error("Unauthorized");
    }

    // 1. Get all students in the classroom
    // 2. Get assignment problems
    // 3. Get all submissions for these students on these problems

    const [classroom, assignment] = await Promise.all([
        prisma.classroom.findUnique({
            where: { id: classroomId },
            select: {
                students: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        email: true
                    }
                }
            }
        }),
        prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: {
                problems: {
                    select: { problemId: true }
                }
            }
        })
    ]);

    if (!classroom || !assignment) return null;

    const studentIds = classroom.students.map(s => s.id);
    const problemIds = assignment.problems.map(p => p.problemId);

    // Get all accepted submissions
    const submissions = await prisma.submission.findMany({
        where: {
            userId: { in: studentIds },
            problemId: { in: problemIds },
            status: "ACCEPTED"
        },
        select: {
            userId: true,
            problemId: true
        }
    });

    // Build analytics map
    // { studentId: { completedCount: X, completedProblems: Set<string> } }

    const analytics = classroom.students.map(student => {
        const studentSubmissions = submissions.filter(s => s.userId === student.id);
        const solvedSet = new Set(studentSubmissions.map(s => s.problemId));

        return {
            student,
            completedCount: solvedSet.size,
            totalCount: problemIds.length,
            completionPercentage: (solvedSet.size / problemIds.length) * 100,
            hasCompletedAll: solvedSet.size === problemIds.length
        };
    });

    return analytics;
}
