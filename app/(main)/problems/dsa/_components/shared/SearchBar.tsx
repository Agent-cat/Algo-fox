"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "./constants";
import { Search, X } from "lucide-react";

interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    placeholder?: string;
    className?: string;
}

function SearchBarComponent({
    onSearch,
    placeholder = "Search problems",
    className = ""
}: SearchBarProps) {
    const [localSearch, setLocalSearch] = useState("");
    const debouncedSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_DELAY);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    }, []);

    const handleClear = useCallback(() => {
        setLocalSearch("");
    }, []);

    return (
        <div className={`relative group ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className={`h-4 w-4 transition-colors duration-200 ${isFocused ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`} />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                className="block w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-[#111111] border border-gray-200 dark:border-[#1e1e1e] rounded-xl leading-5 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#0a0a0a] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 dark:focus:border-orange-500/50 sm:text-sm text-gray-900 dark:text-gray-100 transition-all duration-200"
                value={localSearch}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoComplete="off"
            />
            {/* Loading indicator */}
            {localSearch && localSearch !== debouncedSearch && (
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                    <div className="w-4 h-4 border-2 border-orange-300 dark:border-orange-500/40 border-t-orange-500 rounded-full animate-spin" />
                </div>
            )}
            {/* Clear button */}
            {localSearch && localSearch === debouncedSearch && (
                <button
                    onClick={handleClear}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

export const SearchBar = memo(SearchBarComponent);
SearchBar.displayName = "SearchBar";
