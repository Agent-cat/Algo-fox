"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, LayoutGrid, MoveLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        name: "Basic Info",
        href: "/dashboard/settings/basic-info",
        icon: User
    },
    {
        name: "Platform",
        href: "/dashboard/settings/platform",
        icon: LayoutGrid
    }
];

export function SettingsSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8">
            <div>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                >
                    <MoveLeft className="w-4 h-4" />
                    Back to Profile
                </Link>
            </div>

            <nav className="space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-gray-100 dark:bg-[#1a1a1a] text-gray-900 dark:text-gray-100"
                                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]/50 hover:text-gray-900 dark:hover:text-gray-200"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5", isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
