import { NextRequest, NextResponse } from "next/server";
import { githubSyncQueue, githubSyncWorkerProcessor } from "@/core/queues/github-sync.queue";
import { runWorkerBatch } from "@/lib/worker-runner";

/**
 * POST /api/worker/github-sync/run
 *
 * Serverless pull-worker for the GitHub sync queue.
 * Triggered by Vercel Cron, Cloudflare Worker Cron, or any external cron service.
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
            githubSyncQueue,
            githubSyncWorkerProcessor,
            5,    // GitHub API rate limits; keep batches small
            24_000
        );

        console.log(`[GithubSyncWorker] Processed: ${result.processed}, Failed: ${result.failed}`);

        return NextResponse.json(result, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[GithubSyncWorker] Fatal error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    return POST(req);
}
