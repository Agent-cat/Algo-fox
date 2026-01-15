import { getInviteDetails } from "@/actions/institution/invite";
import { notFound } from "next/navigation";
import InviteCard from "./InviteCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function InvitePage({ params }: { params: Promise<{ code: string }> }) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4">
                 <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        }>
            <InviteContent params={params} />
        </Suspense>
    );
}

async function InviteContent({ params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;
    const { success, invite, error } = await getInviteDetails(code);

    if (!success || !invite) {
        if (error === "Invite expired" || error === "Invite limit reached" || error === "Invite is deactivated") {
             return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4">
                    <div className="max-w-md w-full bg-white dark:bg-[#141414] rounded-3xl p-8 text-center border border-gray-100 dark:border-[#262626] shadow-xl">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-500">
                            <span className="text-2xl font-bold">!</span>
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Invite Unavailable</h1>
                        <p className="text-gray-500 dark:text-gray-400">{error}</p>
                    </div>
                </div>
             );
        }
        notFound();
    }

    const session = await auth.api.getSession({
        headers: await headers()
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-orange-50/50 dark:from-orange-900/10 to-transparent pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <InviteCard
                    invite={invite}
                    code={code}
                    user={session?.user}
                />
            </div>

            <p className="mt-8 text-center text-xs font-medium text-gray-400 dark:text-gray-600">
                Protected by AlgoFox Security &bull; {new Date().getFullYear()}
            </p>
        </div>
    );
}
