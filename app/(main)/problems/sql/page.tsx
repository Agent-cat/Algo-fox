import { getProblems } from "@/actions/problems";
import SqlProblemsClient from "./_components/SqlProblemsClient";
import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserAllocatedCourses } from "@/actions/courseAllocation.action";
import Link from "next/link";

export const metadata: Metadata = {
    title: "SQL Problems | Algofox",
    description: "Practice SQL problems and improve your database query skills.",
};

async function SqlProblemsContent({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // Check user access
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const allocatedCourses = await getUserAllocatedCourses();

    // Check if user has access to SQL
    if (allocatedCourses.success && !allocatedCourses.isPrivileged) {
        if (!allocatedCourses.domains.includes("SQL")) {
            // User doesn't have access to SQL
            return (
                <div className="min-h-screen bg-white flex items-center justify-center px-4">
                    <div className="max-w-md text-center">
                        <div className="mb-6">
                            <svg className="w-20 h-20 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Restricted</h1>
                        <p className="text-gray-600 mb-6">
                            SQL course is not allocated to your academic year. Please contact your administrator if you believe this is an error.
                        </p>
                        <Link
                            href="/problems"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
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

    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const difficulty = (params?.difficulty as any) || undefined;

    // tags
    let tags: string[] = [];
    if (typeof params?.tags === 'string') {
        tags = [params.tags];
    } else if (Array.isArray(params?.tags)) {
        tags = params.tags;
    }

    // FETCHING PRACTICE MODE, PAGE 1 FOR SQL DOMAIN
    const { problems, totalPages } = await getProblems(page, 10, "PRACTICE", "SQL", difficulty, tags);

    return (
        <SqlProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
        />
    );
}

export default async function SqlProblemsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading problems...</p>
            </div>
        </div>}>
            <SqlProblemsContent searchParams={searchParams} />
        </Suspense>
    );
}

