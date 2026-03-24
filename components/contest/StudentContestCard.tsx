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
    isParticipating?: boolean;
    isFinished?: boolean;
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
      whileHover={{ y: -2 }}
      className={`group flex flex-col md:flex-row items-center gap-6 p-4 md:p-6 bg-white/40 dark:bg-[#0a0a0a]/40 backdrop-blur-xl rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        isLive
          ? "border-gray-200/60 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
          : "border-gray-200/40 dark:border-white/5 hover:bg-white/60 dark:hover:bg-[#141414]/60 hover:border-gray-300 dark:hover:border-white/10 hover:shadow-xl"
      }`}
    >
      {/* Subtle Glass Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent pointer-events-none" />

      {/* Main Content (Left Side) */}
      <div className="flex-1 min-w-0 flex flex-col justify-center pl-2 w-full">
        <div className="flex items-center gap-3 mb-2">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            {isLive && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
            )}
            <span
              className={`text-[10px] font-black uppercase tracking-wider ${
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

          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />

          {/* Visibility Badge */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            <VisibilityIcon className="w-3 h-3" />
            <span>{getVisibilityInfo().label}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate pr-4 group-hover:text-orange-500 transition-colors">
          {contest.title}
        </h3>

        {/* Description */}
        {contest.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1 pr-4">
            {contest.description}
          </p>
        )}
      </div>

      {/* Metadata (Middle) */}
      <div className="flex items-center gap-8 shrink-0 py-4 md:py-0 border-y md:border-y-0 md:border-l border-gray-100 dark:border-[#262626] w-full md:w-auto px-0 md:pl-8 md:pr-4">
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest block">Starts</span>
          <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-200">
            <Calendar className="w-4 h-4 text-orange-500" />
            {format(startTime, "MMM d, h:mm a")}
          </div>
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest block">Duration</span>
          <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700 dark:text-gray-200">
            <Clock className="w-4 h-4 text-blue-500" />
            {duration}h
          </div>
        </div>
      </div>

      {/* Action Area (Right Side) */}
      <div className="shrink-0 w-full md:w-56 flex flex-col justify-center gap-2">
        {timeLeft && (
          <div className="flex items-center justify-between px-1">
            <span className={cn(
                "text-[10px] font-black uppercase tracking-wider",
                isLive ? "text-orange-500 animate-pulse" : "text-blue-500"
            )}>
                {isLive ? "Ends In" : "Starts In"}
            </span>
            <span className={cn(
                "font-mono text-sm font-black tabular-nums",
                isLive ? "text-orange-600 dark:text-orange-500" : "text-blue-600 dark:text-blue-400"
            )}>
                {timeLeft}
            </span>
          </div>
        )}

        {isLive ? (
          <Link
            href={`/contest/${contest.id}`}
            className="group/btn relative flex items-center justify-center gap-2 w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase text-[11px] tracking-wider rounded-xl transition-all shadow-md active:scale-[0.98] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            <Play className="relative z-10 w-3.5 h-3.5 fill-current transition-transform group-hover/btn:translate-x-1" />
            <span className="relative z-10">
              {contest.isParticipating ? "Resume" : "Initiate"}
            </span>
          </Link>
        ) : isPast ? (
          <Link
            href={`/contest/${contest.id}/standings`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gray-50/50 dark:bg-[#1a1a1a]/50 backdrop-blur-md hover:bg-white dark:hover:bg-[#262626] text-gray-900 dark:text-white font-black uppercase text-[11px] tracking-wider rounded-xl transition-all border border-gray-200/50 dark:border-[#333]/50 active:scale-[0.98]"
          >
            <Trophy className="w-3.5 h-3.5" />
            Archives
          </Link>
        ) : (
          <Link
            href={`/contest/${contest.id}`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/20 dark:bg-[#1a1a1a]/20 backdrop-blur-md hover:bg-white/50 dark:hover:bg-[#1a1a1a]/80 text-gray-400 hover:text-orange-500 font-black uppercase text-[11px] tracking-wider rounded-xl transition-all border border-dashed border-gray-200/50 dark:border-[#333]/50 active:scale-[0.98]"
          >
              <Clock className="w-3.5 h-3.5" />
              Not Started
          </Link>
        )}
      </div>
    </motion.div>
  );
}
