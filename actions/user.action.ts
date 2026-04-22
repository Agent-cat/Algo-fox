"use server";

import { UserService } from "@/core/services/user.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag, cacheTag, cacheLife } from "next/cache";

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
    name?: string;
    bio?: string;
    collegeId: string;
    collegeName: string;
    branch: string;
    year?: string;
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

    const res = await UserService.completeOnboarding(userId, data);

    if (res.success) {
        // Invalidate Redis cache (redundant but good to have here too)
        try {
            const redis = (await import("@/lib/redis")).default;
            await redis.del(`dashboard:stats:${userId}`);
        } catch (error) {
             console.error("Failed to invalidate dashboard redis cache:", error);
        }

        revalidatePath("/dashboard");
        revalidateTag(`user-${userId}`,'max');
        revalidateTag(`dashboard-${userId}`,'max');
        revalidateTag('dashboard-stats','max');
    }

    return res;
}

/**
 * Update user profile information
 */
export async function updateUserInfo(data: {
    name?: string;
    bio?: string;
    collegeId?: string;
    collegeName?: string;
    branch?: string;
    leetCodeHandle?: string;
    codeChefHandle?: string;
    hackerrankHandle?: string;
    codeforcesHandle?: string;
    githubHandle?: string;
}): Promise<{ success: boolean; error?: string }> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    const res = await UserService.updateUserInfo(userId, data);

    if (res.success) {
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/settings");
        revalidateTag(`user-${userId}`,'max');
        revalidateTag(`user-score-${userId}`,'max');
        revalidateTag(`dashboard-${userId}`,'max');
        revalidateTag('dashboard-stats','max');
    }

    return res;
}

/**
 * Sync user profile and stats
 * Clears all caches related to the user and revalidates dashboard
 */
export async function syncUserProfile(): Promise<{ success: boolean; error?: string }> {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = session.user.id;

    try {
        // Invalidate Redis cache
        try {
            const redis = (await import("@/lib/redis")).default;
            await redis.del(`dashboard:stats:${userId}`);
            await redis.del(`user-score-${userId}`);
        } catch (error) {
             console.error("Failed to invalidate redis cache during sync:", error);
        }

        // Revalidate Next.js cache
        revalidatePath("/dashboard");
        revalidateTag(`user-${userId}`,'max');
        revalidateTag(`user-score-${userId}`,'max');
        revalidateTag('dashboard-stats','max');

        return { success: true };
    } catch (error) {
         console.error("Sync failed:", error);
        return { success: false, error: "Failed to sync profile" };
    }
}

/**
 * Get user settings data (cached)
 */
export async function getUserSettings() {
    "use cache: private";
    cacheLife({ stale: 300, revalidate: 300 });

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user?.id) {
        return null;
    }

    const userId = session.user.id;
    cacheTag(`user-${userId}`);

    return UserService.getUserSettings(userId);
}
