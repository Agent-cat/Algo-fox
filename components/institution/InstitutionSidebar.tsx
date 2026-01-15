"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Trophy,
  Link as LinkIcon,
  ChevronRight,
  LucideIcon,
  Tent,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  name: string;
  icon: LucideIcon;
} & (
  | { href: string; children?: never }
  | { href?: never; children: { name: string; href: string }[] }
);

const menuItems: MenuItem[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard/institution",
  },
  {
    name: "User Management",
    icon: Users,
    children: [
      {
        name: "Teachers",
        href: "/dashboard/institution/teachers",
      },
      {
        name: "Contest Managers",
        href: "/dashboard/institution/managers",
      },
      {
        name: "Students",
        href: "/dashboard/institution/students",
      },
    ],
  },
  {
    name: "Classrooms",
    icon: Tent,
    href: "/dashboard/institution/classrooms",
  },
  {
    name: "Invites",
    icon: LinkIcon,
    href: "/dashboard/institution/invites",
  },
];

export default function InstitutionSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    const expanded: string[] = [];
    if (pathname?.includes("/dashboard/institution/teachers") ||
        pathname?.includes("/dashboard/institution/managers") ||
        pathname?.includes("/dashboard/institution/students")) {
      expanded.push("User Management");
    }
    return expanded;
  });

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName)
        ? prev.filter((s) => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white/80 dark:bg-[#141414]/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-[#262626] shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="px-6 mb-6">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Institution
        </p>
      </div>
      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          if (item.children) {
            const isExpanded = expandedSections.includes(item.name);
            const hasActiveChild = item.children.some(
              (child) =>
                pathname === child.href || pathname?.startsWith(child.href + "/")
            );

            return (
              <div key={item.name} className="mb-1">
                <button
                  onClick={() => toggleSection(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium group ${
                    hasActiveChild
                      ? "bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 shadow-sm shadow-orange-100 dark:shadow-none"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-1.5 rounded-lg transition-colors ${
                        hasActiveChild
                          ? "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400"
                          : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-[#262626] group-hover:shadow-sm"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-90 text-orange-500" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-4 border-l-2 border-gray-100 dark:border-[#262626] my-1 space-y-1">
                        {item.children.map((child) => {
                          const isActive =
                            pathname === child.href ||
                            pathname?.startsWith(child.href + "/");
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                                isActive
                                  ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 font-medium translate-x-1"
                                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:translate-x-1"
                              }`}
                            >
                              {isActive && (
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                              )}
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname === item.href + "/";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 group ${
                isActive
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-[#262626] group-hover:shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Decorative bg element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#141414] to-transparent pointer-events-none" />
    </aside>
  );
}
