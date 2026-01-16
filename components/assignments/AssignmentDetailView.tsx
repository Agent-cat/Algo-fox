"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Circle, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface Problem {
    id: string;
    problemId: string;
    problem: {
        id: string;
        title: string;
        slug: string;
        difficulty: string;
        type: string;
        domain: string;
    };
}

interface Assignment {
    id: string;
    title: string;
    description: string | null;
    dueDate: Date | null;
    problems: Problem[];
    classroom: {
        name: string;
        id: string;
    };
}

interface Progress {
    total: number;
    completed: number;
    progressMap: Record<string, boolean>;
}

interface AssignmentDetailViewProps {
    assignment: Assignment;
    progress: Progress | null;
}

export function AssignmentDetailView({ assignment, progress }: AssignmentDetailViewProps) {
    const completedCount = progress?.completed || 0;
    const totalCount = progress?.total || assignment.problems.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/my-assignments"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Assignments
                </Link>

                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">{assignment.classroom.name}</p>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                            {assignment.title}
                        </h1>
                        {assignment.description && (
                            <p className="text-gray-500">{assignment.description}</p>
                        )}
                        {assignment.dueDate && (
                            <p className="text-sm text-gray-400 mt-2">
                                Due: <span className="font-bold text-gray-600 dark:text-gray-300">{format(new Date(assignment.dueDate), "MMMM d, yyyy 'at' h:mm a")}</span>
                            </p>
                        )}
                    </div>

                    {/* Progress Ring */}
                    <div className="flex-shrink-0 text-center">
                        <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    className="text-gray-100 dark:text-[#262626]"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="36"
                                    stroke="currentColor"
                                    strokeWidth="6"
                                    fill="none"
                                    strokeDasharray={`${progressPercent * 2.26} 226`}
                                    className="text-orange-500 transition-all duration-500"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg font-black text-gray-900 dark:text-white">{Math.round(progressPercent)}%</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 font-medium">{completedCount}/{totalCount} done</p>
                    </div>
                </div>
            </div>

            {/* Problems List */}
            <div className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-gray-50 dark:border-[#262626]">
                    <h2 className="font-bold text-gray-900 dark:text-white">Problems</h2>
                </div>

                <div className="divide-y divide-gray-50 dark:divide-[#262626]">
                    {assignment.problems.map((item, index) => {
                        const isSolved = progress?.progressMap[item.problemId] || false;

                        return (
                            <Link
                                key={item.id}
                                href={`/problems/${item.problem.slug}`}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a] transition-colors group"
                            >
                                <div className="w-8 h-8 flex items-center justify-center">
                                    {isSolved ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                                        <h3 className={`font-bold truncate transition-colors ${isSolved ? "text-gray-500 line-through" : "text-gray-900 dark:text-white group-hover:text-orange-600"}`}>
                                            {item.problem.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                            item.problem.difficulty === "EASY" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                            item.problem.difficulty === "MEDIUM" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        }`}>
                                            {item.problem.difficulty}
                                        </span>
                                        <span className="text-[10px] text-gray-400">{item.problem.domain}</span>
                                    </div>
                                </div>

                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
