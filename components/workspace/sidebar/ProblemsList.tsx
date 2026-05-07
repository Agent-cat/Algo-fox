"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProblemSimple {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
}

interface ProblemsListProps {
    problems: ProblemSimple[];
    solvedSet: Set<string>;
    currentProblemId: string;
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    // For search results mode
    isSearchMode?: boolean;
    searchTerm?: string;
    isSearching?: boolean;
    courseId?: string | null;
}

export function ProblemsList({
    problems,
    solvedSet,
    currentProblemId,
    isLoading,
    hasMore,
    onLoadMore,
    isSearchMode = false,
    searchTerm = "",
    isSearching = false,
    courseId = null
}: ProblemsListProps) {

    if (isSearchMode && searchTerm && isSearching) {
        return (
            <div className="flex flex-col items-center justify-center p-12 gap-3">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Searching...</span>
            </div>
        );
    }

    if (isSearchMode && searchTerm && !isSearching && problems.length === 0) {
        return (
             <div className="text-center p-12 space-y-2 opacity-60">
                <p className="text-sm font-bold text-gray-500">No matching problems</p>
                <p className="text-xs text-gray-400">Try a different search term</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="w-full overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-white/5">
                            <th className="text-left py-4 px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] w-[60%]">Problem</th>
                            <th className="text-left py-4 px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Difficulty</th>
                            <th className="text-left py-4 px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Stats</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-white/2">
                        {problems.map((prob) => {
                            const isSolved = solvedSet.has(prob.id);
                            const isCurrent = currentProblemId === prob.id;

                            // Mock acceptance for now
                            const mockAcceptance = (25 + Math.random() * 20).toFixed(1) + "%";

                            return (
                                <tr
                                    key={prob.id}
                                    className={cn(
                                        "group cursor-pointer transition-all duration-300",
                                        isCurrent
                                            ? "bg-orange-50/50 dark:bg-orange-500/5 hover:bg-orange-100/50 dark:hover:bg-orange-500/10"
                                            : "hover:bg-gray-50 dark:hover:bg-white/5"
                                    )}
                                    onClick={() => window.location.href = `/problems/${prob.slug}${courseId ? `?courseId=${courseId}` : ""}`}
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="shrink-0">
                                                {isSolved ? (
                                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                                ) : (
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full",
                                                        isCurrent ? "bg-orange-500" : "bg-gray-200 dark:bg-white/10"
                                                    )} />
                                                )}
                                            </div>
                                            <span className={cn(
                                                "text-sm font-bold truncate tracking-tight transition-colors duration-300",
                                                isCurrent ? "text-orange-600 dark:text-orange-400" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                            )}>
                                                {prob.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className={cn(
                                            "text-[11px] font-black uppercase tracking-wider",
                                            prob.difficulty === "EASY" && "text-emerald-500",
                                            prob.difficulty === "MEDIUM" && "text-orange-500",
                                            prob.difficulty === "HARD" && "text-rose-500",
                                        )}>
                                            {prob.difficulty}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500">
                                            {mockAcceptance}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {!isSearchMode && (
                <div className="mt-8 flex justify-center pb-12">
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                    ) : hasMore ? (
                        <button
                            onClick={onLoadMore}
                            className="px-8 py-2.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-orange-500 hover:text-white hover:border-orange-500 rounded-full text-xs font-bold text-gray-600 dark:text-gray-300 transition-all active:scale-95 shadow-sm"
                        >
                            Load More
                        </button>
                    ) : (
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest opacity-40">End of list</span>
                    )}
                </div>
            )}
        </div>
    );
}
