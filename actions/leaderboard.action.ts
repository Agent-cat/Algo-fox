"use server";

import { LeaderboardService } from "@/core/services/leaderboard.service";

export type { LeaderboardEntry } from "@/core/services/leaderboard.service";

export async function getLeaderboardData() {
    return LeaderboardService.getGlobalLeaderboard();
}
