"use server";

import { prisma } from "@/lib/prisma";
import { Difficulty, Role, ProblemType } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import redis from "@/lib/redis";

import { unstable_cache } from "next/cache";

const CACHE_TTL = 300; // 5 minutes

// CACHE KEY HELPERS

const getProblemsCacheKey = (type: ProblemType, page: number) =>
    `problems:list:${type}:page:${page}`;

// CACHED FETCHER FOR PUBLIC PROBLEM LIST

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

// GETTING PUBLIC PROBLEMS

export async function getProblems(
    page: number = 1,
    pageSize: number = 10,
    type: ProblemType = "PRACTICE"
) {
    // CHECKING IF USER IS AUTHENTICATED
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    // FETCHING PUBLIC DATA (CACHED)
    const { problems, total } = await getCachedProblems(page, pageSize, type);

    // IF USER IS LOGGED IN, FETCHING THEIR SOLVED STATUS FOR THESE SPECIFIC PROBLEMS
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

    // MERGING DATA
    const problemsWithStats = problems.map((p) => {
        return {
            ...p,
            isSolved: solvedSet.has(p.id),
            // USING THE STORED 'SOLVED' COUNT WHICH IS NOW MAINTAINED BY WORKER
            // FALLBACK TO 0 IF NULL
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

// GETTING ADMIN PROBLEMS

export async function getAdminProblems(
    page: number = 1,
    pageSize: number = 50
) {
    // CHECKING IF USER IS AUTHENTICATED
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

// SEARCHING FOR PROBLEMS

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

// CACHED FETCHER FOR SINGLE PROBLEM

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


// GETTING A PROBLEM BY SLUG CACHED

export async function getProblem(slug: string) {
    const problem = await getCachedProblem(slug);
    return problem;
}


// CREATING A PROBLEM --> ADMIN ONLY

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
        revalidatePath("/admin/problems");
        // @ts-expect-error - Next.js type mismatch: expected 2 arguments
        revalidateTag('admin-problems-list');

        // INVALIDATING THE CACHE
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


// GETTING A PROBLEM BY ID
export async function getProblemById(id: string) {
    try {
        const problem = await prisma.problem.findUnique({
            where: { id },
            include: {
                testCases: true
            }
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("Failed to get problem by id:", error);
        return { success: false, error: "Failed to get problem by id" };
    }
}


// UPDATING A PROBLEM --> ADMIN ONLY
export async function updateProblem(id: string, data: any) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

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

        // UPDATING THE PROBLEM

        const problem = await prisma.problem.update({
            where: { id },
            data: updateData
        });

        revalidatePath("/problems");
        revalidatePath("/problems/dsa");
        revalidatePath(`/admin/problems`);
        // @ts-expect-error - Next.js type mismatch
        revalidateTag('admin-problems-list');
        // @ts-expect-error - Next.js type mismatch
        revalidateTag(`problem-${problem.slug}`);

        // INVALIDATING THE CACHE

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


// DELETING A PROBLEM --> ADMIN ONLY
export async function deleteProblem(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    // CHECKING IF USER IS ADMIN --> THROWING AN ERROR IF NOT ADMIN

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

        // @ts-expect-error - Next.js type mismatch
        revalidateTag('admin-problems-list');

        // INVALIDATING THE CACHE
        const cachePattern = "problems:*";
        const keys = await redis.keys(cachePattern);
        if (keys.length > 0) {
            await redis.del(...keys);
        }

        // RETURNING THE SUCCESS

        return { success: true };
    } catch (error) {
        console.error("Failed to delete problem:", error);
        return { success: false, error: "Failed to delete problem" };
    }
}
