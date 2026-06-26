import { NextRequest, NextResponse } from "next/server";
import { submissionQueue, submissionWorkerProcessor } from "@/core/queues/submission.queue";
import { runWorkerBatch } from "@/lib/worker-runner";

/**
 * POST /api/worker/submission/run
 *
 * Serverless pull-worker for the submission queue.
 * Triggered by:
 *   - Vercel Cron (vercel.json)
 *   - Cloudflare Worker Cron Trigger (wrangler.toml)
 *   - Any external cron service (cron-job.org, etc.)
 *
 * Security: Requires the `x-worker-secret` header to match WORKER_SECRET env var.
 * This prevents unauthorized public invocations.
 */
export async function POST(req: NextRequest) {
    const secret = req.headers.get("x-worker-secret");

    if (!process.env.WORKER_SECRET || secret !== process.env.WORKER_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await runWorkerBatch(
            submissionQueue,
            submissionWorkerProcessor,
            10,   // pull up to 10 submissions per invocation
            24_000 // 24s hard limit — safely under Vercel's 30s / CF's limits
        );

        console.log(`[SubmissionWorker] Processed: ${result.processed}, Failed: ${result.failed}`);

        return NextResponse.json(result, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[SubmissionWorker] Fatal error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// Vercel Cron hits this via GET — redirect to POST logic
// (Vercel Cron always uses GET; wrap it here to keep one handler)
export async function GET(req: NextRequest) {
    return POST(req);
}
