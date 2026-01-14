"use client";

import { useState } from "react";
import { ClassroomSidebar } from "./ClassroomSidebar";
import { ClassroomLeaderboard } from "./ClassroomLeaderboard";
import { LiveTracking } from "./LiveTracking";
import { motion, AnimatePresence } from "framer-motion";

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
        students: Student[];
        teacher: {
            id: string;
            name: string | null;
        };
    };
    currentUserId: string;
}

export function ClassroomDashboard({ classroom, currentUserId }: ClassroomDashboardProps) {
    const [activeTab, setActiveTab] = useState<'leaderboard' | 'tracking'>('leaderboard');
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
        <div className="flex flex-col md:flex-row min-h-[850px] bg-white dark:bg-[#141414] border-2 border-orange-50 dark:border-[#262626] shadow-2xl shadow-orange-950/5 dark:shadow-none overflow-hidden">
            {/* Minimal Sidebar */}
            <ClassroomSidebar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onDownload={handleDownload}
                showDownload={activeTab === 'leaderboard'}
                isTeacher={isTeacher}
                classroomName={classroom.name}
            />

            {/* Viewport - Minimal Workspace */}
            <div className="flex-1 overflow-auto bg-gray-50/30 dark:bg-[#0a0a0a] p-0 md:p-12 lg:p-16">
                <AnimatePresence mode="wait">
                    {activeTab === 'leaderboard' ? (
                        <motion.div
                            key="leaderboard"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-white dark:bg-[#141414] border-2 border-orange-50 dark:border-[#262626] shadow-sm dark:shadow-none min-h-full"
                        >
                            <ClassroomLeaderboard students={classroom.students} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="tracking"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="min-h-full"
                        >
                            <LiveTracking classroomId={classroom.id} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
