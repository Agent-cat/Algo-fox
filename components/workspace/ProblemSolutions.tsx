"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Loader2, BadgeCheck, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkDirective from "remark-directive";
import { remarkSolutionDirective } from "@/lib/markdown-plugins";
import { preprocessMarkdown } from "@/lib/markdown-utils";
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import SolutionTabs from "@/components/markdown/SolutionTabs";
import AnimationPlayer from "./AnimationPlayer";

interface ProblemSolutionsProps {
    problemId: string;
    officialSolution?: string | null;
    animationScript?: any;
    isSolved: boolean;
}

function parseSolutions(markdown: string) {
    if (!markdown) {
        return [];
    }
    const regex = /:::solution\{title="((?:[^"\\]|\\.)*)"\}([\s\S]*?):::/g;
    const results = [];
    let match;
    let index = 0;
    while ((match = regex.exec(markdown)) !== null) {
        const title = match[1].replace(/\\"/g, '"');
        const content = match[2].trim();
        
        // Simple deterministic hash
        const raw = `${title}:${content}:${index}`;
        let hash = 0;
        for (let i = 0; i < raw.length; i++) {
            hash = (hash << 5) - hash + raw.charCodeAt(i);
            hash |= 0;
        }
        const id = `sol-${Math.abs(hash).toString(36)}`;

        results.push({
            id,
            title,
            content
        });
        index++;
    }
    if (results.length === 0 && markdown.trim()) {
        const title = "Optimal Solution";
        const content = markdown.trim();
        const raw = `${title}:${content}:0`;
        let hash = 0;
        for (let i = 0; i < raw.length; i++) {
            hash = (hash << 5) - hash + raw.charCodeAt(i);
            hash |= 0;
        }
        const id = `sol-${Math.abs(hash).toString(36)}`;
        results.push({
            id,
            title,
            content
        });
    }
    return results;
}

export function ProblemSolutions({ officialSolution, animationScript, isSolved }: ProblemSolutionsProps) {
    const solutions = useMemo(() => parseSolutions(officialSolution || ""), [officialSolution]);
    const [activeTabId, setActiveTabId] = useState<string>(solutions[0]?.id || "none");

    useEffect(() => {
        if (solutions.length > 0) {
            if (!solutions.some(s => s.id === activeTabId)) {
                setActiveTabId(solutions[0].id);
            }
        } else {
            setActiveTabId("none");
        }
    }, [solutions, activeTabId]);

    const activeSolution = solutions.find(s => s.id === activeTabId);

    const renderMarkdown = (content: string) => (
        <Markdown
            remarkPlugins={[remarkGfm, remarkBreaks, remarkDirective, remarkSolutionDirective]}
            rehypePlugins={[rehypeRaw]}
            components={{
                // @ts-ignore
                'solution-group': SolutionCodeGroup,
                // @ts-ignore
                'solution-tabs': SolutionTabs,
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
                hr: () => <hr className="my-4 border-dashed border-gray-300 dark:border-white/10" />,
            }}
        >
            {preprocessMarkdown(content)}
        </Markdown>
    );

    return (
        <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#1D1E23]">
            {/* Horizontal scrollable tabs container */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-dashed border-gray-200 dark:border-white/10 bg-[#fafafa] dark:bg-[#1D1E23] overflow-x-auto custom-scrollbar no-scrollbar">
                {solutions.map((sol) => (
                    <button
                        key={sol.id}
                        onClick={() => setActiveTabId(sol.id)}
                        className={`relative px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                            activeTabId === sol.id
                                ? "text-gray-900 dark:text-gray-100 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900 dark:after:bg-gray-100 after:rounded-full"
                                : "text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        }`}
                    >
                        {sol.title}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                {solutions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center opacity-60">
                        <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No solutions available for this problem yet.</p>
                    </div>
                ) : !isSolved ? (
                    <motion.div
                        key="locked-solution"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex flex-col items-center justify-center py-20 text-center h-full"
                    >
                        <BadgeCheck className="w-12 h-12 text-gray-300 mb-4" />
                        <h2 className="text-lg font-bold">Solutions Locked</h2>
                        <p className="text-gray-500 text-sm">Solve this problem to unlock all solutions.</p>
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeTabId} 
                            initial={{ opacity: 0, y: 8 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -6 }} 
                            className="prose prose-slate dark:prose-invert max-w-none"
                        >
                            {/* Animation Player (shown for all solution tabs if script exists) */}
                            {activeSolution && animationScript && (
                                <div className="mb-6 not-prose">
                                    <AnimationPlayer
                                        animationScript={animationScript}
                                        compact
                                    />
                                </div>
                            )}
                            {activeSolution && renderMarkdown(activeSolution.content)}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
