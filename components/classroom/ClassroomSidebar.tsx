import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    LdCupStar, 
    LdClipboardList, 
    LdWidget, 
    LdDiploma, 
    LdDatabase,
    LdAltArrowRight
} from "solar-icon-react/ld";
import { Info, Copy, Check } from "lucide-react";

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
    
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        "Classroom Hub": true,
        "Monitoring": true,
        "Data Management": true
    });

    const toggleSection = (label: string) => {
        setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const sections: {
        label: string;
        items: {
            id: string;
            label: string;
            icon: any;
            onClick?: () => void;
        }[]
    }[] = [
        {
            label: "Classroom Hub",
            items: [
                { id: 'leaderboard', label: 'Leaderboard', icon: LdCupStar },
                { id: 'assignments', label: 'Assignments', icon: LdClipboardList },
            ]
        },
        ...(isTeacher ? [{
            label: "Monitoring",
            items: [
                { id: 'tracking', label: 'Live Tracking', icon: LdWidget },
                { id: 'performance', label: 'Performance Reports', icon: LdDiploma }
            ]
        }] : []),
        ...(showDownload ? [{
            label: "Data Management",
            items: [
                { id: 'download', label: 'Leaderboard Export', icon: LdDatabase, onClick: onDownload },
                { id: 'progress-download', label: 'Detailed Progress', icon: LdDatabase, onClick: onProgressDownload }
            ]
        }] : [])
    ];

    return (
        <div className="w-full h-full flex flex-col bg-transparent">
            <div className="px-5 pt-6 pb-2 mb-2">
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
                            <div className="mt-4 space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
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

            <nav className="flex-1 overflow-y-auto overflow-x-hidden py-2 px-2 space-y-5 custom-scrollbar">
                {sections.map((section, sIdx) => {
                    const isOpen = openSections[section.label];
                    return (
                        <div key={sIdx} className="flex flex-col gap-1">
                            {section.label && (
                                <button
                                    onClick={() => toggleSection(section.label)}
                                    className="w-full flex items-center justify-between px-2 py-1 transition-[opacity,max-height] duration-300 overflow-hidden group cursor-pointer mb-1"
                                >
                                    <span className="text-[12.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide transition-colors ml-1">
                                        {section.label}
                                    </span>
                                    <LdAltArrowRight
                                        className={[
                                            "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                                            isOpen ? "rotate-90" : "",
                                        ].join(" ")}
                                    />
                                </button>
                            )}

                            <div
                                className={[
                                    "grid transition-all duration-300 ease-in-out",
                                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                ].join(" ")}
                            >
                                <div className="overflow-hidden flex flex-col space-y-[2px]">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        const active = activeTab === item.id;
                                        
                                        return (
                                            <button
                                                key={item.id}
                                                tabIndex={isOpen ? undefined : -1}
                                                onClick={item.onClick ? item.onClick : () => onTabChange(item.id as any)}
                                                className={[
                                                    "w-full relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group text-left",
                                                    active && !item.onClick
                                                        ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
                                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200",
                                                ].join(" ")}
                                            >
                                                <Icon
                                                    className={[
                                                        "flex-shrink-0 w-[18px] h-[18px] transition-colors",
                                                        active && !item.onClick
                                                            ? "text-gray-900 dark:text-white"
                                                            : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                                                    ].join(" ")}
                                                />
                                                <span className="text-[13.5px] whitespace-nowrap overflow-hidden font-medium opacity-100">
                                                    {item.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </nav>
        </div>
    );
}
