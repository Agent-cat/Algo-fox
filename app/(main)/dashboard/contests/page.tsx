import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVisibleContests } from "@/actions/contest";
import { ContestList } from "@/components/contest/ContestList";
import { Suspense } from "react";

async function ContestsContent() {
    "use cache: private";

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    // Restrict access to admins, institution managers, contest managers, and teachers
    const userRole = (session.user as any).role;
    const allowedRoles = ["ADMIN", "CONTEST_MANAGER"];

    if (!allowedRoles.includes(userRole)) {
        redirect("/contests");
    }

    const contestsRes = await getVisibleContests();
    const contests = contestsRes.success ? contestsRes.contests || [] : [];

    return (
        <ContestList
            contests={contests}
            userRole={userRole}
        />
    );
}

export default async function ContestsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-12">
            {/* Header */}
            <div className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#262626]">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contest Management</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Create, edit, and manage coding competitions</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <Suspense fallback={
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contests...</p>
                        </div>
                    </div>
                }>
                    <ContestsContent />
                </Suspense>
            </div>
        </div>
    );
}
