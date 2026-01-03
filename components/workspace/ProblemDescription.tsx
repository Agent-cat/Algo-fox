"use client";

import 'highlight.js/styles/github.css';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Problem } from '@prisma/client';
import { BadgeCheck, FileText, List } from 'lucide-react';
import Submissions from './Submissions';
import { getPointsLabel } from '@/lib/points';

type Tab = "description" | "solutions" | "submissions";

interface ProblemDescriptionProps {
    problem: Problem & { tags?: { name: string; slug: string }[] };
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

export default function ProblemDescription({ problem, activeTab, onTabChange }: ProblemDescriptionProps) {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "text-emerald-600 bg-emerald-50 border-emerald-100";
            case "MEDIUM": return "text-amber-600 bg-amber-50 border-amber-100";
            case "HARD": return "text-rose-600 bg-rose-50 border-rose-100";
            default: return "text-gray-600 bg-gray-50 border-gray-100";
        }
    };

    return (
        <div className="h-full flex flex-col bg-white">
            {/* HEADER TABS */}
            <div className="flex items-center gap-1 border-b border-gray-300 border-dashed px-4 py-2 bg-gray-50/50">
                <button
                    onClick={() => onTabChange("description")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "description" ? "bg-white text-gray-900 shadow-sm border-gray-200" : "text-gray-500 hover:text-gray-900 border-transparent"}`}
                >
                    <FileText className="w-4 h-4" />
                    Description
                </button>
                <button
                    onClick={() => onTabChange("solutions")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "solutions" ? "bg-white text-gray-900 shadow-sm border-gray-200" : "text-gray-500 hover:text-gray-900 border-transparent"} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    <BadgeCheck className="w-4 h-4" />
                    Solutions
                </button>
                <button
                    onClick={() => onTabChange("submissions")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors border ${activeTab === "submissions" ? "bg-white text-gray-900 shadow-sm border-gray-200" : "text-gray-500 hover:text-gray-900 border-transparent"}`}
                >
                    <List className="w-4 h-4" />
                    Submissions
                </button>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === "description" && (
                    <div className="px-6 py-6 space-y-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h1>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                                    {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
                                </span>
                                <span className="text-sm text-gray-600 font-medium">
                                    {getPointsLabel(problem.difficulty)}
                                </span>

                                {problem.tags && problem.tags.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-gray-300" />
                                        {problem.tags.map(tag => (
                                            <span key={tag.slug} className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="prose prose-[1rem] max-w-none prose-slate prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-800 prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 select-none prose-code:rounded prose-code:font-mono  prose-pre:bg-gray-50 prose-pre:text-gray-900 prose-pre:border prose-pre:border-gray-200">
                            <Markdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                            >
                                {problem.description}
                            </Markdown>
                        </div>
                    </div>
                )}

                {activeTab === "submissions" && <Submissions problemId={problem.id} />}

                {activeTab === "solutions" && (
                    <div className="p-8 text-center text-gray-500">Solutions coming soon!</div>
                )}
            </div>
        </div >
    );
}
