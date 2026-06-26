/**
 * Immediately triggers a pull-worker endpoint in a fire-and-forget fashion.
 *
 * This enables the "Option 3" pattern: instead of waiting up to 1 minute for
 * a cron job, the worker is kicked the instant a job is enqueued. The cron
 * remains as a safety net for jobs that slip through (e.g., if the trigger
 * fetch fails due to a network blip).
 *
 * Design decisions:
 *
 * 1. NEVER awaited — the HTTP response time of the worker (up to 24s) must
 *    not block the API response to the user. We return 201 immediately.
 *
 * 2. Errors are swallowed — a failed trigger is non-fatal. The cron fallback
 *    will eventually drain the queue. We log warnings for observability.
 *
 * 3. No deduplication lock — BullMQ's native job locking handles concurrency.
 *    If 5 users submit simultaneously, 5 worker invocations fire in parallel,
 *    each picks a different job by BullMQ token, and all 5 run concurrently.
 *    This is faster than serializing through a Redis lock.
 *
 * 4. Self-referential fetch — the app calls its own HTTP endpoint. This works
 *    because the worker route handler is a normal Next.js route and not part
 *    of the current request's call stack.
 */

export type WorkerQueue = "submission" | "github-sync" | "quiz-timer";

/**
 * Derives the base URL for self-referential worker calls.
 * Priority: APP_BASE_URL → NEXTAUTH_URL → BETTER_AUTH_URL → localhost fallback
 */
function getBaseUrl(): string {
    return (
        process.env.APP_BASE_URL ??
        process.env.NEXTAUTH_URL ??
        process.env.BETTER_AUTH_URL ??
        "http://localhost:3000"
    );
}

/**
 * Fires a POST request to the worker endpoint for the given queue.
 * Never throws. Never awaited by the caller.
 */
export function triggerWorker(queue: WorkerQueue): void {
    const secret = process.env.WORKER_SECRET;

    if (!secret) {
        // In development without a secret set, skip silently.
        // The worker endpoint requires the secret, so this is a no-op.
        if (process.env.NODE_ENV !== "production") {
            console.warn(`[WorkerTrigger] WORKER_SECRET not set — skipping immediate trigger for "${queue}"`);
        }
        return;
    }

    const url = `${getBaseUrl()}/api/worker/${queue}/run`;

    // Intentionally NOT awaited — fire and forget
    fetch(url, {
        method: "POST",
        headers: {
            "x-worker-secret": secret,
            "Content-Type": "application/json",
        },
    }).catch((err: unknown) => {
        // Non-fatal: cron will pick up the job within 1 minute as a fallback
        const message = err instanceof Error ? err.message : String(err);
        console.warn(`[WorkerTrigger] Immediate trigger for "${queue}" failed (cron will retry): ${message}`);
    });
}
