import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getInstitutionClassrooms } from "@/actions/classroom";
import { InstitutionClassroomsContent } from "./InstitutionClassroomsContent";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Institution Classrooms | AlgoFox",
};

async function ClassroomsData() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const currentUser = session.user as any;
    if (currentUser.role !== "ADMIN" && currentUser.role !== "INSTITUTION_MANAGER") {
        redirect("/dashboard");
    }

    const res = await getInstitutionClassrooms(1, 50);
    const classrooms = res.success && res.classrooms ? res.classrooms : [];
    const pagination = res.pagination || null;

    return (
        <InstitutionClassroomsContent
            initialClassrooms={classrooms}
            initialPagination={pagination}
        />
    );
}

export default function InstitutionClassroomsPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center py-20 min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <ClassroomsData />
        </Suspense>
    );
}
