"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, ArrowRight, Clock, Trophy, Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "CONCEPT";
  domain: string;
  solved?: number | null;
  tags: { name: string; slug: string }[];
}

interface DailyChallengeBannerProps {
  problem: Problem;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DIFFICULTY_CONFIG = {
  EASY: {
    label: "Easy",
    dot: "bg-emerald-400",
    pill: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    glow: "shadow-emerald-500/10",
  },
  MEDIUM: {
    label: "Medium",
    dot: "bg-amber-400",
    pill: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    glow: "shadow-amber-500/10",
  },
  HARD: {
    label: "Hard",
    dot: "bg-rose-400",
    pill: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    glow: "shadow-rose-500/10",
  },
  CONCEPT: {
    label: "Concept",
    dot: "bg-violet-400",
    pill: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    glow: "shadow-violet-500/10",
  },
};

function useCountdown(): string {
  const getSecondsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  };

  const [secondsLeft, setSecondsLeft] = useState(getSecondsUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(getSecondsUntilMidnight());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DailyChallengeBanner({ problem }: DailyChallengeBannerProps) {
  const countdown = useCountdown();
  const diffConfig = DIFFICULTY_CONFIG[problem.difficulty] ?? DIFFICULTY_CONFIG.EASY;

  return (
    <Link
      href={`/problems/${problem.slug}`}
      id="daily-challenge-banner"
      className={[
        "group block w-full rounded-2xl border overflow-hidden transition-all duration-300",
        "bg-gradient-to-r from-orange-500/8 via-amber-500/5 to-orange-500/8",
        "dark:from-orange-500/12 dark:via-amber-500/8 dark:to-orange-500/12",
        "border-orange-200 dark:border-orange-500/25",
        "hover:border-orange-400 dark:hover:border-orange-500/50",
        "hover:shadow-xl hover:shadow-orange-500/10",
        `shadow-md ${diffConfig.glow}`,
        "hover:-translate-y-0.5",
      ].join(" ")}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5">
        {/* Left — Icon + Badge */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Flame icon container */}
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-shadow">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            {/* Animated ping ring */}
            <span className="absolute -top-1 -right-1 w-3 h-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500" />
            </span>
          </div>

          {/* Label pill */}
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.15em] text-orange-500 dark:text-orange-400">
              Daily Challenge
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              Resets in {countdown}
            </span>
          </div>
        </div>

        {/* Center divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-10 bg-orange-200 dark:bg-orange-500/20 flex-shrink-0" />

        {/* Center — Problem info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-sm font-black text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate max-w-[280px] sm:max-w-none">
              {problem.title}
            </h2>

            {/* Difficulty badge */}
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border flex-shrink-0 ${diffConfig.pill}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${diffConfig.dot}`} />
              {diffConfig.label}
            </span>
          </div>

          {/* Tags row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {problem.tags.slice(0, 3).map((tag) => (
              <span
                key={tag.slug}
                className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-gray-400 font-medium border border-gray-200 dark:border-white/10"
              >
                {tag.name}
              </span>
            ))}
            {problem.solved != null && (
              <span className="ml-1 flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                <Trophy className="w-2.5 h-2.5" />
                {problem.solved.toLocaleString()} solved
              </span>
            )}
          </div>
        </div>

        {/* Right — CTA button */}
        <div className="flex-shrink-0 self-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-500/30 group-hover:bg-orange-400 transition-colors group-hover:shadow-orange-500/50">
            <Zap className="w-3.5 h-3.5" />
            Solve Now
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
