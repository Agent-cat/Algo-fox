
import { prisma } from "@/lib/prisma";
import { getPointsForDifficulty } from "@/lib/points";
import redis from "@/lib/redis";

const CACHE_TTL = 30; // 30 seconds

export class UserService {

    /*
     * GETS USERS TOTAL SCORE (cached for 30 seconds)
     * CACHE IS INVALIDATD WHEN USER SOLVES A PROBLEM
    */
    static async getUserScore(userId: string): Promise<number> {
        const cacheKey = `user-score-${userId}`;

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {

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

    /*
     * COMPLETE USER ONBOARDING PROCESS
     * UPDATES USER PROFILE INFORMATION AND MARKS ONBOARDING AS COMPLETED
    */
    static async completeOnboarding(userId: string, data: {
        name?: string;
        bio?: string;
        collegeId: string;
        collegeName: string;
        branch: string;
        year?: string;
        leetCodeHandle?: string;
        codeChefHandle?: string;
        hackerrankHandle?: string; // Kept for type compatibility if needed, but mapped to codeforces
        codeforcesHandle?: string;
        githubHandle?: string;
    }): Promise<{ success: boolean; error?: string }> {
        try {
            await prisma.user.update({
                where: { id: userId },
                data: {
                    name: data.name,
                    collegeId: data.collegeId || null,
                    collegeName: data.collegeName || null,
                    branch: data.branch || null,
                    year: data.year ? parseInt(data.year) : null,
                    bio: data.bio || null,
                    leetCodeHandle: data.leetCodeHandle || null,
                    codeChefHandle: data.codeChefHandle || null,
                    codeforcesHandle: data.codeforcesHandle || data.hackerrankHandle || null,
                    githubHandle: data.githubHandle || null,
                    onboardingCompleted: true
                }
            });

            // Invalidate dashboard cache
            try {
                await redis.del(`dashboard:stats:${userId}`);
            } catch (error) {
                console.error("Failed to invalidate dashboard cache:", error);
            }

            return { success: true };
        } catch (error) {
            console.error("Failed to complete onboarding:", error);
            return { success: false, error: "Failed to complete onboarding" };
        }
    }

    /**
     * Update user profile information
     */
    static async updateUserInfo(userId: string, data: {
        name?: string;
        bio?: string;
        collegeId?: string;
        collegeName?: string;
        branch?: string;
        leetCodeHandle?: string;
        codeChefHandle?: string;
        hackerrankHandle?: string;
        codeforcesHandle?: string;
        githubHandle?: string;
    }): Promise<{ success: boolean; error?: string }> {
        try {
            // Fetch current user to check for changes
            const currentUser = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    codeChefHandle: true,
                    codeforcesHandle: true,
                    leetCodeHandle: true,
                }
            });

            const updateData: any = {
                name: data.name,
                bio: data.bio,
                collegeId: data.collegeId,
                collegeName: data.collegeName,
                branch: data.branch,
                leetCodeHandle: data.leetCodeHandle,
                codeChefHandle: data.codeChefHandle,
                codeforcesHandle: data.codeforcesHandle,
                githubHandle: data.githubHandle,
            };

            // Reset verification if handle changed
            if (currentUser) {
                if (data.codeChefHandle !== undefined && data.codeChefHandle !== currentUser.codeChefHandle) {
                    updateData.codeChefVerified = false;
                }
                if (data.codeforcesHandle !== undefined && data.codeforcesHandle !== currentUser.codeforcesHandle) {
                    updateData.codeforcesVerified = false;
                }
                if (data.leetCodeHandle !== undefined && data.leetCodeHandle !== currentUser.leetCodeHandle) {
                    updateData.leetCodeVerified = false;
                }
            }

            await prisma.user.update({
                where: { id: userId },
                data: updateData
            });

            // Invalidate Redis cache
            try {
                await redis.del(`dashboard:stats:${userId}`);
            } catch (error) {
                console.error("Failed to invalidate dashboard redis cache:", error);
            }

            return { success: true };
        } catch (error) {
            console.error("Failed to update user info in service:", error);
            return { success: false, error: "Failed to update profile" };
        }
    }

    /**
     * Get user settings data
     */
    static async getUserSettings(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                institution: true
            }
        });

        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            bio: user.bio,
            collegeId: user.collegeId,
            collegeName: user.collegeName,
            branch: user.branch,
            institutionName: user.institution?.name
        };
    }
}
