"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Contrast } from "lucide-react";

import { flushSync } from "react-dom";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setloading(false);
  }, []);

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#262626] animate-pulse" />
    );
  }

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const doc = document as any;
    if (!doc.startViewTransition) {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add("no-transitions");

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        if (resolvedTheme === "dark") {
          document.documentElement.classList.remove("dark");
          document.documentElement.style.colorScheme = "light";
        } else {
          document.documentElement.classList.add("dark");
          document.documentElement.style.colorScheme = "dark";
        }
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      });
    });


    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove("no-transitions");
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-[#262626] group transition-transform active:scale-95"
      aria-label={`Switch to ${
        resolvedTheme === "dark" ? "light" : "dark"
      } mode`}
      title={`Current: ${resolvedTheme} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <svg 
            viewBox="0 0 24 24" 
            className={`w-5 h-5 text-gray-700 dark:text-gray-300 transition-transform duration-500 ${
                resolvedTheme === "dark" ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 2A10 10 0 0 0 12 22V2Z" fill="black" />
            <path d="M12 2A10 10 0 0 1 12 22V2Z" fill="white" />
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </button>
  );
}
