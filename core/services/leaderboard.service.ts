import { safeJsonParse } from "@/lib/json";
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
    collegeId: string | null;
    collegeName: string | null;
    branch: string | null;
    year: number | null;
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
    static async getGlobalLeaderboard(params: {
        institutionId?: string;
        page?: number;
        pageSize?: number;
        search?: string;
        forceRefresh?: boolean;
    }) {
        const {
            institutionId,
            page = 1,
            pageSize = 50,
            search = "",
            forceRefresh = false
        } = params;

        // Try to get cached leaderboard from Redis
        const cacheKey = institutionId
            ? `lb:inst:${institutionId}:p:${page}:s:${search}`
            : `lb:global:p:${page}:s:${search}`;
        const CACHE_TTL = 10 * 60; // 10 minutes

        try {
            if (!forceRefresh) {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    const parsed = safeJsonParse(cached, { entries: [] as LeaderboardEntry[], total: 0 });
                    if (parsed.entries.length > 0 || parsed.total > 0) {
                        return parsed;
                    }
                }
            }
        } catch (error) {
            // Redis error - continue without cache
            console.error('Redis get error:', error);
        }

        // 1. Calculate skip
        const skip = (page - 1) * pageSize;

        // 2. Fetch users with pagination and search
        const users = await prisma.user.findMany({
            where: {
                role: 'STUDENT',
                ...(institutionId ? { institutionId } : {}),
                ...(search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { collegeId: { contains: search, mode: 'insensitive' } },
                        { collegeName: { contains: search, mode: 'insensitive' } }
                    ]
                } : {})
            },
            orderBy: {
                totalScore: 'desc'
            },
            skip: skip,
            take: pageSize,
            select: {
                id: true,
                name: true,
                image: true,
                tags: true,
                collegeId: true,
                collegeName: true,
                branch: true,
                year: true,
                leetCodeHandle: true,
                codeChefHandle: true,
                githubHandle: true,
                totalScore: true,
                problemsSolved: true
            }
        });

        // OPTIMIZATION: Use raw SQL aggregation to get difficulty counts instead of fetching all submissions
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
                collegeId: user.collegeId,
                collegeName: user.collegeName,
                branch: user.branch,
                year: user.year,
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

        const totalCount = await prisma.user.count({
            where: {
                role: 'STUDENT',
                ...(institutionId ? { institutionId } : {}),
                ...(search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { collegeId: { contains: search, mode: 'insensitive' } },
                        { collegeName: { contains: search, mode: 'insensitive' } }
                    ]
                } : {})
            }
        });

        const result = {
            entries: leaderboard,
            total: totalCount
        };

        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error('Redis set error:', error);
        }

        return result;
    }
}
