"use client";

import { acceptInvite } from "@/actions/institution/invite";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface InviteCardProps {
    invite: {
        role: "ADMIN" | "INSTITUTION_MANAGER" | "TEACHER" | "CONTEST_MANAGER" | "STUDENT";
        institutionName: string;
        institutionLogo: string | null;
        code: string;
    };
    code: string;
    user: any;
}

export default function InviteCard({ invite, code, user }: InviteCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleAccept = async () => {
        setIsLoading(true);
        try {
            const res = await acceptInvite(code);
            if (res.success) {
                toast.success(`Welcome to ${res.institutionName}!`);
                router.push("/dashboard/institution");
            } else {
                toast.error(res.error || "Failed to join institution");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-3xl p-8 shadow-2xl shadow-gray-200/50 dark:shadow-none text-center">
                <div className="w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-gray-100 dark:border-[#262626]">
                    {invite.institutionLogo ? (
                        <img src={invite.institutionLogo} alt={invite.institutionName} className="w-12 h-12 object-contain" />
                    ) : (
                        <span className="text-2xl font-black text-gray-300 dark:text-gray-600 uppercase">
                            {invite.institutionName[0]}
                        </span>
                    )}
                </div>

                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                    {invite.institutionName}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                    has invited you to join as a <span className="text-orange-600 dark:text-orange-400 font-bold lowercase">{invite.role.replace('_', ' ')}</span>
                </p>

                <div className="space-y-4">
                    <Link
                        href={`/signin?callbackUrl=/invite/${code}`}
                        className="block w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-center hover:opacity-90 transition-opacity"
                    >
                        Sign in to Accept
                    </Link>
                    <Link
                        href={`/signup?callbackUrl=/invite/${code}`}
                        className="block w-full py-4 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white font-bold rounded-xl text-center hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors border border-gray-200 dark:border-[#333]"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-3xl p-8 shadow-2xl shadow-gray-200/50 dark:shadow-none text-center">
             <div className="w-20 h-20 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-gray-100 dark:border-[#262626] relative">
                {invite.institutionLogo ? (
                    <img src={invite.institutionLogo} alt={invite.institutionName} className="w-12 h-12 object-contain" />
                ) : (
                    <span className="text-2xl font-black text-gray-300 dark:text-gray-600 uppercase">
                        {invite.institutionName[0]}
                    </span>
                )}
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full border-4 border-white dark:border-[#141414]">
                    <User className="w-3 h-3" />
                </div>
            </div>

            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                Join {invite.institutionName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8 px-4">
                You are about to join <strong>{invite.institutionName}</strong> as a <span className="text-orange-600 dark:text-orange-400 font-bold lowercase">{invite.role.replace('_', ' ')}</span>.
            </p>

            <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-4 mb-8 flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#262626] flex items-center justify-center overflow-hidden">
                    {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : user.name?.[0]}
                </div>
                <div>
                    <div className="text-xs font-bold text-gray-500 uppercase">Signed in as</div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{user.email}</div>
                </div>
            </div>

            <button
                onClick={handleAccept}
                disabled={isLoading}
                className="w-full py-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isLoading ? "Joining..." : "Accept Invite"}
            </button>

            <p className="mt-4 text-[10px] text-gray-400">
                By joining, you grant {invite.institutionName} access to your performance data.
            </p>
        </div>
    );
}
