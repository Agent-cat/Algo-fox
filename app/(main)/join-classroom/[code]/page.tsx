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
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-[#0a0a0a] p-6">
                <div className="text-center max-w-sm">
                    <div className="w-20 h-20 bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-[2rem] shadow-xl flex items-center justify-center mx-auto mb-8">
                        <School className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter">Lost in Space</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium leading-relaxed">
                        This classroom join link seems to be broken or doesn't exist anymore. Check with your mentor for a fresh link.
                    </p>
                    <Link
                        href="/dashboard/classrooms"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 dark:hover:bg-gray-200 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Safety
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4">
                 <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <JoinClassroomContent params={params} />
        </Suspense>
    );
}
