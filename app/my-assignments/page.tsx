import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getStudentAssignments } from "@/actions/assignment";
import { MyAssignmentsList } from "@/components/assignments/MyAssignmentsList";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "My Assignments | AlgoFox",
};

async function AssignmentsContent() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

    const { assignments } = await getStudentAssignments();

    return <MyAssignmentsList assignments={assignments} />;
}

export default function MyAssignmentsPage() {
    return (
        <div className="min-h-screen bg-gray-50/30 dark:bg-[#0a0a0a] pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Assignments</h1>
                    <p className="text-gray-500 mt-1">Complete assignments from your enrolled classrooms</p>
                </div>

                <Suspense fallback={
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                }>
                    <AssignmentsContent />
                </Suspense>
            </div>
        </div>
    );
}
