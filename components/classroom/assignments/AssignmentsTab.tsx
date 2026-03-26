"use client";

import { useState, useEffect } from "react";
import { Plus, Calendar, CheckCircle2, ChevronRight, BarChart2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { CreateAssignmentModal } from "./CreateAssignmentModal";
import { getClassroomAssignments, refreshClassroomAssignments } from "@/actions/assignment";
import { AssignmentAnalyticsView } from "./AssignmentAnalyticsView";
import Link from "next/link";
import { toast } from "sonner";

interface AssignmentsTabProps {
    classroomId: string;
    isTeacher: boolean;
}

export function AssignmentsTab({ classroomId, isTeacher }: AssignmentsTabProps) {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    // Initial load uses cached version
    const fetchAssignments = async () => {
        try {
            const result = await getClassroomAssignments(classroomId);
            // Handle new paginated return type
            setAssignments(result.assignments || []);
        } catch (error) {
            console.error("Failed to fetch assignments", error);
            toast.error("Failed to load assignments");
        } finally {
            setIsLoading(false);
        }
    };

    // Refresh uses uncached version for fresh data
    const refreshAssignments = async () => {
        try {
            const data = await refreshClassroomAssignments(classroomId);
            setAssignments(data);
        } catch (error) {
            console.error("Failed to refresh assignments", error);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [classroomId]);

    if (selectedAssignmentId && isTeacher) {
        return (
            <AssignmentAnalyticsView
                assignmentId={selectedAssignmentId}
                classroomId={classroomId}
                onBack={() => setSelectedAssignmentId(null)}
            />
        );
    }

    return (
        <div className="space-y-8 w-full">
            <div className="flex items-center justify-between px-2 pt-2">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                        <h2 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Active Task Hub</h2>
                    </div>
                    <h1 className="text-2xl font-black text-gray-950 dark:text-white tracking-tightest uppercase">
                        Current Assignments
                    </h1>
                </div>
                {isTeacher && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-10 px-6 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Init New Protocol
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-24 bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-gray-100 dark:border-white/5 rounded-3xl">
                    <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
                    <h3 className="text-sm font-black text-gray-950 dark:text-white mb-2 uppercase tracking-tight">System Idle</h3>
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {isTeacher
                            ? "Initiate assignment to begin tracking"
                            : "Awaiting publication from instructor"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {assignments.map(assignment => (
                        <div
                            key={assignment.id}
                            className="bg-[#fafafa] dark:bg-[#121212] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:border-orange-500/50 transition-all group relative cursor-pointer shadow-sm hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-none"
                            onClick={() => isTeacher && setSelectedAssignmentId(assignment.id)}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                    <CheckCircle2 className={`w-5 h-5 ${isTeacher ? 'text-orange-600 group-hover:text-white' : 'text-gray-400'}`} />
                                </div>
                                {assignment.dueDate && (
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Target Horizon</span>
                                        <div className="px-2.5 py-1 bg-white dark:bg-black/40 rounded-lg border border-gray-100 dark:border-white/10 shadow-sm">
                                            <span className="text-[10px] font-black text-gray-900 dark:text-gray-200 uppercase tabular-nums tracking-widest leading-none">
                                                {format(new Date(assignment.dueDate), "MMM dd")}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-black text-gray-950 dark:text-white mb-2 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-1 uppercase">
                                {assignment.title}
                            </h3>

                            <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-8 line-clamp-2 leading-relaxed min-h-[32px]">
                                {assignment.description || "Experimental parameters undefined."}
                            </p>

                            <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Complexity</span>
                                        <span className="text-[10px] font-black text-gray-950 dark:text-white tabular-nums uppercase">
                                            {assignment._count.problems} Node Points
                                        </span>
                                    </div>
                                </div>

                                {isTeacher ? (
                                    <button className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all">
                                        <BarChart2 className="w-3 h-3" />
                                        Fetch Logs
                                    </button>
                                ) : (
                                    <Link
                                        href={`/my-assignments/${assignment.id}`}
                                        className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all"
                                    >
                                        Execute Link
                                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isTeacher && (
                <CreateAssignmentModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    classroomId={classroomId}
                    onSuccess={() => {
                        setIsCreateModalOpen(false);
                        refreshAssignments(); // Use uncached fetch for immediate fresh data
                    }}
                />
            )}
        </div>
    );
}
