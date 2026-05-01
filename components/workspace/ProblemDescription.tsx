"use client";
import React, { memo, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Problem } from '@prisma/client';
import { BadgeCheck, FileText, List, ShieldAlert, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import Submissions from './Submissions';
import McqWidget from "@/components/markdown/McqWidget";
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import remarkDirective from 'remark-directive';
import { remarkMcqDirective, remarkSolutionDirective } from '@/lib/markdown-plugins';
import { preprocessMarkdown } from '@/lib/markdown-utils';
import { ProblemMetadata } from './ProblemMetadata';
import { CommentTree } from '@/components/problems/discussion/CommentTree';

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
    domain?: string;
    nextProblemSlug?: string | null;
    onRestoreCode?: (code: string, languageId: number) => void;
}

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

const ProblemDescription = memo(({ problem, activeTab, onTabChange, isSolved, contestId, domain, nextProblemSlug, onRestoreCode }: ProblemDescriptionProps) => {
    const router = useRouter();
    const [solutionTab, setSolutionTab] = useState<"official" | "community">("official");

    const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
        { key: "description", label: "Description", icon: <FileText className="w-4 h-4" /> },
        ...(!contestId ? [{ key: "solutions" as Tab, label: "Solutions", icon: <BadgeCheck className="w-4 h-4" /> }] : []),
        ...(domain !== "APTITUDE" ? [{ key: "submissions" as Tab, label: contestId ? "My Verdicts" : "Submissions", icon: <List className="w-4 h-4" /> }] : []),
    ];

    return (
        <div className="h-full flex flex-col bg-[#fafafa] dark:bg-[#121212] relative overflow-hidden">

            {/* HEADER TABS */}
            <div className="flex items-center gap-1 border-b border-dashed border-gray-200 dark:border-white/5 px-3 py-2 bg-[#fafafa] dark:bg-[#121212] sticky top-0 z-20">
                <div className="flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => onTabChange(tab.key)}
                            className={`
                                relative flex items-center gap-2 px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all duration-300 border
                                ${activeTab === tab.key
                                    ? "bg-white dark:bg-white/5 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-white/10 shadow-sm"
                                    : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border-transparent hover:bg-gray-100 dark:hover:bg-white/5"
                                }
                            `}
                        >
                            <span className={`transition-all duration-300 ${activeTab === tab.key ? 'text-orange-500 scale-110 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]' : ''}`}>
                                {tab.icon}
                            </span>
                            {tab.label}
                            {activeTab === tab.key && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute -bottom-[9px] left-2 right-2 h-[2px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"
                                />
                            )}
                        </button>
                    ))}
                </div>
                {contestId && (
                    <div className="ml-auto flex items-center gap-2 px-2.5 py-1 bg-orange-100 dark:bg-orange-500/20 rounded-md text-orange-700 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider">
                        <ShieldAlert className="w-3 h-3" />
                        Secure
                    </div>
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
                            className={`${domain === "APTITUDE" ? "px-8 py-8" : "px-6 py-6"} space-y-6`}
                        >
                            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                                <motion.div variants={staggerItem} className="flex items-center gap-3 flex-wrap mb-4">
                                    <h1 className={`font-bold text-gray-900 dark:text-gray-100 tracking-tight ${domain === "APTITUDE" ? "text-4xl md:text-5xl font-black" : "text-3xl"}`}>
                                        {problem.title}
                                    </h1>
                                    {isSolved && (
                                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            <span className="text-[12px] font-bold">Solved</span>
                                        </div>
                                    )}
                                </motion.div>

                                <ProblemMetadata
                                    problem={problem as any}
                                    isSolved={isSolved}
                                    domain={domain}
                                    nextProblemSlug={nextProblemSlug}
                                    router={router}
                                />

                                <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
                                    <Markdown
                                        remarkPlugins={[remarkDirective, remarkGfm, remarkBreaks, remarkMcqDirective]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            // @ts-ignore
                                            'mcq-widget': McqWidget,
                                            table: ({ children }) => (
                                                <table className="my-6 w-full border-collapse text-sm border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden">{children}</table>
                                            ),
                                            thead: ({ children }) => (
                                                <thead className="bg-gray-100/40 dark:bg-white/2 border-b border-gray-200/60 dark:border-[#262626] font-mono">{children}</thead>
                                            ),
                                            th: ({ children }) => (
                                                <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[11px] font-mono align-middle border border-gray-200 dark:border-[#262626]">{children}</th>
                                            ),
                                            td: ({ children }) => (
                                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#262626] tabular-nums font-mono text-[13px] align-middle">{children}</td>
                                            ),
                                            tr: ({ children }) => (
                                                <tr className="hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors duration-150">{children}</tr>
                                            ),
                                        }}
                                    >
                                        {problem.description}
                                    </Markdown>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === "submissions" && (
                        <motion.div key="submissions" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                            <Submissions problemId={problem.id} onRestoreCode={onRestoreCode} />
                        </motion.div>
                    )}

                    {activeTab === "solutions" && (
                        <motion.div key="solutions" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="flex flex-col h-full">
                            <div className="flex items-center gap-4 px-6 border-b border-dashed border-gray-200 dark:border-white/5 bg-[#fafafa] dark:bg-[#121212]">
                                {(["official", "community"] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSolutionTab(tab)}
                                        className={`relative py-3 text-sm font-black transition-all duration-300 ${
                                            solutionTab === tab ? "text-orange-600 dark:text-orange-500 scale-105" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                                        }`}
                                    >
                                        {tab === "official" ? "Official Solution" : "Community"}
                                        {solutionTab === tab && (
                                            <motion.div layoutId="solutionTabIndicator" className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className={`flex-1 ${solutionTab === "community" ? "" : "overflow-y-auto px-6 py-6 custom-scrollbar"}`}>
                                <AnimatePresence mode="wait">
                                    {solutionTab === "official" ? (
                                        isSolved ? (
                                            <motion.div key="official-content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="prose prose-slate dark:prose-invert max-w-none">
                                                {problem.solution ? (
                                                    <Markdown
                                                        remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective, remarkSolutionDirective]}
                                                        rehypePlugins={[rehypeRaw]}
                                                        components={{
                                                            // @ts-ignore
                                                            'solution-group': SolutionCodeGroup,
                                                        }}
                                                    >
                                                        {preprocessMarkdown(problem.solution)}
                                                    </Markdown>
                                                ) : (
                                                    <div className="text-gray-500 italic text-center py-10">No official solution provided.</div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="locked-solution"
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -6 }}
                                                className="flex flex-col items-center justify-center py-20 text-center"
                                            >
                                                <BadgeCheck className="w-12 h-12 text-gray-300 mb-4" />
                                                <h2 className="text-lg font-bold">Solution Locked</h2>
                                                <p className="text-gray-500 text-sm">Solve this problem to unlock.</p>
                                            </motion.div>
                                        )
                                    ) : (
                                        <motion.div
                                            key="community"
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            className="h-full flex flex-col"
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
        </div>
    );
});

export default ProblemDescription;
