"use server";

import { ProblemService } from "@/core/services/problem.service";
import { Difficulty, ProblemType, ProblemDomain, QuestionType } from "@prisma/client";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag, cacheTag, cacheLife } from "next/cache";
import { getCacheLifeConfig, getCacheTags } from "@/lib/cache-config";
import { getSession } from "@/lib/auth-utils";

// GETTING PUBLIC PROBLEMS

export async function getProblems(
    page: number = 1,
    pageSize: number = 10,
    type: ProblemType = "PRACTICE",
    domain: ProblemDomain = "DSA",
    difficulty?: Difficulty,
    tags?: string[],
    cursor?: string,
    sortBy: string = 'oldest'
) {
    // CHECKING IF USER IS AUTHENTICATED
    const session = await getSession();
    const userId = session?.user?.id;

    return getCachedProblems(page, pageSize, type, domain, userId, difficulty, tags, cursor, sortBy);
}

async function getCachedProblems(
    page: number,
    pageSize: number,
    type: ProblemType,
    domain: ProblemDomain,
    userId?: string,
    difficulty?: Difficulty,
    tags?: string[],
    cursor?: string,
    sortBy: string = 'oldest'
) {
    "use cache: private";
    cacheLife(getCacheLifeConfig("problems"));

    const tagKey = `problems-${domain}-${type}-ps${pageSize}${difficulty ? `-${difficulty}` : ''}${tags && tags.length > 0 ? `-${tags.join('-')}` : ''}${cursor ? `-cursor-${cursor}` : `-page-${page}`}${userId ? `-user-${userId}` : ''}-sort-${sortBy}`;
    cacheTag(tagKey, 'problems-list', `problems-${domain}-${type}`);

    return ProblemService.getProblems(page, pageSize, type, domain, userId, difficulty, tags || [], cursor, sortBy);
}

// GETTING SOLVED PROBLEM COUNT FOR A USER (cached per-user)
export async function getSolvedCount(
    userId: string,
    difficulty?: Difficulty,
    tags?: string[]
) {
    "use cache: private";
    cacheLife(getCacheLifeConfig("problems"));

    const tagKey = `solved-count-DSA-PRACTICE${difficulty ? `-${difficulty}` : ''}${tags && tags.length > 0 ? `-${tags.join('-')}` : ''}-user-${userId}`;
    cacheTag(tagKey, `user-solved-${userId}`, 'problems-list');

    const { prisma } = await import("@/lib/prisma");
    return prisma.userProblemSolved.count({
        where: {
            userId,
            problem: {
                domain: "DSA",
                type: "PRACTICE",
                hidden: false,
                difficulty,
                tags: tags && tags.length > 0 ? {
                    some: { slug: { in: tags } }
                } : undefined
            }
        }
    });
}

// GETTING ADMIN PROBLEMS

export async function getAdminProblems(
    page: number = 1,
    pageSize: number = 50,
    domain?: ProblemDomain,
    excludeDifficulty?: Difficulty,
    type?: ProblemType
) {
    // CHECKING IF USER IS AUTHENTICATED
    const session = await getSession();

    if (!session || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    return getCachedAdminProblems(page, pageSize, domain, excludeDifficulty, type);
}

async function getCachedAdminProblems(
    page: number,
    pageSize: number,
    domain?: ProblemDomain,
    excludeDifficulty?: Difficulty,
    type?: ProblemType
) {
    "use cache: private";
    cacheLife(getCacheLifeConfig("problems"));

    const tagKey = `admin-problems-${domain || 'all'}${excludeDifficulty ? `-exclude-${excludeDifficulty}` : ''}${type ? `-type-${type}` : ''}-page-${page}`;
    cacheTag(tagKey, 'admin-problems-list');

    return ProblemService.getAdminProblems(page, pageSize, domain, excludeDifficulty, type);
}

// SEARCHING FOR PROBLEMS

export async function searchProblems(
    term: string,
    type?: ProblemType,
    domain?: ProblemDomain
) {
    const session = await getSession();
    const userId = session?.user?.id;

    return getCachedSearchProblems(term, type, domain, userId);
}

async function getCachedSearchProblems(
    term: string,
    type?: ProblemType,
    domain?: ProblemDomain,
    userId?: string
) {
    "use cache: private";
    cacheLife(getCacheLifeConfig("problems"));

    const tagKey = `search-${domain || 'all'}-${type || 'all'}-${term.toLowerCase().slice(0, 20)}${userId ? `-user-${userId}` : ''}`;
    cacheTag(tagKey, 'problems-search');

    return ProblemService.searchProblems(term, type, domain, userId);
}

// GETTING A PROBLEM BY SLUG CACHED

async function getProblemCached(slug: string, isAdmin: boolean, contestId?: string) {
    "use cache";
    cacheLife(getCacheLifeConfig("problemDetail"));
    cacheTag(`problem-${slug}`, ...getCacheTags("problemDetail"), 'problems-list');

    return ProblemService.getProblem(slug, isAdmin, contestId);
}

export async function getProblem(slug: string, isAdmin?: boolean, contestId?: string) {
    if (isAdmin !== undefined) {
        return getProblemCached(slug, isAdmin, contestId);
    }

    // CHECKING IF USER IS ADMIN
    const session = await getSession();
    const finalIsAdmin = session?.user?.role === "ADMIN";

    return getProblemCached(slug, finalIsAdmin, contestId);
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
    topicTags?: string[];
    categoryId?: string | null;
    categoryIds?: string[];
    useFunctionTemplate?: boolean;
    functionTemplates?: { languageId: number; functionTemplate: string; driverCode: string }[];
    solution?: string | null;
    animationScript?: any;
    companies?: any;
    hints?: string[];
    isMcq?: boolean;
    questionType?: QuestionType;
    options?: any;
    answer?: string | null;
}) {
    const session = await getSession();

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

        revalidateTag('admin-problems-list', 'max');
        revalidateTag('problems-list', 'max');
        revalidateTag('problems-SQL-PRACTICE', 'max');
        revalidateTag('problems-DSA-PRACTICE', 'max');
    }

    return result;
}


// GETTING A PROBLEM BY ID
async function getProblemByIdCached(id: string, isAdmin: boolean, contestId?: string) {
    "use cache";
    cacheLife(getCacheLifeConfig("problemDetail"));
    cacheTag(`problem-id-${id}`, ...getCacheTags("problemDetail"), 'problems-list');

    return ProblemService.getProblemById(id, isAdmin, contestId);
}

export async function getProblemById(id: string, isAdmin?: boolean, contestId?: string) {
    if (isAdmin !== undefined) {
        return getProblemByIdCached(id, isAdmin, contestId);
    }

    // CHECKING IF USER IS ADMIN
    const session = await getSession();
    const finalIsAdmin = session?.user?.role === "ADMIN";

    return getProblemByIdCached(id, finalIsAdmin, contestId);
}

// NAVIGATION ACTIONS

export async function getNextProblem(currentCreatedAt: Date, domain: ProblemDomain, type: ProblemType, courseId?: string, currentProblemId?: string) {
    "use cache: private";
    cacheLife(getCacheLifeConfig("problems"));
    return ProblemService.getNextProblem(currentCreatedAt, domain, type, courseId, currentProblemId);
}

export async function getPreviousProblem(currentCreatedAt: Date, domain: ProblemDomain, type: ProblemType, courseId?: string, currentProblemId?: string) {
    "use cache: private";
    cacheLife(getCacheLifeConfig("problems"));
    return ProblemService.getPreviousProblem(currentCreatedAt, domain, type, courseId, currentProblemId);
}

export async function getRandomProblem(domain: ProblemDomain, type: ProblemType, courseId?: string) {
    // No cache for random
    return ProblemService.getRandomProblem(domain, type, courseId);
}


// UPDATING A PROBLEM --> ADMIN ONLY
export async function updateProblem(id: string, data: any) {
    const session = await getSession();

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

        revalidateTag('admin-problems-list', 'max');
        revalidateTag('problems-list', 'max');
        revalidateTag(`problem-id-${id}`, 'max');
        if (result.data?.slug) {
            revalidateTag(`problem-${result.data.slug}`, 'max');
            revalidatePath(`/problems/${result.data.slug}`);
            revalidatePath(`/admin/problems/${result.data.id}/edit`);
        }
        revalidateTag(`problems-${result.data?.domain || 'DSA'}-${result.data?.type || 'PRACTICE'}`, 'max');
    }

    return result;
}


// DELETING A PROBLEM --> ADMIN ONLY
export async function deleteProblem(id: string) {
    const session = await getSession();

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

        revalidateTag('admin-problems-list', 'max');
        revalidateTag('problems-list', 'max');
    }

    return result;
}
