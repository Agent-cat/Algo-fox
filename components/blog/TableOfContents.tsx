"use client";

import { useState, useEffect } from "react";
import { slugify } from "@/lib/slugify";

interface TocItem {
  id: string;
  text: string;
  level: number; // 1 = h1, 2 = h2, 3 = h3
}

interface TableOfContentsProps {
  /** Raw markdown content — headings are extracted from this */
  content: string;
}

/** Extract h1/h2/h3 headings from raw markdown text */
function extractHeadings(markdown: string): TocItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    // Strip any inline markdown from the heading text
    const rawText = match[2].replace(/\*\*(.+?)\*\*/g, "$1")
                             .replace(/__(.+?)__/g, "$1")
                             .replace(/\*(.+?)\*/g, "$1")
                             .replace(/_(.+?)_/g, "$1")
                             .replace(/`(.+?)`/g, "$1")
                             .trim();
    items.push({ id: slugify(rawText), text: rawText, level });
  }

  return items;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const headings = extractHeadings(content);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost heading that is currently intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0% -70% 0%",
        threshold: 0,
      }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [content]); // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-60 shrink-0 self-start sticky top-24">
      <div className="bg-white dark:bg-[#202227] border border-gray-100 dark:border-white/5 rounded-2xl p-5 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-none">
        {/* Header */}
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
          <span className="w-3 h-px bg-orange-500 rounded-full inline-block" />
          On this page
        </p>

        {/* Heading list */}
        <nav className="flex flex-col">
          {headings.map((item) => {
            const isActive = activeId === item.id;
            const indent =
              item.level === 1
                ? "pl-2"
                : item.level === 2
                ? "pl-5"
                : "pl-8";

            return (
              <a
                key={`${item.id}-${item.level}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(item.id);
                  }
                }}
                className={`
                  group relative flex items-start py-1.5 text-xs leading-snug font-medium
                  border-l-2 transition-all duration-200
                  ${indent}
                  ${
                    isActive
                      ? "border-orange-500 text-orange-500 font-semibold"
                      : "border-gray-100 dark:border-white/5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-white/20"
                  }
                `}
              >
                {/* Active dot indicator */}
                {isActive && (
                  <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-500 border-2 border-white dark:border-[#202227]" />
                )}
                <span className="line-clamp-2">{item.text}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
