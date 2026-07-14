"use server";

import { DashboardService } from "@/core/services/dashboard.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cacheTag, cacheLife } from "next/cache";
import { getSession } from "@/lib/auth-utils";

// GETTING DASHBOARD STATS
export async function getDashboardStats() {
    const session = await getSession();
    // CHECKING IF USER IS AUTHENTICATED --> RETURNING NULL IF NOT AUTHENTICATED
    if (!session?.user) {
        return null;
    }

    const userId = session.user.id;
    return getCachedDashboardStats(userId);
}

async function getCachedDashboardStats(userId: string) {
    "use cache: private";
    cacheLife({ stale: 300, revalidate: 300 }); // 5 minutes for dashboard stats
    cacheTag(`dashboard-${userId}`, 'dashboard-stats');

    return DashboardService.getDashboardStats(userId);
}

// GET USER PROFILE (PUBLIC READ-ONLY)
export async function getUserProfile(userId: string) {
    const session = await getSession();

    // Still require authentication to view profiles
    if (!session?.user) {
        return null;
    }

    return getCachedUserProfile(userId);
}

async function getCachedUserProfile(userId: string) {
    "use cache: private";
    cacheLife({ stale: 300, revalidate: 300 });
    cacheTag(`dashboard-${userId}`, 'dashboard-stats');

    return DashboardService.getDashboardStats(userId);
}
