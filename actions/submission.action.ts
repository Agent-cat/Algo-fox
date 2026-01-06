"use server";

import { SubmissionService } from "@/core/services/submission.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath, updateTag, cacheTag, cacheLife } from "next/cache";

export async function getSubmission(id: string) {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 86400, revalidate: 86400 }); // 24 hours (submissions are immutable generally)
    
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return null;
    }

    cacheTag(`submission-${id}`, `user-submissions-${session.user.id}`);

    const submission = await SubmissionService.getSubmissionById(id);

    // Security check: Ensure the submission belongs to the user
    // OR if we want to allow sharing, we might skip this. 
    // For now, assuming private submissions.
    if (submission && submission.userId !== session.user.id) {
        return null; // Or throw Unauthorized
    }

    return submission;
}

export async function getProblemSubmissionsAction(problemId: string) {
    "use cache: private"; // Must be at top - allows headers() inside
    cacheLife({ stale: 60, revalidate: 60 }); // 1 minute default, but we rely on on-demand revalidation ideally
    
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session || !session.user) {
        return [];
    }

    const userId = session.user.id;

    cacheTag(`problem-submissions-${userId}-${problemId}`, `user-submissions-${userId}`, `problem-${problemId}`);

    return SubmissionService.getProblemSubmissions(problemId, userId);
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
        updateTag(`problem-${problemId}`);
        updateTag(`user-submissions-${userId}`);
        updateTag(`problem-submissions-${userId}-${problemId}`);

        return { success: true };
    } catch (error) {
        console.error("Failed to mark concept as completed:", error);
        return { success: false, error: "Failed to mark as completed" };
    }
}
