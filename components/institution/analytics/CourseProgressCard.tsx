"use client";

import { BookOpen, CheckCircle2, Clock, AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { CourseEnrollmentItem } from "@/actions/institution/analytics";

const STATUS_CONFIG = {
    COMPLETED: {
        label: "Completed",
        icon: CheckCircle2,
        className:
            "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20",
        barClass: "bg-emerald-500",
    },
    IN_PROGRESS: {
        label: "In Progress",
        icon: Clock,
        className:
            "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20",
        barClass: "bg-blue-500",
    },
    AT_RISK: {
        label: "At Risk",
        icon: AlertTriangle,
        className:
            "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20",
        barClass: "bg-orange-500",
    },
};

const DIFFICULTY_COLORS: Record<string, string> = {
    EASY: "text-emerald-600 dark:text-emerald-400",
    MEDIUM: "text-orange-600 dark:text-orange-400",
    HARD: "text-red-600 dark:text-red-400",
    CONCEPT: "text-purple-600 dark:text-purple-400",
};

interface CourseProgressCardProps {
    courses: CourseEnrollmentItem[];
}

export function CourseProgressCard({ courses }: CourseProgressCardProps) {
    if (courses.length === 0) {
        return (
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center">
                        <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            Course Progress
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            Enrolled courses &amp; completion
                        </p>
                    </div>
                </div>
                <div className="text-center py-10">
                    <BookOpen className="w-8 h-8 text-gray-200 dark:text-gray-700 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-300 dark:text-gray-600">
                        No courses enrolled
                    </p>
                </div>
            </div>
        );
    }

    const completedCount = courses.filter((c) => c.status === "COMPLETED").length;
    const atRiskCount = courses.filter((c) => c.status === "AT_RISK").length;
    const avgProgress = Math.round(
        courses.reduce((s, c) => s + c.progress, 0) / courses.length
    );

    return (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] p-6 hover:shadow-lg transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center">
                        <BookOpen className="w-4.5 h-4.5 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                            Course Progress
                        </h3>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {courses.length} enrolled · avg {avgProgress}% complete
                        </p>
                    </div>
                </div>

                {/* Summary pills */}
                <div className="flex gap-2 flex-shrink-0">
                    {completedCount > 0 && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            {completedCount} done
                        </span>
                    )}
                    {atRiskCount > 0 && (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20">
                            <AlertTriangle className="w-3 h-3" />
                            {atRiskCount} at risk
                        </span>
                    )}
                </div>
            </div>

            {/* Course List */}
            <div className="space-y-3">
                {courses.map((course) => {
                    const status = STATUS_CONFIG[course.status];
                    const StatusIcon = status.icon;
                    const diffColor = DIFFICULTY_COLORS[course.difficulty] ?? "text-gray-400";

                    return (
                        <div
                            key={course.courseId}
                            className="group bg-gray-50/60 dark:bg-[#1a1a1a] rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-[#222222] transition-colors"
                        >
                            <div className="flex items-start justify-between gap-3 mb-2.5">
                                <div className="min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                                            {course.title}
                                        </p>
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-wide ${diffColor}`}
                                        >
                                            {course.difficulty.toLowerCase()}
                                        </span>
                                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                                            {course.domain}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span
                                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black ${status.className}`}
                                    >
                                        <StatusIcon className="w-3 h-3" />
                                        {status.label}
                                    </span>
                                    <Link
                                        href={`/courses/${course.slug}`}
                                        target="_blank"
                                        onClick={(e) => e.stopPropagation()}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-[#262626] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${status.barClass}`}
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <span className="text-xs font-black text-gray-500 dark:text-gray-400 tabular-nums w-8 text-right">
                                    {course.progress}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
