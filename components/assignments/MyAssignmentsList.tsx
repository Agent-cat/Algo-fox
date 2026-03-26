"use client";

import Link from "next/link";
import { format, isPast, isToday } from "date-fns";
import { Calendar, ChevronRight, CheckCircle2, Clock } from "lucide-react";

interface Assignment {
    id: string;
    title: string;
    description: string | null;
    dueDate: Date | null;
    classroom: {
        name: string;
    };
    _count: {
        problems: number;
    };
}

interface MyAssignmentsListProps {
    assignments: Assignment[];
}

export function MyAssignmentsList({ assignments }: MyAssignmentsListProps) {
    if (assignments.length === 0) {
        return (
            <div className="text-center py-16 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl">
                <div className="w-16 h-16 bg-gray-100 dark:bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Assignments</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    You don't have any assignments yet. Join a classroom to receive assignments from your teacher.
                </p>
            </div>
        );
    }

    // Group by urgency
    const urgent = assignments.filter(a => a.dueDate && (isToday(new Date(a.dueDate)) || isPast(new Date(a.dueDate))));
    const upcoming = assignments.filter(a => a.dueDate && !isToday(new Date(a.dueDate)) && !isPast(new Date(a.dueDate)));
    const noDue = assignments.filter(a => !a.dueDate);

    const renderCard = (assignment: Assignment) => {
        const isOverdue = assignment.dueDate && isPast(new Date(assignment.dueDate));
        const isDueToday = assignment.dueDate && isToday(new Date(assignment.dueDate));

        return (
            <Link
                key={assignment.id}
                href={`/my-assignments/${assignment.id}`}
                className="group relative bg-[#fafafa] dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:border-orange-500/50 transition-all shadow-sm hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-none"
            >
                <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl border transition-all duration-500 ${
                        isOverdue
                            ? 'bg-red-50 dark:bg-red-500/10 text-red-600 border-red-100 dark:border-red-500/20'
                            : isDueToday
                                ? 'bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600 border-yellow-100 dark:border-yellow-500/20'
                                : 'bg-gray-50 dark:bg-white/5 text-gray-400 border-gray-100 dark:border-white/10 group-hover:bg-orange-600 group-hover:text-white group-hover:border-orange-600'
                    }`}>
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                    {assignment.dueDate && (
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Horizon</span>
                            <div className={`px-2.5 py-1 rounded-lg border shadow-sm ${
                                isOverdue
                                    ? 'bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20'
                                    : 'bg-white dark:bg-black/40 border-gray-100 dark:border-white/10'
                            }`}>
                                <span className={`text-[10px] font-black uppercase tabular-nums tracking-widest leading-none ${
                                    isOverdue ? 'text-red-600' : 'text-gray-900 dark:text-gray-200'
                                }`}>
                                    {isOverdue ? "Lapsed" : format(new Date(assignment.dueDate), "MMM dd")}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-1">
                    <span className="text-[8px] font-black text-orange-600 uppercase tracking-[0.2em] mb-1 block">
                        {assignment.classroom.name}
                    </span>
                    <h3 className="text-lg font-black text-gray-950 dark:text-white group-hover:text-orange-600 transition-colors tracking-tight line-clamp-1 uppercase">
                        {assignment.title}
                    </h3>
                </div>

                <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-8 line-clamp-2 leading-relaxed min-h-[32px]">
                    {assignment.description || "Operational parameters undefined."}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/5">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Complexity</span>
                        <span className="text-[10px] font-black text-gray-950 dark:text-white tabular-nums uppercase">
                            {assignment._count.problems} Nodes
                        </span>
                    </div>

                    <div className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                        Execute Link
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="space-y-12">
            {urgent.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <h2 className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em]">Priority Protocols</h2>
                        <div className="h-px bg-red-100 dark:bg-red-900/20 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {urgent.map(renderCard)}
                    </div>
                </div>
            )}

            {upcoming.length > 0 && (
                <div>
                     <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Upcoming Missions</h2>
                        <div className="h-px bg-gray-100 dark:bg-white/5 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcoming.map(renderCard)}
                    </div>
                </div>
            )}

            {noDue.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                        <h2 className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Open Timeline</h2>
                        <div className="h-px bg-gray-100 dark:bg-white/5 flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {noDue.map(renderCard)}
                    </div>
                </div>
            )}
        </div>
    );
}
