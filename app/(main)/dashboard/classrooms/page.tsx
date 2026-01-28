import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getStudentClassrooms } from "@/actions/classroom";
import { ClassroomsPageContent } from "./ClassroomsPageContent";
import { School } from "lucide-react";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "My Classrooms | AlgoFox",
};

async function ClassroomsData() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const role = (session.user as any).role;
    if (["CONTEST_MANAGER", "INSTITUTION_MANAGER"].includes(role)) {
        redirect("/dashboard");
    }

    const res = await getStudentClassrooms();
    const classrooms = res.success && res.classrooms ? res.classrooms : [];

    return <ClassroomsPageContent initialClassrooms={classrooms} />;
}

export default function ClassroomsPage() {
    return (
        <div className="min-h-screen dark:bg-[#0a0a0a] pt-12">
            {/* Header */}
            <div className="relative mb-12 bg-white dark:bg-[#0a0a0a]   dark:border-[#262626]  overflow-hidden">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="relative group cursor-default">
                            <div className="absolute -inset-1 rounded-full"></div>
                            <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-[#0a0a0a] text-orange-600 dark:text-orange-500 rounded-full text-sm font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-500/20">
                                <School className="w-4 h-4" />
                                MY CLASSROOMS
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 relative">
                <Suspense
                    fallback={
                        <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-[#262626] shadow-sm">
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
