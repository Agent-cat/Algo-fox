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

const ContestPerformance = dynamic(() => import("./ContestPerformance").then(mod => mod.ContestPerformance), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl" /></div>
});

interface Student {
    id: string;
    name: string | null;
    collegeId: string | null;
    collegeName: string | null;
    branch: string | null;
    totalScore: number;
    image: string | null;
    problemsSolved?: number;
    year?: number | null;
    _count?: {
        submissions: number;
        contestParticipations: number;
    };
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
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'tracking' | 'assignments' | 'performance'>('leaderboard');
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
            const headers = ["Rank", "College Name", "College ID / Roll No", "Branch", "Name", "Year", "Total Score"];
            const rows = classroom.students.map((s, i) => [
            i + 1,
            s.collegeName || "N/A",
            s.collegeId || "N/A",
            s.branch || "N/A",
            s.name || "Anonymous",
            s.year ? `${s.year}${s.year === 1 ? 'st' : s.year === 2 ? 'nd' : s.year === 3 ? 'rd' : 'th'} Year` : "N/A",
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
                    classroomDetails={{
                        instructor: classroom.teacher.name || "Anonymous",
                        domain: classroom.subject || "Logic & Coding",
                        section: classroom.section || "General",
                        joinCode: classroom.joinCode
                    }}
                    onCopyLink={handleCopyLink}
                    isCopied={isCopied}
                />
            )}

             <div className="w-full h-[calc(100vh-64px)] overflow-hidden">
                <AnimatePresence mode="wait">
                        {activeTab === 'leaderboard' && (
                            <motion.div
                                key="leaderboard"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full h-full"
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
                        {activeTab === 'performance' && (
                            <motion.div
                                key="performance"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full h-full"
                            >
                                <ContestPerformance classroomId={classroom.id} />
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
    );
}
