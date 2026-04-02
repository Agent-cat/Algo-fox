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
    solvedSet: Set<string>;
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
    solvedSet,
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
        <div className="space-y-2">
            {problems.map((prob) => {
                const isSolved = solvedSet.has(prob.id);
                const isCurrent = currentProblemId === prob.id;

                return (
                    <Link
                        key={prob.id}
                        href={`/problems/${prob.slug}`}
                        className={cn(
                            "group flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 border relative overflow-hidden",
                            isCurrent
                                ? "bg-orange-50/60 dark:bg-orange-500/5 border-orange-200/50 dark:border-orange-500/20 shadow-md ring-1 ring-orange-500/20 dark:ring-transparent shadow-orange-500/5"
                                : "bg-white dark:bg-[#111111] hover:bg-gray-50/80 dark:hover:bg-[#161616] border-gray-100/80 dark:border-[#262626] hover:border-gray-200 dark:hover:border-[#333] hover:shadow-sm"
                        )}
                    >
                        {/* Status Checkbox/Indicator */}
                        <div className={cn(
                            "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300",
                            isSolved
                                ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-500 shadow-sm"
                                : "bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-300 dark:text-gray-600 group-hover:border-gray-300 dark:group-hover:border-[#444]"
                        )}>
                            {isSolved ? (
                                <CheckCircle className="w-4 h-4" />
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700 transition-colors group-hover:bg-gray-400 dark:group-hover:bg-gray-500" />
                            )}
                        </div>

                        {/* Title and Metadata */}
                        <div className="flex-1 min-w-0 flex flex-col gap-1">
                            <div className="flex items-center justify-between gap-2">
                                <p className={cn(
                                    "font-semibold text-[13.5px] truncate transition-all duration-300",
                                    isCurrent ? "text-orange-700 dark:text-orange-400" : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                                )}>
                                    {prob.title}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className={cn(
                                    "text-[9px] font-bold px-1.5 py-0.5 rounded-md border uppercase tracking-widest",
                                    prob.difficulty === "EASY" && "text-emerald-600 dark:text-emerald-500 border-emerald-100 dark:border-emerald-500/10 bg-emerald-50/30 dark:bg-emerald-500/5",
                                    prob.difficulty === "MEDIUM" && "text-amber-600 dark:text-amber-500 border-amber-100 dark:border-amber-500/10 bg-amber-50/30 dark:bg-amber-500/5",
                                    prob.difficulty === "HARD" && "text-rose-600 dark:text-rose-500 border-rose-100 dark:border-rose-500/10 bg-rose-50/30 dark:bg-rose-500/5"
                                )}>
                                    {prob.difficulty}
                                </span>
                                {isSolved && (
                                    <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-medium">Solved</span>
                                )}
                            </div>
                        </div>

                        {/* Hover arrow or decoration */}
                        <div className={cn(
                            "opacity-0 transition-all duration-300 transform translate-x-2",
                            "group-hover:opacity-100 group-hover:translate-x-0"
                        )}>
                             <svg className="w-4 h-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                             </svg>
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
