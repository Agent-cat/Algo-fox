"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Calendar, CheckCircle2, ChevronRight, BarChart2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CreateAssignmentModal } from "./CreateAssignmentModal";
import { getClassroomAssignments, refreshClassroomAssignments } from "@/actions/assignment";
import { AssignmentAnalyticsView } from "./AssignmentAnalyticsView";
import Link from "next/link";
import { Search } from "lucide-react";
import { toast } from "sonner";

interface Assignment {
    id: string;
    title: string;
    description: string | null;
    dueDate: string | Date | null;
    _count: {
        problems: number;
    };
}

interface AssignmentsTabProps {
    classroomId: string;
    isTeacher: boolean;
}

export function AssignmentsTab({ classroomId, isTeacher }: AssignmentsTabProps) {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Initial load uses cached version
    const fetchAssignments = useCallback(async () => {
        try {
            const result = await getClassroomAssignments(classroomId);
            // Handle new paginated return type
            setAssignments((result as any).assignments || []);
        } catch (error) {
             console.error("Failed to fetch assignments", error);
            toast.error("Failed to load assignments");
        } finally {
            setIsLoading(false);
        }
    }, [classroomId]);

    // Refresh uses uncached version for fresh data
    const refreshAssignments = useCallback(async () => {
        try {
            const data = await refreshClassroomAssignments(classroomId);
            setAssignments(data);
        } catch (error) {
             console.error("Failed to refresh assignments", error);
        }
    }, [classroomId]);

    useEffect(() => {
        fetchAssignments();
    }, [fetchAssignments]);

    if (selectedAssignmentId && isTeacher) {
        return (
            <AssignmentAnalyticsView
                assignmentId={selectedAssignmentId}
                classroomId={classroomId}
                onBack={() => setSelectedAssignmentId(null)}
            />
        );
    }

    const filteredAssignments = assignments.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (a.description && a.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-0 w-full py-8 px-6 lg:px-12 bg-[#fafafa] dark:bg-[#1D1E23] min-h-[calc(100vh-4rem)]"
        >
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="mb-8"
            >
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-1">
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                            Assignments
                        </h1>
                    </div>
                </div>
            </motion.div>

            {/* HEADER TOOLS */}
            <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6"
            >
                <div className="relative group flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search assignments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-[#222328] border border-gray-200 dark:border-white/10 pl-12 pr-4 py-2.5 rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                    />
                </div>

                {isTeacher && (
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-[42px] px-6 bg-orange-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-orange-700 transition-all shadow-sm active:scale-95 whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4" />
                        New Assignment
                    </button>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="flex-1 bg-white dark:bg-[#222328] border border-gray-200 dark:border-white/10 rounded-2xl p-6"
            >

            {isLoading ? (
                <div className="flex items-center justify-center py-24">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                </div>
            ) : assignments.length === 0 ? (
                <div className="text-center py-24 bg-white/30 dark:bg-white/5 backdrop-blur-lg border border-gray-100 dark:border-white/5 rounded-3xl">
                    <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-6" />
                    <h3 className="text-sm font-black text-gray-950 dark:text-white mb-2 uppercase tracking-tight">No Assignments</h3>
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                        {isTeacher
                            ? "Create an assignment to get started"
                            : "Awaiting publication from instructor"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                    {filteredAssignments.map(assignment => (
                        <div
                            key={assignment.id}
                            className="bg-[#fafafa] dark:bg-[#1D1E23] border border-gray-100 dark:border-white/5 rounded-2xl p-6 hover:border-orange-500/50 transition-all group relative cursor-pointer shadow-sm hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-none"
                            onClick={() => isTeacher && setSelectedAssignmentId(assignment.id)}
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                    <CheckCircle2 className={`w-5 h-5 ${isTeacher ? 'text-orange-600 group-hover:text-white' : 'text-gray-400'}`} />
                                </div>
                                {assignment.dueDate && (
                                    <div className="flex flex-col items-end">
                                        <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5">Due Date</span>
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
                                {assignment.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Structure</span>
                                        <span className="text-[10px] font-black text-gray-950 dark:text-white tabular-nums uppercase">
                                            {assignment._count.problems} Problems
                                        </span>
                                    </div>
                                </div>

                                {isTeacher ? (
                                    <button className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all">
                                        <BarChart2 className="w-3 h-3" />
                                        View Results
                                    </button>
                                ) : (
                                    <Link
                                        href={`/my-assignments/${assignment.id}`}
                                        className="h-8 px-4 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-lg flex items-center gap-2 text-[9px] font-black uppercase tracking-widest group-hover:bg-orange-600 group-hover:text-white transition-all"
                                    >
                                        View Problems
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
            </motion.div>
        </motion.div>
    );
}
