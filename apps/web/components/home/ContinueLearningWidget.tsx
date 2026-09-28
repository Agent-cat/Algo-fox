"use client";

import Link from "next/link";
import { GraduationCap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface EnrolledCourse {
    id: string;
    progress: number;
    course: {
        id: string;
        title: string;
        slug: string;
        image?: string | null;
        modules?: { name: string }[];
    };
}

interface ContinueLearningWidgetProps {
    enrollments: EnrolledCourse[];
}

export function ContinueLearningWidget({ enrollments }: ContinueLearningWidgetProps) {
    if (!enrollments || enrollments.length === 0) {
        return (
            <div className="text-center py-6 sm:py-8 md:py-10 bg-transparent">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <GraduationCap className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-orange-500" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-sm font-bold text-gray-900 dark:text-white mb-1">
                    No Registered Courses
                </h3>
                <p className="text-[10px] sm:text-xs md:text-xs text-gray-500 dark:text-gray-400 mb-3 sm:mb-4 max-w-xs mx-auto">
                    Master coding with our structured courses and learning paths.
                </p>
                <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all self-center active:scale-95"
                >
                    Explore Courses
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3 sm:gap-4 bg-transparent">
            {/* Header */}
            <div className="flex items-center gap-1.5 sm:gap-2">
                <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-4 lg:h-4 xl:w-4.5 xl:h-4.5 2xl:w-5 2xl:h-5 text-gray-800 dark:text-gray-200" />
                <h2 className="text-xs sm:text-[13px] md:text-[15px] lg:text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] font-bold text-gray-900 dark:text-white">
                    Continue your Learning
                </h2>
            </div>

            {/* Course Rows */}
            <div className="flex flex-col gap-2 sm:gap-3">
                {enrollments.map((en, index) => {
                    const modules = en.course.modules || [];
                    const totalModules = modules.length;
                    
                    let activeModule = "Introduction";
                    if (totalModules > 0) {
                        const moduleIndex = Math.min(
                            Math.floor((en.progress / 100) * totalModules),
                            totalModules - 1
                        );
                        activeModule = modules[moduleIndex]?.name || "Introduction";
                    }
                    if (en.progress === 100) {
                        activeModule = "Completed!";
                    }

                    return (
                        <motion.div
                            key={en.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-3.5 lg:p-2.5 xl:p-3.5 2xl:p-4 rounded-xl sm:rounded-2xl bg-[#FAFAFB] dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-all group"
                        >
                            {/* Course Image / Icon */}
                            <div className="shrink-0">
                                {en.course.image ? (
                                    <img
                                        src={en.course.image}
                                        alt={en.course.title}
                                        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 object-cover rounded-lg sm:rounded-xl border border-gray-100 dark:border-white/5"
                                    />
                                ) : (
                                    <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-11 lg:h-11 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-lg sm:rounded-xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center border border-orange-200/20">
                                        <GraduationCap className="w-5 h-5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-orange-500" />
                                    </div>
                                )}
                            </div>

                            {/* Content Block */}
                            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-3 xl:gap-4 2xl:gap-6">
                                {/* Title & Module */}
                                <div className="w-full sm:w-44 md:w-56 lg:w-44 xl:w-56 2xl:w-72 sm:shrink-0 lg:shrink-0 min-w-0">
                                    <Link
                                        href={`/courses/${en.course.slug}`}
                                        className="text-[12px] sm:text-[13px] md:text-[14px] lg:text-[12.5px] xl:text-[13.5px] 2xl:text-[14px] font-bold text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors truncate block leading-tight"
                                    >
                                        {en.course.title}
                                    </Link>
                                    <div className="text-[9px] sm:text-[10px] md:text-[10px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[10px] text-gray-400 dark:text-gray-500 truncate mt-1 sm:mt-1.5">
                                        Current Module: <span className="font-semibold text-gray-600 dark:text-gray-400">{activeModule}</span>
                                    </div>
                                </div>

                                {/* Progress Bar & Percent */}
                                <div className="w-full sm:flex-1 flex flex-col justify-center max-w-[800px] sm:ml-4 md:ml-6 lg:ml-4 xl:ml-6 2xl:ml-10 sm:mr-auto">
                                    <div className="text-[9px] sm:text-[10px] lg:text-[8.5px] xl:text-[9.5px] 2xl:text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest flex justify-between items-center mb-0.5 sm:mb-1">
                                        <span>Progress</span>
                                        <span className="font-mono text-gray-700 dark:text-gray-300">
                                            {Math.round(en.progress)}%
                                        </span>
                                    </div>
                                    <div className="h-[3px] sm:h-[4px] w-full bg-gray-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                            style={{ width: `${en.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Continue Button */}
                            <div className="shrink-0 sm:pl-2">
                                <Link
                                    href={`/courses/${en.course.slug}`}
                                    className="inline-flex items-center justify-center px-4 py-2 sm:px-4 sm:py-2 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2.5 2xl:px-5 2xl:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs lg:text-[10px] xl:text-[11px] 2xl:text-xs font-bold tracking-wider bg-white text-gray-900 border border-gray-200 hover:border-gray-300 dark:bg-white/5 dark:border-white/10 dark:text-white dark:hover:bg-white/10 dark:hover:border-white/20 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap"
                                >
                                    Continue
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
