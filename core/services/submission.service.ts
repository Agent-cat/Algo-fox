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
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 30s timeout

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
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

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

    static async incrementProblemSolved(problemId: string, userId: string, currentSubmissionId?: string): Promise<{ firstSolved: boolean; points: number }> {
        // FIX: Store result outside try-catch so cache invalidation (below) can always run.
        let result: { firstSolved: boolean; points: number };

        try {
            result = await prisma.$transaction(async (tx) => {
                // 1. Double-check idempotency using both the marker table (UserProblemSolved)
                // and the Submission table. This prevents double-counting points even if
                // marker records are missing or failed to create in previous attempts.

                // Check solved marker first (O(1) in DB if unique index exists)
                const existingMarker = await (tx as any).userProblemSolved.findUnique({
                    where: { userId_problemId: { userId, problemId } }
                });

                if (existingMarker) {
                    return { firstSolved: false, points: 0 };
                }

                // Fallback: Check if there's any other ACCEPTED submission for this problem/user
                // This handles cases where marker was never created but submission was recorded as ACCEPTED.
                const previousAccepted = await tx.submission.findFirst({
                    where: {
                        userId,
                        problemId,
                        status: "ACCEPTED",
                        mode: "SUBMIT",
                        ...(currentSubmissionId ? { id: { not: currentSubmissionId } } : {})
                    },
                    select: { id: true }
                });

                if (previousAccepted) {
                    // Backfill the missing marker record for data consistency
                    try {
                        await (tx as any).userProblemSolved.create({
                            data: { userId, problemId }
                        });
                    } catch (e) {
                         // Ignore P2002 if someone else just created it
                    }
                    return { firstSolved: false, points: 0 };
                }

                // 2. Fetch problem details within transaction
                const problem = await tx.problem.findUnique({
                    where: { id: problemId },
                    select: { difficulty: true, type: true, id: true }
                });

                if (!problem) throw new Error("Problem not found");

                // 3. If it's a CONTEST problem solved in practice mode, don't increment global stats
                // unless already solved in a contest. But our logic above checks for ANY accepted.
                // We double check the current submission or latest if current not provided.
                const latestSubmission = await tx.submission.findFirst({
                    where: {
                        id: currentSubmissionId,
                        problemId,
                        userId,
                        status: "ACCEPTED",
                        mode: "SUBMIT"
                    },
                    orderBy: { createdAt: 'desc' },
                    select: { contestId: true }
                });

                if (problem.type === "CONTEST" && !latestSubmission?.contestId) {
                    return { firstSolved: false, points: 0 };
                }

                // 4. Create the unique marker — race conditions cause transaction rollback
                await (tx as any).userProblemSolved.create({
                    data: { userId, problemId }
                });

                // 5. Perform the increments
                const points = getPointsForDifficulty(problem.difficulty);

                await tx.problem.update({
                    where: { id: problemId },
                    data: { solved: { increment: 1 } }
                });

                if (problem.difficulty !== "CONCEPT" && points > 0) {
                    await tx.user.update({
                        where: { id: userId },
                        data: {
                            problemsSolved: { increment: 1 },
                            totalScore: { increment: points }
                        }
                    });
                }
                return { firstSolved: true, points };
            });
        } catch (error: any) {
            // P2002 unique constraint on UserProblemSolved
            if (error.code === 'P2002') return { firstSolved: false, points: 0 };
            console.error("Failed to update problem stats:", error);
            throw error;
        }

        // Cache invalidation runs AFTER the transaction — now guaranteed to execute.
        if (result.firstSolved) {
            await this.invalidateSolvedCaches(userId);
        }

        return result;
    }

    /**
     * Invalidate Redis and Next.js caches after a problem is first solved.
     * Extracted from incrementProblemSolved so it is always reachable (was previously dead code).
     * Uses SCAN instead of KEYS to avoid blocking Redis in production.
     */
    static async invalidateSolvedCaches(userId: string): Promise<void> {
        // 1. Redis key invalidation
        try {
            const keysToDelete: string[] = [
                `user-score-${userId}`,
            ];

            // Use SCAN cursor loop to find all leaderboard keys (global and instance)
            // This prevents blocking Redis with KEYS '*' and ensures all matched keys are cleared.
            const patterns = ['lb:global:*', 'lb:inst:*'];
            for (const pattern of patterns) {
                let cursor = '0';
                do {
                    const [nextCursor, keys] = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', '100');
                    cursor = nextCursor;
                    keysToDelete.push(...keys);
                } while (cursor !== '0');
            }

            if (keysToDelete.length > 0) {
                // Deduplicate keys just in case
                const uniqueKeys = [...new Set(keysToDelete)];
                await redis.del(...uniqueKeys);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== "production") {
                console.warn("Failed to invalidate Redis cache after solve:", error);
            }
        }

        // 2. Next.js cache tag invalidation
        const tagsToRevalidate = [
            'categories-list',
            `categories-DSA-user-${userId}`,
            `categories-SQL-user-${userId}`,
            `user-submissions-${userId}`,
            'problems-list',
            'problems-search',
            'leaderboard',
            'leaderboard-global',
        ];

        for (const tag of tagsToRevalidate) {
            try {
                revalidateTag(tag, 'max');
            } catch (_err) {
                // Non-critical — may throw outside of a request context (e.g. in BullMQ worker)
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
                        name: true,
                        judge0Id: true
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

    static async updateUserStreak(userId: string) {
        console.log(`[STREAK] Starting updateUserStreak for user: ${userId}`);

        const now = new Date();
        // Normalize to start of day (UTC)
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const yesterday = new Date(today);
        yesterday.setUTCDate(today.getUTCDate() - 1);

        try {
            // Use a transaction for atomicity and race-safety
            return await prisma.$transaction(async (tx) => {

                // 1. Check if a record already exists for today to avoid transaction abortion
                const existingStreak = await (tx as any).dailyStreak.findUnique({
                    where: {
                        userId_date: {
                            userId,
                            date: today
                        }
                    }
                });

                if (existingStreak) {
                    console.log(`[STREAK] Daily streak record already exists for ${today.toISOString()}`);
                    const user = await tx.user.findUnique({
                        where: { id: userId },
                        select: { currentStreak: true }
                    });
                    return { streakUpdated: false, currentStreak: user?.currentStreak || 0 };
                }

                // 2. Attempt to create a daily streak record for today
                // This is the atomic marker for 'first submission of the day'
                await (tx as any).dailyStreak.create({
                    data: {
                        userId,
                        date: today
                    }
                });
                console.log(`[STREAK] Created daily streak record for ${today.toISOString()}`);

                // If we're here, it's the first valid submission of the day
                const user = await tx.user.findUnique({
                    where: { id: userId },
                    select: {
                        currentStreak: true,
                        longestStreak: true,
                        lastStreakDate: true
                    }
                });

                if (!user) throw new Error("User not found");

                let newStreak = 1;
                const lastDate = user.lastStreakDate ? new Date(user.lastStreakDate) : null;

                if (lastDate) {
                    // Normalize lastDate to UTC start of day for accurate comparison
                    const lastDateUtc = new Date(Date.UTC(lastDate.getUTCFullYear(), lastDate.getUTCMonth(), lastDate.getUTCDate()));

                    if (lastDateUtc.getTime() === yesterday.getTime()) {
                        // Increment streak
                        newStreak = user.currentStreak + 1;
                    } else if (lastDateUtc.getTime() === today.getTime()) {
                        // Already handled by the unique constraint and check above, but for safety:
                        return { streakUpdated: false, currentStreak: user.currentStreak };
                    }
                }

                // Update user's streak stats
                const newLongestStreak = Math.max(user.longestStreak, newStreak);
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        currentStreak: newStreak,
                        longestStreak: newLongestStreak,
                        lastStreakDate: today
                    }
                });

                console.log(`[STREAK] Updated user ${userId} streak to ${newStreak}`);
                return { streakUpdated: true, currentStreak: newStreak };

            });
        } catch (error: any) {
            console.log(`[STREAK] Error/Duplicate caught: ${error.code || error.message}`);
            // If it's a unique constraint violation (P2002), it's not the first submission of the day
            if (error.code === 'P2002') {
                // We must use the global 'prisma' client for any further queries.
                const user = await prisma.user.findUnique({
                    where: { id: userId },
                    select: { currentStreak: true }
                });
                return { streakUpdated: false, currentStreak: user?.currentStreak || 0 };
            }
            throw error;
        }
    }
}
