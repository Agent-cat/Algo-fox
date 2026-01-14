"use client";

import { finalizeContest } from "@/actions/contest";
import { Award, Loader2 } from "lucide-react"; // Changed 'Medal' to 'Award' to avoid conflict if Medal is used or just variety
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FinalizeContestButtonProps {
    contestId: string;
    isFinalized: boolean;
}

export function FinalizeContestButton({ contestId, isFinalized }: FinalizeContestButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (isFinalized) {
        return (
            <div className="px-4 py-2 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-lg text-xs font-bold border border-green-200 dark:border-green-500/20 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4" />
                Results Finalized
            </div>
        );
    }

    const handleFinalize = async () => {
        const confirm = window.confirm("Are you sure you want to finalize this contest? This will award badges to the top 3 participants and cannot be undone.");
        if (!confirm) return;

        setIsLoading(true);
        try {
            const result = await finalizeContest(contestId);
            if (result.success) {
                toast.success(result.message || "Contest finalized and badges awarded!");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to finalize contest");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleFinalize}
            disabled={isLoading}
            className="px-4 py-1.5 bg-orange-600 text-white rounded-lg text-xs font-bold border border-orange-700 uppercase tracking-wider hover:bg-orange-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
            Finalize Results
        </button>
    );
}
