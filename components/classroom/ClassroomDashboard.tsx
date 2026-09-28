"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ClassroomSidebar } from "./ClassroomSidebar";
import { ClassroomLeaderboard } from "./ClassroomLeaderboard";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Copy, Check, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import DownloadProgressModal from "@/components/problems/DownloadProgressModal";

const LiveTracking = dynamic(() => import("./LiveTracking").then(mod => mod.LiveTracking), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1D1E23] rounded-2xl" /></div>,
    ssr: false
});

const AssignmentsTab = dynamic(() => import("./assignments/AssignmentsTab").then(mod => mod.AssignmentsTab), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1D1E23] rounded-2xl" /></div>
});

const ContestPerformance = dynamic(() => import("./ContestPerformance").then(mod => mod.ContestPerformance), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1D1E23] rounded-2xl" /></div>
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

const AnalyticsDashboard = dynamic(() => import("./analytics/AnalyticsDashboard").then(mod => mod.AnalyticsDashboard), {
    loading: () => <div className="p-8"><div className="h-64 animate-pulse bg-gray-100 dark:bg-[#1D1E23] rounded-2xl" /></div>,
    ssr: false
});

export function ClassroomDashboard({ classroom, currentUserId }: ClassroomDashboardProps) {
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'tracking' | 'assignments' | 'performance' | 'analytics'>('leaderboard');
    const [isCopied, setIsCopied] = useState(false);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = authClient.useSession();
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
        const cleanName = classroom.name.toLowerCase().replace(/\s+/g, '-');
        link.setAttribute("download", `algofox-${cleanName}-leaderboard.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex min-h-[calc(100vh-4rem)] bg-[#fafafa] dark:bg-[#1D1E23]">
             {/* Mobile sidebar toggle */}
             {isTeacher && (
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden fixed bottom-20 left-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg hover:scale-105 transition-transform"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
             )}

             {/* Mobile backdrop */}
             {isTeacher && sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
             )}

             {isTeacher && (
                <aside className={[
                    "w-64 shrink-0 border-r border-gray-200 dark:border-white/10 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar bg-[#fafafa] dark:bg-[#1D1E23]",
                    "fixed lg:relative z-[56] -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out",
                    sidebarOpen ? "!translate-x-0" : "",
                ].join(" ")}>
                    <ClassroomSidebar
                        activeTab={activeTab}
                        onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
                        onDownload={handleDownload}
                        onProgressDownload={() => setIsProgressModalOpen(true)}
                        showDownload={activeTab === 'leaderboard'}
                        isTeacher={isTeacher}
                        classroomName={classroom.name}
                        classroomId={classroom.id}
                        classroomDetails={{
                            instructor: classroom.teacher.name || "Anonymous",
                            domain: classroom.subject || "Logic & Coding",
                            section: classroom.section || "General",
                            joinCode: classroom.joinCode
                        }}
                        onCopyLink={handleCopyLink}
                        isCopied={isCopied}
                    />
                </aside>
            )}

             <main className="flex-1 min-w-0 h-[calc(100vh-4rem)] overflow-hidden">
                <AnimatePresence mode="wait">
                        {activeTab === 'leaderboard' && (
                            <motion.div
                                key="leaderboard"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full h-full overflow-y-auto"
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
                                className="w-full h-full overflow-y-auto"
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
                                className="w-full h-full overflow-y-auto"
                            >
                                <ContestPerformance classroomId={classroom.id} />
                            </motion.div>
                        )}
                        {activeTab === 'analytics' && (
                            <motion.div
                                key="analytics"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full h-full overflow-y-auto p-6"
                            >
                                <AnalyticsDashboard classroomId={classroom.id} />
                            </motion.div>
                        )}
                        {activeTab === 'tracking' && (
                            <motion.div
                                key="tracking"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full h-full overflow-y-auto"
                            >
                                <LiveTracking classroomId={classroom.id} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {isProgressModalOpen && (
                    <DownloadProgressModal
                        isOpen={isProgressModalOpen}
                        onClose={() => setIsProgressModalOpen(false)}
                        categoryTitle="All Progress"
                        userRole={session?.user?.role || "TEACHER"}
                        domain={(classroom.subject as any) || "DSA"}
                    />
                )}
            </div>
    );
}
