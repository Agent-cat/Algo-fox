"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LdWidget,
  LdCode,
  LdDatabase,
  LdLightbulbBolt,
  LdDiploma,
  LdClipboardList,
  LdCase,
  LdCupStar,
  LdUsersGroupTwoRounded,
  LdAltArrowRight,
  LdNotebook,
  LdCalendar
} from "solar-icon-react/ld";

const ADMIN_SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin", icon: LdWidget }
    ]
  },
  {
    label: "DSA Tracker",
    items: [
      { label: "Practice Problems", href: "/admin/dsa/problems", icon: LdCode },
      { label: "Learn Categories", href: "/admin/dsa/categories", icon: LdCode }
    ]
  },
  {
    label: "SQL Tracker",
    items: [
      { label: "Practice Problems", href: "/admin/sql/problems", icon: LdDatabase },
      { label: "Learn Categories", href: "/admin/sql/categories", icon: LdDatabase }
    ]
  },
  {
    label: "Aptitude Tracker",
    items: [
      { label: "Learn Categories", href: "/admin/aptitude/categories", icon: LdLightbulbBolt }
    ]
  },
  {
    label: "Content",
    items: [
      { label: "Manage Courses", href: "/admin/courses", icon: LdDiploma },
      { label: "Manage Blogs", href: "/admin/blogs", icon: LdNotebook }
    ]
  },
  {
    label: "Management",
    items: [
      { label: "Allocate Courses", href: "/admin/course-allocation", icon: LdClipboardList },
      { label: "Institutions", href: "/admin/institutions", icon: LdCase },
      { label: "Contests", href: "/dashboard/contests", icon: LdCupStar },
      { label: "Users", href: "/admin/users", icon: LdUsersGroupTwoRounded }
    ]
  },
  {
    label: "Daily Challenge",
    items: [
      { label: "Manage Daily Challenge", href: "/admin/daily-challenge", icon: LdCalendar }
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Overview": true,
    "DSA Tracker": true,
    "SQL Tracker": true,
    "Aptitude Tracker": true,
    "Content": true,
    "Management": true,
    "Daily Challenge": true,
  });

  const toggleSection = (label: string) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);

  return (
    <div className="w-full h-full flex flex-col bg-transparent">
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2 space-y-5 custom-scrollbar">
        {ADMIN_SECTIONS.map((section, sIdx) => {
          const isOpen = openSections[section.label];
          return (
            <div key={sIdx} className="flex flex-col gap-1">
              {section.label && (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-2 py-1 transition-[opacity,max-height] duration-300 overflow-hidden group cursor-pointer mb-1"
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
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        tabIndex={isOpen ? undefined : -1}
                        className={[
                          "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group",
                          active
                            ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200",
                        ].join(" ")}
                      >
                        <Icon
                          className={[
                            "flex-shrink-0 w-[18px] h-[18px] transition-colors",
                            active
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                          ].join(" ")}
                        />
                        <span className="text-[13.5px] whitespace-nowrap overflow-hidden font-medium opacity-100">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
