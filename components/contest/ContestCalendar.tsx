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
    ExternalLink,
    Trophy,
    Calendar as CalendarIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContestCalendarProps {
    contests: Contest[];
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

export function ContestCalendar({ contests }: ContestCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [enabledPlatforms, setEnabledPlatforms] = useState<Record<Platform, boolean>>({
        "LeetCode": true,
        "CodeForces": true,
        "CodeChef": true,
        "AtCoder": false // Legacy support if needed, but hidden from UI
    });

    // Filter Contests
    const filteredContests = contests.filter(c => enabledPlatforms[c.site as Platform]);

    // Calendar Calculations
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

    // Contests for the selected date
    const selectedDayContests = selectedDate
        ? filteredContests.filter(c => isSameDay(parseISO(c.start_time), selectedDate))
        : [];

    // Upcoming contests (next 10)
    const upcomingContests = filteredContests
        .filter(c => new Date(c.start_time) >= new Date())
        .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
        .slice(0, 10);

    const togglePlatform = (platform: Platform) => {
        setEnabledPlatforms(prev => ({ ...prev, [platform]: !prev[platform] }));
    };

    const addToCalendar = (contest: Contest) => {
        const start = new Date(contest.start_time).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const end = new Date(contest.end_time).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(contest.name)}&dates=${start}/${end}&details=${encodeURIComponent(`Contest on ${contest.site}\nLink: ${contest.url}`)}&location=${encodeURIComponent(contest.url)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 font-mono">
            {/* Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0 order-2 lg:order-1 space-y-6">

                {/* Filters */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222] p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-4 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider font-bold">
                        <Filter className="w-3 h-3" />
                        <span>Platform Filters</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.keys(PLATFORM_LABELS).map((platform) => (
                            <button
                                key={platform}
                                onClick={() => togglePlatform(platform as Platform)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                                    enabledPlatforms[platform as Platform]
                                        ? "bg-gray-900 dark:bg-white text-white dark:text-black border-transparent dark:border-white shadow-md"
                                        : "bg-transparent text-gray-500 border-gray-200 dark:border-[#333] hover:border-gray-400 dark:hover:border-gray-500"
                                }`}
                            >
                                <img src={PLATFORM_LOGOS[platform]} alt={platform} className="w-3 h-3" />
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Upcoming List */}
                <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-[#222] p-5 shadow-sm min-h-[400px]">
                    <div className="flex items-center gap-2 mb-6 text-orange-600 dark:text-orange-500 text-xs uppercase tracking-wider font-bold">
                        <Clock className="w-3 h-3" />
                        <span>Upcoming Contests</span>
                    </div>

                    <div className="space-y-4">
                        {upcomingContests.length === 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-600 font-mono text-center py-8">No upcoming contests found.</p>
                        ) : (
                            upcomingContests.map(contest => (
                                <div key={contest.id} className="group relative pl-4 border-l border-gray-200 dark:border-[#333] hover:border-orange-500 transition-colors py-1">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] uppercase text-gray-500 tracking-wider">
                                                {format(parseISO(contest.start_time), "MMM d, HH:mm")}
                                            </span>
                                            <img src={PLATFORM_LOGOS[contest.site]} alt={contest.site} className="w-3 h-3 opacity-60" />
                                        </div>
                                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors line-clamp-1 cursor-pointer" onClick={() => window.open(contest.url, '_blank')}>
                                            {contest.name}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => addToCalendar(contest)}
                                                className="text-[10px] flex items-center gap-1 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            >
                                                <Plus className="w-3 h-3" /> Add to Cal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Main Calendar */}
            <div className="flex-1 order-1 lg:order-2 bg-white dark:bg-[#111] rounded-3xl border border-gray-200 dark:border-[#222] p-8 min-h-[600px] flex flex-col">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        {format(currentDate, "MMMM yyyy")}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-[#222] rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setCurrentDate(new Date())}
                            className="text-xs font-bold px-3 py-1.5 bg-gray-100 dark:bg-[#222] text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-[#333] hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Today
                        </button>
                        <button
                            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-[#222] rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="text-left pl-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="flex-1 grid grid-cols-7 gap-px bg-gray-200 dark:bg-[#222] border border-gray-200 dark:border-[#222] rounded-xl overflow-visible isolate">
                    {calendarDays.map((day, dayIdx) => {
                        const isSelected = selectedDate && isSameDay(day, selectedDate);
                        const isCurrentMonth = isSameMonth(day, currentDate);
                        const dayContests = filteredContests.filter(c => isSameDay(parseISO(c.start_time), day));

                        return (
                            <div
                                key={day.toString()}
                                onClick={() => setSelectedDate(day)}
                                className={`
                                    relative min-h-[100px] lg:min-h-[120px] p-2 transition-colors cursor-pointer flex flex-col gap-1
                                    ${!isCurrentMonth ? "bg-gray-50 dark:bg-[#0a0a0a] text-gray-400 dark:text-gray-800" : "bg-white dark:bg-[#111] hover:bg-gray-50 dark:hover:bg-[#161616] text-gray-500 dark:text-gray-400"}
                                    ${isSelected ? "bg-orange-50/50 dark:bg-[#161616] ring-1 ring-orange-500 inset-0 z-0" : ""}
                                `}
                            >
                                <span className={`
                                    text-[10px] font-bold mb-1 block w-6 h-6 flex items-center justify-center rounded-full
                                    ${isToday(day) ? "bg-orange-600 text-white" : ""}
                                `}>
                                    {format(day, "d")}
                                </span>

                                {/* Day Events */}
                                <div className="flex-1 flex flex-col gap-1 overflow-visible relative z-10">
                                    {dayContests.slice(0, 3).map((contest, i) => (
                                        <div
                                            key={contest.id}
                                            className="group/contest relative"
                                        >
                                            <div className="px-1.5 py-1 rounded bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#222] hover:border-orange-500/50 hover:bg-white dark:hover:bg-[#222] transition-colors flex items-center gap-1.5">
                                                <img src={PLATFORM_LOGOS[contest.site]} className="w-2.5 h-2.5 opacity-80" alt="" />
                                                <p className="text-[9px] font-medium text-gray-700 dark:text-gray-300 truncate leading-tight">
                                                    {contest.name}
                                                </p>
                                            </div>

                                            {/* Hover Card */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pt-2 opacity-0 group-hover/contest:opacity-100 transition-opacity pointer-events-none group-hover/contest:pointer-events-auto z-50 w-64 shadow-xl">
                                                <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-xl p-3 shadow-2xl mb-2">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <img src={PLATFORM_LOGOS[contest.site]} className="w-4 h-4" alt="" />
                                                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{contest.site}</span>
                                                        {contest.status === "FINISHED" && <span className="ml-auto text-[10px] text-gray-600 bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded">Ended</span>}
                                                    </div>
                                                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 leading-tight">{contest.name}</h4>
                                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-3">
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
                                                        className="block w-full text-center py-1.5 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                                                    >
                                                        Enter Contest
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {dayContests.length > 3 && (
                                        <div className="text-[9px] text-gray-500 dark:text-gray-600 pl-1">
                                            +{dayContests.length - 3} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
