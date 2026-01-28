"use server";

import { LeaderboardService } from "@/core/services/leaderboard.service";
import { cacheTag, cacheLife } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type { LeaderboardEntry } from "@/core/services/leaderboard.service";

async function getCachedLeaderboardData(institutionId?: string, forceRefresh: boolean = false) {
    "use cache";
    if (forceRefresh) {
        // Skip cache directive essentially
    }
    cacheLife({ stale: 300, revalidate: 300 });

    cacheTag('leaderboard-global', 'leaderboard', institutionId ? `leaderboard-inst-${institutionId}` : 'leaderboard-none');

    return LeaderboardService.getGlobalLeaderboard(institutionId, forceRefresh);
}

export async function getLeaderboardData(requestedInstitutionId?: string, refresh: boolean = false) {
    // Get session outside of the "use cache" scope because headers() is dynamic
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const isAuthorized = session?.user?.role === "ADMIN";

    // Default to user's institution
    let targetInstitutionId = session?.user?.institutionId;

    // Only admins can request a specific institution or "all"
    if (isAuthorized && requestedInstitutionId) {
        targetInstitutionId = requestedInstitutionId === "all" ? undefined : requestedInstitutionId;
    }

    return getCachedLeaderboardData(targetInstitutionId || undefined, refresh);
}
