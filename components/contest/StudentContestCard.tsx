"use client";

import { Trophy, Calendar, Users, Globe, School, ArrowRight, Timer, Clock, Lock, Play } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";

interface StudentContestCardProps {
    contest: {
        id: string;
        title: string;
        description: string | null;
        startTime: Date;
        endTime: Date;
        visibility: "PUBLIC" | "INSTITUTION" | "CLASSROOM";
        institution?: { name: string } | null;
        classroom?: { name: string } | null;
        _count?: {
            problems: number;
        };
    };
}

export function StudentContestCard({ contest }: StudentContestCardProps) {
    const [timeLeft, setTimeLeft] = useState<string>("");

    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    const isLive = now >= startTime && now <= endTime;
    const isPast = now > endTime;
    const isUpcoming = now < startTime;

    // Live countdown timer
    useEffect(() => {
        if (isPast) {
            setTimeLeft("Ended");
            return;
        }

        const updateTimer = () => {
            const currentTime = new Date();
            const target = isLive ? endTime : startTime;
            const diff = target.getTime() - currentTime.getTime();

            if (diff <= 0) {
                setTimeLeft(isLive ? "Ending..." : "Starting...");
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h`);
            } else if (hours > 0) {
                setTimeLeft(`${hours}h ${minutes}m`);
            } else {
                setTimeLeft(`${minutes}m ${seconds}s`);
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [isLive, isPast, startTime, endTime]);

    const getStatus = () => {
        if (isPast) return { label: "Ended", color: "bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400", badge: "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300" };
        if (isLive) return { label: "Live", color: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400", badge: "bg-rose-600 text-white animate-pulse" };
        return { label: "Upcoming", color: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400", badge: "bg-indigo-600 text-white" };
    };

    const getVisibilityLabel = () => {
        switch (contest.visibility) {
            case "PUBLIC":
                return {
                    label: "Open to everyone",
                    icon: Globe,
                    color: "text-blue-600 dark:text-blue-400",
                    bg: "bg-blue-50 dark:bg-blue-500/10"
                };
            case "INSTITUTION":
                return {
                    label: contest.institution?.name ? `For ${contest.institution.name}` : "For your institution",
                    icon: School,
                    color: "text-purple-600 dark:text-purple-400",
                    bg: "bg-purple-50 dark:bg-purple-500/10"
                };
            case "CLASSROOM":
                return {
                    label: contest.classroom?.name ? `For ${contest.classroom.name}` : "For your classroom",
                    icon: Users,
                    color: "text-green-600 dark:text-green-400",
                    bg: "bg-green-50 dark:bg-green-500/10"
                };
            default:
                return { label: "Open to everyone", icon: Globe, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" };
        }
    };

    const status = getStatus();
    const visibility = getVisibilityLabel();
    const VisibilityIcon = visibility.icon;

    const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));

    return (
        <div className="group bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-[#262626] p-8 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden flex flex-col h-full">
            <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={`p-4 rounded-xl ${status.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Trophy className="w-7 h-7" />
                </div>
                <div className="flex flex-col items-end gap-3">
                    <span className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-[0.1em] ${status.badge} shadow-sm`}>
                        {status.label}
                    </span>
                    {/* Live Countdown Timer */}
                    {!isPast && (
                        <div className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-md ${
                            isLive ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400' : 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400'
                        }`}>
                            <Clock className="w-3 h-3" />
                            <span>{isLive ? 'Ends in ' : 'Starts in '}</span>
                            <span className="font-mono font-black">{timeLeft}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-6 flex-1 relative z-10">
                <div className="space-y-3">
                    <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 group-hover:text-orange-600 transition-colors leading-tight tracking-tight">
                        {contest.title}
                    </h3>
                    {/* Visibility Label - Human Readable */}
                    <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg ${visibility.bg} ${visibility.color}`}>
                        <VisibilityIcon className="w-3.5 h-3.5" />
                        <span>{visibility.label}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-50 dark:border-[#262626] bg-gray-50/50 dark:bg-[#0a0a0a]/50 -mx-8 px-8 group-hover:bg-white dark:group-hover:bg-[#1a1a1a] transition-colors duration-500">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Calendar className="w-3.5 h-3.5 text-orange-500" />
                            Start Date
                        </div>
                        <div>
                            <div className="text-sm font-black text-gray-900 dark:text-gray-100 leading-none">
                                {format(startTime, "MMM d, yyyy")}
                            </div>
                            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1">
                                {format(startTime, "HH:mm")} (IST)
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <Timer className="w-3.5 h-3.5 text-orange-500" />
                            Duration
                        </div>
                        <div>
                            <div className="text-sm font-black text-gray-900 dark:text-gray-100 leading-none">
                                {duration} {duration === 1 ? "Hour" : "Hours"}
                            </div>
                            <div className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mt-1">
                                Ends {format(endTime, "MMM d, HH:mm")}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-6 h-6 rounded-full border-2 border-white dark:border-[#141414] bg-gray-100 dark:bg-[#262626] flex items-center justify-center text-[8px] font-black text-gray-400">
                                    ?
                                </div>
                            ))}
                        </div>
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">
                            {contest._count?.problems || 0} Problems
                        </span>
                    </div>

                    {isPast ? (
                        <Link
                            href={`/contest/${contest.id}/standings`}
                            className="flex items-center gap-2 px-6 py-3 text-xs font-black text-gray-700 dark:text-gray-300 bg-gray-100/80 dark:bg-[#262626] hover:bg-gray-200 dark:hover:bg-[#333333] rounded-xl transition-all duration-300 uppercase tracking-widest group/btn"
                        >
                            Results
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                    ) : isLive ? (
                        <Link
                            href={`/contest/${contest.id}`}
                            className="flex items-center gap-2 px-7 py-3 text-xs font-black text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all duration-300 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 uppercase tracking-widest group/btn active:scale-95"
                        >
                            <Play className="w-4 h-4 fill-current animate-pulse shadow-inner" />
                            Enter Now
                        </Link>
                    ) : (
                        <Link
                            href={`/contest/${contest.id}`}
                            className="flex items-center gap-2 px-6 py-3 text-xs font-black text-orange-600 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 rounded-xl transition-all duration-300 border-2 border-orange-100 dark:border-orange-500/30 hover:border-orange-200 dark:hover:border-orange-500/50 uppercase tracking-widest group/btn"
                        >
                            <Clock className="w-4 h-4" />
                            Details
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
