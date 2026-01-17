import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getStudentClassrooms } from "@/actions/classroom";
import { ClassroomsPageContent } from "./ClassroomsPageContent";
import { Loader2 } from "lucide-react";

export const metadata = {
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
        <Suspense fallback={
            <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <ClassroomsData />
        </Suspense>
    );
}
