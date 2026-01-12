import { getTeacherClassrooms } from "@/actions/classroom";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { TeacherDashboardContent } from "./TeacherDashboardContent";
import { Suspense } from "react";

async function TeacherClassroomsPageContent() {
    "use cache: private";

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const classroomsRes = await getTeacherClassrooms();
    const classrooms = classroomsRes.success && classroomsRes.classrooms ? classroomsRes.classrooms : [];
    const institutionId = (session.user as any).institutionId || null;

    return (
        <TeacherDashboardContent
            classrooms={classrooms}
            institutionId={institutionId}
        />
    );
}

export default function TeacherClassroomsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        }>
            <TeacherClassroomsPageContent />
        </Suspense>
    );
}

