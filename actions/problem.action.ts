import { prisma } from "@/lib/prisma";
import { problemSchema } from "@/zod/problem.zod";
import { z } from "zod";

type ProblemInput = z.infer<typeof problemSchema>;

export const createProblem = async (data: ProblemInput) => {
    try {
        const { submissions, testCases, ...problemData } = data;
        const problem = await prisma.problem.create({
            data: {
                ...problemData,
                testCases: {
                    create: testCases
                }
            }
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("Error creating problem:", error);
        return { success: false, error: "Failed to create problem" };
    }
}

export const getProblems = async () => {
    try {
        const problems = await prisma.problem.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                testCases: true
            }
        });
        return { success: true, data: problems };
    } catch (error) {
        console.error("Error fetching problems:", error);
        return { success: false, error: "Failed to fetch problems" };
    }
}

export const getProblemById = async (id: string) => {
    try {
        const problem = await prisma.problem.findUnique({
            where: { id },
            include: {
                testCases: true
            }
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("Error fetching problem:", error);
        return { success: false, error: "Failed to fetch problem" };
    }
}

export const getProblemBySlug = async (slug: string) => {
    try {
        const problem = await prisma.problem.findUnique({
            where: { slug },
            include: {
                testCases: true
            }
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("Error fetching problem:", error);
        return { success: false, error: "Failed to fetch problem" };
    }
}

export const updateProblem = async (id: string, data: Partial<ProblemInput>) => {
    try {
        const { submissions, testCases, createdAt, updatedAt, ...problemData } = data;

        // Prepare data object for prisma update
        const updateData: any = { ...problemData };

        if (testCases) {
            updateData.testCases = {
                deleteMany: {},
                create: testCases
            };
        }

        const problem = await prisma.problem.update({
            where: { id },
            data: updateData
        });
        return { success: true, data: problem };
    } catch (error) {
        console.error("Error updating problem:", error);
        return { success: false, error: "Failed to update problem" };
    }
}

export const deleteProblem = async (id: string) => {
    try {
        await prisma.problem.delete({
            where: { id }
        });
        return { success: true, message: "Problem deleted successfully" };
    } catch (error) {
        console.error("Error deleting problem:", error);
        return { success: false, error: "Failed to delete problem" };
    }
}
