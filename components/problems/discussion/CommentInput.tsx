"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { postComment } from "@/actions/discussion";

interface CommentInputProps {
    problemId: string;
    parentId?: string;
    onSuccess?: (comment?: any) => void;
    onCancel?: () => void;
    placeholder?: string;
    autoFocus?: boolean;
    compact?: boolean;
}

export function CommentInput({ problemId, parentId, onSuccess, onCancel, placeholder, autoFocus, compact }: CommentInputProps) {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsSubmitting(true);
        try {
            const res = await postComment(problemId, content, parentId);
            if (res.success) {
                setContent("");
                toast.success("Comment posted!");
                onSuccess?.(res.comment);
            } else {
                toast.error(res.error || "Failed to post comment");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (compact) {
        return (
            <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
                <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={placeholder || "Type a comment..."}
                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all"
                    autoFocus={autoFocus}
                />
                <button
                    type="submit"
                    disabled={!content.trim() || isSubmitting}
                    className="p-2.5 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={placeholder || "Write a comment..."}
                    className="w-full min-h-[100px] p-4 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-y text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                    autoFocus={autoFocus}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={!content.trim() || isSubmitting}
                        className="px-4 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                    >
                        {isSubmitting ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        Post
                    </button>
                </div>
            </div>
        </form>
    );
}
