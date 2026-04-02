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
            "rounded-2xl overflow-hidden transition-all duration-500",
            level === 0 ? "mb-3 shadow-sm border border-gray-100/50 dark:border-[#1e1e1e]/50 bg-white dark:bg-[#0d0d0d]" : "ml-4 border-l-2 border-gray-100/50 dark:border-[#1e1e1e]/50 mt-1"
        )}>
            <button
                onClick={() => onToggleCategory(category.id)}
                className={cn(
                    "w-full flex items-center justify-between transition-all text-left group px-4 py-3.5",
                    isExpanded && level === 0 ? "bg-orange-50/30 dark:bg-orange-500/3" : "hover:bg-gray-50/50 dark:hover:bg-white/1"
                )}
            >
                <div className="flex items-center gap-3.5 flex-1 overflow-hidden">
                    <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        isExpanded ? "bg-orange-500 scale-125 shadow-[0_0_10px_rgba(249,115,22,0.5)]" : "bg-gray-300 dark:bg-gray-700"
                    )} />
                    <span className={cn(
                        "font-bold tracking-tight truncate transition-colors duration-300",
                        level === 0 ? "text-[15px]" : "text-sm",
                        isExpanded ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                    )}>
                        {category.name}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {categoryProblems[category.id] && (
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 bg-gray-100/50 dark:bg-white/5 px-1.5 py-0.5 rounded-md">
                            {categoryProblems[category.id].length}
                        </span>
                    )}
                    <ChevronDown className={cn(
                        "w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-all duration-500",
                        isExpanded && "rotate-180 text-orange-500"
                    )} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                    >
                        <div className={cn(
                           "transition-all bg-white dark:bg-[#0d0d0d]",
                           level === 0 ? "px-3 pb-3 pt-1" : "px-2 pb-2 pt-1"
                        )}>
                            {/* Render Sub-categories first */}
                            {category.children && category.children.length > 0 && (
                                <div className="space-y-1.5 mb-2">
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
                                <div className="flex flex-col items-center justify-center p-8 gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin text-orange-500/40" />
                                    <span className="text-[10px] text-gray-400 font-bold tracking-widest animate-pulse">FETCHING...</span>
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
                                                    "group/prob flex items-center justify-between p-3 rounded-xl text-[13px] transition-all border border-transparent duration-300",
                                                    isCurrent
                                                        ? "bg-orange-50/60 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/40 dark:border-orange-500/20 shadow-sm"
                                                        : "hover:bg-gray-50/80 dark:hover:bg-white/3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                )}
                                            >
                                                <div className="flex items-center gap-4 overflow-hidden">
                                                    <div className="w-5 flex justify-center shrink-0">
                                                        {isSolved ? (
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                                        ) : (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-[#1e1e1e] group-hover/prob:scale-125 transition-transform duration-300" />
                                                        )}
                                                    </div>
                                                    <span className={cn(
                                                        "truncate tracking-tight transition-all duration-300",
                                                        isCurrent ? "font-bold" : "font-semibold group-hover/prob:translate-x-1"
                                                    )}>
                                                        {prob.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 pl-2">
                                                     {prob.difficulty === "CONCEPT" && (
                                                         <span className="text-[9px] font-black text-indigo-500 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 px-1.5 py-0.5 rounded-md uppercase tracking-tighter border border-indigo-500/10">Theory</span>
                                                     )}
                                                     <div className="opacity-0 -translate-x-2 group-hover/prob:opacity-100 group-hover/prob:translate-x-0 transition-all duration-300">
                                                         <ChevronDown className="-rotate-90 w-3.5 h-3.5 text-gray-400" />
                                                     </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                    {!loadingCategoryProblems && (!categoryProblems[category.id] || categoryProblems[category.id].length === 0) && (!category.children || category.children.length === 0) && (
                                        <div className="py-8 flex flex-col items-center justify-center opacity-40">
                                            <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 mb-2" />
                                            <p className="text-[10px] text-gray-400 dark:text-gray-600 font-bold uppercase tracking-widest text-center">
                                                Module Content Coming Soon
                                            </p>
                                        </div>
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
