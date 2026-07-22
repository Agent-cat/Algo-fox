"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TopicCategory {
  id: string;
  name: string;
  slug: string;
  _count: { categoryProblems: number };
  solvedCount: number;
}

interface TopicsCarouselProps {
  categories: TopicCategory[];
}

function TopicCard({ category }: { category: TopicCategory }) {
  const total = category._count.categoryProblems;
  const solved = category.solvedCount ?? 0;

  return (
    <Link
      href={`/topic/${category.slug}`}
      className={`
        group relative flex flex-col
        min-w-[280px] max-w-[280px] h-[170px]
        rounded-2xl p-4 cursor-pointer
        bg-[url('/card_bg.svg')] bg-cover bg-center
        dark:bg-[url('/card_bg_dark.svg')]
        before:content-[''] before:absolute before:inset-0
        before:bg-[url('/topography.svg')] before:bg-cover before:bg-center
        before:opacity-10 dark:before:opacity-5
        before:pointer-events-none before:rounded-2xl
        border border-gray-200 dark:border-white/10
        hover:shadow-lg hover:shadow-orange-200/40 dark:hover:shadow-orange-900/30
        hover:-translate-y-1 active:translate-y-0
        transition-all duration-200 ease-out
        overflow-hidden
      `}
    >
      <img
        src="/icons/fox.png"
        alt="AlgoFox"
        width={40}
        height={40}
        className="absolute bottom-2.5 right-2.5 w-10 h-10 object-contain rounded-xl opacity-30"
      />

      <h3 className="text-[16px] font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3">
        {category.name}
      </h3>

      <div className="mt-auto">
        <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
          {solved} of {total} solved
        </span>
      </div>
    </Link>
  );
}

export function TopicsCarousel({ categories }: TopicsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 440 : -440, behavior: "smooth" });
  };

  if (categories.length === 0) return null;

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-gray-900 dark:text-white">
          Topic Sheets
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="p-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="p-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => (
          <TopicCard
            key={cat.id}
            category={cat}
          />
        ))}
      </div>
    </div>
  );
}
