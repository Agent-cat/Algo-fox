"use client";

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Problem } from '@prisma/client';
import { BadgeCheck, FileText, List, ShieldAlert, CheckCircle } from 'lucide-react';
import Submissions from './Submissions';
import { getPointsLabel } from '@/lib/points';
import { CommentTree } from '../problems/discussion/CommentTree';
import { useState } from 'react';
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import { remarkSolutionDirective, remarkMcqDirective } from "@/lib/markdown-plugins";
import { preprocessMarkdown } from "@/lib/markdown-utils";
import McqWidget from "@/components/markdown/McqWidget";
import remarkDirective from 'remark-directive';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

type Tab = "description" | "solutions" | "submissions";

interface ProblemDescriptionProps {
    problem: Problem & {
        tags?: { name: string; slug: string }[];
        solution?: string | null;
    };
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    isSolved: boolean;
    contestId?: string;
}

const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.97 }
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    exit: {
        opacity: 0,
        y: -6,
        filter: "blur(4px)",
        transition: { duration: 0.2, ease: "easeInOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.05 }
    }
};

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export default function ProblemDescription({ problem, activeTab, onTabChange, isSolved, contestId }: ProblemDescriptionProps) {
    const [solutionTab, setSolutionTab] = useState<"official" | "community">("official");

    const getDifficultyConfig = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return {
                text: "text-emerald-600 dark:text-emerald-400",
                bg: "bg-emerald-50 dark:bg-emerald-500/10",
                border: "border-emerald-200 dark:border-emerald-500/30",
                glow: "shadow-emerald-500/10 dark:shadow-emerald-500/5",
                dot: "bg-emerald-500"
            };
            case "MEDIUM": return {
                text: "text-amber-600 dark:text-amber-400",
                bg: "bg-amber-50 dark:bg-amber-500/10",
                border: "border-amber-200 dark:border-amber-500/30",
                glow: "shadow-amber-500/10 dark:shadow-amber-500/5",
                dot: "bg-amber-500"
            };
            case "HARD": return {
                text: "text-rose-600 dark:text-rose-400",
                bg: "bg-rose-50 dark:bg-rose-500/10",
                border: "border-rose-200 dark:border-rose-500/30",
                glow: "shadow-rose-500/10 dark:shadow-rose-500/5",
                dot: "bg-rose-500"
            };
            default: return {
                text: "text-gray-600 dark:text-gray-400",
                bg: "bg-gray-50 dark:bg-gray-500/10",
                border: "border-gray-200 dark:border-gray-500/30",
                glow: "shadow-gray-500/10",
                dot: "bg-gray-500"
            };
        }
    };

    const diffConfig = getDifficultyConfig(problem.difficulty);

    const tabs: { key: Tab; label: string; icon: React.ReactNode; contestOnly?: boolean }[] = [
        { key: "description", label: "Description", icon: <FileText className="w-4 h-4" /> },
        ...(!contestId ? [{ key: "solutions" as Tab, label: "Solutions", icon: <BadgeCheck className="w-4 h-4" /> }] : []),
        { key: "submissions", label: contestId ? "My Verdicts" : "Submissions", icon: <List className="w-4 h-4" /> },
    ];

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#0a0a0a]">
            {/* HEADER TABS */}
            <div className={`flex items-center gap-1 border-b border-gray-200/80 dark:border-[#1e1e1e] px-3 py-2 ${contestId ? 'bg-orange-50/30 dark:bg-orange-500/5' : 'bg-gray-50/30 dark:bg-[#0a0a0a]'}`}>
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.key}
                            onClick={() => onTabChange(tab.key)}
                            variants={tabVariants}
                            initial="inactive"
                            whileHover="hover"
                            whileTap="tap"
                            className={`
                                relative flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200 border
                                ${activeTab === tab.key
                                    ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border-transparent hover:bg-gray-100/50 dark:hover:bg-[#141414]/50"
                                }
                                ${tab.key === "solutions" && problem.difficulty === "CONCEPT" ? "opacity-50 cursor-not-allowed" : ""}
                            `}
                            disabled={tab.key === "solutions" && problem.difficulty === "CONCEPT"}
                        >
                            <span className={`transition-colors duration-200 ${activeTab === tab.key ? 'text-orange-500' : ''}`}>
                                {tab.icon}
                            </span>
                            {tab.label}
                            {activeTab === tab.key && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-[9px] left-2 right-2 h-[2px] bg-orange-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
                {contestId && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto flex items-center gap-2 px-2.5 py-1 bg-orange-100 dark:bg-orange-500/20 rounded-md text-orange-700 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider"
                    >
                        <ShieldAlert className="w-3 h-3" />
                        Secure
                    </motion.div>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">
                    {activeTab === "description" && (
                        <motion.div
                            key="description"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="px-6 py-6 space-y-6"
                        >
                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {/* Title with solved badge beside it */}
                                <motion.div variants={staggerItem} className="flex items-center gap-3 mb-4 flex-wrap">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                                        {problem.title}
                                    </h1>
                                    {isSolved && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span className="text-xs font-semibold">Solved</span>
                                        </motion.div>
                                    )}
                                </motion.div>

                                {/* Metadata row */}
                                <motion.div variants={staggerItem} className="flex items-center gap-3 flex-wrap">
                                    {/* Difficulty Badge with pulse dot */}
                                    <motion.span
                                        whileHover={{ scale: 1.05, y: -1 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className={`
                                            inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border
                                            ${diffConfig.text} ${diffConfig.bg} ${diffConfig.border}
                                            shadow-sm ${diffConfig.glow}
                                        `}
                                    >
                                        <span className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${diffConfig.dot} opacity-40`} />
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${diffConfig.dot}`} />
                                        </span>
                                        {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
                                    </motion.span>

                                    {/* Points - original style, no extra icon */}
                                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        {getPointsLabel(problem.difficulty)}
                                    </span>

                                    {/* Tags */}
                                    {problem.tags && problem.tags.length > 0 && (
                                        <div className="flex items-center gap-2">
                                            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
                                            {problem.tags.map((tag, idx) => (
                                                <motion.span
                                                    key={tag.slug}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.15 + idx * 0.05 }}
                                                    whileHover={{
                                                        scale: 1.05,
                                                        y: -1,
                                                        transition: { type: "spring", stiffness: 400, damping: 15 }
                                                    }}
                                                    className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#262626] cursor-default hover:border-orange-200 dark:hover:border-orange-500/30 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                                                >
                                                    {tag.name}
                                                </motion.span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>

                            {/* Description Markdown content */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="prose prose-[1rem] max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 select-none prose-code:rounded prose-code:font-mono prose-pre:bg-gray-50 dark:prose-pre:bg-[#141414] prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-[#262626]"
                            >
                                <Markdown
                                    remarkPlugins={[remarkDirective, remarkGfm, remarkBreaks, remarkMcqDirective]}
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        // @ts-ignore
                                        'mcq-widget': McqWidget
                                    }}
                                >
                                    {problem.description}
                                </Markdown>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === "submissions" && (
                        <motion.div
                            key="submissions"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Submissions problemId={problem.id} />
                        </motion.div>
                    )}

                    {activeTab === "solutions" && (
                        <motion.div
                            key="solutions"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="flex flex-col h-full"
                        >
                            {/* Sub-tabs */}
                            <div className="flex items-center gap-4 px-6 border-b border-gray-100 dark:border-[#1e1e1e] bg-gray-50/30 dark:bg-[#0d0d0d]">
                                {(["official", "community"] as const).map((tab) => (
                                    <motion.button
                                        key={tab}
                                        onClick={() => setSolutionTab(tab)}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`relative py-3 text-sm font-bold transition-colors ${
                                            solutionTab === tab
                                                ? "text-orange-600 dark:text-orange-500"
                                                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                        }`}
                                    >
                                        {tab === "official" ? "Official Solution" : "Community"}
                                        {solutionTab === tab && (
                                            <motion.div
                                                layoutId="solutionTabIndicator"
                                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 rounded-full"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                                <AnimatePresence mode="wait">
                                    {solutionTab === "official" ? (
                                        isSolved ? (
                                            <motion.div
                                                key="official-content"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                transition={{ duration: 0.3 }}
                                                className="prose max-w-none prose-slate dark:prose-invert
                                                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                                                    prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7
                                                    prose-li:text-gray-700 dark:prose-li:text-gray-300
                                                    prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                                                    prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-code:bg-orange-50 dark:prose-code:bg-orange-950/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                                                    prose-pre:bg-white dark:prose-pre:bg-[#0a0a0a] prose-pre:p-0 prose-pre:m-0 prose-pre:border-none prose-pre:shadow-none prose-pre:rounded-lg prose-pre:my-6
                                                    prose-img:rounded-lg prose-img:border prose-img:border-gray-100 dark:prose-img:border-[#262626] prose-img:my-6
                                                    prose-blockquote:border-l-2 prose-blockquote:border-orange-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-[#1a1a1a] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:not-italic prose-blockquote:my-6"
                                            >
                                                {problem.solution ? (
                                                    <Markdown
                                                        remarkPlugins={[
                                                            remarkGfm,
                                                            remarkBreaks,
                                                            remarkDirective,
                                                            remarkSolutionDirective
                                                        ]}
                                                        rehypePlugins={[rehypeRaw]}
                                                        components={{
                                                            // @ts-ignore
                                                            'solution-group': SolutionCodeGroup
                                                        }}
                                                    >
                                                        {preprocessMarkdown(problem.solution)}
                                                    </Markdown>
                                                ) : (
                                                    <div className="text-gray-500 dark:text-gray-400 italic text-center py-10">
                                                        No official solution has been provided for this problem yet.
                                                    </div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="official-locked"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex flex-col items-center justify-center py-20 px-10 text-center space-y-4"
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.05, 1],
                                                    }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-16 h-16 bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-gray-200 dark:border-[#262626]"
                                                >
                                                    <BadgeCheck className="w-8 h-8 text-gray-400" />
                                                </motion.div>
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Solution Locked</h2>
                                                <p className="text-gray-600 dark:text-gray-400 max-w-xs text-sm leading-relaxed">
                                                    You need to successfully solve this problem to unlock the official solution.
                                                </p>
                                            </motion.div>
                                        )
                                    ) : (
                                        <motion.div
                                            key="community"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CommentTree problemId={problem.id} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div >
    );
}
