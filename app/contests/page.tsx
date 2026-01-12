import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVisibleContests } from "@/actions/contest";
import { StudentContestCard } from "@/components/contest/StudentContestCard";
import { ContestsPageContent } from "@/components/contest/ContestsPageContent";
import { Suspense } from "react";
import { Trophy, Search } from "lucide-react";

async function StudentContestsContent() {
    "use cache: private";

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const contestsRes = await getVisibleContests();
    const contests = contestsRes.success ? contestsRes.contests || [] : [];

    return <ContestsPageContent contests={contests} />;
}

export default async function StudentContestsPage() {
    return (
        <div className="min-h-screen bg-[#fcfcfd] pb-20 pt-24">
            {/* Header */}
            <div className="relative mb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                <Trophy className="w-3 h-3" />
                                Arena
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                                Coding <span className="text-orange-600">Contests</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 relative">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-orange-100 rounded-full" />
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin" />
                        </div>
                        <p className="mt-6 text-gray-600 font-bold tracking-tight">Gathering contests...</p>
                    </div>
                }>
                    <StudentContestsContent />
                </Suspense>
            </div>
        </div>
    );
}

