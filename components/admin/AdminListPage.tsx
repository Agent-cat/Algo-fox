"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { Search, Plus, Loader2 } from "lucide-react";

interface AdminListPageProps<T> {
    title: string;
    subtitle: string;
    createLink: string;
    createLabel: string;
    data: T[];
    isLoading: boolean;
    searchPlaceholder?: string;
    searchFields: (keyof T)[];
    renderItem: (item: T, index: number) => React.ReactNode;
    emptyMessage?: string;
    columns: { label: string; className?: string }[];
}

// Custom hook for debounced search
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export default function AdminListPage<T extends { id: string }>({
    title,
    subtitle,
    createLink,
    createLabel,
    data,
    isLoading,
    searchPlaceholder = "Search...",
    searchFields,
    renderItem,
    emptyMessage = "No items found. Create one to get started.",
    columns,
}: AdminListPageProps<T>) {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = useDebounce(searchQuery, 300);

    // Filter data based on debounced search
    const filteredData = useMemo(() => {
        if (!debouncedSearch.trim()) return data;

        const query = debouncedSearch.toLowerCase();
        return data.filter((item) =>
            searchFields.some((field) => {
                const value = item[field];
                if (typeof value === "string") {
                    return value.toLowerCase().includes(query);
                }
                return false;
            })
        );
    }, [data, debouncedSearch, searchFields]);

    return (
        <div className="animate-fade-in-up">
            {/* Header Section with Glassmorphism */}
            <div className="bg-white/70 dark:bg-[#141414]/70 backdrop-blur-xl border border-white/20 dark:border-[#262626] rounded-2xl p-6 mb-6 shadow-xl shadow-gray-200/30 dark:shadow-none">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                            {title}
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-10 pr-4 py-2.5 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur border border-gray-200 dark:border-[#333] rounded-xl text-sm placeholder:text-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            )}
                        </div>

                        {/* Create Button */}
                        <Link
                            href={createLink}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-0.5"
                        >
                            <Plus className="w-4 h-4" />
                            {createLabel}
                        </Link>
                    </div>
                </div>

                {/* Search results count */}
                {debouncedSearch && (
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        Found <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredData.length}</span> result{filteredData.length !== 1 ? 's' : ''} for "<span className="font-medium">{debouncedSearch}</span>"
                    </div>
                )}
            </div>

            {/* Table Section with Glassmorphism */}
            <div className="bg-white/70 dark:bg-[#141414]/70 backdrop-blur-xl border border-white/20 dark:border-[#262626] rounded-2xl shadow-xl shadow-gray-200/30 dark:shadow-none overflow-hidden">
                {isLoading ? (
                    <div className="p-16 flex flex-col items-center justify-center gap-3">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                        <p className="text-sm text-gray-500">Loading...</p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center">
                            <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">{debouncedSearch ? "No matching results found." : emptyMessage}</p>
                        {debouncedSearch && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/80 dark:bg-[#1a1a1a]/80 border-b border-gray-100 dark:border-[#262626]">
                                    {columns.map((col, idx) => (
                                        <th
                                            key={idx}
                                            className={`px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.className || ""}`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-[#262626]">
                                {filteredData.map((item, index) => renderItem(item, index))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            {!isLoading && data.length > 0 && (
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                    Showing {filteredData.length} of {data.length} items
                </div>
            )}
        </div>
    );
}
