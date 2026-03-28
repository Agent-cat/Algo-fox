
import { prisma } from "@/lib/prisma";
import redis from "@/lib/redis";

export class DashboardService {
    // GETTING DASHBOARD STATS
    static async getDashboardStats(userId: string) {

        const cacheKey = `dashboard:stats:${userId}`;
        const CACHE_TTL = 5 * 60; // 5 minutes

        try {
            // GETTING CACHE FROM REDIS
            const cached = await redis.get(cacheKey);
            if (cached) {
                // RETURNING THE CACHE IF CACHED

                return JSON.parse(cached);
            }
        } catch (error) {
            // REDIS ERROR --> CONTINUE WITHOUT CACHE
            console.error('Redis get error:', error);
        }

        // FETCHING USER DATA (LITE)
        // We still fetch the user and their *recent* submissions (e.g. last 5) for the UI Activity Feed
        // But we do NOT fetch ALL submissions for stats calculation anymore.

        const userPromise = prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                role: true,
                institution: {
                    select: {
                        name: true
                    }
                },
                problemsSolved: true,
                totalScore: true,
                bio: true,
                goldBadges: true,
                silverBadges: true,
                bronzeBadges: true,
                leetCodeHandle: true,
                leetCodeVerified: true,
                codeChefHandle: true,
                codeChefVerified: true,
                codeforcesHandle: true,
                codeforcesVerified: true,
                githubHandle: true,
                currentStreak: true,
                longestStreak: true,
                submissions: {
                    where: { mode: "SUBMIT" },
                    select: {
                        id: true,
                        createdAt: true,
                        status: true,
                        code: true,
                        language: { select: { name: true } },
                        problem: {
                            select: {
                                id: true,
                                difficulty: true,
                                slug: true,
                                title: true
                            }
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 20 // Recent activity only
                }
            }
        });

        // --- OPTIMIZED RAW QUERIES ---

        // 1. SOLVED BY DIFFICULTY & DOMAIN (EXCLUDE CONTESTS)
        const difficultyStatsPromise = prisma.$queryRaw<any[]>`
            SELECT
                p."difficulty",
                p."domain",
                CAST(COUNT(DISTINCT s."problemId") AS INTEGER) as "count"
            FROM "Submission" s
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND s."contestId" IS NULL
              AND p."type" != 'CONTEST'::"ProblemType"
              AND p."hidden" = false
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            GROUP BY p."difficulty", p."domain"
        `;

        // 2. CONTEST STATS
        const attendedContestsPromise = prisma.contestParticipation.count({
            where: {
                userId,
                acceptedRules: true
            }
        });

        const contestScorePromise = prisma.$queryRaw<any[]>`
            WITH SolvedProblems AS (
                SELECT DISTINCT s."problemId", s."contestId", p."score"
                FROM "Submission" s
                JOIN "Problem" p ON s."problemId" = p."id"
                WHERE s."userId" = ${userId}
                  AND s."status" = 'ACCEPTED'::"SubmissionResult"
                  AND s."mode" = 'SUBMIT'::"SubmissionMode"
                  AND s."contestId" IS NOT NULL
            )
            SELECT
                CAST(COALESCE(SUM("score"), 0) AS INTEGER) as "totalContestScore"
            FROM SolvedProblems
        `;

        // 3. LANGUAGE COUNTS (EXCLUDE CONTESTS)
        const languageStatsPromise = prisma.$queryRaw<any[]>`
            SELECT
                l."name",
                CAST(COUNT(DISTINCT s."problemId") AS INTEGER) as "count"
            FROM "Submission" s
            JOIN "Language" l ON s."languageId" = l."id"
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND s."contestId" IS NULL
              AND p."type" != 'CONTEST'::"ProblemType"
              AND p."hidden" = false
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            GROUP BY l."name"
        `;

        // 4. ACTIVITY DATES (For Streaks)
        const activityDatesPromise = prisma.$queryRaw<{ date: Date }[]>`
            SELECT DISTINCT
                DATE(s."createdAt") as "date"
            FROM "Submission" s
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            ORDER BY "date" ASC
        `;

        // 5. TOTAL PROBLEMS COUNT (METADATA)
        const totalByDifficultyPromise = prisma.problem.groupBy({
            by: ['difficulty'],
            where: {
                hidden: false,
                difficulty: { not: 'CONCEPT' }
            },
            _count: { id: true }
        });

        // 6. TOTAL SOLVED COUNT (PRACTICE ONLY)
        const practiceSolvedCountPromise = prisma.submission.count({
            where: {
                userId,
                status: 'ACCEPTED',
                mode: 'SUBMIT',
                contestId: null,
                problem: {
                    difficulty: { not: 'CONCEPT' },
                    type: { not: 'CONTEST' },
                    hidden: false
                }
            }
        });

        const [user, difficultyStats, contestScoreResult, languageStats, activityDates, totalByDifficulty, attendedContests, practiceSolvedCount] = await Promise.all([
            userPromise,
            difficultyStatsPromise,
            contestScorePromise,
            languageStatsPromise,
            activityDatesPromise,
            totalByDifficultyPromise,
            attendedContestsPromise,
            practiceSolvedCountPromise
        ]);

        if (!user) {
            return null;
        }

        // --- PROCESS DATA ---

        // SOLVED BY DIFFICULTY & DOMAIN breakdown
        const solvedByDifficulty: any = {
            EASY: { count: 0, breakdown: {} },
            MEDIUM: { count: 0, breakdown: {} },
            HARD: { count: 0, breakdown: {} }
        };

        difficultyStats.forEach((row: any) => {
            if (row.difficulty in solvedByDifficulty) {
                solvedByDifficulty[row.difficulty].count += row.count;
                solvedByDifficulty[row.difficulty].breakdown[row.domain] = row.count;
            }
        });

        // CONTEST STATS
        const totalContestScore = contestScoreResult[0]?.totalContestScore || 0;

        // TOTAL PROBLEMS
        const totalProblems = { EASY: 0, MEDIUM: 0, HARD: 0, TOTAL: 0 };
        totalByDifficulty.forEach(group => {
            const count = group._count.id;
            if (group.difficulty in totalProblems) {
                totalProblems[group.difficulty as keyof typeof totalProblems] = count;
            }
            totalProblems.TOTAL += count;
        });

        // LANGUAGE COUNTS
        const languageCounts: Record<string, number> = {};
        languageStats.forEach((row: any) => {
            const langName = row.name;
            let normalizedName = langName;
            if (langName.toLowerCase().includes('cpp') || langName.toLowerCase().includes('c++')) normalizedName = 'Cpp';
            else if (langName.toLowerCase().includes('java')) normalizedName = 'Java';
            else if (langName.toLowerCase().includes('javascript')) normalizedName = 'JavaScript';

            if (!languageCounts[normalizedName]) languageCounts[normalizedName] = 0;
            languageCounts[normalizedName] += row.count;
        });

        // STREAKS (Using persistent fields)
        const currentStreak = user?.currentStreak || 0;
        const bestStreak = user?.longestStreak || 0;

        const result = {
            ...user,
            problemsSolved: practiceSolvedCount, // Override with practice-only count
            solvedByDifficulty,
            totalProblems,
            languageCounts,
            currentStreak,
            bestStreak: Math.max(bestStreak, currentStreak),
            contestStats: {
                attended: attendedContests,
                totalScore: totalContestScore
            }
        };

        // CACHING THE RESULT IN REDIS
        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error('Redis set error:', error);
        }

        return result;
    }
}
