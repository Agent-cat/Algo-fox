"use server";

import { UserService } from "@/core/services/user.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath, updateTag, cacheTag, cacheLife } from "next/cache";

/**
 * Get user's total score (cached for 5 minutes)
 * Cache is invalidated when user solves a problem via updateTag
 */

export async function getUserScore(): Promise<number> {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 300, revalidate: 300 }); // 5 minutes

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return 0;
    }

    const userId = session.user.id;

    cacheTag(`user-score-${userId}`, `user-${userId}`);

    return UserService.getUserScore(userId);
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

    return UserService.recalculateUserScore(userId);
}

/**
 * Complete user onboarding process
 * Updates user profile information and marks onboarding as complete
 */
export async function completeOnboarding(data: {
    bio?: string;
    collegeId: string;
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

    return UserService.completeOnboarding(userId, data);
}

/**
 * Update user profile information
 */
export async function updateUserInfo(data: {
    name?: string;
    bio?: string;
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
                name: data.name,
                bio: data.bio,
                leetCodeHandle: data.leetCodeHandle,
                codeChefHandle: data.codeChefHandle,
                hackerrankHandle: data.hackerrankHandle,
                githubHandle: data.githubHandle,
            }
        });

        revalidatePath("/dashboard");
        updateTag(`user-${userId}`);
        updateTag(`user-score-${userId}`);
        updateTag('dashboard-stats');
        return { success: true };
    } catch (error) {
        console.error("Failed to update user info:", error);
        return { success: false, error: "Failed to update profile" };
    }
}
