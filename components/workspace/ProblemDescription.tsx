"use client";

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import { Problem } from '@prisma/client';
import { BadgeCheck, FileText, List, ShieldAlert } from 'lucide-react';
import Submissions from './Submissions';
import { getPointsLabel } from '@/lib/points';
import { CommentTree } from '../problems/discussion/CommentTree';
import { useState } from 'react';
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import { remarkSolutionDirective } from "@/lib/markdown-plugins";
import { preprocessMarkdown } from "@/lib/markdown-utils";
import remarkDirective from 'remark-directive';

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

export default function ProblemDescription({ problem, activeTab, onTabChange, isSolved, contestId }: ProblemDescriptionProps) {
    const [solutionTab, setSolutionTab] = useState<"official" | "community">("official");

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/30";
            case "MEDIUM": return "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/30";
            case "HARD": return "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/30";
            default: return "text-gray-600 bg-gray-50 dark:bg-gray-500/10 border-gray-100 dark:border-gray-500/30";
        }
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-[#0a0a0a]">
            {/* HEADER TABS */}
            <div className={`flex items-center gap-1 border-b border-gray-300 dark:border-[#262626] border-dashed px-4 py-2 ${contestId ? 'bg-orange-50/30 dark:bg-orange-500/5' : 'bg-gray-50/50 dark:bg-[#0a0a0a]'}`}>
                <button
                    onClick={() => onTabChange("description")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "description" ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent"}`}
                >
                    <FileText className="w-4 h-4" />
                    Description
                </button>
                {!contestId && (
                    <button
                        id="solutions-tab"
                        onClick={() => onTabChange("solutions")}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "solutions" ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent"} disabled:opacity-50 disabled:cursor-not-allowed`}
                        disabled={problem.difficulty === "CONCEPT"}
                    >
                        <BadgeCheck className="w-4 h-4" />
                        Solutions
                    </button>
                )}
                <button
                    onClick={() => onTabChange("submissions")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "submissions" ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-gray-100 shadow-sm border-gray-200 dark:border-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-transparent"}`}
                >
                    <List className="w-4 h-4" />
                    {contestId ? "My Verdicts" : "Submissions"}
                </button>
                {contestId && (
                    <div className="ml-auto flex items-center gap-2 px-2 py-1 bg-orange-100 dark:bg-orange-500/20 rounded text-orange-700 dark:text-orange-400 font-bold text-[10px] uppercase tracking-wider">
                        <ShieldAlert className="w-3 h-3" />
                        Secure
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === "description" && (
                    <div className="px-6 py-6 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{problem.title}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {getPointsLabel(problem.difficulty)}
                                </span>

                                {problem.tags && problem.tags.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                        {problem.tags.map(tag => (
                                            <span key={tag.slug} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#262626]">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-[1rem] max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a1a] prose-code:px-1 prose-code:py-0.5 select-none prose-code:rounded prose-code:font-mono prose-pre:bg-gray-50 dark:prose-pre:bg-[#141414] prose-pre:text-gray-900 dark:prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-[#262626]">
                            <Markdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {problem.description}
                            </Markdown>
                        </div>
                    </div>
                )}

                {activeTab === "submissions" && <Submissions problemId={problem.id} />}

                {activeTab === "solutions" && (
                    <div className="flex flex-col h-full">
                        {/* Sub-tabs */}
                        <div className="flex items-center gap-4 px-6 border-b border-gray-100 dark:border-[#262626] bg-gray-50/30 dark:bg-[#141414]/50">
                            <button
                                onClick={() => setSolutionTab("official")}
                                className={`py-3 text-sm font-bold border-b-2 transition-colors ${solutionTab === "official" ? "border-orange-500 text-orange-600 dark:text-orange-500" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}
                            >
                                Official Solution
                            </button>
                            <button
                                onClick={() => setSolutionTab("community")}
                                className={`py-3 text-sm font-bold border-b-2 transition-colors ${solutionTab === "community" ? "border-orange-500 text-orange-600 dark:text-orange-500" : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"}`}
                            >
                                Community
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                            {solutionTab === "official" ? (
                                isSolved ? (
                                    <div className="prose max-w-none prose-slate dark:prose-invert
                                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7
                                        prose-li:text-gray-700 dark:prose-li:text-gray-300
                                        prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                                        prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-code:bg-orange-50 dark:prose-code:bg-orange-950/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                                        prose-pre:bg-white dark:prose-pre:bg-[#0a0a0a] prose-pre:p-0 prose-pre:m-0 prose-pre:border-none prose-pre:shadow-none prose-pre:rounded-lg prose-pre:my-6
                                        prose-img:rounded-lg prose-img:border prose-img:border-gray-100 dark:prose-img:border-[#262626] prose-img:my-6
                                        prose-blockquote:border-l-2 prose-blockquote:border-orange-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-[#1a1a1a] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:not-italic prose-blockquote:my-6">
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
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 px-10 text-center space-y-4">
                                        <div className="w-16 h-16 bg-gray-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center">
                                            <BadgeCheck className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Solution Locked</h2>
                                        <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                                            You need to successfully solve this problem to unlock the official solution.
                                        </p>
                                    </div>
                                )
                            ) : (
                                // Community Tab
                                <CommentTree problemId={problem.id} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}
