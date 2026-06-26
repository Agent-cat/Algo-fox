import { Queue, Job, Worker } from "bullmq";
import { createRedisConnection } from "@/lib/redis";
import { AsyncLocalStorage } from "async_hooks";

export interface WorkerRunResult {
    processed: number;
    failed: number;
    errors: string[];
}

export interface WorkerContext {
    deadline: number;
}

export const workerContextStorage = new AsyncLocalStorage<WorkerContext>();

/**
 * Serverless-safe BullMQ job runner.
 *
 * Instead of a persistent Worker process (which blocks on BRPOP and cannot
 * survive in serverless environments), this helper pulls jobs manually using
 * `worker.getNextJob(token)`, runs the processor function, then acks or nacks
 * the job — all within a single short-lived HTTP request.
 *
 * @param queue      - BullMQ Queue instance to drain from
 * @param processor  - The same async function you would pass to `new Worker()`
 * @param maxJobs    - Maximum number of jobs to process in one invocation (default: 10)
 * @param timeLimitMs - Hard wall-clock limit (default: 25 000ms for serverless safety)
 */
export async function runWorkerBatch<TData = unknown>(
    queue: Queue<TData>,
    processor: (job: Job<TData>) => Promise<unknown>,
    maxJobs = 10,
    timeLimitMs = 25_000
): Promise<WorkerRunResult> {
    const result: WorkerRunResult = { processed: 0, failed: 0, errors: [] };

    // We need a dedicated connection for getNextJob() — it must not be shared
    // with the Queue's own connection to avoid head-of-line blocking.
    const workerConn = createRedisConnection({ maxRetriesPerRequest: null });

    // Instantiating a Worker without a processor function puts it in manual pull mode.
    const worker = new Worker(queue.name, null, {
        connection: workerConn,
    });

    // BullMQ requires a "token" (any unique string) to lock a job for processing
    const token = `serverless-worker-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const deadline = Date.now() + timeLimitMs;

    return workerContextStorage.run({ deadline }, async () => {
        try {
            for (let i = 0; i < maxJobs; i++) {
                if (Date.now() >= deadline) break;

                // Pull one job from the queue — returns null when the queue is empty
                const job = await worker.getNextJob(token) as Job<TData> | undefined;
                if (!job) break; // Queue is empty

                try {
                    const returnValue = await processor(job);
                    await job.moveToCompleted(returnValue as any, token, false);
                    result.processed++;
                } catch (err: unknown) {
                    const message = err instanceof Error ? err.message : String(err);
                    result.errors.push(`Job ${job.id}: ${message}`);

                    const attemptsMade = (job.attemptsMade ?? 0) + 1;
                    const maxAttempts = job.opts?.attempts ?? 1;

                    if (attemptsMade >= maxAttempts) {
                        // Exhausted retries — move to failed
                        await job.moveToFailed(
                            err instanceof Error ? err : new Error(message),
                            token,
                            false
                        );
                    } else {
                        // Still has retries remaining — discard lock so BullMQ
                        // will re-enqueue it with its configured backoff strategy
                        await job.discard();
                    }
                    result.failed++;
                }
            }
        } finally {
            // Always clean up the worker and ephemeral connection
            try {
                await worker.close();
            } catch {
                // Ignore cleanup errors
            }
            try {
                await workerConn.quit();
            } catch {
                // Ignore cleanup errors in serverless context
            }
        }

        return result;
    });
}
