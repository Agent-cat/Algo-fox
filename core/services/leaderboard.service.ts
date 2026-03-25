
import { prisma } from "@/lib/prisma";
import { SubmissionResult, Prisma } from "@prisma/client";
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
    static async getGlobalLeaderboard(institutionId?: string, forceRefresh: boolean = false) {
        // Try to get cached leaderboard from Redis
        const cacheKey = institutionId ? `lb:inst:${institutionId}` : 'lb:global';
        const CACHE_TTL = 10 * 60; // 10 minutes

        try {
            if (!forceRefresh) {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    return JSON.parse(cached);
                }
            }
        } catch (error) {
            // Redis error - continue without cache
            console.error('Redis get error:', error);
        }

        // OPTIMIZATION: Fetch top 100 users with only required fields (avoid N+1 nested queries)
        const users = await prisma.user.findMany({
            where: {
                role: 'STUDENT',
                ...(institutionId ? { institutionId } : {})
            },
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
                problemsSolved: true
            }
        });

        // OPTIMIZATION: Use raw SQL aggregation to get difficulty counts instead of fetching all submissions
        // This prevents fetching thousands of submission records into memory
        const userIds = users.map(u => u.id);
        const statsByUser = userIds.length > 0
            ? await prisma.$queryRaw<Array<{ userId: string; difficulty: string; count: bigint }>>`
                SELECT
                    s."userId",
                    p."difficulty",
                    COUNT(DISTINCT s."problemId") as count
                FROM "Submission" s
                JOIN "Problem" p ON s."problemId" = p.id
                WHERE s."userId" IN (${Prisma.join(userIds)})
                    AND s.status = ${SubmissionResult.ACCEPTED}::"SubmissionResult"
                    AND s.mode = ${'SUBMIT'}::"SubmissionMode"
                GROUP BY s."userId", p."difficulty"
            `
            : [];

        // OPTIMIZATION: Build a map for O(1) difficulty count lookup instead of iterating for each user
        const statsByUserMap = new Map<string, Map<string, number>>();
        for (const stat of statsByUser) {
            if (!statsByUserMap.has(stat.userId)) {
                statsByUserMap.set(stat.userId, new Map());
            }
            statsByUserMap.get(stat.userId)!.set(stat.difficulty, Number(stat.count));
        }

        const leaderboard: LeaderboardEntry[] = users.map((user, index) => {
            const userStats = statsByUserMap.get(user.id) || new Map();

            return {
                rank: index + 1,
                userId: user.id,
                name: user.name,
                image: user.image,
                tags: user.tags,
                problemsSolved: user.problemsSolved,
                totalScore: user.totalScore,
                socials: {
                    leetcode: user.leetCodeHandle,
                    codechef: user.codeChefHandle,
                    github: user.githubHandle,
                    linkedin: null
                },
                stats: {
                    easy: userStats.get('EASY') || 0,
                    medium: userStats.get('MEDIUM') || 0,
                    hard: userStats.get('HARD') || 0
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
