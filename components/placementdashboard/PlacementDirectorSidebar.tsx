"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        id: "home",
        name: "Home",
        href: "/placementdashboard",
        icon: Home,
    },
    {
        id: "placement-drive",
        name: "Placement Drive",
        href: "/placementdashboard/placement-drive",
        icon: Briefcase,
    },
    {
        id: "students",
        name: "Students",
        href: "/placementdashboard/students",
        icon: Users,
    },
];

export function PlacementDirectorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-[100px] flex-shrink-0 flex flex-col bg-white dark:bg-[#1D1E23] h-full py-6 z-10 border-r border-gray-200 dark:border-[#262626]">
            <nav className="flex flex-col gap-6 w-full">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/placementdashboard");

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center group w-full cursor-pointer"
                        >
                            {/* Active pill indicator */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-orange-600 rounded-r-full" />
                            )}
                            
                            <div className={cn(
                                "flex flex-col items-center justify-center gap-1.5 transition-colors duration-200",
                                isActive 
                                    ? "text-orange-600 dark:text-orange-500" 
                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                            )}>
                                <item.icon className={cn(
                                    "w-6 h-6",
                                    isActive ? "stroke-[2px]" : "stroke-[1.5px]"
                                )} />
                                <span className="text-[11px] font-medium text-center px-1 leading-tight">
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
