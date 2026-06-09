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

  // Optimize for large numbers of users by only rendering Top 50.
  // If highlightId is provided and they are outside Top 50, manually append them.
  const MAX_DISPLAY = 50;
  let displayEntries = entries.slice(0, MAX_DISPLAY);
  
  const myEntry = highlightId ? entries.find(e => e.participantId === highlightId) : undefined;
  const isMeOutside = myEntry && myEntry.rank > MAX_DISPLAY;
  
  if (isMeOutside) {
    // Replace the 50th element with an ellipsis placeholder, then append myEntry?
    // Actually just appending is fine.
    displayEntries.push(myEntry);
  }

  const remainingCount = entries.length - displayEntries.length;

  return (
    <div className="space-y-2 relative">
      <AnimatePresence mode="popLayout">
      {displayEntries.map((entry, arrayIndex) => {
        const isHighlighted = entry.participantId === highlightId;
        const isTop3 = entry.rank <= 3;
        const idx = entry.rank - 1;
        const isGap = isMeOutside && arrayIndex === displayEntries.length - 1;

        return (
          <div key={entry.participantId}>
            {isGap && (
              <div className="flex justify-center items-center py-2 text-gray-400 dark:text-gray-500 font-black tracking-widest text-xs uppercase">
                &middot;&middot;&middot;
              </div>
            )}
            <motion.div
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                isHighlighted
                  ? "border-orange-400 dark:border-orange-500 bg-orange-50 dark:bg-orange-500/15 ring-1 ring-orange-400/30"
                  : isTop3
                  ? rankBg[idx]
                  : "border-gray-100 dark:border-[#2a2a2a] bg-white dark:bg-[#1D1E23]"
              }`}
            >
            <span
              className={`w-8 text-center font-black text-sm font-mono ${
                isTop3 ? rankColors[idx] : "text-gray-400 dark:text-gray-500"
              }`}
            >
              #{entry.rank}
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
          </div>
        );
      })}
      </AnimatePresence>
      {remainingCount > 0 && (
        <div className="text-center pt-3 mt-1 border-t border-gray-100 dark:border-[#2a2a2a] text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
          + {remainingCount.toLocaleString()} other{remainingCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
