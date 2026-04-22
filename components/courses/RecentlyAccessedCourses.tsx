"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RecentlyAccessedCoursesProps {
    enrollments: any[];
}

export function RecentlyAccessedCourses({ enrollments }: RecentlyAccessedCoursesProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!enrollments || enrollments.length === 0) return null;

    return (
        <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-8 px-2 -mx-2 snap-x scroll-smooth no-scrollbar">
                {enrollments.map((en) => (
                    <Link
                        key={en.id}
                        href={`/courses/${en.course.slug}`}
                        className="flex-none w-[280px] md:w-[320px] group snap-start"
                    >
                        <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl border border-gray-100 dark:border-[#262626] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 group-hover:-translate-y-2 flex flex-col h-full border-b-4 border-b-orange-500/50">
                            <div className="relative aspect-16/10 overflow-hidden">
                                {en.course.image ? (
                                    <Image
                                        src={en.course.image}
                                        alt={en.course.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-gray-50 to-gray-100 dark:from-[#1a1a1a] dark:to-[#262626] flex items-center justify-center">
                                        <BookOpen className="w-10 h-10 text-gray-200 dark:text-[#333]" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="p-6 flex flex-col grow">
                                <h3 className="font-black text-gray-900 dark:text-gray-100 group-hover:text-orange-500 transition-colors line-clamp-2 text-[16px] leading-tight mb-6">
                                    {en.course.title || en.course.name}
                                </h3>

                                <div className="mt-auto space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Progress</span>
                                            <span className="text-[11px] font-black text-orange-500">{Math.round(en.progress)}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
                                            {mounted ? (
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${en.progress}%` }}
                                                    transition={{ duration: 1.2, ease: "circOut" }}
                                                    className="h-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                                                />
                                            ) : (
                                                <div
                                                    className="h-full bg-orange-500"
                                                    style={{ width: `${en.progress}%` }}
                                                />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-2">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-tight">Continue Learning</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
