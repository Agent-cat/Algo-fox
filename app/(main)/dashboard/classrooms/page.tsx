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

async function ClassroomsData() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/signin");
    }

    const role = (session.user as any).role;

    if (role === "USER") {
        return (
            <SubscriptionOverlay
                title="Unlock Classrooms"
                description="Join your community and start learning."
            />
        );
    }

    if (["CONTEST_MANAGER", "INSTITUTION_MANAGER"].includes(role)) {
        redirect("/dashboard");
    }

    const res = await getStudentClassrooms();
    const classrooms = res.success && res.classrooms ? res.classrooms : [];

    return <ClassroomsPageContent initialClassrooms={classrooms} />;
}

export default function ClassroomsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pt-24 pb-12">
            <div className="w-full px-6 lg:px-12 mx-auto mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">My Classrooms</h1>
                <p className="text-gray-500 mt-1">View and access your enrolled classrooms.</p>
            </div>

            {/* Content Container */}
            <div className="w-full px-6 lg:px-12 relative">
                <Suspense
                    fallback={
                        <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-[#1D1E23] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-orange-100 dark:border-orange-500/20 rounded-full" />
                                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin" />
                            </div>
                            <p className="mt-6 text-gray-600 dark:text-gray-400 font-bold tracking-tight">
                                Loading classrooms...
                            </p>
                        </div>
                    }
                >
                    <ClassroomsData />
                </Suspense>
            </div>
        </div>
    );
}
