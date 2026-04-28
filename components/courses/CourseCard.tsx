"use client";

import Link from "next/link";
import { GraduationCap, Clock, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        slug: string;
        description: string;
        image?: string | null;
        difficulty: string;
        tags: string[];
        duration?: string | null;
        _count?: {
            modules: number;
        };
    };
    enrollment?: {
        progress: number;
        completedAt?: Date | null;
    } | null;
}

export function CourseCard({ course, enrollment }: CourseCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white dark:bg-[#111111] border border-dashed border-gray-300 dark:border-white/10 overflow-hidden transition-all duration-500 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col h-full rounded-b-3xl rounded-t-none"
        >
            {/* Image Section - No rounding at top as requested */}
            <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
                {course.image ? (
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-700"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <GraduationCap className="w-16 h-16 text-gray-500" />
                    </div>
                )}

                {/* Difficulty Tag */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                        {course.difficulty}
                    </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="p-6 flex flex-col grow space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                         <GraduationCap className="w-3.5 h-3.5" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">{course._count?.modules || 0} Modules</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-[1.2] group-hover:text-orange-500 transition-colors">
                        {course.title}
                    </h3>
                </div>

                <div className="pt-4 border-t border-dashed border-gray-100 dark:border-[#262626] mt-auto">
                    {enrollment ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Your Progress</span>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white tabular-nums">
                                        {Math.round(enrollment.progress)}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-[#222] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${enrollment.progress}%` }}
                                        className="h-full bg-orange-500"
                                        transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            <Link
                                href={`/courses/${course.slug}`}
                                className="group/btn flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                Continue Path
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                             <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                     <User className="w-3.5 h-3.5 text-gray-400" />
                                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Self-Paced</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                     <Clock className="w-3.5 h-3.5 text-gray-400" />
                                     <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{course.duration || 'Flexible'}</span>
                                 </div>
                             </div>

                             <Link
                                href={`/courses/${course.slug}`}
                                className="group/btn flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                Start Learning
                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
