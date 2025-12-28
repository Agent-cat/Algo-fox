"use server";

import { prisma } from "@/lib/prisma";
import { Difficulty, Role, ProblemType } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Assuming auth helper exists on server
import { revalidatePath } from "next/cache";
import redis from "@/lib/redis";

const CACHE_TTL = 300; // 5 minutes

// Cache key helpers
const getProblemsCacheKey = (type: ProblemType, page: number) =>
    `problems:${type}:page:${page}`;

export async function getProblems(
    page: number = 1,
    pageSize: number = 10,
    type: ProblemType = "PRACTICE"
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    const cacheKey = getProblemsCacheKey(type, page);

    // Try cache first (only for non-authenticated or first page)
    if (!userId || page === 1) {
        const cached = await redis.get(cacheKey);
        if (cached) {
            const parsed = JSON.parse(cached);
            // If user is authenticated, we need to check solved status
            if (userId) {
                // Fetch solved status separately
                const problemIds = parsed.problems.map((p: any) => p.id);
                const solvedProblems = await prisma.submission.findMany({
                    where: {
                        userId,
                        problemId: { in: problemIds },
                        status: "ACCEPTED",
                        mode: "SUBMIT"
                    },
                    select: { problemId: true },
                    distinct: ["problemId"]
                });
                const solvedSet = new Set(solvedProblems.map(s => s.problemId));
                parsed.problems = parsed.problems.map((p: any) => ({
                    ...p,
                    isSolved: solvedSet.has(p.id)
                }));
            }
            return parsed;
        }
    }

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
            include: {
                _count: {
                    select: { submissions: true }
                },
                // Efficiently check if CURRENT user solved this
                ...(userId ? {
                    submissions: {
                        where: {
                            userId: userId,
                            status: "ACCEPTED",
                            mode: "SUBMIT"
                        },
                        take: 1,
                        select: { id: true }
                    }
                } : {})
            }
        }),
        prisma.problem.count({
            where: {
                type,
                hidden: false
            }
        })
    ]);

    const problemsWithStats = problems.map((p) => {
        // Safe access for submissions array if it exists
        const isSolved = (p as any).submissions?.length > 0;

        return {
            ...p,
            isSolved,
            // Use the stored 'solved' count which is now maintained by worker
            // Fallback to 0 if null
            acceptance: p._count.submissions > 0
                ? ((p.solved || 0) / p._count.submissions) * 100
                : 0,
            // Remove the submissions array from result to keep payload clean
            submissions: undefined
        };
    });

    const result = {
        problems: problemsWithStats,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page
    };

    // Cache result (only for first page and non-authenticated)
    if (!userId || page === 1) {
        await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result));
    }

    return result;
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
        include: {
            _count: {
                select: { submissions: true }
            },
            ...(userId ? {
                submissions: {
                    where: {
                        userId: userId,
                        status: "ACCEPTED",
                        mode: "SUBMIT"
                    },
                    take: 1,
                    select: { id: true }
                }
            } : {})
        }
    });

    const problemsWithStats = problems.map((p) => {
        const isSolved = (p as any).submissions?.length > 0;
        return {
            ...p,
            isSolved,
            acceptance: p._count.submissions > 0
                ? ((p.solved || 0) / p._count.submissions) * 100
                : 0,
            submissions: undefined
        };
    });

    return { problems: problemsWithStats };
}

export async function getProblem(slug: string) {
    const problem = await prisma.problem.findUnique({
        where: { slug },
        include: { testCases: true, user: { select: { name: true, image: true } } }
    });
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
