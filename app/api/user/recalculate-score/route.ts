import { NextRequest, NextResponse } from "next/server";
import { recalculateUserScore } from "@/actions/user.action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getRateLimiter, RATE_LIMIT_CONFIGS } from "@/lib/rate-limiter";

export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate-limit per user to prevent DoS via expensive DB recomputation
    const limiter = getRateLimiter();
    const { allowed } = await limiter.checkLimit(session.user.id, RATE_LIMIT_CONFIGS.API_GENERAL);
    if (!allowed) {
        return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    try {
        const result = await recalculateUserScore();
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        console.error("Error recalculating user score:", error);
        return NextResponse.json(
            { error: error.message || "Failed to recalculate score" },
            { status: 500 }
        );
    }
}
