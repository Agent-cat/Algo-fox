"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContestsPageContent } from "./ContestsPageContent";
import { ContestCalendar } from "./ContestCalendar";
import type { Contest } from "@/lib/contest-fetcher";
import { Trophy, Globe, Calendar as CalendarIcon, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageTooltip } from "@/components/shared/PageTooltip";

interface ContestPageClientProps {
    internalContests: any[];
    externalContests: Contest[];
    pagination?: {
        page: number;
        totalPages: number;
        total: number;
    };
    initialTab?: "active" | "past";
}

export function ContestPageClient({ internalContests, externalContests, pagination, initialTab }: ContestPageClientProps) {
    const searchParams = useSearchParams();
    const initialView = searchParams.get("view") === "global" ? "calendar" : "internal";
    const [viewMode, setViewMode] = useState<"internal" | "calendar">(initialView);
    const [calendarViewMode, setCalendarViewMode] = useState<"calendar" | "list">("calendar");

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
                                Contests
                            </h1>
                            <PageTooltip description="Compete in timed coding contests, track global rankings, and test your skills against others." />
                        </div>
                    </div>
                </motion.div>

                {/* Header Tools */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
                >
                    {/* Main Toggle (Official/Global) */}
                    <div className="bg-white/80 dark:bg-[#24262C]/80 backdrop-blur-md p-1 rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm flex items-center gap-1">
                        <button
                            onClick={() => setViewMode("internal")}
                            className={`relative px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
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
                            className={`relative px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
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

                    {/* Calendar/List Toggle (only when Global is selected) */}
                    {viewMode === "calendar" && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="bg-white/80 dark:bg-[#24262C]/80 backdrop-blur-md p-1 rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm flex items-center gap-1"
                        >
                            <button
                                onClick={() => setCalendarViewMode("calendar")}
                                className={`relative px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                    calendarViewMode === "calendar"
                                        ? "text-white"
                                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]"
                                }`}
                            >
                                {calendarViewMode === "calendar" && (
                                    <motion.div
                                        layoutId="calendarViewMode"
                                        className="absolute inset-0 bg-gray-900 dark:bg-white rounded-lg"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-1.5">
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    Calendar
                                </span>
                            </button>

                            <button
                                onClick={() => setCalendarViewMode("list")}
                                className={`relative px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                                    calendarViewMode === "list"
                                        ? "text-white"
                                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626]"
                                }`}
                            >
                                {calendarViewMode === "list" && (
                                    <motion.div
                                        layoutId="calendarViewMode"
                                        className="absolute inset-0 bg-gray-900 dark:bg-white rounded-lg"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-1.5">
                                    <List className="w-3.5 h-3.5" />
                                    List
                                </span>
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {viewMode === "internal" ? (
                            <motion.div
                                key="internal"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ContestsPageContent
                                    contests={internalContests}
                                    page={pagination?.page || 1}
                                    totalPages={pagination?.totalPages || 1}
                                    initialTab={initialTab}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="calendar"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ContestCalendar contests={externalContests} viewMode={calendarViewMode} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}
