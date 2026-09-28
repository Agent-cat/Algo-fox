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

    // 1. Generate the calendar grid data (last 365 days approx, grouped by month)
    const monthBlocks = useMemo(() => {
        const today = new Date();
        const endDate = new Date(today);

        // Start date: exactly 1 year ago
        const startDate = new Date(today);
        startDate.setFullYear(startDate.getFullYear() - 1);

        const blocks: { month: string, year: number, weeks: (Date | null)[][] }[] = [];
        
        let currentYear = startDate.getFullYear();
        let currentMonth = startDate.getMonth();
        
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        
        while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
            const monthStr = new Date(currentYear, currentMonth, 1).toLocaleString('default', { month: 'short' });
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            const weeks: (Date | null)[][] = [];
            let currentWeek: (Date | null)[] = [];
            
            // Pad start of first week with nulls to align with weekdays
            const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
            for (let i = 0; i < firstDayOfWeek; i++) {
                currentWeek.push(null);
            }
            
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(currentYear, currentMonth, day);
                
                // If the date is before our 365-day window, or after today, we push null
                if (date < startDate || date > endDate) {
                    currentWeek.push(null);
                } else {
                    currentWeek.push(date);
                }

                if (currentWeek.length === 7) {
                    weeks.push(currentWeek);
                    currentWeek = [];
                }
            }
            
            // Pad end of last week with nulls
            if (currentWeek.length > 0) {
                while (currentWeek.length < 7) {
                    currentWeek.push(null);
                }
                weeks.push(currentWeek);
            }
            
            blocks.push({ month: monthStr, year: currentYear, weeks });
            
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        }

        return blocks;
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
        if (count === 0) return "bg-gray-200 dark:bg-white/10";
        if (count <= 2) return "bg-orange-200 dark:bg-orange-900/50";
        if (count <= 5) return "bg-orange-300 dark:bg-orange-700";
        if (count <= 8) return "bg-orange-400 dark:bg-orange-600";
        return "bg-orange-500 dark:bg-orange-500";
    };

    let globalWeekIndex = 0; // For staggering animations across the whole graph

    return (
        <div className="w-full overflow-x-auto overflow-y-hidden pb-2">
            <div className="min-w-fit flex gap-2">
                {/* Day Labels (Mon, Wed, Fri) */}
                <div className="flex flex-col gap-[3px] text-[10px] text-gray-500 dark:text-gray-400 mt-[1px]">
                    <span className="h-3 leading-3 invisible">Sun</span>
                    <span className="h-3 leading-3">Mon</span>
                    <span className="h-3 leading-3 invisible">Tue</span>
                    <span className="h-3 leading-3">Wed</span>
                    <span className="h-3 leading-3 invisible">Thu</span>
                    <span className="h-3 leading-3">Fri</span>
                    <span className="h-3 leading-3 invisible">Sat</span>
                </div>

                {/* Heatmap Grid grouped by months */}
                <div className="flex gap-3">
                    {monthBlocks.map((block, mIndex) => (
                        <div key={`${block.month}-${block.year}-${mIndex}`} className="flex flex-col gap-2">
                            <div className="flex gap-[3px]">
                                {block.weeks.map((week, wIndex) => {
                                    const currWeekIdx = globalWeekIndex++;
                                    return (
                                        <div key={wIndex} className="flex flex-col gap-[3px]">
                                            {week.map((date, dIndex) => {
                                                if (!date) {
                                                    return <div key={`empty-${currWeekIdx}-${dIndex}`} className="w-3 h-3 rounded-[2px] bg-transparent" />;
                                                }

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
                                                        transition={{ delay: (currWeekIdx * 7 + dIndex) * 0.0005 }}
                                                        className={`w-3 h-3 rounded-[2px] ${getIntensityClass(count)} hover:ring-2 ring-offset-1 ring-orange-300 cursor-pointer relative group`}
                                                    >
                                                        {/* Tooltip */}
                                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 whitespace-nowrap">
                                                            <div className="bg-gray-900 dark:bg-white text-white dark:text-black text-[11px] py-1 px-2 rounded shadow-lg border border-gray-800 dark:border-gray-200">
                                                                <span className="font-semibold">{count} contributions</span> on {titleDate}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                            <span className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
                                {block.month}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 dark:text-gray-500 justify-end mr-4">
                <span>Less</span>
                <div className="flex gap-[3px]">
                    <div className="w-3 h-3 rounded-[2px] bg-gray-200 dark:bg-white/10" />
                    <div className="w-3 h-3 rounded-[2px] bg-orange-200 dark:bg-orange-900/50" />
                    <div className="w-3 h-3 rounded-[2px] bg-orange-300 dark:bg-orange-700" />
                    <div className="w-3 h-3 rounded-[2px] bg-orange-400 dark:bg-orange-600" />
                    <div className="w-3 h-3 rounded-[2px] bg-orange-500 dark:bg-orange-500" />
                </div>
                <span>More</span>
            </div>
        </div>
    );
}

export default memo(ActivityHeatmap);
