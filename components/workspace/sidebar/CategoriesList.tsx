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
            "rounded-xl overflow-hidden transition-all duration-300",
            level === 0 ? "mb-2" : "ml-4 border-l border-gray-100 dark:border-[#1a1a1a]"
        )}>
            <button
                onClick={() => onToggleCategory(category.id)}
                className={cn(
                    "w-full flex items-center justify-between transition-all text-left group",
                    level === 0
                        ? "p-4 bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.02] shadow-sm"
                        : "p-3 bg-transparent hover:bg-gray-100 dark:hover:bg-white/[0.04] rounded-lg"
                )}
            >
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <span className={cn(
                        "font-bold text-gray-800 dark:text-gray-200 truncate",
                        level === 0 ? "text-[15px]" : "text-sm font-semibold opacity-80"
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
                           "space-y-1 transition-all",
                           level === 0 ? "p-3 pt-2" : "p-1.5 pl-4"
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
                                <div className="space-y-0.5 mt-1">
                                    {categoryProblems[category.id]?.map((prob) => {
                                        const isSolved = solvedSet.has(prob.id);
                                        const isCurrent = currentProblemId === prob.id;

                                        return (
                                            <Link
                                                key={prob.id}
                                                href={`/problems/${prob.slug}`}
                                                className={cn(
                                                    "group/prob flex items-center justify-between p-3 rounded-xl text-[14px] transition-all border border-transparent",
                                                    isCurrent
                                                        ? "bg-orange-50/50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20 shadow-sm"
                                                        : "hover:bg-gray-100 dark:hover:bg-white/[0.04] text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                                )}
                                            >
                                                <div className="flex items-center gap-3.5 overflow-hidden">
                                                    <div className="w-5 flex justify-center shrink-0">
                                                        {isSolved ? (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                                                        ) : (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-800" />
                                                        )}
                                                    </div>
                                                    <span className={cn(
                                                        "truncate font-semibold tracking-tight transition-colors",
                                                        isCurrent ? "font-bold" : "font-medium"
                                                    )}>
                                                        {prob.title}
                                                    </span>
                                                </div>
                                                <div className="flex-shrink-0">
                                                     {prob.difficulty === "CONCEPT" && (
                                                         <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10 px-2 py-0.5 rounded-lg uppercase tracking-widest border border-indigo-500/10">Theory</span>
                                                     )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                    {!loadingCategoryProblems && (!categoryProblems[category.id] || categoryProblems[category.id].length === 0) && (!category.children || category.children.length === 0) && (
                                        <p className="text-[11px] text-gray-400 dark:text-gray-600 text-center py-6 font-bold uppercase tracking-[0.15em] opacity-80">
                                            Empty Module
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
