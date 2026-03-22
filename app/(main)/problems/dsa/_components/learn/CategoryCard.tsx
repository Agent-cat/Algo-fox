"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, CheckCircle2, Download } from "lucide-react";
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
        className="w-full bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-md hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all group flex"
      >
        <motion.button
          onClick={handleToggle}
          className="flex-1 py-3 px-4 text-left focus:outline-none"
          whileTap={{ scale: 0.998 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-medium text-sm min-w-[1.2rem]">{displayOrder || "•"}</span>
            <h3 className={`text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors ${isSubCategory ? "text-xs md:text-sm" : ""}`}>
              {name}
            </h3>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
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
                  className="h-full bg-[#E94E24]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
            <div className="flex-shrink-0">
              {isExpanded ? (
                <Minus className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
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
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className={`mt-3 bg-gradient-to-b from-gray-50 dark:from-[#1a1a1a] to-white dark:to-[#141414] rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm ${isSubCategory ? 'p-2 mt-2' : 'p-4'}`}>
              {/* Render Sub-categories first if they exist */}
              {subCategories && subCategories.length > 0 && (
                <div className="mb-4 space-y-2 pl-4 border-l-2 border-orange-500/40 dark:border-orange-500/30">
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
                  <div className={cn("space-y-4", isSubCategory && "pl-5 border-l-2 border-orange-500/20 dark:border-orange-500/10 ml-3")}>
                    <div className="space-y-2">
                      {problems.map((problem, index) => (
                        <motion.div
                          key={problem.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="group"
                        >
                          <Link
                            href={`/problems/${problem.slug}`}
                            className="flex items-center justify-between p-3 bg-white dark:bg-[#141414] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all border border-gray-100 dark:border-[#262626] hover:border-gray-200 dark:hover:border-[#333333] hover:shadow-sm"
                          >
                            <div className="flex items-center gap-2.5 flex-1">
                              {problem.isSolved && (
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                              )}
                              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                                {problem.title}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(
                                  problem.difficulty
                                )}`}
                              >
                                {problem.difficulty === "CONCEPT"
                                  ? "Concept"
                                  : problem.difficulty === "MEDIUM"
                                  ? "Med."
                                  : problem.difficulty.charAt(0) +
                                    problem.difficulty.slice(1).toLowerCase()}
                              </span>
                              {problem.difficulty !== "CONCEPT" && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 min-w-[50px] text-right">
                                  {problem.acceptance.toFixed(1)}%
                                </span>
                              )}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
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

