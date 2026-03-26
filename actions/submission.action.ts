"use server";

import { SubmissionService } from "@/core/services/submission.service";
import { auth } from "@/lib/auth";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { cacheTag, cacheLife } from "next/cache";
import { headers } from "next/headers";
import { after } from "next/server"; // For background tasks

async function getCachedSubmissionInternal(id: string) {
    "use cache"
    cacheTag(`submission-${id}`);
    // @ts-ignore
    cacheLife("default"); // or "submission" if defined

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
    cacheLife({ stale: 60, revalidate: 60 }); // 1 minute default, but we rely on on-demand revalidation ideally

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

    const userId = session.user.id;

    try {
        await SubmissionService.markConceptAsSolved(userId, problemId);

        // Move heavy stats updates to background
        after(async () => {
             await SubmissionService.incrementProblemSolved(problemId, userId);
             // Revalidating paths/tags inside after() ensures the next request is fresh,
             // but current UI might need revalidatePath synchronous if it relies on server reload.
             // However, separating side-effects is key.
             // Using revalidateTag inside after works for ISR.
             revalidateTag(`problem-${problemId}`,"max");
             revalidateTag(`user-submissions-${userId}`,"max");
             revalidateTag(`problem-submissions-${userId}-${problemId}`,"max");
        });

        revalidatePath("/problems");
        revalidatePath("/problems/dsa");
        revalidatePath("/problems/sql");
        // These might fail in standard runtime if cache tags aren't updated synchronously?
        // Actually, revalidating path is enough for UI. Tags are for cached data.

        return { success: true };
    } catch (error) {
        console.error("Failed to mark concept as completed:", error);
        return { success: false, error: "Failed to mark as completed" };
    }
}

export async function getSubmissionDistributionAction(problemId: string) {
    "use cache";
    cacheLife({ stale: 3600, revalidate: 3600 }); // Distribution doesn't change too fast
    cacheTag(`problem-${problemId}-distribution`);

    return SubmissionService.getSubmissionDistribution(problemId);
}
