"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { revalidatePath, revalidateTag } from "next/cache";
import { getClientIP, isIPAllowed } from "@/lib/ip";

import { cacheTag, cacheLife } from "next/cache";


const contestSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    startTime: z.coerce.date(),
    endTime: z.coerce.date(),
    visibility: z.enum(["PUBLIC", "INSTITUTION", "CLASSROOM"]),
    classroomId: z.string().optional(),
    institutionId: z.string().optional().nullable(),
    problems: z.array(z.string()).min(1, "Select at least one problem"),
    contestPassword: z.string().optional(),
    randomizeQuestions: z.boolean().default(false),
    isIPRestricted: z.boolean().default(false),
    allowedIPs: z.array(z.string()).default([]),
});

import { ContestService } from "@/core/services/contest.service";

const contestWithProblemsSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
    description: z.string().optional(),
    startTime: z.date(),
    endTime: z.date(),
    visibility: z.enum(["PUBLIC", "INSTITUTION", "CLASSROOM"]),
    hidden: z.boolean().default(false),
    classroomId: z.string().optional(),
    institutionId: z.string().optional().nullable(),
    backgroundImage: z.string().optional(),
    ogImage: z.string().optional(),
    useOgImage: z.boolean().default(false),
    prizes: z.string().optional(),
    rules: z.string().optional(),
    scoring: z.string().optional(),
    isProtected: z.boolean().default(true),
    targetEmails: z.array(z.string()).default([]),
    problems: z.array(z.any()), // Full problem data objects
    contestPassword: z.string().optional(),
    randomizeQuestions: z.boolean().default(false),
    isIPRestricted: z.boolean().default(false),
    allowedIPs: z.array(z.string()).default([]),
});

export async function checkContestSlug(slug: string) {
    try {
        const contest = await prisma.contest.findUnique({
            where: { slug }
        });
        return { success: true, isAvailable: !contest };
    } catch (error) {
        return { success: false, error: "Failed to check slug" };
    }
}

/**
 * Fetches contests visible to the current user.
 */
/**
 * Cached fetch for public contests
 */
async function getPublicContests() {
    "use cache"
    cacheTag("contests-public");
    // @ts-ignore
    cacheLife("contests");

    return prisma.contest.findMany({
        where: {
            visibility: "PUBLIC",
            hidden: false,
        },
        include: {
            _count: { select: { problems: true } }
        },
        orderBy: { startTime: "desc" },
    });
}

/**
 * Fetches contests visible to the current user.
 */
export async function getVisibleContests() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    try {
        if (!session?.user) {
            const contests = await getPublicContests();
            return { success: true, contests };
        }

        const currentUser = session.user as any;

        if (currentUser.role === "ADMIN") {
            const contests = await prisma.contest.findMany({
                include: {
                    _count: { select: { problems: true } }
                },
                orderBy: { startTime: "desc" },
            });
            return { success: true, contests };
        }

        const contests = await prisma.contest.findMany({
            where: {
                OR: [
                    { visibility: "PUBLIC" },
                    {
                        AND: [
                            { visibility: "INSTITUTION" },
                            { institutionId: currentUser.institutionId },
                        ],
                    },
                    {
                        AND: [
                            { visibility: "CLASSROOM" },
                            {
                                OR: [
                                    { classroom: { students: { some: { id: currentUser.id } } } },
                                    { creatorId: currentUser.id },
                                ],
                            },
                        ],
                    },
                    { creatorId: currentUser.id },
                ],
            },
            include: {
                _count: { select: { problems: true } }
            },
            orderBy: { startTime: "desc" },
        });

        return { success: true, contests };
    } catch (error) {
        console.error("Failed to fetch contests:", error);
        return { success: false, error: "Failed to fetch contests" };
    }
}


/**
 * Fetches a single contest's details with authorization.
 */
/**
 * Fetches a single contest's details with authorization.
 */
/**
 * Cached contest detail fetcher
 * Returns contest data without user-specific context
 */
async function getContestData(contestId: string) {
    // Removed cache directives to ensure live data for IP checks
    return prisma.contest.findUnique({
        where: { id: contestId },
        include: {
            _count: {
                select: { problems: true },
            },
            problems: {
                include: {
                    problem: {
                        select: {
                            id: true,
                            title: true,
                            difficulty: true,
                            slug: true,
                        },
                    },
                },
                orderBy: { order: "asc" },
            },
        },
    });
}

/**
 * Fetches a single contest's details with authorization.
 */
export async function getContestDetail(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    try {
        const contest = await getContestData(contestId);

        if (!contest) {
            return { success: false, error: "Contest not found" };
        }

        const currentUser = session?.user as any;
        const participation = currentUser ? await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: currentUser.id,
                    contestId: contestId
                }
            }
        }) : null;

        const now = new Date();
        const hasStarted = now >= contest.startTime;
        const isCreator = currentUser?.id === contest.creatorId;
        const isAdmin = currentUser?.role === "ADMIN";

        // Visibility Check
        let isAuthorized = false;
        if (contest.visibility === "PUBLIC") {
            isAuthorized = true;
        } else if (isAdmin) {
            isAuthorized = true;
        } else if (currentUser) {
            if (isCreator) {
                isAuthorized = true;
            } else if (contest.visibility === "INSTITUTION") {
                // Use == for null/undefined loose equality check
                isAuthorized = currentUser.institutionId == contest.institutionId;
            } else if (contest.visibility === "CLASSROOM") {
                const enrollment = await prisma.classroom.findFirst({
                    where: {
                        id: contest.classroomId as string,
                        students: { some: { id: currentUser.id } },
                    },
                });
                isAuthorized = !!enrollment;
            }
        }

        if (!isAuthorized) {
            return { success: false, error: "Unauthorized access to this contest." };
        }

        // We no longer block users based on IP, we just record it.

        const canSeeProblems = (hasStarted || isAdmin || isCreator) && (participation?.acceptedRules || isCreator || isAdmin);

        // Fix: If the contest is over, allowed roles should check participation properly,
        // but typically allows viewing if public/authorized.
        // But for "Live" contests, the current logic is correct.

        const requiresPassword = !!contest.contestPassword;

        // Shuffle problems if randomizeQuestions is enabled
        // Use a simple seeded shuffle based on userId + contestId for consistency
        let visibleProblems = canSeeProblems ? contest.problems : [];

        if (contest.randomizeQuestions && currentUser && visibleProblems.length > 0 && !isAdmin && !isCreator) {
            // Simple string hash function for seeding
            const seedStr = `${currentUser.id}-${contestId}`;
            let seed = 0;
            for (let i = 0; i < seedStr.length; i++) {
                seed = ((seed << 5) - seed) + seedStr.charCodeAt(i);
                seed |= 0;
            }

            // Deterministic shuffle
            visibleProblems = [...visibleProblems].sort((a, b) => {
                const x = Math.sin(seed++) * 10000;
                return (x - Math.floor(x)) - 0.5;
            });
        }

        // Fetch user's solved problems for this contest
        const solvedProblemIds = new Set<string>();
        if (currentUser) {
            const solvedSubmissions = await prisma.submission.findMany({
                where: {
                    userId: currentUser.id,
                    contestId: contestId,
                    status: "ACCEPTED",
                    problemId: {
                        in: visibleProblems.map(p => p.problem.id)
                    }
                },
                select: { problemId: true }
            });
            solvedSubmissions.forEach(s => solvedProblemIds.add(s.problemId));
        }

        return {
            success: true,
            contest: {
                ...contest,
                problems: visibleProblems.map(vp => ({
                    ...vp,
                    isSolved: solvedProblemIds.has(vp.problem.id)
                })),
                hasStarted,
                hasEnded: now > contest.endTime,
                canManage: isAdmin || isCreator,
                hasAcceptedRules: participation?.acceptedRules || false,
                isFinished: participation?.isFinished || false,
                requiresPassword,
                contestPassword: null, // Never return plain password
                sessionId: participation?.sessionId // Return sessionId for protection
            }
        };
    } catch (error) {
        console.error("Failed to fetch contest detail:", error);
        return { success: false, error: "Failed to fetch contest" };
    }
}

// ... existing code ...

// ... existing code ...

// ... existing code ...

export async function createContest(data: z.infer<typeof contestSchema>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    if (!["ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER", "TEACHER"].includes(currentUser.role)) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const validatedData = contestSchema.parse(data);

        // Generate a more robust unique slug
        const baseSlug = validatedData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        const uniqueSlug = `${baseSlug}-${Date.now()}`;

        const contest = await prisma.contest.create({
            data: {
                title: validatedData.title,
                slug: uniqueSlug,
                description: validatedData.description,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
                visibility: validatedData.visibility as any,
                institutionId: validatedData.visibility !== "PUBLIC" ? (validatedData.institutionId || null) : null,
                classroomId: validatedData.visibility === "CLASSROOM" ? (validatedData.classroomId || null) : null,
                creatorId: currentUser.id,
                contestPassword: validatedData.contestPassword || null,
                randomizeQuestions: validatedData.randomizeQuestions || false,
                problems: {
                    create: validatedData.problems.map((problemId, index) => ({
                        problemId,
                        order: index,
                    })),
                },
                isIPRestricted: validatedData.isIPRestricted,
                allowedIPs: validatedData.allowedIPs,
            },
        });

        revalidatePath("/dashboard/contests");
        revalidatePath("/contest");
        revalidateTag("contests", "max");
        return { success: true, contestId: contest.id };
    } catch (error: any) {
        console.error("Failed to create contest:", error);
        // Return clearer error messages
        let errorMessage = "Failed to create contest";
        if (error instanceof z.ZodError) {
             errorMessage = (error as any).errors.map((e: any) => e.message).join(", ");
        } else if (error instanceof Error) {
             errorMessage = error.message;
        }
        return { success: false, error: errorMessage };
    }
    }


export async function createContestWithProblems(data: z.infer<typeof contestWithProblemsSchema>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const currentUser = session.user as any;

    if (!["ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER", "TEACHER"].includes(currentUser.role)) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const validatedData = contestWithProblemsSchema.parse(data);

        const contest = await prisma.$transaction(async (tx) => {
            const contest = await tx.contest.create({
                data: {
                    title: validatedData.title,
                    slug: validatedData.slug,
                    description: validatedData.description,
                    startTime: validatedData.startTime,
                    endTime: validatedData.endTime,
                    visibility: validatedData.visibility as any,
                    hidden: validatedData.hidden,
                    backgroundImage: validatedData.backgroundImage,
                    ogImage: validatedData.ogImage,
                    useOgImage: validatedData.useOgImage,
                    prizes: validatedData.prizes,
                    rules: validatedData.rules,
                    scoring: validatedData.scoring,
                    isProtected: validatedData.isProtected,
                    targetEmails: validatedData.targetEmails,
                    institutionId: validatedData.visibility !== "PUBLIC" ? (validatedData.institutionId || null) : null,
                    classroomId: validatedData.visibility === "CLASSROOM" ? (validatedData.classroomId || null) : null,
                    creatorId: currentUser.id,
                    contestPassword: validatedData.contestPassword || null,
                    randomizeQuestions: validatedData.randomizeQuestions || false,
                    isIPRestricted: validatedData.isIPRestricted,
                    allowedIPs: validatedData.allowedIPs,
                }
            });

            for (let i = 0; i < validatedData.problems.length; i++) {
                const p = validatedData.problems[i];
                // Generate unique slug by appending contest slug and index
                const uniqueSlug = `${validatedData.slug}-${p.slug || p.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
                const problem = await tx.problem.create({
                    data: {
                        title: p.title,
                        description: p.description,
                        difficulty: p.difficulty,
                        slug: uniqueSlug,
                        score: p.score || 10,
                        domain: p.domain,
                        type: "CONTEST", // Contest problems are marked separately
                        hidden: true, // Contest problems are hidden from main bank
                        testCases: {
                            create: p.testCases,
                        },
                        tags: {
                            connect: p.tags?.map((t: string) => ({ name: t })) || [],
                        }
                    }
                });

                await tx.contestProblem.create({
                    data: {
                        contestId: contest.id,
                        problemId: problem.id,
                        order: i,
                    }
                });
            }

            return contest;
        });

        revalidatePath("/dashboard/contests");
        revalidatePath("/contests");
        revalidatePath("/contest");
        revalidateTag("contests", "max");
        return { success: true, contestId: contest.id };
    } catch (error) {
        console.error("Failed to create contest with problems:", error);
        return { success: false, error: "Failed to create contest" };
    }
}

export async function getContestForEdit(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            include: {
                problems: {
                    include: {
                        problem: {
                            include: {
                                testCases: true,
                                tags: true
                            }
                        }
                    },
                    orderBy: { order: "asc" }
                }
            }
        });

        if (!contest) return { success: false, error: "Contest not found" };

        const currentUser = session.user as any;
        if (currentUser.role !== "ADMIN" && contest.creatorId !== currentUser.id) {
            return { success: false, error: "Unauthorized" };
        }

        return { success: true, contest };
    } catch (error) {
        console.error("Failed to fetch contest for edit:", error);
        return { success: false, error: "Failed to fetch contest" };
    }
}

export async function updateContestWithProblems(contestId: string, data: z.infer<typeof contestWithProblemsSchema>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const currentUser = session.user as any;

    try {
        const existingContest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: { creatorId: true }
        });

        if (!existingContest) return { success: false, error: "Contest not found" };

        if (currentUser.role !== "ADMIN" && existingContest.creatorId !== currentUser.id) {
            return { success: false, error: "Unauthorized" };
        }

        const validatedData = contestWithProblemsSchema.parse(data);

        await prisma.$transaction(async (tx) => {
            // Update contest basic info
            await tx.contest.update({
                where: { id: contestId },
                data: {
                    title: validatedData.title,
                    slug: validatedData.slug,
                    description: validatedData.description,
                    startTime: validatedData.startTime,
                    endTime: validatedData.endTime,
                    visibility: validatedData.visibility as any,
                    hidden: validatedData.hidden,
                    backgroundImage: validatedData.backgroundImage,
                    ogImage: validatedData.ogImage,
                    useOgImage: validatedData.useOgImage,
                    prizes: validatedData.prizes,
                    rules: validatedData.rules,
                    scoring: validatedData.scoring,
                    isProtected: validatedData.isProtected,
                    targetEmails: validatedData.targetEmails,
                    institutionId: validatedData.visibility !== "PUBLIC" ? (validatedData.institutionId || null) : null,
                    classroomId: validatedData.visibility === "CLASSROOM" ? (validatedData.classroomId || null) : null,
                    contestPassword: validatedData.contestPassword || null,
                    randomizeQuestions: validatedData.randomizeQuestions || false,
                    isIPRestricted: validatedData.isIPRestricted,
                    allowedIPs: validatedData.allowedIPs,
                }
            });

            // For simplicity in this implementation, we'll delete old contest problems and create new ones
            // Note: In production, you might want to identify which ones to update/delete/create

            // Delete existing contest problems
            await tx.contestProblem.deleteMany({
                where: { contestId }
            });

            // Create new problems/links
            for (let i = 0; i < validatedData.problems.length; i++) {
                const p = validatedData.problems[i];
                let problemId = p.id;

                // If it's a new problem (id is temporary or missing), create it
                if (!p.id || p.id.startsWith("temp-")) {
                    const uniqueSlug = `${validatedData.slug}-${p.slug || p.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${i}`;
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
                                create: p.testCases.map((tc: any) => ({
                                    input: tc.input,
                                    output: tc.output,
                                    hidden: tc.hidden,
                                })),
                            },
                        }
                    });
                    problemId = newProblem.id;
                } else {
                    // Update existing problem if it belongs to this contest
                    // Note: This logic assumes contest problems are "owned" by the contest if they are type=CONTEST
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
                                    create: p.testCases.map((tc: any) => ({
                                        input: tc.input,
                                        output: tc.output,
                                        hidden: tc.hidden,
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
        });

        revalidatePath("/dashboard/contests");
        revalidatePath(`/contests/${validatedData.slug}`);
        revalidatePath(`/contest/${contestId}`);
        revalidateTag(`contest-${contestId}`, "max");
        return { success: true, contestId };
    } catch (error) {
        console.error("Failed to update contest:", error);
        return { success: false, error: "Failed to update contest" };
    }
}

export async function getInstitutionalClassrooms(institutionId: string) {
    try {
        const classrooms = await prisma.classroom.findMany({
            where: { institutionId },
            select: { id: true, name: true, section: true },
        });
        return { success: true, classrooms };
    } catch (error) {
        console.error("Failed to fetch classrooms:", error);
        return { success: false, error: "Failed to fetch classrooms" };
    }
}

export async function finishContestAction(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        await prisma.contestParticipation.upsert({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            update: {
                isFinished: true,
                finishedAt: new Date()
            },
            create: {
                userId: session.user.id,
                contestId: contestId,
                acceptedRules: true,
                isFinished: true,
                finishedAt: new Date()
            }
        });
        revalidatePath(`/contest/${contestId}`);
        revalidatePath(`/problems`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to finish contest" };
    }
}

/**
 * Finalize Contest & Award Badges
 * - Calculates leaderboard
 * - Awards Gold, Silver, Bronze to Top 3
 * - Marks contest as finalized
 */
export async function finalizeContest(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    // Only admins or contest managers can finalize
    const currentUser = session.user as any;
    if (!["ADMIN", "CONTEST_MANAGER", "INSTITUTION_MANAGER", "TEACHER"].includes(currentUser.role)) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const contest = await prisma.contest.findUnique({
             where: { id: contestId },
             select: { isFinalized: true, title: true }
        });

        if (!contest) return { success: false, error: "Contest not found" };
        if (contest.isFinalized) return { success: false, error: "Contest is already finalized" };

        // Reuse leaderboard logic to get rankings
        const leaderboard = await getContestLeaderboard(contestId) as any;
        if (!leaderboard || !leaderboard.success || !leaderboard.students) {
            return { success: false, error: "Failed to fetch leaderboard" };
        }

        const students = leaderboard.students as any[];

        // At least 1 student needed
        if (students.length === 0) {
             await prisma.contest.update({
                 where: { id: contestId },
                 data: { isFinalized: true }
             });
             return { success: true, message: "Contest finalized (no participants)" };
        }

        // Top 3 IDs
        const goldUserId = students[0]?.id;
        const silverUserId = students[1]?.id;
        const bronzeUserId = students[2]?.id;

        await prisma.$transaction(async (tx) => {
            // Award Gold
            if (goldUserId) {
                await tx.user.update({
                    where: { id: goldUserId },
                    data: { goldBadges: { increment: 1 } }
                });
            }
            // Award Silver
            if (silverUserId) {
                await tx.user.update({
                    where: { id: silverUserId },
                    data: { silverBadges: { increment: 1 } }
                });
            }
            // Award Bronze
            if (bronzeUserId) {
                await tx.user.update({
                    where: { id: bronzeUserId },
                    data: { bronzeBadges: { increment: 1 } }
                });
            }

            // Mark Finalized
            await tx.contest.update({
                where: { id: contestId },
                data: { isFinalized: true }
            });
        });

        revalidatePath(`/dashboard`);
        revalidatePath(`/profile/${goldUserId}`);
        if(silverUserId) revalidatePath(`/profile/${silverUserId}`);
        if(bronzeUserId) revalidatePath(`/profile/${bronzeUserId}`);
        revalidatePath(`/contest/${contestId}`);
        revalidateTag(`contest-${contestId}`, "max");
        revalidateTag(`leaderboard-${contestId}`, "max");

        return { success: true };
    } catch (error) {
        console.error("Failed to finalize contest:", error);
        return { success: false, error: "Failed to finalize contest" };
    }
}

/**
 * Verify contest password without starting session.
 */
export async function verifyContestPassword(contestId: string, password?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: {
                contestPassword: true,
                isIPRestricted: true,
                allowedIPs: true,
                creatorId: true
            }
        });

        if (!contest) return { success: false, error: "Contest not found" };

        const currentUser = session.user as any;
        const isAdmin = currentUser.role === "ADMIN";
        const isCreator = contest.creatorId === currentUser.id;

        // IP Restriction was removed to allow users but track IP instead.

        if (contest.contestPassword && contest.contestPassword !== password) {
            return { success: false, error: "Invalid contest password" };
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to verify contest password:", error);
        return { success: false, error: "Failed to verify password" };
    }
}


/**
 * Start a contest session - validates time bounds and creates session ID
 */
export async function startContestSession(contestId: string, password?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: {
                startTime: true,
                endTime: true,
                contestPassword: true,
                isIPRestricted: true,
                allowedIPs: true,
                creatorId: true
            }
        });

        if (!contest) return { success: false, error: "Contest not found" };

        const currentUser = session.user as any;
        const isAdmin = currentUser.role === "ADMIN";
        const isCreator = contest.creatorId === currentUser.id;

        const clientIP = await getClientIP();

        // The IP recording happens below in upsert contestParticipation

        if (contest.contestPassword && contest.contestPassword !== password) {
            return { success: false, error: "Invalid contest password" };
        }

        const now = new Date();

        // Time bounds check
        if (now < contest.startTime) {
            return { success: false, error: "Contest has not started yet" };
        }
        if (now > contest.endTime) {
            return { success: false, error: "Contest has already ended" };
        }

        // Generate unique session ID
        const sessionId = `${session.user.id}-${contestId}-${Date.now()}`;

        // Check for existing active session (multi-tab detection)
        const existingParticipation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            }
        });

        if (existingParticipation?.isBlocked) {
            return { success: false, error: "You have been blocked from this contest due to violations" };
        }

        if (existingParticipation?.isFinished) {
            return { success: false, error: "You have already finished this contest" };
        }

        // Update or create participation with new session and record the IP
        const participation = await prisma.contestParticipation.upsert({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            update: {
                sessionId,
                sessionStartedAt: now,
                acceptedRules: true,
                ipAddress: clientIP
            },
            create: {
                userId: session.user.id,
                contestId: contestId,
                sessionId,
                sessionStartedAt: now,
                acceptedRules: true,
                ipAddress: clientIP
            }
        });

        return {
            success: true,
            sessionId,
            participationId: participation.id,
            totalViolations: participation.totalViolations,
            isFlagged: participation.isFlagged
        };
    } catch (error) {
        console.error("Failed to start contest session:", error);
        return { success: false, error: "Failed to start contest session" };
    }
}

/**
 * Log a contest violation - records to database and updates counters
 */
export async function logContestViolation(
    contestId: string,
    type: "TAB_SWITCH" | "FULLSCREEN_EXIT" | "COPY_PASTE" | "DEVTOOLS_OPEN" | "KEYBOARD_SHORTCUT" | "NAVIGATION_ATTEMPT" | "MULTI_TAB" | "SUSPICIOUS_INPUT",
    message?: string,
    metadata?: Record<string, any>
) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const participation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            }
        });

        if (!participation) {
            return { success: false, error: "No active participation found" };
        }

        // Determine which counter to increment
        const counterField = {
            TAB_SWITCH: "tabSwitchCount",
            FULLSCREEN_EXIT: "fullscreenExitCount",
            COPY_PASTE: "copyPasteCount",
            DEVTOOLS_OPEN: "devToolsCount",
            KEYBOARD_SHORTCUT: "keyboardCount",
            NAVIGATION_ATTEMPT: "navigationCount",
            MULTI_TAB: "tabSwitchCount",
            SUSPICIOUS_INPUT: "copyPasteCount"
        }[type] as string;

        // Use transaction to ensure atomic update
        const result = await prisma.$transaction(async (tx) => {
            // Check last violation time to prevent rapid-fire duplicates (Server-side debounce)
            const lastViolation = await tx.contestViolation.findFirst({
                where: { participationId: participation.id },
                orderBy: { createdAt: 'desc' }
            });

            if (lastViolation) {
                const timeDiff = Date.now() - lastViolation.createdAt.getTime();
                // If less than 2 seconds since last violation, ignore this one
                if (timeDiff < 2000) {
                    return {
                        ...participation, // Return existing state
                        isFlagged: participation.isFlagged,
                        isBlocked: participation.isBlocked,
                        totalViolations: participation.totalViolations,
                        permanentlyBlocked: participation.permanentlyBlocked,
                        tempBlockedUntil: participation.tempBlockedUntil
                    };
                }
            }

            // Create violation record
            await tx.contestViolation.create({
                data: {
                    participationId: participation.id,
                    type: type as any,
                    message,
                    metadata: metadata ?? undefined
                }
            });

            // Calculate new total and determine blocking tier
            const newTotalViolations = participation.totalViolations + 1;
            const shouldFlag = newTotalViolations >= 3;

            // Tiered blocking logic
            let tempBlockedUntil: Date | null = null;
            let permanentlyBlocked = false;
            let isBlocked = false;

            if (newTotalViolations >= 6) {
                // 6+ violations = permanent block
                permanentlyBlocked = true;
                isBlocked = true;
            } else if (newTotalViolations >= 4) {
                // 4-5 violations = 5 minute temp block
                tempBlockedUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
                isBlocked = true;
            }

            const updated = await tx.contestParticipation.update({
                where: { id: participation.id },
                data: {
                    [counterField]: { increment: 1 },
                    totalViolations: { increment: 1 },
                    isFlagged: shouldFlag || participation.isFlagged,
                    isBlocked,
                    tempBlockedUntil,
                    permanentlyBlocked
                }
            });

            return updated;
        });

        return {
            success: true,
            totalViolations: result.totalViolations,
            isFlagged: result.isFlagged,
            isBlocked: result.isBlocked,
            tempBlockedUntil: result.tempBlockedUntil?.toISOString() || null,
            permanentlyBlocked: result.permanentlyBlocked
        };
    } catch (error) {
        console.error("Failed to log violation:", error);
        return { success: false, error: "Failed to log violation" };
    }
}

/**
 * Get participation status - for UI state
 */
export async function getParticipationStatus(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const participation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            select: {
                acceptedRules: true,
                isFinished: true,
                isFlagged: true,
                isBlocked: true,
                totalViolations: true,
                sessionId: true,
                tempBlockedUntil: true,
                permanentlyBlocked: true
            }
        });

        // Check if temp block has expired
        if (participation?.tempBlockedUntil && new Date() > participation.tempBlockedUntil) {
            // Temp block expired - unblock
            await prisma.contestParticipation.update({
                where: {
                    userId_contestId: {
                        userId: session.user.id,
                        contestId: contestId
                    }
                },
                data: {
                    isBlocked: false,
                    tempBlockedUntil: null
                }
            });

            return {
                success: true,
                participation: {
                    ...participation,
                    isBlocked: false,
                    tempBlockedUntil: null
                }
            };
        }

        return {
            success: true,
            participation: participation || null
        };
    } catch (error) {
        return { success: false, error: "Failed to get participation status" };
    }
}

// ============================================
// CONTEST MANAGER - PARTICIPANT MANAGEMENT
// ============================================

/**
 * Get all participants for a contest with violation details (for managers)
 */
export async function getContestParticipants(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const currentUser = session.user as any;

    // Check if user is contest manager/creator
    const contest = await prisma.contest.findUnique({
        where: { id: contestId },
        select: { creatorId: true }
    });

    if (!contest) return { success: false, error: "Contest not found" };

    const isAuthorized =
        currentUser.role === "ADMIN" ||
        currentUser.role === "CONTEST_MANAGER" ||
        currentUser.role === "TEACHER" ||
        contest.creatorId === currentUser.id;

    if (!isAuthorized) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const participants = await prisma.contestParticipation.findMany({
            where: { contestId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                violations: {
                    orderBy: { createdAt: "desc" },
                    take: 10
                }
            },
            orderBy: [
                { permanentlyBlocked: "desc" },
                { isBlocked: "desc" },
                { totalViolations: "desc" }
            ]
        });

        return { success: true, participants };
    } catch (error) {
        console.error("Failed to get participants:", error);
        return { success: false, error: "Failed to get participants" };
    }
}

/**
 * Unblock a participant (manager only)
 */
export async function unblockParticipant(contestId: string, userId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const currentUser = session.user as any;

    // Check authorization
    const contest = await prisma.contest.findUnique({
        where: { id: contestId },
        select: { creatorId: true }
    });

    if (!contest) return { success: false, error: "Contest not found" };

    const isAuthorized =
        currentUser.role === "ADMIN" ||
        currentUser.role === "CONTEST_MANAGER" ||
        currentUser.role === "TEACHER" ||
        contest.creatorId === currentUser.id;

    if (!isAuthorized) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.contestParticipation.update({
            where: {
                userId_contestId: {
                    userId,
                    contestId
                }
            },
            data: {
                isBlocked: false,
                tempBlockedUntil: null,
                permanentlyBlocked: false,
                totalViolations: 0,
                tabSwitchCount: 0,
                fullscreenExitCount: 0,
                copyPasteCount: 0,
                devToolsCount: 0,
                keyboardCount: 0,
                navigationCount: 0,
                isFlagged: false,
                unblockedBy: currentUser.id,
                unblockedAt: new Date()
            }
        });

        revalidatePath(`/dashboard/contests/${contestId}/participants`);
        return { success: true };
    } catch (error) {
        console.error("Failed to unblock participant:", error);
        return { success: false, error: "Failed to unblock participant" };
    }
}

/**
 * Get detailed violations for a participant
 */
export async function getParticipantViolations(contestId: string, userId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const currentUser = session.user as any;

    // Check authorization
    const contest = await prisma.contest.findUnique({
        where: { id: contestId },
        select: { creatorId: true }
    });

    if (!contest) return { success: false, error: "Contest not found" };

    const isAuthorized =
        currentUser.role === "ADMIN" ||
        currentUser.role === "CONTEST_MANAGER" ||
        currentUser.role === "TEACHER" ||
        contest.creatorId === currentUser.id;

    if (!isAuthorized) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const participation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId,
                    contestId
                }
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                },
                violations: {
                    orderBy: { createdAt: "desc" }
                }
            }
        });

        return { success: true, participation };
    } catch (error) {
        return { success: false, error: "Failed to get violations" };
    }
}

/**
 * Calculate contest leaderboard
 * - Fetches all participations
 * - Fetches all relevant submissions
 * - Calculates scores
 */
export async function getContestLeaderboard(contestId: string) {
    // Dynamic content - removed specialized cache to ensure IP checks are always live
    cacheTag(`leaderboard-${contestId}`)
    // @ts-ignore
    cacheLife("leaderboard")
    try {
        const result = await ContestService.getLeaderboard(contestId);

        if (!result) {
            return { success: false, error: "Contest not found" };
        }

        return {
            success: true,
            ...result
        };
    } catch (error) {
        console.error("Leaderboard error:", error);
        return { success: false, error: "Failed to generate leaderboard" };
    }
}
