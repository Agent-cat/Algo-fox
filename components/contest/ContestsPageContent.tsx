"use client";

import { useState, useMemo } from "react";
import { Trophy, Search, Calendar, Filter, Clock } from "lucide-react";
import { StudentContestCard } from "./StudentContestCard";

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
        <div className="space-y-10">
            {/* Search and Tabs Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-2 rounded-2xl shadow-sm relative z-20 max-w-5xl mx-auto -mt-20">
                <div className="flex bg-gray-100 dark:bg-[#0a0a0a] p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === "active"
                            ? "bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                    >
                        <Clock className={`w-3.5 h-3.5 ${activeTab === "active" ? "text-orange-600" : ""}`} />
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab("past")}
                        className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === "past"
                            ? "bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-black/5 dark:ring-white/5"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            }`}
                    >
                        <Calendar className={`w-3.5 h-3.5 ${activeTab === "past" ? "text-orange-600" : ""}`} />
                        Archive
                    </button>
                </div>

                <div className="relative group flex-1 max-w-sm">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search contests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none focus:outline-none text-sm font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                    />
                </div>
            </div>

            {/* Contests Grid */}
            {filteredContests.length === 0 ? (
                <div className="bg-white/80 dark:bg-[#141414] backdrop-blur-sm border border-gray-100 dark:border-[#262626] rounded-3xl p-20 text-center shadow-sm">
                    <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-10 h-10 text-orange-200 dark:text-orange-500/50" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {searchQuery ? "No matching contests" : `No ${activeTab} contests`}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                        {searchQuery
                            ? "We couldn't find any contests matching your search criteria. Try a different keyword."
                            : activeTab === "active"
                                ? "There are no live or upcoming contests right now. Check back soon for new challenges!"
                                : "No past contests found in your history."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredContests.map((contest) => (
                        <StudentContestCard key={contest.id} contest={contest} />
                    ))}
                </div>
            )}
        </div>
    );
}
