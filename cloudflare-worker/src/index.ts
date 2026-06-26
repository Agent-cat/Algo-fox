/**
 * Cloudflare Worker — Cron Trigger for Algo-fox Pull Workers
 *
 * This Worker runs on a schedule and calls the three pull-worker HTTP
 * endpoints on the deployed Next.js app (Vercel / Cloudflare Pages).
 *
 * Deploy separately with: wrangler deploy
 * Configure the schedule in wrangler.toml (see below).
 *
 * Environment variables required (set via `wrangler secret put`):
 *   WORKER_SECRET   — matches WORKER_SECRET in the Next.js app
 *   APP_BASE_URL    — base URL of the deployed Next.js app
 *                     e.g. https://algofox.vercel.app
 */

interface Env {
    WORKER_SECRET: string;
    APP_BASE_URL: string;
}

const QUEUES = [
    "/api/worker/submission/run",
    "/api/worker/github-sync/run",
    "/api/worker/quiz-timer/run",
] as const;

export default {
    // HTTP fetch handler — useful for manual triggers / health checks
    async fetch(_req: Request, env: Env): Promise<Response> {
        const results = await triggerAllQueues(env);
        return Response.json({ ok: true, results });
    },

    // Scheduled cron handler — called automatically by Cloudflare
    async scheduled(_event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
        ctx.waitUntil(triggerAllQueues(env));
    },
} satisfies ExportedHandler<Env>;

async function triggerAllQueues(env: Env): Promise<Record<string, unknown>> {
    const results: Record<string, unknown> = {};

    await Promise.allSettled(
        QUEUES.map(async (path) => {
            const url = `${env.APP_BASE_URL}${path}`;
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "x-worker-secret": env.WORKER_SECRET,
                        "Content-Type": "application/json",
                    },
                });
                results[path] = { status: res.status, body: await res.json() };
            } catch (err) {
                results[path] = { error: String(err) };
            }
        })
    );

    return results;
}
