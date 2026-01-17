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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Assignments</h2>
                {isTeacher && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 bg-orange-600 text-white text-sm font-bold rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Create Assignment
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-gray-500">Loading assignments...</div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 border border-gray-100 dark:bg-[#1a1a1a] dark:border-[#262626] rounded-2xl">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600 dark:text-orange-500">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No assignments yet</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {isTeacher
                            ? "Create your first assignment to track student progress on specific problems."
                            : "Your teacher hasn't posted any assignments yet."}
                    </p>
                    {isTeacher && (
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-6 py-3 bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 text-sm font-bold rounded-lg transition-colors"
                        >
                            Create Assignment
                        </button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {assignments.map(assignment => (
                        <div
                            key={assignment.id}
                            className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl p-6 hover:shadow-lg transition-all group relative cursor-pointer"
                            onClick={() => {
                                if (isTeacher) {
                                    setSelectedAssignmentId(assignment.id);
                                } else {
                                    // Navigate to student assignment view (needs implementation)
                                    // For now, let's just use a Link
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

                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-600 dark:text-orange-500">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                {assignment.dueDate && (
                                    <span className="text-xs font-bold text-gray-400 bg-gray-50 dark:bg-[#262626] px-2 py-1 rounded">
                                        Due {format(new Date(assignment.dueDate), "MMM d")}
                                    </span>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">
                                {assignment.title}
                            </h3>

                            <p className="text-sm text-gray-500 mb-6 line-clamp-2 min-h-[40px]">
                                {assignment.description || "No description provided"}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-[#262626]">
                                <span className="text-xs font-bold text-gray-500">
                                    {assignment._count.problems} Problems
                                </span>

                                {isTeacher ? (
                                    <div className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:underline">
                                        <BarChart2 className="w-3 h-3" />
                                        View Analytics
                                    </div>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs font-bold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform">
                                        Start
                                        <ChevronRight className="w-3 h-3" />
                                    </span>
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
