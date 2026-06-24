import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getStudentClassrooms } from "@/actions/classroom";
import { ClassroomsPageContent } from "./ClassroomsPageContent";
import SubscriptionOverlay from "@/components/subscription/SubscriptionOverlay";
import { School } from "lucide-react";
import { Metadata } from "next";
import { getSession } from "@/lib/auth-utils";

export const metadata:Metadata = {
    title: "My Classrooms",
};

export default async function ClassroomsPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/signin");
    }

    const role = (session.user as any).role;

    if (role === "USER") {
        return (
            <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pt-6 pb-12">
                <div className="w-full px-6 lg:px-12 relative">
                    <SubscriptionOverlay
                        title="Unlock Classrooms"
                        description="Join your community and start learning."
                    />
                </div>
            </div>
        );
    }

    if (["CONTEST_MANAGER", "INSTITUTION_MANAGER"].includes(role)) {
        redirect("/dashboard");
    }

    const res = await getStudentClassrooms();
    const classrooms = res.success && res.classrooms ? res.classrooms : [];

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pt-6 pb-12">
            <div className="w-full px-6 lg:px-12 relative">
                <ClassroomsPageContent initialClassrooms={classrooms} />
            </div>
        </div>
    );
}
