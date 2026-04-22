import { prisma } from "@/lib/prisma";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import redis from "@/lib/redis";
import { scanAndDelete } from "@/lib/redis-utils";

const ENROLLMENT_CACHE_TTL = 300; // 5 minutes
const getEnrollmentCacheKey = (userId: string) => `user-enrollments:${userId}`;

export class CourseService {
    /**
     * Get all published courses
     */
    static async getAllCourses() {
        "use cache";
        cacheLife("hours");
        cacheTag("courses-list");

        return await prisma.course.findMany({
            where: { isPublished: true },
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { modules: true }
                }
            }
        });
    }

    /**
     * Get a single course by slug with its modules and problems
     */
    static async getCourseBySlug(slug: string) {
        "use cache";
        cacheLife("minutes");
        cacheTag(`course-${slug}`);

        return await prisma.course.findUnique({
            where: { slug },
            include: {
                modules: {
                    orderBy: { order: 'asc' },
                    select: {
                        id: true,
                        name: true,
                        order: true,
                        parentId: true,
                        categoryProblems: {
                            orderBy: { order: 'asc' },
                            include: {
                                problem: {
                                    select: {
                                        id: true,
                                        title: true,
                                        slug: true,
                                        difficulty: true,
                                        domain: true,
                                        score: true,
                                        type: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    /**
     * Enroll a user in a course
     */
    static async enrollUser(userId: string, courseId: string) {
        const result = await prisma.userCourseEnrollment.upsert({
            where: { userId_courseId: { userId, courseId } },
            update: {},
            create: { userId, courseId }
        });
        // Invalidate enrollment cache and courses-list so UI updates
        await redis.del(getEnrollmentCacheKey(userId));
        revalidateTag("courses-list", "max");
        return result;
    }

    /**
     * Get user enrollment status
     */
    static async getEnrollment(userId: string, courseId: string) {
        return await prisma.userCourseEnrollment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        });
    }

    /**
     * Calculate and update course progress for a user.
     * OPTIMIZATION: Reduced from 2 queries to 1 raw aggregation JOIN.
     * Previously: (1) fetch all modules + problemIds, (2) count accepted submissions.
     * Now: single $queryRaw that does the JOIN + COUNT at the DB level.
     */
    static async updateCourseProgress(userId: string, courseId: string) {
        // Single aggregation query replacing two separate queries
        const result = await prisma.$queryRaw<[{ total: number; solved: number }]>`
            SELECT
                CAST(COUNT(DISTINCT cp."problemId") AS INTEGER) AS total,
                CAST(COUNT(DISTINCT CASE
                    WHEN s."status" = 'ACCEPTED'::"SubmissionResult"
                      AND s."mode" = 'SUBMIT'::"SubmissionMode"
                    THEN s."problemId"
                END) AS INTEGER) AS solved
            FROM "Category" c
            JOIN "CategoryProblem" cp ON cp."categoryId" = c.id
            LEFT JOIN "Submission" s
                ON s."problemId" = cp."problemId"
               AND s."userId" = ${userId}
            WHERE c."courseId" = ${courseId}
        `;

        const { total, solved } = result[0] ?? { total: 0, solved: 0 };
        if (total === 0) return 0;

        const progress = Math.min((solved / total) * 100, 100);

        await prisma.userCourseEnrollment.update({
            where: { userId_courseId: { userId, courseId } },
            data: {
                progress,
                completedAt: progress === 100 ? new Date() : null
            }
        });

        // Invalidate enrollment cache so the UI sees the updated progress
        await redis.del(getEnrollmentCacheKey(userId));

        return progress;
    }

    /**
     * Get user's enrolled courses with progress.
     * OPTIMIZATION: Redis-cached per user (5min TTL). Invalidated on enroll/progress update.
     */
    static async getUserEnrolledCourses(userId: string) {
        const cacheKey = getEnrollmentCacheKey(userId);
        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed) return parsed;
            }
        } catch { /* non-fatal, fall through to DB */ }

        const enrollments = await prisma.userCourseEnrollment.findMany({
            where: { userId },
            include: {
                course: {
                    include: { _count: { select: { modules: true } } }
                }
            },
            orderBy: { enrolledAt: 'desc' }
        });

        try {
            await redis.setex(cacheKey, ENROLLMENT_CACHE_TTL, JSON.stringify(enrollments));
        } catch { /* non-fatal */ }

        return enrollments;
    }

    /**
     * Delete a course and all its modules/enrollments
     */
    static async deleteCourse(courseId: string) {
        // Cascade delete in schema handles: Modules, Problems, Enrollments
        const result = await prisma.course.delete({ where: { id: courseId } });
        // Invalidate the course list cache so admins see it disappear immediately
        revalidateTag("courses-list", "max");
        // Broad enrollment cache invalidation (course gone, all enrollments irrelevant)
        await scanAndDelete("user-enrollments:*");
        return result;
    }
}
