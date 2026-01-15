import { getClassroomWithStudents } from "@/actions/classroom";
import { ClassroomDashboard } from "@/components/classroom/ClassroomDashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, School, GraduationCap, ChevronRight } from "lucide-react";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

async function ClassroomDetailContent({ params }: { params: Promise<{ id: string }> }) {
    "use cache: private";
    const { id } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/signin");
    }

    const res = await getClassroomWithStudents(id);
    if (!res.success || !res.classroom) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a] p-6">
                <div className="text-center max-w-sm">
                    <div className="p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-3xl mb-6 inline-block">
                        <School className="w-12 h-12 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter">Classroom Not Found</h1>
                    <Link href="/dashboard/classrooms" className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-500 font-bold">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Hub
                    </Link>
                </div>
            </div>
        );
    }

    const classroom = res.classroom;

    return (
        <ClassroomDashboard
            classroom={classroom as any}
            currentUserId={session.user.id}
        />
    );
}

export default function ClassroomDetailPage({ params }: PageProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading classroom...</p>
                </div>
            </div>
        }>
            <ClassroomDetailContent params={params} />
        </Suspense>
    );
}

