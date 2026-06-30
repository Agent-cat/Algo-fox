"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, Fragment } from "react";
import { toast } from "sonner";
import {
  LdHomeSmile,
  LdDatabase,
  LdCode,
  LdLightbulbBolt,
  LdCupStar,
  LdDiploma,
  LdUsersGroupTwoRounded,
  LdClipboardList,
  LdCase,
  LdAltArrowRight,
  LdLogout2
} from "solar-icon-react/ld";
import { authClient } from "@/lib/auth-client";
import { getUserInstitutionDetails } from "@/actions/user.action";
import { useSidebar, COLLAPSED_WIDTH, EXPANDED_WIDTH, STORAGE_KEY } from "@/context/SidebarContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import CustomTooltip from "@/components/ui/CustomTooltip";

// ─────────────────────────────────────────────────────────────
// Route map
// ─────────────────────────────────────────────────────────────

interface SidebarProps {
  initialSession?: any;
}

const NAV_SECTIONS = [
  {
    label: "",
    items: [{ label: "Home", href: "/", icon: LdHomeSmile }],
  },
  {
    label: "Practice",
    items: [
      { label: "DSA Problems",      href: "/problems/dsa",      icon: LdCode  },
      { label: "SQL Problems",      href: "/problems/sql",      icon: LdDatabase },
      { label: "Aptitude Problems", href: "/problems/aptitude", icon: LdLightbulbBolt     },
    ],
  },
  {
    label: "Contests",
    items: [{ label: "Contests", href: "/contests", icon: LdCupStar }],
  },
  {
    label: "Learn",
    items: [{ label: "Courses", href: "/courses", icon: LdDiploma }],
  },
  {
    label: "Academics",
    items: [
      { label: "Classrooms", href: "/dashboard/classrooms", icon: LdUsersGroupTwoRounded },
      { label: "Assignments", href: "/my-assignments", icon: LdClipboardList },
    ],
  },
  {
    label: "Career",
    items: [{ label: "Placements", href: "/placements", icon: LdCase }],
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function Sidebar({ initialSession }: SidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { expanded, sidebarWidth, setSidebarWidth, isDragging, setIsDragging, isForceCollapsed } = useSidebar();
  const { data: clientSession, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const [institution, setInstitution] = useState<{
    name: string;
    logo: string | null;
  } | null>(null);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Practice: true,
    Contests: true,
    Learn: true,
    Academics: true,
    Career: true,
  });

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    let finalWidth = sidebarWidth;

    const handleMouseMove = (e: MouseEvent) => {
      let newWidth = e.clientX;
      newWidth = Math.max(COLLAPSED_WIDTH, Math.min(EXPANDED_WIDTH + 6, newWidth));
      finalWidth = newWidth;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      const midPoint = (COLLAPSED_WIDTH + EXPANDED_WIDTH) / 2;
      const snappedWidth = finalWidth > midPoint ? EXPANDED_WIDTH : COLLAPSED_WIDTH;
      setSidebarWidth(snappedWidth);
      try { localStorage.setItem(STORAGE_KEY, String(snappedWidth)); } catch (_) {}
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setSidebarWidth, sidebarWidth]);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSignOut = async () => {
    setIsLogoutOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to log out");
        }
      },
    });
  };

  const session = !mounted || isPending ? initialSession : clientSession;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const user = session?.user;
    const institutionId = user && 'institutionId' in user ? (user as any).institutionId : undefined;

    if (institutionId) {
      try {
        const s = localStorage.getItem("algofox_user_institution");
        if (s) setInstitution(JSON.parse(s));
      } catch (_) {}

      const abortController = new AbortController();

      const fetchInstitution = async () => {
        try {
          const data = await getUserInstitutionDetails();
          if (abortController.signal.aborted) return;
          if (data) {
            setInstitution(data as any);
            try {
              localStorage.setItem("algofox_user_institution", JSON.stringify(data));
            } catch (_) {}
          }
        } catch (error) {
            if (!abortController.signal.aborted) {
                console.error("Failed to fetch institution details", error);
            }
        }
      };

      fetchInstitution();

      return () => {
          abortController.abort();
      };
    } else if (user && !institutionId) {
      setInstitution(null);
      try { localStorage.removeItem("algofox_user_institution"); } catch (_) {}
    }
  }, [session?.user]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // ── Logo mark ─────────────────────────────────────────────
  const LogoMark = () => {
    if (institution?.logo) {
      return (
        <img
          src={institution.logo}
          alt={institution.name}
          width={40}
          height={40}
          className="w-10 h-10 object-contain rounded-2xl shadow-sm flex-shrink-0"
        />
      );
    }
    if (institution) {
      return (
        <span className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-base font-bold flex-shrink-0">
          {institution.name.charAt(0).toUpperCase()}
        </span>
      );
    }
    return (
      <img
        src="/icons/fox.png"
        alt="AlgoFox"
        width={40}
        height={40}
        className="w-10 h-10 object-contain rounded-2xl flex-shrink-0"
      />
    );
  };

  const brandName = institution ? institution.name : "AlgoFox";

  const currentWidth = mounted ? sidebarWidth : EXPANDED_WIDTH;
  const isExpanded = mounted ? expanded : true;

  return (
    <aside
      style={{ width: currentWidth }}
      className={[
        "fixed top-0 left-0 z-40 h-screen flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] border-r-2 border-dotted border-gray-300 dark:border-white/20 overflow-hidden",
        !isDragging && "transition-[width] duration-300 ease-in-out"
      ].filter(Boolean).join(" ")}
    >
      {/* ── Drag Overlay ────────────────────────────────────── */}
      {isDragging && (
        <div className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-md bg-white/20 dark:bg-black/20">
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200 tabular-nums">
            {Math.round(sidebarWidth)} px
          </span>
        </div>
      )}

      {/* ── Brand row ─────────────────────────────────────── */}
      <div
        className={[
          "flex items-center h-16 flex-shrink-0 border-b-2 border-dotted border-gray-300 dark:border-white/20",
          isExpanded ? "px-5 gap-3" : "justify-center px-0",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-3 min-w-0 group">
          <LogoMark />
          <span
            className={[
              "text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight truncate transition-[opacity,max-width] duration-300",
              isExpanded ? "opacity-100 max-w-[190px]" : "opacity-0 max-w-0",
            ].join(" ")}
          >
            {brandName}
          </span>
        </Link>
      </div>

      {/* ── Navigation ────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-1 space-y-5 custom-scrollbar">
        {NAV_SECTIONS.map((section, sIdx) => {
          const isOpen = !section.label || !isExpanded || openSections[section.label];
          return (
          <div key={sIdx} className="flex flex-col gap-1">
            {/* Section label — shown only when expanded */}
            {section.label && (
              <button
                onClick={() => toggleSection(section.label)}
                className={[
                  "w-full flex items-center justify-between px-2 py-1 transition-[opacity,max-height] duration-300 overflow-hidden group cursor-pointer mb-1",
                  isExpanded ? "opacity-100 max-h-8" : "opacity-0 max-h-0 py-0 mb-0",
                ].join(" ")}
              >
                <span className="text-[12.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide transition-colors ml-1">
                  {section.label}
                </span>
                <LdAltArrowRight
                  className={[
                    "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                    isOpen ? "rotate-90" : "",
                  ].join(" ")}
                />
              </button>
            )}

            <div
              className={[
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              ].join(" ")}
            >
              <div className="overflow-hidden flex flex-col space-y-[2px]">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  const linkContent = (
                    <Link
                      href={item.href}
                      className={[
                        "relative flex rounded-lg transition-colors duration-200 group",
                        isExpanded 
                          ? "flex-row items-center gap-3 pl-5 pr-3 py-2 w-full" 
                          : "justify-center w-12 h-12 flex items-center",
                        active
                          ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200",
                      ].join(" ")}
                    >
                      <Icon
                        className={[
                          "flex-shrink-0 transition-colors",
                          isExpanded ? "w-[18px] h-[18px]" : "w-[24px] h-[24px]",
                          active
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                        ].join(" ")}
                      />

                      {isExpanded && (
                        <span className="font-semibold text-[13.5px] whitespace-nowrap opacity-100 max-w-[200px] transition-all duration-300">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );

                  if (!isExpanded) {
                    return (
                      <div key={item.href} className="w-full flex justify-center">
                        <CustomTooltip content={item.label} side="right" delay={0.05}>
                          {linkContent}
                        </CustomTooltip>
                      </div>
                    );
                  }

                  return (
                    <Fragment key={item.href}>
                      {linkContent}
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        )})}
      </nav>

      {/* ── Footer Actions ─────────────────────────────────── */}
      {session?.user && (
        <div className={`flex-shrink-0 border-t border-gray-200 dark:border-white/10 flex flex-col gap-2 ${isExpanded ? "p-4 ml-2" : "px-1 py-3"}`}>
          {isExpanded ? (
            <button
              onClick={() => setIsLogoutOpen(true)}
              className="w-full py-2.5 px-4 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-[14.5px] font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <LdLogout2 className="w-[20px] h-[20px]" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="w-full flex justify-center">
              <CustomTooltip content="Logout" side="right" delay={0.05}>
                <button
                  onClick={() => setIsLogoutOpen(true)}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                  <LdLogout2 className="w-[24px] h-[24px]" />
                </button>
              </CustomTooltip>
            </div>
          )}
        </div>
      )}

      {/* ── Logout Confirmation Dialog ───────────────────── */}
      <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
        <DialogContent className="sm:max-w-[400px] bg-[#fafafa] dark:bg-[#1D1E23] border border-dotted border-gray-300 dark:border-white/20 p-6 rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm Logout</DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Are you sure you want to log out of your account? You will need to sign in again to access your progress.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex gap-3 sm:gap-3">
            <DialogClose asChild>
              <button className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-transparent border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 rounded-xl transition-all active:scale-95">
                Cancel
              </button>
            </DialogClose>
            <button 
              onClick={handleSignOut}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-500 bg-transparent border border-red-500/30 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-95"
            >
              Logout
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Drag handle */}
      {!isForceCollapsed && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute top-0 right-0 w-[6px] h-full cursor-col-resize z-50 hover:bg-orange-500/20 active:bg-orange-500/40 transition-colors"
        />
      )}
      
      {/* Size Indicator */}
      {isDragging && !isForceCollapsed && (
        <div className="fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none" style={{ left: currentWidth + 12 }}>
          <div className="bg-gray-900/90 dark:bg-white/90 text-white dark:text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl border border-gray-700 dark:border-gray-200 backdrop-blur-sm">
            {Math.round(currentWidth)} px
          </div>
        </div>
      )}
    </aside>
  );
}
