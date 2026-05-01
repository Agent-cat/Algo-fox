"use client";

import { CommentWithUser } from "@/actions/discussion";
import { ArrowLeft, User, Calendar, MessageSquare, ArrowBigUp, ArrowBigDown, Trash2, Pin, PinOff } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Badge } from "@/components/ui/badge";
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import { authClient } from "@/lib/auth-client";
import { deleteComment, pinComment } from "@/actions/discussion";
import { toast } from "sonner";

interface CommentDetailProps {
    comment: CommentWithUser;
    problemId: string;
    onBack: () => void;
    onRefresh: () => void;
}

export function CommentDetail({ comment, problemId, onBack, onRefresh }: CommentDetailProps) {
    const { data: session } = authClient.useSession();

    const isOwner = session?.user?.id === comment.userId;
    const isAdmin = session?.user?.role === "ADMIN";

    const handleDelete = async () => {
        if (!confirm("Delete this solution permanently?")) return;
        const res = await deleteComment(comment.id, problemId);
        if (res.success) {
            toast.success("Solution deleted");
            onBack();
            onRefresh();
        } else {
            toast.error("Failed to delete solution");
        }
    };

    const handlePin = async () => {
        const res = await pinComment(comment.id, problemId);
        if (res.success) {
            toast.success(comment.isPinned ? "Unpinned solution" : "Pinned solution");
            onRefresh();
        } else {
            toast.error("Failed to update pin status");
        }
    };

    return (
        <div className="flex flex-col h-full bg-[#fafafa] dark:bg-[#121212] animate-in fade-in slide-in-from-right-4 duration-300">
            {/* HEADER */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#fafafa]/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#1e1e1e]">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Community
                </button>

                <div className="flex items-center gap-2">
                    {isAdmin && (
                        <button
                            onClick={handlePin}
                            className={`p-2 rounded-lg transition-colors ${comment.isPinned ? "bg-orange-100 text-orange-600 dark:bg-orange-500/20" : "hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500"}`}
                            title={comment.isPinned ? "Unpin Solution" : "Pin Solution"}
                        >
                            {comment.isPinned ? <PinOff className="w-4.5 h-4.5" /> : <Pin className="w-4.5 h-4.5" />}
                        </button>
                    )}
                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 dark:hover:bg-red-500/10 transition-colors"
                            title="Delete Solution"
                        >
                            <Trash2 className="w-4.5 h-4.5" />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto p-6 md:p-8">
                    {/* TITLE & TAGS */}
                    <div className="mb-8 space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                            {comment.title || "Untitled Solution"}
                        </h1>

                        <div className="flex flex-wrap gap-2">
                            {comment.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="bg-gray-100 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#262626]">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* AUTHOR INFO */}
                    <div className="flex items-center gap-4 mb-10 p-4 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-[#333] overflow-hidden shrink-0">
                            {comment.user.image ? (
                                <Image src={comment.user.image} alt={comment.user.name || "User"} width={48} height={48} className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-400">
                                    {(comment.user.name || "?").charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900 dark:text-gray-100">{comment.user.name}</span>
                                {comment.user.role === "ADMIN" && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">ADMIN</span>
                                )}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                                <span className="flex items-center gap-1"><ArrowBigUp className="w-3 h-3" /> {comment.upvoteCount} votes</span>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="prose prose-slate dark:prose-invert max-w-none mb-12 selection:bg-orange-500/20">
                        <Markdown remarkPlugins={[remarkGfm]}>
                            {comment.content}
                        </Markdown>
                    </div>

                    <div className="h-px bg-gray-200 dark:bg-[#262626] mb-12" />

                    {/* REPLIES SECTION */}
                    <div className="space-y-8 mb-24">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-orange-500" />
                                {comment.replies?.length || 0} Comments
                            </h3>
                        </div>

                        {/* Input for replying to the solution */}
                        <div className="bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-[#262626] shadow-sm">
                            {session?.user ? (
                                <CommentInput
                                    problemId={problemId}
                                    parentId={comment.id}
                                    onSuccess={() => onRefresh()}
                                    compact={false}
                                    placeholder="Write a comment..."
                                />
                            ) : (
                                <div className="text-center py-6 bg-gray-50/50 dark:bg-[#141414] rounded-xl border border-dashed border-gray-200 dark:border-[#262626]">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Please sign in to join the conversation.</p>
                                </div>
                            )}
                        </div>

                        {/* Render Nested Replies */}
                        <div className="space-y-6">
                            {comment.replies && comment.replies.length > 0 ? (
                                comment.replies.map(reply => (
                                    <CommentItem
                                        key={reply.id}
                                        comment={reply}
                                        problemId={problemId}
                                        onRefresh={onRefresh}
                                        depth={0} // Standard nested rendering starts here
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 opacity-50">
                                    <p className="text-sm text-gray-500">No comments yet. Start the discussion!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
