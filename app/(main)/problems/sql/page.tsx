import { getProblems } from "@/actions/problems";
import SqlProblemsClient from "./_components/SqlProblemsClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "SQL Problems | Algofox",
    description: "Practice SQL problems and improve your database query skills.",
};

async function SqlProblemsContent({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
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

