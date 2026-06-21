"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────
// Sidebar expansion state shared between Sidebar ↔ Navbar ↔ MainContentWrapper
// ─────────────────────────────────────────────────────────────

const COLLAPSED_WIDTH = 56;   // px  (w-14)
const EXPANDED_WIDTH  = 280;  // px  (w-[280px])
const STORAGE_KEY = "algofox_sidebar_width";

interface SidebarContextValue {
  expanded: boolean;
  toggle: () => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
  toggle: () => {},
  sidebarWidth: EXPANDED_WIDTH,
  setSidebarWidth: () => {},
  isDragging: false,
  setIsDragging: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [sidebarWidth, setSidebarWidth] = useState(EXPANDED_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setSidebarWidth(Number(saved));
      }
    } catch (_) {}
  }, []);

  const expanded = sidebarWidth > COLLAPSED_WIDTH + 10;

  const toggle = () => {
    const nextWidth = expanded ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
    setSidebarWidth(nextWidth);
    try { localStorage.setItem(STORAGE_KEY, String(nextWidth)); } catch (_) {}
  };

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggle,
        sidebarWidth,
        setSidebarWidth,
        isDragging,
        setIsDragging,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

export { COLLAPSED_WIDTH, EXPANDED_WIDTH, STORAGE_KEY };
