"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getCategoryProblems } from "@/actions/category.action";
import { Difficulty, Problem } from "@prisma/client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { DIFFICULTY_COLORS, INTERSECTION_THRESHOLD } from "../shared/constants";

type ProblemWithStats = Problem & { acceptance: number; isSolved?: boolean };

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string | null;
  problemCount: number;
  solvedCount: number;
}

export default function CategoryCard({ id, name, description, problemCount, solvedCount }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const progressPercentage = problemCount > 0 ? (solvedCount / problemCount) * 100 : 0;
  const isCompleted = problemCount > 0 && solvedCount === problemCount;

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
      <motion.button
        onClick={handleToggle}
        className="w-full bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-all text-left hover:shadow-md"
        whileHover={{ scale: 1.005, y: -1 }}
        whileTap={{ scale: 0.998 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base font-semibold text-gray-900">{name}</h3>
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                </motion.div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="flex-1 bg-white/40 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-gray-200/50 shadow-inner relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500/90 to-orange-600/90 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent" />
                  </motion.div>
                </div>
                <span className="text-xs text-gray-600 font-medium min-w-[40px] text-right">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-xs font-medium">{solvedCount}/{problemCount}</span>
              <span className="text-gray-500 text-xs">problems solved</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-4"
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.button>

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
            <div className="mt-3 bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 border border-gray-200 shadow-sm">
              {isInitialLoad ? (
                <LoadingSpinner size="md" className="py-6" />
              ) : problems.length === 0 ? (
                <div className="text-center py-6 text-gray-500 text-sm">
                  No problems in this category yet.
                </div>
              ) : (
                <>
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
                          className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-all border border-gray-100 hover:border-gray-200 hover:shadow-sm"
                        >
                          <div className="flex items-center gap-2.5 flex-1">
                            {problem.isSolved && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            )}
                            <span className="font-medium text-gray-900 text-sm group-hover:text-gray-700 transition-colors">
                              {problem.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(
                                problem.difficulty
                              )}`}
                            >
                              {problem.difficulty === "MEDIUM"
                                ? "Med."
                                : problem.difficulty.charAt(0) +
                                problem.difficulty.slice(1).toLowerCase()}
                            </span>
                            <span className="text-xs text-gray-500 min-w-[50px] text-right">
                              {problem.acceptance.toFixed(1)}%
                            </span>
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

