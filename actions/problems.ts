"use server";

import { ProblemService } from "@/core/services/problem.service";
import { Difficulty, ProblemType, ProblemDomain } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";

// GETTING PUBLIC PROBLEMS

export async function getProblems(
    page: number = 1,
    pageSize: number = 10,
    type: ProblemType = "PRACTICE",
    domain: ProblemDomain = "DSA",
    difficulty?: Difficulty,
    tags?: string[]
) {
    // CHECKING IF USER IS AUTHENTICATED
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    return ProblemService.getProblems(page, pageSize, type, domain, userId, difficulty, tags || []);

}

// GETTING ADMIN PROBLEMS

export async function getAdminProblems(
    page: number = 1,
    pageSize: number = 50,
    domain?: ProblemDomain,
    excludeDifficulty?: Difficulty
) {
    // CHECKING IF USER IS AUTHENTICATED
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    return ProblemService.getAdminProblems(page, pageSize, domain, excludeDifficulty);
}

// SEARCHING FOR PROBLEMS

export async function searchProblems(
    term: string,
    type: ProblemType = "PRACTICE",
    domain: ProblemDomain = "DSA"
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    return ProblemService.searchProblems(term, type, domain, userId);
}

// GETTING A PROBLEM BY SLUG CACHED

export async function getProblem(slug: string) {
    return ProblemService.getProblem(slug);
}


// CREATING A PROBLEM --> ADMIN ONLY

export async function createProblem(data: {
    title: string;
    description: string;
    difficulty: Difficulty;
    slug: string;
    hidden: boolean;
    hiddenQuery?: string | null;
    domain?: ProblemDomain;
    testCases: { input: string; output: string; hidden?: boolean }[];
    tags?: string[];
}) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const result = await ProblemService.createProblem(data);

    if (result.success) {
        revalidatePath("/problems");
        revalidatePath("/dsa");
        revalidatePath("/sql");
        revalidatePath("/admin/problems");
        revalidatePath("/admin/dsa/problems");
        revalidatePath("/admin/sql/problems");

        // @ts-expect-error - Next.js type mismatch: expected 2 arguments
        revalidateTag('admin-problems-list');
        // @ts-expect-error - Next.js type mismatch
        revalidateTag('problems-list');
        // @ts-expect-error - Next.js type mismatch - Invalidate domain-specific caches
        revalidateTag('problems-SQL-PRACTICE');
        // @ts-expect-error - Next.js type mismatch
        revalidateTag('problems-DSA-PRACTICE');
    }

    return result;
}


// GETTING A PROBLEM BY ID
export async function getProblemById(id: string) {
    return ProblemService.getProblemById(id);
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

    const result = await ProblemService.updateProblem(id, data);

    if (result.success) {
        revalidatePath("/problems");
        revalidatePath("/dsa");
        revalidatePath("/sql");
        revalidatePath(`/admin/problems`);
        revalidatePath("/admin/dsa/problems");
        revalidatePath("/admin/sql/problems");

        // @ts-expect-error - Next.js type mismatch
        revalidateTag('admin-problems-list');
        // @ts-expect-error - Next.js type mismatch
        revalidateTag('problems-list');
        // @ts-expect-error - Next.js type mismatch - Invalidate domain-specific caches
        revalidateTag(`problems-${result.data?.domain || 'DSA'}-${result.data?.type || 'PRACTICE'}`);
        // @ts-expect-error - Next.js type mismatch
        revalidateTag(`problem-${result.data?.slug}`);
    }

    return result;
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

    const result = await ProblemService.deleteProblem(id);

    if (result.success) {
        revalidatePath("/problems");
        revalidatePath("/dsa");
        revalidatePath("/sql");
        revalidatePath(`/admin/problems`);
        revalidatePath("/admin/dsa/problems");
        revalidatePath("/admin/sql/problems");

        // @ts-expect-error - Next.js type mismatch
        revalidateTag('admin-problems-list');
        // @ts-expect-error - Next.js type mismatch
        revalidateTag('problems-list');
    }

    return result;
}
