import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getContestLeaderboard, getContestDetail } from "@/actions/contest";
import { ContestStandings } from "@/components/contest/ContestStandings";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

async function StandingsContent({ params }: { params: Promise<{ id: string }> }) {
    "use cache: private";
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    // First check if contest exists and user has access
    const contestRes = await getContestDetail(id);
    if (!contestRes.success) {
        if (contestRes.error === "Contest not found") {
            notFound();
        }
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-8">{contestRes.error}</p>
                <Link href="/contests" className="text-orange-600 font-bold hover:underline">
                    Back to Contests
                </Link>
            </div>
        );
    }

    const res = await getContestLeaderboard(id);

    if (!res.success) {
        return (
            <div className="container mx-auto py-20 px-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
                <p className="text-gray-600 mb-8">{res.error}</p>
                <Link href={`/contest/${id}`} className="text-orange-600 font-bold hover:underline">
                    Back to Arena
                </Link>
            </div>
        );
    }

    const isFinalized = res.success && 'isFinalized' in res ? res.isFinalized : false;
    const userRole = session?.user?.role;

    return (
        <div className="max-w-full py-10 px-6 min-h-screen">
            {/* Back Button */}
            <div className="mb-8 flex items-center justify-between">
                <BackButton />
            </div>

            <div className="w-full">
                <ContestStandings
                    students={res.students as any}
                    problems={(res as any).problems}
                    currentUserId={session.user.id}
                    contestId={id}
                    isFinalized={isFinalized}
                    userRole={userRole || undefined}
                />
            </div>
        </div>
    );
}

export default function ContestStandingsPage({ params }: PageProps) {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-20 px-4 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading standings...</p>
            </div>
        }>
            <StandingsContent params={params} />
        </Suspense>
    );
}

