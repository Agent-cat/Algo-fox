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

export async function deleteContest(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const userRole = (session.user as any).role;
    if (!["ADMIN", "CONTEST_MANAGER"].includes(userRole)) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.contest.delete({
            where: { id }
        });

        revalidatePath("/dashboard/contests");
        revalidatePath("/contests");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete contest:", error);
        return { success: false, error: "Failed to delete contest" };
    }
}

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
// Removed getPublicContests as it is handled by ContestService.getVisibleContests

/**
 * Fetches contests visible to the current user with pagination.
 */
export async function getVisibleContests(params: { page?: number; pageSize?: number; status?: "active" | "past" } = {}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { page = 1, pageSize = 12, status } = params;

    try {
        const currentUser = session?.user as any;

        const result = await ContestService.getVisibleContests({
            userId: currentUser?.id,
            role: currentUser?.role,
            institutionId: currentUser?.institutionId,
            page,
            pageSize,
            status
        });

        return { success: true, ...result };
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

        const canSeeProblems = (hasStarted || isAdmin || isCreator) && (participation?.acceptedRules || isCreator || isAdmin);
        const requiresPassword = !!contest.contestPassword;

        let visibleProblems = canSeeProblems ? contest.problems : [];

        if (contest.randomizeQuestions && currentUser && visibleProblems.length > 0 && !isAdmin && !isCreator) {
            const seed = ContestService.hashString(`${currentUser.id}-${contestId}`);
            visibleProblems = ContestService.seededShuffle([...visibleProblems], seed) as any;
        }

        // Fetch user's solved problems for this contest
        const visibleProblemIds = visibleProblems.map(p => p.problem.id);
        const solvedProblemIds = new Set<string>();
        if (currentUser && visibleProblemIds.length > 0) {
            const solvedSubmissions = await prisma.submission.findMany({
                where: {
                    userId: currentUser.id,
                    contestId: contestId,
                    status: "ACCEPTED",
                    mode: "SUBMIT",
                    problemId: { in: visibleProblemIds }
                },
                select: { problemId: true },
                distinct: ['problemId']
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
                contestPassword: null,
                sessionId: participation?.sessionId
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

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const currentUser = session.user as any;

    if (!["ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER", "TEACHER"].includes(currentUser.role)) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const validatedData = contestWithProblemsSchema.parse(data);
        const contest = await ContestService.createContest({
            creatorId: session.user.id,
            data: validatedData
        });

        revalidatePath("/dashboard/contests");
        revalidatePath("/contests");
        revalidatePath(`/contest/${contest.id}`);
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
        await ContestService.updateContest({
            contestId,
            data: validatedData
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

export async function finalizeContest(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    const currentUser = session.user as any;
    if (!["ADMIN", "CONTEST_MANAGER", "INSTITUTION_MANAGER", "TEACHER"].includes(currentUser.role)) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await ContestService.finalize(contestId);

        revalidatePath(`/dashboard`);
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


export async function startContestSession(contestId: string, password?: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const clientIP = await getClientIP();
        const result = await ContestService.startSession({
            userId: session.user.id,
            contestId,
            password,
            clientIP: clientIP ?? undefined
        });

        return result;
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
        const result = await ContestService.logViolation({
            userId: session.user.id,
            contestId,
            type,
            message,
            metadata
        }) as any;

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
export async function getContestLeaderboard(contestId: string, params: { page?: number; pageSize?: number } = {}) {
    const { page = 1, pageSize = 50 } = params;
    // Dynamic content - removed specialized cache to ensure IP checks are always live
    cacheTag(`leaderboard-${contestId}`)
    // @ts-ignore
    cacheLife("leaderboard")
    try {
        const result = await ContestService.getLeaderboard(contestId, { page, pageSize });

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
