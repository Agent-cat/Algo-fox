import { getCategories } from "@/actions/category.action";
import { getProblems } from "@/actions/problems";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserAllocatedCourses } from "@/actions/courseAllocation.action";
import Link from "next/link";
import AptitudeClient from "./_components/AptitudeClient";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Aptitude",
    description: "Learn and practice aptitude questions.",
};

async function AptitudeContent() {
    // Check user access
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const allocatedCourses = await getUserAllocatedCourses();

    // Check if user has access to APTITUDE
    if (allocatedCourses.success && !allocatedCourses.isPrivileged) {
        if (!allocatedCourses.domains.includes("APTITUDE")) {
            return (
                <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center px-4">
                    <div className="max-w-md text-center">
                        <div className="mb-6">
                            <svg className="w-20 h-20 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Access Restricted</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Aptitude course is not allocated to your academic year. Please contact your administrator if you believe this is an error.
                        </p>
                        <Link
                            href="/problems"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Courses
                        </Link>
                    </div>
                </div>
            );
        }
    }

    const categoriesRes = await getCategories("APTITUDE");

    return (
        <AptitudeClient
            initialCategories={categoriesRes.categories}
            userRole={session?.user?.role as string}
        />
    );
}

export default async function AptitudePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="relative">
                    <div className="h-10 w-10 border-[3px] border-gray-200 dark:border-[#262626] border-t-orange-500 rounded-full animate-spin mx-auto" />
                    <div className="absolute inset-0 h-10 w-10 border-[3px] border-transparent border-b-orange-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading Aptitude...</p>
            </div>
        </div>}>
            <AptitudeContent />
        </Suspense>
    );
}


