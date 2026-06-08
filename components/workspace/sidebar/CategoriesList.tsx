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
                ? "mb-4 border border-gray-100 dark:border-white/5 bg-white dark:bg-[#1D1E23]/40 backdrop-blur-sm shadow-sm rounded-2xl overflow-hidden"
                : "ml-4 border-l-2 border-gray-100 dark:border-white/5 mt-1"
        )}>
            <button
                onClick={() => onToggleCategory(category.id)}
                className={cn(
                    "w-full flex items-center justify-between transition-all text-left group",
                    level === 0 ? "px-5 py-4" : "pl-4 pr-5 py-3",
                    isExpanded && level === 0 ? "bg-orange-50/50 dark:bg-orange-500/5" : "hover:bg-gray-50 dark:hover:bg-white/5"
                )}
            >
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    {isExpanded ? (
                        <FolderOpen className={cn("shrink-0 transition-all duration-300 text-orange-500", level === 0 ? "w-5 h-5" : "w-4.5 h-4.5")} />
                    ) : (
                        <Folder className={cn("shrink-0 transition-all duration-300 text-gray-400 dark:text-gray-600 group-hover:text-orange-500/60", level === 0 ? "w-5 h-5" : "w-4.5 h-4.5")} />
                    )}
                    <span className={cn(
                        "font-bold tracking-tight truncate transition-colors duration-300",
                        level === 0 ? "text-[15px]" : "text-sm",
                        isExpanded ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200"
                    )}>
                        {category.name}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {categoryProblems[category.id] && (
                        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full border border-gray-200/50 dark:border-white/5">
                            {categoryProblems[category.id].length}
                        </span>
                    )}
                    <ChevronDown className={cn(
                        "w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-orange-500 transition-all duration-500 transform",
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
                           level === 0 ? "px-3 pb-3 pt-1 bg-gray-50/30 dark:bg-black/20" : "pb-1 pt-1"
                        )}>
                            {/* Render Sub-categories */}
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
                                <div className="flex flex-col items-center justify-center p-8 gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-orange-500/60" />
                                    <span className="text-[10px] text-gray-400 font-black tracking-widest animate-pulse">FETCHING CONTENT</span>
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
                                                    "group/prob flex items-center justify-between p-3 rounded-xl text-[13px] transition-all border border-transparent duration-300",
                                                    isCurrent
                                                        ? "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/50 dark:border-orange-500/20 shadow-sm"
                                                        : "hover:bg-white dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="w-5 flex justify-center shrink-0">
                                                        {isSolved ? (
                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                                                        ) : (
                                                            <div className={cn(
                                                                "w-1.5 h-1.5 rounded-full",
                                                                isCurrent ? "bg-orange-500" : "bg-gray-200 dark:bg-white/10"
                                                            )} />
                                                        )}
                                                    </div>
                                                    <span className={cn(
                                                        "truncate tracking-tight font-bold",
                                                        isCurrent ? "text-orange-700 dark:text-orange-400" : "text-gray-600 dark:text-gray-400 group-hover/prob:text-gray-900 dark:group-hover/prob:text-white"
                                                    )}>
                                                        {prob.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2 pl-2">
                                                     <div className="opacity-0 -translate-x-2 group-hover/prob:opacity-100 group-hover/prob:translate-x-0 transition-all duration-300">
                                                         <ChevronDown className="-rotate-90 w-3.5 h-3.5 text-gray-400" />
                                                     </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                    {(!categoryProblems[category.id] || categoryProblems[category.id].length === 0) && (!category.children || category.children.length === 0) && (
                                        <div className="py-10 flex flex-col items-center justify-center opacity-30 grayscale">
                                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 mb-3 flex items-center justify-center">
                                                <Folder className="w-4 h-4" />
                                            </div>
                                            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest text-center">
                                                No content available
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
            <div className="flex flex-col items-center justify-center p-24 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] animate-pulse">Syncing Library</span>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-24 opacity-40">
                <p className="text-sm font-bold text-gray-500">No categories found</p>
            </div>
        );
    }

    return (
        <div className="pb-16 pt-2">
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
