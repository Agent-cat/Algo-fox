import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";
import bcrypt from "bcryptjs";

export class ContestService {
    /**
     * Get a contest by its ID or Slug
     */
    static async getContest(identifier: string) {
        return prisma.contest.findUnique({
            where: identifier.length === 24 ? { id: identifier } : { slug: identifier },
            include: {
                _count: { select: { problems: true } },
                problems: {
                    include: {
                        problem: {
                            select: {
                                id: true,
                                title: true,
                                difficulty: true,
                                slug: true,
                                score: true,
                            },
                        },
                    },
                    orderBy: { order: "asc" },
                },
            },
        });
    }

    /**
     * Get participation status for a user in a contest
     */
    static async getParticipation(userId: string, contestId: string) {
        return prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId,
                    contestId,
                },
            },
        });
    }

    /**
     * Validate if a session is valid for submissions
     */
    static async validateSession(userId: string, contestId: string, sessionId?: string) {
        const [contest, participation] = await Promise.all([
            prisma.contest.findUnique({
                where: { id: contestId },
                select: { startTime: true, endTime: true, isFinalized: true }
            }),
            this.getParticipation(userId, contestId)
        ]);

        if (!contest) return { success: false, error: "Contest not found" };

        const now = new Date();
        if (now < contest.startTime) return { success: false, error: "Contest has not started" };
        if (now > contest.endTime) return { success: false, error: "Contest has ended" };

        if (!participation) return { success: false, error: "No participation found" };
        if (participation.isBlocked) return { success: false, error: "Blocked due to violations" };
        if (participation.isFinished) return { success: false, error: "Contest session finished" };

        if (sessionId && participation.sessionId !== sessionId) {
            return { success: false, error: "Session mismatch (multiple tabs?)" };
        }

        return { success: true, contest, participation };
    }

    /**
     * Check if a user's submission is blocked due to violations
     * CRITICAL: This is a server-side enforcement point - cannot be bypassed by client
     */
    static async isSubmissionBlocked(userId: string, contestId: string): Promise<boolean> {
        const participation = await this.getParticipation(userId, contestId);
        if (!participation) return true; // Block if no participation found

        // Permanently blocked users cannot submit
        if (participation.permanentlyBlocked) {
            return true;
        }

        // Temporarily blocked users cannot submit if block time hasn't expired
        if (participation.isBlocked && participation.tempBlockedUntil) {
            const now = new Date();
            if (now < participation.tempBlockedUntil) {
                return true;
            }
        }

        // If isBlocked is true but no tempBlockedUntil, they are permanently blocked
        if (participation.isBlocked && !participation.tempBlockedUntil) {
            return true;
        }

        return false;
    }

    /**
     * Determine visible problems for a user in a contest
     * CONSOLIDATES RANDOMIZATION LOGIC - fixes logic leakage
     * 
     * Handles:
     * 1. Access control (what problems are visible)
     * 2. Question randomization (if enabled)
     * 
     * This prevents the policy (when to randomize) from being split
     * between the action layer and service layer.
     */
    static determineVisibleProblems(
        problems: any[],
        contestId: string,
        userId: string | null,
        options: {
            hasStarted: boolean;
            isAdmin: boolean;
            isCreator: boolean;
            shouldRandomize: boolean;
        }
    ): any[] {
        const { hasStarted, isAdmin, isCreator, shouldRandomize } = options;

        // Step 1: Determine if problems should be visible at all
        const canSeeProblems = (hasStarted || isAdmin || isCreator);
        if (!canSeeProblems) return [];

        // Step 2: Return unrandomized if not applicable
        if (!shouldRandomize || !userId || problems.length === 0) {
            return problems;
        }

        // Step 3: Don't randomize for admin/creator (they see original order)
        if (isAdmin || isCreator) {
            return problems;
        }

        // Step 4: Apply deterministic shuffle based on user ID
        const seed = this.hashString(`${userId}-${contestId}`);
        return this.seededShuffle(problems, seed);
    }

    /**
     * Calculate and return the leaderboard with efficient pagination (OPTIMIZED)
     * 
     * SECURITY/PERFORMANCE FIX: Previously loaded ALL submissions into RAM.
     * Now uses efficient database-level aggregation with cursor pagination.
     * This prevents OOM crashes on large contests.
     */
    static async getLeaderboard(contestId: string, params: { page?: number, pageSize?: number } = {}) {
        const { page = 1, pageSize = 50 } = params;

        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: {
                startTime: true,
                endTime: true,
                isFinalized: true,
                problems: {
                    include: {
                        problem: { select: { id: true, title: true, score: true, slug: true, description: true } }
                    },
                    orderBy: { order: "asc" }
                }
            }
        });

        if (!contest) return null;

        // Get paginated participants with efficient aggregation
        const participations = await prisma.contestParticipation.findMany({
            where: { contestId },
            include: {
                user: { select: { id: true, name: true, image: true } }
            },
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { userId: "asc" } // Stable ordering for pagination
        });

        // For each participant, get their submission summary (minimal data)
        const students = await Promise.all(
            participations.map(async (p) => {
                // Get summarized data per problem for this user
                const acceptedSubmissions = await prisma.submission.groupBy({
                    by: ["problemId"],
                    where: {
                        userId: p.userId,
                        contestId,
                        status: "ACCEPTED",
                        createdAt: { gte: contest.startTime, lte: contest.endTime },
                        mode: "SUBMIT"
                    },
                    _min: { createdAt: true },
                    _count: true
                });

                // Get all submission counts per problem
                const allSubmissions = await prisma.submission.groupBy({
                    by: ["problemId"],
                    where: {
                        userId: p.userId,
                        contestId,
                        createdAt: { gte: contest.startTime, lte: contest.endTime },
                        mode: "SUBMIT"
                    },
                    _count: true
                });

                const problemScores = new Map<string, number>();
                const problemSolveTimes = new Map<string, number>();
                const problemSubmissionCounts = new Map<string, number>();
                const problemWrongAttempts = new Map<string, number>();

                // Process accepted submissions
                acceptedSubmissions.forEach((acc) => {
                    const prob = contest.problems.find(cp => cp.problemId === acc.problemId);
                    const maxScore = prob?.problem.score || 0;
                    problemScores.set(acc.problemId, maxScore);

                    if (acc._min.createdAt) {
                        const solveTime = acc._min.createdAt.getTime() - contest.startTime.getTime();
                        problemSolveTimes.set(acc.problemId, solveTime);
                    }
                });

                // Process all submissions to count attempts
                allSubmissions.forEach((sub) => {
                    problemSubmissionCounts.set(sub.problemId, sub._count);

                    // Wrong attempts = total submissions - 1 (if has accepted solution)
                    if (problemScores.has(sub.problemId)) {
                        problemWrongAttempts.set(
                            sub.problemId,
                            Math.max(0, sub._count - 1)
                        );
                    } else {
                        problemWrongAttempts.set(sub.problemId, sub._count);
                    }
                });

                const totalScore = Array.from(problemScores.values()).reduce((a, b) => a + b, 0);
                const totalTime = Array.from(problemSolveTimes.values()).reduce((a, b) => a + b, 0);

                const problemStats = contest.problems.map(cp => ({
                    problemId: cp.problemId,
                    title: cp.problem.title,
                    slug: cp.problem.slug,
                    score: problemScores.get(cp.problemId) || 0,
                    maxScore: cp.problem.score,
                    submissions: problemSubmissionCounts.get(cp.problemId) || 0,
                    wrongAttempts: problemWrongAttempts.get(cp.problemId) || 0,
                    solved: problemScores.has(cp.problemId),
                    solvedAt: problemSolveTimes.get(cp.problemId),
                }));

                return {
                    ...p.user,
                    score: totalScore,
                    timeTaken: totalTime,
                    problemsSolved: problemScores.size,
                    totalViolations: p.totalViolations,
                    problemStats,
                    ipAddress: p.ipAddress
                };
            })
        );

        // Sort by score (desc) then by time (asc)
        students.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);

        // Get total count for pagination
        const total = await prisma.contestParticipation.count({
            where: { contestId }
        });

        const totalPages = Math.ceil(total / pageSize);

        return {
            students,
            isFinalized: contest.isFinalized,
            problems: contest.problems.map(cp => ({
                id: cp.problemId,
                title: cp.problem.title,
                description: cp.problem.description,
                slug: cp.problem.slug,
                score: cp.problem.score
            })),
            total,
            totalPages,
            page,
            pageSize
        };
    }

    /**
     * Get contests visible to a user with pagination
     */
    static async getVisibleContests(params: {
        userId?: string;
        role?: string;
        institutionId?: string | null;
        page?: number;
        pageSize?: number;
        status?: "active" | "past";
    }) {
        const { userId, role, institutionId, page = 1, pageSize = 12, status } = params;
        const skip = (page - 1) * pageSize;
        const now = new Date();

        const baseWhere: any = {
            OR: [
                { visibility: "PUBLIC" },
                {
                    AND: [
                        { visibility: "INSTITUTION" },
                        { institutionId: institutionId || undefined },
                    ],
                },
                {
                    AND: [
                        { visibility: "CLASSROOM" },
                        {
                            OR: [
                                { classroom: { students: { some: { id: userId } } } },
                                { creatorId: userId },
                            ],
                        },
                    ],
                },
                { creatorId: userId },
            ],
        };

        const finalWhere: any = role === "ADMIN" ? baseWhere : { ...baseWhere, hidden: false };

        if (status === "active") {
            finalWhere.endTime = { gte: now };
        } else if (status === "past") {
            finalWhere.endTime = { lt: now };
        }

        const [contests, total] = await Promise.all([
            prisma.contest.findMany({
                where: finalWhere,
                include: {
                    _count: { select: { problems: true } },
                    participants: userId ? {
                        where: { userId },
                        select: { isFinished: true, acceptedRules: true }
                    } : false
                },
                orderBy: { startTime: "desc" },
                skip,
                take: pageSize,
            }),
            prisma.contest.count({
                where: finalWhere
            })
        ]);

        return {
            contests: contests.map(c => ({
                ...c,
                isParticipating: userId ? (c.participants.length > 0 && c.participants[0].acceptedRules) : false,
                isFinished: userId ? (c.participants.length > 0 && c.participants[0].isFinished) : false
            })),
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        };
    }

    /**
     * Create a new contest with problems
     */
    static async createContest(params: {
        creatorId: string;
        data: any; // Validated data
    }) {
        const { creatorId, data } = params;

        return prisma.$transaction(async (tx) => {
            const contest = await tx.contest.create({
                data: {
                    title: data.title,
                    slug: data.slug || `${data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
                    description: data.description,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    visibility: data.visibility,
                    hidden: data.hidden || false,
                    backgroundImage: data.backgroundImage,
                    ogImage: data.ogImage,
                    useOgImage: data.useOgImage || false,
                    prizes: data.prizes,
                    rules: data.rules,
                    scoring: data.scoring,
                    isProtected: data.isProtected ?? true,
                    targetEmails: data.targetEmails || [],
                    institutionId: data.visibility !== "PUBLIC" ? (data.institutionId || null) : null,
                    classroomId: data.visibility === "CLASSROOM" ? (data.classroomId || null) : null,
                    creatorId,
                    contestPassword: data.contestPassword ? await bcrypt.hash(data.contestPassword, 10) : null,
                    randomizeQuestions: data.randomizeQuestions || false,
                    isIPRestricted: data.isIPRestricted || false,
                    allowedIPs: data.allowedIPs || [],
                }
            });

            if (data.problems && data.problems.length > 0) {
                // If problems are just IDs
                if (typeof data.problems[0] === 'string') {
                    await tx.contestProblem.createMany({
                        data: data.problems.map((problemId: string, index: number) => ({
                            contestId: contest.id,
                            problemId,
                            order: index,
                        }))
                    });
                } else {
                    // Full problem objects (for createContestWithProblems)
                    const createdProblems = await Promise.all(
                        data.problems.map((p: any, i: number) =>
                            tx.problem.create({
                                data: {
                                    title: p.title,
                                    description: p.description,
                                    difficulty: p.difficulty,
                                    slug: `${contest.slug}-${p.slug || p.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`,
                                    score: p.score || 10,
                                    domain: p.domain,
                                    type: "CONTEST",
                                    hidden: true,
                                    testCases: {
                                        create: (p.testCases || []).map((tc: any) => ({
                                            input: tc.input,
                                            output: tc.output,
                                            hidden: tc.hidden || false
                                        }))
                                    },
                                    tags: {
                                        connectOrCreate: (p.tags || []).map((t: string) => ({
                                            where: { name: t },
                                            create: { name: t, slug: t.toLowerCase().replace(/\s+/g, '-') }
                                        }))
                                    }
                                }
                            })
                        )
                    );

                    await tx.contestProblem.createMany({
                        data: createdProblems.map((problem, i) => ({
                            contestId: contest.id,
                            problemId: problem.id,
                            order: i,
                        }))
                    });
                }
            }

            return contest;
        });
    }

    /**
     * Update an existing contest with problems
     */
    static async updateContest(params: {
        contestId: string;
        data: any; // Validated data
    }) {
        const { contestId, data } = params;

        return prisma.$transaction(async (tx) => {
            const contest = await tx.contest.update({
                where: { id: contestId },
                data: {
                    title: data.title,
                    slug: data.slug,
                    description: data.description,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    visibility: data.visibility,
                    hidden: data.hidden,
                    backgroundImage: data.backgroundImage,
                    ogImage: data.ogImage,
                    useOgImage: data.useOgImage,
                    prizes: data.prizes,
                    rules: data.rules,
                    scoring: data.scoring,
                    isProtected: data.isProtected,
                    targetEmails: data.targetEmails,
                    institutionId: data.visibility !== "PUBLIC" ? (data.institutionId || null) : null,
                    classroomId: data.visibility === "CLASSROOM" ? (data.classroomId || null) : null,
                    contestPassword: data.contestPassword ? await bcrypt.hash(data.contestPassword, 10) : undefined,
                    randomizeQuestions: data.randomizeQuestions || false,
                    isIPRestricted: data.isIPRestricted,
                    allowedIPs: data.allowedIPs,
                }
            });

            if (data.problems) {
                // Delete existing contest problems links
                await tx.contestProblem.deleteMany({
                    where: { contestId }
                });

                // Re-create links/problems
                for (let i = 0; i < data.problems.length; i++) {
                    const p = data.problems[i];
                    let problemId = p.id;

                    if (!p.id || p.id.startsWith("temp-")) {
                        const uniqueSlug = `${contest.slug}-${p.slug || p.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
                        const newProblem = await tx.problem.create({
                            data: {
                                title: p.title,
                                description: p.description,
                                difficulty: p.difficulty,
                                slug: uniqueSlug,
                                score: p.score || 10,
                                domain: p.domain,
                                type: "CONTEST",
                                hidden: true,
                                testCases: {
                                    create: (p.testCases || []).map((tc: any) => ({
                                        input: tc.input,
                                        output: tc.output,
                                        hidden: tc.hidden || false,
                                    })),
                                },
                            }
                        });
                        problemId = newProblem.id;
                    } else if (p.isModified) {
                        const existingProblem = await tx.problem.findUnique({ where: { id: p.id } });
                        if (existingProblem && existingProblem.type === "CONTEST") {
                            await tx.problem.update({
                                where: { id: p.id },
                                data: {
                                    title: p.title,
                                    description: p.description,
                                    difficulty: p.difficulty,
                                    score: p.score || 10,
                                    domain: p.domain,
                                    testCases: {
                                        deleteMany: {},
                                        create: (p.testCases || []).map((tc: any) => ({
                                            input: tc.input,
                                            output: tc.output,
                                            hidden: tc.hidden || false,
                                        })),
                                    },
                                }
                            });
                        }
                    }

                    await tx.contestProblem.create({
                        data: {
                            contestId,
                            problemId,
                            order: i,
                        }
                    });
                }
            }

            return contest;
        });
    }

    /**
     * Helper for deterministic string hashing
     */
    static hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    /**
     * Fisher-Yates shuffle with seeded random
     */
    static seededShuffle<T>(array: T[], seed: number): T[] {
        const result = [...array];
        let rng = seed;

        const random = () => {
            rng = (rng * 9301 + 49297) % 233280;
            return rng / 233280;
        };

        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    /**
     * Start a contest session for a user
     */
    static async startSession(params: {
        userId: string;
        contestId: string;
        password?: string;
        clientIP?: string;
    }) {
        const { userId, contestId, password, clientIP } = params;

        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: { startTime: true, endTime: true, contestPassword: true }
        });

        if (!contest) return { success: false, error: "Contest not found" };
        if (contest.contestPassword) {
            const isMatch = await bcrypt.compare(password || "", contest.contestPassword);
            if (!isMatch) return { success: false, error: "Invalid contest password" };
        }

        const now = new Date();
        if (now < contest.startTime) return { success: false, error: "Contest not started" };
        if (now > contest.endTime) return { success: false, error: "Contest ended" };

        const sessionId = `${userId}-${contestId}-${Date.now()}`;

        const existing = await prisma.contestParticipation.findUnique({
            where: { userId_contestId: { userId, contestId } }
        });

        if (existing?.isBlocked) return { success: false, error: "Blocked" };
        if (existing?.isFinished) return { success: false, error: "Finished" };

        let ipHistory = existing?.ipAddress || clientIP;
        if (existing?.ipAddress && clientIP && !existing.ipAddress.includes(clientIP)) {
            ipHistory = `${existing.ipAddress}, ${clientIP}`;
        }

        const participation = await prisma.contestParticipation.upsert({
            where: { userId_contestId: { userId, contestId } },
            update: { sessionId, sessionStartedAt: now, acceptedRules: true, ipAddress: ipHistory },
            create: { userId, contestId, sessionId, sessionStartedAt: now, acceptedRules: true, ipAddress: clientIP }
        });

        return { success: true, sessionId, participationId: participation.id };
    }

    /**
     * Log a contest violation with intelligent per-violation-type debouncing
     * 
     * SECURITY FIX: Critical violations (TAB_SWITCH, DEVTOOLS, COPY_PASTE) are NEVER debounced.
     * Less critical violations (KEYBOARD_SHORTCUT, etc) have minimal debounce.
     * This prevents benign violations from masking serious ones.
     */
    static async logViolation(params: {
        userId: string;
        contestId: string;
        type: string;
        message?: string;
        metadata?: any;
    }) {
        const { userId, contestId, type, message, metadata } = params;

        const participation = await prisma.contestParticipation.findUnique({
            where: { userId_contestId: { userId, contestId } }
        });

        if (!participation) return { success: false, error: "No participation" };

        // Define violation severity and debounce strategy
        const violationConfig = {
            // CRITICAL violations - NEVER debounce
            TAB_SWITCH: { severity: "CRITICAL", debounceMs: 0, counterField: "tabSwitchCount" },
            DEVTOOLS_OPEN: { severity: "CRITICAL", debounceMs: 0, counterField: "devToolsCount" },
            COPY_PASTE: { severity: "CRITICAL", debounceMs: 0, counterField: "copyPasteCount" },
            MULTI_TAB: { severity: "CRITICAL", debounceMs: 0, counterField: "tabSwitchCount" },
            
            // HIGH severity - minimal debounce (300ms)
            FULLSCREEN_EXIT: { severity: "HIGH", debounceMs: 300, counterField: "fullscreenExitCount" },
            
            // MEDIUM severity - 500ms debounce
            KEYBOARD_SHORTCUT: { severity: "MEDIUM", debounceMs: 500, counterField: "keyboardCount" },
            NAVIGATION_ATTEMPT: { severity: "MEDIUM", debounceMs: 500, counterField: "navigationCount" },
            
            // LOW severity - 1000ms debounce
            SUSPICIOUS_INPUT: { severity: "LOW", debounceMs: 1000, counterField: "copyPasteCount" },
        };

        const config = violationConfig[type as keyof typeof violationConfig] || {
            severity: "MEDIUM",
            debounceMs: 500,
            counterField: "tabSwitchCount"
        };

        return prisma.$transaction(async (tx) => {
            // Check debounce ONLY for non-critical violations
            if (config.severity !== "CRITICAL") {
                const lastViolation = await tx.contestViolation.findFirst({
                    where: { participationId: participation.id },
                    orderBy: { createdAt: 'desc' }
                });

                // Apply severity-specific debounce
                if (lastViolation && (Date.now() - lastViolation.createdAt.getTime() < config.debounceMs)) {
                    // Still log it to audit trail (don't skip)
                    // But we return early to avoid incrementing counters
                    return participation;
                }
            }

            // ALWAYS create the violation record (even if debounced, for audit trail)
            await tx.contestViolation.create({
                data: { participationId: participation.id, type: type as any, message, metadata }
            });

            const newTotal = participation.totalViolations + 1;
            let tempBlockedUntil: Date | null = null;
            let permanentlyBlocked = false;
            let isBlocked = false;

            // Escalation thresholds
            if (newTotal >= 6) {
                permanentlyBlocked = true;
                isBlocked = true;
            } else if (newTotal >= 4) {
                tempBlockedUntil = new Date(Date.now() + 5 * 60 * 1000);
                isBlocked = true;
            }

            return tx.contestParticipation.update({
                where: { id: participation.id },
                data: {
                    [config.counterField as string]: { increment: 1 },
                    totalViolations: { increment: 1 },
                    isFlagged: newTotal >= 3 || participation.isFlagged,
                    isBlocked,
                    tempBlockedUntil,
                    permanentlyBlocked
                }
            });
        });
    }

    /**
     * Get the top 50 participants for a contest
     */
    static async getTopParticipants(contestId: string) {
        const leaderboard = await this.getLeaderboard(contestId);
        if (!leaderboard) return [];
        return leaderboard.students.slice(0, 50);
    }

    /**
     * Finalize contest and award badges
     */
    static async finalize(contestId: string) {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: { isFinalized: true }
        });

        if (!contest || contest.isFinalized) return { success: false, error: "Invalid state" };

        const topStudents = await this.getTopParticipants(contestId);
        if (topStudents.length === 0) {
            await prisma.contest.update({
                where: { id: contestId },
                data: { isFinalized: true }
            });
            return { success: true };
        }

        return prisma.$transaction(async (tx) => {
            if (topStudents[0]) await tx.user.update({ where: { id: topStudents[0].id }, data: { goldBadges: { increment: 1 } } });
            if (topStudents[1]) await tx.user.update({ where: { id: topStudents[1].id }, data: { silverBadges: { increment: 1 } } });
            if (topStudents[2]) await tx.user.update({ where: { id: topStudents[2].id }, data: { bronzeBadges: { increment: 1 } } });

            return tx.contest.update({
                where: { id: contestId },
                data: { isFinalized: true }
            });
        });
    }
}
