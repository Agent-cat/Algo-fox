
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
                console.log(`[CACHE HIT] Dashboard Stats: ${userId}`);
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
                problemsSolved: true,
                totalScore: true,
                bio: true,
                leetCodeHandle: true,
                codeChefHandle: true,
                hackerrankHandle: true,
                githubHandle: true,
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

        // 1. SOLVED BY DIFFICULTY
        const difficultyStatsPromise = prisma.$queryRaw<any[]>`
            SELECT
                p."difficulty",
                CAST(COUNT(DISTINCT s."problemId") AS INTEGER) as "count"
            FROM "Submission" s
            JOIN "Problem" p ON s."problemId" = p."id"
            WHERE s."userId" = ${userId}
              AND s."status" = 'ACCEPTED'::"SubmissionResult"
              AND s."mode" = 'SUBMIT'::"SubmissionMode"
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            GROUP BY p."difficulty"
        `;

        // 2. LANGUAGE COUNTS
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
              AND p."difficulty" != 'CONCEPT'::"Difficulty"
            GROUP BY l."name"
        `;

        // 3. ACTIVITY DATES (For Streaks)
        // We only need the dates, sorted.
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

        // 4. TOTAL PROBLEMS COUNT (METADATA)
        const totalByDifficultyPromise = prisma.problem.groupBy({
            by: ['difficulty'],
            where: {
                hidden: false,
                difficulty: { not: 'CONCEPT' }
            },
            _count: { id: true }
        });

        const [user, difficultyStats, languageStats, activityDates, totalByDifficulty] = await Promise.all([
            userPromise,
            difficultyStatsPromise,
            languageStatsPromise,
            activityDatesPromise,
            totalByDifficultyPromise
        ]);

        if (!user) {
            return null;
        }

        // --- PROCESS DATA ---

        // SOLVED BY DIFFICULTY
        const solvedByDifficulty = { EASY: 0, MEDIUM: 0, HARD: 0 };
        difficultyStats.forEach((row: any) => {
            if (row.difficulty in solvedByDifficulty) {
                solvedByDifficulty[row.difficulty as keyof typeof solvedByDifficulty] = row.count;
            }
        });

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

        // STREAKS CALCULATION
        let currentStreak = 0;
        let bestStreak = 0;

        // activityDates is array of { date: Date }
        if (activityDates.length > 0) {
            const sortedDates = activityDates.map(d => new Date(d.date));

            // BEST STREAK
            let streak = 1;
            bestStreak = 1;
            for (let i = 1; i < sortedDates.length; i++) {
                // Check diff in days
                const diffTime = Math.abs(sortedDates[i].getTime() - sortedDates[i - 1].getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // Note: With DATE() cast, time is 00:00:00. consecutive days have diffDays = 1.
                // However, timezone issues might make 'date' string parsing tricky.
                // Prisma returns Date object.

                if (diffDays === 1) {
                    streak++;
                    bestStreak = Math.max(bestStreak, streak);
                } else if (diffDays > 1) {
                    streak = 1;
                }
                // if diffDays == 0 (same day), ignore
            }

            // CURRENT STREAK
            // Check if last activity was today or yesterday
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const lastActivity = sortedDates[sortedDates.length - 1];
            const lastActivityTime = new Date(lastActivity);
            lastActivityTime.setHours(0, 0, 0, 0);

            const diffToLast = (today.getTime() - lastActivityTime.getTime()) / (1000 * 60 * 60 * 24);

            if (diffToLast <= 1) {
                // Users is active today or yesterday -> streak is alive.
                // Re-calculate strictly from end
                currentStreak = 1;
                for (let i = sortedDates.length - 1; i > 0; i--) {
                    const curr = sortedDates[i];
                    const prev = sortedDates[i - 1];
                    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
                    if (diff <= 1) { // 1 day or 0 (same day, though distinct query handles that)
                        if (diff === 1) currentStreak++;
                    } else {
                        break;
                    }
                }
            } else {
                currentStreak = 0;
            }
        }

        const result = {
            ...user,
            solvedByDifficulty,
            totalProblems,
            languageCounts,
            currentStreak,
            bestStreak: Math.max(bestStreak, currentStreak) // simple fallback
        };

        // CACHING THE RESULT IN REDIS
        try {
            await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
        } catch (error) {
            console.error('Redis set error:', error);
        }

        // RETURNING THE RESULT
        return result;
    }
}
