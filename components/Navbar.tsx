"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UserPoints from "./UserPoints";
import { StreakBadge } from "./shared/StreakBadge";
import { ChevronDown, PanelLeft, PanelLeftClose, Search, Menu } from "lucide-react";
import { useSidebar, EXPANDED_WIDTH } from "@/context/SidebarContext";
import { NotificationDropdown, Notification } from "./home/NotificationDropdown";

interface NavbarProps {
  initialSession?: {
    session?: { impersonatedBy?: string | null };
    user?: { id: string; name?: string | null; image?: string | null; role?: string | null } | null;
  } | null;
  onMobileMenuToggle?: () => void;
}

export default function Navbar({ initialSession, onMobileMenuToggle }: NavbarProps = {}) {
  const { data: clientSession, isPending } = authClient.useSession();
  const { sidebarWidth, expanded, toggle, isDragging, isForceCollapsed, toggleMobileDrawer } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const session = !mounted || isPending ? initialSession : clientSession;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  const shouldRender = initialSession !== undefined ? true : mounted && !isPending;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/notifications?limit=5")
        .then(res => res.json())
        .then(data => {
          if (data.success && data.notifications) {
            setNotifications(data.notifications);
          }
        })
        .catch(() => { });
    }
  }, [session?.user]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
        },
      },
    });
  };

  const userRole = (session?.user as { role?: string } | undefined)?.role;
  const isAdmin = userRole === "ADMIN";
  const isInstitutionManager = userRole === "INSTITUTION_MANAGER";
  const isTeacher = userRole === "TEACHER";
  const isContestManager = userRole === "CONTEST_MANAGER";
  const isPlacementDirector = userRole === "PLACEMENT_DIRECTOR";
  const isImpersonating = !!session?.session?.impersonatedBy;

  const currentWidth = session?.user ? (mounted ? sidebarWidth : EXPANDED_WIDTH) : 0;
  const isExpanded = mounted ? expanded : true;

  return (
    <nav
      style={{ left: currentWidth }}
      className={[
        // Fixed height h-16 always — overflow-hidden ensures nothing can push it taller
        "fixed right-0 z-50 h-16 bg-[#fafafa] dark:bg-[#1D1E23] backdrop-blur-md border-b-2 border-dotted border-gray-300 dark:border-white/20 font-navbar",
        isImpersonating ? "top-10" : "top-0",
        !isDragging && "transition-[left] duration-300 ease-in-out"
      ].filter(Boolean).join(" ")}
    >
      {/* Single row — items-center keeps everything on one line */}
      <div className="h-full px-2 sm:px-3 lg:px-4 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 min-w-0">

        {/* LEFT: sidebar toggle / brand logo / mobile menu */}
        <div className="flex items-center gap-1.5 shrink-0 min-w-0">
          {/* Mobile hamburger — only shown when sidebar is hidden on mobile */}
          {session?.user && (
            <button
              onClick={toggleMobileDrawer}
              aria-label="Open menu"
              className="md:hidden flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          )}

          {session?.user ? (
            !isForceCollapsed ? (
              <button
                onClick={toggle}
                aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                className="hidden md:flex flex-shrink-0 w-9 h-9 items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200"
              >
                {isExpanded
                  ? <PanelLeftClose className="w-[18px] h-[18px]" />
                  : <PanelLeft className="w-[18px] h-[18px]" />}
              </button>
            ) : (
              <div className="hidden md:block w-9 h-9" />
            )
          ) : (
            <Link href="/" className="flex items-center gap-2 min-w-0 group flex-shrink-0 select-none">
              <Image
                src="/icons/fox.png"
                alt="AlgoFox"
                width={32}
                height={32}
                className="w-8 h-8 object-contain rounded-xl flex-shrink-0"
              />
              <span className="hidden sm:block text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight truncate">
                AlgoFox
              </span>
            </Link>
          )}
        </div>

        {/* CENTER: Search Bar (hidden on mobile — icon only) */}
        {session?.user ? (
          <>
            {/* Mobile: icon-only search button */}
            <button
              type="button"
              aria-label="Search"
              className="md:hidden flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
              onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Tablet/Desktop: full search bar */}
            <button
              type="button"
              className="relative group cursor-pointer text-left flex-1 max-w-lg focus:outline-none hidden md:block min-w-0"
              onClick={() => window.dispatchEvent(new CustomEvent('open-global-search'))}
            >
              <svg className="absolute left-3 lg:left-2.5 xl:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 text-gray-400 group-hover:text-orange-500 dark:text-gray-500 dark:group-hover:text-orange-400 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <div
                className="w-full flex items-center pl-8 lg:pl-8 xl:pl-9 2xl:pl-10 pr-3 lg:pr-12 xl:pr-14 2xl:pr-16 py-1.5 lg:py-1.5 xl:py-2 2xl:py-2.5 text-[12px] lg:text-[11.5px] xl:text-[12.5px] 2xl:text-[13px] font-medium bg-[#FAFAFB] hover:bg-gray-100 dark:bg-[#1a1a1f] dark:hover:bg-[#222228] border border-gray-200 dark:border-white/10 group-hover:border-gray-300 dark:group-hover:border-white/20 rounded-xl transition-all text-gray-400 dark:text-gray-500 truncate"
              >
                <span className="truncate">Search problems, topics, contests...</span>
              </div>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 items-center gap-1 pointer-events-none hidden xl:flex 2xl:flex">
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-[#2a2a30] px-1.5 py-0.5 rounded-md border border-gray-200 dark:border-white/10">Ctrl</span>
                <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-[#2a2a30] px-1.5 py-0.5 rounded-md border border-gray-200 dark:border-white/10">K</span>
              </div>
            </button>
          </>
        ) : (
          <div className="flex-1 min-w-0" />
        )}

        {/* RIGHT: user actions — all shrink-0 to prevent flex collapse */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-2 xl:gap-3 2xl:gap-4 shrink-0">
          {shouldRender && session ? (
            <>
              {notifications.length > 0 && <NotificationDropdown notifications={notifications} />}
              <StreakBadge />
              <div className="h-4 w-px bg-gray-200 dark:bg-white/10 hidden lg:block xl:block" />
              <UserPoints className="hidden lg:flex" />

              {/* User avatar dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((p) => !p)}
                  className="flex items-center gap-1.5 pl-1.5 sm:pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#262626]"
                >
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hidden xl:block max-w-[100px] truncate">
                    {session?.user?.name}
                  </span>
                  <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 lg:w-7 lg:h-7 xl:w-7.5 xl:h-7.5 2xl:w-8 2xl:h-8 rounded-full overflow-hidden ring-2 ring-white dark:ring-[#1D1E23] bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-[10px] xl:text-[11px] 2xl:text-xs flex-shrink-0">
                    {session?.user?.image ? (
                      <Image
                        src={session.user?.image || ""}
                        alt={session.user?.name || "User"}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      session?.user?.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-xl shadow-xl z-50 p-1">
                      <DropdownLink href="/dashboard" close={() => setIsDropdownOpen(false)}>My Dashboard</DropdownLink>
                      <DropdownLink href="/bookmarks" close={() => setIsDropdownOpen(false)}>Bookmarks</DropdownLink>
                      <DropdownLink href="/leaderboard" close={() => setIsDropdownOpen(false)}>Leaderboard</DropdownLink>

                      {(isAdmin || isTeacher || isContestManager || isPlacementDirector || isInstitutionManager) && (
                        <>
                          <Divider />
                          <SectionLabel>Manage</SectionLabel>
                        </>
                      )}

                      {isTeacher && (
                        <>
                          <DropdownLink href="/dashboard/teacher/classrooms" close={() => setIsDropdownOpen(false)}>Teacher Dashboard</DropdownLink>
                          <DropdownLink href="/dashboard/teacher/quiz" close={() => setIsDropdownOpen(false)} accent>⚡ Quizzes</DropdownLink>
                        </>
                      )}
                      {isInstitutionManager && (
                        <DropdownLink href="/dashboard/institution" close={() => setIsDropdownOpen(false)}>Institution</DropdownLink>
                      )}
                      {(isAdmin || isContestManager) && (
                        <DropdownLink href="/dashboard/contests" close={() => setIsDropdownOpen(false)}>Contest Management</DropdownLink>
                      )}
                      {isAdmin && (
                        <DropdownLink href="/admin" close={() => setIsDropdownOpen(false)} accent>Admin Panel</DropdownLink>
                      )}
                      {isPlacementDirector && (
                        <DropdownLink href="/placementdashboard" close={() => setIsDropdownOpen(false)}>Placement Dashboard</DropdownLink>
                      )}

                      <Divider />
                      <button
                        onClick={() => { setIsDropdownOpen(false); handleSignOut(); }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : shouldRender ? (
            <>
              <Link href="/signin" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap">
                Sign In
              </Link>
              <Link href="/signup" className="px-3 sm:px-4 py-1.5 sm:py-2 bg-black dark:bg-white text-white dark:text-black text-xs sm:text-sm rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-all font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap">
                Get Started
              </Link>
            </>
          ) : (
            <div className="w-8 sm:w-[100px]" />
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── Small helpers ────────────────────────────────────────────

function DropdownLink({
  href,
  close,
  accent,
  children,
}: {
  href: string;
  close: () => void;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={close}
      className={[
        "block px-4 py-2 text-sm rounded-lg transition-colors",
        accent
          ? "text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1D1E23]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

function Divider() {
  return <div className="my-1 border-t border-gray-100 dark:border-[#262626]" />;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
      {children}
    </div>
  );
}


