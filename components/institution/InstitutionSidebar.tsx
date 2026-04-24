"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Link as LinkIcon,
  Tent,
  LucideIcon,
  Building2,
  BarChart2,
} from "lucide-react";

type SidebarItem =
  | { type: "link"; name: string; icon: LucideIcon; href: string }
  | { type: "header"; name: string };

const sidebarItems: SidebarItem[] = [
  { type: "header", name: "Overview" },
  { type: "link", name: "Dashboard", icon: LayoutDashboard, href: "/dashboard/institution" },

  { type: "header", name: "User Management" },
  { type: "link", name: "Teachers", icon: Users, href: "/dashboard/institution/teachers" },
  { type: "link", name: "Contest Managers", icon: Trophy, href: "/dashboard/institution/managers" },
  { type: "link", name: "Students", icon: Users, href: "/dashboard/institution/students" },

  { type: "header", name: "Analytics" },
  { type: "link", name: "Student Analytics", icon: BarChart2, href: "/dashboard/institution/analytics" },

  { type: "header", name: "Academic" },
  { type: "link", name: "Classrooms", icon: Tent, href: "/dashboard/institution/classrooms" },

  { type: "header", name: "Configuration" },
  { type: "link", name: "Invites", icon: LinkIcon, href: "/dashboard/institution/invites" },
];

export default function InstitutionSidebar() {
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
