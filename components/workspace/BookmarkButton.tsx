"use client";

import { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { toggleBookmark, checkBookmarkStatus } from "@/actions/bookmark.action";
import CustomTooltip from "@/components/ui/CustomTooltip";

interface BookmarkButtonProps {
    problemId: string;
}

export function BookmarkButton({ problemId }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            const result = await checkBookmarkStatus(problemId);
            if (result.success) {
                setIsBookmarked(result.isBookmarked || false);
            }
            setIsLoading(false);
        };
        checkStatus();
    }, [problemId]);

    const handleToggle = async () => {
        if (isLoading) return;
        setIsLoading(true);
        const result = await toggleBookmark(problemId);
        if (result.success) {
            setIsBookmarked(result.isBookmarked || false);
            if (result.isBookmarked) {
                toast.success("Problem added to bookmarks.");
            } else {
                toast.info("Problem removed from bookmarks.");
            }
        } else {
            toast.error(result.error || "Failed to toggle bookmark");
        }
        setIsLoading(false);
    };

    return (
        <CustomTooltip content={isBookmarked ? "Remove Bookmark" : "Bookmark Problem"} side="bottom">
            <motion.button
                onClick={handleToggle}
                disabled={isLoading}
                className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center ${
                    isBookmarked
                        ? "text-orange-500 bg-orange-50/50 hover:bg-orange-100 dark:bg-orange-500/10 dark:hover:bg-orange-500/20 shadow-sm shadow-orange-500/10"
                        : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
            >
                <Bookmark 
                    className={`w-[18px] h-[18px] transition-all duration-300 ${
                        isBookmarked ? "fill-orange-500 stroke-orange-500" : ""
                    }`} 
                    strokeWidth={isBookmarked ? 2 : 1.5}
                />
            </motion.button>
        </CustomTooltip>
    );
}
