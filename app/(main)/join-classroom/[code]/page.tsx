import { getClassroomByCode } from "@/actions/classroom";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { JoinClassroomClient } from "@/app/(main)/join-classroom/[code]/JoinClassroomClient";
import { School, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

interface PageProps {
    params: Promise<{ code: string }>;
}

async function JoinClassroomContent({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect(`/signin?callbackUrl=/join-classroom/${code}`);
    }

    const res = await getClassroomByCode(code);

    if (!res.success || !res.classroom) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-6 text-center">
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-12 max-w-xl w-full shadow-sm flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] flex items-center justify-center mb-8">
                        <School className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">Space Jammed</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-10 font-medium leading-relaxed max-w-sm">
                        This classroom join link is either invalid or expired. Please contact your instructor for a fresh invitation.
                    </p>
                    <Link
                        href="/dashboard/classrooms"
                        className="w-full py-4 bg-orange-600 text-white font-black uppercase tracking-widest text-xs hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/20 transition-all text-center"
                    >
                        Back to Hub
                    </Link>
                </div>
            </div>
        );
    }

    if (res.isEnrolled) {
        redirect(`/dashboard/classrooms/${res.classroom.id}`);
    }

    return (
        <JoinClassroomClient
            classroom={res.classroom as any}
            code={code}
            currentUser={session.user}
        />
    );
}

export default function JoinClassroomPage({ params }: PageProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#121212] p-4">
                 <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <JoinClassroomContent params={params} />
        </Suspense>
    );
}
