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
                            "flex items-center gap-3 p-3 rounded-lg text-sm transition-all group",
                            isCurrent
                                ? "bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20"
                                : "hover:bg-gray-50 dark:hover:bg-[#1a1a1a] border border-transparent"
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
                            <p className="text-xs text-gray-500 dark:text-gray-500 capitalize">{prob.difficulty.toLowerCase()}</p>
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
