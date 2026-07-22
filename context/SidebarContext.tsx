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
  isMobileDrawerOpen: boolean;
  toggleMobileDrawer: () => void;
  closeMobileDrawer: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  expanded: true,
  toggle: () => {},
  sidebarWidth: EXPANDED_WIDTH,
  setSidebarWidth: () => {},
  isDragging: false,
  setIsDragging: () => {},
  isForceCollapsed: false,
  isMobileDrawerOpen: false,
  toggleMobileDrawer: () => {},
  closeMobileDrawer: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarWidth, setSidebarWidth] = useState(EXPANDED_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Close mobile drawer on route changes
  useEffect(() => {
    setIsMobileDrawerOpen(false);
  }, [pathname]);

  const toggleMobileDrawer = () => setIsMobileDrawerOpen((prev) => !prev);
  const closeMobileDrawer = () => setIsMobileDrawerOpen(false);

  useEffect(() => {
    const getResponsiveDefaultWidth = (width: number) => {
      if (width < 1024) return COLLAPSED_WIDTH;
      if (width < 1280) return 190;
      if (width < 1536) return 230;
      return EXPANDED_WIDTH;
    };

    let wasBelowThreshold = typeof window !== "undefined" ? window.innerWidth < 1024 : false;
    let wasSmallThreshold = typeof window !== "undefined" ? (window.innerWidth >= 1024 && window.innerWidth < 1280) : false;
    let wasMediumThreshold = typeof window !== "undefined" ? (window.innerWidth >= 1280 && window.innerWidth < 1536) : false;

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number(saved);
        if (!isNaN(parsed) && isFinite(parsed) && parsed > COLLAPSED_WIDTH && parsed <= MAX_WIDTH) {
          if (wasBelowThreshold) {
            setSidebarWidth(COLLAPSED_WIDTH);
          } else {
            setSidebarWidth(parsed);
          }
        }
      } else {
        setSidebarWidth(getResponsiveDefaultWidth(typeof window !== "undefined" ? window.innerWidth : 1920));
      }
    } catch (_) {}

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      const isBelow = width < 1024;
      const isSmall = width >= 1024 && width < 1280;
      const isMedium = width >= 1280 && width < 1536;

      if (
        isBelow !== wasBelowThreshold ||
        isSmall !== wasSmallThreshold ||
        isMedium !== wasMediumThreshold
      ) {
        wasBelowThreshold = isBelow;
        wasSmallThreshold = isSmall;
        wasMediumThreshold = isMedium;
        if (isBelow) {
          setSidebarWidth(COLLAPSED_WIDTH);
        } else {
          try {
            const savedVal = localStorage.getItem(STORAGE_KEY);
            if (savedVal !== null) {
              const parsedVal = Number(savedVal);
              if (!isNaN(parsedVal) && isFinite(parsedVal) && parsedVal > COLLAPSED_WIDTH && parsedVal <= MAX_WIDTH) {
                setSidebarWidth(parsedVal);
                return;
              }
            }
          } catch (_) {}
          
          if (isSmall) {
            setSidebarWidth(190);
          } else if (isMedium) {
            setSidebarWidth(230);
          } else {
            setSidebarWidth(EXPANDED_WIDTH);
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  const getMaxSidebarWidth = (width: number) => {
    if (width < 1024) return COLLAPSED_WIDTH;
    if (width < 1280) return 200;
    if (width < 1536) return 240;
    return MAX_WIDTH;
  };

  const maxAllowed = windowWidth ? getMaxSidebarWidth(windowWidth) : MAX_WIDTH;
  const effectiveSidebarWidth = isForceCollapsed 
    ? COLLAPSED_WIDTH 
    : (sidebarWidth > maxAllowed ? maxAllowed : sidebarWidth);
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
        isMobileDrawerOpen,
        toggleMobileDrawer,
        closeMobileDrawer,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);

export { COLLAPSED_WIDTH, EXPANDED_WIDTH, MAX_WIDTH, STORAGE_KEY };

