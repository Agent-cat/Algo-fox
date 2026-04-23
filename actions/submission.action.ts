"use server";

import { SubmissionService } from "@/core/services/submission.service";
import { auth } from "@/lib/auth";
import { getCacheLifeConfig, getCacheTags } from "@/lib/cache-config";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { cacheTag, cacheLife } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server"; // For background tasks

async function getCachedSubmissionInternal(id: string) {
    "use cache"
    cacheTag(`submission-${id}`);
    // FIXED: Use centralized cache config instead of undefined "default"
    cacheLife(getCacheLifeConfig("submission"));

    return SubmissionService.getSubmissionById(id);
}

export async function getSubmission(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return null;
    }

    const submission = await getCachedSubmissionInternal(id);

    // Security check
    if (submission && submission.userId !== session.user.id) {
        return null;
    }

    return submission;
}

export async function getProblemSubmissionsAction(problemId: string, take: number = 20, cursor?: string) {
    "use cache: private"; // Must be at top - allows headers() inside
    // FIXED: Use centralized cache config
    cacheLife(getCacheLifeConfig("submission"));

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return [];
    }

    const userId = session.user.id;

    const tagKey = `problem-submissions-${userId}-${problemId}${cursor ? `-cursor-${cursor}` : ""}-take-${take}`;
    cacheTag(tagKey, `user-submissions-${userId}`, `problem-${problemId}`);

    return SubmissionService.getProblemSubmissions(problemId, userId, take, cursor);
}

export async function markConceptAsCompleted(problemId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return { success: false, error: "Unauthorized" };
    }

    if (((session.user as any).role as string) === "USER") {
        return { success: false, error: "Subscription required to complete problems" };
    }

    const userId = session.user.id;

    try {
        const submission = await SubmissionService.markConceptAsSolved(userId, problemId);
        if (!submission) {
            return { success: false, error: "Failed to create submission" };
        }
        const result = await SubmissionService.incrementProblemSolved(problemId, userId, submission.id);

        after(async () => {

             revalidateTag(`problem-${problemId}`, 'max');
             revalidateTag(`user-submissions-${userId}`, 'max');
             revalidateTag(`problem-submissions-${userId}-${problemId}`, 'max');
        });

        revalidatePath("/problems");
        revalidatePath("/problems/dsa");
        revalidatePath("/problems/sql");

        return { success: true, ...result };
    } catch (error) {
        console.error("Failed to mark concept as completed:", error);
        return { success: false, error: "Failed to mark as completed" };
    }
}

export async function getSubmissionDistributionAction(problemId: string) {
    "use cache";
    // FIXED: Use centralized cache config instead of hardcoded values
    // Submission distribution should be fairly fresh (can show recent trends)
    cacheLife(getCacheLifeConfig("submission"));
    cacheTag(`problem-${problemId}-distribution`, ...getCacheTags("submission"));

    return SubmissionService.getSubmissionDistribution(problemId);
}
