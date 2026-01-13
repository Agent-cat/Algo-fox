"use server";

import { DashboardService } from "@/core/services/dashboard.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { cacheTag, cacheLife } from "next/cache";

// GETTING DASHBOARD STATS
export async function getDashboardStats() {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 300, revalidate: 300 }); // 5 minutes for dashboard stats

    const session = await auth.api.getSession({
        headers: await headers()
    });
    // CHECKING IF USER IS AUTHENTICATED --> RETURNING NULL IF NOT AUTHENTICATED
    if (!session?.user) {
        return null;
    }

    const userId = session.user.id;

    cacheTag(`dashboard-${userId}`, 'dashboard-stats');

    return DashboardService.getDashboardStats(userId);
}

// GET USER PROFILE (PUBLIC READ-ONLY)
export async function getUserProfile(userId: string) {
    "use cache: private";
    cacheLife({ stale: 300, revalidate: 300 });

    const session = await auth.api.getSession({
        headers: await headers()
    });

    // Still require authentication to view profiles
    if (!session?.user) {
        return null;
    }

    cacheTag(`dashboard-${userId}`, 'dashboard-stats');

    return DashboardService.getDashboardStats(userId);
}
