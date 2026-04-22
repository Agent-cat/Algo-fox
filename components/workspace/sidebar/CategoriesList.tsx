"use client";

import { ChevronDown, Loader2, Folder, FolderOpen } from "lucide-react";
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
    courseId?: string | null;
}

function CategoryItem({
    category,
    expandedCategories,
    categoryProblems,
    loadingCategoryProblems,
    solvedSet,
    currentProblemId,
    onToggleCategory,
    courseId,
    level = 0
}: {
    category: CategorySimple;
    expandedCategories: string[];
    categoryProblems: Record<string, ProblemSimple[]>;
    loadingCategoryProblems: string | null;
    solvedSet: Set<string>;
    currentProblemId: string;
    onToggleCategory: (categoryId: string) => void;
    courseId?: string | null;
    level?: number;
}) {
    const isExpanded = expandedCategories.includes(category.id);

    return (
        <div className={cn(
            "transition-all duration-300",
            level === 0
                ? "mb-4 border border-gray-100/60 dark:border-white/5 bg-white/40 dark:bg-[#121212]/40 backdrop-blur-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] rounded-2xl"
                : "ml-3 border-l-2 border-gray-200/50 dark:border-white/5 mt-1"
        )}>
            <button
                onClick={() => onToggleCategory(category.id)}
                className={cn(
                    "w-full flex items-center justify-between transition-all text-left group",
                    level === 0 ? "px-4 py-3" : "pl-3 pr-4 py-2.5",
                    isExpanded && level === 0 ? "bg-orange-50/30 dark:bg-orange-500/3" : "hover:bg-gray-50/50 dark:hover:bg-white/1"
                )}
            >
                <div className="flex items-center gap-3.5 flex-1 overflow-hidden">
                    {isExpanded ? (
                        <FolderOpen className={cn("shrink-0 transition-all duration-300 text-orange-500", level === 0 ? "w-4 h-4" : "w-3.5 h-3.5")} />
                    ) : (
                        <Folder className={cn("shrink-0 transition-all duration-300 text-gray-400 dark:text-gray-500", level === 0 ? "w-4 h-4" : "w-3.5 h-3.5")} />
                    )}
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
                        "w-4 h-4 text-gray-400 group-hover:text-orange-500 transition-all duration-500 transform",
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
                           "transition-all",
                           level === 0 ? "px-3 pb-3 pt-1 bg-[#fafafa] dark:bg-[#121212]" : "pb-1 pt-1"
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
                                            courseId={courseId}
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
                                                href={`/problems/${prob.slug}${courseId ? `?courseId=${courseId}` : ""}`}
                                                className={cn(
                                                    "group/prob flex items-center justify-between p-2.5 rounded-xl text-[13px] transition-all border border-transparent duration-300",
                                                    isCurrent
                                                        ? "bg-orange-50/60 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/40 dark:border-orange-500/20 shadow-[0_2px_10px_-4px_rgba(249,115,22,0.15)]"
                                                        : "hover:bg-white dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:shadow-sm"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-5 flex justify-center shrink-0">
                                                        {isSolved ? (
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                                        ) : (
                                                            <div className={cn("w-1.5 h-1.5 rounded-full", level === 0 ? "bg-gray-200 dark:bg-[#1e1e1e]" : "bg-gray-300/60 dark:bg-white/10")} />
                                                        )}
                                                    </div>
                                                    <span className={cn(
                                                        "truncate tracking-tight",
                                                        isCurrent ? "font-bold text-orange-700 dark:text-orange-400" : "font-medium group-hover/prob:text-gray-900 dark:group-hover/prob:text-white transition-colors"
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
                                    {(!categoryProblems[category.id] || categoryProblems[category.id].length === 0) && (!category.children || category.children.length === 0) && (
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
    onToggleCategory,
    courseId
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
                    courseId={courseId}
                    level={0}
                />
            ))}
        </div>
    );
}
