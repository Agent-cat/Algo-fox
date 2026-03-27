"use client";

import { useState } from "react";
import { ContestsPageContent } from "./ContestsPageContent";
import { ContestCalendar } from "./ContestCalendar";
import type { Contest } from "@/lib/contest-fetcher";
import { Trophy, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContestPageClientProps {
    internalContests: any[];
    externalContests: Contest[];
}

export function ContestPageClient({ internalContests, externalContests }: ContestPageClientProps) {
    const [viewMode, setViewMode] = useState<"internal" | "calendar">("internal");

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
             {/* Header Section */}
             <div className="max-w-7xl mx-auto relative group">
                {/* Background Glow */}
                <div className="absolute left-1/2 -top-24 -translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-orange-600/20 dark:bg-orange-500/10 blur-[100px]"></div>

                {/* Background Pattern */}
                <div className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="text-center mb-16 relative z-10">


                    {/* View Toggle - Centered */}
                    <div className="flex justify-center">
                        <div className="bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md p-1 rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm flex items-center gap-1">
                            <button
                                onClick={() => setViewMode("internal")}
                                className={`relative px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
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
                                <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-widest">
                                    <Trophy className="w-3.5 h-3.5" />
                                    Official
                                </span>
                            </button>

                            <button
                                onClick={() => setViewMode("calendar")}
                                className={`relative px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
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
                                <span className="relative z-10 flex items-center gap-1.5 uppercase tracking-widest">
                                    <Globe className="w-3.5 h-3.5" />
                                    Global
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <AnimatePresence mode="wait">
                    {viewMode === "internal" ? (
                        <motion.div
                            key="internal"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-7xl mx-auto"
                        >
                            <ContestsPageContent contests={internalContests} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="w-full"
                        >
                            <ContestCalendar contests={externalContests} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
