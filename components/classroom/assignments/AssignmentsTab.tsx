"use client";

import { useState, useEffect } from "react";
import { Plus, Calendar, CheckCircle2, ChevronRight, BarChart2 } from "lucide-react";
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
        <div className="space-y-6 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/20 dark:border-white/10 shadow-xl">
                <div>
                    <h2 className="text-xl font-black text-gray-950 dark:text-white uppercase tracking-tight">Active Assignments</h2>
                    <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mt-1">Operational task tracking</p>
                </div>
                {isTeacher && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-10 px-6 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 dark:hover:bg-gray-100 transition-all shadow-lg shadow-gray-200 dark:shadow-none flex items-center gap-2"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Init Assignment
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-20 bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2.5rem] shadow-sm">
                    <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/10 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600 dark:text-orange-500">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-black text-gray-950 dark:text-white mb-2 uppercase tracking-tight">System Idle</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 text-xs font-medium">
                        {isTeacher
                            ? "Initiate your first assignment to begin tracking student performance."
                            : "Your instructor has not published any assignments yet."}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map(assignment => (
                        <div
                            key={assignment.id}
                            className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] p-6 hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all group relative cursor-pointer"
                            onClick={() => {
                                if (isTeacher) {
                                    setSelectedAssignmentId(assignment.id);
                                }
                            }}
                        >
                             {/* Floating actions */}
                            {!isTeacher && (
                                <Link
                                    href={`/my-assignments/${assignment.id}`}
                                    className="absolute inset-0 z-10"
                                />
                            )}

                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                {assignment.dueDate && (
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Date</span>
                                        <span className="text-[10px] font-black text-gray-950 dark:text-gray-200 bg-white/50 dark:bg-black/20 px-2.5 py-1 rounded-lg border border-white/10">
                                            {format(new Date(assignment.dueDate), "MMM d")}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <h3 className="text-lg font-black text-gray-950 dark:text-white mb-2 group-hover:text-orange-600 transition-colors tracking-tight line-clamp-1">
                                {assignment.title}
                            </h3>

                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 min-h-[32px] leading-relaxed font-medium overflow-hidden">
                                {assignment.description || "Project specifications not provided."}
                            </p>

                            <div className="flex items-center justify-between pt-5 border-t border-gray-100/50 dark:border-white/5">
                                <div className="flex flex-col">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Parameters</span>
                                    <span className="text-[10px] font-bold text-gray-950 dark:text-white">
                                        {assignment._count.problems} Node Levels
                                    </span>
                                </div>

                                {isTeacher ? (
                                    <div className="h-8 px-3 bg-gray-50/50 dark:bg-white/5 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                        <BarChart2 className="w-3 h-3" />
                                        Logs
                                    </div>
                                ) : (
                                    <div className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all">
                                        Execute
                                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </div>
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
