"use client";

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { CheckCircle, ArrowRight, Tag } from 'lucide-react';
import CompaniesModal from '../problems/CompaniesModal';
import { parseCompanies } from '../problems/CompanyAvatars';

interface ProblemMetadataProps {
    problem: {
        title: string;
        difficulty: string;
        points?: number;
        score?: number;
        tags?: { name: string; slug: string }[];
        companies?: any;
    };
    isSolved: boolean;
    domain?: string;
    nextProblemSlug?: string | null;
    courseId?: string | null;
    router: any;
    onOpenTags?: () => void;
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

export const ProblemMetadata = React.memo(({ problem, isSolved, domain, nextProblemSlug, courseId, router, onOpenTags }: ProblemMetadataProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const diffConfig = getDifficultyConfig(problem.difficulty);
    const companiesList = parseCompanies(problem.companies);

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

            {/* Companies Badge */}
            {companiesList.length > 0 && (
                <>
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="group inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[12px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 hover:bg-gray-200/70 dark:hover:bg-white/10 cursor-pointer transition-all duration-200 hover:shadow-sm"
                    >
                        {/* Stacked mini-logos (up to 3) */}
                        <span className="flex items-center -space-x-1.5">
                            {companiesList.slice(0, 3).map((c, i) => (
                                <span
                                    key={i}
                                    className="w-4 h-4 rounded-full bg-white border border-gray-200 dark:border-white/20 overflow-hidden flex items-center justify-center shadow-xs shrink-0"
                                    style={{ zIndex: 3 - i }}
                                >
                                    {c.logo ? (
                                        <img src={c.logo} alt={c.name} className="w-full h-full object-contain p-[1px]" />
                                    ) : (
                                        <span className="text-[6px] font-bold text-gray-500 uppercase">{c.name.charAt(0)}</span>
                                    )}
                                </span>
                            ))}
                        </span>
                        {companiesList.length} {companiesList.length === 1 ? "Company" : "Companies"}
                    </button>
                    <CompaniesModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        companies={problem.companies}
                        problemTitle={problem.title}
                    />
                </>
            )}


            {/* Points */}
            {(typeof problem.points === 'number' || typeof problem.score === 'number') && (
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-[13px] font-medium">
                    {problem.points ?? problem.score ?? 0} pts
                </div>
            )}

            {/* Tags Button */}
            {problem.tags && problem.tags.length > 0 && (
                <>
                    <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
                    <button
                        type="button"
                        onClick={() => {
                            if (onOpenTags) onOpenTags();
                            else window.dispatchEvent(new Event('open-tags-accordion'));
                            setTimeout(() => {
                                document.getElementById('tags-accordion-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }, 100);
                        }}
                        className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-[13px] font-medium cursor-pointer"
                    >
                        <Tag className="w-3.5 h-3.5" />
                        Tags
                    </button>
                </>
            )}

        </motion.div>
    );
});
