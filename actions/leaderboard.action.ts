"use server";

import { LeaderboardService } from "@/core/services/leaderboard.service";
import { cacheTag, cacheLife, revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type { LeaderboardEntry } from "@/core/services/leaderboard.service";

async function getCachedLeaderboardData(params: {
    institutionId?: string;
    page: number;
    pageSize: number;
    search: string;
    forceRefresh: boolean;
}) {
    "use cache";
    const { institutionId, page, pageSize, search, forceRefresh } = params;

    cacheLife({ stale: 300, revalidate: 300 });

    cacheTag(
        'leaderboard-global',
        'leaderboard',
        institutionId ? `leaderboard-inst-${institutionId}` : 'leaderboard-none',
        `leaderboard-p-${page}`,
        `leaderboard-s-${search}`
    );

    return LeaderboardService.getGlobalLeaderboard({
        institutionId,
        page,
        pageSize,
        search,
        forceRefresh
    });
}

export async function getLeaderboardData(params: {
    institutionId?: string;
    page?: number;
    pageSize?: number;
    search?: string;
    refresh?: boolean;
}) {
    const {
        institutionId: requestedInstitutionId,
        page = 1,
        pageSize = 50,
        search = "",
        refresh = false
    } = params;

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

    return getCachedLeaderboardData({
        institutionId: targetInstitutionId || undefined,
        page,
        pageSize,
        search,
        forceRefresh: refresh
    });
}
