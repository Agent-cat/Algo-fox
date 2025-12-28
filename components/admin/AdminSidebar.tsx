"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Code, Settings } from "lucide-react";

const menuItems = [
  {
    name: "Practice Problems",
    href: "/admin/problems",
    icon: Code,
  },
  {
    name: "Learn Categories",
    href: "/admin/categories",
    icon: BookOpen,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 pt-24">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${isActive
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

