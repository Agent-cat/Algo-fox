"use client";

import { useState, useEffect } from "react";
import LearnMode from "@/app/(main)/problems/dsa/_components/learn/LearnMode";
import { SearchBar } from "@/app/(main)/problems/dsa/_components/shared/SearchBar";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BarChart, Layout } from "lucide-react";
import Link from "next/link";
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
            className="space-y-10"
        >
            {/* Refined Course Header - Matches Category Card Aesthetic */}
            <div className="bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border border-gray-200/50 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                {/* Technical Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px] pointer-events-none" />

                <div className="absolute top-0 right-0 p-4 opacity-[0.03] scale-125 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
                   <BarChart className="w-20 h-20 text-orange-500" />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[8px] font-black uppercase tracking-widest px-2">
                                {course.difficulty}
                            </Badge>
                            {course.tags.slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="outline" className="text-gray-400 border-gray-100 dark:border-white/5 font-bold px-2 uppercase text-[8px] tracking-widest">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                            {course.title}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium max-w-xl">
                            {course.description}
                        </p>

                        {enrollment && (
                            <div className="w-full pt-4">
                                <div className="flex justify-between items-end mb-2 px-0.5">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Mastery Journey: {progress}%</span>
                                    <span className="text-[10px] font-bold text-orange-500 tabular-nums uppercase tracking-widest">{solvedCount} / {totalProblems} Solved</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden p-0.5 border border-gray-200/50 dark:border-white/5">
                                    <motion.div
                                        className="h-full bg-linear-to-r from-orange-500 to-orange-400 shadow-[0_0_12px_rgba(233,78,36,0.3)] rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {!enrollment && (
                        <div className="w-full md:w-64 pt-2">
                            <EnrollButton courseId={course.id} slug={course.slug} session={session} course={course} />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section (Aptitude Problems Style) - Single Column */}
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Tools */}
                <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 px-2">
                    <SearchBar
                        onSearch={handleSearch}
                        placeholder="Search modules..."
                        className="w-full md:max-w-xs"
                    />
                </div>

                {/* Learn Mode / Category Cards - Matches Aptitude Size */}
                <LearnMode
                    searchTerm={searchTerm}
                    categories={modules}
                    isLoading={false}
                    userRole={userRole}
                    domain={course.domain || "SQL"}
                    courseId={course.id}
                    isEnrolled={!!enrollment}
                />
            </div>
        </motion.div>
    );
}
