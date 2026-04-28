export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import("@/core/queues/submission.queue");
    await import("@/core/queues/quiz-timer.queue");
  }
}
