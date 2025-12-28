import { prisma } from "@/lib/prisma";
import { SubmissionResult, TestCaseResult, SubmissionMode } from "@prisma/client";
import { getLanguageById } from "@/lib/languages";

const JUDGE0_URL = process.env.JUDGE0_URL || "http://localhost:2358";

export class SubmissionService {
    static async createSubmission(userId: string, problemId: string, judge0Id: number, code: string, mode: SubmissionMode = "SUBMIT") {
        // Get language info from our language mapping
        const langInfo = getLanguageById(judge0Id);
        const languageName = langInfo?.name || `Language_${judge0Id}`;

        // Try to find existing language by judge0Id first (primary lookup)
        let language = await prisma.language.findUnique({
            where: { judge0Id: judge0Id }
        });

        // If not found, try to create it
        if (!language) {
            try {
                language = await prisma.language.create({
                    data: {
                        name: languageName,
                        judge0Id: judge0Id
                    }
                });
            } catch (error: any) {
                // If creation fails due to name conflict, try to find by name
                // This handles the case where a language with this name exists but different judge0Id
                if (error.code === 'P2002') {
                    const existingByName = await prisma.language.findUnique({
                        where: { name: languageName }
                    });
                    if (existingByName) {
                        // Use the existing language even if judge0Id doesn't match
                        // In production, languages should be pre-seeded to avoid this
                        language = existingByName;
                    } else {
                        // If it's a judge0Id conflict, find by judge0Id
                        language = await prisma.language.findUnique({
                            where: { judge0Id: judge0Id }
                        });
                        if (!language) {
                            throw new Error(`Could not create or find language with judge0Id ${judge0Id}`);
                        }
                    }
                } else {
                    throw error;
                }
            }
        }

        return prisma.submission.create({
            data: {
                userId,
                problemId,
                languageId: language.id, // Use the internal PK
                code,
                status: "PENDING",
                mode,
            },
            include: {
                problem: {
                    include: {
                        testCases: true
                    }
                },
                language: true
            }
        });
    }

    static async updateSubmissionStatus(submissionId: string, status: SubmissionResult, time?: number, memory?: number) {
        await prisma.submission.update({
            where: { id: submissionId },
            data: { status, time, memory },
        });
    }

    static async createTestCases(submissionId: string, testCases: { index: number; judge0TrackingId: string }[]) {
        // Create DB records for tracking individual test case results
        await prisma.$transaction(
            testCases.map(tc => prisma.testCase.create({
                data: {
                    submissionId,
                    index: tc.index,
                    judge0TrackingId: tc.judge0TrackingId,
                    status: "PENDING"
                }
            }))
        );
    }

    static async updateTestCaseResult(judge0TrackingId: string, status: TestCaseResult, time: number, memory: number, errorMessage?: string | null) {
        await prisma.testCase.update({
            where: { judge0TrackingId },
            data: {
                status,
                time,
                memory,
                errorMessage: errorMessage || null
            }
        });
    }

    static async sendToJudge0(languageId: number, code: string, testCases: { input: string; output: string }[]) {
        // Determine Judge0 Language ID from our DB Language ID (assuming mapping exists or is direct)
        // For now assuming the passed languageId is the Judge0 ID.

        const submissions = testCases.map(tc => ({
            language_id: languageId,
            source_code: code,
            stdin: tc.input,
            expected_output: tc.output,
        }));

        try {
            const response = await fetch(`${JUDGE0_URL}/submissions/batch?base64_encoded=false`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ submissions }),
            });

            if (!response.ok) {
                throw new Error(`Judge0 Error: ${response.statusText}`);
            }

            const data = await response.json();
            // data type: { token: string }[] (if params say so, but usually it returns tokens)
            return data as { token: string }[];
        } catch (error) {
            console.error("Failed to send to Judge0", error);
            throw error;
        }
    }

    static async getBatchResults(tokens: string[]) {
        const tokensStr = tokens.join(",");
        // Include compile_output and stderr for error messages
        const response = await fetch(`${JUDGE0_URL}/submissions/batch?tokens=${tokensStr}&base64_encoded=false&fields=token,status,time,memory,compile_output,stderr`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch batch results");
        }

        const data = await response.json();
        return data.submissions as {
            token: string;
            status: { id: number; description: string };
            time: string;
            memory: number;
            compile_output: string | null;
            stderr: string | null;
        }[];
    }

    static async incrementProblemSolved(problemId: string, userId: string) {
        // Use a transaction to atomically check and update
        // This helps prevent race conditions when multiple submissions are processed concurrently
        await prisma.$transaction(async (tx) => {
            // Check if this is the first time the user has solved this problem
            // Only count SUBMIT mode submissions to avoid double-counting from RUN mode
            const acceptedCount = await tx.submission.count({
                where: {
                    problemId,
                    userId,
                    status: "ACCEPTED",
                    mode: "SUBMIT"
                }
            });

            // Only increment if this is the first accepted solution (count should be exactly 1, which is the current one)
            if (acceptedCount === 1) {
                // Fetch the problem to get its score
                const problem = await tx.problem.findUnique({
                    where: { id: problemId },
                    select: { score: true }
                });

                if (!problem) {
                    throw new Error("Problem not found");
                }

                // Increment problem's solved count
                await tx.problem.update({
                    where: { id: problemId },
                    data: {
                        solved: {
                            increment: 1
                        }
                    }
                });

                // Increment user's problemsSolved count and add score
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        problemsSolved: {
                            increment: 1
                        },
                        totalScore: {
                            increment: problem.score
                        }
                    }
                });
            }
        });
    }
}
