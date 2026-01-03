"use server";

import { SubmissionService } from "@/core/services/submission.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

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
