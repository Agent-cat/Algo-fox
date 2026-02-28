"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X, Check, ChevronDown, Tag, RotateCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { searchTags } from "@/actions/tag.action";
import { Difficulty } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

export function FilterBar() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [tagSuggestions, setTagSuggestions] = useState<{ name: string; slug: string }[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [showTagSuggestions, setShowTagSuggestions] = useState(false);

    const difficulty = searchParams.get("difficulty");
    const tags = searchParams.getAll("tags");

    const updateFilters = (key: string, value: string | null | string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === null || (Array.isArray(value) && value.length === 0)) {
            params.delete(key);
        } else if (Array.isArray(value)) {
            params.delete(key);
            value.forEach(v => params.append(key, v));
        } else {
            params.set(key, value);
        }

        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        if (tagInput.trim()) {
            const timer = setTimeout(async () => {
                const res = await searchTags(tagInput);
                if (res.success && res.tags) {
                    setTagSuggestions(res.tags);
                }
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setTagSuggestions([]);
        }
    }, [tagInput]);

    const hasFilters = difficulty || tags.length > 0;

    return (
        <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* Difficulty Dropdown */}
            <div className="relative">
                <select
                    value={difficulty || ""}
                    onChange={(e) => updateFilters("difficulty", e.target.value || null)}
                    className="appearance-none px-3.5 py-2 pr-8 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1e1e1e] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 dark:focus:border-orange-500/50 cursor-pointer transition-all duration-200 hover:border-gray-300 dark:hover:border-[#333]"
                >
                    <option value="">All Difficulties</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Tag Input */}
            <div className="relative">
                <div className="relative">
                    <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Filter by tags..."
                        value={tagInput}
                        onChange={(e) => {
                            setTagInput(e.target.value);
                            setShowTagSuggestions(true);
                        }}
                        onFocus={() => setShowTagSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowTagSuggestions(false), 200)}
                        className="pl-8 pr-3 py-2 bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1e1e1e] rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 dark:focus:border-orange-500/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-200 hover:border-gray-300 dark:hover:border-[#333]"
                    />
                </div>
                <AnimatePresence>
                    {showTagSuggestions && tagSuggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 4, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 4, scale: 0.98 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1.5 w-full bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl shadow-xl shadow-black/5 dark:shadow-black/20 z-50 max-h-60 overflow-y-auto py-1"
                        >
                            {tagSuggestions.map(tag => (
                                <button
                                    key={tag.slug}
                                    onClick={() => {
                                        if (!tags.includes(tag.slug)) {
                                            updateFilters("tags", [...tags, tag.slug]);
                                        }
                                        setTagInput("");
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 flex items-center justify-between transition-colors"
                                >
                                    {tag.name}
                                    {tags.includes(tag.slug) && <Check className="w-3.5 h-3.5 text-orange-500" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                    {tags.map(slug => (
                        <motion.span
                            key={slug}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-medium border border-orange-100 dark:border-orange-500/20"
                        >
                            {slug}
                            <button
                                onClick={() => updateFilters("tags", tags.filter(t => t !== slug))}
                                className="hover:bg-orange-100 dark:hover:bg-orange-500/20 rounded p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>

            {hasFilters && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("difficulty");
                        params.delete("tags");
                        params.set("page", "1");
                        router.push(`${pathname}?${params.toString()}`);
                    }}
                    className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-[#141414]"
                >
                    <RotateCcw className="w-3 h-3" />
                    Clear
                </motion.button>
            )}
        </div>
    );
}
