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
            <div className="relative mb-12 bg-white border-b border-gray-100 pb-16 pt-12 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                 <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500 opacity-20 blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center gap-4">
                         <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider border border-orange-100">
                            <Trophy className="w-3 h-3" />
                            Arena
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
                            Competition <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">Arena</span>
                        </h1>
                        <p className="text-gray-500 max-w-lg text-lg">
                            Compete with the best, solve challenging problems, and climb the global leaderboard.
                        </p>
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

