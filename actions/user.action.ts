"use server";

import { UserService } from "@/core/services/user.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

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

    return UserService.completeOnboarding(userId, data);
}
