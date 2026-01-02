import { NextRequest, NextResponse } from "next/server";
import { recalculateUserScore } from "@/actions/user.action";

export async function POST(req: NextRequest) {
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

