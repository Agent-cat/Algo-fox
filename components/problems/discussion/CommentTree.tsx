"use client";

import { useEffect, useState } from "react";
import { getProblemComments, CommentWithUser } from "@/actions/discussion";
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { Loader2, MessageSquareOff } from "lucide-react";

import { authClient } from "@/lib/auth-client"; // Importing for client usage

import { SolutionForm } from "./SolutionForm";
import { CommentDetail } from "./CommentDetail";
import { Plus } from "lucide-react";

interface CommentTreeProps {
    problemId: string;
}

type ViewState = {
    type: "LIST";
} | {
    type: "FORM";
} | {
    type: "DETAIL";
    comment: CommentWithUser;
};

export function CommentTree({ problemId }: CommentTreeProps) {
    const { data: session } = authClient.useSession();
    const [comments, setComments] = useState<CommentWithUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewState>({ type: "LIST" });

    const fetchComments = async () => {
        setIsLoading(true);
        try {
            const data = await getProblemComments(problemId, session?.user?.id);
            setComments(data);
            
            // Update detail view if active
            setView(prev => {
                if (prev.type === "DETAIL") {
                    const updated = data.find(c => c.id === prev.comment.id);
                    if (updated) return { ...prev, comment: updated };
                }
                return prev;
            });
        } catch (error) {
             console.error("Failed to fetch comments", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [problemId, session?.user?.id]);

    const handleSuccess = async () => {
        setView({ type: "LIST" });
        await fetchComments();
    };

    if (view.type === "FORM") {
        return (
            <SolutionForm 
                problemId={problemId} 
                onSuccess={handleSuccess} 
                onCancel={() => setView({ type: "LIST" })} 
            />
        );
    }

    if (view.type === "DETAIL") {
        return (
            <CommentDetail 
                comment={view.comment} 
                problemId={problemId}
                onBack={() => setView({ type: "LIST" })} 
                onRefresh={fetchComments}
            />
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#121212]">
            {/* TOP ACTIONS */}
            <div className="p-4 border-b border-gray-100 dark:border-[#1e1e1e] flex items-center justify-between">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {comments.length} Solutions & Comments
                </h3>
                <button 
                    onClick={() => setView({ type: "FORM" })}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all shadow-sm shadow-orange-500/20"
                >
                    <Plus className="w-4 h-4" />
                    Share my solution
                </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : comments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                        <MessageSquareOff className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-2" />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No solutions shared yet. Be the first!</p>
                    </div>
                ) : (
                    <div className="p-4 space-y-3">
                        {comments.map(comment => (
                            <CommentItem
                                key={comment.id}
                                comment={comment}
                                problemId={problemId}
                                onRefresh={fetchComments}
                                onSelect={(c) => setView({ type: "DETAIL", comment: c })}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Bottom Input for quick comments (optional, but keep for consistency) */}
            <div className="sticky bottom-0 left-0 right-0 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-t border-gray-200 dark:border-[#262626] p-4">
                {session?.user ? (
                    <CommentInput problemId={problemId} onSuccess={() => fetchComments()} compact />
                ) : (
                   <div className="text-center py-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg border border-dashed border-gray-200 dark:border-[#333]">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Please sign in to join the discussion.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

