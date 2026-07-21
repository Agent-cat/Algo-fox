"use client";

import Link from "next/link";
import {
  LdUserRounded,
  LdWidget,
  LdAltArrowLeft,
  LdDiploma,
  LdCase,
  LdCode,
  LdFolder,
  LdMedalStar,
  LdAltArrowRight,
  LdFileText
} from "solar-icon-react/ld";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

const navGroups = [
    {
        label: "",
        items: [
            { name: "Back to Students", tab: "back", href: "/placementdashboard/students", icon: LdAltArrowLeft }
        ]
    },
    {
        label: "Profile Info",
        items: [
            { name: "Basic Info", tab: "basic-info", icon: LdUserRounded },
            { name: "Education Details", tab: "education", icon: LdDiploma },
            { name: "Platform", tab: "platform", icon: LdWidget },
        ]
    },
    {
        label: "Experience",
        items: [
            { name: "Internships & Work", tab: "experience", icon: LdCase },
            { name: "Skills & Languages", tab: "skills", icon: LdCode },
            { name: "Projects", tab: "projects", icon: LdFolder },
        ]
    },
    {
        label: "Achievements",
        items: [
            {
                name: "Accomplishments",
                icon: LdMedalStar,
                basePath: "accomplishments",
                subItems: [
                    { name: "Awards", tab: "awards" },
                    { name: "Certificates", tab: "certificates" },
                    { name: "Patents", tab: "patents" },
                    { name: "Publications", tab: "publications" }
                ]
            }
        ]
    },
    {
        label: "Documents",
        items: [
            { name: "Resume", tab: "resume", icon: LdFileText }
        ]
    }
];

interface NavItem {
    name: string;
    tab?: string;
    href?: string;
    icon?: any;
    basePath?: string;
    subItems?: Array<{ name: string; tab: string }>;
}

interface StudentProfileSidebarProps {
    user: any;
    activeTab: string;
}

export function StudentProfileSidebar({ user, activeTab }: StudentProfileSidebarProps) {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
        const accomplishmentsTabs = ["awards", "certificates", "patents", "publications"];
        return {
            "Accomplishments": accomplishmentsTabs.includes(activeTab)
        };
    });

    const toggleGroup = (name: string) => {
        setExpandedGroups(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    return (
        <div className="w-full lg:w-[280px] flex-shrink-0 flex flex-col h-full bg-[#fafafa] dark:bg-[#1D1E23] custom-scrollbar">
            {/* User Profile Avatar Section */}
            <div className="px-3 mb-6 mt-6">
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 shadow-sm">
                      <div className="relative group flex-shrink-0">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white dark:border-[#262626] shadow-sm bg-orange-100 dark:bg-orange-900/20">
                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg font-bold text-orange-600 dark:text-orange-500">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                          </div>
                     </div>
                     <div className="flex flex-col min-w-0">
                          <h3 className="font-semibold text-[15px] text-gray-900 dark:text-gray-100 truncate">{user.name}</h3>
                          <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                     </div>
                 </div>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-6 px-1 pb-10">
                {navGroups.map((group, idx) => (
                    <div key={idx} className="flex flex-col">
                        {group.label && (
                            <div className="px-3 mb-2">
                                <span className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide">
                                    {group.label}
                                </span>
                            </div>
                        )}
                        
                        <div className="space-y-[2px]">
                            {(group.items as NavItem[]).map((item) => {
                                if (item.subItems) {
                                    const accomplishmentsTabs = ["awards", "certificates", "patents", "publications"];
                                    const isActiveBase = accomplishmentsTabs.includes(activeTab);
                                    const isExpanded = expandedGroups[item.name];
                                    
                                    return (
                                        <div key={item.name} className="flex flex-col">
                                            <button
                                                onClick={() => toggleGroup(item.name)}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors group",
                                                    (isActiveBase && !isExpanded)
                                                        ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                )}
                                            >
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    {item.icon && <item.icon className={cn("w-[18px] h-[18px]", isActiveBase && !isExpanded ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300")} />}
                                                    <span className="truncate">{item.name}</span>
                                                </div>
                                                <LdAltArrowRight className={cn("w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ml-2 shrink-0", isExpanded && "rotate-90")} />
                                            </button>
                                            
                                            <div
                                                className={cn(
                                                    "grid transition-all duration-300 ease-in-out",
                                                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                )}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="ml-[21px] mt-1 pl-[15px] border-l border-gray-200 dark:border-white/10 space-y-[2px] py-1">
                                                        {item.subItems.map((subItem) => {
                                                            const isSubActive = activeTab === subItem.tab;
                                                            return (
                                                                <Link
                                                                    key={subItem.tab}
                                                                    href={`/placementdashboard/students/${user.id}?tab=${subItem.tab}`}
                                                                    className={cn(
                                                                        "flex items-center gap-2 px-3 py-[7px] text-[13.5px] font-medium rounded-lg transition-colors relative",
                                                                        isSubActive
                                                                            ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                                    )}
                                                                >
                                                                    <span className="flex-1 truncate">{subItem.name}</span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (item.tab === "back" && item.href) {
                                    return (
                                        <Link
                                                                            key={item.href}
                                                                            href={item.href}
                                                                            className={cn(
                                                                                "flex items-center gap-3 px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors group text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                                                            )}
                                                                        >
                                            {item.icon && <item.icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />}
                                            <span className="flex-1 truncate">{item.name}</span>
                                        </Link>
                                    );
                                }

                                const isActive = activeTab === item.tab;
                                return (
                                    <Link
                                        key={item.tab}
                                        href={`/placementdashboard/students/${user.id}?tab=${item.tab}`}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 text-[14.5px] font-medium rounded-lg transition-colors group",
                                            isActive
                                                ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200"
                                        )}
                                    >
                                        {item.icon && <item.icon className={cn("w-[18px] h-[18px]", isActive ? "text-gray-900 dark:text-white" : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300")} />}
                                        <span className="flex-1 truncate">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
}
