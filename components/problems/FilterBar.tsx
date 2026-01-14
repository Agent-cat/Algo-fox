"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { searchTags } from "@/actions/tag.action";
import { Difficulty } from "@prisma/client";

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

        // Reset page on filter change
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

    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Difficulty Dropdown */}
            <select
                value={difficulty || ""}
                onChange={(e) => updateFilters("difficulty", e.target.value || null)}
                className="px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
                <option value="">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
            </select>

            {/* Tag Input */}
            <div className="relative">
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
                    className="px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-lg text-sm w-48 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                />
                {showTagSuggestions && tagSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {tagSuggestions.map(tag => (
                            <button
                                key={tag.slug}
                                onClick={() => {
                                    if (!tags.includes(tag.slug)) {
                                        updateFilters("tags", [...tags, tag.slug]);
                                    }
                                    setTagInput("");
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-orange-50 dark:hover:bg-orange-500/10 text-gray-700 dark:text-gray-300 flex items-center justify-between"
                            >
                                {tag.name}
                                {tags.includes(tag.slug) && <Check className="w-3 h-3 text-orange-600" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Tags */}
            <div className="flex flex-wrap gap-2">
                {tags.map(slug => (
                    <span key={slug} className="flex items-center gap-1 px-2.5 py-1 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-full text-xs font-medium border border-orange-100 dark:border-orange-500/30">
                        {slug}
                        <button
                            onClick={() => updateFilters("tags", tags.filter(t => t !== slug))}
                            className="hover:bg-orange-100 dark:hover:bg-orange-500/20 rounded-full p-0.5"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>

            {(difficulty || tags.length > 0) && (
                <button
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete("difficulty");
                        params.delete("tags");
                        params.set("page", "1");
                        router.push(`${pathname}?${params.toString()}`);
                    }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border-b border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-gray-100 transition-colors"
                >
                    Clear filters
                </button>
            )}
        </div>
    );
}
