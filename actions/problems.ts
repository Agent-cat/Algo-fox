"use server";

import { prisma } from "@/lib/prisma";
import { Difficulty, Role } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Assuming auth helper exists on server
import { revalidatePath } from "next/cache";



export async function getProblems(page: number = 1, pageSize: number = 10) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    const skip = (page - 1) * pageSize;

    const [problems, total] = await Promise.all([
        prisma.problem.findMany({
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
        prisma.problem.count()
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

    return {
        problems: problemsWithStats,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page
    };
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
        revalidatePath("/admin/problems");
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
        revalidatePath(`/admin/problems`);
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
        revalidatePath(`/admin/problems`);
        return { success: true };
    } catch (error) {
        console.error("Failed to delete problem:", error);
        return { success: false, error: "Failed to delete problem" };
    }
}
