
import { prisma } from "@/lib/prisma";
import { SubmissionResult } from "@prisma/client";
import redis from "@/lib/redis";

export type LeaderboardEntry = {
    rank: number;
    userId: string;
    name: string;
    image: string | null;
    tags: string[];
    problemsSolved: number;
    totalScore: number;
    socials: {
        leetcode: string | null;
        codechef: string | null;
        github: string | null;
        linkedin: string | null;
    };
    stats: {
        easy: number;
        medium: number;
        hard: number;
    };
};

export class LeaderboardService {
    static async getGlobalLeaderboard() {
        // Try to get cached leaderboard from Redis
        const cacheKey = 'leaderboard:global';
        const CACHE_TTL = 10 * 60; // 10 minutes

        try {
            const cached = await redis.get(cacheKey);
            if (cached) {
                console.log(`[CACHE HIT] Global Leaderboard`);
                return JSON.parse(cached);
            }
        } catch (error) {
            // Redis error - continue without cache
            console.error('Redis get error:', error);
        }

        // Fetch top 100 users by totalScore directly from DB
        const users = await prisma.user.findMany({
            orderBy: {
                totalScore: 'desc'
            },
            take: 100,
            select: {
                id: true,
                name: true,
                image: true,
                tags: true,
                leetCodeHandle: true,
                codeChefHandle: true,
                githubHandle: true,
                totalScore: true,
                problemsSolved: true,
                // We still need difficulty breakdown for the "stats" field, but we can't easily group-by per user in a single findMany.
                // Option 1: Store difficulty counts in User model (ideal for scale).
                // Option 2: Compute stats for only the top 100 users (acceptable).
                submissions: {
                    where: {
                        status: SubmissionResult.ACCEPTED,
                        mode: "SUBMIT" as const
                    },
                    select: {
                        problem: {
                            select: {
                                difficulty: true
                            }
                        }
                    },
                    distinct: ['problemId']
                }
            }
        });

        const leaderboard: LeaderboardEntry[] = users.map((user, index) => {
            let easyCount = 0;
            let mediumCount = 0;
            let hardCount = 0;

            // Calculate stats for the top 100 (much smaller dataset)
            user.submissions.forEach(sub => {
                if (sub.problem.difficulty === 'EASY') easyCount++;
                else if (sub.problem.difficulty === 'MEDIUM') mediumCount++;
                else if (sub.problem.difficulty === 'HARD') hardCount++;
            });

            // Use stored totalScore which is indexed and accurate
            // Fallback to calculation if 0, but usually stored is correct.
            // The implementation plan says use stored totalScore.

            return {
                rank: index + 1,
                userId: user.id,
                name: user.name,
                image: user.image,
                tags: user.tags,
                problemsSolved: user.problemsSolved, // Use stored count
                totalScore: user.totalScore, // Use stored score
                socials: {
                    leetcode: user.leetCodeHandle,
                    codechef: user.codeChefHandle,
                    github: user.githubHandle,
                    linkedin: null
                },
                stats: {
                    easy: easyCount,
                    medium: mediumCount,
                    hard: hardCount
                }
            };
        });

        const result = leaderboard;

        // Cache the leaderboard in Redis
        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error('Redis set error:', error);
        }

        return result;
    }
}
