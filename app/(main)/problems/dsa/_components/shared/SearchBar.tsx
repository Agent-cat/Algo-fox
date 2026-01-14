"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "./constants";

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

    // Call onSearch when debounced value changes
    useEffect(() => {
        onSearch(debouncedSearch);
    }, [debouncedSearch, onSearch]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearch(e.target.value);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <input
                type="text"
                placeholder={placeholder}
                className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-xl leading-5 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#1a1a1a] focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/20 focus:border-orange-400 sm:text-sm transition-all shadow-sm text-gray-900 dark:text-gray-100"
                value={localSearch}
                onChange={handleChange}
                autoComplete="off"
            />
            {localSearch && localSearch !== debouncedSearch && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}

export const SearchBar = memo(SearchBarComponent);
SearchBar.displayName = "SearchBar";
