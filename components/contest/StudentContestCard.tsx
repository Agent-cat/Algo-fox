"use client";

import {
  Trophy,
  Calendar,
  Users,
  Globe,
  School,
  ArrowRight,
  Timer,
  Clock,
  Play,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) setTimeLeft(`${days}d ${hours}h`);
      else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m`);
      else setTimeLeft(`${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute to save resources
    return () => clearInterval(interval);
  }, [isLive, isPast, startTime, endTime]);

  const getVisibilityInfo = () => {
    switch (contest.visibility) {
      case "PUBLIC":
        return { label: "Public", icon: Globe, color: "text-blue-500" };
      case "INSTITUTION":
        return { label: "Institution", icon: School, color: "text-purple-500" };
      case "CLASSROOM":
        return { label: "Classroom", icon: Users, color: "text-green-500" };
      default:
        return { label: "Public", icon: Globe, color: "text-blue-500" };
    }
  };

  const duration = Math.round(
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)
  );
  const VisibilityIcon = getVisibilityInfo().icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group flex flex-col h-full bg-white dark:bg-[#141414] rounded-2xl border transition-all duration-300 overflow-hidden relative ${
        isLive
          ? "border-orange-500/50 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]"
          : "border-gray-200 dark:border-[#262626] hover:border-gray-300 dark:hover:border-[#404040] hover:shadow-lg"
      }`}
    >
      {/* Status Strip */}
      {isLive && (
        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-orange-500 to-red-500" />
      )}

      <div className="p-6 flex flex-col h-full">
        {/* Header: Status & Visibility */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {isLive && (
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            )}
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isLive
                  ? "text-orange-600 dark:text-orange-500"
                  : isPast
                  ? "text-gray-500"
                  : "text-blue-600 dark:text-blue-500"
              }`}
            >
              {isLive ? "Live Now" : isPast ? "Ended" : "Upcoming"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#1a1a1a] px-2.5 py-1 rounded-full border border-gray-100 dark:border-[#262626]">
            <VisibilityIcon className="w-3 h-3" />
            <span className="truncate max-w-25">
              {getVisibilityInfo().label}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {contest.title}
        </h3>

        {/* Description - Optional */}
        {contest.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6 h-10">
            {contest.description}
          </p>
        )}

        <div className="mt-auto pt-4 space-y-6">
          {/* Detailed Info Grid */}
          <div className="grid grid-cols-2 gap-4 p-5 rounded-3xl bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-gray-100 dark:border-white/5 shadow-inner">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest block">
                Start Date
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200">
                <Calendar className="w-3.5 h-3.5 text-orange-500" />
                {format(startTime, "MMM d")}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-black text-gray-400 tracking-widest block">
                Window
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-200">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                {duration}h
              </div>
            </div>

            {timeLeft && (
               <div className="col-span-2 pt-3 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
                <span className={cn(
                    "text-[10px] font-black uppercase tracking-widest",
                    isLive ? "text-orange-500 animate-pulse" : "text-blue-500"
                )}>
                    {isLive ? "Closing In" : "Starts In"}
                </span>
                <span className={cn(
                    "font-mono text-sm font-black tabular-nums",
                    isLive ? "text-orange-600 dark:text-orange-500" : "text-blue-600 dark:text-blue-400"
                )}>
                    {timeLeft}
                </span>
               </div>
            )}
          </div>

          {/* New Immervise Button Design */}
          {isLive ? (
            <Link
              href={`/contest/${contest.id}`}
              className="group/btn relative flex items-center justify-center gap-3 w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl transition-all shadow-2xl active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
              <Play className="relative z-10 w-3.5 h-3.5 fill-current transition-transform group-hover/btn:translate-x-1" />
              <span className="relative z-10">Initiate Challenge</span>
            </Link>
          ) : isPast ? (
            <Link
              href={`/contest/${contest.id}/standings`}
              className="flex items-center justify-center gap-3 w-full py-4 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-gray-900 dark:text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl transition-all border border-gray-200 dark:border-white/10 active:scale-[0.98]"
            >
              <Trophy className="w-3.5 h-3.5" />
              Archives
            </Link>
          ) : (
            <Link
              href={`/contest/${contest.id}`}
              className="flex items-center justify-center gap-3 w-full py-4 bg-transparent hover:bg-white/10 text-gray-400 hover:text-orange-500 font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl transition-all border-2 border-dashed border-gray-200 dark:border-white/10 active:scale-[0.98]"
            >
                <Clock className="w-3.5 h-3.5" />
                Coming Soon
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
