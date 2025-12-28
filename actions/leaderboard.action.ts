"use server";

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
        linkedin: string | null; // Assuming we might add this later, or map from something else
    };
    stats: {
        easy: number;
        medium: number;
        hard: number;
    };
};

export async function getLeaderboardData() {
    // Try to get cached leaderboard from Redis
    const cacheKey = 'leaderboard:global';
    const CACHE_TTL = 10 * 60; // 10 minutes

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
    } catch (error) {
        // Redis error - continue without cache
        console.error('Redis get error:', error);
    }

    // Fetch users with their accepted submissions to calculate score dynamically
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            image: true,
            tags: true,
            leetCodeHandle: true,
            codeChefHandle: true,
            githubHandle: true,
            // We can fetch submissions to calculate precise score
            submissions: {
                where: {
                    status: SubmissionResult.ACCEPTED
                },
                select: {
                    problem: {
                        select: {
                            id: true,
                            difficulty: true
                        }
                    }
                },
                distinct: ['problemId'] // Ensure unique solved problems
            }
        }
        // distinct: ['id'] // users are distinct by default
    });

    const leaderboard: LeaderboardEntry[] = users.map(user => {
        let easyCount = 0;
        let mediumCount = 0;
        let hardCount = 0;

        user.submissions.forEach(sub => {
            if (sub.problem.difficulty === 'EASY') easyCount++;
            else if (sub.problem.difficulty === 'MEDIUM') mediumCount++;
            else if (sub.problem.difficulty === 'HARD') hardCount++;
        });

        // Scoring Formula
        const score = (easyCount * 10) + (mediumCount * 30) + (hardCount * 50);

        return {
            rank: 0, // Assigned after sort
            userId: user.id,
            name: user.name,
            image: user.image,
            tags: user.tags,
            problemsSolved: easyCount + mediumCount + hardCount,
            totalScore: score,
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

    // Sort by Total Score Descending
    leaderboard.sort((a, b) => b.totalScore - a.totalScore);

    // Assign Ranks
    const result = leaderboard.map((entry, index) => ({
        ...entry,
        rank: index + 1
    }));

    // Cache the leaderboard in Redis
    try {
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    } catch (error) {
        // Redis error - continue without caching
        console.error('Redis set error:', error);
    }

    return result;
}
