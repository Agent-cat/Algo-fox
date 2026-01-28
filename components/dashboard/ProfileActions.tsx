"use client";

import { Settings2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { syncUserProfile } from "@/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProfileActionsProps {
    user: {
        name: string;
        email: string;
        image?: string | null;
        bio?: string | null;
        leetCodeHandle?: string | null;
        codeChefHandle?: string | null;
        codeforcesHandle?: string | null;
        githubHandle?: string | null;
    };
    readonly?: boolean;
}

export function ProfileActions({ user, readonly }: ProfileActionsProps) {
    const [isSyncing, setIsSyncing] = useState(false);
    const router = useRouter();

    if (readonly) return null;

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const res = await syncUserProfile();
            if (res.success) {
                toast.success("Profile synchronized successfully");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to sync profile");
            }
        } catch (error) {
            toast.error("An error occurred during synchronization");
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <>
            <div className="flex gap-2 w-full mt-2">
                <Link
                    href="/dashboard/settings/basic-info"
                    className="flex-1 py-2 px-4 bg-orange-500 text-white text-sm font-medium rounded-xl hover:bg-orange-600 transition-colors text-center"
                >
                    Edit Profile
                </Link>
                <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="p-2 border border-gray-200 dark:border-[#333] rounded-xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors text-gray-600 dark:text-gray-400 disabled:opacity-50"
                    title="Refresh Stats & Profile"
                >
                    <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
                </button>
            </div>
        </>
    );
}
