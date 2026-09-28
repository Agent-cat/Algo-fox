import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LdCupStar,
    LdClipboardList,
    LdWidget,
    LdDiploma,
    LdChart,
    LdDatabase,
    LdAltArrowRight
} from "solar-icon-react/ld";
import { Info, Copy, Check, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@algofox/ui";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@algofox/ui";
import { Button } from "@algofox/ui";
import { toast } from "sonner";
import { deleteClassroom } from "@/actions/classroom";

interface SidebarProps {
    activeTab: 'leaderboard' | 'tracking' | 'assignments' | 'performance' | 'analytics';
    onTabChange: (tab: 'leaderboard' | 'tracking' | 'assignments' | 'performance' | 'analytics') => void;
    onDownload: () => void;
    onProgressDownload?: () => void;
    showDownload: boolean;
    isTeacher: boolean;
    classroomName: string;
    classroomId?: string;
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
    classroomId,
    classroomDetails,
    onCopyLink,
    isCopied
}: SidebarProps) {
    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDeleteClassroom = async () => {
        if (!classroomId) {
            toast.error("Classroom ID missing");
            return;
        }
        setIsDeleting(true);
        try {
            const res = await deleteClassroom(classroomId);
            if (!res.success) {
                toast.error(res.error || "Failed to delete classroom");
                return;
            }
            toast.success(`"${classroomName}" deleted successfully`);
            setShowDeleteDialog(false);
            router.push("/dashboard/teacher/classrooms");
            router.refresh();
        } catch (err: any) {
            toast.error(err?.message || "Failed to delete classroom");
        } finally {
            setIsDeleting(false);
        }
    };
    
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
            description: string;
            onClick?: () => void;
        }[]
    }[] = [
        {
            label: "Classroom Hub",
            items: [
                { id: 'leaderboard', label: 'Leaderboard', icon: LdCupStar, description: 'View student rankings sorted by total points and track individual progress.' },
                { id: 'assignments', label: 'Assignments', icon: LdClipboardList, description: 'View and manage all classroom assignments with due dates and submission status.' },
            ]
        },
        ...(isTeacher ? [{
            label: "Monitoring",
            items: [
                { id: 'tracking', label: 'Live Tracking', icon: LdWidget, description: 'Monitor real-time student activity, submission status, and acceptance rates.' },
                { id: 'analytics', label: 'Analytics', icon: LdChart, description: 'Deep analytics on tag mastery, risk scores, assignments, and contests.' },
                { id: 'performance', label: 'Performance Reports', icon: LdDiploma, description: 'Analyze contest performance across all students and export detailed reports.' }
            ]
        }] : []),
        ...(showDownload ? [{
            label: "Data Management",
            items: [
                { id: 'download', label: 'Leaderboard Export', icon: LdDatabase, description: 'Export student rankings and scores as a CSV file.', onClick: onDownload },
                { id: 'progress-download', label: 'Detailed Progress', icon: LdDatabase, description: 'Download a detailed progress report with individual student data.', onClick: onProgressDownload }
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
                <h3 className="text-[15px] font-black text-gray-950 dark:text-white truncate tracking-tight" title={classroomName}>
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

                                {/* Delete Classroom — only for teacher, inside View details */}
                                {isTeacher && classroomId && (
                                    <div className="pt-4 mt-2 border-t border-red-100 dark:border-red-900/20">
                                        <span className="text-[8px] font-black text-red-400 uppercase tracking-[0.2em] mb-2 block">Danger Zone</span>
                                        <button
                                            onClick={() => setShowDeleteDialog(true)}
                                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-[11px] font-bold uppercase tracking-wide hover:bg-red-100 dark:hover:bg-red-500/20 hover:border-red-300 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Delete Classroom
                                        </button>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5 leading-relaxed">
                                            Permanently deletes the classroom and all linked assignments, contests and enrollments.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Delete Confirmation Dialog */}
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogHeader>
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div className="flex-1 text-left">
                                <DialogTitle className="text-[15px] font-black text-gray-900 dark:text-white">Delete Classroom?</DialogTitle>
                                <DialogDescription className="text-[13px] text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                                    You are about to permanently delete <span className="font-bold text-gray-900 dark:text-white">“{classroomName}”</span>. This will remove all assignments, contests, quiz links and student enrollments for this classroom. This action cannot be undone.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>
                    <p className="text-[11px] font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg px-3 py-2 mt-1">
                        Type confirmation is not required — clicking Delete will immediately remove the classroom.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="ghost"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isDeleting}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteClassroom}
                            disabled={isDeleting}
                            className="rounded-xl bg-red-600 hover:bg-red-700 text-white min-w-[110px]"
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4" />
                                    Delete Classroom
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </Dialog>
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
                                    <span className="text-[13.5px] font-medium text-gray-500 dark:text-gray-400 tracking-wide transition-colors ml-1">
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
                                            <TooltipProvider key={item.id} delayDuration={300}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
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
                                                            <span className="text-[14.5px] whitespace-nowrap overflow-hidden font-medium opacity-100">
                                                                {item.label}
                                                            </span>
                                                        </button>
                                                    </TooltipTrigger>
                                                    <TooltipContent side="right" className="bg-gray-900 dark:bg-white/90 text-white dark:text-gray-900 max-w-[200px] text-[11px] font-medium">
                                                        {item.description}
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
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
