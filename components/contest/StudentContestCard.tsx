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

        <div className="mt-auto space-y-4">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 p-4 bg-gray-50 dark:bg-[#1a1a1a]/50 rounded-xl border border-gray-100 dark:border-[#262626]">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Start Time
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                {format(startTime, "MMM d, HH:mm")}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                Duration
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <Timer className="w-3.5 h-3.5 text-gray-400" />
                {duration}h
              </div>
            </div>
            {isLive && timeLeft && (
              <div className="col-span-2 flex items-center justify-between pt-2 border-t border-gray-200 dark:border-[#262626] mt-1">
                <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-500">
                  Time Remaining
                </span>
                <span className="font-mono text-sm font-bold text-orange-600 dark:text-orange-500">
                  {timeLeft}
                </span>
              </div>
            )}
            {!isLive && !isPast && timeLeft && (
              <div className="col-span-2 flex items-center justify-between pt-2 border-t border-gray-200 dark:border-[#262626] mt-1">
                <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-500">
                  Starts In
                </span>
                <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-500">
                  {timeLeft}
                </span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {isLive ? (
            <Link
              href={`/contest/${contest.id}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              Enter Contest
            </Link>
          ) : isPast ? (
            <Link
              href={`/contest/${contest.id}/standings`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#262626] text-gray-900 dark:text-white font-bold rounded-xl transition-all border border-gray-200 dark:border-[#333]"
            >
              <Trophy className="w-4 h-4" />
              View Results
            </Link>
          ) : (
            <Link
              href={`/contest/${contest.id}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-white dark:bg-[#141414] border-2 border-dashed border-gray-300 dark:border-[#333] hover:border-orange-500 dark:hover:border-orange-500 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 font-bold rounded-xl transition-all"
            >
              <Clock className="w-4 h-4" />
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
