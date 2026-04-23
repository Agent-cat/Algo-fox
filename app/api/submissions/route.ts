import { NextRequest, NextResponse } from "next/server";
import { SubmissionService } from "@/core/services/submission.service";
import { addSubmissionJob } from "@/core/queues/submission.queue";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getRateLimiter, RATE_LIMIT_CONFIGS } from "@/lib/rate-limiter";
import { getVerifiedClientIP } from "@/lib/ip";

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

        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || session.user.id !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // ROLE CHECK: Only non-USER roles can submit
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        });

        if (!user || (user.role as string) === "USER") {
            return NextResponse.json({ error: "Subscription required to run or submit problems" }, { status: 403 });
        }

        // Get and verify client IP for contest submissions (security)
        const clientIP = await getVerifiedClientIP();

        // CONTEST SECURITY CHECKS
        if (contestId) {
            const { ContestService } = await import("@/core/services/contest.service");
            const { sessionId } = body;

            // CRITICAL: sessionId MUST be provided for contest submissions
            if (!sessionId) {
                return NextResponse.json(
                    { error: "Session ID required for contest submissions" },
                    { status: 400 }
                );
            }

            // Validate session
            const validation = await ContestService.validateSession(userId, contestId, sessionId);
            if (!validation.success) {
                return NextResponse.json({ error: validation.error }, { status: 403 });
            }

            // SERVER-SIDE PROCTORING CHECK: Verify user is not blocked due to violations
            const isSubmissionBlocked = await ContestService.isSubmissionBlocked(userId, contestId);
            if (isSubmissionBlocked) {
                return NextResponse.json(
                    { error: "Your submission has been blocked due to integrity violations. Contact administrators." },
                    { status: 403 }
                );
            }

            // IP VALIDATION: Detect multi-device/spoofing attempts
            if (validation.participation?.ipAddress &&
                clientIP &&
                validation.participation.ipAddress !== clientIP) {
                // Log suspicious activity for audit trail
                 console.warn(`[Security] IP change detected for user ${userId} in contest ${contestId}: ${validation.participation.ipAddress} → ${clientIP}`);
                // Note: We allow submission but log it - admins can review suspicious activity
            }
        }



        // 1. Create Submission in DB (SUBMIT MODE)
        const submission = await SubmissionService.createSubmission(userId, problemId, languageId, code, mode, contestId);

        // Store IP address for contest submissions (for multi-device detection)
        if (contestId && clientIP) {
            await prisma.contestParticipation.updateMany({
                where: { userId, contestId },
                data: { ipAddress: clientIP }
            });
        }

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
