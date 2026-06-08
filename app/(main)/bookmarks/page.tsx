import { getUserBookmarks } from "@/actions/bookmark.action";
import BookmarksClient from "./_components/BookmarksClient";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Bookmarks",
    description: "View your bookmarked problems.",
};

async function BookmarksContent({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const params = await searchParams;
    const page = Number(params?.page) || 1;

    const { bookmarks, totalPages, total } = await getUserBookmarks(page, 20);

    return (
        <BookmarksClient
            initialProblems={bookmarks || []}
            initialTotalPages={totalPages || 1}
            totalBookmarks={total || 0}
            userRole={session?.user?.role as string}
        />
    );
}

export default async function BookmarksPage({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="relative">
                    <div className="h-10 w-10 border-[3px] border-gray-200 dark:border-[#262626] border-t-orange-500 rounded-full animate-spin mx-auto" />
                    <div className="absolute inset-0 h-10 w-10 border-[3px] border-transparent border-b-orange-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading bookmarks...</p>
            </div>
        </div>}>
            <BookmarksContent searchParams={searchParams} />
        </Suspense>
    );
}
