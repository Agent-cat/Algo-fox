"use client";

import { useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import rehypeRaw from 'rehype-raw';
import { Problem } from "@prisma/client";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { markConceptAsCompleted } from "@/actions/submission.action";
import { useRouter } from "next/navigation";
import BackButton from "@/components/BackButton";
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import { remarkSolutionDirective } from "@/lib/markdown-plugins";
import { preprocessMarkdown } from "@/lib/markdown-utils";
// Removed static highlight.js import to allow custom adaptive styling

interface ConceptViewerProps {
    problem: Problem & { tags?: { name: string; slug: string }[] };
    isSolved: boolean;
}

export default function ConceptViewer({ problem, isSolved: initialIsSolved }: ConceptViewerProps) {
    const [isSolved, setIsSolved] = useState(initialIsSolved);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleMarkCompleted = async () => {
        if (isSolved) return;
        setIsLoading(true);
        try {
            const res = await markConceptAsCompleted(problem.id);
            if (res.success) {
                setIsSolved(true);
                toast.success("Marked as completed!");
                router.refresh();
            } else {
                toast.error(res.error || "Failed to mark as completed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0a0a0a] pt-6 pb-20">
            <div className="w-full max-w-none px-4 md:px-8">
                {/* Back Button */}
                <div className="mb-4">
                    <BackButton />
                </div>

                {/* Main Content Card */}
                <div className="bg-white dark:bg-[#141414] rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-6 border-b border-gray-100 dark:border-[#262626] bg-white dark:bg-[#141414]">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                    Concept
                                </span>
                                {problem.tags && problem.tags.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                                        {problem.tags.map(tag => (
                                            <span key={tag.slug} className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                {problem.title}
                            </h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 md:px-10 md:py-8">
                        <article className="prose max-w-none prose-slate dark:prose-invert
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7
                            prose-li:text-gray-700 dark:prose-li:text-gray-300
                            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
                            prose-code:text-orange-600 dark:prose-code:text-orange-400 prose-code:bg-orange-50 dark:prose-code:bg-orange-950/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:font-medium prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-white dark:prose-pre:bg-[#0a0a0a] prose-pre:p-0 prose-pre:m-0 prose-pre:border-none prose-pre:shadow-none prose-pre:rounded-lg prose-pre:my-6
                            prose-img:rounded-lg prose-img:border prose-img:border-gray-100 dark:prose-img:border-[#262626] prose-img:my-6
                            prose-blockquote:border-l-2 prose-blockquote:border-orange-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-[#1a1a1a] prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300 prose-blockquote:not-italic prose-blockquote:my-6">
                            <Markdown
                                remarkPlugins={[
                                    remarkGfm,
                                    remarkBreaks,
                                    remarkDirective,
                                    remarkSolutionDirective
                                ]}
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                  // @ts-ignore - custom element
                                  'solution-group': SolutionCodeGroup,
                                  // Override pre/code if we want custom styling for standalone blocks too,
                                  // but SolutionCodeGroup handles its own children.
                                  // If the user uses standard code blocks outside solution block, we might want a similar style.
                                }}
                            >
                                {preprocessMarkdown(problem.description)}
                            </Markdown>
                        </article>
                    </div>

                    {/* Footer Action */}
                    <div className="px-8 py-6 bg-gray-50/50 dark:bg-[#1a1a1a]/50 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {isSolved ? "You have completed this concept." : "Read through the material?"}
                        </div>
                        <button
                            onClick={handleMarkCompleted}
                            disabled={isSolved || isLoading}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all transform active:scale-95
                                ${isSolved
                                    ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 cursor-default"
                                    : "bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 hover:shadow-md"
                                }
                            `}
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : isSolved ? (
                                <CheckCircle2 className="w-4 h-4" />
                            ) : (
                                <Circle className="w-4 h-4" />
                            )}
                            {isSolved ? "Completed" : "Mark as Completed"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
