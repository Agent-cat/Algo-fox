"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const contestSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    startTime: z.date(),
    endTime: z.date(),
    visibility: z.enum(["PUBLIC", "INSTITUTION", "CLASSROOM"]),
    classroomId: z.string().optional(),
    institutionId: z.string().optional().nullable(),
    problems: z.array(z.string()).min(1, "Select at least one problem"),
});

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
    prizes: z.string().optional(),
    rules: z.string().optional(),
    problems: z.array(z.any()), // Full problem data objects
});

/**
 * Fetches contests visible to the current user.
 */
export async function getVisibleContests() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    try {
        if (!session?.user) {
            const contests = await prisma.contest.findMany({
                where: {
                    visibility: "PUBLIC",
                    hidden: false,
                },
                include: {
                    _count: { select: { problems: true } }
                },
                orderBy: { startTime: "desc" },
            });
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
export async function getContestDetail(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    try {
        const contest = await prisma.contest.findUnique({
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

        const canSeeProblems = hasStarted || isAdmin || isCreator;

        return {
            success: true,
            contest: {
                ...contest,
                problems: canSeeProblems ? contest.problems : [],
                hasStarted,
                hasEnded: now > contest.endTime,
                canManage: isAdmin || isCreator,
                hasAcceptedRules: participation?.acceptedRules || false,
                isFinished: participation?.isFinished || false,
            }
        };
    } catch (error) {
        console.error("Failed to fetch contest detail:", error);
        return { success: false, error: "Failed to fetch contest" };
    }
}

/**
 * Fetches the leaderboard for a specific contest.
 */
export async function getContestLeaderboard(contestId: string) {
    try {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: { endTime: true, isFinalized: true }
        });

        if (!contest) {
            return { success: false, error: "Contest not found" };
        }

        // 1. Fetch all participants
        const participants = await prisma.contestParticipation.findMany({
            where: { contestId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        role: true,
                    }
                }
            }
        });

        // 2. Initialize scores for everyone
        const userScores: Record<string, any> = {};
        participants.forEach(p => {
             userScores[p.userId] = {
                id: p.userId,
                name: p.user.name,
                image: p.user.image,
                totalScore: 0,
                solvedCount: 0,
                role: p.user.role // useful for debugging or filtering in UI if needed
            };
        });

        // 3. Fetch submissions (Accepted only, within time limit)
        // We remove the user role filter to ensure staff/test users also show up if participating
        const submissions = await prisma.submission.findMany({
            where: {
                contestId,
                status: "ACCEPTED",
                mode: "SUBMIT",
                createdAt: {
                    lte: contest.endTime
                }
            },
            include: {
                problem: {
                    select: {
                        score: true
                    }
                }
            }
        });

        // 4. Update scores
        submissions.forEach(sub => {
            // Only update if the user is a participant (should be always true if data integrity holds)
            if (userScores[sub.userId]) {
                // Determine if this is a unique solve for the user (simple count check or set)
                // The current logic simply adds score. If a user submits matched problem multiple times,
                // typically we should only count unique problems.
                // However, the previous logic was: totalScore += sub.problem.score.
                // Let's improve it to be unique problems only to be accurate.

                if (!userScores[sub.userId].solvedProblems) {
                    userScores[sub.userId].solvedProblems = new Set();
                }

                const problemSet = userScores[sub.userId].solvedProblems as Set<string>;
                if (!problemSet.has(sub.problemId)) {
                    problemSet.add(sub.problemId);
                    userScores[sub.userId].totalScore += sub.problem.score;
                    userScores[sub.userId].solvedCount += 1;
                }
            }
        });

        // 5. Convert to array and sort
        const students = Object.values(userScores).sort((a: any, b: any) => {
            if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
            return b.solvedCount - a.solvedCount;
        });

        return { success: true, students, isFinalized: contest.isFinalized };
    } catch (error) {
        console.error("Failed to fetch contest leaderboard:", error);
        return { success: false, error: "Failed to fetch leaderboard" };
    }
}

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

        const contest = await prisma.contest.create({
            data: {
                title: validatedData.title,
                slug: validatedData.title.toLowerCase().replace(/ /g, "-"),
                description: validatedData.description,
                startTime: validatedData.startTime,
                endTime: validatedData.endTime,
                visibility: validatedData.visibility as any,
                institutionId: validatedData.visibility !== "PUBLIC" ? (validatedData.institutionId || null) : null,
                classroomId: validatedData.visibility === "CLASSROOM" ? (validatedData.classroomId || null) : null,
                creatorId: currentUser.id,
                problems: {
                    create: validatedData.problems.map((problemId, index) => ({
                        problemId,
                        order: index,
                    })),
                },
            },
        });

        revalidatePath("/dashboard/contests");
        revalidatePath("/contest");
        return { success: true, contestId: contest.id };
    } catch (error) {
        console.error("Failed to create contest:", error);
        return { success: false, error: "Failed to create contest" };
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
                    prizes: validatedData.prizes,
                    rules: validatedData.rules,
                    institutionId: validatedData.visibility !== "PUBLIC" ? (validatedData.institutionId || null) : null,
                    classroomId: validatedData.visibility === "CLASSROOM" ? (validatedData.classroomId || null) : null,
                    creatorId: currentUser.id,
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
        return { success: true, contestId: contest.id };
    } catch (error) {
        console.error("Failed to create contest with problems:", error);
        return { success: false, error: "Failed to create contest" };
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

export async function getSelectableProblems(search: string) {
    try {
        const problems = await prisma.problem.findMany({
            where: {
                OR: [
                    { title: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } },
                ],
                hidden: false,
            },
            select: { id: true, title: true, difficulty: true, slug: true },
            take: 10,
        });
        return { success: true, problems };
    } catch (error) {
        console.error("Failed to fetch problems:", error);
        return { success: false, error: "Failed to fetch problems" };
    }
}

export async function acceptContestRules(contestId: string) {
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
            update: { acceptedRules: true },
            create: {
                userId: session.user.id,
                contestId: contestId,
                acceptedRules: true
            }
        });
        revalidatePath(`/contest/${contestId}`);
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to accept rules" };
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
        const leaderboard = await getContestLeaderboard(contestId);
        if (!leaderboard.success || !leaderboard.students) {
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

        return { success: true };
    } catch (error) {
        console.error("Failed to finalize contest:", error);
        return { success: false, error: "Failed to finalize contest" };
    }
}

// ============================================
// CONTEST SECURITY - SESSION & VIOLATION MANAGEMENT
// ============================================

/**
 * Start a contest session - validates time bounds and creates session ID
 */
export async function startContestSession(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };

    try {
        const contest = await prisma.contest.findUnique({
            where: { id: contestId },
            select: { startTime: true, endTime: true }
        });

        if (!contest) return { success: false, error: "Contest not found" };

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

        // Update or create participation with new session
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
                acceptedRules: true
            },
            create: {
                userId: session.user.id,
                contestId: contestId,
                sessionId,
                sessionStartedAt: now,
                acceptedRules: true
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
 * Validate contest session - checks if session is valid for submissions
 */
export async function validateContestSession(contestId: string, sessionId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { success: false, valid: false, error: "Unauthorized" };

    try {
        const participation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            include: {
                contest: {
                    select: { startTime: true, endTime: true }
                }
            }
        });

        if (!participation) {
            return { success: true, valid: false, reason: "No participation found" };
        }

        // Check if blocked
        if (participation.isBlocked) {
            return { success: true, valid: false, reason: "Blocked due to violations" };
        }

        // Check if finished
        if (participation.isFinished) {
            return { success: true, valid: false, reason: "Contest already finished" };
        }

        // Check session ID (multi-tab detection)
        if (participation.sessionId !== sessionId) {
            // Log multi-tab violation
            await logContestViolation(contestId, "MULTI_TAB", "Multiple tabs detected");
            return { success: true, valid: false, reason: "Session mismatch - possible multiple tabs" };
        }

        // Check time bounds
        const now = new Date();
        if (now > participation.contest.endTime) {
            return { success: true, valid: false, reason: "Contest has ended" };
        }

        return {
            success: true,
            valid: true,
            totalViolations: participation.totalViolations,
            isFlagged: participation.isFlagged
        };
    } catch (error) {
        console.error("Failed to validate session:", error);
        return { success: false, valid: false, error: "Failed to validate session" };
    }
}

/**
 * Check if user is eligible to submit - pre-submission validation
 */
export async function checkSubmissionEligibility(contestId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) return { eligible: false, error: "Unauthorized" };

    try {
        const participation = await prisma.contestParticipation.findUnique({
            where: {
                userId_contestId: {
                    userId: session.user.id,
                    contestId: contestId
                }
            },
            include: {
                contest: {
                    select: { startTime: true, endTime: true }
                }
            }
        });

        if (!participation) {
            return { eligible: false, reason: "No participation found" };
        }

        // Check various conditions
        if (participation.isBlocked) {
            return { eligible: false, reason: "Blocked due to excessive violations" };
        }

        if (participation.isFinished) {
            return { eligible: false, reason: "You have already finished this contest" };
        }

        const now = new Date();
        if (now < participation.contest.startTime) {
            return { eligible: false, reason: "Contest has not started" };
        }

        if (now > participation.contest.endTime) {
            return { eligible: false, reason: "Contest has ended" };
        }

        return {
            eligible: true,
            warnings: participation.isFlagged ? ["Your session has been flagged for review"] : []
        };
    } catch (error) {
        console.error("Failed to check eligibility:", error);
        return { eligible: false, error: "Failed to check eligibility" };
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
