import { NextRequest, NextResponse } from "next/server";
import { SubmissionService } from "@/core/services/submission.service";
import { addSubmissionJob } from "@/core/queues/submission.queue";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getRateLimiter, RATE_LIMIT_CONFIGS } from "@/lib/rate-limiter";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const problemId = searchParams.get("problemId");
    const contestId = searchParams.get("contestId");

    if (!userId || !problemId) {
        return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    try {
        const { prisma } = await import("@/lib/prisma");
        const submissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId,
                contestId: contestId || null,
                mode: "SUBMIT"
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
            include: {
                language: true
            }
        });

        return NextResponse.json(submissions);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, problemId, languageId, code, mode = "SUBMIT", contestId, customTestCases } = body;

        // RATE LIMIT CHECK (Defense-in-depth)
        const limiter = getRateLimiter();
        const { allowed } = await limiter.checkLimit(userId || "anonymous", RATE_LIMIT_CONFIGS.SUBMISSIONS);
        if (!allowed) {
            return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
        }

        if (!userId || !problemId || !languageId || !code) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // CONTEST SECURITY CHECKS
        if (contestId) {
            const { ContestService } = await import("@/core/services/contest.service");
            const validation = await ContestService.validateSession(userId, contestId);

            if (!validation.success) {
                return NextResponse.json({ error: validation.error }, { status: 403 });
            }
        }



        // 1. Create Submission in DB (SUBMIT MODE)
        const submission = await SubmissionService.createSubmission(userId, problemId, languageId, code, mode, contestId);

        // Invalidate Tracking Cache so teachers see "Pending" immediately
        await SubmissionService.invalidateClassroomTracking(userId);

        // 2. Add to Queue
        await addSubmissionJob(submission.id, customTestCases);

        return NextResponse.json({ submissionId: submission.id }, { status: 201 });

    } catch (error) {
        console.error("Submission API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
