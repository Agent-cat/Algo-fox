"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────
// Sidebar expansion state shared between Sidebar ↔ Navbar ↔ MainContentWrapper
// ─────────────────────────────────────────────────────────────

const COLLAPSED_WIDTH = 72;   // px  (w-18)
const EXPANDED_WIDTH  = 280;  // px  (w-[280px])
const MAX_WIDTH       = 300;  // px  (max draggable width)
const STORAGE_KEY = "algofox_sidebar_width";

interface SidebarContextValue {
  expanded: boolean;
  toggle: () => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;
  isDragging: boolean;
  setIsDragging: (v: boolean) => void;
  isForceCollapsed: boolean;
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
  toggle: () => {},
  sidebarWidth: EXPANDED_WIDTH,
  setSidebarWidth: () => {},
  isDragging: false,
  setIsDragging: () => {},
  isForceCollapsed: false,
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(EXPANDED_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && isFinite(parsed) && parsed > COLLAPSED_WIDTH && parsed <= MAX_WIDTH) {
          setSidebarWidth(parsed);
        }
      }
    } catch (_) {}
  }, []);

  const isForceCollapsed = !!(
    pathname && (
      pathname === "/compiler" ||
      pathname === "/admin" ||
      pathname.startsWith("/admin/") ||
      pathname === "/placements" ||
      pathname.startsWith("/placements/") ||
      pathname === "/dashboard/settings" ||
      pathname.startsWith("/dashboard/settings/") ||
      pathname === "/placementdashboard" ||
      pathname.startsWith("/placementdashboard/")
    )
  );

  const effectiveSidebarWidth = isForceCollapsed ? COLLAPSED_WIDTH : sidebarWidth;
  const expanded = effectiveSidebarWidth > (COLLAPSED_WIDTH + EXPANDED_WIDTH) / 2;

  const toggle = () => {
    if (isForceCollapsed) return;
    const nextWidth = expanded ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
    setSidebarWidth(nextWidth);
    try { localStorage.setItem(STORAGE_KEY, String(nextWidth)); } catch (_) {}
  };

  return (
    <SidebarContext.Provider
      value={{
        expanded,
        toggle,
        sidebarWidth: effectiveSidebarWidth,
        setSidebarWidth,
        isDragging,
        setIsDragging,
        isForceCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

export { COLLAPSED_WIDTH, EXPANDED_WIDTH, MAX_WIDTH, STORAGE_KEY };

