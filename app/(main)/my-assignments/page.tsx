import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getStudentAssignments } from "@/actions/assignment";
import { MyAssignmentsList } from "@/components/assignments/MyAssignmentsList";
import SubscriptionOverlay from "@/components/subscription/SubscriptionOverlay";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import { getSession } from "@/lib/auth-utils";
import { AssignmentsHeader } from "@/components/assignments/AssignmentsHeader";

export const metadata: Metadata = {
    title: "My Assignments",
};

async function AssignmentsContent() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/login");
    }

    if ((session.user as any).role === "USER") {
        return (
            <SubscriptionOverlay
                title="Unlock Assignments"
                description="View and solve your assigned tasks."
            />
        );
    }

    const { assignments } = await getStudentAssignments();

    return <MyAssignmentsList assignments={assignments} />;
}

export default function MyAssignmentsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pt-6 pb-12">
            <div className="w-full px-6 lg:px-12 relative">
                <AssignmentsHeader />

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
