"use client";

import { CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProblemSimple {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
}

interface ProblemsListProps {
    problems: ProblemSimple[];
    solvedProblemIds: string[];
    currentProblemId: string;
    isLoading: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
    // For search results mode
    isSearchMode?: boolean;
    searchTerm?: string;
    isSearching?: boolean;
}

export function ProblemsList({
    problems,
    solvedProblemIds,
    currentProblemId,
    isLoading,
    hasMore,
    onLoadMore,
    isSearchMode = false,
    searchTerm = "",
    isSearching = false
}: ProblemsListProps) {

    if (isSearchMode && searchTerm && isSearching) {
        return (
            <div className="flex justify-center p-4">
                <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
            </div>
        );
    }

    if (isSearchMode && searchTerm && !isSearching && problems.length === 0) {
        return (
             <div className="text-center p-4 text-gray-500 text-sm">
                No problems found.
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {problems.map((prob) => {
                const isSolved = solvedProblemIds.includes(prob.id);
                const isCurrent = currentProblemId === prob.id;

                return (
                    <Link
                        key={prob.id}
                        href={`/problems/${prob.slug}`}
                        className={cn(
                            "flex items-start gap-3 p-3 rounded-lg text-sm transition-all border group relative overflow-hidden",
                            isCurrent
                                ? "bg-orange-50/50 dark:bg-orange-500/5 border-orange-200 dark:border-orange-500/20 shadow-sm"
                                : "bg-white dark:bg-[#111111] hover:bg-gray-50 dark:hover:bg-[#161616] border-gray-100 dark:border-[#262626] hover:border-gray-200 dark:hover:border-[#333]"
                        )}
                    >
                        <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 border",
                            isSolved
                                ? "bg-green-100 dark:bg-green-900/20 border-green-500/30 text-green-600 dark:text-green-500"
                                : "border-gray-200 dark:border-[#333] text-gray-400"
                        )}>
                            {isSolved && <CheckCircle className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden relative">
                            <p className={cn(
                                "font-medium truncate transition-all",
                                isCurrent ? "text-orange-700 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"
                            )}>
                                {prob.title}
                            </p>
                            <div className="flex items-center justify-between gap-2 mt-0.5">
                                <span className={cn(
                                    "text-[10px] font-semibold px-1.5 py-0.5 rounded border uppercase tracking-wider",
                                    prob.difficulty === "EASY" && "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-100 dark:border-emerald-500/20",
                                    prob.difficulty === "MEDIUM" && "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-100 dark:border-amber-500/20",
                                    prob.difficulty === "HARD" && "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-100 dark:border-rose-500/20"
                                )}>
                                    {prob.difficulty}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}

            {!isSearchMode && (
                <div className="mt-4 flex justify-center pb-4">
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
                    ) : hasMore ? (
                        <button
                            onClick={onLoadMore}
                            className="text-xs font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 transition-colors"
                        >
                            Load More
                        </button>
                    ) : (
                        <span className="text-xs text-gray-400">No more problems</span>
                    )}
                </div>
            )}
        </div>
    );
}
