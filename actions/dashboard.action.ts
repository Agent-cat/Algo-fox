"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { SubmissionResult } from "@prisma/client";
import redis from "@/lib/redis";

export async function getDashboardStats() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return null;
    }

    const userId = session.user.id;

    // Try to get cached data from Redis
    const cacheKey = `dashboard:stats:${userId}`;
    const CACHE_TTL = 5 * 60; // 5 minutes

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (error) {
        // Redis error - continue without cache
        console.error('Redis get error:', error);
    }

    // Get user basic info and submissions
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
                    language: {
                        select: {
                            name: true
                        }
                    },
                    problem: {
                        select: {
                            id: true,
                            difficulty: true,
                            slug: true,
                            title: true
                        }
                    },
                },
                orderBy: {
                    createdAt: 'desc'
                },
                take: 100
            }
        }
    });

    if (!user) {
        return null;
    }

    // Get problems solved by difficulty
    const acceptedSubmissions = await prisma.submission.findMany({
        where: {
            userId: userId,
            status: SubmissionResult.ACCEPTED
        },
        select: {
            problem: {
                select: {
                    difficulty: true
                }
            }
        },
        distinct: ['problemId']
    });

    const solvedByDifficulty = {
        EASY: 0,
        MEDIUM: 0,
        HARD: 0
    };

    acceptedSubmissions.forEach(sub => {
        const difficulty = sub.problem.difficulty;
        if (difficulty in solvedByDifficulty) {
            solvedByDifficulty[difficulty as keyof typeof solvedByDifficulty]++;
        }
    });

    // Get total problems by difficulty
    const totalByDifficulty = await prisma.problem.groupBy({
        by: ['difficulty'],
        where: {
            hidden: false
        },
        _count: {
            id: true
        }
    });

    const totalProblems = {
        EASY: 0,
        MEDIUM: 0,
        HARD: 0,
        TOTAL: 0
    };

    totalByDifficulty.forEach(group => {
        const count = group._count.id;
        totalProblems[group.difficulty] = count;
        totalProblems.TOTAL += count;
    });

    // Get language statistics
    const languageStats = await prisma.submission.findMany({
        where: {
            userId: userId,
            status: SubmissionResult.ACCEPTED
        },
        select: {
            language: {
                select: {
                    name: true
                }
            },
            problemId: true
        },
        distinct: ['problemId', 'languageId']
    });

    const languageCounts: Record<string, number> = {};
    languageStats.forEach(sub => {
        const langName = sub.language.name;
        // Normalize language names
        let normalizedName = langName;
        if (langName.toLowerCase().includes('cpp') || langName.toLowerCase().includes('c++')) {
            normalizedName = 'Cpp';
        } else if (langName.toLowerCase().includes('java')) {
            normalizedName = 'Java';
        } else if (langName.toLowerCase().includes('javascript')) {
            normalizedName = 'JavaScript';
        }

        if (!languageCounts[normalizedName]) {
            languageCounts[normalizedName] = 0;
        }
        languageCounts[normalizedName]++;
    });

    // Calculate streaks
    const allSubmissions = await prisma.submission.findMany({
        where: {
            userId: userId,
            status: SubmissionResult.ACCEPTED
        },
        select: {
            createdAt: true
        },
        distinct: ['problemId'],
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Calculate current streak
    let currentStreak = 0;
    if (allSubmissions.length > 0) {
        const uniqueDates = new Set(
            allSubmissions.map(s => new Date(s.createdAt).toDateString())
        );

        let date = new Date();
        date.setHours(0, 0, 0, 0);

        while (true) {
            if (uniqueDates.has(date.toDateString())) {
                currentStreak++;
                date.setDate(date.getDate() - 1);
            } else {
                if (currentStreak === 0) {
                    date.setDate(date.getDate() - 1);
                    if (uniqueDates.has(date.toDateString())) {
                        currentStreak++;
                        date.setDate(date.getDate() - 1);
                        continue;
                    }
                }
                break;
            }
        }
    }

    // Calculate best streak
    let bestStreak = 0;
    if (allSubmissions.length > 0) {
        const uniqueDates = new Set(
            allSubmissions.map(s => new Date(s.createdAt).toDateString())
        );

        const sortedDates = Array.from(uniqueDates)
            .map(d => new Date(d))
            .sort((a, b) => a.getTime() - b.getTime());

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
    }

    const result = {
        ...user,
        solvedByDifficulty,
        totalProblems,
        languageCounts,
        currentStreak,
        bestStreak: Math.max(bestStreak, currentStreak)
    };

    // Cache the result in Redis
    try {
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    } catch (error) {
        // Redis error - continue without caching
        console.error('Redis set error:', error);
    }

    return result;
}
