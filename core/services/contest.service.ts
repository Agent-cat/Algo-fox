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

        // FIX: Replaced N+1 pattern (2 queries per participant) with 4 bulk queries total.
        // For 200 participants this reduces ~400 DB round-trips to 4.
        const [participations, total] = await Promise.all([
            // Paginated participants
            prisma.contestParticipation.findMany({
                where: { contestId },
                include: { user: { select: { id: true, name: true, image: true } } },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { userId: "asc" }
            }),
            // Total count for pagination
            prisma.contestParticipation.count({ where: { contestId } }),
        ]);

        const paginatedUserIds = participations.map(p => p.userId);

        const [allAcceptedGrouped, allAttemptsGrouped] = await Promise.all([
            // All ACCEPTED submissions for ONLY the paginated users (single bulk query)
            prisma.submission.groupBy({
                by: ["userId", "problemId"],
                where: {
                    contestId,
                    userId: { in: paginatedUserIds },
                    status: "ACCEPTED",
                    mode: "SUBMIT",
                    createdAt: { gte: contest.startTime, lte: contest.endTime }
                },
                _min: { createdAt: true },
                _count: true
            }),
            // All submission attempts for ONLY the paginated users (single bulk query)
            prisma.submission.groupBy({
                by: ["userId", "problemId"],
                where: {
                    contestId,
                    userId: { in: paginatedUserIds },
                    mode: "SUBMIT",
                    createdAt: { gte: contest.startTime, lte: contest.endTime }
                },
                _count: true
            }),
        ]);

        // Build O(1) lookup maps from bulk query results
        // acceptedMap[userId][problemId] = { minCreatedAt, count }
        const acceptedMap = new Map<string, Map<string, { minCreatedAt: Date | null; count: number }>>();
        for (const row of allAcceptedGrouped) {
            if (!acceptedMap.has(row.userId)) acceptedMap.set(row.userId, new Map());
            acceptedMap.get(row.userId)!.set(row.problemId, {
                minCreatedAt: row._min.createdAt,
                count: row._count
            });
        }

        // attemptsMap[userId][problemId] = totalCount
        const attemptsMap = new Map<string, Map<string, number>>();
        for (const row of allAttemptsGrouped) {
            if (!attemptsMap.has(row.userId)) attemptsMap.set(row.userId, new Map());
            attemptsMap.get(row.userId)!.set(row.problemId, row._count);
        }

        // Aggregate per participant entirely in JS — zero additional DB calls
        const students = participations.map((p) => {
            const userAccepted = acceptedMap.get(p.userId) || new Map();
            const userAttempts = attemptsMap.get(p.userId) || new Map();

            const problemScores = new Map<string, number>();
            const problemSolveTimes = new Map<string, number>();
            const problemSubmissionCounts = new Map<string, number>();
            const problemWrongAttempts = new Map<string, number>();

            // Process accepted submissions
            for (const [probId, acc] of userAccepted.entries()) {
                const prob = contest.problems.find(cp => cp.problemId === probId);
                const maxScore = prob?.problem.score || 0;
                problemScores.set(probId, maxScore);

                if (acc.minCreatedAt) {
                    const solveTime = acc.minCreatedAt.getTime() - contest.startTime.getTime();
                    problemSolveTimes.set(probId, solveTime);
                }
            }

            // Process all submission counts
            for (const [probId, count] of userAttempts.entries()) {
                problemSubmissionCounts.set(probId, count);
                const acceptedCount = userAccepted.get(probId)?.count || 0;
                problemWrongAttempts.set(
                    probId,
                    Math.max(0, count - acceptedCount)
                );
            }

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
        });

        // Sort by score (desc) then by time (asc)
        students.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);

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
            totalPages: Math.ceil(total / pageSize),
            page,
            pageSize
        };
    }

    /**
     * Get contests visible to a user with pagination
     */
    static async getVisibleContests(params: {
        userId?: string;
        email?: string;
        role?: string;
        institutionId?: string | null;
        page?: number;
        pageSize?: number;
        status?: "active" | "past";
    }) {
        const { userId, email, role, institutionId, page = 1, pageSize = 12, status } = params;
        const skip = (page - 1) * pageSize;
        const now = new Date();

        // Visibility logic:
        // 1. Creator and ADMIN see everything
        // 2. Others see contests matching visibility criteria AND (no target emails OR their email is in target emails)
        const visibilityCriteria = [
            { visibility: "PUBLIC" as any },
            {
                AND: [
                    { visibility: "INSTITUTION" as any },
                    { institutionId: institutionId || undefined },
                ],
            },
            {
                AND: [
                    { visibility: "CLASSROOM" as any },
                    {
                        OR: [
                            { classroom: { students: { some: { id: userId || "" } } } },
                            { creatorId: userId },
                        ],
                    },
                ],
            },
        ];

        const finalWhere: any = {
            OR: [
                { creatorId: userId },
                {
                    AND: [
                        { OR: visibilityCriteria },
                        {
                            OR: [
                                { targetEmails: { equals: [] } },
                                { targetEmails: { has: email || "" } }
                            ]
                        }
                    ]
                }
            ],
            hidden: role === "ADMIN" ? undefined : false,
        };

        if (role === "ADMIN") {
            delete finalWhere.OR; // Admin sees all
        }

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
                    contestPassword: data.contestPassword?.trim() ? await bcrypt.hash(data.contestPassword.trim(), 10) : null,
                    randomizeQuestions: data.randomizeQuestions || false,
                    isIPRestricted: data.isIPRestricted || false,
                    allowedIPs: data.allowedIPs || [],
                    mode: data.mode || "PARALLEL",
                    durationMinutes: data.durationMinutes || null,
                }
            });

            if (data.sections && data.sections.length > 0) {
                // Loop over sections
                for (let sIndex = 0; sIndex < data.sections.length; sIndex++) {
                    const sec = data.sections[sIndex];

                    const actualSection = await tx.contestSection.create({
                        data: {
                            contestId: contest.id,
                            title: sec.title,
                            description: sec.description || null,
                            order: sec.order || sIndex,
                            durationMinutes: sec.durationMinutes || null,
                        }
                    });

                    if (sec.problems && sec.problems.length > 0) {
                        // Check if it's strings (existing problem IDs) or objects (new problems)
                        if (typeof sec.problems[0] === 'string') {
                            await tx.contestSectionProblem.createMany({
                                data: sec.problems.map((problemId: string, index: number) => ({
                                    sectionId: actualSection.id,
                                    problemId,
                                    order: index,
                                }))
                            });
                        } else {
                    // Full problem objects
                            const createdProblems = await Promise.all(
                                sec.problems.map((p: any, i: number) =>
                                    tx.problem.create({
                                        data: {
                                            title: p.title,
                                            description: p.description,
                                            difficulty: p.difficulty || "EASY",
                                            slug: `${contest.slug}-${p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}-${i}`,
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
                                                    create: { name: t, slug: t.toLowerCase().replace(/[^a-z0-9]+/g, '-') }
                                                }))
                                            }
                                        }
                                    })
                                )
                            );

                            await tx.contestSectionProblem.createMany({
                                data: createdProblems.map((problem, i) => ({
                                    sectionId: actualSection.id,
                                    problemId: problem.id,
                                    order: i,
                                }))
                            });
                        }
                    }
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
                    contestPassword: data.contestPassword?.trim() ? await bcrypt.hash(data.contestPassword.trim(), 10) : undefined,
                    randomizeQuestions: data.randomizeQuestions || false,
                    isIPRestricted: data.isIPRestricted,
                    allowedIPs: data.allowedIPs,
                    mode: data.mode || "PARALLEL",
                    durationMinutes: data.durationMinutes || null,
                }
            });

            if (data.sections) {
                // Delete existing sections completely (this cascades to ContestSectionProblem)
                await tx.contestSection.deleteMany({
                    where: { contestId }
                });

                // Re-create sections
                for (let sIndex = 0; sIndex < data.sections.length; sIndex++) {
                    const sec = data.sections[sIndex];

                    const actualSection = await tx.contestSection.create({
                        data: {
                            contestId: contest.id,
                            title: sec.title,
                            description: sec.description || null,
                            order: sec.order || sIndex,
                            durationMinutes: sec.durationMinutes || null,
                        }
                    });

                    // Re-create links/problems
                    if (sec.problems) {
                        for (let i = 0; i < sec.problems.length; i++) {
                            const p = sec.problems[i];
                            let problemId = typeof p === 'string' ? p : p.id;

                            if (typeof p !== 'string') {
                                if (!p.id || p.id.startsWith("temp-")) {
                                    const uniqueSlug = `${contest.slug}-${p.slug || p.title?.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
                                    const newProblem = await tx.problem.create({
                                        data: {
                                            title: p.title,
                                            description: p.description,
                                            difficulty: p.difficulty || "EASY",
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
                            }

                            await tx.contestSectionProblem.create({
                                data: {
                                    sectionId: actualSection.id,
                                    problemId,
                                    order: i,
                                }
                            });
                        }
                    }
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
            select: {
                startTime: true,
                endTime: true,
                contestPassword: true,
                durationMinutes: true,
                mode: true,
                sections: { orderBy: { order: "asc" }, select: { id: true } }
            }
        });

        if (!contest) return { success: false, error: "Contest not found" };
        if (contest.contestPassword) {
            const isMatch = await bcrypt.compare(password?.trim() || "", contest.contestPassword);
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

        const effectiveEndTime = contest.durationMinutes
            ? new Date(Math.min(contest.endTime.getTime(), now.getTime() + contest.durationMinutes * 60 * 1000))
            : contest.endTime;

        return await prisma.$transaction(async (tx) => {
            const participation = await tx.contestParticipation.upsert({
                where: { userId_contestId: { userId, contestId } },
                update: {
                    sessionId,
                    sessionStartedAt: now,
                    acceptedRules: true,
                    ipAddress: ipHistory,
                    // DO NOT overwrite existing startedAt / effectiveEndTime on reconnect
                },
                create: {
                    userId,
                    contestId,
                    sessionId,
                    sessionStartedAt: now,
                    startedAt: now,
                    effectiveEndTime,
                    acceptedRules: true,
                    ipAddress: clientIP,
                    currentSectionId: contest.sections.length > 0 ? contest.sections[0].id : null
                }
            });

            // If it's a first-time start, initialize the section states
            if (!existing && contest.sections.length > 0) {
                if (contest.mode === "SEQUENTIAL") {
                    await tx.contestParticipationSection.create({
                        data: {
                            participationId: participation.id,
                            sectionId: contest.sections[0].id,
                            isUnlocked: true,
                            startedAt: now
                        }
                    });
                } else if (contest.mode === "PARALLEL") {
                    await tx.contestParticipationSection.createMany({
                        data: contest.sections.map(s => ({
                            participationId: participation.id,
                            sectionId: s.id,
                            isUnlocked: true,
                            startedAt: now
                        }))
                    });
                }
            }

            return { success: true, sessionId, participationId: participation.id };
        });
    }

    /**
     * Submit a section and unlock the next section if sequential
     */
    static async submitSection(userId: string, contestId: string, sectionId: string) {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            include: { sections: { orderBy: { order: "asc" } } }
        });
        if (!contest) return { success: false, error: "Contest not found" };

        const participation = await prisma.contestParticipation.findUnique({
            where: { userId_contestId: { userId, contestId } }
        });
        if (!participation) return { success: false, error: "No participation" };

        const now = new Date();
        if (participation.effectiveEndTime && now > participation.effectiveEndTime) {
            // Lazy evaluate time expiration
            await prisma.contestParticipation.update({
                where: { id: participation.id },
                data: { isFinished: true, finishedAt: now, finishReason: "TIME_EXPIRED" }
            });
            return { success: false, error: "Time expired" };
        }

        return await prisma.$transaction(async (tx) => {
            // Lock current section
            await tx.contestParticipationSection.update({
                where: { participationId_sectionId: { participationId: participation.id, sectionId } },
                data: { isSubmitted: true, submittedAt: now, lockedAt: now }
            });

            // If sequential, unlock next
            if (contest.mode === "SEQUENTIAL") {
                const currentIdx = contest.sections.findIndex(s => s.id === sectionId);
                if (currentIdx !== -1 && currentIdx < contest.sections.length - 1) {
                    const nextSection = contest.sections[currentIdx + 1];
                    await tx.contestParticipationSection.upsert({
                        where: { participationId_sectionId: { participationId: participation.id, sectionId: nextSection.id } },
                        update: { isUnlocked: true, startedAt: now },
                        create: { participationId: participation.id, sectionId: nextSection.id, isUnlocked: true, startedAt: now }
                    });

                    await tx.contestParticipation.update({
                        where: { id: participation.id },
                        data: { currentSectionId: nextSection.id }
                    });
                } else if (currentIdx === contest.sections.length - 1) {
                    // Last section submitted, finish contest
                    await tx.contestParticipation.update({
                        where: { id: participation.id },
                        data: { isFinished: true, finishedAt: now, finishReason: "SUBMITTED_MANUALLY" }
                    });
                }
            }
            return { success: true };
        });
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
