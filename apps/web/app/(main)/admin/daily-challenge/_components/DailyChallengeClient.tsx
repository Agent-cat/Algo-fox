"use client";

import { useState, useCallback, useTransition, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  CheckCircle2,
  Loader2,
  Flame,
  Trophy,
  Sparkles,
  CalendarDays,
  ExternalLink,
} from "lucide-react";
import {
  setDailyChallenge,
  removeDailyChallenge,
  searchProblemsForChallenge,
  getDailyChallengesForMonth,
} from "@/actions/daily-challenge.action";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MinimalProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | "CONCEPT";
  domain: string;
  solved?: number | null;
}

interface DayChallenge {
  id: string;
  date: string; // ISO
  problemId: string;
  problem: MinimalProblem;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DIFFICULTY_STYLES: Record<string, string> = {
  EASY: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  MEDIUM: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  HARD: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  CONCEPT: "bg-violet-500/10 text-violet-400 border-violet-500/30",
};

const DIFFICULTY_DOT: Record<string, string> = {
  EASY: "bg-emerald-400",
  MEDIUM: "bg-amber-400",
  HARD: "bg-rose-400",
  CONCEPT: "bg-violet-400",
};

function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

// ─── Problem Picker Dialog ─────────────────────────────────────────────────────

function ProblemPickerDialog({
  targetDate,
  currentProblem,
  onClose,
  onSet,
  onRemove,
}: {
  targetDate: Date;
  currentProblem?: MinimalProblem | null;
  onClose: () => void;
  onSet: (problemId: string) => void;
  onRemove: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MinimalProblem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<MinimalProblem | null>(
    currentProblem ?? null
  );

  const handleSearch = useCallback(async (q: string) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); return; }
    setIsSearching(true);
    const res = await searchProblemsForChallenge(q);
    setResults(res.problems ?? []);
    setIsSearching(false);
  }, []);

  // Debounce search
  useEffect(() => {
    const id = setTimeout(() => handleSearch(query), 300);
    return () => clearTimeout(id);
  }, [query, handleSearch]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg bg-[#1C1D22] border border-white/10 rounded-3xl shadow-2xl flex flex-col max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div>
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-0.5">
              Problem of the Day
            </p>
            <h2 className="text-lg font-bold text-white">
              {format(targetDate, "EEEE, MMMM d, yyyy")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current assignment banner */}
        {selected && (
          <div className="mx-6 mt-5 rounded-2xl bg-orange-500/10 border border-orange-500/25 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide mb-0.5">
                Currently selected
              </p>
              <p className="text-sm font-bold text-white truncate">{selected.title}</p>
              <span
                className={`inline-flex items-center gap-1 mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[selected.difficulty] || ""}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_DOT[selected.difficulty]}`} />
                {selected.difficulty}
              </span>
            </div>
            <button
              onClick={onRemove}
              className="flex-shrink-0 text-xs text-rose-400 hover:text-rose-300 font-semibold underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Search */}
        <div className="px-6 pt-5 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search problems by title…"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/60 transition-colors"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
            )}
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-2 min-h-0">
          {results.length === 0 && query.trim() && !isSearching && (
            <p className="text-center text-sm text-gray-500 py-8">
              No problems found for &ldquo;{query}&rdquo;
            </p>
          )}
          {!query.trim() && (
            <p className="text-center text-sm text-gray-500 py-8">
              Type to search from existing problems
            </p>
          )}
          {results.map((problem) => (
            <button
              key={problem.id}
              onClick={() => setSelected(problem)}
              className={[
                "w-full flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all",
                selected?.id === problem.id
                  ? "border-orange-500/50 bg-orange-500/10"
                  : "border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/8",
              ].join(" ")}
            >
              <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${DIFFICULTY_DOT[problem.difficulty] || "bg-gray-400"}`}
              />
              <span className="flex-1 text-sm font-medium text-white truncate">
                {problem.title}
              </span>
              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border flex-shrink-0 ${DIFFICULTY_STYLES[problem.difficulty] || ""}`}
              >
                {problem.difficulty}
              </span>
              {selected?.id === problem.id && (
                <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3 border-t border-white/8 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
          >
            Cancel
          </button>
          <button
            disabled={!selected}
            onClick={() => selected && onSet(selected.id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
          >
            {selected ? "Confirm Selection" : "Select a Problem"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Calendar Component ──────────────────────────────────────────────────

export default function DailyChallengeClient({
  initialChallenges,
  initialYear,
  initialMonth,
}: {
  initialChallenges: DayChallenge[];
  initialYear: number;
  initialMonth: number;
}) {
  const [currentDate, setCurrentDate] = useState(
    new Date(initialYear, initialMonth - 1, 1)
  );
  const [challengeMap, setChallengeMap] = useState<Map<string, DayChallenge>>(
    () => {
      const map = new Map<string, DayChallenge>();
      for (const c of initialChallenges) {
        map.set(toDateKey(new Date(c.date)), c);
      }
      return map;
    }
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [isPending, startTransition] = useTransition();
  const [pendingDay, setPendingDay] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);

  const showToast = (msg: string, type: "ok" | "err") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Re-fetch challenges when month changes
  const loadMonth = useCallback(async (date: Date) => {
    const res = await getDailyChallengesForMonth(
      date.getFullYear(),
      date.getMonth() + 1
    );
    if (res.success && res.challenges) {
      const map = new Map<string, DayChallenge>();
      for (const c of res.challenges as unknown as DayChallenge[]) {
        map.set(toDateKey(new Date(c.date)), c);
      }
      setChallengeMap(map);
    }
  }, []);

  const handlePrev = () => {
    const prev = subMonths(currentDate, 1);
    setCurrentDate(prev);
    loadMonth(prev);
  };

  const handleNext = () => {
    const next = addMonths(currentDate, 1);
    setCurrentDate(next);
    loadMonth(next);
  };

  const handleSet = (problemId: string) => {
    if (!selectedDay) return;
    const dateStr = toDateKey(selectedDay);
    setPendingDay(dateStr);
    setSelectedDay(null);
    startTransition(async () => {
      const res = await setDailyChallenge(dateStr, problemId);
      if (res.success && res.challenge) {
        const updated = res.challenge as unknown as DayChallenge;
        setChallengeMap((prev) => {
          const next = new Map(prev);
          next.set(dateStr, updated);
          return next;
        });
        showToast("Daily challenge set!", "ok");
      } else {
        showToast(res.error ?? "Failed to set challenge", "err");
      }
      setPendingDay(null);
    });
  };

  const handleRemove = () => {
    if (!selectedDay) return;
    const dateStr = toDateKey(selectedDay);
    setPendingDay(dateStr);
    setSelectedDay(null);
    startTransition(async () => {
      const res = await removeDailyChallenge(dateStr);
      if (res.success) {
        setChallengeMap((prev) => {
          const next = new Map(prev);
          next.delete(dateStr);
          return next;
        });
        showToast("Daily challenge removed", "ok");
      } else {
        showToast(res.error ?? "Failed to remove challenge", "err");
      }
      setPendingDay(null);
    });
  };

  // Build calendar grid
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startPad = new Date(monthStart);
  startPad.setDate(startPad.getDate() - startPad.getDay());
  const endPad = new Date(monthEnd);
  if (endPad.getDay() !== 6) endPad.setDate(endPad.getDate() + (6 - endPad.getDay()));
  const gridDays = eachDayOfInterval({ start: startPad, end: endPad });

  // Stats for header
  const scheduledCount = challengeMap.size;

  return (
    <div className="space-y-8 relative">
      {/* Toast */}
      {toast && (
        <div
          className={[
            "fixed top-6 right-6 z-[100] flex items-center gap-2 px-5 py-3 rounded-2xl shadow-2xl text-sm font-semibold border transition-all animate-in slide-in-from-top-2",
            toast.type === "ok"
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              : "bg-rose-500/15 border-rose-500/30 text-rose-300",
          ].join(" ")}
        >
          {toast.type === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: CalendarDays,
            label: "Month",
            value: format(currentDate, "MMMM yyyy"),
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            icon: Flame,
            label: "Scheduled This Month",
            value: scheduledCount,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
          },
          {
            icon: Trophy,
            label: "Days Remaining",
            value: monthEnd.getDate() - new Date().getDate(),
            color: "text-violet-400",
            bg: "bg-violet-500/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#1C1D22] rounded-2xl border border-gray-200 dark:border-white/8 p-5 flex items-center gap-4"
          >
            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">{stat.label}</p>
              <p className="text-lg font-black text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Card */}
      <div className="bg-white dark:bg-[#1C1D22] rounded-3xl border border-gray-200 dark:border-white/8 overflow-hidden shadow-xl">
        {/* Calendar Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-white/8">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-0.5">
              Daily Challenge Calendar
            </p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/8">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div
              key={d}
              className="py-3 text-center text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-7">
          {gridDays.map((day, idx) => {
            const key = toDateKey(day);
            const challenge = challengeMap.get(key);
            const inMonth = isSameMonth(day, currentDate);
            const isCurrentDay = isToday(day);
            const isLoading = pendingDay === key;

            return (
              <button
                key={idx}
                disabled={!inMonth || isPending}
                onClick={() => inMonth && setSelectedDay(day)}
                className={[
                  "relative min-h-[90px] p-2 text-left border-b border-r border-gray-100 dark:border-white/5 transition-all group",
                  !inMonth ? "opacity-30 cursor-default" : "hover:bg-gray-50 dark:hover:bg-white/3 cursor-pointer",
                  isCurrentDay && inMonth ? "bg-orange-50/50 dark:bg-orange-500/5" : "",
                ].join(" ")}
              >
                {/* Day Number */}
                <span
                  className={[
                    "inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold mb-1",
                    isCurrentDay && inMonth
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/30"
                      : "text-gray-700 dark:text-gray-300",
                  ].join(" ")}
                >
                  {format(day, "d")}
                </span>

                {/* Loading spinner */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-[#1C1D22]/60 rounded-sm">
                    <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                  </div>
                )}

                {/* Challenge pill */}
                {challenge && !isLoading && (
                  <div className="mt-1">
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="w-2.5 h-2.5 text-orange-400 flex-shrink-0" />
                      <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wide">
                        Scheduled
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 leading-tight line-clamp-2">
                      {challenge.problem.title}
                    </p>
                    <span
                      className={`inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full border ${DIFFICULTY_STYLES[challenge.problem.difficulty] || ""}`}
                    >
                      {challenge.problem.difficulty}
                    </span>
                  </div>
                )}

                {/* Empty add hint */}
                {!challenge && !isLoading && inMonth && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 font-medium">
                      + Add challenge
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-8 py-4 border-t border-gray-100 dark:border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex-shrink-0" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Has challenge</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-px bg-gray-300 dark:bg-gray-600" />
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Click any date to assign or remove</span>
          </div>
        </div>
      </div>

      {/* Upcoming challenges list */}
      {challengeMap.size > 0 && (
        <div className="bg-white dark:bg-[#1C1D22] rounded-3xl border border-gray-200 dark:border-white/8 overflow-hidden">
          <div className="px-8 py-5 border-b border-gray-100 dark:border-white/8">
            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              Scheduled Challenges — {format(currentDate, "MMMM yyyy")}
            </h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {[...challengeMap.entries()]
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([dateKey, challenge]) => (
                <div key={dateKey} className="flex items-center gap-4 px-8 py-4 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors group">
                  <div className="w-12 text-center flex-shrink-0">
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{format(new Date(dateKey), "EEE")}</p>
                    <p className="text-xl font-black text-gray-900 dark:text-white">{format(new Date(dateKey), "d")}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{challenge.problem.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[challenge.problem.difficulty] || ""}`}>
                        {challenge.problem.difficulty}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{challenge.problem.domain}</span>
                    </div>
                  </div>
                  <Link
                    href={`/problems/${challenge.problem.slug}`}
                    target="_blank"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg text-gray-400 hover:text-orange-400 hover:bg-orange-500/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => {
                      const date = new Date(dateKey);
                      setSelectedDay(date);
                    }}
                    className="text-xs font-semibold text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    Change
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Picker Dialog */}
      {selectedDay && (
        <ProblemPickerDialog
          targetDate={selectedDay}
          currentProblem={challengeMap.get(toDateKey(selectedDay))?.problem ?? null}
          onClose={() => setSelectedDay(null)}
          onSet={handleSet}
          onRemove={handleRemove}
        />
      )}
    </div>
  );
}
