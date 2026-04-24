"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { getPerformanceTier, type PerformanceTier } from "@/lib/institution-analytics";

async function checkInstitutionAccess(institutionId: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;
    const user = session.user as any;
    if (user.role === "ADMIN") return user;
    if (user.role === "INSTITUTION_MANAGER" && user.institutionId === institutionId) return user;
    return null;
}

function computeWeeklyActivity(submissions: { createdAt: Date }[], weeks = 8): number[] {
    const now = Date.now();
    const result = Array(weeks).fill(0);
    for (const sub of submissions) {
        const daysAgo = (now - new Date(sub.createdAt).getTime()) / (1000 * 60 * 60 * 24);
        const weekIndex = Math.floor(daysAgo / 7);
        if (weekIndex >= 0 && weekIndex < weeks) {
            result[weeks - 1 - weekIndex]++;
        }
    }
    return result;
}

export type StudentOverviewItem = {
    id: string;
    name: string;
    email: string;
    image: string | null;
    branch: string | null;
    year: number | null;
    totalScore: number;
    problemsSolved: number;
    currentStreak: number;
    rank: number;
    tier: PerformanceTier;
    contestsAttended: number;
    activeCoursesCount: number;
    sparkline: number[];
};

export async function getStudentsOverview(institutionId: string) {
    const user = await checkInstitutionAccess(institutionId);
    if (!user) return { success: false as const, error: "Unauthorized" };

    const fetchStudents = unstable_cache(
        async () => {
            const students = await prisma.user.findMany({
                where: { institutionId, role: "STUDENT" },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                    branch: true,
                    year: true,
                    totalScore: true,
                    problemsSolved: true,
                    currentStreak: true,
                    _count: {
                        select: {
                            contestParticipations: { where: { isFinished: true } },
                            courseEnrollments: true,
                        },
                    },
                    submissions: {
                        where: {
                            mode: "SUBMIT",
                            createdAt: {
                                gte: new Date(Date.now() - 56 * 24 * 60 * 60 * 1000),
                            },
                        },
                        select: { createdAt: true },
                    },
                },
                orderBy: { totalScore: "desc" },
            });

            return students.map((student, index): StudentOverviewItem => ({
                id: student.id,
                name: student.name,
                email: student.email,
                image: student.image,
                branch: student.branch,
                year: student.year,
                totalScore: student.totalScore,
                problemsSolved: student.problemsSolved,
                currentStreak: student.currentStreak,
                rank: index + 1,
                tier: getPerformanceTier(student.totalScore, student.problemsSolved),
                contestsAttended: student._count.contestParticipations,
                activeCoursesCount: student._count.courseEnrollments,
                sparkline: computeWeeklyActivity(student.submissions),
            }));
        },
        [`institution-students-overview-${institutionId}`],
        {
            tags: [`institution-students-${institutionId}`],
            revalidate: 300,
        }
    );

    const students = await fetchStudents();
    return { success: true as const, students };
}

export type ContestPerformancePoint = {
    contestId: string;
    title: string;
    date: Date;
    score: number;
};

export type CourseEnrollmentItem = {
    courseId: string;
    title: string;
    slug: string;
    difficulty: string;
    domain: string;
    progress: number;
    enrolledAt: Date;
    completedAt: Date | null;
    status: "COMPLETED" | "IN_PROGRESS" | "AT_RISK";
};

export type StudentInsights = {
    id: string;
    name: string;
    email: string;
    image: string | null;
    branch: string | null;
    year: number | null;
    bio: string | null;
    totalScore: number;
    problemsSolved: number;
    currentStreak: number;
    longestStreak: number;
    goldBadges: number;
    silverBadges: number;
    bronzeBadges: number;
    tier: PerformanceTier;
    institutionRank: number;
    leetCodeHandle: string | null;
    leetCodeVerified: boolean;
    leetCodeSolved: number;
    leetCodeRating: number;
    leetCodeContests: number;
    codeChefHandle: string | null;
    codeChefVerified: boolean;
    codeChefSolved: number;
    codeChefRating: number;
    codeChefContests: number;
    codeforcesHandle: string | null;
    codeforcesVerified: boolean;
    codeforcesSolved: number;
    codeforcesRating: number;
    codeforcesContests: number;
    contestPerformance: ContestPerformancePoint[];
    courseEnrollments: CourseEnrollmentItem[];
    submissions: { createdAt: Date; status: string }[];
};

export async function getStudentInsights(
    studentId: string,
    institutionId: string
): Promise<{ success: false; error: string } | { success: true; student: StudentInsights }> {
    const sessionUser = await checkInstitutionAccess(institutionId);
    if (!sessionUser) return { success: false, error: "Unauthorized" };

    const [student, contestParticipations, courseEnrollments, submissions] = await Promise.all([
        prisma.user.findFirst({
            where: { id: studentId, institutionId },
            select: {
                id: true, name: true, email: true, image: true,
                branch: true, year: true, bio: true,
                totalScore: true, problemsSolved: true,
                currentStreak: true, longestStreak: true,
                goldBadges: true, silverBadges: true, bronzeBadges: true,
                leetCodeHandle: true, leetCodeVerified: true,
                leetCodeSolved: true, leetCodeRating: true, leetCodeContests: true,
                codeChefHandle: true, codeChefVerified: true,
                codeChefSolved: true, codeChefRating: true, codeChefContests: true,
                codeforcesHandle: true, codeforcesVerified: true,
                codeforcesSolved: true, codeforcesRating: true, codeforcesContests: true,
            },
        }),

        prisma.contestParticipation.findMany({
            where: { userId: studentId, isFinished: true },
            include: {
                contest: { select: { id: true, title: true, startTime: true } },
            },
            orderBy: { createdAt: "asc" },
            take: 20,
        }),

        prisma.userCourseEnrollment.findMany({
            where: { userId: studentId },
            include: {
                course: {
                    select: { title: true, slug: true, difficulty: true, domain: true },
                },
            },
            orderBy: { enrolledAt: "desc" },
        }),

        prisma.submission.findMany({
            where: {
                userId: studentId,
                mode: "SUBMIT",
                createdAt: { gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
            },
            select: { createdAt: true, status: true },
            orderBy: { createdAt: "asc" },
        }),
    ]);

    if (!student) return { success: false, error: "Student not found" };

    const contestIds = contestParticipations.map((cp) => cp.contestId);

    const [contestSubs, higherScoredCount] = await Promise.all([
        contestIds.length > 0
            ? prisma.submission.findMany({
                  where: {
                      userId: studentId,
                      contestId: { in: contestIds },
                      status: "ACCEPTED",
                      mode: "SUBMIT",
                  },
                  select: {
                      contestId: true,
                      problemId: true,
                      problem: { select: { score: true } },
                      createdAt: true,
                  },
                  orderBy: { createdAt: "asc" },
              })
            : Promise.resolve([]),

        prisma.user.count({
            where: {
                institutionId,
                role: "STUDENT",
                totalScore: { gt: student.totalScore },
            },
        }),
    ]);

    const scoresByContest: Record<string, number> = {};
    const seen = new Set<string>();
    for (const sub of contestSubs) {
        const key = `${sub.contestId}:${sub.problemId}`;
        if (!seen.has(key)) {
            seen.add(key);
            const cId = sub.contestId!;
            scoresByContest[cId] = (scoresByContest[cId] || 0) + (sub.problem?.score ?? 0);
        }
    }

    const contestPerformance: ContestPerformancePoint[] = contestParticipations.map((cp) => ({
        contestId: cp.contestId,
        title: cp.contest.title,
        date: cp.contest.startTime,
        score: scoresByContest[cp.contestId] ?? 0,
    }));

    const formattedCourses: CourseEnrollmentItem[] = courseEnrollments.map((enrollment) => {
        const daysEnrolled = Math.floor(
            (Date.now() - enrollment.enrolledAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        let status: "COMPLETED" | "IN_PROGRESS" | "AT_RISK";
        if (enrollment.completedAt) {
            status = "COMPLETED";
        } else if (enrollment.progress < 20 && daysEnrolled > 14) {
            status = "AT_RISK";
        } else {
            status = "IN_PROGRESS";
        }
        return {
            courseId: enrollment.courseId,
            title: enrollment.course.title,
            slug: enrollment.course.slug,
            difficulty: enrollment.course.difficulty,
            domain: enrollment.course.domain,
            progress: Math.round(enrollment.progress),
            enrolledAt: enrollment.enrolledAt,
            completedAt: enrollment.completedAt,
            status,
        };
    });

    return {
        success: true,
        student: {
            ...student,
            tier: getPerformanceTier(student.totalScore, student.problemsSolved),
            institutionRank: higherScoredCount + 1,
            contestPerformance,
            courseEnrollments: formattedCourses,
            submissions: submissions.map((s) => ({
                createdAt: s.createdAt,
                status: s.status,
            })),
        },
    };
}

export async function getInstitutionFilters(institutionId: string) {
    const user = await checkInstitutionAccess(institutionId);
    if (!user) return { success: false as const, error: "Unauthorized" };

    const users = await prisma.user.findMany({
        where: { institutionId, role: "STUDENT" },
        select: { branch: true, year: true },
    });

    const branches = [
        ...new Set(users.map((u) => u.branch).filter(Boolean)),
    ] as string[];
    const years = [
        ...new Set(users.map((u) => u.year).filter(Boolean)),
    ].sort() as number[];

    return { success: true as const, branches, years };
}
