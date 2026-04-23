import { Trophy, Activity, Download, LayoutDashboard, ChevronRight, Info, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
    activeTab: 'leaderboard' | 'tracking' | 'assignments' | 'performance';
    onTabChange: (tab: 'leaderboard' | 'tracking' | 'assignments' | 'performance') => void;
    onDownload: () => void;
    onProgressDownload?: () => void;
    showDownload: boolean;
    isTeacher: boolean;
    classroomName: string;
    classroomDetails?: {
        instructor: string;
        domain: string;
        section: string;
        joinCode: string;
    };
    onCopyLink?: () => void;
    isCopied?: boolean;
}

export function ClassroomSidebar({
    activeTab,
    onTabChange,
    onDownload,
    onProgressDownload,
    showDownload,
    isTeacher,
    classroomName,
    classroomDetails,
    onCopyLink,
    isCopied
}: SidebarProps) {
    const [showDetails, setShowDetails] = useState(false);

    const menuItems = [
        { type: 'header', label: 'Classroom Hub' },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, type: 'link' },
        { id: 'assignments', label: 'Assignments', icon: LayoutDashboard, type: 'link' },
        ...(isTeacher ? [
            { type: 'header', label: 'Monitoring' },
            { id: 'tracking', label: 'Live Tracking', icon: Activity, type: 'link' },
            { id: 'performance', label: 'Performance Reports', icon: LayoutDashboard, type: 'link' }
        ] : []),
        ...(showDownload ? [
            { type: 'header', label: 'Data Management' },
            { id: 'download', label: 'Leaderboard Export', icon: Download, type: 'action' },
            { id: 'progress-download', label: 'Detailed Progress', icon: Trophy, type: 'progress-action' }
        ] : [])
    ];

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 pt-24 pb-8 z-40 bg-white dark:bg-[#111] border-r border-gray-200 dark:border-[#262626] font-mono overflow-y-auto scrollbar-hide">
            <div className="px-6 mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest whitespace-nowrap">
                        Active Classroom
                    </span>
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className={`text-[9px] font-black uppercase tracking-widest transition-colors flex items-center gap-1 ${showDetails ? 'text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <Info className="w-2.5 h-2.5" />
                        {showDetails ? 'Hide' : 'View'}
                    </button>
                </div>
                <h3 className="text-sm font-black text-gray-950 dark:text-white truncate tracking-tight" title={classroomName}>
                    {classroomName}
                </h3>

                <AnimatePresence>
                    {showDetails && classroomDetails && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="mt-6 space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Instructor</span>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-orange-100 dark:bg-orange-500/10 rounded-md text-[9px] flex items-center justify-center text-orange-600 dark:text-orange-500 font-black">
                                            {classroomDetails.instructor.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{classroomDetails.instructor}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Domain & Section</span>
                                    <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">
                                        {classroomDetails.domain} • {classroomDetails.section}
                                    </span>
                                </div>

                                {isTeacher && classroomDetails.joinCode && (
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1.5">Portal Code</span>
                                        <button
                                            onClick={onCopyLink}
                                            className="flex items-center justify-between group bg-gray-50 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 px-2 py-1.5 rounded-lg hover:border-orange-500/30 transition-all"
                                        >
                                            <span className="text-[10px] font-mono font-black text-orange-600 tracking-widest uppercase">
                                                {classroomDetails.joinCode}
                                            </span>
                                            <div className="text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform">
                                                {isCopied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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

                    if (item.type === 'progress-action') {
                        return (
                            <button
                                key={`progress-action-${index}`}
                                onClick={onProgressDownload}
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
