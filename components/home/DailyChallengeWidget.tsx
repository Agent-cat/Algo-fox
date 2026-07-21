"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Flame,
  Clock,
  ArrowRight,
  Trophy,
  Check,
  Minus,
} from "lucide-react";
import type { WeekDayEntry } from "@/actions/daily-challenge.action";

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

interface DailyChallengeWidgetProps {
  problem?: Problem | null;
  weekHistory: WeekDayEntry[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DIFFICULTY_CONFIG = {
  EASY: {
    label: "Easy",
    dot: "bg-emerald-400",
    text: "text-emerald-500 dark:text-emerald-400",
    pill: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
  },
  MEDIUM: {
    label: "Medium",
    dot: "bg-amber-400",
    text: "text-amber-600 dark:text-amber-400",
    pill: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  HARD: {
    label: "Hard",
    dot: "bg-rose-400",
    text: "text-rose-500 dark:text-rose-400",
    pill: "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20",
  },
  CONCEPT: {
    label: "Concept",
    dot: "bg-violet-400",
    text: "text-violet-500 dark:text-violet-400",
    pill: "bg-violet-500/10 text-violet-500 dark:text-violet-400 border-violet-500/20",
  },
};

// ─── Countdown Hook ───────────────────────────────────────────────────────────

function useCountdown(): string | null {
  const getSecondsLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  };

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    setSecondsLeft(getSecondsLeft());
    const interval = setInterval(() => setSecondsLeft(getSecondsLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (secondsLeft === null) return null;

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Day Pill Status Indicator ───────────────────────────────────────────────

function DayPill({ day }: { day: WeekDayEntry }) {
  type State = "completed" | "missed" | "today-pending" | "future" | "no-challenge";

  const state: State = (() => {
    if (day.completed) return "completed";
    if (day.isMissed) return "missed";
    if (day.isToday) return "today-pending";
    if (day.isFuture) return "future";
    return "no-challenge";
  })();

  const circleStyles: Record<State, string> = {
    completed: "bg-emerald-500 border-emerald-400 dark:border-emerald-500 shadow-sm shadow-emerald-500/20",
    missed: "bg-rose-500/10 border-rose-500/30 text-rose-500 dark:text-rose-400",
    "today-pending": "bg-orange-500/10 border-orange-500/50 text-orange-500 dark:text-orange-400 shadow-sm shadow-orange-500/10",
    future: "bg-transparent border-gray-200 dark:border-white/10 text-gray-400 dark:text-gray-500",
    "no-challenge": "bg-transparent border-gray-100 dark:border-white/5 text-gray-300 dark:text-gray-600 opacity-40",
  };

  const labelStyles: Record<State, string> = {
    completed: "text-emerald-500 font-bold",
    missed: "text-rose-400 dark:text-rose-500",
    "today-pending": "text-orange-500 dark:text-orange-400 font-bold",
    future: "text-gray-400 dark:text-gray-500",
    "no-challenge": "text-gray-300 dark:text-gray-600",
  };

  const icons: Record<State, React.ReactNode> = {
    completed: <Check className="w-3 h-3 text-white stroke-[3.5]" />,
    missed: <Minus className="w-2.5 h-2.5 stroke-[3]" />,
    "today-pending": <Flame className="w-3 h-3 fill-current" />,
    future: <span className="text-[9px] font-bold">{day.dayLabel[0]}</span>,
    "no-challenge": <span className="text-[9px] font-medium">{day.dayLabel[0]}</span>,
  };

  return (
    <div className="flex flex-col items-center gap-1 flex-1" title={day.dateStr}>
      <div
        className={[
          "w-7 h-7 rounded-full border flex items-center justify-center transition-all",
          circleStyles[state],
        ].join(" ")}
      >
        {icons[state]}
      </div>
      <span className={["text-[9px] uppercase tracking-wider font-semibold", labelStyles[state]].join(" ")}>
        {day.dayLabel.slice(0, 2)}
      </span>
    </div>
  );
}

// ─── Main Widget Redesign ─────────────────────────────────────────────────────

export function DailyChallengeWidget({
  problem,
  weekHistory,
}: DailyChallengeWidgetProps) {
  const countdown = useCountdown();
  const diffConfig = problem ? (DIFFICULTY_CONFIG[problem.difficulty] ?? DIFFICULTY_CONFIG.EASY) : null;

  return (
    <div className="bg-[#FDFDFD] dark:bg-[#202227] rounded-3xl p-5 w-full flex flex-col border-2 border-dotted border-gray-300 dark:border-white/20 gap-4 shadow-sm">

      {/* Header section (clean alignment) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500 shrink-0" />
          <h2 className="text-[13.5px] font-bold text-gray-900 dark:text-white tracking-wide">
            Daily Challenge
          </h2>
        </div>

        {/* Countdown */}
        {countdown !== null && (
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-2 py-0.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3 shrink-0" />
            <span className="tabular-nums">{countdown}</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {!problem ? (
        <div className="flex flex-col gap-2 py-4 px-2 border border-gray-100 dark:border-white/5 rounded-2xl bg-gray-50/50 dark:bg-white/[0.02] text-center">
          <h3 className="text-[13px] font-bold text-gray-900 dark:text-white">
            No problem today!
          </h3>
          <p className="text-[11.5px] text-gray-500 dark:text-gray-400 leading-relaxed">
            Enjoy your rest day! Keep your streak warm by practicing other topics.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {/* Difficulty and Solved stats */}
            <div className="flex items-center justify-between">
              {diffConfig && (
                <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${diffConfig.pill}`}>
                  {diffConfig.label}
                </span>
              )}
              {problem.solved != null && (
                <span className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 font-semibold">
                  <Trophy className="w-3 h-3 text-amber-500" />
                  {problem.solved.toLocaleString()} solved
                </span>
              )}
            </div>

            {/* Problem title */}
            <h3 className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
              {problem.title}
            </h3>
          </div>

          {/* Action Button - Redesigned White/Translucent Solve Button */}
          <Link
            href={`/problems/${problem.slug}`}
            id="daily-challenge-solve-btn"
            className="group w-full bg-white text-gray-900 border border-gray-200 hover:border-gray-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/20 active:scale-[0.98] font-bold text-xs tracking-wider py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>Solve Now</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      {/* Week Progress Tracker */}
      {weekHistory.length > 0 && (
        <div className="pt-4 border-t border-gray-100 dark:border-white/8 flex flex-col gap-2.5">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            <span>Weekly Progress</span>
            <span className="text-orange-500 dark:text-orange-400 normal-case tracking-normal">
              {weekHistory.filter((d) => d.completed).length} / 7 Solved
            </span>
          </div>

          <div className="flex items-center justify-between gap-1 mt-1">
            {weekHistory.map((day) => (
              <DayPill key={day.dateStr} day={day} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}