import { Queue, Worker, Job } from "bullmq";
import { createRedisConnection } from "@/lib/redis";
import { SubmissionService } from "@/core/services/submission.service";
import { SubmissionResult, TestCaseResult } from "@prisma/client";

const QUEUE_NAME = "submission-queue";

// FIX: Use separate Redis connections for Queue and Worker.
// BullMQ requires separate connections because Worker uses SUBSCRIBE/BRPOP commands
// which block the connection and prevent other commands from executing (head-of-line blocking).
const queueConnection = createRedisConnection({ maxRetriesPerRequest: null });
const workerConnection = createRedisConnection({ maxRetriesPerRequest: null });

const submissionQueue = new Queue(QUEUE_NAME, {
    connection: queueConnection,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
        removeOnComplete: true,
        removeOnFail: false, // Keep failed for manual investigation
    }
});

export const addSubmissionJob = async (submissionId: string, customTestCases?: { input: string; output: string }[]) => {
    await submissionQueue.add("process-submission", { submissionId, customTestCases });
};

// Worker Implementation
// Note: In Next.js (serverless), workers are tricky. Ideally, this runs in a separate process.
// For this 'integrated' setup, we use a globalThis singleton so HMR doesn't spawn duplicates.

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

// Extracted processor function so it can be referenced cleanly in the Worker constructor
async function workerProcessor(job: Job<{ submissionId: string, customTestCases?: { input: string, output: string, id?: string, hidden?: boolean }[] }>) {
    const { submissionId, customTestCases = [] } = job.data;

    try {
        // 1. Fetch Submission Data
        const { prisma } = await import("@/lib/prisma");

        const submission = await prisma.submission.findUnique({
            where: { id: submissionId },
            include: {
                problem: {
                    include: {
                        testCases: true,
                        functionTemplates: true // Include function templates for DSA
                    }
                },
                language: true
            }
        });

        if (!submission) throw new Error("Submission not found");
        if (submission.status !== "PENDING" && submission.status !== "PROCESSING") {
            console.info(`Submission ${submissionId} already processed with status ${submission.status}. Skipping.`);
            return;
        }
        if (!submission.problem) throw new Error("Problem not found");

        // Mark as PROCESSING immediately for idempotency
        await SubmissionService.updateSubmissionStatus(submissionId, "PROCESSING");

        const { code, language, problem, mode } = submission;
        const allTestCases = problem.testCases;

        // Filter test cases based on mode:
        // RUN mode: only public (non-hidden) test cases
        // SUBMIT mode: all test cases (public + hidden)
        let testCasesToEvaluate: typeof allTestCases;
        if (mode === "RUN") {
            testCasesToEvaluate = [
                ...allTestCases.filter(tc => !tc.hidden),
                ...customTestCases.map((ctc, idx) => ({
                    ...ctc,
                    id: `custom-${idx}`,
                    hidden: false,
                    problemId: problem.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })) as any
            ];
        } else {
            testCasesToEvaluate = allTestCases;
        }

        if (testCasesToEvaluate.length === 0) {
            await SubmissionService.updateSubmissionStatus(submissionId, "ACCEPTED", 0, 0);
            return;
        }

        // Build the code to execute
        let codeToExecute = code;

        // For SQL problems, prepend hiddenQuery and convert to SQLite
        if (problem.domain === "SQL") {
            if (problem.hiddenQuery) {
                codeToExecute = problem.hiddenQuery.trim() + "\n" + code;
            }
            const { convertBatchToSQLite } = await import("@/lib/sql-converter");
            codeToExecute = convertBatchToSQLite(codeToExecute);
        }
        // For DSA problems with function templates, combine driver code + user's function
        else if (problem.domain === "DSA" && problem.useFunctionTemplate && problem.functionTemplates?.length) {
            const template = problem.functionTemplates.find(
                t => t.languageId === language.judge0Id
            );

            if (template?.driverCode) {
                const langId = language.judge0Id;

                if (template.driverCode.includes("{{USER_CODE}}")) {
                    codeToExecute = template.driverCode.replace("{{USER_CODE}}", code);
                }
                else if (langId === 60 || langId === 73) {
                    codeToExecute = template.driverCode + "\n\n" + code;
                }
                else if (langId === 63 || langId === 71) {
                    codeToExecute = code + "\n\n" + template.driverCode;
                }
                else if (langId === 62 || langId === 50 || langId === 54) {
                    codeToExecute = template.driverCode.replace(/}\s*$/, code + "\n}");
                }
                else {
                    codeToExecute = code + "\n\n" + template.driverCode;
                }
            }
        }

        // 2. Send Batch to Judge0
        const judge0Tokens = await SubmissionService.sendToJudge0(
            language.judge0Id,
            codeToExecute,
            testCasesToEvaluate.map(tc => ({ input: tc.input, output: tc.output }))
        );

        const publicCasesCount = allTestCases.filter(tc => !tc.hidden).length;
        const testCaseIndexMap = new Map(allTestCases.map((tc, idx) => [tc.id, idx]));

        const testCaseRecords = testCasesToEvaluate.map((tc, idx) => {
            const problemCaseIndex = testCaseIndexMap.get(tc.id) ?? -1;
            const finalIndex = problemCaseIndex >= 0
                ? problemCaseIndex
                : allTestCases.length + (idx - publicCasesCount);

            return {
                index: finalIndex,
                judge0TrackingId: judge0Tokens[idx].token,
                processed: false,
                processingUpdateSent: false
            };
        });
        await SubmissionService.createTestCases(submissionId, testCaseRecords);

        // 4. Poll and Incremental Update
        const MAX_TOTAL_TIME_MS = 60000; // 60 seconds hard timeout
        const START_TIME = Date.now();

        const pendingSet = new Set(testCaseRecords.map(r => r.judge0TrackingId));
        const recordsByToken = new Map(testCaseRecords.map(r => [r.judge0TrackingId, r]));

        let totalTime = 0;
        let maxMemory = 0;
        let finalStatus: SubmissionResult = "ACCEPTED";
        let globalErrorMessage: string | null = null;
        let compilationError = false;

        while (pendingSet.size > 0 && (Date.now() - START_TIME) < MAX_TOTAL_TIME_MS) {
            const elapsedMs = Date.now() - START_TIME;
            let pollInterval = 1000;
            if (elapsedMs < 5000) pollInterval = 150;
            else if (elapsedMs < 30000) pollInterval = 500;

            await new Promise(r => setTimeout(r, pollInterval));

            const pendingTokens = Array.from(pendingSet);
            const batchResults = await SubmissionService.getBatchResults(pendingTokens);

            if (!compilationError && batchResults.length > 0) {
                const firstResult = batchResults[0];
                const firstStatus = mapJudge0StatusToDb(firstResult.status.id);
                if (firstStatus === "COMPILE_ERROR") {
                    compilationError = true;
                    finalStatus = "COMPILE_ERROR";
                    globalErrorMessage = firstResult.compile_output || firstResult.stderr || "Compilation Error";
                }
            }

            const updatesToApply: { judge0TrackingId: string, status: TestCaseResult, time: number, memory: number, errorMessage: string | null, stdout: string | null }[] = [];
            const publishedUpdates: any[] = [];

            for (const result of batchResults) {
                const localRecord = recordsByToken.get(result.token);
                if (!localRecord) continue;

                const isFinished =
                    result.status.id !== JUDGE0_STATUS.IN_QUEUE &&
                    result.status.id !== JUDGE0_STATUS.PROCESSING;

                if (!isFinished) {
                    if (result.status.id === JUDGE0_STATUS.PROCESSING && !localRecord.processingUpdateSent) {
                        localRecord.processingUpdateSent = true;
                        publishedUpdates.push({
                            index: localRecord.index,
                            status: "PROCESSING",
                            judge0TrackingId: result.token
                        });
                    }
                    continue;
                }

                if (!localRecord.processed) {
                    localRecord.processed = true;
                    pendingSet.delete(result.token);

                    const time = parseFloat(result.time || "0");
                    const memory = result.memory || 0;
                    const status = mapJudge0StatusToDb(result.status.id);

                    let errorMessage: string | null = null;
                    if (compilationError) {
                        errorMessage = globalErrorMessage;
                    } else if (status === "COMPILE_ERROR") {
                        errorMessage = result.compile_output || result.stderr || "Compilation Error";
                    } else if (status === "RUNTIME_ERROR") {
                        const description = result.status.description || "Runtime Error";
                        const stderr = result.stderr?.trim();
                        errorMessage = stderr ? `${description}\n\n${stderr}` : description;
                        if (description.includes("SIGSEGV")) errorMessage += "\n\nPossible causes:\n- Accessing array out of bounds\n- Null pointer";
                        if (description.includes("SIGFPE")) errorMessage += "\n\nPossible causes:\n- Division by zero";
                    } else if (status === "TIME_LIMIT_EXCEEDED") {
                        errorMessage = "Time Limit Exceeded";
                    } else if (status === "MEMORY_LIMIT_EXCEEDED") {
                        errorMessage = "Memory Limit Exceeded";
                    } else if (result.stderr && status !== "ACCEPTED") {
                        errorMessage = result.stderr;
                    }

                    if (!errorMessage && result.compile_output && status !== "ACCEPTED") {
                        errorMessage = result.compile_output;
                    }
                    if ((status === "RUNTIME_ERROR" || status === "COMPILE_ERROR") && !errorMessage) {
                        errorMessage = "Unknown Error Occurred";
                    }

                    const statusToUse = compilationError ? "COMPILE_ERROR" : (status || "RUNTIME_ERROR");

                    const updateData = {
                        judge0TrackingId: result.token,
                        status: statusToUse,
                        time,
                        memory,
                        errorMessage,
                        stdout: result.stdout
                    };
                    updatesToApply.push(updateData);
                    publishedUpdates.push({ ...updateData, index: localRecord.index });

                    totalTime += time;
                    maxMemory = Math.max(maxMemory, memory);

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

                if (publishedUpdates.length > 0) {
                    await queueConnection.publish(`submission:${submissionId}`, JSON.stringify({
                        type: "CASE_UPDATE",
                        data: publishedUpdates
                    }));
                }
            }
        }

        if (pendingSet.size === 0) {
            const avgTime = testCaseRecords.length > 0 ? totalTime / testCaseRecords.length : 0;
            await SubmissionService.updateSubmissionStatus(submissionId, finalStatus, avgTime, maxMemory);

            let streakResult = { streakUpdated: false, currentStreak: 0 };
            let pointsResult = { firstSolved: false, points: 0 };
            if (finalStatus === "ACCEPTED" && submission.mode === "SUBMIT") {
                try {
                    pointsResult = await SubmissionService.incrementProblemSolved(problem.id, submission.userId);
                    streakResult = await SubmissionService.updateUserStreak(submission.userId);
                } catch (sideEffectError) {
                    console.error(`Side effect error (streak/solved) for submission ${submissionId}:`, sideEffectError);
                }
            }

            await SubmissionService.invalidateClassroomTracking(submission.userId);

            await queueConnection.publish(`submission:${submissionId}`, JSON.stringify({
                type: "COMPLETE",
                data: {
                    status: finalStatus,
                    time: avgTime,
                    memory: maxMemory,
                    streakUpdated: streakResult.streakUpdated,
                    currentStreak: streakResult.currentStreak,
                    firstSolved: pointsResult.firstSolved,
                    pointsGained: pointsResult.points
                }
            }));
        } else {
            await SubmissionService.updateSubmissionStatus(submissionId, "TIME_LIMIT_EXCEEDED");
            await queueConnection.publish(`submission:${submissionId}`, JSON.stringify({
                type: "COMPLETE",
                data: { status: "TIME_LIMIT_EXCEEDED", time: 0, memory: 0 }
            }));
            await SubmissionService.invalidateClassroomTracking(submission.userId);
        }

    } catch (error) {
        console.error(`Error processing submission ${submissionId}`, error);
        await SubmissionService.updateSubmissionStatus(submissionId, "RUNTIME_ERROR");
        await queueConnection.publish(`submission:${submissionId}`, JSON.stringify({
            type: "COMPLETE",
            data: { status: "RUNTIME_ERROR", time: 0, memory: 0 }
        }));
    }
}

// FIX: Guard with globalThis singleton to prevent duplicate workers across HMR reloads and
// multiple module evaluations. Without this, every Next.js Fast Refresh creates a new Worker
// that competes for the same BullMQ jobs, causing duplicate processing and connection leaks.
declare global { var __submissionWorker: Worker | undefined; }

if (!globalThis.__submissionWorker) {
    globalThis.__submissionWorker = new Worker(
        QUEUE_NAME,
        workerProcessor,
        {
            connection: workerConnection,
            concurrency: 10, // Process up to 10 submissions in parallel
            limiter: {
                max: 50,
                duration: 1000
            }
        }
    );
    console.log("[SubmissionWorker] Initialized worker singleton");
}
