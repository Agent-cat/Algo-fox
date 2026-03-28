"use client";
import React, { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, Calendar, Search, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { StudentContestCard } from "./StudentContestCard";

interface ContestsPageContentProps {
    contests: any[];
    page: number;
    totalPages: number;
    initialTab?: "active" | "past";
}

export function ContestsPageContent({ contests, page, totalPages, initialTab = "active" }: ContestsPageContentProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState("");

    const activeTab = initialTab;

    const handleTabChange = (newTab: "active" | "past") => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("type", newTab);
        params.set("page", "1"); // Reset to page 1 on tab change
        router.push(`/contests?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`/contests?${params.toString()}`);
    };

    const filteredContests = useMemo(() => {
        return contests.filter(contest => {
            return contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (contest.description && contest.description.toLowerCase().includes(searchQuery.toLowerCase()));
        });
    }, [contests, searchQuery]);

    return (
        <div className="space-y-12 pb-24">
            {/* Filters Bar */}
            <div className="sticky top-4 z-40 bg-transparent dark:bg-transparent border border-gray-200 dark:border-white/10 p-1.5 rounded-xl shadow-none max-w-4xl mx-auto -mt-4 mb-12">
                <div className="flex flex-col md:flex-row gap-2">
                    {/* Tab Switcher */}
                    <div className="flex bg-black/3 dark:bg-[#1a1a1a] p-1 rounded-lg md:w-fit shrink-0">
                        <button
                            onClick={() => handleTabChange("active")}
                             className={`flex-1 md:flex-none px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === "active"
                                 ? "bg-[#fafafa] dark:bg-[#262626] text-gray-900 dark:text-white"
                                 : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                 }`}
                        >
                            <Clock className={`w-4 h-4 ${activeTab === "active" ? "text-orange-500" : ""}`} />
                            Active & Upcoming
                        </button>
                        <button
                            onClick={() => handleTabChange("past")}
                             className={`flex-1 md:flex-none px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === "past"
                                 ? "bg-[#fafafa] dark:bg-[#262626] text-gray-900 dark:text-white"
                                 : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                 }`}
                        >
                            <Calendar className={`w-4 h-4 ${activeTab === "past" ? "text-orange-500" : ""}`} />
                            Past Contests
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find your challenge..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-full pl-11 pr-4 py-2 bg-black/3 dark:bg-[#1a1a1a] border border-transparent focus:bg-[#fafafa] dark:focus:bg-[#262626] focus:border-orange-500/50 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Contests Grid */}
            <div className="max-w-7xl mx-auto px-4">
                {filteredContests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <div className="w-24 h-24 bg-gray-100 dark:bg-[#141414] rounded-full flex items-center justify-center mb-6">
                            <Trophy className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No contests found</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                            {searchQuery ? "Try adjusting your search terms" : `No ${activeTab === 'active' ? 'active or upcoming' : 'past'} contests available.`}
                        </p>
                    </motion.div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {filteredContests.map((contest) => (
                            <StudentContestCard key={contest.id} contest={contest} />
                        ))}

                        {/* Pagination UI - Hidden during active search */}
                        {totalPages > 1 && searchQuery.trim() === '' && (
                            <div className="flex justify-center items-center gap-2 mt-8 py-4">
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest disabled:opacity-50 transition-all hover:bg-gray-50 dark:hover:bg-[#262626]"
                                >
                                    Prev
                                </button>
                                <div className="flex items-center gap-1.5 px-4 h-9 rounded-lg bg-black/3 dark:bg-[#1a1a1a] border border-transparent">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">{page}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">/</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">{totalPages}</span>
                                </div>
                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-xs font-bold uppercase tracking-widest disabled:opacity-50 transition-all hover:bg-gray-50 dark:hover:bg-[#262626]"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
