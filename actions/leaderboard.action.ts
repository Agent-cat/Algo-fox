"use server";

import { LeaderboardService } from "@/core/services/leaderboard.service";
import { cacheTag, cacheLife } from "next/cache";

export type { LeaderboardEntry } from "@/core/services/leaderboard.service";

export async function getLeaderboardData() {
    "use cache";
    cacheLife({ stale: 300, revalidate: 300 }); // 5 minutes - leaderboard updates frequently
    
    cacheTag('leaderboard-global', 'leaderboard');

    return LeaderboardService.getGlobalLeaderboard();
}
