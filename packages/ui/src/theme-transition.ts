"use client";

import { flushSync } from "react-dom";

interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
}

/**
 * Theme toggle with a circular-reveal view transition.
 * Extracted from the two previously duplicated implementations
 * (ThemeToggle / ThemeToggleButton) so the animation logic
 * lives in exactly one place.
 *
 * Behavior is unchanged: falls back to an instant switch when
 * `document.startViewTransition` is unavailable.
 */
export function toggleThemeWithTransition(
  event: React.MouseEvent<HTMLButtonElement>,
  isDark: boolean,
  setTheme: (theme: string) => void,
): void {
  const doc = document as unknown as {
    startViewTransition?: (callback: () => void) => ViewTransition;
  };
  if (!doc.startViewTransition) {
    setTheme(isDark ? "light" : "dark");
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  document.documentElement.classList.add("no-transitions");

  const transition = doc.startViewTransition(() => {
    flushSync(() => {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light";
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      }
      setTheme(isDark ? "light" : "dark");
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
      },
    );
  });

  transition.finished.then(() => {
    document.documentElement.classList.remove("no-transitions");
  });
}
