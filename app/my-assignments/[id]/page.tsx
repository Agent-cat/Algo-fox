import { Metadata } from "next";
import { Suspense } from "react";
import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAssignmentDetails, getAssignmentProgress } from "@/actions/assignment";
import { AssignmentDetailView } from "@/components/assignments/AssignmentDetailView";
import SubscriptionOverlay from "@/components/subscription/SubscriptionOverlay";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Assignment",
};

async function AssignmentContent({ id }: { id: string }) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        redirect("/login");
    }

    const user = session.user as { role: string };
    const allowedRoles = new Set(["ADMIN", "TEACHER", "CONTEST_MANAGER", "INSTITUTION_MANAGER"]);

    if (!user.role || !allowedRoles.has(user.role)) {
        return (
            <SubscriptionOverlay
                title="Unlock Assignment"
                description="View and solve your designated task."
            />
        );
    }

    const [assignment, progress] = await Promise.all([
        getAssignmentDetails(id),
        getAssignmentProgress(id)
    ]);

    if (!assignment) {
        notFound();
    }

    return <AssignmentDetailView assignment={assignment} progress={progress} />;
}

export default async function AssignmentDetailPage(props: { params: Promise<{ id: string }> }) {
    return (
        <div className="min-h-screen bg-gray-50/30 dark:bg-[#121212] pt-24 pb-12">
            <Suspense fallback={
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            }>
                <AssignmentContentWrapper paramsPromise={props.params} />
            </Suspense>
        </div>
    );
}

async function AssignmentContentWrapper({ paramsPromise }: { paramsPromise: Promise<{ id: string }> }) {
    const { id } = await paramsPromise;
    return <AssignmentContent id={id} />;
}
