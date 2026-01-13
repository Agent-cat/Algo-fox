"use client";

import { memo } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Difficulty } from "@prisma/client";
import { DIFFICULTY_COLORS } from "./constants";

interface ProblemRowProps {
    id: string;
    slug: string;
    title: string;
    difficulty: Difficulty;
    acceptance: number;
    isSolved?: boolean;
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
}: ProblemRowProps) {
    return (
        <Link
            href={`/problems/${slug}`}
            className="grid grid-cols-12 gap-4 px-6 py-4 rounded-xl items-center transition-all duration-200 hover:bg-gray-50/50"
        >
            <div className="col-span-8 md:col-span-6 font-medium text-gray-900 hover:text-orange-600 transition-colors flex items-center gap-2">
                {isSolved && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
                <span className="truncate">{title}</span>
            </div>
            <div className="col-span-2 md:col-span-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                    {getDifficultyLabel(difficulty)}
                </span>
            </div>
            <div className="col-span-2 md:col-span-3 text-sm text-gray-500">
                {acceptance.toFixed(1)}%
            </div>
        </Link>
    );
}

export const ProblemRow = memo(ProblemRowComponent);
ProblemRow.displayName = "ProblemRow";
