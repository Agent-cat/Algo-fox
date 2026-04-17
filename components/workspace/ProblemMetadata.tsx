"use client";
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface ProblemMetadataProps {
    problem: {
        difficulty: string;
        points?: number;
        score?: number;
        tags?: { name: string; slug: string }[];
    };
    isSolved: boolean;
    domain?: string;
    nextProblemSlug?: string | null;
    router: any;
}

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as any }
    }
};

const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
        case "EASY": return {
            text: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-500/10",
            border: "border-emerald-200 dark:border-emerald-500/30",
            dot: "bg-emerald-500"
        };
        case "MEDIUM": return {
            text: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-500/10",
            border: "border-amber-200 dark:border-amber-500/30",
            dot: "bg-amber-500"
        };
        case "HARD": return {
            text: "text-rose-600 dark:text-rose-400",
            bg: "bg-rose-50 dark:bg-rose-500/10",
            border: "border-rose-200 dark:border-rose-500/30",
            dot: "bg-rose-500"
        };
        default: return {
            text: "text-gray-600 dark:text-gray-400",
            bg: "bg-gray-50 dark:bg-gray-500/10",
            border: "border-gray-200 dark:border-gray-500/30",
            dot: "bg-gray-500"
        };
    }
};

export const ProblemMetadata = React.memo(({ problem, isSolved, domain, nextProblemSlug, router }: ProblemMetadataProps) => {
    const diffConfig = getDifficultyConfig(problem.difficulty);

    const formatDifficulty = (difficulty: string) => {
        return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
    };

    return (
        <motion.div variants={staggerItem} className="flex items-center gap-3 flex-wrap">
            {/* Difficulty Badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[12px] font-bold ${diffConfig.bg} ${diffConfig.text} ${diffConfig.border}`}>
                <span className={`w-2 h-2 rounded-full ${diffConfig.dot}`} />
                {formatDifficulty(problem.difficulty)}
            </div>

            {/* Points */}
            {(typeof problem.points === 'number' || typeof problem.score === 'number') && (
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-[13px] font-medium">
                    {problem.points ?? problem.score ?? 0} pts
                </div>
            )}

            {/* Separator if tags exist */}
            {problem.tags && problem.tags.length > 0 && (
                <div className="w-px h-4 bg-gray-200 dark:bg-[#262626]" />
            )}

            {/* Tags */}
            <div className="flex items-center gap-2">
                {problem.tags?.map((tag) => (
                    <div
                        key={tag.slug}
                        className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] text-gray-400 dark:text-gray-500 text-[12px] font-medium transition-colors cursor-default"
                    >
                        {tag.name.toLowerCase()}
                    </div>
                ))}
            </div>

            {/* Next Problem Shortcut */}
            {nextProblemSlug && (
                <button
                    onClick={() => router.push(`/problems/${nextProblemSlug}`)}
                    className="group ml-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/5 hover:bg-orange-500/10 border border-orange-500/10 hover:border-orange-500/20 text-orange-600 dark:text-orange-400 text-[11px] font-bold uppercase tracking-wider transition-all"
                >
                    Next Problem
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
            )}
        </motion.div>
    );
});
