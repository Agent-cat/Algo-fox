export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import the worker to ensure it starts processing the queue
    await import("@/core/queues/submission.queue");
  }
}
