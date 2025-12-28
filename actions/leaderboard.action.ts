"use server";

import { prisma } from "@/lib/prisma";
import { SubmissionResult } from "@prisma/client";

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
    // Fetch users with their accepted submissions to calculate score dynamically
    // Or simpler: Fetch basic user info and use aggregate queries.
    // Given the formula: Easy=10, Medium=30, Hard=50

    // We need to get all users and their solved counts by difficulty
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
    return leaderboard.map((entry, index) => ({
        ...entry,
        rank: index + 1
    }));
}
