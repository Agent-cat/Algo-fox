"use client";

import { useState } from "react";
import type { Contest, Platform } from "@/lib/contest-fetcher";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isToday,
    parseISO,
    startOfWeek,
    endOfWeek
} from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    Filter,
    Clock,
    Plus,
    Calendar as CalendarIcon,
    ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContestCalendarProps {
    contests: Contest[];
    viewMode: "calendar" | "list";
}

const PLATFORM_LABELS: Record<string, string> = {
    "LeetCode": "LeetCode",
    "CodeForces": "CodeForces",
    "CodeChef": "CodeChef"
};

const PLATFORM_LOGOS: Record<string, string> = {
    "LeetCode": "https://cdn.simpleicons.org/leetcode/FFA116",
    "CodeForces": "https://cdn.simpleicons.org/codeforces/1890FF",
    "CodeChef": "https://cdn.simpleicons.org/codechef/5B4638"
};

export function ContestCalendar({ contests, viewMode }: ContestCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showFilters, setShowFilters] = useState(false);
    const [enabledPlatforms, setEnabledPlatforms] = useState<Record<Platform, boolean>>({
        "LeetCode": true,
        "CodeForces": true,
        "CodeChef": true,
        "AtCoder": false
    });

    const filteredContests = contests.filter(c => enabledPlatforms[c.site as Platform]);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    const selectedDayContests = selectedDate
        ? filteredContests.filter(c => isSameDay(parseISO(c.start_time), selectedDate))
        : [];

    const upcomingContests = filteredContests
        .filter(c => new Date(c.start_time) >= new Date())
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

    const togglePlatform = (platform: Platform) => {
        setEnabledPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }));
    };

    const addToCalendar = (contest: Contest) => {
        const start = new Date(contest.start_time).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(contest.end_time).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.name)}&dates=${start}/${end}&details=${encodeURIComponent(`Contest on ${contest.site}\nLink: ${contest.url}`)}&location=${encodeURIComponent(contest.url)}`;
        window.open(url, "_blank");
    };

    const formatDate = (date: string) => {
        const d = new Date(date);
        const now = new Date();
        const diffMs = d.getTime() - now.getTime();
        const diffDays = Math.ceil(diffMs / 86400000);

        if (diffDays < 0) return "Ended";
        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Tomorrow";
        return format(d, "MMM d");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Button (List View Only) */}
            {viewMode === "list" && (
                <div className="flex justify-end mb-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a1a1f] border border-gray-200 dark:border-white/10 rounded-xl text-[12px] font-semibold text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20 transition-all"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>

                        {showFilters && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowFilters(false)} />
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#24262C] border border-gray-200 dark:border-[#333] rounded-xl shadow-xl z-50 p-3">
                                    <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">
                                        Platforms
                                    </div>
                                    <div className="space-y-1">
                                        {Object.keys(PLATFORM_LABELS).map((platform) => (
                                            <button
                                                key={platform}
                                                onClick={() => togglePlatform(platform as Platform)}
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                                    enabledPlatforms[platform as Platform]
                                                        ? "bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white"
                                                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                                                }`}
                                            >
                                                <img src={PLATFORM_LOGOS[platform]} alt={platform} className="w-4 h-4" />
                                                {platform}
                                                {enabledPlatforms[platform as Platform] && (
                                                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {viewMode === "calendar" ? (
                    <motion.div
                        key="calendar"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <CalendarView
                            currentDate={currentDate}
                            setCurrentDate={setCurrentDate}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            filteredContests={filteredContests}
                            calendarDays={calendarDays}
                            addToCalendar={addToCalendar}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ListView
                            contests={upcomingContests}
                            addToCalendar={addToCalendar}
                            formatDate={formatDate}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Calendar View ───────────────────────────────────────────────
function CalendarView({
    currentDate,
    setCurrentDate,
    selectedDate,
    setSelectedDate,
    filteredContests,
    calendarDays,
    addToCalendar
}: {
    currentDate: Date;
    setCurrentDate: (d: Date) => void;
    selectedDate: Date | null;
    setSelectedDate: (d: Date) => void;
    filteredContests: Contest[];
    calendarDays: Date[];
    addToCalendar: (c: Contest) => void;
}) {
    return (
        <div className="bg-[#FAFAFB] dark:bg-[#202227] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {format(currentDate, "MMMM yyyy")}
                </h2>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-gray-500 dark:text-gray-400"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date())}
                        className="text-[11px] font-bold px-3 py-1.5 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        Today
                    </button>
                    <button
                        onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-colors text-gray-500 dark:text-gray-400"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 mb-3">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest py-2">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-white/5 rounded-xl overflow-hidden">
                {calendarDays.map((day) => {
                    const isSelected = selectedDate && isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    const dayContests = filteredContests.filter(c => isSameDay(parseISO(c.start_time), day));

                    return (
                        <div
                            key={day.toString()}
                            onClick={() => setSelectedDate(day)}
                            className={`
                                relative min-h-[110px] lg:min-h-[130px] p-2.5 transition-colors cursor-pointer flex flex-col
                                ${!isCurrentMonth ? "bg-gray-50 dark:bg-[#181a1f]" : "bg-[#FAFAFB] dark:bg-[#202227] hover:bg-gray-50 dark:hover:bg-[#1a1a1f]"}
                                ${isSelected ? "bg-orange-50 dark:bg-orange-500/10" : ""}
                            `}
                        >
                            <span className={`
                                text-[11px] font-bold mb-1.5 block w-6 h-6 flex items-center justify-center rounded-full
                                ${isToday(day) ? "bg-orange-500 text-white" : "text-gray-600 dark:text-gray-400"}
                                ${!isCurrentMonth ? "text-gray-300 dark:text-gray-700" : ""}
                            `}>
                                {format(day, "d")}
                            </span>

                            <div className="flex-1 flex flex-col gap-1">
                                {dayContests.slice(0, 3).map((contest) => (
                                    <div
                                        key={contest.id}
                                        className="group/contest relative"
                                    >
                                        <div className="px-1.5 py-1 rounded-md bg-white dark:bg-[#1a1a1f] border border-gray-100 dark:border-white/5 hover:border-orange-500/50 transition-colors flex items-center gap-1">
                                            <img src={PLATFORM_LOGOS[contest.site]} className="w-2.5 h-2.5 opacity-70" alt="" />
                                            <p className="text-[9px] font-medium text-gray-600 dark:text-gray-400 truncate leading-tight">
                                                {contest.name}
                                            </p>
                                        </div>

                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pt-2 opacity-0 group-hover/contest:opacity-100 transition-opacity pointer-events-none group-hover/contest:pointer-events-auto z-50 w-64">
                                            <div className="bg-white dark:bg-[#24262C] border border-gray-200 dark:border-[#333] rounded-xl p-3 shadow-xl mb-2">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <img src={PLATFORM_LOGOS[contest.site]} className="w-4 h-4" alt="" />
                                                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">{contest.site}</span>
                                                </div>
                                                <h4 className="text-[13px] font-bold text-gray-900 dark:text-white mb-1.5 leading-tight">{contest.name}</h4>
                                                <div className="flex items-center gap-3 text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                                                    <span className="flex items-center gap-1">
                                                        <CalendarIcon className="w-3 h-3" />
                                                        {format(parseISO(contest.start_time), "MMM d, HH:mm")}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        {Math.round(parseInt(contest.duration) / 60)}m
                                                    </span>
                                                </div>
                                                <a
                                                    href={contest.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full text-center py-2 bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-colors"
                                                >
                                                    Enter Contest
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {dayContests.length > 3 && (
                                    <div className="text-[9px] text-gray-400 dark:text-gray-500 pl-1 font-medium">
                                        +{dayContests.length - 3} more
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── List View ───────────────────────────────────────────────────
function ListView({
    contests,
    addToCalendar,
    formatDate
}: {
    contests: Contest[];
    addToCalendar: (c: Contest) => void;
    formatDate: (d: string) => string;
}) {
    return (
        <div className="space-y-3">
            {contests.length === 0 ? (
                <div className="bg-[#FAFAFB] dark:bg-[#202227] rounded-2xl border border-gray-200 dark:border-white/10 p-12 text-center">
                    <CalendarIcon className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">No upcoming contests found</p>
                </div>
            ) : (
                contests.map((contest) => (
                    <div
                        key={contest.id}
                        className="bg-[#FAFAFB] dark:bg-[#202227] rounded-2xl border border-gray-200 dark:border-white/10 p-4 hover:border-gray-300 dark:hover:border-white/20 transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            {/* Platform Logo */}
                            <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#1a1a1f] border border-gray-100 dark:border-white/5 flex items-center justify-center flex-shrink-0">
                                <img src={PLATFORM_LOGOS[contest.site]} alt={contest.site} className="w-5 h-5" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white truncate group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                                    {contest.name}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                                        {formatDate(contest.start_time)}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                        {format(parseISO(contest.start_time), "HH:mm")} - {format(parseISO(contest.end_time), "HH:mm")}
                                    </span>
                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                                        {Math.round(parseInt(contest.duration) / 60)} min
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={() => addToCalendar(contest)}
                                    className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all"
                                    title="Add to Calendar"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                                <a
                                    href={contest.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black text-[11px] font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                >
                                    Open
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
