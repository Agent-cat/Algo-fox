
import { prisma } from "@/lib/prisma";
import { getPointsForDifficulty } from "@/lib/points";
import redis from "@/lib/redis";

const CACHE_TTL = 30; // 30 seconds

export class UserService {
    /**
     * Get user's total score (cached for 30 seconds)
     * Cache is invalidated when user solves a problem
     */
    static async getUserScore(userId: string): Promise<number> {
        const cacheKey = `user-score-${userId}`;

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT] User Score: ${userId}`);
                return parseInt(cached, 10);
            }
        } catch (error) {
            console.error("Redis get error:", error);
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { totalScore: true }
        });

        const score = user?.totalScore || 0;

        try {
            await redis.setex(cacheKey, CACHE_TTL, score.toString());
        } catch (error) {
            console.error("Redis set error:", error);
        }

        return score;
    }

    /**
     * Recalculate user's total score based on their solved problems
     * This fixes any incorrect scores in the database
     */
    static async recalculateUserScore(userId: string): Promise<{ success: boolean; newScore: number }> {
        try {
            // Get all unique problems the user has solved (ACCEPTED SUBMIT mode only)
            const solvedSubmissions = await prisma.submission.findMany({
                where: {
                    userId,
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                },
                select: {
                    problemId: true,
                    problem: {
                        select: {
                            difficulty: true
                        }
                    }
                },
                distinct: ["problemId"]
            });

            // Calculate total score based on difficulty
            let totalScore = 0;
            for (const submission of solvedSubmissions) {
                const points = getPointsForDifficulty(submission.problem.difficulty);
                totalScore += points;
            }

            // Update user's totalScore in the database
            await prisma.user.update({
                where: { id: userId },
                data: {
                    totalScore
                }
            });

            // Invalidate cache
            try {
                await redis.del(`user-score-${userId}`);
            } catch (error) {
                console.error("Failed to invalidate user score cache:", error);
            }

            return { success: true, newScore: totalScore };
        } catch (error) {
            console.error("Failed to recalculate user score:", error);
            throw new Error("Failed to recalculate user score");
        }
    }

    /**
     * Complete user onboarding process
     * Updates user profile information and marks onboarding as complete
     */
    static async completeOnboarding(userId: string, data: {
        bio?: string;
        collageId: string;
        leetCodeHandle?: string;
        codeChefHandle?: string;
        hackerrankHandle?: string;
        githubHandle?: string;
    }): Promise<{ success: boolean; error?: string }> {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    collageId: data.collageId || null,
                    bio: data.bio || null,
                    leetCodeHandle: data.leetCodeHandle || null,
                    codeChefHandle: data.codeChefHandle || null,
                    hackerrankHandle: data.hackerrankHandle || null,
                    githubHandle: data.githubHandle || null,
                    onboardingCompleted: true
                }
            });

            return { success: true };
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
            return { success: false, error: "Failed to complete onboarding" };
        }
    }
}
