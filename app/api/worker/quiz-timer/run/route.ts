import { NextRequest, NextResponse } from "next/server";
import { quizTimerQueue, quizTimerWorkerProcessor } from "@/core/queues/quiz-timer.queue";
import { runWorkerBatch } from "@/lib/worker-runner";

/**
 * POST /api/worker/quiz-timer/run
 *
 * Serverless pull-worker for the quiz timer queue.
 * Triggered by Vercel Cron, Cloudflare Worker Cron, or external cron.
 *
 * NOTE: The quiz timer uses BullMQ's `delay` option for scheduling.
 * Delayed jobs become available only after their delay elapses, so
 * the cron interval sets the maximum latency (e.g., 10s cron = ≤10s late).
 *
 * Security: Requires `x-worker-secret` header matching WORKER_SECRET env var.
 */
export async function POST(req: NextRequest) {
    const secret = req.headers.get("x-worker-secret");

    if (!process.env.WORKER_SECRET || secret !== process.env.WORKER_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const result = await runWorkerBatch(
            quizTimerQueue,
            quizTimerWorkerProcessor,
            20,   // quiz events are lightweight; drain more per invocation
            24_000
        );

        console.log(`[QuizTimerWorker] Processed: ${result.processed}, Failed: ${result.failed}`);

        return NextResponse.json(result, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[QuizTimerWorker] Fatal error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    return POST(req);
}
