"use server";

import { ProblemService } from "@/core/services/problem.service";
import { Difficulty, ProblemType, ProblemDomain } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath, updateTag, cacheTag, cacheLife } from "next/cache";

// GETTING PUBLIC PROBLEMS

export async function getProblems(
    page: number = 1,
    pageSize: number = 10,
    type: ProblemType = "PRACTICE",
    domain: ProblemDomain = "DSA",
    difficulty?: Difficulty,
    tags?: string[],
    cursor?: string
) {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

    // CHECKING IF USER IS AUTHENTICATED
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    const tagKey = `problems-${domain}-${type}${difficulty ? `-${difficulty}` : ''}${tags && tags.length > 0 ? `-${tags.join('-')}` : ''}${cursor ? `-cursor-${cursor}` : `-page-${page}`}${userId ? `-user-${userId}` : ''}`;
    cacheTag(tagKey, 'problems-list', `problems-${domain}-${type}`);

    return ProblemService.getProblems(page, pageSize, type, domain, userId, difficulty, tags || [], cursor);
}

// GETTING ADMIN PROBLEMS

export async function getAdminProblems(
    page: number = 1,
    pageSize: number = 50,
    domain?: ProblemDomain,
    excludeDifficulty?: Difficulty
) {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

    // CHECKING IF USER IS AUTHENTICATED
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    const tagKey = `admin-problems-${domain || 'all'}${excludeDifficulty ? `-exclude-${excludeDifficulty}` : ''}-page-${page}`;
    cacheTag(tagKey, 'admin-problems-list');

    return ProblemService.getAdminProblems(page, pageSize, domain, excludeDifficulty);
}

// SEARCHING FOR PROBLEMS

export async function searchProblems(
    term: string,
    type: ProblemType = "PRACTICE",
    domain: ProblemDomain = "DSA"
) {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 300, revalidate: 300 }); // 5 minutes for search results

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const userId = session?.user?.id;

    const tagKey = `search-${domain}-${type}-${term.toLowerCase().slice(0, 20)}${userId ? `-user-${userId}` : ''}`;
    cacheTag(tagKey, 'problems-search');

    return ProblemService.searchProblems(term, type, domain, userId);
}

// GETTING A PROBLEM BY SLUG CACHED

export async function getProblem(slug: string) {
    "use cache";
    cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

    cacheTag(`problem-${slug}`, 'problems-list');

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
    useFunctionTemplate?: boolean;
    functionTemplates?: { languageId: number; functionTemplate: string; driverCode: string }[];
    solution?: string | null;
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
        revalidatePath("/problems/dsa");
        revalidatePath("/problems/sql");
        revalidatePath("/admin/problems");
        revalidatePath("/admin/dsa/problems");
        revalidatePath("/admin/sql/problems");

        updateTag('admin-problems-list');
        updateTag('problems-list');
        updateTag('problems-SQL-PRACTICE');
        updateTag('problems-DSA-PRACTICE');
    }

    return result;
}


// GETTING A PROBLEM BY ID
export async function getProblemById(id: string) {
    "use cache";
    cacheLife({ stale: 900, revalidate: 900 }); // 15 minutes default

    cacheTag(`problem-id-${id}`, 'problems-list');

    return ProblemService.getProblemById(id);
}

// NAVIGATION ACTIONS

export async function getNextProblem(currentCreatedAt: Date, domain: ProblemDomain, type: ProblemType) {
    "use cache: private";
    cacheLife({ stale: 300, revalidate: 300 });
    return ProblemService.getNextProblem(currentCreatedAt, domain, type);
}

export async function getPreviousProblem(currentCreatedAt: Date, domain: ProblemDomain, type: ProblemType) {
    "use cache: private";
    cacheLife({ stale: 300, revalidate: 300 });
    return ProblemService.getPreviousProblem(currentCreatedAt, domain, type);
}

export async function getRandomProblem(domain: ProblemDomain, type: ProblemType) {
    // No cache for random
    return ProblemService.getRandomProblem(domain, type);
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
        revalidatePath("/problems/dsa");
        revalidatePath("/problems/sql");
        revalidatePath(`/admin/problems`);
        revalidatePath("/admin/dsa/problems");
        revalidatePath("/admin/sql/problems");

        updateTag('admin-problems-list');
        updateTag('problems-list');
        updateTag(`problems-${result.data?.domain || 'DSA'}-${result.data?.type || 'PRACTICE'}`);
        updateTag(`problem-${result.data?.slug}`);
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
        revalidatePath("/problems/dsa");
        revalidatePath("/problems/sql");
        revalidatePath(`/admin/problems`);
        revalidatePath("/admin/dsa/problems");
        revalidatePath("/admin/sql/problems");

        updateTag('admin-problems-list');
        updateTag('problems-list');
    }

    return result;
}
