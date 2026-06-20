"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Check, Flame, Trophy } from "lucide-react";
import { format, subMonths, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isFuture, isToday, parseISO } from "date-fns";

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

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  // We want to pad the start to the beginning of the week (Sunday)
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  // We want to pad the end to the end of the week (Saturday)
  const endDate = new Date(monthEnd);
  if (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
  }

  const daysInGrid = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-[#fafafa] dark:bg-[#202227] rounded-3xl p-6 w-full max-w-sm mx-auto flex flex-col relative overflow-hidden border-2 border-dotted border-gray-300 dark:border-white/20 shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold tracking-wide text-gray-900 dark:text-white">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, idx) => (
          <div key={idx} className="text-center text-xs font-bold text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysInGrid.map((day, idx) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const hasSubmitted = activitySet.has(dateStr);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDate = isToday(day);
          const isFutureDate = isFuture(day);

          let circleClass = "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto relative transition-all bg-transparent";
          let textClass = "";

          if (!isCurrentMonth) {
            textClass = "text-gray-300 dark:text-gray-600 opacity-0"; // hide or dim days outside month
            circleClass += " opacity-0 pointer-events-none"; 
          } else if (hasSubmitted) {
            // Green dotted circle for done
            circleClass += " border-2 border-dotted border-green-500 dark:border-green-500";
            textClass = "text-green-600 dark:text-green-400";
          } else if (isFutureDate) {
            textClass = "text-gray-400 dark:text-gray-500";
          } else {
            // Past day, missed
            circleClass += " border-2 border-dotted border-red-400 dark:border-red-500/80";
            textClass = "text-gray-500 dark:text-gray-400";
          }

          if (isTodayDate) {
            // Outline today with blue (overriding borders)
            circleClass += " ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#202227] ring-[#5c6bc0]";
            if (!hasSubmitted) {
               textClass = "text-gray-900 dark:text-white";
            }
          }

          return (
            <div key={idx} className="flex justify-center items-center py-1">
              <div className={circleClass}>
                <span className={textClass}>{format(day, "d")}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-around mt-2">
        {/* Current */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Current</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{currentStreak}</span>
        </div>

        {/* Best */}
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-green-500 fill-current" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Best</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{bestStreak}</span>
        </div>
      </div>
    </div>
  );
}
