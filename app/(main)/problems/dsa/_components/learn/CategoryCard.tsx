"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2, Download, Folder, FolderOpen } from "lucide-react";
import DownloadProgressModal from "@/components/problems/DownloadProgressModal";
import { getCategoryProblems } from "@/actions/category.action";
import { Difficulty, Problem } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { DIFFICULTY_COLORS, INTERSECTION_THRESHOLD } from "../shared/constants";

type ProblemWithStats = Problem & { acceptance: number; isSolved?: boolean };

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string | null;
  problemCount: number;
  solvedCount: number;
  displayOrder?: string;
  subCategories?: any[];
  isSubCategory?: boolean;
  userRole?: string;
  domain: string;
}

export default function CategoryCard({
  id,
  name,
  description,
  problemCount,
  solvedCount,
  displayOrder,
  subCategories = [],
  isSubCategory = false,
  userRole,
  domain
}: CategoryCardProps) {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const canDownload = userRole === "TEACHER" || userRole === "INSTITUTION_MANAGER";
  const [isExpanded, setIsExpanded] = useState(false);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Helper to get recursive counts
  const getRecursiveCounts = useCallback((cat: any) => {
    let pCount = cat._count?.categoryProblems || 0;
    let sCount = cat.solvedCount || 0;

    if (cat.children && cat.children.length > 0) {
      cat.children.forEach((child: any) => {
        const childCounts = getRecursiveCounts(child);
        pCount += childCounts.pCount;
        sCount += childCounts.sCount;
      });
    }
    return { pCount, sCount };
  }, []);

  const { pCount: totalProblemCount, sCount: totalSolvedCount } = getRecursiveCounts({
    _count: { categoryProblems: problemCount },
    solvedCount,
    children: subCategories
  });

  const progressPercentage = totalProblemCount > 0 ? (totalSolvedCount / totalProblemCount) * 100 : 0;
  const isCompleted = totalProblemCount > 0 && totalSolvedCount === totalProblemCount;

  const loadProblems = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const cursor = append && problems.length > 0 ? problems[problems.length - 1].id : undefined;
      const res = await getCategoryProblems(id, pageNum, 10, cursor);

      if (append) {
        setProblems((prev) => [...prev, ...res.problems]);
      } else {
        setProblems(res.problems);
      }
      setPage(pageNum);
      setHasMore(res.problems.length > 0 && pageNum < res.totalPages);
    } catch (error) {
      console.error("Failed to load category problems:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [id, isLoading, problems]);

  const handleToggle = () => {
    if (!isExpanded && problems.length === 0) {
      setIsInitialLoad(true);
      loadProblems(1, false);
    }
    setIsExpanded(!isExpanded);
  };

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    loadProblems(page + 1, true);
  }, [isLoading, hasMore, page, loadProblems]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!isExpanded || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [isExpanded, hasMore, isLoading, loadMore]);

  const getDifficultyColor = (difficulty: Difficulty) => {
    return DIFFICULTY_COLORS[difficulty] || "text-gray-500";
  };

  return (
    <motion.div
      className="w-full mb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDownloadModalOpen && (
        <DownloadProgressModal
          isOpen={isDownloadModalOpen}
          onClose={() => setIsDownloadModalOpen(false)}
          categoryTitle={name}
          categoryId={id}
          userRole={userRole!}
          domain={domain}
        />
      )}
      <div
        className={cn(
          "w-full transition-all group flex",
          isSubCategory
            ? "bg-transparent border-none py-1.5 hover:bg-gray-100/70 dark:hover:bg-white/4 rounded-lg group/sub"
            : "bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border border-gray-200/50 dark:border-white/5 rounded-2xl hover:bg-white dark:hover:bg-white/2 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.08)] transition-all duration-300"
        )}
      >
        <motion.button
          onClick={handleToggle}
          className="flex-1 py-3 px-4 text-left focus:outline-none"
          whileTap={{ scale: 0.998 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 flex justify-center shrink-0">
              <motion.div
                initial={false}
                animate={{ scale: isExpanded ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {isExpanded ? (
                  <FolderOpen className={cn("text-orange-500 dark:text-orange-400 shrink-0", isSubCategory ? "w-3.5 h-3.5" : "w-4.5 h-4.5")} />
                ) : (
                  <Folder className={cn("text-gray-400 dark:text-gray-500 shrink-0", isSubCategory ? "w-3.5 h-3.5" : "w-4.5 h-4.5")} />
                )}
              </motion.div>
            </div>
            <span className="text-gray-400 font-bold text-xs md:text-sm min-w-6 tabular-nums text-center">{displayOrder ? `${displayOrder}${!isSubCategory ? "." : ""}` : "•"}</span>
            <h3 className={cn(
              "font-semibold transition-colors tracking-tight",
              isSubCategory ? "text-xs md:text-[13px] text-gray-500 dark:text-gray-400 group-hover/sub:text-gray-900 dark:group-hover/sub:text-white" : "text-sm md:text-[15px] text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
            )}>
              {name}
            </h3>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-4 flex-1 max-w-[400px] justify-end">
            <div className="flex items-center gap-3 w-full max-w-[280px]">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-400 tabular-nums whitespace-nowrap">
                ({totalSolvedCount}/{totalProblemCount})
              </span>
              <div className="flex-1 bg-gray-100 dark:bg-[#1f1f1f] h-3.5 rounded-sm overflow-hidden relative">
                <motion.div
                  className="h-full bg-linear-to-r from-orange-500 to-orange-400 shadow-[0_0_8px_rgba(233,78,36,0.3)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <div className="shrink-0">
              {isExpanded ? (
                <Minus className={cn("text-gray-400 group-hover:text-gray-700 transition-colors", isSubCategory ? "w-3.5 h-3.5" : "w-5 h-5")} />
              ) : (
                <Plus className={cn("text-gray-400 group-hover:text-gray-700 transition-colors", isSubCategory ? "w-3.5 h-3.5" : "w-5 h-5")} />
              )}
            </div>
          </div>
        </div>
      </motion.button>
        {canDownload && (
          <div className="flex items-center px-4 border-l border-gray-100 dark:border-[#2a2a2a]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDownloadModalOpen(true);
              }}
              title="Download Progress"
              className="p-2 text-gray-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className={cn(
              "mt-1.5 ml-1 pl-2.5 border-l-2 border-orange-500/20 dark:border-orange-500/15 space-y-2",
              !isSubCategory && "pb-4 mb-2"
            )}>
              {/* Render Sub-categories first if they exist */}
              {subCategories && subCategories.length > 0 && (
                <div className="space-y-1">
                  {subCategories.map((subCat) => (
                    <CategoryCard
                      key={subCat.id}
                      id={subCat.id}
                      name={subCat.name}
                      description={subCat.description}
                      problemCount={subCat._count?.categoryProblems || 0}
                      solvedCount={subCat.solvedCount || 0}
                      displayOrder={subCat.displayOrder}
                      subCategories={subCat.children}
                      isSubCategory={true}
                      userRole={userRole}
                      domain={domain}
                    />
                  ))}
                </div>
              )}

              {isInitialLoad ? (
                <LoadingSpinner size="md" className="py-6" />
              ) : problems.length === 0 ? (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
                  No problems in this category yet.
                </div>
              ) : (
                <>
                  <div className="space-y-1">
                    {problems.map((problem, index) => (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03, duration: 0.2 }}
                      >
                        <Link
                          href={`/problems/${problem.slug}`}
                          className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-100 dark:hover:bg-white/4 transition-all group/item border border-transparent hover:border-gray-200 dark:hover:border-white/5"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 flex justify-center">
                              {problem.isSolved ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 group-hover/item:bg-orange-500/50 transition-colors" />
                              )}
                            </div>
                            <span className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover/item:text-gray-900 dark:group-hover/item:text-white transition-colors">
                              {problem.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-6">
                            <span
                              className={cn(
                                "text-[11px] font-black uppercase tracking-widest",
                                getDifficultyColor(problem.difficulty)
                              )}
                            >
                              {problem.difficulty}
                            </span>
                            {problem.difficulty !== "CONCEPT" && (
                              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 tabular-nums min-w-16 text-right">
                                {problem.acceptance.toFixed(1)}%
                              </span>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  {/* Infinite Scroll Trigger */}
                  {hasMore && (
                    <div
                      ref={observerTarget}
                      className="flex justify-center mt-4 min-h-[30px]"
                    >
                      {isLoading && <LoadingSpinner size="sm" message="Loading more..." />}
                    </div>
                  )}

                  {/* End of list indicator removed as requested */}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

