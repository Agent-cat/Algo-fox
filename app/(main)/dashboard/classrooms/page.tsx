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

    if (!res.success) {
        return (
            <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pt-6 pb-12">
                <div className="w-full px-6 lg:px-12 flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-100 dark:border-red-500/20">
                        <School className="w-8 h-8 text-red-600 dark:text-red-500" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Failed to load classrooms
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                        {res.error || "An unexpected error occurred while fetching your classrooms."}
                    </p>
                </div>
            </div>
        );
    }

    const classrooms = res.classrooms || [];

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pt-6 pb-12">
            <div className="w-full px-6 lg:px-12 relative">
                <ClassroomsPageContent initialClassrooms={classrooms} />
            </div>
        </div>
    );
}
