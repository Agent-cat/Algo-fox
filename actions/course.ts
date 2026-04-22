"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { CourseService } from "@/core/services/course.service";
import { revalidateTag } from "next/cache";

/**
 * Enroll a user in a course
 */
export async function enrollInCourse(courseId: string, slug: string) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
        return { error: "You must be logged in to enroll" };
    }

    try {
        const enrollment = await CourseService.enrollUser(session.user.id, courseId);

        // Initial progress calculation
        await CourseService.updateCourseProgress(session.user.id, courseId);

        // Revalidate cache
        revalidateTag(`course-${slug}`, "max");
        revalidateTag("courses-list", "max");

        return { success: true, enrollment };
    } catch (error: any) {
        return { error: error.message || "Failed to enroll" };
    }
}
