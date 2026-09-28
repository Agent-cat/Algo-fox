"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  variant?: "default" | "banner";
}

export function ShareButton({ variant = "default" }: ShareButtonProps) {
  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (variant === "banner") {
    return (
      <button
        className="inline-flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold hover:bg-white/30 transition-all border border-white/30"
        title="Share"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>
    );
  }

  return (
    <button
      className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      title="Share Sheet"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
    </button>
  );
}
