import { Queue, Worker, Job } from "bullmq";
import { createRedisConnection } from "@/lib/redis";

const QUEUE_NAME = "quiz-timer-queue";

const queueConnection = createRedisConnection({ maxRetriesPerRequest: null });
const workerConnection = createRedisConnection({ maxRetriesPerRequest: null });

export const quizTimerQueue = new Queue(QUEUE_NAME, {
  connection: queueConnection,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

export async function scheduleQuestionEnd(
  sessionId: string,
  questionIndex: number,
  delayMs: number
): Promise<void> {
  const jobId = `quiz-${sessionId}-q${questionIndex}`;
  await quizTimerQueue.add(
    "end-question",
    { sessionId, questionIndex },
    { delay: delayMs, jobId, removeOnComplete: true, removeOnFail: true }
  );
}

export async function cancelQuestionTimer(sessionId: string, questionIndex: number): Promise<void> {
  const jobId = `quiz-${sessionId}-q${questionIndex}`;
  const job = await quizTimerQueue.getJob(jobId);
  if (job) await job.remove();
}

async function endQuestionWorkerFn(job: Job<{ sessionId: string; questionIndex: number }>) {
  const { sessionId, questionIndex } = job.data;

  const { QuizStore } = await import("@/lib/quiz-store");
  const { prisma } = await import("@/lib/prisma");

  const quiz = await QuizStore.get(sessionId);
  if (!quiz) return;
  if (quiz.status !== "QUESTION_ACTIVE" || quiz.currentQuestion !== questionIndex) return;

  const question = quiz.questions[questionIndex];
  if (!question) return;

  await QuizStore.applyAnswersToScores(sessionId, questionIndex);

  const distribution = await QuizStore.computeDistribution(
    sessionId,
    questionIndex,
    question.options.length
  );

  const participants = await QuizStore.getAllParticipants(sessionId);
  const leaderboard = QuizStore.buildLeaderboard(participants);

  await QuizStore.setStatus(sessionId, "QUESTION_REVIEW", questionIndex);

  await QuizStore.publishEvent(sessionId, {
    type: "QUESTION_ENDED",
    data: {
      questionIndex,
      correctOption: question.correctOption,
      explanation: question.explanation,
      distribution,
      leaderboard,
    },
  });

  const isLastQuestion = questionIndex === quiz.questions.length - 1;
  if (isLastQuestion) {
    await QuizStore.publishEvent(sessionId, {
      type: "QUIZ_ENDED",
      data: { leaderboard },
    });
    await QuizStore.setStatus(sessionId, "ENDED", questionIndex);
    await prisma.user.update({
      where: { id: quiz.teacherId },
      data: { quizzesCreated: { increment: 1 } },
    });
    setTimeout(() => QuizStore.deleteSession(sessionId), 60_000);
  }
}

declare global {
  var __quizTimerWorker: Worker | undefined;
}

if (!globalThis.__quizTimerWorker) {
  globalThis.__quizTimerWorker = new Worker(QUEUE_NAME, endQuestionWorkerFn, {
    connection: workerConnection,
    concurrency: 20,
  });

  const shutdown = async () => {
    if (globalThis.__quizTimerWorker) {
      await globalThis.__quizTimerWorker.close();
    }
    await workerConnection.quit();
    await queueConnection.quit();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
