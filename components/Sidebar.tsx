"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Home,
  Database,
  FileCode2,
  Brain,
  Trophy,
  GraduationCap,
  ChevronDown,
  LogOut,
  Settings2,
  Briefcase,
  Users,
  ClipboardList,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getUserInstitutionDetails } from "@/actions/user.action";
import { useSidebar, COLLAPSED_WIDTH, EXPANDED_WIDTH } from "@/context/SidebarContext";

// ─────────────────────────────────────────────────────────────
// Route map
// ─────────────────────────────────────────────────────────────

interface SidebarProps {
  initialSession?: any;
}

const NAV_SECTIONS = [
  {
    label: "",
    items: [{ label: "Home", href: "/", icon: Home }],
  },
  {
    label: "Practice",
    items: [
      { label: "DSA Problems",      href: "/problems/dsa",      icon: Database  },
      { label: "SQL Problems",      href: "/problems/sql",      icon: FileCode2 },
      { label: "Aptitude Problems", href: "/problems/aptitude", icon: Brain     },
    ],
  },
  {
    label: "Contests",
    items: [{ label: "Contests", href: "/contests", icon: Trophy }],
  },
  {
    label: "Learn",
    items: [{ label: "Courses", href: "/courses", icon: GraduationCap }],
  },
  {
    label: "Academics",
    items: [
      { label: "Classrooms", href: "/dashboard/classrooms", icon: Users },
      { label: "Assignments", href: "/my-assignments", icon: ClipboardList },
    ],
  },
  {
    label: "Career",
    items: [{ label: "Placements", href: "/placements", icon: Briefcase }],
  },
] as const;

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function Sidebar({ initialSession }: SidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { expanded } = useSidebar();
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

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSignOut = async () => {
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

  return (
    <aside
      style={{ width: expanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH }}
      className="fixed top-0 left-0 z-40 h-screen flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] border-r-2 border-dotted border-gray-300 dark:border-white/20 transition-[width] duration-300 ease-in-out overflow-hidden"
    >
      {/* ── Brand row ─────────────────────────────────────── */}
      <div
        className={[
          "flex items-center h-16 flex-shrink-0",
          expanded ? "px-5 gap-3" : "justify-center px-0",
        ].join(" ")}
      >
        <Link href="/" className="flex items-center gap-3 min-w-0 group">
          <LogoMark />
          <span
            className={[
              "text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight truncate transition-[opacity,max-width] duration-300",
              expanded ? "opacity-100 max-w-[190px]" : "opacity-0 max-w-0",
            ].join(" ")}
          >
            {brandName}
          </span>
        </Link>
      </div>

      {/* ── Thin separator ────────────────────────────────── */}
      <div className={[
          "border-t-2 border-dotted border-gray-300 dark:border-white/20 flex-shrink-0 transition-all duration-300",
          expanded ? "mx-4" : "mx-2"
      ].join(" ")} />

      {/* ── Navigation ────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 space-y-6">
        {NAV_SECTIONS.map((section, sIdx) => {
          const isOpen = !section.label || !expanded || openSections[section.label];
          return (
          <div key={sIdx} className="flex flex-col gap-1">
            {/* Section label — shown only when expanded */}
            {section.label && (
              <button
                onClick={() => toggleSection(section.label)}
                className={[
                  "w-full flex items-center justify-between px-2 py-1 transition-[opacity,max-height] duration-300 overflow-hidden group cursor-pointer",
                  expanded ? "opacity-100 max-h-8" : "opacity-0 max-h-0 py-0",
                ].join(" ")}
              >
                <span className="text-[11px] font-medium uppercase tracking-[0.05em] text-gray-400 dark:text-gray-500 select-none whitespace-nowrap group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                  {section.label}
                </span>
                <ChevronDown
                  className={[
                    "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                    isOpen ? "" : "-rotate-90",
                  ].join(" ")}
                />
              </button>
            )}

            <div
              className={[
                "flex flex-col gap-0.5 overflow-hidden transition-all duration-300",
                section.label && expanded ? "ml-3 pl-3 border-l border-gray-200 dark:border-white/10" : "", // Tracking line only when expanded
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
              ].join(" ")}
            >
            {section.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!expanded ? item.label : undefined}
                  className={[
                    "relative flex items-center rounded-lg transition-colors duration-75 group",
                    expanded ? "gap-3 px-3 py-2.5" : "justify-center px-0 py-3",
                    active
                      ? "bg-gray-100 dark:bg-white/10 text-orange-600 dark:text-orange-500 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white",
                  ].join(" ")}
                >
                  {/* Linear-style Left Accent for Active */}
                  {active && (
                    <div className={`absolute ${expanded ? "-left-[13px]" : "-left-2"} top-1/2 -translate-y-1/2 w-[3px] h-3/4 bg-orange-500 rounded-r-full`} />
                  )}

                  <Icon
                    className={[
                      "flex-shrink-0",
                      expanded ? "w-[18px] h-[18px]" : "w-5 h-5",
                    ].join(" ")}
                  />

                  <span
                    className={[
                      "text-[14.5px] whitespace-nowrap transition-[opacity,max-width] duration-300 overflow-hidden",
                      expanded ? "opacity-100 max-w-[200px]" : "opacity-0 max-w-0",
                    ].join(" ")}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
            </div>
          </div>
        )})}
      </nav>

      {/* ── Footer Actions ─────────────────────────────────── */}
      <div className={`flex-shrink-0 border-t border-gray-200 dark:border-white/10 flex flex-col gap-2 ${expanded ? "p-4" : "p-3"}`}>
        {expanded ? (
          <button
            onClick={handleSignOut}
            className="w-full py-2.5 px-4 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 text-[14.5px] font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span>Logout</span>
          </button>
        ) : (
          <>

            <button
              onClick={handleSignOut}
              title="Logout"
              className="w-full aspect-square flex items-center justify-center border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}
