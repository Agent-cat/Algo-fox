"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/app/(main)/problems/dsa/_components/shared/SearchBar";
import { ProblemRow } from "@/app/(main)/problems/dsa/_components/shared/ProblemRow";
import { Search, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Difficulty } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

interface ProblemWithStatus {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  acceptance: number;
  isSolved?: boolean;
  companies?: any;
}

interface TopicProblemsClientProps {
  topicName: string;
  problems: ProblemWithStatus[];
  solvedCount: number;
  totalProblems: number;
}

export function TopicProblemsClient({
  topicName,
  problems,
  solvedCount,
  totalProblems,
}: TopicProblemsClientProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProblems = useMemo(() => {
    if (!searchTerm) return problems;
    const term = searchTerm.toLowerCase();
    return problems.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.difficulty.toLowerCase().includes(term)
    );
  }, [problems, searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pb-8"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Page Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-8 -mx-6 lg:-mx-12"
        >
          <div
            className="
              relative overflow-hidden rounded-none
              bg-[#FAFAFA] dark:bg-[#1a1b23]
              border-y border-gray-200 dark:border-white/10
              px-6 py-10 lg:px-12
            "
          >
            <div className="absolute inset-0 bg-[url('/topography.svg')] bg-cover bg-center opacity-10 dark:opacity-5 pointer-events-none" />

            <div className="relative">
              <div className="max-w-7xl mx-auto w-full">
                <Link
                  href="/topics"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
                  {topicName}
                </h1>

                <div className="mb-2.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      Solved [{solvedCount}/{totalProblems}]
                    </span>
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      {totalProblems > 0
                        ? `${((solvedCount / totalProblems) * 100).toFixed(1)}%`
                        : "0.0%"}
                    </span>
                  </div>

                  <div className="w-full h-1 rounded-full bg-gray-200 dark:bg-gray-700/60 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: totalProblems > 0
                          ? `${(solvedCount / totalProblems) * 100}%`
                          : "0%",
                      }}
                      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                      className="h-full rounded-full bg-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto w-full">
          {/* HEADER TOOLS */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
          >
            <SearchBar
              onSearch={setSearchTerm}
              placeholder="Search problems..."
              className="w-full md:flex-1"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl overflow-hidden"
          >
            <div className="px-5 pt-4 pb-2 flex items-center justify-end">
              <div
                className="flex items-center gap-2.5 whitespace-nowrap flex-shrink-0 pl-1 pr-2"
                role="img"
                aria-label={`Problems solved: ${solvedCount} out of ${totalProblems}`}
              >
                <svg width={16} height={16} viewBox="0 0 16 16" className="transform -rotate-90">
                  <circle cx={8} cy={8} r={6.5} stroke="currentColor" strokeWidth={2} fill="none" className="text-gray-200 dark:text-[#333333]" />
                  <circle
                    cx={8}
                    cy={8}
                    r={6.5}
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                    strokeDasharray={40.84}
                    strokeDashoffset={totalProblems > 0 ? 40.84 - (solvedCount / totalProblems) * 40.84 : 40.84}
                    strokeLinecap="round"
                    className="text-orange-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <span className="text-[13px] font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                  {solvedCount}/{totalProblems} Solved
                </span>
              </div>
            </div>

            {/* Problem List */}
            <div className="w-full">
              {/* List Header */}
              <div className="bg-[#FDFDFD] dark:bg-[#222328] border border-gray-200 dark:border-white/10 rounded-xl mb-3">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-4 md:gap-8 px-6 py-3.5 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest"
                >
                  <div className="col-span-6 md:col-span-5">Title</div>
                  <div className="col-span-2 md:col-span-2 md:text-center">Difficulty</div>
                  <div className="col-span-2 md:col-span-2 md:text-right">Acceptance</div>
                  <div className="col-span-2 md:col-span-3 md:text-center">Company</div>
                </motion.div>
              </div>

              {/* List Items */}
              <div className="mt-1">
                <AnimatePresence mode="wait">
                  {filteredProblems.length > 0 ? (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-2"
                    >
                      {filteredProblems.map((problem, idx) => (
                        <ProblemRow
                          key={problem.id}
                          id={problem.id}
                          slug={problem.slug}
                          title={problem.title}
                          difficulty={problem.difficulty}
                          acceptance={problem.acceptance}
                          isSolved={problem.isSolved}
                          companies={problem.companies}
                          index={idx}
                          variant="static"
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-24"
                    >
                      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-50 dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                      </div>
                      <div className="text-gray-400 dark:text-gray-500 font-medium">No problems found</div>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1.5">
                        {searchTerm ? "Try adjusting your search terms." : "No problems available in this topic."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!searchTerm && filteredProblems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mt-10 mb-4 text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide"
                >
                  — End of list —
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
