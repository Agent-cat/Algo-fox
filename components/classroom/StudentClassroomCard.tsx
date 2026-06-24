"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Users } from "lucide-react";

interface StudentClassroomCardProps {
    classroom: {
        id: string;
        name: string;
        subject: string | null;
        joinCode: string;
        teacher: {
            name: string | null;
        };
        _count?: {
            students: number;
        };
    };
    index: number;
}

export function StudentClassroomCard({ classroom, index }: StudentClassroomCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="group h-full"
        >
            <Link
                href={`/dashboard/classrooms/${classroom.id}`}
                className="flex flex-col h-full bg-transparent border border-gray-200 dark:border-white/10 rounded-xl p-5 shadow-sm hover:shadow-md hover:bg-gray-50/50 dark:hover:bg-[#111]/50 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 group relative overflow-hidden"
            >
                {/* Protocol Header */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-10 h-10 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-gray-500 mb-1.5">Status</span>
                        <div className="px-2.5 py-1 bg-white dark:bg-black/40 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm">
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 leading-none">Active</span>
                        </div>
                    </div>
                </div>

                {/* Content Matrix */}
                <div className="flex-1 relative z-10">
                    <div className="mb-2">
                         <span className="text-sm font-semibold text-orange-600 mb-1 block">
                            {classroom.subject || "Classroom"}
                         </span>
                         <h3 className="text-xl font-bold text-gray-900 dark:text-white transition-colors line-clamp-2 leading-tight">
                            {classroom.name}
                        </h3>
                    </div>

                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-8">
                        ID: {classroom.id.slice(-8).toUpperCase()}
                    </p>

                    <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 dark:bg-[#1A1A1A] rounded-lg border border-gray-200 dark:border-white/10 transition-all">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-[#222] flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm">
                            {classroom.teacher.name?.charAt(0).toUpperCase() || "T"}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-xs font-medium text-gray-500 mb-0.5">Teacher</span>
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-200 line-clamp-1 truncate">
                                {classroom.teacher.name || "Instructor"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Analytics */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between relative z-10 text-sm font-medium">
                    <div className="flex flex-col">
                        <span className="text-gray-500 mb-1 text-xs">Students</span>
                        <span className="text-gray-900 dark:text-white font-semibold tabular-nums">
                            {classroom._count?.students || 0}
                        </span>
                    </div>

                    <div className="h-8 px-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg flex items-center gap-2 transition-all shadow-sm active:scale-95">
                        Open
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
