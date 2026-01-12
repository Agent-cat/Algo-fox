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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-gray-100 p-2 rounded-2xl shadow-xl shadow-gray-200/50 relative z-20">
                <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab("active")}
                        className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === "active"
                            ? "bg-white text-orange-600 shadow-lg shadow-orange-500/5 ring-1 ring-gray-100"
                            : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                            }`}
                    >
                        <Clock className={`w-4 h-4 ${activeTab === "active" ? "animate-pulse" : ""}`} />
                        Active
                    </button>
                    <button
                        onClick={() => setActiveTab("past")}
                        className={`px-8 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${activeTab === "past"
                            ? "bg-white text-orange-600 shadow-lg shadow-orange-500/5 ring-1 ring-gray-100"
                            : "text-gray-400 hover:text-gray-600 hover:bg-white/50"
                            }`}
                    >
                        <Calendar className="w-4 h-4" />
                        Previous
                    </button>
                </div>

                <div className="relative group flex-1 max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for an arena..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-6 py-3.5 bg-gray-50/50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-orange-500/5 focus:border-orange-500/20 transition-all text-sm font-bold placeholder:text-gray-400"
                    />
                </div>
            </div>

            {/* Contests Grid */}
            {filteredContests.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-20 text-center shadow-sm">
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-10 h-10 text-orange-200" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {searchQuery ? "No matching contests" : `No ${activeTab} contests`}
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
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
