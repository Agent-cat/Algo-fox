"use server";

import { DashboardService } from "@/core/services/dashboard.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GETTING DASHBOARD STATS
export async function getDashboardStats() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    // CHECKING IF USER IS AUTHENTICATED --> RETURNING NULL IF NOT AUTHENTICATED
    if (!session?.user) {
        return null;
    }

    const userId = session.user.id;

    return DashboardService.getDashboardStats(userId);
}
