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
 *   WORKER_SECRET   — matches WORKER_SECRET in the apps
 *   APP_BASE_URL    — base URL of the deployed Next.js app (web),
 *                     drains the submission queue
 *                     e.g. https://algofox.vercel.app
 *   API_BASE_URL    — base URL of the worker host service (apps/api),
 *                     drains the github-sync + quiz-timer queues.
 *                     Falls back to APP_BASE_URL when unset, in which
 *                     case the web app's equivalent routes drain them.
 */

interface Env {
    WORKER_SECRET: string;
    APP_BASE_URL: string;
    API_BASE_URL?: string;
}

const WEB_QUEUES = ["/api/worker/submission/run"] as const;
const API_QUEUES = [
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
    async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
        ctx.waitUntil(triggerAllQueues(env));
    },
} satisfies ExportedHandler<Env>;

async function triggerAllQueues(env: Env): Promise<Record<string, unknown>> {
    const results: Record<string, unknown> = {};
    const apiBase = env.API_BASE_URL ?? env.APP_BASE_URL;

    const targets = [
        ...WEB_QUEUES.map((path) => `${env.APP_BASE_URL}${path}`),
        ...API_QUEUES.map((path) => `${apiBase}${path}`),
    ];

    await Promise.allSettled(
        targets.map(async (url) => {
            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "x-worker-secret": env.WORKER_SECRET,
                        "Content-Type": "application/json",
                    },
                });
                results[url] = { status: res.status, body: await res.json() };
            } catch (err) {
                results[url] = { error: String(err) };
            }
        })
    );

    return results;
}
