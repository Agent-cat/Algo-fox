import { prisma } from "@/lib/prisma";
import { SubmissionResult, TestCaseResult, SubmissionMode } from "@prisma/client";
import { getLanguageById } from "@/lib/languages";
import { getPointsForDifficulty } from "@/lib/points";
import { revalidateTag, updateTag } from "next/cache";
import redis from "@/lib/redis";

const JUDGE0_URL = process.env.JUDGE0_URL || "http://localhost:2358";

export class SubmissionService {
    private static languageCache = new Map<number, { id: number; name: string; judge0Id: number }>();

    static async createSubmission(userId: string, problemId: string, judge0Id: number, code: string, mode: SubmissionMode = "SUBMIT", contestId?: string) {
        // Get language - OPTIMIZATION: Simplified lookup reduces N+1 queries
        const language = await this.getOrCreateLanguage(judge0Id);

        return prisma.submission.create({
            data: {
                userId,
                problemId,
                languageId: language.id,
                code,
                status: "PENDING",
                mode,
                contestId,
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

    // OPTIMIZATION: Consolidated language lookup with proper upsert pattern
    // Reduces N+1 query chain from 4+ queries to 1 database operation
    private static async getOrCreateLanguage(judge0Id: number) {
        // Check cache first (O(1) lookup)
        let language = this.languageCache.get(judge0Id);
        if (language) return language;

        // Get language name from our mapping
        const langInfo = getLanguageById(judge0Id);
        const languageName = langInfo?.name || `Language_${judge0Id}`;

        try {
            // Use upsert for atomic operation - prevents race conditions
            const dbLanguage = await prisma.language.upsert({
                where: { judge0Id },
                update: {},  // No updates needed, just ensure it exists
                create: {
                    name: languageName,
                    judge0Id
                }
            });

            // Update cache for next call
            this.languageCache.set(judge0Id, dbLanguage);
            return dbLanguage;
        } catch (error: any) {
            // Fallback: If upsert fails (rare case), try simple find
            // This handles edge cases where schema constraints might prevent upsert
            const fallbackLanguage = await prisma.language.findUnique({
                where: { judge0Id }
            });

            if (!fallbackLanguage) {
                // Last resort: Try by name
                const byName = await prisma.language.findUnique({
                    where: { name: languageName }
                });
                if (!byName) {
                    throw new Error(`Could not create or find language with judge0Id ${judge0Id}`);
                }
                this.languageCache.set(judge0Id, byName);
                return byName;
            }

            this.languageCache.set(judge0Id, fallbackLanguage);
            return fallbackLanguage;
        }
    }

    static async updateSubmissionStatus(submissionId: string, status: SubmissionResult, time?: number, memory?: number) {
        await prisma.submission.update({
            where: { id: submissionId },
            data: { status, time, memory },
        });

        try {
            // Only attempt invalidation, don't crash if it fails (e.g. in worker)
            revalidateTag(`submission-${submissionId}`,"max");
        } catch (error) {
            // Silently fail in worker context
        }
    }

    static async createTestCases(submissionId: string, testCases: { index: number; judge0TrackingId: string }[]) {
        // OPTIMIZATION: Use createMany for bulk insertion. Much faster than individual creates in a transaction.
        await prisma.testCase.createMany({
            data: testCases.map(tc => ({
                submissionId,
                index: tc.index,
                judge0TrackingId: tc.judge0TrackingId,
                status: "PENDING" as TestCaseResult
            }))
        });
    }

    static async updateTestCaseResult(judge0TrackingId: string, status: TestCaseResult, time: number, memory: number, errorMessage?: string | null, stdout?: string | null) {
        await prisma.testCase.update({
            where: { judge0TrackingId },
            data: {
                status,
                time,
                memory,
                errorMessage: errorMessage || null,
                stdout: stdout || null
            }
        });
    }

    static async updateTestCasesBatch(updates: { judge0TrackingId: string, status: TestCaseResult, time: number, memory: number, errorMessage?: string | null, stdout?: string | null }[]) {
        if (updates.length === 0) return;

        await prisma.$transaction(
            updates.map(update => prisma.testCase.update({
                where: { judge0TrackingId: update.judge0TrackingId },
                data: {
                    status: update.status,
                    time: update.time,
                    memory: update.memory,
                    errorMessage: update.errorMessage || null,
                    stdout: update.stdout || null
                }
            }))
        );
    }

    static async sendToJudge0(languageId: number, code: string, testCases: { input: string; output: string }[]) {
        // Determine Judge0 Language ID from our DB Language ID (assuming mapping exists or is direct)
        // For now assuming the passed languageId is the Judge0 ID.

        const encodedCode = Buffer.from(code).toString('base64');
        const submissions = testCases.map(tc => ({
            language_id: languageId,
            source_code: encodedCode,
            stdin: Buffer.from(tc.input).toString('base64'),
            expected_output: Buffer.from(tc.output).toString('base64'),
        }));

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        try {
            const response = await fetch(`${JUDGE0_URL}/submissions/batch?base64_encoded=true`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ submissions }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`Judge0 Error: ${response.statusText}`);
            }

            const data = await response.json();
            // data type: { token: string }[] (if params say so, but usually it returns tokens)
            return data as { token: string }[];
        } catch (error) {
            console.error("Failed to send to Judge0", error);
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    static async getBatchResults(tokens: string[]) {
        if (tokens.length === 0) return [];

        const tokensStr = tokens.join(",");
        // Include compile_output, stderr for error messages, and stdout for user output
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        try {
            const response = await fetch(`${JUDGE0_URL}/submissions/batch?tokens=${tokensStr}&base64_encoded=true&fields=token,status,time,memory,compile_output,stderr,stdout`, {
                method: "GET",
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Judge0 Batch Fetch Failed: Status ${response.status}`, errorText);
                throw new Error(`Failed to fetch batch results: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            return (data.submissions as {
                token: string;
                status: { id: number; description: string };
                time: string;
                memory: number;
                compile_output: string | null;
                stderr: string | null;
                stdout: string | null;
            }[]).map(sub => ({
                ...sub,
                stdout: sub.stdout ? Buffer.from(sub.stdout, 'base64').toString('utf-8') : null,
                stderr: sub.stderr ? Buffer.from(sub.stderr, 'base64').toString('utf-8') : null,
                compile_output: sub.compile_output ? Buffer.from(sub.compile_output, 'base64').toString('utf-8') : null,
            }));
        } catch (error) {
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    static async incrementProblemSolved(problemId: string, userId: string) {
        // OPTIMIZATION: Combine multiple read operations into a single query to reduce DB round-trips
        const [acceptedCount, problem, latestSubmission] = await Promise.all([
            prisma.submission.count({
                where: { problemId, userId, status: "ACCEPTED", mode: "SUBMIT" }
            }),
            prisma.problem.findUnique({
                where: { id: problemId },
                select: { difficulty: true, type: true, id: true }
            }),
            prisma.submission.findFirst({
                where: { problemId, userId, status: "ACCEPTED", mode: "SUBMIT" },
                orderBy: { createdAt: 'desc' },
                select: { contestId: true }
            })
        ]);

        // Only proceed if this is the first accepted solution
        if (acceptedCount !== 1) return;
        if (!problem) throw new Error("Problem not found");

        // Logic check: If it's a CONTEST problem and solved in practice mode, don't increment global stats
        if (problem.type === "CONTEST" && !latestSubmission?.contestId) {
            return;
        }

        const points = getPointsForDifficulty(problem.difficulty);

        // Step 3: Short transaction for database-only operations
        // This keeps the transaction as brief as possible
        try {
            await prisma.$transaction([
                // Increment problem's solved count
                prisma.problem.update({
                    where: { id: problemId },
                    data: {
                        solved: {
                            increment: 1
                        }
                    }
                }),
                // Increment user's stats only if not a concept problem
                ...(problem.difficulty !== "CONCEPT" ? [
                    prisma.user.update({
                        where: { id: userId },
                        data: {
                            problemsSolved: {
                                increment: 1
                            },
                            totalScore: {
                                increment: points
                            }
                        }
                    })
                ] : [])
            ]);
        } catch (error) {
            console.error("Failed to update problem stats:", error);
            throw error;
        }

        // Step 4: Cache invalidation AFTER transaction completes
        // This is safe to do outside transaction and prevents deadlocks
        try {
            // Invalidate user score cache and leaderboard cache
            await Promise.all([
                redis.del(`user-score-${userId}`),
                redis.del('leaderboard:global'),
                redis.del(`leaderboard:inst:*`)  // Invalidate all institution leaderboards
            ]);
        } catch (error) {
            // Cache invalidation failure is non-critical
            if (process.env.NODE_ENV !== "production") {
                console.warn("Failed to invalidate Redis cache:", error);
            }
        }

        // Step 5: Invalidate Next.js cache tags
        try {
            // Use Promise.allSettled to prevent one failure from blocking others
            const tagOperations = [
                updateTag('categories-list'),
                updateTag(`categories-DSA-user-${userId}`),
                updateTag(`categories-SQL-user-${userId}`),
                updateTag(`user-submissions-${userId}`),
                updateTag('problems-list'),
                updateTag('problems-search')
            ];
            await Promise.allSettled(tagOperations);
        } catch (error) {
            // Tag invalidation failure is non-critical
            if (process.env.NODE_ENV !== "production") {
                console.warn("Failed to update cache tags:", error);
            }
        }
    }
    static async getSubmissionById(id: string) {
        return prisma.submission.findUnique({
            where: { id },
            include: {
                problem: {
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        difficulty: true,
                    }
                },
                language: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                testCases: {
                    orderBy: { index: 'asc' }
                }
            }
        });
    }

    static async getProblemSubmissions(problemId: string, userId: string, take: number = 20, cursor?: string) {
        const query: any = {
            where: {
                problemId,
                userId,
                mode: "SUBMIT" // Only show actual submissions, not runs
            },
            include: {
                language: {
                    select: {
                        name: true
                    }
                }
            },
            take,
            orderBy: {
                createdAt: 'desc'
            }
        };

        if (cursor) {
            query.cursor = { id: cursor };
            query.skip = 1;
        }

        return prisma.submission.findMany(query);
    }
    static async invalidateClassroomTracking(userId: string) {
        try {
            // Find all classrooms the user is enrolled in where tracking is active
            const classrooms = await prisma.classroom.findMany({
                where: {
                    students: {
                        some: { id: userId }
                    },
                    isTrackingActive: true
                },
                select: { id: true }
            });

            if (classrooms.length > 0) {
                 // Invalidate live tracking cache for each classroom
                 const keys = classrooms.map(c => `algofox:live-tracking:${c.id}`);
                 await redis.del(...keys);

                 // Also invalidate Next.js cache tags for good measure
                 classrooms.forEach(c => {
                     // Since we are in a service/worker context, revalidateTag might be tricky if not in a server action/request
                     // But we can try just in case this service is called from a server action
                     try {
                        revalidateTag(`classroom-${c.id}`, "max");
                     } catch (e) {
                         // Ignore error if outside request context
                     }
                 });
            }
        } catch (error) {
            console.error("Failed to invalidate classroom tracking cache:", error);
        }
    }

    static async markConceptAsSolved(userId: string, problemId: string) {
        // Use a default language (e.g., JavaScript ID 63) for concept submissions
        const DEFAULT_CONCEPT_LANG_ID = 63;
        const submission = await this.createSubmission(
            userId,
            problemId,
            DEFAULT_CONCEPT_LANG_ID,
            "// CONCEPT COMPLETED",
            "SUBMIT"
        );
        await this.updateSubmissionStatus(submission.id, "ACCEPTED", 0, 0);
        return submission;
    }

    static async getSubmissionDistribution(problemId: string) {
        // Fetch all accepted submissions for this problem to calculate distribution
        // In a real large-scale system, we would pre-calculate these or use a summary table
        const distribution = await prisma.$queryRaw<Array<{ type: string; value: number; count: bigint }>>`
            SELECT 'runtime' as type, ROUND(s.time::numeric, 0) as value, COUNT(*) as count
            FROM "Submission" s
            WHERE s."problemId" = ${problemId} AND s.status = ${SubmissionResult.ACCEPTED}::"SubmissionResult" AND s.time IS NOT NULL AND s.mode = 'SUBMIT'
            GROUP BY ROUND(s.time::numeric, 0)
            UNION ALL
            SELECT 'memory' as type, ROUND(s.memory::numeric, -2) as value, COUNT(*) as count
            FROM "Submission" s
            WHERE s."problemId" = ${problemId} AND s.status = ${SubmissionResult.ACCEPTED}::"SubmissionResult" AND s.memory IS NOT NULL AND s.mode = 'SUBMIT'
            GROUP BY ROUND(s.memory::numeric, -2)
        `;

        const runtimes = distribution.filter(d => d.type === 'runtime').map(d => ({ value: Number(d.value), count: Number(d.count) }));
        const memories = distribution.filter(d => d.type === 'memory').map(d => ({ value: Number(d.value), count: Number(d.count) }));

        return {
            runtimes: runtimes.sort((a, b) => a.value - b.value),
            memories: memories.sort((a, b) => a.value - b.value)
        };
    }
}
