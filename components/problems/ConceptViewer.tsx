"use client";

import { useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { Problem } from "@prisma/client";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { markConceptAsCompleted } from "@/actions/submission.action";
import { useRouter } from "next/navigation";
import 'highlight.js/styles/github.css';

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
                router.refresh(); // Refresh to update server state if needed
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
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#0a0a0a] bg-grid pt-20 pb-12">
            <div className="max-w-4xl mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8 border-b border-gray-100 dark:border-[#262626] pb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">{problem.title}</h1>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30">
                            Concept
                        </span>
                        {problem.tags && problem.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                                {problem.tags.map(tag => (
                                    <span key={tag.slug} className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#262626] px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#333]">
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <article className="prose prose-[1.05rem] max-w-none prose-slate dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-code:text-gray-900 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-[#262626] prose-code:px-1 prose-code:py-0.5 select-none prose-code:rounded prose-code:font-mono  prose-pre:bg-gray-50 dark:prose-pre:bg-[#1a1a1a] prose-pre:text-gray-900 dark:prose-pre:text-gray-200 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-[#333] prose-img:rounded-xl">
                    <Markdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                        {problem.description}
                    </Markdown>
                </article>

                {/* Footer Action - Now inline at bottom */}
                <div className="mt-16 flex justify-end">
                    <button
                        onClick={handleMarkCompleted}
                        disabled={isSolved || isLoading}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all transform active:scale-95
                            ${isSolved
                                ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 cursor-default"
                                : "bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200 dark:shadow-none"
                            }
                        `}
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
    );
}
