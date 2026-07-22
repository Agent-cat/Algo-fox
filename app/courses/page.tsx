
import { CourseService } from "@/core/services/course.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Metadata } from "next";
import CoursesClient from "./_components/CoursesClient";
import { getSession } from "@/lib/auth-utils";

export const metadata: Metadata = {
    title: "Courses",
    description: "Master coding with our structured learning paths.",
};

export default async function CoursesPage() {
    const session = await getSession();
    const courses = await CourseService.getAllCourses();

    let enrollments: any[] = [];
    if (session?.user) {
        enrollments = await CourseService.getUserEnrolledCourses(session.user.id);
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23]">
            <main className="w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12 pt-4 sm:pt-6 pb-12 sm:pb-20">
                <CoursesClient courses={courses} enrollments={enrollments} />
            </main>
        </div>
    );
}
