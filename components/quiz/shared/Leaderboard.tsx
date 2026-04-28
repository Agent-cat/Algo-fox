"use client";

import { Trophy, Medal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { LeaderboardEntry } from "@/lib/quiz-types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  highlightId?: string;
  compact?: boolean;
}

const rankColors = ["text-yellow-500", "text-gray-400 dark:text-gray-300", "text-orange-600"];
const rankBg = [
  "bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20",
  "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10",
  "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
];

function msToDisplay(ms: number) {
  const s = (ms / 1000).toFixed(1);
  return `${s}s`;
}

export function Leaderboard({ entries, highlightId, compact = false }: LeaderboardProps) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 dark:text-gray-500 text-sm font-mono">
        No participants yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
      {entries.map((entry) => {
        const isHighlighted = entry.participantId === highlightId;
        const isTop3 = entry.rank <= 3;
        const idx = entry.rank - 1;

        return (
          <motion.div
            key={entry.participantId}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all
              ${isHighlighted
                ? "border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-500/15 ring-1 ring-orange-400/30"
                : isTop3
                ? rankBg[idx]
                : "border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]"
              }
            `}
          >
            <span
              className={`w-6 text-center font-black text-sm font-mono ${
                isTop3 ? rankColors[idx] : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : entry.rank === 3 ? "🥉" : `#${entry.rank}`}
            </span>
            <span
              className={`flex-1 font-semibold text-sm truncate ${
                isHighlighted ? "text-orange-700 dark:text-orange-400" : "text-gray-800 dark:text-gray-100"
              }`}
            >
              {entry.name}
              {isHighlighted && <span className="ml-1 text-xs opacity-70">(you)</span>}
            </span>
            {!compact && (
              <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                {msToDisplay(entry.totalResponseTime)}
              </span>
            )}
            <span
              className={`font-black font-mono text-sm ${
                isTop3 ? rankColors[idx] : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {entry.score}
            </span>
          </motion.div>
        );
      })}
      </AnimatePresence>
    </div>
  );
}
