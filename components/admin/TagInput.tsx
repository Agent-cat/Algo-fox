"use client";

import { useState, useEffect, useRef } from "react";
import { X, Search, Loader2, Plus } from "lucide-react";
import { searchTags, createTag } from "@/actions/tag.action";
import { toast } from "sonner";



interface Tag {
    slug: string;
    name: string;
}

interface TagInputProps {
    value: Tag[];
    onChange: (tags: Tag[]) => void;
    placeholder?: string;
}

export function TagInput({ value, onChange, placeholder = "Search or create tags..." }: TagInputProps) {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState<Tag[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputValue.trim()) {
                handleSearch(inputValue);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = async (query: string) => {
        setIsSearching(true);
        const res = await searchTags(query);
        if (res.success && res.tags) {
            // Filter out already selected tags
            const selectedSlugs = new Set(value.map(t => t.slug));
            setSuggestions(res.tags.filter(t => !selectedSlugs.has(t.slug)));
        }
        setIsSearching(false);
        setShowSuggestions(true);
    };

    const handleSelectTag = (tag: Tag) => {
        onChange([...value, tag]);
        setInputValue("");
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleRemoveTag = (slug: string) => {
        onChange(value.filter(t => t.slug !== slug));
    };

    const handleCreateTag = async () => {
        if (!inputValue.trim()) return;
        setIsCreating(true);
        const res = await createTag(inputValue);
        setIsCreating(false);

        if (res.success && res.tag) {
            handleSelectTag(res.tag);
            toast.success(`Tag "${res.tag.name}" created`);
        } else {
            toast.error("Failed to create tag");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (suggestions.length > 0) {
                handleSelectTag(suggestions[0]);
            } else if (inputValue.trim()) {
                handleCreateTag();
            }
        }
    };

    return (
        <div className="space-y-3" ref={wrapperRef}>
            <div className="flex flex-wrap gap-2">
                {value.map((tag) => (
                    <span
                        key={tag.slug}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-[#222] text-[#39424e] dark:text-gray-300 rounded-[3px] text-sm font-bold border border-gray-300 dark:border-[#444] shadow-sm"
                    >
                        {tag.name}
                        <button
                            type="button"
                            onClick={() => handleRemoveTag(tag.slug)}
                            className="ml-2 hover:text-red-500 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => {
                        if (inputValue.trim()) setShowSuggestions(true);
                    }}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-[#444] rounded-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-300 font-mono text-sm shadow-sm"
                    placeholder={placeholder}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && inputValue.trim() && (
                    <div className="absolute z-50 mt-1 w-full bg-white dark:bg-[#1a1a1a] rounded-[3px] shadow-xl border border-gray-200 dark:border-[#333] max-h-60 overflow-y-auto">
                        {isSearching ? (
                            <div className="p-4 text-center text-gray-400 text-sm flex items-center justify-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Searching...
                            </div>
                        ) : (
                            <div className="py-1">
                                {suggestions.map((tag) => (
                                    <button
                                        key={tag.slug}
                                        type="button"
                                        onClick={() => handleSelectTag(tag)}
                                        className="w-full text-left px-4 py-2 hover:bg-orange-50 dark:hover:bg-[#262626] text-gray-700 dark:text-gray-300 text-sm transition-colors flex items-center justify-between group"
                                    >
                                        <span>{tag.name}</span>
                                        <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 text-orange-500" />
                                    </button>
                                ))}

                                {suggestions.length === 0 && (
                                    <button
                                        type="button"
                                        onClick={handleCreateTag}
                                        className="w-full text-left px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm transition-colors flex items-center gap-2 border-t border-gray-100 dark:border-[#222] font-bold"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Create "{inputValue}"
                                        {isCreating && <Loader2 className="w-3 h-3 animate-spin ml-auto" />}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
