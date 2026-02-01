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
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    // Use a default language (e.g., JavaScript ID 63) for concept submissions since language doesn't matter
    const DEFAULT_CONCEPT_LANG_ID = 63;

    try {
        // Create a submission with ACCEPTED status
        const submission = await SubmissionService.createSubmission(
            userId,
            problemId,
            DEFAULT_CONCEPT_LANG_ID,
            "// CONCEPT COMPLETED",
            "SUBMIT"
        );

        // Update status to ACCEPTED
        await SubmissionService.updateSubmissionStatus(submission.id, "ACCEPTED", 0, 0);

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
