"use client";

import { Trophy, Activity, Download, LayoutDashboard, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
    activeTab: 'leaderboard' | 'tracking' | 'assignments';
    onTabChange: (tab: 'leaderboard' | 'tracking' | 'assignments') => void;
    onDownload: () => void;
    showDownload: boolean;
    isTeacher: boolean;
    classroomName: string;
}

export function ClassroomSidebar({ activeTab, onTabChange, onDownload, showDownload, isTeacher, classroomName }: SidebarProps) {
    const menuItems = [
        { type: 'header', label: 'Classroom Hub' },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, type: 'link' },
        { id: 'assignments', label: 'Assignments', icon: LayoutDashboard, type: 'link' },
        ...(isTeacher ? [
            { type: 'header', label: 'Monitoring' },
            { id: 'tracking', label: 'Live Tracking', icon: Activity, type: 'link' }
        ] : []),
        ...(showDownload ? [
            { type: 'header', label: 'Data Management' },
            { id: 'download', label: 'Sync Data Export', icon: Download, type: 'action' }
        ] : [])
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white dark:bg-[#141414] border-r border-gray-200 dark:border-[#262626] font-mono overflow-y-auto scrollbar-hide">
            <div className="px-6 mb-8">
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap mb-2 block">
                    Active Classroom
                </span>
                <h3 className="text-sm font-black text-gray-950 dark:text-white truncate tracking-tight" title={classroomName}>
                    {classroomName}
                </h3>
            </div>

            <nav className="px-5 space-y-1">
                {menuItems.map((item, index) => {
                    if (item.type === 'header') {
                        return (
                            <div key={`header-${index}`} className="flex items-center gap-3 mt-8 mb-4 px-2">
                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">
                                    {item.label}
                                </span>
                                <div className="h-px bg-gray-200 dark:bg-[#262626] flex-1"></div>
                            </div>
                        );
                    }

                    const isActive = activeTab === item.id;
                    const Icon = item.icon!;

                    if (item.type === 'action') {
                        return (
                            <button
                                key={`action-${index}`}
                                onClick={onDownload}
                                className="w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group"
                            >
                                <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                                <span className="tracking-tight">{item.label}</span>
                            </button>
                        );
                    }

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id as any)}
                            className={`
                                w-full flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group
                                ${isActive
                                    ? "text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-500/10"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                                }
                            `}
                        >
                            <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-orange-600 dark:text-orange-500" : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"}`} />
                            <span className="tracking-tight">{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
