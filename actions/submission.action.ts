"use server";

import { SubmissionService } from "@/core/services/submission.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";

export async function getSubmission(id: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return null;
    }

    const getCachedSubmission = unstable_cache(
        async (submissionId: string) => {
            return SubmissionService.getSubmissionById(submissionId);
        },
        [`submission-${id}`],
        {
            tags: [`submission-${id}`],
            revalidate: 60 * 60 * 24 // 24 hours (submissions are immutable generally)
        }
    );

    const submission = await getCachedSubmission(id);

    // Security check: Ensure the submission belongs to the user
    // OR if we want to allow sharing, we might skip this. 
    // For now, assuming private submissions.
    if (submission && submission.userId !== session.user.id) {
        return null; // Or throw Unauthorized
    }

    return submission;
}

export async function getProblemSubmissionsAction(problemId: string) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return [];
    }

    const userId = session.user.id;

    const getCachedSubmissions = unstable_cache(
        async (pId: string, uId: string) => {
            return SubmissionService.getProblemSubmissions(pId, uId);
        },
        [`problem-submissions-${userId}-${problemId}`],
        {
            tags: [`problem-submissions-${userId}-${problemId}`],
            revalidate: 60 // 1 minute default, but we rely on on-demand revalidation ideally
        }
    );

    return getCachedSubmissions(problemId, userId);
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

        // Increment solved counts (logic in service handles exclusion of user stats for CONCEPT)
        await SubmissionService.incrementProblemSolved(problemId, userId);

        revalidatePath("/problems");
        revalidatePath("/dsa");
        revalidatePath("/sql");
        // @ts-expect-error - Next.js type mismatch
        revalidateTag(`problem-${problemId}`);

        return { success: true };
    } catch (error) {
        console.error("Failed to mark concept as completed:", error);
        return { success: false, error: "Failed to mark as completed" };
    }
}
