"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface Sheet {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  domain: string;
  _count?: { categoryProblems: number };
  solvedCount?: number;
}

interface TopicSheetsCarouselProps {
  sheets: Sheet[];
}

const DOMAIN_COLORS: Record<string, { bg: string; accent: string; dot: string }> = {
  DSA: { bg: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20", accent: "text-orange-600 dark:text-orange-400", dot: "bg-orange-400" },
  SQL: { bg: "from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/20", accent: "text-blue-600 dark:text-blue-400", dot: "bg-blue-400" },
  APTITUDE: { bg: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20", accent: "text-violet-600 dark:text-violet-400", dot: "bg-violet-400" },
  WEBDEV: { bg: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20", accent: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-400" },
  REACT: { bg: "from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/20", accent: "text-cyan-600 dark:text-cyan-400", dot: "bg-cyan-400" },
  OOPS: { bg: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20", accent: "text-rose-600 dark:text-rose-400", dot: "bg-rose-400" },
};

function SheetCard({ sheet }: { sheet: Sheet }) {
  const total = sheet._count?.categoryProblems ?? 0;
  const solved = sheet.solvedCount ?? 0;
  const color = DOMAIN_COLORS[sheet.domain] ?? DOMAIN_COLORS["DSA"];

  return (
    <Link
      href={`/sheets/${sheet.slug}`}
      className="group relative flex-shrink-0 w-48 sm:w-52 bg-white dark:bg-[#1e1f24] border border-gray-100 dark:border-white/8 rounded-2xl p-4 overflow-hidden hover:border-gray-200 dark:hover:border-white/15 hover:shadow-md dark:hover:shadow-black/30 transition-all duration-200"
    >
      {/* Gradient bg accent */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color.bg} opacity-60 pointer-events-none`} />

      <div className="relative z-10 flex flex-col h-full gap-3">
        {/* Progress badge */}
        <div className="flex items-center justify-between">
          <div className={`text-xs font-bold ${color.accent}`}>
            <span>{solved}</span>
            <span className="text-gray-400 dark:text-gray-500 font-medium">/{total}</span>
          </div>
          <div className={`w-2 h-2 rounded-full ${color.dot} opacity-80`} />
        </div>

        {/* Name */}
        <div className="flex-1">
          <h3 className="text-[13px] font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
            {sheet.name}
          </h3>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 font-medium">
          <BookOpen className="w-3 h-3 shrink-0" />
          <span>By Algo-fox</span>
        </div>
      </div>
    </Link>
  );
}

export function TopicSheetsCarousel({ sheets }: TopicSheetsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(sheets.length > 4);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = 220;
    container.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  if (sheets.length === 0) return null;

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[13px] font-bold text-gray-900 dark:text-white tracking-tight">
          Topic Sheets
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            className="p-1.5 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-gray-400 hover:text-gray-700 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex gap-3 overflow-x-auto scrollbar-none pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {sheets.map((sheet) => (
          <SheetCard key={sheet.id} sheet={sheet} />
        ))}
      </div>
    </div>
  );
}
