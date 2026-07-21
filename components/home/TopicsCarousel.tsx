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
        min-w-[300px] max-w-[300px] h-[190px]
        lg:min-w-[220px] lg:max-w-[220px] lg:h-[140px]
        xl:min-w-[250px] xl:max-w-[250px] xl:h-[160px]
        2xl:min-w-[300px] 2xl:max-w-[300px] 2xl:h-[190px]
        rounded-2xl p-5 lg:p-3 xl:p-4 2xl:p-5 cursor-pointer
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
        width={48}
        height={48}
        className="absolute bottom-3 right-3 w-12 h-12 lg:w-8 lg:h-8 lg:bottom-2 lg:right-2 xl:w-10 xl:h-10 xl:bottom-2.5 xl:right-2.5 2xl:w-12 2xl:h-12 2xl:bottom-3 2xl:right-3 object-contain rounded-xl opacity-30"
      />

      <h3 className="text-xl lg:text-[14px] xl:text-[16px] 2xl:text-xl font-bold text-gray-800 dark:text-gray-100 leading-snug mb-3">
        {category.name}
      </h3>

      <div className="mt-auto">
        <span className="text-[13px] lg:text-[11px] xl:text-[12px] 2xl:text-[13px] font-semibold text-gray-500 dark:text-gray-400">
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
