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
                className="flex flex-col h-full bg-[#fafafa] dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-none hover:border-orange-500/50 transition-all duration-500 group relative overflow-hidden"
            >
                {/* Protocol Header */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 flex items-center justify-center text-orange-600 dark:text-orange-500 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Node Status</span>
                        <div className="px-2.5 py-1 bg-white dark:bg-black/40 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">Established</span>
                        </div>
                    </div>
                </div>

                {/* Content Matrix */}
                <div className="flex-1 relative z-10">
                    <div className="mb-2">
                         <span className="text-[8px] font-black text-orange-600 uppercase tracking-[0.2em] mb-1.5 block">
                            {classroom.subject || "Logic Protocol"}
                         </span>
                         <h3 className="text-xl font-black text-gray-950 dark:text-white group-hover:text-orange-600 transition-colors tracking-tightest uppercase line-clamp-2 leading-none">
                            {classroom.name}
                        </h3>
                    </div>

                    <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">
                        ID: {classroom.id.slice(-8).toUpperCase()}
                    </p>

                    <div className="flex items-center gap-3.5 p-3.5 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 group-hover:border-orange-500/20 transition-all">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-black/40 flex items-center justify-center text-xs font-black text-gray-950 dark:text-white border border-gray-100 dark:border-white/10 shadow-sm">
                            {classroom.teacher.name?.charAt(0).toUpperCase() || "T"}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Authorizing Mentor</span>
                            <span className="text-xs font-black text-gray-900 dark:text-gray-200 line-clamp-1 truncate uppercase tracking-tight">
                                {classroom.teacher.name || "System Master"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Analytics */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between relative z-10 text-[9px] font-black uppercase tracking-widest">
                    <div className="flex flex-col">
                        <span className="text-gray-400 mb-1">Density</span>
                        <span className="text-gray-950 dark:text-white tabular-nums">
                            {classroom._count?.students || 0} Entities
                        </span>
                    </div>

                    <div className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-lg active:scale-95">
                        Initialize
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
