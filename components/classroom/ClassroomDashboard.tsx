"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ClassroomSidebar } from "./ClassroomSidebar";
import { ClassroomLeaderboard } from "./ClassroomLeaderboard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const LiveTracking = dynamic(() => import("./LiveTracking").then(mod => mod.LiveTracking), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl" /></div>,
    ssr: false
});

const AssignmentsTab = dynamic(() => import("./assignments/AssignmentsTab").then(mod => mod.AssignmentsTab), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl" /></div>
});

interface Student {
    id: string;
    name: string | null;
    totalScore: number;
    image: string | null;
}

interface ClassroomDashboardProps {
    classroom: {
        id: string;
        name: string;
        subject?: string | null;
        section?: string | null;
        joinCode: string;
        students: Student[];
        teacher: {
            id: string;
            name: string | null;
        };
    };
    currentUserId: string;
}

export function ClassroomDashboard({ classroom, currentUserId }: ClassroomDashboardProps) {
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'tracking' | 'assignments'>('leaderboard');
    const [isCopied, setIsCopied] = useState(false);
    const isTeacher = classroom.teacher.id === currentUserId;

    const handleCopyLink = () => {
        const url = `${window.location.origin}/join-classroom/${classroom.joinCode}`;
        navigator.clipboard.writeText(url);
        setIsCopied(true);
        toast.success("Invitation link copied to clipboard");
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        const headers = ["Rank", "Student ID", "Name", "Total Score"];
        const rows = classroom.students.map((s, i) => [
            i + 1,
            s.id,
            s.name || "Anonymous",
            s.totalScore
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${classroom.name.replace(/\s+/g, '_')}_leaderboard.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className={`min-h-screen bg-[#fafafa] dark:bg-[#121212] ${isTeacher ? 'pl-0 md:pl-72' : ''}`}>
             {isTeacher && (
                <ClassroomSidebar
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onDownload={handleDownload}
                    showDownload={activeTab === 'leaderboard'}
                    isTeacher={isTeacher}
                    classroomName={classroom.name}
                />
            )}

             <div className="w-full">
                  {/* Header Section */}
                  <div className={`pt-16 pb-6 border-b border-gray-200/50 dark:border-[#262626] bg-white/40 dark:bg-black/20 backdrop-blur-md sticky top-0 z-30 ${isTeacher ? 'px-8 md:px-12' : ''}`}>
                      <div className="px-8 md:px-12">
                         <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                             <Link href="/dashboard/classrooms" className="hover:text-orange-600 dark:hover:text-orange-500 transition-colors">Hub</Link>
                             <ChevronRight className="w-3 h-3" />
                             <span className="text-gray-900 dark:text-white">{classroom.name}</span>
                         </div>

                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                             <div className="flex-1">
                                 <h1 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tightest mb-4">
                                     {classroom.name}
                                 </h1>
                                 <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                                     <div className="flex items-center gap-3">
                                         <div className="flex flex-col">
                                             <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">Instructor</span>
                                             <span className="text-xs font-bold text-gray-950 dark:text-gray-200 flex items-center gap-2">
                                                 <div className="w-5 h-5 bg-orange-100 dark:bg-orange-500/10 rounded-md text-[9px] flex items-center justify-center text-orange-600 dark:text-orange-500 font-black">
                                                     {classroom.teacher.name?.charAt(0).toUpperCase()}
                                                 </div>
                                                 {classroom.teacher.name}
                                             </span>
                                         </div>
                                     </div>
                                     <div className="h-6 w-px bg-gray-200 dark:bg-[#262626] hidden md:block"></div>
                                     <div className="flex flex-col">
                                         <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">Domain</span>
                                         <span className="text-xs font-bold text-gray-950 dark:text-gray-200">{classroom.subject || "Logic & Coding"}</span>
                                     </div>
                                     <div className="h-6 w-px bg-gray-200 dark:bg-[#262626] hidden md:block"></div>
                                     <div className="flex flex-col">
                                         <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">Section</span>
                                         <span className="text-xs font-bold text-gray-950 dark:text-gray-200">{classroom.section || "General"}</span>
                                     </div>
                                     {isTeacher && (
                                         <>
                                             <div className="h-6 w-px bg-gray-200 dark:bg-[#262626] hidden md:block"></div>
                                             <div className="flex flex-col">
                                                 <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">Portal</span>
                                                 <button
                                                     onClick={handleCopyLink}
                                                     className="flex items-center gap-2 group bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 px-2 py-1 rounded-lg hover:border-orange-200 dark:hover:border-orange-900/50 transition-all"
                                                 >
                                                     <span className="text-[10px] font-mono font-black text-orange-600 tracking-widest">
                                                         {classroom.joinCode}
                                                     </span>
                                                     <div className="text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform">
                                                         {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                     </div>
                                                 </button>
                                             </div>
                                         </>
                                     )}
                                 </div>
                             </div>

                             <div className="flex items-center gap-3">
                                 <Link
                                     href="/problems"
                                     className="h-10 px-5 bg-gray-950 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-gray-200 transition-all flex items-center justify-center rounded-xl shadow-lg shadow-gray-200/50 dark:shadow-none"
                                 >
                                     Launch Problems
                                 </Link>
                             </div>
                         </div>
                      </div>
                  </div>

                 {/* Content Section */}
                  <div className="w-full">
                <AnimatePresence mode="wait">
                        {activeTab === 'leaderboard' && (
                            <motion.div
                                key="leaderboard"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className={`bg-white dark:bg-[#141414] rounded-none overflow-hidden w-full ${
                                    isTeacher ? "border border-gray-200 dark:border-[#262626] shadow-xl shadow-gray-100/50 dark:shadow-none" : "border border-gray-200 dark:border-[#262626] shadow-2xl shadow-gray-200/20 dark:shadow-none"
                                }`}
                            >
                                <ClassroomLeaderboard
                                    students={classroom.students}
                                    isTeacher={isTeacher}
                                    classroomId={classroom.id}
                                />
                            </motion.div>
                        )}
                        {activeTab === 'assignments' && (
                            <motion.div
                                key="assignments"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <AssignmentsTab classroomId={classroom.id} isTeacher={isTeacher} />
                            </motion.div>
                        )}
                        {activeTab === 'tracking' && (
                            <motion.div
                                key="tracking"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <LiveTracking classroomId={classroom.id} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
