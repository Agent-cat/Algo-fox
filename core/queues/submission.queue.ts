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

            // Build the code to execute
            let codeToExecute = code;

            // For SQL problems, prepend hiddenQuery and convert to SQLite
            if (problem.domain === "SQL") {
                // Prepend hiddenQuery if exists
                if (problem.hiddenQuery) {
                    codeToExecute = problem.hiddenQuery.trim() + "\n" + code;
                }

                // Convert SQL to SQLite-compatible syntax
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

                    // Check if driver code uses placeholder for user code insertion
                    if (template.driverCode.includes("{{USER_CODE}}")) {
                        // Replace placeholder with user's code
                        codeToExecute = template.driverCode.replace("{{USER_CODE}}", code);
                    }
                    // Go (60), Rust (73): Driver first (package/imports/fn main), then user function
                    else if (langId === 60 || langId === 73) {
                        codeToExecute = template.driverCode + "\n\n" + code;
                    }
                    // JavaScript (63), Python (71): User code first, then driver
                    else if (langId === 63 || langId === 71) {
                        codeToExecute = code + "\n\n" + template.driverCode;
                    }
                    // Java (62), C (50), C++ (54): Need placeholder - warn if missing
                    else if (langId === 62 || langId === 50 || langId === 54) {
                        // For structured languages, assume user code goes inside class/before main
                        // If no placeholder, try driver first (for cases where main is at end)
                        codeToExecute = template.driverCode.replace(/}\s*$/, code + "\n}");
                    }
                    // Default: user code first, then driver
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
            const MAX_ATTEMPTS = 160; // ~40s timeout (160 * 250ms)

            // Track overall stats
            let totalTime = 0;
            let maxMemory = 0;
            let finalStatus: SubmissionResult = "ACCEPTED";
            let globalErrorMessage: string | null = null;
            let compilationError = false;

            while (!isComplete && attempts < MAX_ATTEMPTS) {
                await new Promise(r => setTimeout(r, 250)); // Poll every 250ms
                attempts++;

                const uniqueTokens = testCaseRecords.map(tc => tc.judge0TrackingId);
                const batchResults = await SubmissionService.getBatchResults(uniqueTokens);

                // Check for global compilation error
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
                const publishedUpdates: any[] = [];

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

                        // Add to batch
                        const updateData = {
                            judge0TrackingId: result.token,
                            status: statusToUse,
                            time,
                            memory,
                            errorMessage,
                            stdout: result.stdout
                        };
                        updatesToApply.push(updateData);

                        // Prepare for Redis Publish
                         publishedUpdates.push({
                            ...updateData,
                            index: localRecord.index
                        });

                        // Accumulate stats
                        totalTime += time;
                        maxMemory = Math.max(maxMemory, memory);

                        // Determine Submission Status
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

                    // Publish incremental updates to Redis
                    // Using connection (ioredis) from imports
                    // We publish the entire list of new updates
                    if (publishedUpdates.length > 0) {
                         await connection.publish(`submission:${submissionId}`, JSON.stringify({
                             type: "CASE_UPDATE",
                             data: publishedUpdates
                         }));
                    }
                }

                if (pendingCount === 0) {
                    isComplete = true;
                }
            }

            if (isComplete) {
                const avgTime = totalTime / testCaseRecords.length;
                await SubmissionService.updateSubmissionStatus(submissionId, finalStatus, avgTime, maxMemory);

                // Publish Completion Event
                await connection.publish(`submission:${submissionId}`, JSON.stringify({
                    type: "COMPLETE",
                    data: {
                        status: finalStatus,
                        time: avgTime,
                        memory: maxMemory
                    }
                }));

                if (finalStatus === "ACCEPTED" && submission.mode === "SUBMIT") {
                    await SubmissionService.incrementProblemSolved(problem.id, submission.userId);
                }

                // Invalidate Live Tracking Cache
                await SubmissionService.invalidateClassroomTracking(submission.userId);
            } else {
                await SubmissionService.updateSubmissionStatus(submissionId, "TIME_LIMIT_EXCEEDED");
                 await connection.publish(`submission:${submissionId}`, JSON.stringify({
                    type: "COMPLETE",
                    data: {
                        status: "TIME_LIMIT_EXCEEDED",
                        time: 0,
                        memory: 0
                    }
                }));

                // Invalidate Live Tracking Cache (Timeout)
                await SubmissionService.invalidateClassroomTracking(submission.userId);
            }

        } catch (error) {
            console.error(`Error processing submission ${submissionId}`, error);
            await SubmissionService.updateSubmissionStatus(submissionId, "RUNTIME_ERROR");
             await connection.publish(`submission:${submissionId}`, JSON.stringify({
                    type: "COMPLETE",
                    data: {
                        status: "RUNTIME_ERROR",
                        time: 0,
                        memory: 0
                    }
                }));
        }
    },
    { connection }
);
