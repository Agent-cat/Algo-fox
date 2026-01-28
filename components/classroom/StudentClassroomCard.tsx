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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="group h-full"
        >
            <Link
                href={`/dashboard/classrooms/${classroom.id}`}
                className="flex flex-col h-full bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/30 transition-all duration-300 relative overflow-hidden"
            >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-orange-500/10 transition-colors duration-500" />

                {/* Header */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300">
                        <BookOpen className="w-6 h-6" />
                    </div>
                    <div className="px-3 py-1 bg-gray-50 dark:bg-[#1a1a1a] text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest rounded-full border border-gray-100 dark:border-[#262626]">
                        Active
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {classroom.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-6">
                        {classroom.subject || "General"}
                    </p>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#262626]">
                        <div className="w-8 h-8 rounded-full bg-white dark:bg-[#262626] flex items-center justify-center text-xs font-bold text-orange-600 border border-gray-100 dark:border-[#333]">
                            {classroom.teacher.name?.charAt(0).toUpperCase() || "T"}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mentor</span>
                            <span className="text-xs font-semibold text-gray-900 dark:text-gray-200 line-clamp-1">
                                {classroom.teacher.name || "Unknown Teacher"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-gray-100 dark:border-[#262626] flex items-center justify-between relative z-10">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Students</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {classroom._count?.students || 0} enrolled
                        </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
