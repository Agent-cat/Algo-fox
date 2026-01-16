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
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'assignments', label: 'Assignments', icon: LayoutDashboard }, // Using LayoutDashboard temporarily
        ...(isTeacher ? [{ id: 'tracking', label: 'Live Tracking', icon: Activity }] : [])
    ];

    return (
        <aside className="w-72 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white/80 dark:bg-[#141414]/90 backdrop-blur-xl border-r border-gray-200/50 dark:border-[#262626] shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
            <div className="px-6 mb-6">
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Classroom
                </p>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate" title={classroomName}>
                    {classroomName}
                </h3>
            </div>

            <nav className="px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id as any)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium mb-1 group transition-all ${
                                isActive
                                    ? "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] hover:text-gray-900 dark:hover:text-gray-200"
                            }`}
                        >
                            <div
                                className={`p-1.5 rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-white/20 text-white"
                                        : "bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 group-hover:bg-white dark:group-hover:bg-[#262626] group-hover:shadow-sm"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                            </div>
                            <span>{item.label}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ml-auto text-white/50" />}
                        </button>
                    );
                })}
            </nav>

            <div className="absolute bottom-8 left-0 right-0 px-4 space-y-2">
                {showDownload && (
                     <button
                        onClick={onDownload}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-xl text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#262626] hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export Data
                    </button>
                )}
            </div>

            {/* Decorative bg element */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#141414] to-transparent pointer-events-none -z-10" />
        </aside>
    );
}
