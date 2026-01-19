"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CategorySimple {
    id: string;
    name: string;
    slug: string;
}

interface ProblemSimple {
    id: string;
    title: string;
    slug: string;
    difficulty: string;
}

interface CategoriesListProps {
    categories: CategorySimple[];
    loadingCategories: boolean;
    expandedCategory: string | null;
    categoryProblems: Record<string, ProblemSimple[]>;
    loadingCategoryProblems: string | null;
    solvedProblemIds: string[];
    currentProblemId: string;
    onToggleCategory: (categoryId: string) => void;
}

export function CategoriesList({
    categories,
    loadingCategories,
    expandedCategory,
    categoryProblems,
    loadingCategoryProblems,
    solvedProblemIds,
    currentProblemId,
    onToggleCategory
}: CategoriesListProps) {

    if (loadingCategories) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {categories.map((category) => (
                <div key={category.id} className="rounded-lg border border-gray-100 dark:border-[#262626] overflow-hidden">
                    <button
                        onClick={() => onToggleCategory(category.id)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50/50 dark:bg-[#141414] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
                    >
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate text-left flex-1 mr-2">
                            {category.name}
                        </span>
                        <ChevronDown className={cn(
                            "w-4 h-4 text-gray-400 transition-transform",
                            expandedCategory === category.id && "rotate-180"
                        )} />
                    </button>

                    <AnimatePresence>
                        {expandedCategory === category.id && (
                            <motion.div
                                key="content"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                                className="overflow-hidden"
                            >
                                <div className="p-2 space-y-1 bg-white dark:bg-[#0a0a0a]">
                                    {loadingCategoryProblems === category.id ? (
                                        <div className="flex justify-center p-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                                        </div>
                                    ) : (
                                        categoryProblems[category.id]?.map((prob) => {
                                            const isSolved = solvedProblemIds.includes(prob.id);
                                            const isCurrent = currentProblemId === prob.id;

                                            return (
                                                <Link
                                                    key={prob.id}
                                                    href={`/problems/${prob.slug}`}
                                                    className={cn(
                                                        "flex items-center gap-3 p-2 rounded-md text-sm transition-colors ml-2",
                                                        isCurrent
                                                            ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                                            : "hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full shrink-0",
                                                        isSolved ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
                                                    )} />
                                                    <span className="truncate">{prob.title}</span>
                                                </Link>
                                            );
                                        })
                                    )}
                                    {!loadingCategoryProblems && (!categoryProblems[category.id] || categoryProblems[category.id].length === 0) && (
                                        <p className="text-xs text-gray-400 text-center py-2">No problems in this category</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
