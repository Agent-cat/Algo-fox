"use client";

import Link from "next/link";
import { GraduationCap, ChevronRight } from "lucide-react";
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
        createdAt?: Date | string;
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
            className="group bg-[#FDFDFD] dark:bg-[#1D1E23] border-x border-b border-dashed border-gray-300 dark:border-white/10 overflow-hidden transition-all duration-500 flex flex-col h-full rounded-2xl"
        >
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden bg-gray-50 dark:bg-[#1D1E23]">
                {course.image ? (
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        <GraduationCap className="w-16 h-16 text-gray-500" />
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col grow justify-between">
                <div className="space-y-2">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-orange-500 transition-colors">
                        {course.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {course.description}
                    </p>
                </div>

                {/* Footer Section: Sleek Progress Bar & Button */}
                <div className="mt-6 space-y-4">
                    {/* Sleek Progress Bar */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                            <span>{enrollment ? "Progress" : "Not Enrolled"}</span>
                            <span className="font-mono text-gray-700 dark:text-gray-300">
                                {enrollment ? Math.round(enrollment.progress) : 0}%
                            </span>
                        </div>
                        <div className="h-[3px] w-full bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${enrollment ? enrollment.progress : 0}%` }}
                                className="h-full bg-orange-500"
                                transition={{ duration: 1, ease: "easeOut" }}
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <Link
                        href={`/courses/${course.slug}`}
                        className="group/btn flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-900 hover:bg-orange-500 text-white dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-orange-600 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-95"
                    >
                        {enrollment ? "Continue Path" : "Start Learning"}
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
