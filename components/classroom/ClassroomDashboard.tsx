"use client";

import { useState } from "react";
import { ClassroomSidebar } from "./ClassroomSidebar";
import { ClassroomLeaderboard } from "./ClassroomLeaderboard";
import { LiveTracking } from "./LiveTracking";
import { AssignmentsTab } from "./assignments/AssignmentsTab";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

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
    const isTeacher = classroom.teacher.id === currentUserId;

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
        <div className={`min-h-screen ${isTeacher ? 'pl-0 md:pl-72' : ''}`}>
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

            <div className={`bg-gray-50/30 dark:bg-[#0a0a0a] min-h-screen ${isTeacher ? '' : 'max-w-7xl mx-auto px-6'}`}>
                 {/* Header Section */}
                 <div className={`pt-24 pb-8 border-b border-gray-100 dark:border-[#262626] ${isTeacher ? 'px-8 md:px-12' : ''}`}>
                     <div className={isTeacher ? "" : "max-w-7xl mx-auto"}>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                            <Link href="/dashboard/classrooms" className="hover:text-orange-600 dark:hover:text-orange-500">Classrooms</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-gray-900 dark:text-white">{classroom.name}</span>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                                    {classroom.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Instructor</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-200 flex items-center gap-2">
                                            <div className="w-5 h-5 bg-orange-100 dark:bg-orange-500/10 rounded text-[10px] flex items-center justify-center text-orange-600 dark:text-orange-500">
                                                {classroom.teacher.name?.charAt(0).toUpperCase()}
                                            </div>
                                            {classroom.teacher.name}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Subject</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-200">{classroom.subject || "Logic & Coding"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Section</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-gray-200">{classroom.section || "General"}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Join Code</span>
                                        <span className="text-sm font-mono font-black text-orange-600 tracking-wider">{classroom.joinCode}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Link
                                    href="/problems"
                                    className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest hover:bg-orange-600 dark:hover:bg-gray-200 transition-all shadow-xl shadow-gray-200 dark:shadow-none"
                                >
                                    Solve Problems
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={`py-12 ${isTeacher ? 'px-8 md:px-12' : ''}`}>
                <AnimatePresence mode="wait">
                        {activeTab === 'leaderboard' && (
                            <motion.div
                                key="leaderboard"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className={`bg-white dark:bg-[#141414] rounded-2xl ${
                                    isTeacher ? "border-2 border-orange-50 dark:border-[#262626]" : "border border-gray-100 dark:border-[#262626] shadow-xl dark:shadow-none"
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <AssignmentsTab classroomId={classroom.id} isTeacher={isTeacher} />
                            </motion.div>
                        )}
                        {activeTab === 'tracking' && (
                            <motion.div
                                key="tracking"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
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
