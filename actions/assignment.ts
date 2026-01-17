"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidateTag, unstable_cache } from "next/cache";
import { cacheKey, cachedFetch, CACHE_CONFIG } from "@/lib/cache-utils";

/**
 * Get all assignments for a specific classroom (CACHED with pagination)
 */
export async function getClassroomAssignments(
    classroomId: string,
    page: number = 1,
    limit: number = 20
) {
    // Filter out assignments older than 3 weeks
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const skip = (page - 1) * limit;

    const fetchAssignments = unstable_cache(
        async () => {
            const [assignments, total] = await Promise.all([
                prisma.assignment.findMany({
                    where: {
                        classroomId,
                        createdAt: { gte: threeWeeksAgo }
                    },
                    include: {
                        _count: {
                            select: { problems: true }
                        }
                    },
                    orderBy: { createdAt: "desc" },
                    skip,
                    take: limit,
                }),
                prisma.assignment.count({
                    where: {
                        classroomId,
                        createdAt: { gte: threeWeeksAgo }
                    }
                })
            ]);

            return { assignments, total };
        },
        [`classroom-assignments-${classroomId}-page-${page}`],
        { tags: [`assignments-classroom-${classroomId}`, 'assignments-all'], revalidate: 60 }
    );

    const { assignments, total } = await fetchAssignments();

    return {
        assignments,
        pagination: {
            total,
            pages: Math.ceil(total / limit),
            current: page,
            limit
        }
    };
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
 * Get details of a specific assignment, including problems (CACHED)
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
 * Get all assignments for the current student across all enrolled classrooms (CACHED with pagination)
 */
export async function getStudentAssignments(page: number = 1, limit: number = 20) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) return { assignments: [], pagination: null };

    // Filter out assignments older than 3 weeks
    const threeWeeksAgo = new Date();
    threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);
    const skip = (page - 1) * limit;
    const userId = session.user.id;

    const fetchStudentAssignments = unstable_cache(
        async () => {
            // First get enrolled classrooms
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    enrolledClassrooms: {
                        select: { id: true }
                    }
                }
            });

            if (!user || user.enrolledClassrooms.length === 0) {
                return { assignments: [], total: 0 };
            }

            const classroomIds = user.enrolledClassrooms.map(c => c.id);

            // Fetch assignments for these classrooms with count
            const [assignments, total] = await Promise.all([
                prisma.assignment.findMany({
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
                    orderBy: { dueDate: "asc" }, // Due soonest first
                    skip,
                    take: limit,
                }),
                prisma.assignment.count({
                    where: {
                        classroomId: { in: classroomIds },
                        createdAt: { gte: threeWeeksAgo }
                    }
                })
            ]);

            return { assignments, total };
        },
        [`student-assignments-${userId}-page-${page}`],
        { tags: [`student-assignments-${userId}`, 'assignments-all'], revalidate: 60 }
    );

    const { assignments, total } = await fetchStudentAssignments();

    return {
        assignments,
        pagination: total > 0 ? {
            total,
            pages: Math.ceil(total / limit),
            current: page,
            limit
        } : null
    };
}

/**
 * Check completion status of problems in an assignment for a specific user (CACHED short-term)
 */
export async function getAssignmentProgress(assignmentId: string, userId?: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const targetUserId = userId || session?.user?.id;
    if (!targetUserId) return null;

    // Get assignment problems (cached)
    const assignment = await getAssignmentDetails(assignmentId);
    if (!assignment) return null;

    const problemIds = assignment.problems.map(p => p.problemId);

    // Use Redis cache for progress (short TTL since submissions update frequently)
    const progressCacheKey = cacheKey("assignment-progress", assignmentId, targetUserId);

    const progress = await cachedFetch(
        progressCacheKey,
        async () => {
            // Fetch successful submissions for these problems by the user
            const submissions = await prisma.submission.findMany({
                where: {
                    userId: targetUserId,
                    problemId: { in: problemIds },
                    status: "ACCEPTED"
                },
                select: {
                    problemId: true
                },
                distinct: ["problemId"]
            });

            const solvedProblemIds = new Set(submissions.map(s => s.problemId));

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
        },
        CACHE_CONFIG.SHORT.ttl // 30 seconds cache
    );

    return progress;
}

/**
 * Teacher Analytics: Get progress of all students in a classroom for a specific assignment (CACHED)
 */
export async function getTeacherAssignmentAnalytics(
    assignmentId: string,
    classroomId: string,
    page: number = 1,
    limit: number = 50
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || session.user.role !== "TEACHER") {
        throw new Error("Unauthorized");
    }

    const skip = (page - 1) * limit;
    const analyticsCacheKey = cacheKey("assignment-analytics", assignmentId, classroomId, String(page));

    const analytics = await cachedFetch(
        analyticsCacheKey,
        async () => {
            // Parallel fetch for better performance
            const [classroom, assignment, totalStudents] = await Promise.all([
                prisma.classroom.findUnique({
                    where: { id: classroomId },
                    select: {
                        students: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                email: true
                            },
                            skip,
                            take: limit,
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
                }),
                prisma.user.count({
                    where: {
                        enrolledClassrooms: {
                            some: { id: classroomId }
                        }
                    }
                })
            ]);

            if (!classroom || !assignment) return null;

            const studentIds = classroom.students.map(s => s.id);
            const problemIds = assignment.problems.map(p => p.problemId);

            // Get all accepted submissions in one query
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

            // Build submission index for O(1) lookup
            const submissionIndex = new Map<string, Set<string>>();
            submissions.forEach(s => {
                if (!submissionIndex.has(s.userId)) {
                    submissionIndex.set(s.userId, new Set());
                }
                submissionIndex.get(s.userId)!.add(s.problemId);
            });

            // Build analytics
            const studentAnalytics = classroom.students.map(student => {
                const solvedSet = submissionIndex.get(student.id) || new Set();

                return {
                    student,
                    completedCount: solvedSet.size,
                    totalCount: problemIds.length,
                    completionPercentage: problemIds.length > 0
                        ? (solvedSet.size / problemIds.length) * 100
                        : 0,
                    hasCompletedAll: solvedSet.size === problemIds.length
                };
            });

            return {
                analytics: studentAnalytics,
                pagination: {
                    total: totalStudents,
                    pages: Math.ceil(totalStudents / limit),
                    current: page,
                    limit
                }
            };
        },
        CACHE_CONFIG.MEDIUM.ttl // 2 minutes cache
    );

    return analytics;
}

/**
 * Delete an assignment
 */
export async function deleteAssignment(assignmentId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || session.user.role !== "TEACHER") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const assignment = await prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: {
                classroom: {
                    select: { teacherId: true, id: true }
                }
            }
        });

        if (!assignment || assignment.classroom.teacherId !== session.user.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Delete assignment problems first, then assignment
        await prisma.$transaction([
            prisma.assignmentProblem.deleteMany({
                where: { assignmentId }
            }),
            prisma.assignment.delete({
                where: { id: assignmentId }
            })
        ]);

        // Invalidate caches
        revalidateTag(`assignment-${assignmentId}`, "max");
        revalidateTag(`assignments-classroom-${assignment.classroom.id}`, "max");
        revalidateTag('assignments-all', "max");

        return { success: true };
    } catch (error) {
        console.error("Delete assignment error:", error);
        return { success: false, error: "Failed to delete assignment" };
    }
}
