"use server";

// ====================OPTIMIZATOION NEEDED HERE====================

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { SubmissionResult, Difficulty } from "@prisma/client";
import redis from "@/lib/redis";

// GETTING DASHBOARD STATS
export async function getDashboardStats() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    // CHECKING IF USER IS AUTHENTICATED --> RETURNING NULL IF NOT AUTHENTICATED
    if (!session?.user) {
        return null;
    }

    const userId = session.user.id;



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

    // FETCHING USER DATA (LITE) - BLOCKING TO FAIL FAST AND REDUCE INITIAL CONNECTION SPIKE

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            problemsSolved: true,
            totalScore: true,
            submissions: {
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
                take: 100
            }
        }
    });

    if (!user) {
        return null;
    }

    // 2. Parallelize remaining stats queries (Reduced from 5 to 3 concurrent connections)

    // COMBINED QUERY: submissions for Difficulty Breakdown AND Streaks
    // Both require: userId, status=ACCEPTED, distinct: problemId
    const solvedProblemsPromise = prisma.submission.findMany({
        where: { userId: userId, status: SubmissionResult.ACCEPTED },
        select: {
            createdAt: true,
            problem: { select: { difficulty: true } }
        },
        distinct: ['problemId'],
        orderBy: { createdAt: 'desc' }
    });

    // LANGUAGE STATS: NEEDS DISTINCT BY (problemId, languageId)
    const languageStatsPromise = prisma.submission.findMany({
        where: { userId: userId, status: SubmissionResult.ACCEPTED },
        select: {
            language: { select: { name: true } },
            problemId: true
        },
        distinct: ['problemId', 'languageId']
    });

    // TOTAL PROBLEMS COUNT (METADATA)
    const totalByDifficultyPromise = (prisma as any).problem.groupBy({
        by: ['difficulty'],
        where: { hidden: false },
        _count: { id: true }
    });

    const [solvedProblems, languageStats, totalByDifficulty] = await Promise.all([
        solvedProblemsPromise,
        languageStatsPromise,
        totalByDifficultyPromise
    ]);

    // --- Process Data (CPU bound, fast) ---

    // SOLVED BY DIFFICULTY
    const solvedByDifficulty = { EASY: 0, MEDIUM: 0, HARD: 0 };
    solvedProblems.forEach(sub => {
        const diff = sub.problem.difficulty;
        if (diff in solvedByDifficulty) {
            solvedByDifficulty[diff as keyof typeof solvedByDifficulty]++;
        }
    });

    // TOTAL PROBLEMS
    const totalProblems = { EASY: 0, MEDIUM: 0, HARD: 0, TOTAL: 0 };
    (totalByDifficulty as { difficulty: Difficulty; _count: { id: number } }[]).forEach(group => {
        const count = group._count.id;
        if (group.difficulty in totalProblems) {
            totalProblems[group.difficulty as keyof typeof totalProblems] = count;
        }
        totalProblems.TOTAL += count;
    });

    // LANGUAGE COUNTS
    const languageCounts: Record<string, number> = {};
    languageStats.forEach(sub => {
        const langName = sub.language.name;
        let normalizedName = langName;
        if (langName.toLowerCase().includes('cpp') || langName.toLowerCase().includes('c++')) normalizedName = 'Cpp';
        else if (langName.toLowerCase().includes('java')) normalizedName = 'Java';
        else if (langName.toLowerCase().includes('javascript')) normalizedName = 'JavaScript';

        if (!languageCounts[normalizedName]) languageCounts[normalizedName] = 0;
        languageCounts[normalizedName]++;
    });

    // STREAKS CALCULATION
    let currentStreak = 0;
    let bestStreak = 0;

    if (solvedProblems.length > 0) {
        const uniqueDates = new Set(solvedProblems.map(s => new Date(s.createdAt).toDateString()));
        const sortedDates = Array.from(uniqueDates)
            .map(d => new Date(d))
            .sort((a, b) => a.getTime() - b.getTime());

        // BEST STREAK
        let streak = 1;
        bestStreak = 1;
        for (let i = 1; i < sortedDates.length; i++) {
            const diff = Math.floor((sortedDates[i].getTime() - sortedDates[i - 1].getTime()) / (1000 * 60 * 60 * 24));
            if (diff === 1) {
                streak++;
                bestStreak = Math.max(bestStreak, streak);
            } else {
                streak = 1;
            }
        }

        // CURRENT STREAK
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        // CHECKING TODAY
        if (uniqueDates.has(date.toDateString())) {
            currentStreak++;
            date.setDate(date.getDate() - 1);
            while (uniqueDates.has(date.toDateString())) {
                currentStreak++;
                date.setDate(date.getDate() - 1);
            }
        } else {
            // CHECKING YESTERDAY
            date.setDate(date.getDate() - 1);
            if (uniqueDates.has(date.toDateString())) {
                currentStreak++;
                date.setDate(date.getDate() - 1);
                while (uniqueDates.has(date.toDateString())) {
                    currentStreak++;
                    date.setDate(date.getDate() - 1);
                }
            }
        }
    }

    const result = {
        ...user,
        solvedByDifficulty,
        totalProblems,
        languageCounts,
        currentStreak, // USED CALCULATED STREAK
        bestStreak: Math.max(bestStreak, currentStreak)
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
