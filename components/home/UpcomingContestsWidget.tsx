"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, Trophy } from "lucide-react";
import { format, isSameDay, differenceInSeconds } from "date-fns";
import Link from "next/link";

export interface ContestEvent {
  id: string;
  name: string;
  url: string;
  startTime: Date;
  endTime: Date;
  platform: string;
}

interface UpcomingContestsWidgetProps {
  contests: ContestEvent[];
}

const PLATFORM_LOGOS: Record<string, string> = {
  LeetCode: "https://cdn.simpleicons.org/leetcode/FFA116",
  CodeForces: "https://cdn.simpleicons.org/codeforces/1890FF",
  CodeChef: "https://cdn.simpleicons.org/codechef/5B4638",
  AtCoder: "https://cdn.simpleicons.org/atcoder/222222",
};

function getGoogleCalendarUrl(contest: ContestEvent) {
  const fmt = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const title = encodeURIComponent(contest.name);
  const details = encodeURIComponent(`Platform: ${contest.platform}\nLink: ${contest.url}`);
  const dates = `${fmt(contest.startTime)}/${fmt(contest.endTime)}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
}

function formatTimeLeft(seconds: number): string {
  if (seconds <= 0) return "Ending soon";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h.toString().padStart(2, "0")}h ${m.toString().padStart(2, "0")}m left`;
  return `${m}m left`;
}

function PlatformLogo({ platform }: { platform: string }) {
  const src = PLATFORM_LOGOS[platform];
  if (src) {
    return <img src={src} alt={platform} className="w-8 h-8 lg:w-5.5 lg:h-5.5 xl:w-6.5 xl:h-6.5 2xl:w-8 2xl:h-8 rounded-lg object-contain" />;
  }
  // Algo-fox internal
  return (
    <div className="w-8 h-8 lg:w-5.5 lg:h-5.5 xl:w-6.5 xl:h-6.5 2xl:w-8 2xl:h-8 rounded-lg bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center">
      <Trophy className="w-4 h-4 lg:w-2.5 lg:h-2.5 xl:w-3.5 xl:h-3.5 text-orange-500" />
    </div>
  );
}

function ContestCard({ contest }: { contest: ContestEvent }) {
  const now = new Date();
  const isLive = contest.startTime <= now && contest.endTime > now;
  const isFuture = contest.startTime > now;

  const targetTime = isLive ? contest.endTime : contest.startTime;
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, differenceInSeconds(targetTime, new Date()))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(Math.max(0, differenceInSeconds(targetTime, new Date())));
    }, 30_000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const timeLabel = format(contest.startTime, "h:mm a");
  const endLabel = format(contest.endTime, "h:mm a");
  const dayLabel = isSameDay(contest.startTime, now)
    ? "Today"
    : isSameDay(contest.startTime, new Date(now.getTime() + 86400000))
    ? "Tomorrow"
    : format(contest.startTime, "MMM d");

  const isInternalContest = contest.platform === "Algo-fox";

  return (
    <div className="flex items-center gap-3 lg:gap-1.5 xl:gap-2 p-3 lg:p-1.5 xl:p-2.5 2xl:p-3 rounded-2xl bg-[#FAFAFB] dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all">
      {/* Platform logo */}
      <div className="shrink-0">
        <PlatformLogo platform={contest.platform} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Top row: LIVE badge + name */}
        <div className="flex items-center gap-2 lg:gap-1 mb-0.5">
          {isLive && (
            <span className="inline-flex items-center gap-1 px-1 py-0.5 lg:px-0.5 lg:py-0 rounded text-[10px] lg:text-[7.5px] xl:text-[9px] 2xl:text-[10px] font-bold bg-red-500 text-white uppercase tracking-wide shrink-0">
              <span className="w-1.5 h-1.5 lg:w-1 lg:h-1 rounded-full bg-white animate-pulse inline-block" />
              Live
            </span>
          )}
          {isInternalContest ? (
            <Link
              href={contest.url}
              className="text-[13px] lg:text-[10.5px] xl:text-[12px] 2xl:text-[13px] font-semibold text-gray-900 dark:text-white truncate leading-tight hover:text-orange-500 hover:underline hover:underline-offset-2 transition-colors"
            >
              {contest.name}
            </Link>
          ) : (
            <a
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] lg:text-[10.5px] xl:text-[12px] 2xl:text-[13px] font-semibold text-gray-900 dark:text-white truncate leading-tight hover:text-orange-500 hover:underline hover:underline-offset-2 transition-colors"
            >
              {contest.name}
            </a>
          )}
        </div>

        {/* Time */}
        <p className="text-[11px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">
          {dayLabel}, {timeLabel} – {endLabel}
        </p>

        {/* Time remaining */}
        <p className={`text-[11px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[11px] font-bold ${isLive ? "text-red-500" : "text-gray-400 dark:text-gray-500"}`}>
          {formatTimeLeft(secondsLeft)}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2 lg:gap-1 shrink-0 items-end">
        {/* Join / View */}
        {isLive && (
          isInternalContest ? (
            <Link
              href={contest.url}
              className="px-3 py-1.5 lg:px-1 lg:py-0.5 xl:px-1.5 xl:py-0.5 2xl:px-3 2xl:py-1.5 rounded-lg text-[11px] lg:text-[8.5px] xl:text-[10px] 2xl:text-[11px] font-bold bg-red-500 hover:bg-red-600 text-white transition-colors whitespace-nowrap"
            >
              Join
            </Link>
          ) : (
            <a
              href={contest.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 lg:px-1 lg:py-0.5 xl:px-1.5 xl:py-0.5 2xl:px-3 2xl:py-1.5 rounded-lg text-[11px] lg:text-[8.5px] xl:text-[10px] 2xl:text-[11px] font-bold bg-red-500 hover:bg-red-600 text-white transition-colors whitespace-nowrap"
            >
              Join
            </a>
          )
        )}

        {/* Add to Calendar */}
        <a
          href={getGoogleCalendarUrl(contest)}
          target="_blank"
          rel="noopener noreferrer"
          title="Add to Google Calendar"
          className="flex items-center gap-1.5 lg:gap-0.5 px-2.5 py-1 lg:px-1 lg:py-0.5 xl:px-1.5 xl:py-0.5 2xl:px-2.5 2xl:py-1 rounded-lg text-[10px] lg:text-[7.5px] xl:text-[8.5px] 2xl:text-[10px] font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all whitespace-nowrap"
        >
          <CalendarPlus className="w-3 h-3 lg:w-2 lg:h-2 xl:w-2.5 xl:h-2.5" />
          <span>Add to Cal</span>
        </a>
      </div>
    </div>
  );
}

export function UpcomingContestsWidget({ contests }: UpcomingContestsWidgetProps) {
  // Show only the top 2 nearest contests
  const topTwo = contests.slice(0, 2);

  return (
    <div className="bg-[#FDFDFD] dark:bg-[#202227] rounded-3xl p-5 lg:p-2.5 xl:p-3.5 2xl:p-5 w-full flex flex-col border-2 border-dotted border-gray-300 dark:border-white/20 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 lg:mb-2 xl:mb-3">
        <h2 className="text-[15px] lg:text-[10.5px] xl:text-[12px] 2xl:text-[15px] font-bold text-gray-900 dark:text-white">Upcoming Contests</h2>
        <a
          href="/contests?view=global"
          className="text-[11px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[11px] font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          View All
        </a>
      </div>

      {/* Contest cards */}
      <div className="flex flex-col gap-3">
        {topTwo.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">No upcoming contests</p>
        ) : (
          topTwo.map((contest) => <ContestCard key={contest.id} contest={contest} />)
        )}
      </div>
    </div>
  );
}
