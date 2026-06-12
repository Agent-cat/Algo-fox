"use client";

import { useState, useEffect, useRef } from "react";
import { Bookmark, Plus, Check, FolderPlus, Folder } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { toggleBookmark, checkBookmarkStatus, getUserBookmarkLists, createBookmarkList } from "@/actions/bookmark.action";
import CustomTooltip from "@/components/ui/CustomTooltip";

interface BookmarkButtonProps {
    problemId: string;
}

export function BookmarkButton({ problemId }: BookmarkButtonProps) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [currentListId, setCurrentListId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    const [isOpen, setIsOpen] = useState(false);
    const [lists, setLists] = useState<any[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [newListName, setNewListName] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkStatus = async () => {
            const result = await checkBookmarkStatus(problemId);
            if (result.success) {
                setIsBookmarked(result.isBookmarked || false);
                setCurrentListId(result.listId || null);
            }
            setIsLoading(false);
        };
        checkStatus();
    }, [problemId]);

    useEffect(() => {
        if (isOpen) {
            const fetchLists = async () => {
                const result = await getUserBookmarkLists();
                if (result.success) {
                    setLists(result.lists || []);
                }
            };
            fetchLists();
        }
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setIsCreating(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggleList = async (listId: string | null) => {
        if (isLoading) return;
        setIsLoading(true);
        const result = await toggleBookmark(problemId, listId);
        if (result.success) {
            setIsBookmarked(result.isBookmarked || false);
            setCurrentListId(result.listId || null);
            if (result.isBookmarked) {
                toast.success("Problem bookmarked.");
            } else {
                toast.info("Bookmark removed.");
            }
            setIsOpen(false);
        } else {
            toast.error(result.error || "Failed to toggle bookmark");
        }
        setIsLoading(false);
    };

    const handleCreateList = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newListName.trim()) return;
        
        setIsLoading(true);
        const result = await createBookmarkList(newListName.trim());
        if (result.success) {
            toast.success("List created");
            setNewListName("");
            setIsCreating(false);
            // Fetch lists again to include the new one
            const fetchLists = async () => {
                const listsResult = await getUserBookmarkLists();
                if (listsResult.success) {
                    setLists(listsResult.lists || []);
                }
            };
            await fetchLists();
        } else {
            toast.error(result.error || "Failed to create list");
        }
        setIsLoading(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <CustomTooltip content={isBookmarked ? "Manage Bookmark" : "Bookmark Problem"} side="bottom">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isLoading}
                    className={`p-1.5 rounded-lg transition-all duration-300 flex items-center justify-center ${isBookmarked
                        } ${isLoading ? ' cursor-not-allowed' : ''}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Bookmark
                        className={`w-[18px] h-[18px] transition-all duration-300 ${isBookmarked ? "fill-orange-500 stroke-orange-500" : ""
                            }`}
                        strokeWidth={isBookmarked ? 2 : 1.5}
                    />
                </motion.button>
            </CustomTooltip>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-3 w-56 bg-white dark:bg-[#24262C] border border-gray-200 dark:border-[#3A3B42] rounded-xl shadow-xl shadow-black/10 dark:shadow-black/40 z-50 overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
                    >
                        <div className="p-2 border-b border-gray-100 dark:border-[#3A3B42]">
                            <h3 className="text-xs font-semibold text-gray-500 px-2 py-1 uppercase tracking-wider">Save to List</h3>
                        </div>
                        
                        <div className="max-h-64 overflow-y-auto p-1">
                            {/* Default / Uncategorized list */}
                            <button
                                onClick={() => handleToggleList(null)}
                                className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2B32] rounded-md flex items-center justify-between transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Bookmark className="w-4 h-4 text-gray-400" />
                                    <span>All Bookmarks</span>
                                </div>
                                {isBookmarked && currentListId === null && <Check className="w-4 h-4 text-orange-500" />}
                            </button>

                            {lists.map(list => (
                                <button
                                    key={list.id}
                                    onClick={() => handleToggleList(list.id)}
                                    className="w-full text-left px-2 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2A2B32] rounded-md flex items-center justify-between transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <Folder className="w-4 h-4 text-gray-400" />
                                        <span className="truncate max-w-[120px]">{list.name}</span>
                                    </div>
                                    {isBookmarked && currentListId === list.id && <Check className="w-4 h-4 text-orange-500" />}
                                </button>
                            ))}
                        </div>

                        <div className="p-2 border-t border-gray-100 dark:border-[#3A3B42]">
                            {!isCreating ? (
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-md transition-colors"
                                >
                                    <FolderPlus className="w-4 h-4" />
                                    Create New List
                                </button>
                            ) : (
                                <form onSubmit={handleCreateList} className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        placeholder="List name..."
                                        className="w-full px-2 py-1.5 text-sm bg-gray-50 dark:bg-[#2A2B32] border border-gray-200 dark:border-[#3A3B42] rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                                        value={newListName}
                                        onChange={e => setNewListName(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsCreating(false)}
                                            className="flex-1 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2A2B32] rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!newListName.trim() || isLoading}
                                            className="flex-1 py-1 text-xs bg-orange-500 text-white hover:bg-orange-600 rounded-md disabled:opacity-50"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
