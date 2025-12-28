"use client";

import { useMemo, memo } from "react";
import { motion } from "framer-motion";

interface ActivityHeatmapProps {
    submissions: {
        createdAt: Date;
        status: string;
    }[];
}

function ActivityHeatmap({ submissions }: ActivityHeatmapProps) {
    // Utilities
    const formatDateKey = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    // 1. Generate the calendar grid data (last 365 days approx, aligned to weeks)
    const { weeks, monthLabels } = useMemo(() => {
        const today = new Date();
        const endDate = new Date(today);

        // Start date: 1 year ago
        const startDate = new Date(today);
        startDate.setFullYear(startDate.getFullYear() - 1);

        // Adjust start date to the previous Sunday to align the grid
        // Day 0 is Sunday
        const dayOfWeek = startDate.getDay();
        startDate.setDate(startDate.getDate() - dayOfWeek);

        const weeksArr = [];
        const monthsArr = [];

        let currentDate = new Date(startDate);
        let currentWeek = [];
        let weekIndex = 0;

        while (currentDate <= endDate) {
            // Add day to current week
            currentWeek.push(new Date(currentDate));

            // If week is full (7 days), push to weeks and reset
            if (currentWeek.length === 7) {
                weeksArr.push(currentWeek);

                // check for month label
                const firstDayOfWeek = currentWeek[0];
                const month = firstDayOfWeek.toLocaleString('default', { month: 'short' });

                // Logic: Show label if it's the first week of the month visible in this row
                // Or simply every ~4 weeks, but let's try to be accurate
                // A simplified standard github-like approach:
                // If the first day of the week is roughly the start of the month (1st-7th)
                if (firstDayOfWeek.getDate() <= 7) {
                    monthsArr.push({ month, weekIndex });
                }

                currentWeek = [];
                weekIndex++;
            }

            // Next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Handle partial last week if needed (though loop usually finishes on a boundary if we align precisely)
        if (currentWeek.length > 0) {
            weeksArr.push(currentWeek);
        }

        return { weeks: weeksArr, monthLabels: monthsArr };
    }, []);

    // 2. Map submissions to dates
    const submissionMap = useMemo(() => {
        const map = new Map<string, number>();
        submissions.forEach(sub => {
            const dateKey = formatDateKey(new Date(sub.createdAt));
            map.set(dateKey, (map.get(dateKey) || 0) + 1);
        });
        return map;
    }, [submissions]);

    // 3. Color scale
    const getIntensityClass = (count: number) => {
        if (count === 0) return "bg-gray-100";
        if (count <= 2) return "bg-orange-200";
        if (count <= 5) return "bg-orange-300";
        if (count <= 8) return "bg-orange-400";
        return "bg-orange-500";
    };

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden pb-2">
            <div className="min-w-fit">
                <div className="flex text-xs text-gray-400 mb-2 relative h-4">
                    {monthLabels.map((label, i) => (
                        <span
                            key={`${label.month}-${i}`}
                            className="absolute top-0 pointer-events-none"
                            style={{
                                left: `${label.weekIndex * 15}px` // 12px (w-3) + 3px (gap-[3px]) = 15px per column
                            }}
                        >
                            {label.month}
                        </span>
                    ))}
                </div>

                <div className="flex gap-2">
                    {/* Day Labels (Mon, Wed, Fri) */}
                    <div className="flex flex-col gap-[3px] text-[10px] text-gray-500 mt-[1px]">
                        {/* 7 slots, align with grid rows */}
                        <span className="h-3 leading-3 invisible">Sun</span> {/* Spacer */}
                        <span className="h-3 leading-3">Mon</span>
                        <span className="h-3 leading-3 invisible">Tue</span>
                        <span className="h-3 leading-3">Wed</span>
                        <span className="h-3 leading-3 invisible">Thu</span>
                        <span className="h-3 leading-3">Fri</span>
                        <span className="h-3 leading-3 invisible">Sat</span>
                    </div>

                    {/* Heatmap Grid */}
                    <div className="flex gap-[3px]">
                        {weeks.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[3px]">
                                {week.map((date, dIndex) => {
                                    const dateKey = formatDateKey(date);
                                    const count = submissionMap.get(dateKey) || 0;
                                    const titleDate = date.toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    });

                                    return (
                                        <motion.div
                                            key={dateKey}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: (wIndex * 7 + dIndex) * 0.0005 }} // Staggered animation
                                            className={`w-3 h-3 rounded-[2px] ${getIntensityClass(count)} hover:ring-2 ring-offset-1 ring-orange-300 transition-all cursor-pointer relative group`}
                                        >
                                            {/* Simple Tooltip */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap">
                                                <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded shadow-lg">
                                                    <span className="font-semibold">{count} contributions</span> on {titleDate}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-end mr-4">
                    <span>Less</span>
                    <div className="flex gap-[3px]">
                        <div className="w-3 h-3 rounded-[2px] bg-gray-100" />
                        <div className="w-3 h-3 rounded-[2px] bg-orange-200" />
                        <div className="w-3 h-3 rounded-[2px] bg-orange-300" />
                        <div className="w-3 h-3 rounded-[2px] bg-orange-400" />
                        <div className="w-3 h-3 rounded-[2px] bg-orange-500" />
                    </div>
                    <span>More</span>
                </div>
            </div>
        </div>
    );
}

// Export memoized component to prevent unnecessary re-renders
export default memo(ActivityHeatmap);
