"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigUp, ArrowBigDown, MessageSquare, Trash2, Pin, PinOff } from "lucide-react"; // Using ArrowBigUp/Down for voting similar to Reddit
import { CommentWithUser, voteComment, pinComment, deleteComment } from "@/actions/discussion";
import { CommentInput } from "./CommentInput";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface CommentItemProps {
    comment: CommentWithUser;
    problemId: string;
    depth?: number;
    onRefresh?: () => void;
}



export function CommentItem({ comment, problemId, depth = 0, onRefresh }: CommentItemProps) {
    const { data: session } = authClient.useSession();
    const [isReplying, setIsReplying] = useState(false);
    const [voteState, setVoteState] = useState<"UP" | "DOWN" | null>(comment.userVote || null);
    const [score, setScore] = useState(comment.upvoteCount);
    const [isVoting, setIsVoting] = useState(false);

    // Optimistic Replies State
    const [localReplies, setLocalReplies] = useState<CommentWithUser[]>(comment.replies || []);

    // Sync local replies if prop changes (e.g. on full refresh)
    useEffect(() => {
        if (comment.replies) {
            setLocalReplies(comment.replies);
        }
    }, [comment.replies]);

    const isOwner = session?.user?.id === comment.userId;
    const isAdmin = session?.user?.role === "ADMIN";

    const handleVote = async (type: "UP" | "DOWN") => {
        if (!session?.user) return toast.error("Please login to vote");
        if (isVoting) return;

        // Optimistic update
        const previousVote = voteState;
        const previousScore = score;

        let newScore = score;
        let newVote: "UP" | "DOWN" | null = type;

        if (voteState === type) {
            // Toggle off
            newVote = null;
            newScore -= (type === "UP" ? 1 : -1);
        } else if (voteState) {
            // Flip vote
            newScore += (type === "UP" ? 2 : -2);
        } else {
            // New vote
            newScore += (type === "UP" ? 1 : -1);
        }

        setVoteState(newVote);
        setScore(newScore);
        setIsVoting(true);

        try {
            const res = await voteComment(comment.id, problemId, type);
            if (!res.success) throw new Error(res.error);
        } catch (error) {
            // Revert
            setVoteState(previousVote);
            setScore(previousScore);
            toast.error("Failed to vote");
        } finally {
            setIsVoting(false);
        }
    };

    const handlePin = async () => {
        if (!confirm(comment.isPinned ? "Unpin this comment?" : "Pin this comment?")) return;
        const res = await pinComment(comment.id, problemId);
        if (res.success) {
            toast.success("Updated pin status");
            onRefresh?.();
        } else {
            toast.error("Failed to update pin status");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this comment permanently?")) return;
        const res = await deleteComment(comment.id, problemId);
        if (res.success) {
            toast.success("Comment deleted");
            onRefresh?.();
        } else {
            toast.error("Failed to delete comment");
        }
    };

    return (
        <div className={`flex flex-col ${depth > 0 ? "ml-4 md:ml-8 border-l-2 border-gray-100 dark:border-[#262626] pl-4 md:pl-6 pt-2" : ""}`}>
            <div className={`relative group p-4 rounded-xl transition-all ${comment.isPinned ? "bg-orange-50/50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/10" : "hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a]/50"}`}>

                {/* Pin Badge */}
                {comment.isPinned && (
                    <div className="absolute top-2 right-4 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-500">
                        <Pin className="w-3 h-3 fill-current" />
                        Pinned
                    </div>
                )}

                <div className="flex gap-4">
                    {/* AVATAR */}
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#333] overflow-hidden">
                            {comment.user.image ? (
                                <Image src={comment.user.image} alt={comment.user.name} width={32} height={32} className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500">
                                    {comment.user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{comment.user.name}</span>
                            {comment.user.role === "ADMIN" && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400">ADMIN</span>
                            )}
                            <span className="text-xs text-gray-400">• {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                        </div>

                        <div className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {comment.content}
                        </div>

                        {/* ACTIONS */}
                        <div className="flex items-center gap-4 mt-3">
                            {/* VOTE */}
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-[#262626] rounded-lg p-0.5">
                                <button
                                    onClick={() => handleVote("UP")}
                                    className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-[#333] transition-colors ${voteState === "UP" ? "text-orange-600 dark:text-orange-500" : "text-gray-500 dark:text-gray-400"}`}
                                >
                                    <ArrowBigUp className={`w-5 h-5 ${voteState === "UP" ? "fill-current" : ""}`} />
                                </button>
                                <span className={`text-xs font-bold w-6 text-center ${voteState === "UP" ? "text-orange-600 dark:text-orange-500" : voteState === "DOWN" ? "text-blue-600 dark:text-blue-500" : "text-gray-600 dark:text-gray-400"}`}>
                                    {score}
                                </span>
                                <button
                                    onClick={() => handleVote("DOWN")}
                                    className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-[#333] transition-colors ${voteState === "DOWN" ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"}`}
                                >
                                    <ArrowBigDown className={`w-5 h-5 ${voteState === "DOWN" ? "fill-current" : ""}`} />
                                </button>
                            </div>

                            <button
                                onClick={() => setIsReplying(!isReplying)}
                                className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Reply
                            </button>

                            {(isOwner || isAdmin) && (
                                <button
                                    onClick={handleDelete}
                                    className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors ml-auto md:ml-0"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Delete
                                </button>
                            )}

                            {isAdmin && (
                                <button
                                    onClick={handlePin}
                                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${comment.isPinned ? "text-orange-600" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                                >
                                    {comment.isPinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
                                    {comment.isPinned ? "Unpin" : "Pin"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {isReplying && (
                    <div className="mt-4 pl-12">
                        <CommentInput
                            problemId={problemId}
                            parentId={comment.id}
                            onSuccess={(newReply) => {
                                setIsReplying(false);
                                if (newReply) {
                                    setLocalReplies(prev => [...prev, newReply]);
                                } else {
                                    onRefresh?.();
                                }
                            }}
                            onCancel={() => setIsReplying(false)}
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* REPLIES - Use localReplies instead of comment.replies */}
            {localReplies && localReplies.length > 0 && (
                <div className="flex flex-col mb-4">
                    {localReplies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            problemId={problemId}
                            depth={depth + 1}
                            onRefresh={onRefresh}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
