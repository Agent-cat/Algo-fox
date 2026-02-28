"use client";

import { memo } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Difficulty } from "@prisma/client";
import { DIFFICULTY_COLORS } from "./constants";
import { motion } from "framer-motion";

interface ProblemRowProps {
    id: string;
    slug: string;
    title: string;
    difficulty: Difficulty;
    acceptance: number;
    isSolved?: boolean;
    index?: number;
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
    index = 0,
}: ProblemRowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Link
                href={`/problems/${slug}`}
                className="group grid grid-cols-12 gap-4 px-5 py-3.5 rounded-xl items-center transition-all duration-200 hover:bg-gray-50/80 dark:hover:bg-[#111111] border border-transparent hover:border-gray-100 dark:hover:border-[#1e1e1e]"
            >
                <div className="col-span-8 md:col-span-6 font-medium text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-200 flex items-center gap-2.5">
                    {isSolved && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    )}
                    {!isSolved && (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-200 dark:border-[#333] flex-shrink-0 group-hover:border-orange-300 dark:group-hover:border-orange-500/40 transition-colors duration-200" />
                    )}
                    <span className="truncate">{title}</span>
                </div>
                <div className="col-span-2 md:col-span-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}>
                        {getDifficultyLabel(difficulty)}
                    </span>
                </div>
                <div className="col-span-2 md:col-span-3 text-sm text-gray-500 dark:text-gray-400 font-mono tabular-nums">
                    {acceptance.toFixed(1)}%
                </div>
            </Link>
        </motion.div>
    );
}

export const ProblemRow = memo(ProblemRowComponent);
ProblemRow.displayName = "ProblemRow";
