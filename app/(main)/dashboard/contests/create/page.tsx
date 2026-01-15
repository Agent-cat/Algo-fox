import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateContestWizard } from "@/components/contest/CreateContestWizard";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function CreateContestContent() {
    "use cache: private";

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const user = session.user as any;

    // Security check: Only certain roles can create contests
    if (!["ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER", "TEACHER"].includes(user.role)) {
        redirect("/dashboard");
    }

    return (
        <CreateContestWizard
            institutionId={user.institutionId || null}
            userId={user.id}
            userRole={user.role}
        />
    );
}

export default async function CreateContestPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pb-12">
            {/* Header */}
            <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#262626]">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard/contests"
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Contest</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set up a new coding competition</p>
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
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                        </div>
                    </div>
                }>
                    <CreateContestContent />
                </Suspense>
            </div>
        </div>
    );
}
