"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Code, Database, ChevronRight } from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
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
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 pt-24">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          if (item.children) {
            const isExpanded = expandedSections.includes(item.name);
            const hasActiveChild = item.children.some(
              (child) => pathname === child.href || pathname?.startsWith(child.href + "/")
            );

            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleSection(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                    hasActiveChild
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isActive =
                        pathname === child.href || pathname?.startsWith(child.href + "/");
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-orange-50 text-orange-600 font-medium"
                              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current opacity-50" />
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          const Icon = item.icon;
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-gray-100 text-gray-900 font-medium"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}


