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

    const renderCard = (assignment: Assignment) => (
        <Link
            key={assignment.id}
            href={`/my-assignments/${assignment.id}`}
            className="block bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl p-4 hover:shadow-md hover:border-orange-200 dark:hover:border-orange-500/20 transition-all group"
        >
            <div className="flex items-start justify-between mb-3">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500">
                    <CheckCircle2 className="w-4 h-4" />
                </div>
                {assignment.dueDate && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            isPast(new Date(assignment.dueDate))
                                ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                : isToday(new Date(assignment.dueDate))
                                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400"
                                    : "bg-gray-100 text-gray-600 dark:bg-[#262626] dark:text-gray-400"
                        }`}>
                        <Clock className="w-2.5 h-2.5 inline mr-0.5" />
                        {isPast(new Date(assignment.dueDate)) ? "Overdue" : format(new Date(assignment.dueDate), "MMM d, h:mma")}
                    </span>
                )}
            </div>

            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-orange-600 transition-colors line-clamp-1">
                {assignment.title}
            </h3>
            <p className="text-[11px] text-gray-400 mb-2">{assignment.classroom.name}</p>

            {assignment.description && (
                <p className="text-xs text-gray-500 line-clamp-1 mb-3">{assignment.description}</p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-[#262626]">
                <span className="text-[10px] font-bold text-gray-500">{assignment._count.problems} Problems</span>
                <span className="flex items-center gap-0.5 text-[10px] font-bold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
                    Start <ChevronRight className="w-3 h-3" />
                </span>
            </div>
        </Link>
    );

    return (
        <div className="space-y-6">
            {urgent.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                        Due Soon / Overdue
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {urgent.map(renderCard)}
                    </div>
                </div>
            )}

            {upcoming.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Upcoming</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {upcoming.map(renderCard)}
                    </div>
                </div>
            )}

            {noDue.length > 0 && (
                <div>
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">No Due Date</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {noDue.map(renderCard)}
                    </div>
                </div>
            )}
        </div>
    );
}
