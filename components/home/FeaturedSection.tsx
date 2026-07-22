"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
  id: string;
  redirectUrl: string;
  imageUrl: string;
}

interface FeaturedSectionProps {
  banners: Banner[];
}

export function FeaturedSection({ banners }: FeaturedSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(banners.length > 1);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    // Show left arrow if we have scrolled right
    setShowLeft(scrollLeft > 5);
    // Show right arrow if we can scroll further right
    setShowRight(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Initial check and delayed checks for image loading / rendering delays
    checkScroll();
    const t1 = setTimeout(checkScroll, 150);
    const t2 = setTimeout(checkScroll, 600);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [banners]);

  const handleScroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 320;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!banners || banners.length === 0) return null;

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar w-full shrink-0 pb-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.redirectUrl}
            className="relative block aspect-[16/9] w-[360px] shrink-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/5 shadow-sm hover:shadow-lg hover:shadow-orange-200/40 dark:hover:shadow-orange-900/30 hover:-translate-y-1 active:translate-y-0 transition-all duration-200 ease-out cursor-pointer"
          >
            <img
              src={banner.imageUrl}
              alt="Featured banner"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </Link>
        ))}
      </div>

      {/* Navigation Buttons overlay - visible on hover of the container */}
      {/* Left button */}
      <button
        onClick={() => handleScroll("left")}
        className={`absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 dark:bg-[#1D1E23]/70 hover:bg-white/95 dark:hover:bg-[#1D1E23]/95 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
          isHovered && showLeft ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right button */}
      <button
        onClick={() => handleScroll("right")}
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/70 dark:bg-[#1D1E23]/70 hover:bg-white/95 dark:hover:bg-[#1D1E23]/95 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer ${
          isHovered && showRight ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

