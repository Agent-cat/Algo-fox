"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import {
  format,
  subMonths,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isFuture,
  isToday,
} from "date-fns";

interface StreakCalendarWidgetProps {
  activityDates: string[]; // YYYY-MM-DD
  currentStreak: number;
  bestStreak: number;
}

export function StreakCalendarWidget({ activityDates, currentStreak, bestStreak }: StreakCalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const activitySet = useMemo(() => new Set(activityDates), [activityDates]);

  const handlePrevMonth = () => setCurrentDate((prev) => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate((prev) => addMonths(prev, 1));

  const isCurrentMonth = isSameMonth(currentDate, new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // Pad start to Sunday
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // Pad end to Saturday
  const endDate = new Date(monthEnd);
  if (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  }

  const daysInGrid = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-[#FDFDFD] dark:bg-[#202227] rounded-3xl p-3 w-full flex flex-col border-2 border-dotted border-gray-300 dark:border-white/20 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={handlePrevMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-sm font-bold tracking-wide text-gray-900 dark:text-white">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          disabled={isCurrentMonth}
          className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-0.5 mb-1.5">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div key={idx} className="text-center text-[9px] font-bold text-gray-400 dark:text-gray-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-y-2.5 gap-x-0.5 mb-2">
        {daysInGrid.map((day, idx) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const hasSubmitted = activitySet.has(dateStr);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDate = isToday(day);
          const isFutureDate = isFuture(day);

          if (!isCurrentMonth) {
            return <div key={idx} className="w-8 h-8" />;
          }

          let circleClass =
            "w-8 h-8 rounded-full flex items-center justify-center text-[8px] font-bold transition-all";
          let textClass = "";

          if (hasSubmitted) {
            circleClass += " border border-green-400";
            textClass = "text-green-600 dark:text-green-400";
          } else if (isFutureDate) {
            textClass = "text-gray-400 dark:text-gray-500";
          } else {
            circleClass += " border border-red-300 dark:border-red-400/50";
            textClass = "text-gray-500 dark:text-gray-400";
          }

          if (isTodayDate) {
            circleClass += " ring-2 ring-offset-1 ring-offset-[#FDFDFD] dark:ring-offset-[#202227] ring-indigo-500";
            if (!hasSubmitted) textClass = "text-gray-900 dark:text-white";
          }

          return (
            <div key={idx} className="flex justify-center items-center">
              <div className={circleClass}>
                <span className={textClass}>{format(day, "d")}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-around pt-2 border-t border-gray-100 dark:border-white/10">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Current</span>
          <span className="text-[11px] font-bold text-gray-900 dark:text-white">{currentStreak}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Flame className="w-3 h-3 text-green-500 fill-current" />
          <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Best</span>
          <span className="text-[11px] font-bold text-gray-900 dark:text-white">{bestStreak}</span>
        </div>
      </div>
    </div>
  );
}
