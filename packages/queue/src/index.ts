/**
 * @algofox/queue — background-job domain.
 *
 * BullMQ queue definitions + the serverless pull-runner + the judge
 * pipeline support modules (languages, SQL converter, quiz state,
 * GitHub sync service). The submission *processor* stays in
 * `apps/web` because it depends on Next.js cache revalidation;
 * everything here is runtime-agnostic and shared by `apps/web`
 * and `apps/api`.
 */
export {
  runWorkerBatch,
  workerContextStorage,
} from "./worker-runner";
export type { WorkerRunResult, WorkerContext } from "./worker-runner";
export { triggerWorker } from "./trigger-worker";
export type { WorkerQueue } from "./trigger-worker";
export {
  quizTimerQueue,
  scheduleQuestionEnd,
  cancelQuestionTimer,
  scheduleSessionCleanup,
  quizTimerWorkerProcessor,
} from "./quiz-timer.queue";
export {
  githubSyncQueue,
  addGithubSyncJob,
  addGithubBatchSyncJob,
  githubSyncWorkerProcessor,
} from "./github-sync.queue";
export { QuizStore } from "./quiz-store";
export { GithubService } from "./github";
export { getLanguageById, LANGUAGES, DEFAULT_LANGUAGE_ID } from "./languages";
export { convertBatchToSQLite } from "./sql-converter";
