"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, Loader2, Filter } from "lucide-react";

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
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200 dark:border-[#262626]">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">{subtitle}</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search Bar */}
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full lg:w-80 pl-10 pr-4 py-2.5 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-sm placeholder:text-gray-400 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Create Button */}
                    <Link
                        href={createLink}
                        className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl transition-all hover:opacity-90 active:scale-95 shadow-lg shadow-gray-200 dark:shadow-none"
                    >
                        <Plus className="w-4 h-4" />
                        {createLabel}
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden min-h-[400px]">

                {/* Search Stats / Filters Bar */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#161616] flex items-center justify-between">
                     <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <Filter className="w-3 h-3" />
                        <span>Filter Results</span>
                     </div>
                     {debouncedSearch && (
                        <div className="text-xs font-medium text-orange-600 dark:text-orange-500">
                            Found {filteredData.length} matches
                        </div>
                    )}
                </div>

                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-full">
                            <Loader2 className="w-6 h-6 text-orange-600 dark:text-orange-500 animate-spin" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading data...</p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center border border-gray-100 dark:border-[#262626]">
                            <Search className="w-6 h-6 text-gray-400" />
                        </div>
                        <h3 className="text-gray-900 dark:text-white font-semibold mb-1">No items found</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto mb-4">
                            {debouncedSearch ? `No results for "${debouncedSearch}"` : emptyMessage}
                        </p>
                        {debouncedSearch && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-sm text-orange-600 hover:text-orange-700 font-bold hover:underline"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-[#262626] bg-gray-50 dark:bg-[#1a1a1a]">
                                    {columns.map((col, idx) => (
                                        <th
                                            key={idx}
                                            className={`px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest ${col.className || ""}`}
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
                <div className="text-xs font-mono text-gray-400 dark:text-gray-600 text-right">
                    Displaying {filteredData.length} / {data.length} records
                </div>
            )}
        </div>
    );
}
