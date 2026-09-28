"use client";

import { useState, useOptimistic, startTransition } from "react";
import { ThumbsUp } from "lucide-react";
import { toggleBlogUpvoteAction } from "@/actions/blog";
import { toast } from "sonner";

interface UpvoteButtonProps {
  postId: string;
  initialUpvotes: number;
  initialHasUpvoted: boolean;
}

export default function UpvoteButton({ postId, initialUpvotes, initialHasUpvoted }: UpvoteButtonProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted);
  const [pending, setPending] = useState(false);

  const handleUpvote = async () => {
    if (pending) return;
    setPending(true);

    // Optimistic UI updates
    const originalUpvotes = upvotes;
    const originalHasUpvoted = hasUpvoted;

    const nextHasUpvoted = !originalHasUpvoted;
    const nextUpvotes = nextHasUpvoted ? originalUpvotes + 1 : originalUpvotes - 1;

    setHasUpvoted(nextHasUpvoted);
    setUpvotes(nextUpvotes);

    try {
      const res = await toggleBlogUpvoteAction(postId);
      if (!res.success) {
        toast.error(res.error || "Failed to toggle upvote");
        // Revert on error
        setHasUpvoted(originalHasUpvoted);
        setUpvotes(originalUpvotes);
      }
    } catch (err) {
      toast.error("Failed to upvote");
      // Revert on error
      setHasUpvoted(originalHasUpvoted);
      setUpvotes(originalUpvotes);
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={pending}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
        hasUpvoted
          ? "bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20 dark:text-orange-400"
          : "bg-white dark:bg-[#202227] border-gray-200 dark:border-white/5 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
      }`}
    >
      <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? "fill-current animate-bounce" : ""}`} />
      <span className="tabular-nums">{upvotes} Upvotes</span>
    </button>
  );
}
