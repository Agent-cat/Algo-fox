/**
 * algofox-api — worker host service (Hono).
 *
 * Hosts the pull-worker endpoints for queues whose processors are
 * runtime-agnostic (live in @algofox/queue):
 *   POST /api/worker/github-sync/run
 *   POST /api/worker/quiz-timer/run
 * Paths intentionally mirror apps/web so triggers and cron can
 * swap base URLs without path logic.
 *
 * The submission queue stays drained by apps/web
 * (POST /api/worker/submission/run) because its processor depends
 * on Next.js cache revalidation.
 *
 * Auth, limits, batch sizes, and response shapes mirror the
 * equivalent apps/web routes exactly.
 */
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { env } from "@algofox/env";
import {
  runWorkerBatch,
  githubSyncQueue,
  githubSyncWorkerProcessor,
  quizTimerQueue,
  quizTimerWorkerProcessor,
} from "@algofox/queue";

const app = new Hono();

function checkSecret(secret: string | undefined): boolean {
  return !!env.WORKER_SECRET && secret === env.WORKER_SECRET;
}

async function drainGithubSync() {
  return runWorkerBatch(
    githubSyncQueue,
    githubSyncWorkerProcessor,
    5, // GitHub API rate limits; keep batches small
    24_000,
  );
}

async function drainQuizTimer() {
  return runWorkerBatch(
    quizTimerQueue,
    quizTimerWorkerProcessor,
    20, // quiz events are lightweight; drain more per invocation
    24_000,
  );
}

for (const method of ["post", "get"] as const) {
  app[method]("/api/worker/github-sync/run", async (c) => {
    if (!checkSecret(c.req.header("x-worker-secret"))) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    try {
      const result = await drainGithubSync();
      console.log(
        `[GithubSyncWorker] Processed: ${result.processed}, Failed: ${result.failed}`,
      );
      return c.json(result, 200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[GithubSyncWorker] Fatal error:", message);
      return c.json({ error: message }, 500);
    }
  });

  app[method]("/api/worker/quiz-timer/run", async (c) => {
    if (!checkSecret(c.req.header("x-worker-secret"))) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    try {
      const result = await drainQuizTimer();
      console.log(
        `[QuizTimerWorker] Processed: ${result.processed}, Failed: ${result.failed}`,
      );
      return c.json(result, 200);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[QuizTimerWorker] Fatal error:", message);
      return c.json({ error: message }, 500);
    }
  });
}

app.get("/healthz", (c) => c.json({ ok: true }));

const port = Number(process.env.PORT ?? 3001);
console.log(`[algofox-api] listening on :${port}`);
serve({ fetch: app.fetch, port });
