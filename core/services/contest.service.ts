import { prisma } from "@/lib/prisma";
import { cacheTag, cacheLife } from "next/cache";

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
    static async getLeaderboard(contestId: string) {
        // This is a heavy operation, we'll use "use cache" in the caller
        // but the core logic stays here.
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
                            problem: { select: { id: true, title: true, score: true, slug: true } }
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

        const leaderboard = participations.map(p => {
            const userSubs = submissionsByUser.get(p.userId) || [];
            const problemScores = new Map<string, number>();
            const problemSolveTimes = new Map<string, number>();
            const problemSubmissionCounts = new Map<string, number>();

            userSubs.forEach(s => {
                problemSubmissionCounts.set(s.problemId, (problemSubmissionCounts.get(s.problemId) || 0) + 1);
                if (s.status === "ACCEPTED") {
                    const prob = contest.problems.find(cp => cp.problemId === s.problemId);
                    const maxScore = prob?.problem.score || 0;
                    if (maxScore > (problemScores.get(s.problemId) || 0)) {
                        problemScores.set(s.problemId, maxScore);
                        problemSolveTimes.set(s.problemId, s.createdAt.getTime() - contest.startTime.getTime());
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
                solved: problemScores.has(cp.problemId),
                solvedAt: problemSolveTimes.get(cp.problemId),
            }));

            return {
                ...p.user,
                score: totalScore,
                timeTaken: totalTime,
                problemsSolved: problemScores.size,
                problemStats,
                ipAddress: p.ipAddress
            };
        });

        return {
            students: leaderboard.sort((a, b) => b.score - a.score || a.timeTaken - b.timeTaken),
            isFinalized: contest.isFinalized,
            problems: contest.problems.map(cp => ({
                id: cp.problemId,
                title: cp.problem.title,
                slug: cp.problem.slug,
                maxScore: cp.problem.score
            }))
        };
    }
}
