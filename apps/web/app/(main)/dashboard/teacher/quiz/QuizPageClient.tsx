"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SearchBar } from "@/app/(main)/problems/dsa/_components/shared/SearchBar";
import { QuizTemplateList } from "@/components/quiz/teacher/QuizTemplateList";
import { PageTooltip } from "@/components/shared/PageTooltip";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  explanation: string | null;
  timeLimit: number;
  order: number;
}

interface Assignment {
  id: string;
  classroom: { id: string; name: string; section: string | null };
  createdAt: string;
}

interface Template {
  id: string;
  title: string;
  description: string | null;
  questions: Question[];
  assignments: Assignment[];
  createdAt: string;
}

interface Props {
  templates: Template[];
}

export default function QuizPageClient({ templates }: Props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-4 sm:py-6 md:py-8"
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                Quizzes
              </h1>
              <PageTooltip description="Create, manage, and launch live quizzes for your students. Reuse templates across multiple classrooms." />
            </div>
            <Link
              href="/dashboard/teacher/quiz/create"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-xs font-bold hover:bg-orange-600 dark:hover:bg-orange-500 transition-all shadow-lg active:scale-[0.98] self-start sm:self-auto"
            >
              New Quiz
            </Link>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-6"
        >
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search quizzes..."
            className="w-full"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl"
        >
          <QuizTemplateList templates={templates} searchTerm={searchTerm} />
        </motion.div>
      </div>
    </motion.div>
  );
}
