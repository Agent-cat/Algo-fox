"use server";

import { prisma } from "@/lib/prisma";
import { Difficulty, Role, ProblemType } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Assuming auth helper exists on server
import { revalidatePath, revalidateTag } from "next/cache";
import redis from "@/lib/redis";

import { unstable_cache } from "next/cache";

const CACHE_TTL = 300; // 5 minutes

// Cache key helpers
const getProblemsCacheKey = (type: ProblemType, page: number) =>
    `problems:list:${type}:page:${page}`;

// Cached fetcher for public problem list
const getCachedProblems = async (page: number, pageSize: number, type: ProblemType) => {
    return unstable_cache(
        async () => {
            const skip = (page - 1) * pageSize;
            const [problems, total] = await Promise.all([
                prisma.problem.findMany({
                    where: {
                        type,
                        hidden: false
                    },
                    skip,
                    take: pageSize,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        difficulty: true,
                        score: true,
                        solved: true,
                        createdAt: true,
                        type: true,
                        _count: {
                            select: { submissions: true }
                        }
                    }
                }),
                prisma.problem.count({
                    where: {
                        type,
                        hidden: false
                    }
                })
            ]);
            return { problems, total };
        },
        [getProblemsCacheKey(type, page), 'problems-list'],
        { revalidate: CACHE_TTL, tags: ['problems-list'] }
    )();
};

export async function getProblems(
    page: number = 1,
    pageSize: number = 10,
    type: ProblemType = "PRACTICE"
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    // 1. Fetch public data (cached)
    const { problems, total } = await getCachedProblems(page, pageSize, type);

    // 2. If user is logged in, fetch their solved status for these specific problems
    let solvedSet = new Set<string>();
    if (userId && problems.length > 0) {
        const problemIds = problems.map(p => p.id);
        const solvedSubmissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId: { in: problemIds },
                status: "ACCEPTED",
                mode: "SUBMIT"
            },
            select: { problemId: true },
            distinct: ["problemId"]
        });
        solvedSet = new Set(solvedSubmissions.map(s => s.problemId));
    }

    // 3. Merge data
    const problemsWithStats = problems.map((p) => {
        return {
            ...p,
            isSolved: solvedSet.has(p.id),
            // Use the stored 'solved' count which is now maintained by worker
            // Fallback to 0 if null
            acceptance: p._count.submissions > 0
                ? ((p.solved || 0) / p._count.submissions) * 100
                : 0,
        };
    });

    return {
        problems: problemsWithStats,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page
    };
}

export async function getAdminProblems(
    page: number = 1,
    pageSize: number = 50
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    return unstable_cache(
        async () => {
            const skip = (page - 1) * pageSize;
            const [problems, total] = await Promise.all([
                prisma.problem.findMany({
                    skip,
                    take: pageSize,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        title: true,
                        slug: true,
                        difficulty: true,
                        hidden: true,
                        score: true,
                        type: true,
                        createdAt: true,
                        updatedAt: true,
                    }
                }),
                prisma.problem.count()
            ]);

            return {
                problems,
                totalPages: Math.ceil(total / pageSize),
                currentPage: page,
                total
            };
        },
        [`admin:problems:page:${page}`],
        { revalidate: 300, tags: ['admin-problems-list'] }
    )();
}

export async function searchProblems(
    term: string,
    type: ProblemType = "PRACTICE"
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    const problems = await prisma.problem.findMany({
        where: {
            type,
            hidden: false,
            title: {
                contains: term,
                mode: 'insensitive'
            }
        },
        take: 10,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            score: true,
            solved: true,
            createdAt: true,
            type: true,
            _count: {
                select: { submissions: true }
            }
        }
    });

    let solvedSet = new Set<string>();
    if (userId && problems.length > 0) {
        const problemIds = problems.map(p => p.id);
        const solvedSubmissions = await prisma.submission.findMany({
            where: {
                userId,
                problemId: { in: problemIds },
                status: "ACCEPTED",
                mode: "SUBMIT"
            },
            select: { problemId: true },
            distinct: ["problemId"]
        });
        solvedSet = new Set(solvedSubmissions.map(s => s.problemId));
    }

    const problemsWithStats = problems.map((p) => {
        return {
            ...p,
            isSolved: solvedSet.has(p.id),
            acceptance: p._count.submissions > 0
                ? ((p.solved || 0) / p._count.submissions) * 100
                : 0,
        };
    });

    return { problems: problemsWithStats };
}

// Cached fetcher for single problem
const getCachedProblem = async (slug: string) => {
    return unstable_cache(
        async () => {
            return prisma.problem.findUnique({
                where: { slug },
                include: { testCases: true, user: { select: { name: true, image: true } } }
            });
        },
        [`problem:${slug}`],
        { revalidate: 3600, tags: [`problem-${slug}`] } // Cache for 1 hour
    )();
};

export async function getProblem(slug: string) {
    const problem = await getCachedProblem(slug);
    return problem;
}

export async function createProblem(data: {
    title: string;
    description: string;
    difficulty: Difficulty;
    slug: string;
    hidden: boolean;
    testCases: { input: string; output: string; hidden?: boolean }[];
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    try {
        const problem = await prisma.problem.create({
            data: {
                title: data.title,
                description: data.description,
                difficulty: data.difficulty,
                slug: data.slug,
                score: 10,
                hidden: data.hidden,
                testCases: {
                    create: data.testCases.map(tc => ({
                        input: tc.input,
                        output: tc.output,
                        hidden: tc.hidden ?? false
                    }))
                }
            },
        });

        revalidatePath("/problems");
        revalidatePath("/problems/dsa");
        revalidatePath("/admin/problems");
        revalidateTag('admin-problems-list');

        // Invalidate cache
        const cachePattern = "problems:*";
        const keys = await redis.keys(cachePattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }

        return { success: true, problem };
    } catch (error) {
        console.error("Failed to create problem:", error);
        return { success: false, error: "Failed to create problem" };
    }
}

export async function getProblemById(id: string) {
    const problem = await prisma.problem.findUnique({
        where: { id },
        include: {
            testCases: true
        }
    });
    return { success: true, data: problem };
}

export async function updateProblem(id: string, data: any) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    try {
        const { testCases, ...problemData } = data;

        const updateData: any = { ...problemData };
        if (testCases) {
            updateData.testCases = {
                deleteMany: {},
                create: testCases.map((tc: any) => ({
                    input: tc.input,
                    output: tc.output,
                    hidden: tc.hidden ?? false
                }))
            };
        }

        const problem = await prisma.problem.update({
            where: { id },
            data: updateData
        });

        revalidatePath("/problems");
        revalidatePath("/problems/dsa");
        revalidatePath(`/admin/problems`);
        revalidateTag('admin-problems-list');
        revalidateTag(`problem-${problem.slug}`);

        // Invalidate cache
        const cachePattern = "problems:*";
        const keys = await redis.keys(cachePattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }

        return { success: true, data: problem };
    } catch (error) {
        console.error("Failed to update problem:", error);
        return { success: false, error: "Failed to update problem" };
    }
}

export async function deleteProblem(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    try {
        await prisma.problem.delete({
            where: { id }
        });
        revalidatePath("/problems");
        revalidatePath("/problems/dsa");
        revalidatePath(`/admin/problems`);
        revalidateTag('admin-problems-list');

        // Invalidate cache
        const cachePattern = "problems:*";
        const keys = await redis.keys(cachePattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }

        return { success: true };
    } catch (error) {
        console.error("Failed to delete problem:", error);
        return { success: false, error: "Failed to delete problem" };
    }
}
