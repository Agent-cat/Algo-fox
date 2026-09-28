"use client";
import React, { memo, useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Problem } from '@prisma/client';
import { BadgeCheck, FileText, List, ShieldAlert, CheckCircle, Lightbulb, Tag, MessageSquare, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import Submissions from './Submissions';
import McqWidget from "@/components/markdown/McqWidget";
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import SolutionTabs from "@/components/markdown/SolutionTabs";
import { ProblemSolutions } from './ProblemSolutions';

import remarkDirective from 'remark-directive';
import { remarkMcqDirective, remarkSolutionDirective } from '@/lib/markdown-plugins';
import { preprocessMarkdown } from '@/lib/markdown-utils';
import { ProblemMetadata } from './ProblemMetadata';
import { CommentTree } from '@/components/problems/discussion/CommentTree';

type Tab = "description" | "solutions" | "submissions" | "community";

interface ProblemDescriptionProps {
    problem: Problem & {
        tags?: { name: string; slug: string }[];
        solution?: string | null;
        hints?: string[];
    };
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    isSolved: boolean;
    contestId?: string;
    domain?: string;
    nextProblemSlug?: string | null;
    courseId?: string | null;
    onRestoreCode?: (code: string, languageId: number) => void;
    isSubmitting?: boolean;
    latestSubmissionId?: string | null;
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

const TagAccordion = ({ tags, isOpen, onToggle }: { tags: { name: string; slug: string }[], isOpen: boolean, onToggle: () => void }) => {
    if (!tags || tags.length === 0) return null;

    return (
        <div id="tags-accordion-container" className="group border-b border-gray-200 dark:border-white/10 overflow-hidden">
            <div 
                onClick={onToggle} 
                className="flex items-center justify-between py-5 cursor-pointer select-none"
            >
                <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    <Tag className="w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
                    Related Topics
                </div>
                <svg className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-5 pt-1 flex items-center gap-2 flex-wrap max-w-none">
                            {tags.map((tag) => (
                                <div
                                    key={tag.slug}
                                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 text-[12px] font-medium transition-colors cursor-default hover:bg-gray-200 dark:hover:bg-white/10"
                                >
                                    {tag.name}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const HintAccordion = ({ hint, idx }: { hint: string; idx: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group border-b border-gray-200 dark:border-white/10 overflow-hidden">
            <div 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center justify-between py-5 cursor-pointer select-none"
            >
                <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    <Lightbulb className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-yellow-500 transition-colors" />
                    Hint {idx + 1}
                </div>
                <svg className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-5 pt-1 text-base text-gray-600 dark:text-gray-400 prose prose-base dark:prose-invert max-w-none">
                            <Markdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {hint}
                            </Markdown>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const CommunityAccordion = ({ problemId, isSolved }: { problemId: string; isSolved: boolean }) => {
    const [isOpen, setIsOpen] = useState(false);
    const locked = !isSolved;

    const handleToggle = () => {
        if (locked) return;
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`group border-b border-gray-200 dark:border-white/10 overflow-hidden ${locked ? 'opacity-60' : ''}`}>
            <div
                onClick={handleToggle}
                className={`flex items-center justify-between py-5 select-none ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <div className={`flex items-center gap-2 text-base font-medium transition-colors ${
                    locked
                        ? 'text-gray-400 dark:text-gray-600'
                        : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>
                    {locked
                        ? <Lock className="w-5 h-5 text-gray-300 dark:text-gray-600" />
                        : <MessageSquare className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                    }
                    Community
                    {locked && (
                        <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                            <Lock className="w-2.5 h-2.5" /> Solve to unlock
                        </span>
                    )}
                </div>
                {!locked && (
                    <svg className={`w-4 h-4 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                )}
            </div>
            <AnimatePresence initial={false}>
                {isOpen && !locked && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="pb-5 pt-1">
                            <CommentTree problemId={problemId} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ProblemDescription = memo(({ problem, activeTab, onTabChange, isSolved, contestId, domain, nextProblemSlug, courseId, onRestoreCode, isSubmitting, latestSubmissionId }: ProblemDescriptionProps) => {
    const router = useRouter();
    const [isTagsOpen, setIsTagsOpen] = useState(false);

    const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
        { key: "description", label: "Description", icon: <FileText className="w-4 h-4" /> },
        ...(!contestId ? [{ key: "solutions" as Tab, label: "Solutions", icon: <BadgeCheck className="w-4 h-4" /> }] : []),
        ...(domain !== "APTITUDE" ? [{ key: "submissions" as Tab, label: contestId ? "My Verdicts" : "Submissions", icon: <List className="w-4 h-4" /> }] : []),
    ];

    return (
        <div className="h-full flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] relative overflow-hidden">

            {/* HEADER TABS */}
            <div className="flex items-center gap-1 border-b border-dashed border-gray-200 dark:border-white/10 px-3 py-2 bg-[#fafafa] dark:bg-[#1D1E23] sticky top-0 z-20">
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
                            className={`${domain === "APTITUDE" ? "px-8 pt-8 pb-32" : "px-5 pt-5 pb-32"} space-y-4`}
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
                                    courseId={courseId}
                                    router={router}
                                    onOpenTags={() => setIsTagsOpen(true)}
                                />

                                <div className="mt-4 prose prose-slate dark:prose-invert max-w-none">
                                    <Markdown
                                        remarkPlugins={[remarkDirective, remarkGfm, remarkBreaks, remarkMcqDirective]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            // @ts-ignore
                                            'mcq-widget': McqWidget,
                                            table: ({ children }) => (
                                                <table className="my-3 w-full border-collapse text-sm border border-gray-300 dark:border-[#262626] rounded-xl overflow-hidden">{children}</table>
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
                                            pre: ({ children }) => (
                                                <pre className="my-4 p-4 rounded-xl bg-gray-100/50 dark:bg-[#24262C] border border-dashed border-gray-300 dark:border-white/10 overflow-x-auto custom-scrollbar shadow-sm">
                                                    {children}
                                                </pre>
                                            ),
                                            code: ({ node, inline, className, children, ...props }: any) => {
                                                return (
                                                    <code
                                                        className={`${className} ${inline
                                                            ? 'px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-orange-600 dark:text-orange-400 font-mono text-[13px]'
                                                            : 'font-mono text-[14px] leading-[1.6] text-gray-800 dark:text-gray-200'}`}
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                );
                                            },
                                            hr: () => <hr className="my-4 border-dashed border-gray-200 dark:border-white/10" />,
                                        }}
                                    >
                                        {problem.description}
                                    </Markdown>
                                </div>
                                
                                <div className="mt-8 border-t border-gray-200 dark:border-white/10">
                                    {problem.tags && problem.tags.length > 0 && (
                                        <TagAccordion tags={problem.tags} isOpen={isTagsOpen} onToggle={() => setIsTagsOpen(!isTagsOpen)} />
                                    )}
                                    {problem.hints && problem.hints.length > 0 && problem.hints.map((hint, idx) => (
                                        <HintAccordion key={idx} hint={hint} idx={idx} />
                                    ))}
                                    {!contestId && (
                                        <CommunityAccordion problemId={problem.id} isSolved={isSolved} />
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}

                    {activeTab === "submissions" && (
                        <motion.div key="submissions" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="h-full">
                            <Submissions 
                                problemId={problem.id} 
                                onRestoreCode={onRestoreCode} 
                                isSubmitting={isSubmitting} 
                                latestSubmissionId={latestSubmissionId} 
                            />
                        </motion.div>
                    )}

                    {activeTab === "solutions" && (
                        <motion.div key="solutions" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="h-full">
                            <ProblemSolutions problemId={problem.id} officialSolution={problem.solution} animationScript={problem.animationScript} isSolved={isSolved} />
                        </motion.div>
                    )}


                </AnimatePresence>
            </div>
        </div>
    );
});

export default ProblemDescription;
