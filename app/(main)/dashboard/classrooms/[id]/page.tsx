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
            <div className="min-h-screen flex items-center justify-center bg-white p-6">
                <div className="text-center max-w-sm">
                    <div className="p-4 bg-gray-50 rounded-3xl mb-6 inline-block">
                        <School className="w-12 h-12 text-gray-300" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Classroom Not Found</h1>
                    <Link href="/dashboard/classrooms" className="inline-flex items-center gap-2 text-orange-600 font-bold">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Hub
                    </Link>
                </div>
            </div>
        );
    }

    const classroom = res.classroom;

    return (
        <div className="min-h-screen bg-white">
            {/* Simple Clean Header */}
            <div className="pt-24 pb-8 border-b border-gray-100 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                        <Link href="/dashboard/classrooms" className="hover:text-orange-600">Classrooms</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-gray-900">{classroom.name}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
                                {classroom.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Instructor</span>
                                    <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                        <div className="w-5 h-5 bg-orange-100 rounded text-[10px] flex items-center justify-center text-orange-600">
                                            {classroom.teacher.name?.charAt(0).toUpperCase()}
                                        </div>
                                        {classroom.teacher.name}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Subject</span>
                                    <span className="text-sm font-bold text-gray-900">{classroom.subject || "Logic & Coding"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Section</span>
                                    <span className="text-sm font-bold text-gray-900">{classroom.section || "General"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Join Code</span>
                                    <span className="text-sm font-mono font-black text-orange-600 tracking-wider">{classroom.joinCode}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Link
                                href="/problems"
                                className="px-6 py-3 bg-gray-900 text-white text-xs font-black uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
                            >
                                Solve Problems
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Section */}
            <div className="max-w-7xl mx-auto py-12 px-6">
                <ClassroomDashboard
                    classroom={classroom as any}
                    currentUserId={session.user.id}
                />
            </div>
        </div>
    );
}

export default function ClassroomDetailPage({ params }: PageProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading classroom...</p>
                </div>
            </div>
        }>
            <ClassroomDetailContent params={params} />
        </Suspense>
    );
}

