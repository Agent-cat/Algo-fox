import { Queue, Worker, Job } from "bullmq";
import { createRedisConnection } from "@/lib/redis";
import { prisma } from "@/lib/prisma";
import { GithubService } from "@/lib/github";
import { getLanguageById } from "@/lib/languages";

const QUEUE_NAME = "github-sync-queue";

const queueConnection = createRedisConnection({ maxRetriesPerRequest: null });
const workerConnection = createRedisConnection({ maxRetriesPerRequest: null });

export const githubSyncQueue = new Queue(QUEUE_NAME, {
  connection: queueConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});

export const addGithubSyncJob = async (submissionId: string) => {
  await githubSyncQueue.add("sync-submission", { type: "single", submissionId });
};

export const addGithubBatchSyncJob = async (userId: string) => {
  await githubSyncQueue.add("sync-batch", { type: "batch", userId });
};

async function workerProcessor(job: Job<any>) {
  const { type } = job.data;

  if (type === "batch") {
    return processBatchSync(job);
  }

  const { submissionId } = job.data;

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        problem: true,
        user: true,
        language: true,
      },
    });

    if (!submission) throw new Error("Submission not found");

    const { problem, user, status } = submission;

    // Check if domain is DSA or SQL
    if (problem.domain !== "DSA" && problem.domain !== "SQL") {
      console.info(`[GithubSyncWorker] Domain ${problem.domain} not supported for sync. Skipping.`);
      return;
    }

    // Check if sync is enabled
    if (!user.githubAutoSync || !user.githubRepo) {
      console.info(`[GithubSyncWorker] Auto-sync disabled or no repo configured for user ${user.id}. Skipping.`);
      return;
    }

    // Check sync mode
    if (user.githubSyncMode === "MANUAL") {
      console.info(`[GithubSyncWorker] Sync mode is MANUAL. Skipping auto-sync.`);
      return;
    }

    if (user.githubSyncMode === "ACCEPTED_ONLY" && status !== "ACCEPTED") {
      console.info(`[GithubSyncWorker] Submission is not ACCEPTED. Sync mode is ACCEPTED_ONLY. Skipping.`);
      return;
    }

    const token = await GithubService.getGithubToken(user.id);
    if (!token) {
      console.warn(`[GithubSyncWorker] No GitHub token found for user ${user.id}. Skipping.`);
      return;
    }

    let githubHandle = user.githubHandle;
    if (!githubHandle) {
      const res = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "Algo-fox-sync",
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (res.ok) {
        const profile = await res.json();
        githubHandle = profile.login;
        if (githubHandle) {
          await prisma.user.update({
            where: { id: user.id },
            data: { githubHandle },
          });
        }
      }
    }

    if (!githubHandle) {
      console.warn(`[GithubSyncWorker] GitHub handle not found for user ${user.id}. Skipping.`);
      return;
    }

    // Ensure repo exists
    const repoExists = await GithubService.checkRepoExists(token, user.githubRepo);
    if (!repoExists) {
      console.info(`[GithubSyncWorker] Repo ${user.githubRepo} does not exist. Creating...`);
      const created = await GithubService.createRepository(token, user.githubRepo);
      if (!created) {
        throw new Error(`Failed to create repository ${user.githubRepo}`);
      }
    }

    // Determine file path
    const language = getLanguageById(submission.language.judge0Id);
    if (!language) {
      throw new Error(`Language ID ${submission.language.judge0Id} not found`);
    }

    let extension = language.monacoLanguage === "javascript" ? "js" :
                    language.monacoLanguage === "typescript" ? "ts" :
                    language.monacoLanguage === "python" ? "py" :
                    language.monacoLanguage === "java" ? "java" :
                    language.monacoLanguage === "c" ? "c" :
                    language.monacoLanguage === "cpp" ? "cpp" :
                    language.monacoLanguage === "csharp" ? "cs" :
                    language.monacoLanguage === "rust" ? "rs" :
                    language.monacoLanguage === "go" ? "go" :
                    language.monacoLanguage === "sql" ? "sql" : "txt";

    // Clean problem title for folder name
    const cleanTitle = problem.title.replace(/[^a-zA-Z0-9]/g, "");
    
    // Determine the submission number
    const submissionCount = await prisma.submission.count({
      where: {
        userId: user.id,
        problemId: problem.id,
        createdAt: {
          lte: submission.createdAt
        }
      }
    });

    const filePath = `${problem.domain}/${cleanTitle}/Submission ${submissionCount}.${extension}`;

    // Format commit message
    const commitMessage = `feat: solve ${problem.title} in ${language.name}`;

    // Push to GitHub
    const success = await GithubService.pushFileToGithub(
      token,
      githubHandle,
      user.githubRepo,
      filePath,
      submission.code,
      commitMessage
    );

    if (success) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastSyncedAt: new Date() },
      });
      await prisma.submission.update({
        where: { id: submission.id },
        data: { githubSyncedAt: new Date() },
      });
      console.log(`[GithubSyncWorker] Successfully pushed ${filePath} for user ${user.id}`);
    } else {
      throw new Error("Failed to push file to GitHub");
    }

  } catch (error) {
    console.error(`[GithubSyncWorker] Error processing job ${job.id}:`, error);
    throw error;
  }
}

async function processBatchSync(job: Job<any>) {
  const { userId } = job.data;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.githubRepo || !user.githubAutoSync) {
      console.info(`[GithubSyncWorker] Batch sync skipped for user ${userId}. Repo/AutoSync not configured.`);
      return;
    }

    const token = await GithubService.getGithubToken(user.id);
    if (!token) {
      console.warn(`[GithubSyncWorker] No GitHub token found for user ${user.id}. Skipping batch.`);
      return;
    }

    let githubHandle = user.githubHandle;
    if (!githubHandle) {
      const res = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "Algo-fox-sync",
          Accept: "application/vnd.github.v3+json",
        },
      });
      if (res.ok) {
        const profile = await res.json();
        githubHandle = profile.login;
        if (githubHandle) {
          await prisma.user.update({
            where: { id: user.id },
            data: { githubHandle },
          });
        }
      }
    }

    if (!githubHandle) {
      console.warn(`[GithubSyncWorker] GitHub handle not found for user ${user.id}. Skipping batch.`);
      return;
    }

    const repoExists = await GithubService.checkRepoExists(token, user.githubRepo);
    if (!repoExists) {
      const created = await GithubService.createRepository(token, user.githubRepo);
      if (!created) {
        throw new Error(`Failed to create repository ${user.githubRepo}`);
      }
    }

    const whereClause: any = {
      userId,
      mode: "SUBMIT",
      githubSyncedAt: null,
    };

    if (user.githubSyncMode === "ACCEPTED_ONLY") {
      whereClause.status = "ACCEPTED";
    }

    const submissions = await prisma.submission.findMany({
      where: whereClause,
      include: {
        problem: true,
        language: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    if (submissions.length === 0) {
      console.info(`[GithubSyncWorker] No submissions to batch sync for user ${userId}.`);
      return;
    }

    // Prepare files payload
    const files: { path: string; content: string }[] = [];
    const submissionCounts: Record<string, number> = {};

    for (const sub of submissions) {
      if (sub.problem.domain !== "DSA" && sub.problem.domain !== "SQL") continue;

      const language = getLanguageById(sub.language.judge0Id);
      if (!language) continue;

      let extension = language.monacoLanguage === "javascript" ? "js" :
                      language.monacoLanguage === "typescript" ? "ts" :
                      language.monacoLanguage === "python" ? "py" :
                      language.monacoLanguage === "java" ? "java" :
                      language.monacoLanguage === "c" ? "c" :
                      language.monacoLanguage === "cpp" ? "cpp" :
                      language.monacoLanguage === "csharp" ? "cs" :
                      language.monacoLanguage === "rust" ? "rs" :
                      language.monacoLanguage === "go" ? "go" :
                      language.monacoLanguage === "sql" ? "sql" : "txt";

      const cleanTitle = sub.problem.title.replace(/[^a-zA-Z0-9]/g, "");
      
      const probKey = sub.problem.id;
      if (!submissionCounts[probKey]) {
        // Need to find out what the next count should be
        const existingCount = await prisma.submission.count({
          where: {
            userId: user.id,
            problemId: sub.problem.id,
            createdAt: { lt: sub.createdAt }
          }
        });
        submissionCounts[probKey] = existingCount;
      }
      submissionCounts[probKey] += 1;
      const count = submissionCounts[probKey];

      const filePath = `${sub.problem.domain}/${cleanTitle}/Submission ${count}.${extension}`;
      files.push({ path: filePath, content: sub.code });
    }

    if (files.length === 0) {
       console.info(`[GithubSyncWorker] No valid files generated for batch sync for user ${userId}.`);
       return;
    }

    const commitMessage = `feat: batch sync ${files.length} submissions`;
    
    const success = await GithubService.pushMultipleFilesToGithub(
      token,
      githubHandle,
      user.githubRepo,
      files,
      commitMessage
    );

    if (success) {
      await prisma.user.update({
        where: { id: user.id },
        data: { lastSyncedAt: new Date() },
      });
      await prisma.submission.updateMany({
        where: { id: { in: submissions.map(s => s.id) } },
        data: { githubSyncedAt: new Date() },
      });
      console.log(`[GithubSyncWorker] Successfully batch pushed ${files.length} files for user ${user.id}`);
    } else {
      throw new Error("Failed to batch push files to GitHub");
    }

  } catch (error) {
    console.error(`[GithubSyncWorker] Error processing batch job ${job.id}:`, error);
    throw error;
  }
}

declare global { var __githubSyncWorker: Worker | undefined; }

if (globalThis.__githubSyncWorker) {
  globalThis.__githubSyncWorker.close();
  globalThis.__githubSyncWorker = undefined;
}

if (!globalThis.__githubSyncWorker) {
  globalThis.__githubSyncWorker = new Worker(
    QUEUE_NAME,
    workerProcessor,
    {
      connection: workerConnection,
      concurrency: 5,
    }
  );
  console.log("[GithubSyncWorker] Initialized worker singleton");

  const shutdown = async () => {
    console.log("[GithubSyncWorker] Shutting down...");
    if (globalThis.__githubSyncWorker) {
      await globalThis.__githubSyncWorker.close();
    }
    await workerConnection.quit();
    await queueConnection.quit();
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
