"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    {
        id: "job-profiles",
        name: "Job Profiles",
        href: "/placements/job-profiles",
        icon: Briefcase,
    },
];

export function PlacementsSidebar() {
    // We will hardcode the active route to /placements/my-profile for the visual effect if pathname doesn't match one of our routes yet.
    const pathname = usePathname();

    return (
        <aside className="w-[100px] flex-shrink-0 flex flex-col bg-white dark:bg-[#1D1E23] h-full py-6 z-10 border-r border-gray-200 dark:border-[#262626]">
            <nav className="flex flex-col gap-6 w-full">
                {navItems.map((item) => {
                    // For demo purposes, fallback to My Profile if none matches exactly
                    const isActive = pathname.startsWith(item.href) || (pathname === "/placements" && item.id === "my-profile");

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
