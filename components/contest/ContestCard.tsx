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
        <div className="group bg-white rounded-3xl border border-gray-100 p-6 shadow-xl shadow-gray-500/5 hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl ${isLive ? 'bg-rose-50 text-rose-600 animate-pulse' :
                    isUpcoming ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                    <Trophy className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isLive ? 'bg-rose-600 text-white' :
                        isUpcoming ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                        }`}>
                        {isLive ? 'Live' : isUpcoming ? 'Upcoming' : 'Ended'}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">
                        {contest.visibility === 'PUBLIC' && <Globe className="w-3 h-3" />}
                        {contest.visibility === 'INSTITUTION' && <School className="w-3 h-3" />}
                        {contest.visibility === 'CLASSROOM' && <Users className="w-3 h-3" />}
                        <span className="capitalize">{contest.visibility.toLowerCase()}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {contest.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium line-clamp-2 mt-1 min-h-[40px]">
                        {contest.description || "No description provided."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Start Time</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                            {format(new Date(contest.startTime), "MMM d, HH:mm")}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</p>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                            <Timer className="w-3.5 h-3.5 text-indigo-500" />
                            {Math.round((new Date(contest.endTime).getTime() - new Date(contest.startTime).getTime()) / (1000 * 60 * 60))} Hours
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                    <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-500">
                            {contest._count?.problems || 0} Problems
                        </span>
                    </div>
                    <Link
                        href={`/contest/${contest.id}`}
                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 group/btn"
                    >
                        View Arena
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
