"use client";

import { useState } from "react";
import { ContestsPageContent } from "./ContestsPageContent";
import { ContestCalendar } from "./ContestCalendar";
import { Contest } from "@/actions/external-contests.action";
import { Trophy, Calendar, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContestPageClientProps {
    internalContests: any[];
    externalContests: Contest[];
}

export function ContestPageClient({ internalContests, externalContests }: ContestPageClientProps) {
    const [viewMode, setViewMode] = useState<"internal" | "calendar">("internal");

    return (
        <div className="min-h-screen dark:bg-[#0a0a0a] pb-20 pt-12">
             {/* Header */}
             <div className="relative mb-12 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#262626] pb-32 overflow-hidden">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>

                <div className="max-w-[1800px] mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Hidden spacer to balance flex */}
                         <div className="hidden md:block w-[300px]" />

                        <div className="relative group cursor-default">
                            <div className="absolute -inset-1 rounded-full"></div>
                            <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-[#0a0a0a] text-orange-600 dark:text-orange-500 rounded-full text-sm font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-500/20">
                                <Trophy className="w-4 h-4" />
                                Competition Arena
                            </div>
                        </div>

                         {/* View Toggle - Positioned right */}
                         <div className="w-full md:w-[300px] flex justify-center md:justify-end">
                             <div className="bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md p-1 rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm flex items-center gap-1">
                                <button
                                    onClick={() => setViewMode("internal")}
                                    className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                        viewMode === "internal"
                                            ? "text-white"
                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]"
                                    }`}
                                >
                                     {viewMode === "internal" && (
                                        <motion.div
                                            layoutId="viewMode"
                                            className="absolute inset-0 bg-orange-600 rounded-lg"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <Trophy className="w-3.5 h-3.5" />
                                        Official
                                    </span>
                                </button>

                                <button
                                    onClick={() => setViewMode("calendar")}
                                    className={`relative px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                        viewMode === "calendar"
                                            ? "text-white"
                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]"
                                    }`}
                                >
                                    {viewMode === "calendar" && (
                                        <motion.div
                                            layoutId="viewMode"
                                            className="absolute inset-0 bg-orange-600 rounded-lg"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-1.5">
                                        <Globe className="w-3.5 h-3.5" />
                                        Global
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto px-8 relative -mt-8">
                <AnimatePresence mode="wait">
                    {viewMode === "internal" ? (
                        <motion.div
                            key="internal"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ContestsPageContent contests={internalContests} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ContestCalendar contests={externalContests} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
