"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ImpersonationBanner() {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    // @ts-ignore - impersonatedBy is added by admin plugin
    const isImpersonating = !!session?.session?.impersonatedBy;

    if (!isImpersonating) return null;

    const handleStopImpersonating = async () => {
        try {
            await authClient.admin.stopImpersonating();
            toast.success("Stopped impersonating");
            router.refresh();
            window.location.href = "/admin/users"; // Go back to admin users list
        } catch (error: any) {
            toast.error(error.message || "Failed to stop impersonating");
        }
    };

    return (
        <div className="bg-orange-600 text-white h-10 px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-100 shadow-md">
            <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">
                    You are impersonating <span className="font-bold">{session?.user.name}</span> ({session?.user.email})
                </span>
            </div>
            <button
                onClick={handleStopImpersonating}
                className="flex items-center gap-1.5 bg-white text-orange-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-orange-50 transition-colors shadow-sm"
            >
                <LogOut className="w-3 h-3" />
                Stop Impersonating
            </button>
        </div>
    );
}
