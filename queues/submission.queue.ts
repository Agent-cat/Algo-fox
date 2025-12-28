import { Queue, Worker, Job } from "bullmq";
import connection from "@/lib/redis";
import { SubmissionService } from "@/services/submission.service";
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

            // 2. Send Batch to Judge0
            const judge0Tokens = await SubmissionService.sendToJudge0(
                language.judge0Id,
                code,
                testCasesToEvaluate.map(tc => ({ input: tc.input, output: tc.output }))
            );

            // 3. Store Tokens in DB (TestCase records)
            // Map to original indices from allTestCases for proper tracking
            const testCaseRecords = testCasesToEvaluate.map((tc, idx) => ({
                index: allTestCases.findIndex(orig => orig.id === tc.id),
                judge0TrackingId: judge0Tokens[idx].token
            }));
            await SubmissionService.createTestCases(submissionId, testCaseRecords);

            // 4. Poll for Results
            let isComplete = false;
            let attempts = 0;
            const MAX_ATTEMPTS = 20; // 20 * 2s = 40s max wait

            while (!isComplete && attempts < MAX_ATTEMPTS) {
                await new Promise(r => setTimeout(r, 2000)); // Wait 2s
                attempts++;

                const uniqueTokens = testCaseRecords.map(tc => tc.judge0TrackingId);
                const batchResults = await SubmissionService.getBatchResults(uniqueTokens);

                const allFinished = batchResults.every(r =>
                    r.status.id !== JUDGE0_STATUS.IN_QUEUE &&
                    r.status.id !== JUDGE0_STATUS.PROCESSING
                );

                if (allFinished) {
                    isComplete = true;

                    // Process Final Results
                    let finalStatus: SubmissionResult = "ACCEPTED";
                    let totalTime = 0;
                    let maxMemory = 0;
                    let compilationError = false;
                    let globalErrorMessage: string | null = null; // For compilation errors that affect all test cases

                    // Check if there's a compilation error (affects all test cases)
                    const firstResult = batchResults[0];
                    const firstStatus = mapJudge0StatusToDb(firstResult.status.id);
                    if (firstStatus === "COMPILE_ERROR" && firstResult.compile_output) {
                        compilationError = true;
                        finalStatus = "COMPILE_ERROR";
                        globalErrorMessage = firstResult.compile_output;
                    }

                    for (const result of batchResults) {
                        const status = mapJudge0StatusToDb(result.status.id);
                        const time = parseFloat(result.time || "0");
                        const memory = result.memory || 0;

                        // Extract error message
                        // For compilation errors, use the global error message (same for all test cases)
                        // For runtime errors, use stderr from individual test case, but ALSO include status description
                        let errorMessage: string | null = null;

                        if (compilationError) {
                            errorMessage = globalErrorMessage;
                        } else if (status === "COMPILE_ERROR" && result.compile_output) {
                            errorMessage = result.compile_output;
                        } else if (status === "RUNTIME_ERROR") {
                            // Combine status description and stderr for better context
                            const description = result.status.description || "Runtime Error";
                            const stderr = result.stderr?.trim();

                            if (stderr) {
                                // Some languages put the exception name in stderr (Java, Python)
                                // identifying "Index out of bounds" specifically
                                errorMessage = `${description}\n\n${stderr}`;
                            } else {
                                // C++ often gives just the signal (SIGSEGV) without stderr
                                errorMessage = description;

                                // Add helpful hints for common signals
                                if (result.status.description?.includes("SIGSEGV")) {
                                    errorMessage += "\n\nPossible causes:\n- Accessing array out of bounds\n- Dereferencing null pointer\n- Stack overflow";
                                } else if (result.status.description?.includes("SIGFPE")) {
                                    errorMessage += "\n\nPossible causes:\n- Division by zero\n- Integer overflow";
                                } else if (result.status.description?.includes("SIGABRT")) {
                                    errorMessage += "\n\nPossible causes:\n- Abort called\n- Assertion failed";
                                } else if (result.status.description?.includes("NZEC")) {
                                    errorMessage += "\n\nPossible causes:\n- Uncaught exception\n- Return non-zero from main";
                                }
                            }
                        } else if (status === "TIME_LIMIT_EXCEEDED") {
                            errorMessage = "Time Limit Exceeded";
                        } else if (status === "MEMORY_LIMIT_EXCEEDED") {
                            errorMessage = "Memory Limit Exceeded";
                        } else if (result.stderr && status !== "ACCEPTED") {
                            errorMessage = result.stderr;
                        } else if (result.compile_output) {
                            errorMessage = result.compile_output;
                        }

                        // Use compilation error status if detected, otherwise use individual status
                        const statusToUse = compilationError ? "COMPILE_ERROR" : (status || "RUNTIME_ERROR");

                        // Update individual test case
                        await SubmissionService.updateTestCaseResult(
                            result.token,
                            statusToUse,
                            time,
                            memory,
                            errorMessage
                        );

                        // Aggregate Stats
                        totalTime += time;
                        maxMemory = Math.max(maxMemory, memory);

                        // Update final status (compilation error takes precedence and is already set above)
                        if (!compilationError && status !== "ACCEPTED") {
                            if (finalStatus === "ACCEPTED") { // Only override if currently accepted
                                if (status === "WRONG_ANSWER") {
                                    finalStatus = "WRONG_ANSWER";
                                } else if (status === "TIME_LIMIT_EXCEEDED") {
                                    finalStatus = "TIME_LIMIT_EXCEEDED";
                                } else {
                                    finalStatus = "RUNTIME_ERROR";
                                }
                            }
                        }
                    }

                    const avgTime = totalTime / batchResults.length;
                    await SubmissionService.updateSubmissionStatus(submissionId, finalStatus, avgTime, maxMemory);

                    if (finalStatus === "ACCEPTED") {
                        // We need userId. We didn't fetch it initially in the worker query above.
                        // Let's fetch it or pass it.
                        // Worker step 1 fetched: include: { problem: ..., language: ... }.
                        // Currently line 63: `include: { ... }`.
                        // `submission` object has `userId`.
                        await SubmissionService.incrementProblemSolved(problem.id, submission.userId);
                    }
                }
            }

            if (!isComplete) {
                // Timeout scenario
                await SubmissionService.updateSubmissionStatus(submissionId, "TIME_LIMIT_EXCEEDED"); // Or internal error
            }

        } catch (error) {
            console.error(`Error processing submission ${submissionId}`, error);
            await SubmissionService.updateSubmissionStatus(submissionId, "RUNTIME_ERROR"); // Or system error
        }
    },
    { connection }
);
