import Navbar from "@/components/Navbar";
import { CourseService } from "@/core/services/course.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Metadata } from "next";
import CoursesClient from "./_components/CoursesClient";

export const metadata: Metadata = {
    title: "Courses",
    description: "Master coding with our structured learning paths.",
};

function CoursesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-[400px] rounded-4xl bg-gray-100 dark:bg-[#1a1a1a] animate-pulse" />
            ))}
        </div>
    );
}

export default async function CoursesPage() {
    const session = await auth.api.getSession({ headers: await headers() });
    const courses = await CourseService.getAllCourses();

    let enrollments: any[] = [];
    if (session?.user) {
        enrollments = await CourseService.getUserEnrolledCourses(session.user.id);
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212]">
            <Suspense fallback={<div className="h-16 w-full" />}>
                <Navbar />
            </Suspense>
            <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-20">
                <Suspense fallback={<CoursesSkeleton />}>
                    <CoursesClient courses={courses} enrollments={enrollments} />
                </Suspense>
            </main>
        </div>
    );
}
