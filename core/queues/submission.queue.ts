import { Queue, Worker, Job } from "bullmq";
import connection from "@/lib/redis";
import { SubmissionService } from "@/core/services/submission.service";
import { SubmissionResult, TestCaseResult } from "@prisma/client";

const QUEUE_NAME = "submission-queue";

export const submissionQueue = new Queue(QUEUE_NAME, {
    connection,
});

export const addSubmissionJob = async (submissionId: string) => {
    await submissionQueue.add("process-submission", { submissionId });
};

// Worker Implementation
// Note: In Next.js (serverless), workers are tricky. Ideally, this runs in a separate process.
// For this 'demo' / 'integrated' setup, we might initialize it differently, but here we define it.
// If this file is imported in the API route, the worker might start multiple times in dev.
// We'll use a global check or just simple instantiation for now, assuming a long-running server or dedicated worker process.

const workerName = "submission-worker";

// Judge0 Status IDs
const JUDGE0_STATUS = {
    IN_QUEUE: 1,
    PROCESSING: 2,
    ACCEPTED: 3,
    WRONG_ANSWER: 4,
    TIME_LIMIT_EXCEEDED: 5,
    COMPILATION_ERROR: 6,
    RUNTIME_ERROR_SIGSEGV: 7,
    RUNTIME_ERROR_SIGXFSZ: 8,
    RUNTIME_ERROR_SIGFPE: 9,
    RUNTIME_ERROR_SIGABRT: 10,
    RUNTIME_ERROR_NZEC: 11,
    RUNTIME_ERROR_OTHER: 12,
    INTERNAL_ERROR: 13,
};

const mapJudge0StatusToDb = (statusId: number): TestCaseResult | null => {
    if (statusId === JUDGE0_STATUS.ACCEPTED) return "ACCEPTED";
    if (statusId === JUDGE0_STATUS.WRONG_ANSWER) return "WRONG_ANSWER";
    if (statusId === JUDGE0_STATUS.TIME_LIMIT_EXCEEDED) return "TIME_LIMIT_EXCEEDED";
    if (statusId === JUDGE0_STATUS.COMPILATION_ERROR) return "COMPILE_ERROR";
    if (statusId >= 7 && statusId <= 12) return "RUNTIME_ERROR";
    return null; // Pending or Processing
};

const worker = new Worker(
    QUEUE_NAME,
    async (job: Job<{ submissionId: string }>) => {
        const { submissionId } = job.data;

        try {
            // 1. Fetch Submission Data
            // To avoid circular dep if we construct full object here, we might need a getter in service
            // For now, let's use the service to get it conceptually or direct prisma if needed.
            // But we have SubmissionService.
            const { prisma } = await import("@/lib/prisma"); // Lazy import to avoid init issues

            const submission = await prisma.submission.findUnique({
                where: { id: submissionId },
                include: {
                    problem: { include: { testCases: true } },
                    language: true
                }
            });

            if (!submission) throw new Error("Submission not found");
            if (!submission.problem) throw new Error("Problem not found");

            const { code, language, problem, mode } = submission;
            const allTestCases = problem.testCases;

            // Filter test cases based on mode:
            // RUN mode: only public (non-hidden) test cases
            // SUBMIT mode: all test cases (public + hidden)
            let testCasesToEvaluate: typeof allTestCases;
            if (mode === "RUN") {
                testCasesToEvaluate = allTestCases.filter(tc => !tc.hidden);
            } else {
                testCasesToEvaluate = allTestCases;
            }

            if (testCasesToEvaluate.length === 0) {
                await SubmissionService.updateSubmissionStatus(submissionId, "ACCEPTED", 0, 0);
                return;
            }

            // For SQL problems, prepend hiddenQuery and convert to SQLite
            let codeToExecute = code;
            if (problem.domain === "SQL") {
                // Prepend hiddenQuery if exists
                if (problem.hiddenQuery) {
                    codeToExecute = problem.hiddenQuery.trim() + "\n" + code;
                }

                // Convert SQL to SQLite-compatible syntax
                const { convertBatchToSQLite } = await import("@/lib/sql-converter");
                codeToExecute = convertBatchToSQLite(codeToExecute);
            }

            // 2. Send Batch to Judge0
            const judge0Tokens = await SubmissionService.sendToJudge0(
                language.judge0Id,
                codeToExecute,
                testCasesToEvaluate.map(tc => ({ input: tc.input, output: tc.output }))
            );

            // 3. Store Tokens in DB (TestCase records)
            const testCaseRecords = testCasesToEvaluate.map((tc, idx) => ({
                index: allTestCases.findIndex(orig => orig.id === tc.id),
                judge0TrackingId: judge0Tokens[idx].token,
                processed: false // Track local processing state
            }));
            await SubmissionService.createTestCases(submissionId, testCaseRecords);

            // 4. Poll and Incremental Update
            let isComplete = false;
            let attempts = 0;
            const MAX_ATTEMPTS = 20; // 40s timeout

            // Track overall stats
            let totalTime = 0;
            let maxMemory = 0;
            let finalStatus: SubmissionResult = "ACCEPTED";
            let globalErrorMessage: string | null = null;
            let compilationError = false;

            while (!isComplete && attempts < MAX_ATTEMPTS) {
                await new Promise(r => setTimeout(r, 2000));
                attempts++;

                const uniqueTokens = testCaseRecords.map(tc => tc.judge0TrackingId);
                const batchResults = await SubmissionService.getBatchResults(uniqueTokens);

                // Check for global compilation error (usually on the first result if it exists)
                if (!compilationError) {
                    const firstResult = batchResults[0];
                    const firstStatus = mapJudge0StatusToDb(firstResult.status.id);
                    if (firstStatus === "COMPILE_ERROR") {
                        compilationError = true;
                        finalStatus = "COMPILE_ERROR";
                        globalErrorMessage = firstResult.compile_output || firstResult.stderr || "Compilation Error";
                    }
                }

                let pendingCount = 0;

                const updatesToApply: { judge0TrackingId: string, status: TestCaseResult, time: number, memory: number, errorMessage: string | null, stdout: string | null }[] = [];

                for (let i = 0; i < batchResults.length; i++) {
                    const result = batchResults[i];
                    const localRecord = testCaseRecords[i];

                    // Identify completion (not In Queue and not Processing)
                    const isFinished =
                        result.status.id !== JUDGE0_STATUS.IN_QUEUE &&
                        result.status.id !== JUDGE0_STATUS.PROCESSING;

                    if (!isFinished) {
                        pendingCount++;
                        continue;
                    }

                    // If finished but not yet marked processed, update DB
                    if (!localRecord.processed) {
                        localRecord.processed = true;

                        const time = parseFloat(result.time || "0");
                        const memory = result.memory || 0;
                        const status = mapJudge0StatusToDb(result.status.id);

                        // --- Error Message Logic ---
                        let errorMessage: string | null = null;

                        if (compilationError) {
                            errorMessage = globalErrorMessage;
                        } else if (status === "COMPILE_ERROR") {
                            // Prioritize compile_output for compilation errors
                            errorMessage = result.compile_output || result.stderr || "Compilation Error";
                        } else if (status === "RUNTIME_ERROR") {
                            const description = result.status.description || "Runtime Error";
                            const stderr = result.stderr?.trim();
                            errorMessage = stderr ? `${description}\n\n${stderr}` : description;

                            // Add hints
                            if (description.includes("SIGSEGV")) errorMessage += "\n\nPossible causes:\n- Accessing array out of bounds\n- Null pointer";
                            if (description.includes("SIGFPE")) errorMessage += "\n\nPossible causes:\n- Division by zero";
                        } else if (status === "TIME_LIMIT_EXCEEDED") {
                            errorMessage = "Time Limit Exceeded";
                        } else if (status === "MEMORY_LIMIT_EXCEEDED") {
                            errorMessage = "Memory Limit Exceeded";
                        } else if (result.stderr && status !== "ACCEPTED") {
                            // Capture stderr for other non-accepted statuses if present
                            errorMessage = result.stderr;
                        }

                        // If we have a compile_output even for non-compile errors (rare but possible), append it if no error yet
                        if (!errorMessage && result.compile_output && status !== "ACCEPTED") {
                            errorMessage = result.compile_output;
                        }

                        // Fallback checking
                        if ((status === "RUNTIME_ERROR" || status === "COMPILE_ERROR") && !errorMessage) {
                            errorMessage = "Unknown Error Occurred";
                        }

                        const statusToUse = compilationError ? "COMPILE_ERROR" : (status || "RUNTIME_ERROR");

                        // Add to batch
                        updatesToApply.push({
                            judge0TrackingId: result.token,
                            status: statusToUse,
                            time,
                            memory,
                            errorMessage,
                            stdout: result.stdout
                        });

                        // Accumulate stats
                        totalTime += time;
                        maxMemory = Math.max(maxMemory, memory);

                        // Determine Submission Status (Priority: Compile Error > Runtime Error > TLE > WA > Accepted)
                        if (!compilationError && status !== "ACCEPTED") {
                            if (finalStatus === "ACCEPTED") {
                                if (status === "WRONG_ANSWER") finalStatus = "WRONG_ANSWER";
                                else if (status === "TIME_LIMIT_EXCEEDED") finalStatus = "TIME_LIMIT_EXCEEDED";
                                else finalStatus = "RUNTIME_ERROR";
                            }
                        }
                    }
                }

                if (updatesToApply.length > 0) {
                    await SubmissionService.updateTestCasesBatch(updatesToApply);
                }

                if (pendingCount === 0) {
                    isComplete = true;
                }
            }

            if (isComplete) {
                const avgTime = totalTime / testCaseRecords.length;
                await SubmissionService.updateSubmissionStatus(submissionId, finalStatus, avgTime, maxMemory);

                // Only award points for SUBMIT mode and only on first accepted solution
                if (finalStatus === "ACCEPTED" && submission.mode === "SUBMIT") {
                    await SubmissionService.incrementProblemSolved(problem.id, submission.userId);
                }
            } else {
                await SubmissionService.updateSubmissionStatus(submissionId, "TIME_LIMIT_EXCEEDED");
            }

        } catch (error) {
            console.error(`Error processing submission ${submissionId}`, error);
            await SubmissionService.updateSubmissionStatus(submissionId, "RUNTIME_ERROR"); // Or system error
        }
    },
    { connection }
);
