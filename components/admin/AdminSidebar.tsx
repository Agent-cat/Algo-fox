"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Code, Database, ChevronRight, LucideIcon, LayoutDashboard, Settings, Users, BarChart3, Building2, Trophy } from "lucide-react";
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
    href: "/admin",
  },
  {
    name: "DSA",
    icon: Code,
    children: [
      {
        name: "Practice Problems",
        href: "/admin/dsa/problems",
      },
      {
        name: "Learn Categories",
        href: "/admin/dsa/categories",
      },
    ],
  },
  {
    name: "SQL",
    icon: Database,
    children: [
      {
        name: "Practice Problems",
        href: "/admin/sql/problems",
      },
      {
        name: "Learn Categories",
        href: "/admin/sql/categories",
      },
    ],
  },
  {
    name: "Allocate Courses",
    icon: BookOpen,
    href: "/admin/course-allocation",
  },
  {
    name: "Institutions",
    icon: Building2,
    href: "/admin/institutions",
  },
  {
    name: "Contests",
    icon: Trophy,
    href: "/dashboard/contests",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    // Auto-expand sections if current path matches
    const expanded: string[] = [];
    if (pathname?.startsWith("/admin/dsa")) expanded.push("DSA");
    if (pathname?.startsWith("/admin/sql")) expanded.push("SQL");
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
    <aside className="w-72 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] transition-all duration-300">
      <div className="px-6 mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</p>
      </div>
      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          if (item.children) {
            const isExpanded = expandedSections.includes(item.name);
            const hasActiveChild = item.children.some(
              (child) => pathname === child.href || pathname?.startsWith(child.href + "/")
            );

            return (
              <div key={item.name} className="mb-1">
                <button
                  onClick={() => toggleSection(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${hasActiveChild
                    ? "bg-orange-50 text-orange-700 shadow-sm shadow-orange-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg transition-colors ${hasActiveChild ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm"
                      }`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90 text-orange-500" : ""}`}
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
                      <div className="ml-4 pl-4 border-l-2 border-gray-100 my-1 space-y-1">
                        {item.children.map((child) => {
                          const isActive =
                            pathname === child.href || pathname?.startsWith(child.href + "/");
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                ? "text-orange-600 bg-orange-50 font-medium translate-x-1"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:translate-x-1"
                                }`}
                            >
                              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
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
          const isActive = pathname === item.href || pathname === item.href + "/";

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 mb-1 group ${isActive
                ? "bg-orange-600 text-white shadow-lg shadow-orange-200"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm"
                }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Decorative bg element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </aside>
  );
}
