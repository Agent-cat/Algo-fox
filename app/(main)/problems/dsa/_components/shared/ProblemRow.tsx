"use client";

import { memo } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Difficulty } from "@prisma/client";
import { DIFFICULTY_COLORS } from "./constants";
import { motion } from "framer-motion";

import CompanyAvatars from "@/components/problems/CompanyAvatars";

interface ProblemRowProps {
    id: string;
    slug: string;
    title: string;
    difficulty: Difficulty;
    acceptance: number;
    isSolved?: boolean;
    companies?: any;
    index?: number;
    variant?: "default" | "static";
}

function getDifficultyColor(difficulty: Difficulty): string {
    return DIFFICULTY_COLORS[difficulty] || "text-gray-500";
}

function getDifficultyLabel(difficulty: Difficulty): string {
    if (difficulty === "MEDIUM") return "Med.";
    return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
}

function ProblemRowComponent({
    slug,
    title,
    difficulty,
    acceptance,
    isSolved,
    companies,
    index = 0,
    variant = "default",
}: ProblemRowProps) {
    const isAlternate = index % 2 !== 0;

    const containerClasses = variant === "static"
        ? "bg-gray-100/60 dark:bg-[#282a30] border-gray-200 dark:border-[#2a2a2a]"
        : `hover:bg-gray-100/60 dark:hover:bg-[#282a30] hover:border-gray-200 dark:hover:border-[#2a2a2a] ${isAlternate ? 'bg-gray-100/60 dark:bg-[#282a30] border-gray-200 dark:border-[#2a2a2a]' : 'bg-transparent border-transparent'}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                href={`/problems/${slug}`}
                className={`group grid grid-cols-12 gap-4 md:gap-8 px-6 py-[13px] w-[calc(100%-7px)] mx-auto rounded-xl items-center transition-all duration-200 border ${containerClasses}`}
            >
                <div className="col-span-6 md:col-span-5 font-medium text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 flex items-center gap-3">
                    {isSolved && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    )}
                    {!isSolved && (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-200 dark:border-[#333] shrink-0 group-hover:border-orange-300 dark:group-hover:border-orange-500/40 transition-colors duration-200" />
                    )}
                    <span className="truncate">{title}</span>
                </div>
                <div className="col-span-2 md:col-span-2 flex justify-start md:justify-center">
                    <span className={`inline-flex items-center text-xs font-black uppercase tracking-widest ${getDifficultyColor(difficulty)}`}>
                        {getDifficultyLabel(difficulty)}
                    </span>
                </div>
                <div className="col-span-2 md:col-span-2 text-sm text-gray-500 dark:text-gray-400 font-mono tabular-nums flex justify-start md:justify-end">
                    {acceptance.toFixed(1)}%
                </div>
                <div className="col-span-2 md:col-span-3 flex justify-start md:justify-center">
                    <CompanyAvatars companies={companies} />
                </div>
            </Link>
        </motion.div>
    );
}

export const ProblemRow = memo(ProblemRowComponent);
ProblemRow.displayName = "ProblemRow";
