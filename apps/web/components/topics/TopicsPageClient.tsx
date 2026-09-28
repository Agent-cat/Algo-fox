"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { SearchBar } from "@/app/(main)/problems/dsa/_components/shared/SearchBar";
import { PageTooltip } from "@/components/shared/PageTooltip";

interface TopicCategory {
    id: string;
    name: string;
    slug: string;
    _count: { categoryProblems: number };
    solvedCount: number;
}

interface TopicsPageClientProps {
    categories: TopicCategory[];
}

export function TopicsPageClient({ categories }: TopicsPageClientProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;
        const term = searchTerm.toLowerCase();
        return categories.filter((c) => c.name.toLowerCase().includes(term));
    }, [categories, searchTerm]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-8"
        >
            <div className="w-full px-6 lg:px-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                                Topic Sheets
                            </h1>
                            <PageTooltip description="Browse topic-wise problem sheets with curated questions for focused, systematic practice." />
                        </div>
                    </div>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
                >
                    <SearchBar
                        onSearch={setSearchTerm}
                        placeholder="Search topics..."
                        className="w-full md:flex-1"
                    />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl overflow-hidden"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {filteredCategories.map((category, i) => {
                            const total = category._count.categoryProblems;
                            const solved = category.solvedCount ?? 0;

                            return (
                                <motion.div
                                    key={category.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
                                >
                                    <Link
                                        href={`/topic/${category.slug}`}
                                        className={`
                                            group relative flex flex-col
                                            rounded-2xl p-5 cursor-pointer min-h-[220px]
                                            bg-[url('/card_bg.svg')] bg-cover bg-center
                                            dark:bg-[url('/card_bg_dark.svg')]
                                            before:content-[''] before:absolute before:inset-0
                                            before:bg-[url('/topography.svg')] before:bg-cover before:bg-center
                                            before:opacity-10 dark:before:opacity-5
                                            before:pointer-events-none before:rounded-2xl
                                            border border-gray-200 dark:border-white/10
                                            hover:shadow-lg hover:shadow-orange-200/30 dark:hover:shadow-orange-900/20
                                            hover:-translate-y-1 active:translate-y-0
                                            hover:border-orange-300 dark:hover:border-orange-500/30
                                            transition-all duration-200 ease-out
                                            overflow-hidden
                                        `}
                                    >
                                        <img
                                            src="/icons/fox.png"
                                            alt="AlgoFox"
                                            width={48}
                                            height={48}
                                            className="absolute bottom-3 right-3 w-12 h-12 object-contain rounded-xl opacity-30"
                                        />

                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3">
                                            {category.name}
                                        </h3>

                                        <div className="mt-auto">
                                            <span className="text-[13px] font-semibold text-gray-500 dark:text-gray-400">
                                                {solved} of {total} solved
                                            </span>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* End of list */}
                    {!searchTerm && filteredCategories.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-center mt-10 mb-4 text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide"
                        >
                            — {filteredCategories.length} topic sheets —
                        </motion.div>
                    )}

                    {filteredCategories.length === 0 && (
                        <div className="text-center py-24">
                            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-50 dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] flex items-center justify-center">
                                <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                            </div>
                            <div className="text-gray-400 dark:text-gray-500 font-medium">No topics found</div>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1.5">
                                {searchTerm ? "Try adjusting your search terms." : "No topics available."}
                            </p>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
}
