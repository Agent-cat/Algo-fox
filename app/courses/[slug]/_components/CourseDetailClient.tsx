"use client";

import { useState, useEffect } from "react";
import LearnMode from "@/app/(main)/problems/dsa/_components/learn/LearnMode";
import { SearchBar } from "@/app/(main)/problems/dsa/_components/shared/SearchBar";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BarChart, Layout, Users, Globe, Flag, GraduationCap, Lightbulb } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EnrollButton from "@/components/courses/EnrollButton";

interface CourseDetailClientProps {
    course: any;
    enrollment: any;
    initialModules: any[];
    userRole: string;
    progress: number;
    solvedCount: number;
    totalProblems: number;
    session: any;
}

export default function CourseDetailClient({
    course,
    enrollment,
    initialModules,
    userRole,
    progress,
    solvedCount,
    totalProblems,
    session
}: CourseDetailClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [modules, setModules] = useState<any[]>(initialModules);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="space-y-12"
        >
            {/* Theme-Aware Header Card matching Navbar */}
            <div className="bg-[#fafafa] dark:bg-[#121212] border border-gray-300 dark:border-white/10 rounded-sm relative overflow-hidden group shadow-xs">
                {/* Technical Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }}
                />
                <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-orange-500/5 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center lg:items-center p-8 md:p-12">
                    <div className="flex-1 space-y-6">
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-none">
                                {course.difficulty}
                            </Badge>
                        </div>

                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">
                                {course.title}
                            </h1>

                            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 py-2 border-y border-gray-100/50 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-extrabold uppercase text-[10px] tracking-[0.2em]">
                                    <GraduationCap className="w-4 h-4 text-orange-500" />
                                    <span>{modules?.length || 0} Modules</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-extrabold uppercase text-[10px] tracking-[0.2em]">
                                    <Lightbulb className="w-4 h-4 text-orange-500" />
                                    <span>{totalProblems || 0} Problems</span>
                                </div>
                            </div>
                        </div>

                        {enrollment ? (
                             <div className="w-full max-w-xl pr-10 pt-2 text-left">
                                <div className="flex justify-between items-end mb-3 px-0.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Your Progress:</span>
                                        <span className="text-lg font-black text-gray-900 dark:text-white tabular-nums">{progress}% completed</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tabular-nums uppercase tracking-widest">{solvedCount} / {totalProblems} Solved</span>
                                </div>
                                <div className="relative h-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-[#262626] group/rail">
                                    <motion.div
                                        className="h-full bg-orange-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                    {/* Completion Goal Flag - Now to the right of the bar */}
                                    <div className="absolute -right-7 top-1/2 -translate-y-1/2 flex items-center opacity-30 dark:opacity-50 group-hover/rail:opacity-100 transition-opacity">
                                        <Flag className="w-3.5 h-3.5 text-orange-500 fill-orange-500/20 transform rotate-12" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4">
                               <EnrollButton courseId={course.id} slug={course.slug} session={session} course={course} />
                            </div>
                        )}
                    </div>

                    {/* Course Image Integration */}
                    <div className="w-full lg:w-[440px] shrink-0">
                        <div className="relative aspect-16/10 overflow-hidden bg-gray-50 dark:bg-[#1a1a1a] transition-colors duration-500">
                            {course.image ? (
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-contain"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BarChart className="w-16 h-16 text-orange-500 opacity-20" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-gray-900/5 dark:from-black/20 via-transparent to-transparent opacity-40 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Tools */}
                <div className="flex justify-end gap-6 border-b border-gray-100 dark:border-white/5 pb-8 px-2">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search modules..."
                        className="w-full md:max-w-xs"
                    />
                </div>

                {/* Modules Grid */}
                <LearnMode
                    searchTerm={searchTerm}
                    categories={modules}
                    isLoading={false}
                    userRole={userRole}
                    domain={course.domain || "SQL"}
                    courseId={course.id}
                    courseTitle={course.title}
                    isEnrolled={!!enrollment}
                />
            </div>
        </motion.div>
    );
}
