"use client";

import { Trophy, Activity, Download, LayoutDashboard, ChevronRight } from "lucide-react";

interface SidebarProps {
    activeTab: 'leaderboard' | 'tracking';
    onTabChange: (tab: 'leaderboard' | 'tracking') => void;
    onDownload: () => void;
    showDownload: boolean;
    isTeacher: boolean;
    classroomName: string;
}

export function ClassroomSidebar({ activeTab, onTabChange, onDownload, showDownload, isTeacher, classroomName }: SidebarProps) {
    const menuItems = [
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        ...(isTeacher ? [{ id: 'tracking', label: 'Live Tracking', icon: Activity }] : [])
    ];

    return (
        <div className="w-full md:w-80 bg-white border-r-2 border-orange-50 flex flex-col min-h-full">
            {/* Branding Header */}
            <div className="p-10 pb-6">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-100">
                        <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] leading-none mb-1.5">Hub Navigation</div>
                        <div className="text-sm font-black text-gray-900 uppercase tracking-tight truncate max-w-[140px]">{classroomName}</div>
                    </div>
                </div>

                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id as any)}
                            className={`w-full group flex items-center justify-between p-5 transition-all duration-200 border-l-4 ${
                                activeTab === item.id
                                    ? "bg-orange-50/50 text-orange-600 border-orange-600"
                                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-800 border-transparent"
                            }`}
                        >
                            <div className="flex items-center gap-5">
                                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-orange-600" : "text-gray-300 transition-colors group-hover:text-gray-500"}`} />
                                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                            </div>
                            {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-10 pt-6">
                {showDownload && (
                    <div className="p-8 bg-gray-50 border-2 border-gray-100 space-y-6">
                        <div className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em] text-center">Data Exports</div>
                        <button
                            onClick={onDownload}
                            className="w-full h-14 flex items-center justify-center gap-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all active:scale-[0.97]"
                        >
                            <Download className="w-4 h-4" />
                            Download CSV
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
