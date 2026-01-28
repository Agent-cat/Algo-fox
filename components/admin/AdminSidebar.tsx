
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Code,
  Database,
  BookOpen,
  Building2,
  Trophy,
  Users,
  LucideIcon
} from "lucide-react";

type SidebarItem =
  | { type: "link"; name: string; icon: LucideIcon; href: string }
  | { type: "header"; name: string };

// Restoring original functionality but using the new "Section + Flat List" layout
const sidebarItems: SidebarItem[] = [
  { type: "header", name: "Overview" }, // Added header for consistency or could be strict top item
  { type: "link", name: "Dashboard", icon: LayoutDashboard, href: "/admin" },

  { type: "header", name: "DSA Tracker" },
  { type: "link", name: "Practice Problems", icon: Code, href: "/admin/dsa/problems" },
  { type: "link", name: "Learn Categories", icon: Code, href: "/admin/dsa/categories" },

  { type: "header", name: "SQL Tracker" },
  { type: "link", name: "Practice Problems", icon: Database, href: "/admin/sql/problems" },
  { type: "link", name: "Learn Categories", icon: Database, href: "/admin/sql/categories" },

  { type: "header", name: "Management" },
  { type: "link", name: "Allocate Courses", icon: BookOpen, href: "/admin/course-allocation" },
  { type: "link", name: "Institutions", icon: Building2, href: "/admin/institutions" },
  { type: "link", name: "Contests", icon: Trophy, href: "/dashboard/contests" },
  { type: "link", name: "Users", icon: Users, href: "/admin/users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white dark:bg-[#141414] border-r border-gray-200 dark:border-[#262626] overflow-y-auto font-mono scrollbar-hide">
      <nav className="px-5 space-y-1">
        {sidebarItems.map((item, index) => {
          if (item.type === "header") {
            return (
              <div key={`header-${index}`} className="flex items-center gap-3 mt-8 mb-4 px-2">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">
                  {item.name}
                </span>
                <div className="h-px bg-gray-200 dark:bg-[#262626] flex-1"></div>
              </div>
            );
          }

          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={`link-${index}`}
              href={item.href}
              className={`
                flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
                ${isActive
                  ? "text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-500/10"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                }
              `}
            >
              <item.icon className={`w-4 h-4 transition-colors ${isActive ? "text-orange-600 dark:text-orange-500" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`} />
              <span className="tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
