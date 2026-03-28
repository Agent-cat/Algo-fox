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
     * Calculate and return the leaderboard (Cached)
     */
    static async getLeaderboard(contestId: string, params: { page?: number, pageSize?: number } = {}) {
        const { page = 1, pageSize = 50 } = params;

        const [participations, contest] = await Promise.all([
            prisma.contestParticipation.findMany({
                where: { contestId },
                include: {
                    user: { select: { id: true, name: true, image: true } }
                }
            }),
            prisma.contest.findUnique({
                where: { id: contestId },
                include: {
                    problems: {
                        include: {
                            problem: { select: { id: true, title: true, score: true, slug: true, description: true } }
                        },
                        orderBy: { order: "asc" }
                    }
                }
            })
        ]);

        if (!contest) return null;

        const allSubmissions = await prisma.submission.findMany({
            where: {
                contestId,
                createdAt: { gte: contest.startTime, lte: contest.endTime },
                mode: "SUBMIT"
            },
            select: { id: true, status: true, problemId: true, createdAt: true, userId: true }
        });

        // Grouping logic (simplified)
        const submissionsByUser = new Map<string, any[]>();
        allSubmissions.forEach(s => {
            const subs = submissionsByUser.get(s.userId) || [];
            subs.push(s);
            submissionsByUser.set(s.userId, subs);
        });

        const students = participations.map(p => {
            const userSubs = submissionsByUser.get(p.userId) || [];
            const problemScores = new Map<string, number>();
            const problemSolveTimes = new Map<string, number>();
            const problemSubmissionCounts = new Map<string, number>();
            const problemWrongAttempts = new Map<string, number>();

            // Sort submissions by time to accurately count attempts before solving
            const sortedSubs = [...userSubs].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

            sortedSubs.forEach(s => {
                problemSubmissionCounts.set(s.problemId, (problemSubmissionCounts.get(s.problemId) || 0) + 1);

                if (s.status === "ACCEPTED") {
                    if (!problemScores.has(s.problemId)) {
                        const prob = contest.problems.find(cp => cp.problemId === s.problemId);
                        const maxScore = prob?.problem.score || 0;
                        problemScores.set(s.problemId, maxScore);
                        problemSolveTimes.set(s.problemId, s.createdAt.getTime() - contest.startTime.getTime());
                    }
                } else {
                    // Only count as wrong if not yet solved
                    if (!problemScores.has(s.problemId)) {
                        problemWrongAttempts.set(s.problemId, (problemWrongAttempts.get(s.problemId) || 0) + 1);
                    }
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
        });

        // Sort by score (desc) then by time (asc)
        students.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken);

        const total = students.length;
        const totalPages = Math.ceil(total / pageSize);
        const paginatedStudents = students.slice((page - 1) * pageSize, page * pageSize);

        return {
            students: paginatedStudents,
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
     * Log a contest violation
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

        const counterField = {
            TAB_SWITCH: "tabSwitchCount",
            FULLSCREEN_EXIT: "fullscreenExitCount",
            COPY_PASTE: "copyPasteCount",
            DEVTOOLS_OPEN: "devToolsCount",
            KEYBOARD_SHORTCUT: "keyboardCount",
            NAVIGATION_ATTEMPT: "navigationCount",
            MULTI_TAB: "tabSwitchCount",
            SUSPICIOUS_INPUT: "copyPasteCount"
        }[type] || "tabSwitchCount";

        return prisma.$transaction(async (tx) => {
            const lastViolation = await tx.contestViolation.findFirst({
                where: { participationId: participation.id },
                orderBy: { createdAt: 'desc' }
            });

            if (lastViolation && (Date.now() - lastViolation.createdAt.getTime() < 2000)) {
                return participation;
            }

            await tx.contestViolation.create({
                data: { participationId: participation.id, type: type as any, message, metadata }
            });

            const newTotal = participation.totalViolations + 1;
            let tempBlockedUntil: Date | null = null;
            let permanentlyBlocked = false;
            let isBlocked = false;

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
                    [counterField as string]: { increment: 1 },
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
