"use client";

import { useState, useMemo } from "react";
import { Trophy, Search, Calendar, Clock, LayoutGrid, List } from "lucide-react";
import { StudentContestCard } from "./StudentContestCard";
import { motion } from "framer-motion";

interface ContestsPageContentProps {
    contests: any[];
}

export function ContestsPageContent({ contests }: ContestsPageContentProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"active" | "past">("active");

    const filteredContests = useMemo(() => {
        const now = new Date();

        return contests.filter(contest => {
            const matchesSearch = contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (contest.description && contest.description.toLowerCase().includes(searchQuery.toLowerCase()));

            const endTime = new Date(contest.endTime);
            const isPast = now > endTime;

            if (activeTab === "active") {
                return matchesSearch && !isPast;
            } else {
                return matchesSearch && isPast;
            }
        });
    }, [contests, searchQuery, activeTab]);

    return (
        <div className="space-y-12 pb-24">
            {/* Filters Bar */}
            <div className="sticky top-4 z-40 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border border-gray-200 dark:border-[#262626] p-2 rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-none max-w-4xl mx-auto -mt-24 mb-12">
                <div className="flex flex-col md:flex-row gap-2">
                    {/* Tab Switcher */}
                    <div className="flex bg-gray-100 dark:bg-[#141414] p-1.5 rounded-xl md:w-fit shrink-0">
                        <button
                            onClick={() => setActiveTab("active")}
                             className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeTab === "active"
                                 ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm"
                                 : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                                 }`}
                        >
                            <Clock className={`w-4 h-4 ${activeTab === "active" ? "text-orange-500" : ""}`} />
                            Active & Upcoming
                        </button>
                        <button
                            onClick={() => setActiveTab("past")}
                             className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeTab === "past"
                                 ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm"
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
                            placeholder="Search contests..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-[#141414] border border-transparent focus:bg-white dark:focus:bg-[#1a1a1a] focus:border-orange-500/50 rounded-xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none transition-all"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredContests.map((contest) => (
                            <StudentContestCard key={contest.id} contest={contest} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
