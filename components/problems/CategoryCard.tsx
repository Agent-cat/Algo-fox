"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getCategoryProblems } from "@/actions/category.action";
import { Difficulty, Problem } from "@prisma/client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type ProblemWithStats = Problem & { acceptance: number; isSolved?: boolean };

interface CategoryCardProps {
  id: string;
  name: string;
  description?: string | null;
  problemCount: number;
}

export default function CategoryCard({ id, name, description, problemCount }: CategoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadProblems = useCallback(async (pageNum: number = 1, append: boolean = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const res = await getCategoryProblems(id, pageNum, 10);
      if (append) {
        setProblems((prev) => [...prev, ...res.problems]);
      } else {
        setProblems(res.problems);
      }
      setPage(pageNum);
      setHasMore(pageNum < res.totalPages);
    } catch (error) {
      console.error("Failed to load category problems:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [id, isLoading]);

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
    switch (difficulty) {
      case "EASY":
        return "text-emerald-500 bg-emerald-50/50";
      case "MEDIUM":
        return "text-amber-500 bg-amber-50/50";
      case "HARD":
        return "text-rose-500 bg-rose-50/50";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-6">
      <motion.button
        onClick={handleToggle}
        className="w-full bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-orange-300 transition-all text-left shadow-sm hover:shadow-md"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
            {description && (
              <p className="text-gray-600 text-sm mb-2">{description}</p>
            )}
            <p className="text-gray-500 text-sm">{problemCount} problems</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <ChevronUp className="w-6 h-6 text-gray-400" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-400" />
            )}
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-gray-50 rounded-xl p-6 border border-gray-100">
              {isInitialLoad ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : problems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No problems in this category yet.
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    {problems.map((problem) => (
                      <motion.div
                        key={problem.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group"
                      >
                        <Link
                          href={`/problems/${problem.slug}`}
                          className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                        >
                          <div className="flex items-center gap-3 flex-1">
                            {problem.isSolved && (
                              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                            )}
                            <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                              {problem.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                                problem.difficulty
                              )}`}
                            >
                              {problem.difficulty === "MEDIUM"
                                ? "Med."
                                : problem.difficulty.charAt(0) +
                                  problem.difficulty.slice(1).toLowerCase()}
                            </span>
                            <span className="text-sm text-gray-500 min-w-[60px] text-right">
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
                      className="flex justify-center mt-6 min-h-[40px]"
                    >
                      {isLoading && (
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                          <span className="text-sm">Loading more...</span>
                        </div>
                      )}
                    </div>
                  )}

                  {!hasMore && problems.length > 0 && (
                    <div className="text-center mt-6 text-sm text-gray-400">
                      All problems loaded.
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


