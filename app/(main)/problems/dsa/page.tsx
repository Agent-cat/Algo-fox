import { getProblems, getSolvedCount } from "@/actions/problems";
import { getCategories } from "@/actions/category.action";
import DsaProblemsClient from "./_components/DsaProblemsClient";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUserAllocatedCourses } from "@/actions/courseAllocation.action";
import Link from "next/link";
import { Metadata } from "next";
import ProblemListSkeleton from "../_components/ProblemListSkeleton";
import { getSession } from "@/lib/auth-utils";

export const metadata: Metadata = {
    title: "DSA Problems",
    description: "Practice Data Structures and Algorithms problems and improve your skills.",
};

// Allowed page sizes — whitelist prevents abusive ?limit=99999 cache flooding
const ALLOWED_LIMITS = [10, 16, 25, 50] as const;
type AllowedLimit = (typeof ALLOWED_LIMITS)[number];

function parseLimit(raw: string | string[] | undefined): AllowedLimit {
    const n = Number(Array.isArray(raw) ? raw[0] : raw);
    return (ALLOWED_LIMITS.includes(n as AllowedLimit) ? n : 16) as AllowedLimit;
}

async function DsaProblemsContent({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    // getSession is React cache()-wrapped — both this call and the one inside
    // getUserAllocatedCourses resolve from the same deduped request.
    const session = await getSession();

    if (!session?.user) {
        redirect("/signin");
    }

    const params = await searchParams;
    const page = Number(params?.page) || 1;
    const limit = parseLimit(params?.limit);
    const difficulty = (params?.difficulty as any) || undefined;
    const sortBy = (params?.sortBy as string) || "oldest";
    const mode = (params?.mode as string) || "practice";

    // tags can be string or string[]
    let tags: string[] = [];
    if (typeof params?.tags === 'string') {
        tags = [params.tags];
    } else if (Array.isArray(params?.tags)) {
        tags = params.tags;
    }

    // Fire all independent fetches concurrently — access check, problems, categories,
    // and solved count all run in parallel instead of a waterfall.
    const [allocatedCourses, { problems, totalPages, total }, categoriesRes, solvedCount] = await Promise.all([
        getUserAllocatedCourses(),
        getProblems(page, limit, "PRACTICE", "DSA", difficulty, tags, undefined, sortBy),
        mode === "learn" ? getCategories("DSA") : Promise.resolve({ categories: [] }),
        getSolvedCount(session.user.id, difficulty, tags),
    ]);

    // Check if user has access to DSA
    if (allocatedCourses.success && !allocatedCourses.isPrivileged) {
        if (!allocatedCourses.domains.includes("DSA")) {
            return (
                <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] flex items-center justify-center px-4">
                    <div className="max-w-md text-center">
                        <div className="mb-6">
                            <svg className="w-20 h-20 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Access Restricted</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            DSA course is not allocated to your academic year. Please contact your administrator if you believe this is an error.
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

    return (
        <DsaProblemsClient
            initialProblems={problems}
            initialTotalPages={totalPages}
            initialCategories={categoriesRes.categories}
            userRole={session?.user?.role as string}
            totalProblems={total}
            solvedProblems={solvedCount}
            pageSize={limit}
        />
    );
}

export default async function DsaProblemsPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <Suspense fallback={<ProblemListSkeleton />}>
            <DsaProblemsContent searchParams={searchParams} />
        </Suspense>
    );
}
