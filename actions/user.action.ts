"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { getPointsForDifficulty } from "@/lib/points";

/**
 * Get user's total score (cached for 30 seconds)
 * Cache is invalidated when user solves a problem via revalidateTag
 */
export async function getUserScore(): Promise<number> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return 0;
    }

    const userId = session.user.id;

    // Cache user score for 30 seconds to reduce database load
    // Cache key includes userId to ensure user-specific caching
    const getCachedUserScore = unstable_cache(
        async () => {
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: { totalScore: true }
            });
            return user?.totalScore || 0;
        },
        [`user-score-${userId}`],
        {
            revalidate: 10, // Revalidate every 10 seconds for more responsive updates
            tags: [`user-score-${userId}`] // Tag for manual invalidation if needed
        }
    );

    return getCachedUserScore();
}

/**
 * Recalculate user's total score based on their solved problems
 * This fixes any incorrect scores in the database
 */
export async function recalculateUserScore(): Promise<{ success: boolean; newScore: number }> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;

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
            // @ts-expect-error - Next.js type mismatch
            revalidateTag(`user-score-${userId}`);
        } catch (error) {
            // Cache invalidation might fail, but that's okay
            console.error("Failed to invalidate user score cache:", error);
        }

        return { success: true, newScore: totalScore };
    } catch (error) {
        console.error("Failed to recalculate user score:", error);
        throw new Error("Failed to recalculate user score");
    }
}

/**
 * Complete user onboarding process
 * Updates user profile information and marks onboarding as complete
 */
export async function completeOnboarding(data: {
    bio?: string;
    collageId: string;
    leetCodeHandle?: string;
    codeChefHandle?: string;
    hackerrankHandle?: string;
    githubHandle?: string;
}): Promise<{ success: boolean; error?: string }> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                collageId: data.collageId || null,
                bio: data.bio || null,
                leetCodeHandle: data.leetCodeHandle || null,
                codeChefHandle: data.codeChefHandle || null,
                hackerrankHandle: data.hackerrankHandle || null,
                githubHandle: data.githubHandle || null,
                onboardingCompleted: true
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to complete onboarding:", error);
        return { success: false, error: "Failed to complete onboarding" };
    }
}
