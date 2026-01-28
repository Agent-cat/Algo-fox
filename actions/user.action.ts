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
    name?: string;
    bio?: string;
    collegeId: string;
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
        updateTag(`user-${userId}`);
        updateTag(`dashboard-${userId}`);
        updateTag('dashboard-stats');
    }

    return res;
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

    try {
        // Fetch current user to check for changes
        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                codeChefHandle: true,
                codeforcesHandle: true,
                leetCodeHandle: true,
            }
        });

        const updateData: any = {
            name: data.name,
            bio: data.bio,
            leetCodeHandle: data.leetCodeHandle,
            codeChefHandle: data.codeChefHandle,
            codeforcesHandle: data.codeforcesHandle,
            githubHandle: data.githubHandle,
        };

        // Reset verification if handle changed
        if (currentUser) {
            if (data.codeChefHandle !== undefined && data.codeChefHandle !== currentUser.codeChefHandle) {
                updateData.codeChefVerified = false;
            }
            if (data.codeforcesHandle !== undefined && data.codeforcesHandle !== currentUser.codeforcesHandle) {
                updateData.codeforcesVerified = false;
            }
            if (data.leetCodeHandle !== undefined && data.leetCodeHandle !== currentUser.leetCodeHandle) {
                updateData.leetCodeVerified = false;
            }
        }

        await prisma.user.update({
            where: { id: userId },
            data: updateData
        });

        // Invalidate Redis cache
        try {
            const redis = (await import("@/lib/redis")).default;
            await redis.del(`dashboard:stats:${userId}`);
        } catch (error) {
            console.error("Failed to invalidate dashboard redis cache:", error);
        }

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/settings"); // Added to refresh settings page
        updateTag(`user-${userId}`);
        updateTag(`user-score-${userId}`);
        updateTag(`dashboard-${userId}`);
        updateTag('dashboard-stats');
        return { success: true };
    } catch (error) {
        console.error("Failed to update user info:", error);
        return { success: false, error: "Failed to update profile" };
    }
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
        updateTag(`user-${userId}`);
        updateTag(`user-score-${userId}`);
        updateTag('dashboard-stats');

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

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            institution: true
        }
    });

    if (!user) return null;

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        bio: user.bio,
        institutionName: user.institution?.name
    };
}
