"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, Loader2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminListPageProps<T> {
    title: string;
    subtitle?: string;
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
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                    {title}
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="relative group w-full md:flex-1">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-10 pl-10 pr-10 bg-gray-50/50 hover:bg-gray-100/50 focus:bg-gray-50/50 dark:bg-[#111] dark:hover:bg-[#161616] dark:focus:bg-[#111] border border-gray-200 dark:border-white/10 rounded-lg text-[13px] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 shadow-sm transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <Link
                        href={createLink}
                        className="flex items-center gap-2 h-10 px-5 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-lg transition-all hover:opacity-90 active:scale-95 shadow-md whitespace-nowrap text-[13px]"
                    >
                        <Plus className="w-4 h-4" />
                        {createLabel}
                    </Link>
                </div>
            </header>

            <div className="flex-1 bg-transparent dark:bg-[#24262C] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-[#1e1e1e] bg-transparent dark:bg-[#1D1E23]/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
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
                    <div className="p-20 flex flex-col items-center justify-center gap-4 min-h-[400px]">
                        <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-full">
                            <Loader2 className="w-6 h-6 text-orange-600 dark:text-orange-500 animate-spin" />
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading data...</p>
                    </div>
                ) : filteredData.length === 0 ? (
                    <div className="p-20 flex flex-col items-center justify-center text-center min-h-[400px]">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-[#1D1E23] rounded-2xl flex items-center justify-center mb-4 border border-gray-100 dark:border-[#262626]">
                            <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No items found</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-4">
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
                    <div className="w-full">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-[#1e1e1e] bg-transparent dark:bg-[#1D1E23]/50">
                                    {columns.map((col, idx) => (
                                        <th
                                            key={idx}
                                            className={`px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest ${col.className || ""}`}
                                        >
                                            {col.label}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-[#1D1E23]">
                                <AnimatePresence mode="popLayout">
                                    {filteredData.map((item, index) => (
                                        <motion.tr
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            key={item.id}
                                            className="hover:bg-gray-100/50 dark:hover:bg-[#1D1E23]/50 transition-colors group"
                                        >
                                            {renderItem(item, index)}
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {!isLoading && data.length > 0 && (
                <div className="text-[11px] font-medium tracking-wide text-gray-400 dark:text-gray-500 text-right pr-4">
                    Displaying {filteredData.length} / {data.length} records
                </div>
            )}
        </div>
    );
}
