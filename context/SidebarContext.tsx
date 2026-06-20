"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ─────────────────────────────────────────────────────────────
// Sidebar expansion state shared between Sidebar ↔ Navbar ↔ MainContentWrapper
// ─────────────────────────────────────────────────────────────

const COLLAPSED_WIDTH = 56;   // px  (w-14)
const EXPANDED_WIDTH  = 280;  // px  (w-[280px])
const STORAGE_KEY = "algofox_sidebar_expanded";

interface SidebarContextValue {
  expanded: boolean;
  toggle: () => void;
  sidebarWidth: number;
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
  toggle: () => {},
  sidebarWidth: EXPANDED_WIDTH,
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) setExpanded(saved === "true");
    } catch (_) {}
  }, []);

  const toggle = () => {
    setExpanded((prev) => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, String(next)); } catch (_) {}
      return next;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggle,
        sidebarWidth: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

export { COLLAPSED_WIDTH, EXPANDED_WIDTH };
