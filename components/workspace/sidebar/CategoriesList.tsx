"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface CategorySimple {
    id: string;
    name: string;
    slug: string;
    children?: CategorySimple[];
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
    expandedCategories: string[];
    categoryProblems: Record<string, ProblemSimple[]>;
    loadingCategoryProblems: string | null;
    solvedSet: Set<string>;
    currentProblemId: string;
    onToggleCategory: (categoryId: string) => void;
}

function CategoryItem({
    category,
    expandedCategories,
    categoryProblems,
    loadingCategoryProblems,
    solvedSet,
    currentProblemId,
    onToggleCategory,
    level = 0
}: {
    category: CategorySimple;
    expandedCategories: string[];
    categoryProblems: Record<string, ProblemSimple[]>;
    loadingCategoryProblems: string | null;
    solvedSet: Set<string>;
    currentProblemId: string;
    onToggleCategory: (categoryId: string) => void;
    level?: number;
}) {
    const isExpanded = expandedCategories.includes(category.id);

    return (
        <div className={cn(
            "rounded-xl overflow-hidden transition-all duration-300 mb-1.5",
            level === 0 ? "border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111111]" : "ml-4 border-l-2 border-orange-500/20 dark:border-orange-500/10 bg-transparent"
        )}>
            <button
                onClick={() => onToggleCategory(category.id)}
                className={cn(
                    "w-full flex items-center justify-between p-3.5 transition-all text-left group",
                    level === 0 ? "bg-gray-50/50 dark:bg-[#141414]/50 hover:bg-gray-100 dark:hover:bg-[#161616]" : "bg-transparent hover:bg-orange-50/20 dark:hover:bg-orange-500/5"
                )}
            >
                <div className="flex items-center gap-2 flex-1 overflow-hidden">
                    <span className={cn(
                        "text-sm font-semibold text-gray-700 dark:text-gray-300 truncate",
                        level > 0 && "text-[13px] font-medium"
                    )}>
                        {category.name}
                    </span>
                </div>
                <ChevronDown className={cn(
                    "w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-all duration-300",
                    isExpanded && "rotate-180 text-orange-500"
                )} />
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className={cn(
                           "space-y-1 bg-[#fafafa] dark:bg-[#121212]/30",
                           level === 0 ? "p-3 pt-1" : "p-2 pl-4"
                        )}>
                            {/* Render Sub-categories first */}
                            {category.children && category.children.length > 0 && (
                                <div className="space-y-1">
                                    {category.children.map(child => (
                                        <CategoryItem
                                            key={child.id}
                                            category={child}
                                            expandedCategories={expandedCategories}
                                            categoryProblems={categoryProblems}
                                            loadingCategoryProblems={loadingCategoryProblems}
                                            solvedSet={solvedSet}
                                            currentProblemId={currentProblemId}
                                            onToggleCategory={onToggleCategory}
                                            level={level + 1}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Render Problems */}
                            {loadingCategoryProblems === category.id ? (
                                <div className="flex justify-center p-4">
                                    <Loader2 className="w-5 h-5 animate-spin text-orange-500/50" />
                                </div>
                            ) : (
                                <div className="space-y-1 mt-1">
                                    {categoryProblems[category.id]?.map((prob) => {
                                        const isSolved = solvedSet.has(prob.id);
                                        const isCurrent = currentProblemId === prob.id;

                                        return (
                                            <Link
                                                key={prob.id}
                                                href={`/problems/${prob.slug}`}
                                                className={cn(
                                                    "group/prob flex items-center justify-between p-2.5 rounded-lg text-[13px] transition-all border border-transparent hover:shadow-sm",
                                                    isCurrent
                                                        ? "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-100/50 dark:border-orange-500/20"
                                                        : "hover:bg-white dark:hover:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 hover:border-gray-200/50 dark:hover:border-[#262626]"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className={cn(
                                                        "w-1.5 h-1.5 rounded-full shrink-0 transition-all",
                                                        isSolved ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-gray-300 dark:bg-[#262626] group-hover/prob:bg-orange-400"
                                                    )} />
                                                    <span className="truncate group-hover/prob:text-gray-900 dark:group-hover/prob:text-gray-100 transition-colors">
                                                        {prob.title}
                                                    </span>
                                                </div>
                                                <div className="hidden sm:block">
                                                     {prob.difficulty === "CONCEPT" && (
                                                         <span className="text-[9px] font-bold text-orange-500/70 border border-orange-500/20 px-1.5 rounded uppercase">Theory</span>
                                                     )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                    {!loadingCategoryProblems && (!categoryProblems[category.id] || categoryProblems[category.id].length === 0) && (!category.children || category.children.length === 0) && (
                                        <p className="text-[10px] text-gray-400 text-center py-4 italic font-medium opacity-60">
                                            No content available in this module
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function CategoriesList({
    categories,
    loadingCategories,
    expandedCategories,
    categoryProblems,
    loadingCategoryProblems,
    solvedSet,
    currentProblemId,
    onToggleCategory
}: CategoriesListProps) {

    if (loadingCategories) {
        return (
            <div className="flex flex-col items-center justify-center p-20 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                <span className="text-xs font-medium text-gray-400 animate-pulse">Organizing Knowledge...</span>
            </div>
        );
    }

    return (
        <div className="pb-12 px-0.5">
            {categories.map((category) => (
                <CategoryItem
                    key={category.id}
                    category={category}
                    expandedCategories={expandedCategories}
                    categoryProblems={categoryProblems}
                    loadingCategoryProblems={loadingCategoryProblems}
                    solvedSet={solvedSet}
                    currentProblemId={currentProblemId}
                    onToggleCategory={onToggleCategory}
                    level={0}
                />
            ))}
        </div>
    );
}
