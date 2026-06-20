"use client";

import { ChevronDown, ExternalLink, CalendarPlus, Trophy, Code2, Code, Terminal, BrainCircuit } from "lucide-react";
import { format, isSameDay } from "date-fns";

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

export function UpcomingContestsWidget({ contests }: UpcomingContestsWidgetProps) {
  // Google Calendar format generator
  const getGoogleCalendarUrl = (contest: ContestEvent) => {
    const formatTime = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const title = encodeURIComponent(contest.name);
    const details = encodeURIComponent(`Platform: ${contest.platform}\nLink: ${contest.url}`);
    const dates = `${formatTime(contest.startTime)}/${formatTime(contest.endTime)}`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}`;
  };

  const getPlatformIcon = (platform: string) => {
    // Return appropriate generic icon mapped to platform
    if (platform === "LeetCode") return <Code2 className="w-4 h-4 text-yellow-500 shrink-0" />;
    if (platform === "CodeForces") return <Terminal className="w-4 h-4 text-blue-500 shrink-0" />;
    if (platform === "CodeChef") return <BrainCircuit className="w-4 h-4 text-amber-600 shrink-0" />;
    if (platform === "AtCoder") return <Code className="w-4 h-4 text-gray-800 dark:text-gray-200 shrink-0" />;
    if (platform === "Algo-fox") return <Trophy className="w-4 h-4 text-orange-500 shrink-0" />;
    return <Trophy className="w-4 h-4 text-gray-500 shrink-0" />;
  };

  return (
    <div className="bg-[#fafafa] dark:bg-[#202227] rounded-3xl p-6 w-full max-w-sm mx-auto flex flex-col relative overflow-hidden border-2 border-dotted border-gray-300 dark:border-white/20 shadow-none">
       <div className="flex items-center justify-between mb-4">
         <h2 className="text-gray-600 dark:text-gray-400 font-medium">Upcoming events</h2>
         <ChevronDown className="w-5 h-5 text-gray-400" />
       </div>

       <div className="flex flex-col gap-3 max-h-[235px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
         {contests.length === 0 ? (
           <p className="text-sm text-gray-400 text-center py-4">No upcoming contests</p>
         ) : (
           contests.map((contest) => (
             <div key={contest.id} className="bg-transparent dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col gap-2 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {format(contest.startTime, "h:mm a")} - {format(contest.endTime, "h:mm a")}
                    {!isSameDay(contest.startTime, new Date()) && ` (${format(contest.startTime, "MMM d")})`}
                  </span>
                </div>

                <div className="flex items-center gap-2 pl-1">
                  {getPlatformIcon(contest.platform)}
                  <h3 className="text-[13px] font-semibold text-gray-900 dark:text-white truncate" title={contest.name}>{contest.name}</h3>
                </div>

                <div className="flex items-center justify-between mt-1 pt-3">
                   <a 
                     href={getGoogleCalendarUrl(contest)} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="flex items-center gap-1.5 text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors"
                   >
                      <CalendarPlus className="w-4 h-4 text-gray-400" />
                      Add to Calendar
                   </a>
                   <a
                     href={contest.url}
                     target={contest.platform === "Algo-fox" ? "_self" : "_blank"}
                     rel="noopener noreferrer"
                   >
                      <ExternalLink className="w-4 h-4 text-blue-400 hover:text-blue-500 transition-colors" />
                   </a>
                </div>
             </div>
           ))
         )}
       </div>
    </div>
  );
}
