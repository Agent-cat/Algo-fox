"use client";

import { Trophy, Calendar, Users, Globe, School, ArrowRight, Timer } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface ContestCardProps {
    contest: {
        id: string;
        title: string;
        description: string | null;
        startTime: Date;
        endTime: Date;
        visibility: "PUBLIC" | "INSTITUTION" | "CLASSROOM";
        _count?: {
            problems: number;
        };
    };
    userRole: string;
}

export function ContestCard({ contest, userRole }: ContestCardProps) {
    const isLive = new Date() >= new Date(contest.startTime) && new Date() <= new Date(contest.endTime);
    const isPast = new Date() > new Date(contest.endTime);
    const isUpcoming = new Date() < new Date(contest.startTime);

    return (
        <div className="group bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-[#262626] p-6 shadow-xl shadow-gray-500/5 dark:shadow-none hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5 hover:border-indigo-100 dark:hover:border-indigo-900/30">
            <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl ${isLive ? 'bg-rose-50 text-rose-600 animate-pulse' :
                    isUpcoming ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                    <Trophy className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isLive ? 'bg-rose-600 text-white' :
                        isUpcoming ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-[#262626] text-gray-600 dark:text-gray-400'
                        }`}>
                        {isLive ? 'Live' : isUpcoming ? 'Upcoming' : 'Ended'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#1a1a1a] px-2 py-1 rounded-lg">
                        {contest.visibility === 'PUBLIC' && <Globe className="w-3 h-3" />}
                        {contest.visibility === 'INSTITUTION' && <School className="w-3 h-3" />}
                        {contest.visibility === 'CLASSROOM' && <Users className="w-3 h-3" />}
                        <span className="capitalize">{contest.visibility.toLowerCase()}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {contest.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-2 mt-1 min-h-[40px]">
                        {contest.description || "No description provided."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Start Time</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                            {format(new Date(contest.startTime), "MMM d, HH:mm")}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Duration</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
                            <Timer className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                            {Math.round((new Date(contest.endTime).getTime() - new Date(contest.startTime).getTime()) / (1000 * 60 * 60))} Hours
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-50 dark:border-[#262626]">
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                            {contest._count?.problems || 0} Problems
                        </span>
                    </div>
                    <Link
                        href={`/contest/${contest.id}`}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group/btn"
                    >
                        View Arena
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
