"use client";

import { useState } from "react";
import { ContestsPageContent } from "./ContestsPageContent";
import { ContestCalendar } from "./ContestCalendar";
import type { Contest } from "@/lib/contest-fetcher";
import { Trophy, Calendar, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContestPageClientProps {
    internalContests: any[];
    externalContests: Contest[];
}

export function ContestPageClient({ internalContests, externalContests }: ContestPageClientProps) {
    const [viewMode, setViewMode] = useState<"internal" | "calendar">("internal");

    return (
        <div className="min-h-screen dark:bg-[#121212] pb-20 pt-4">
             {/* Header */}
             <div className="relative mb-0 bg-[#fafafa] dark:bg-[#121212] pb-8 overflow-hidden">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>

                <div className="max-w-[1800px] mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-end gap-6">
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

            <div className="max-w-[1800px] mx-auto px-8 relative">
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
