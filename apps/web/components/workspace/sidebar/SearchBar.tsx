"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

export function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
    return (
        <div className="relative group">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-orange-500 text-gray-400">
                <Search className="w-4 h-4" />
            </div>
            <input
                type="text"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-orange-500/30 rounded-full pl-10 pr-10 py-2.5 text-sm font-bold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
            />
            {searchTerm && (
                <button
                    onClick={() => onSearchChange("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-white/5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
