"use client";

import { useState, useMemo } from "react";
import { TeacherClassroomList } from "@/components/classroom/TeacherClassroomList";
import { CreateClassroomDialog } from "@/components/classroom/CreateClassroomDialog";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import { PageTooltip } from "@/components/shared/PageTooltip";

interface TeacherDashboardContentProps {
    classrooms: any[];
    institutionId: string | null;
}

export function TeacherDashboardContent({ classrooms, institutionId }: TeacherDashboardContentProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClassrooms = useMemo(() => {
        if (!searchTerm.trim()) return classrooms;
        const term = searchTerm.toLowerCase();
        return classrooms.filter(
            (c: any) =>
                c.name?.toLowerCase().includes(term) ||
                c.subject?.toLowerCase().includes(term) ||
                c.section?.toLowerCase().includes(term)
        );
    }, [classrooms, searchTerm]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] py-4 sm:py-6 md:py-8"
        >
            <div className="w-full px-3 sm:px-4 md:px-6 lg:px-10 xl:px-12">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    className="mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                                Classrooms
                            </h1>
                            <PageTooltip description="Manage your classrooms, track student performance, and host live quizzes for your students." />
                        </div>
                        {institutionId && (
                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="inline-flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-xs font-bold hover:bg-orange-600 dark:hover:bg-orange-500 transition-all shadow-lg active:scale-[0.98] self-start sm:self-auto"
                            >
                                Create Classroom
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative group w-full">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search className={`h-4 w-4 transition-colors duration-200 ${searchTerm ? 'text-orange-500' : 'text-gray-400 dark:text-gray-500'}`} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search classrooms..."
                            className="block w-full pl-10 pr-9 py-2.5 bg-gray-50 dark:bg-[#24262C] border border-gray-200 dark:border-white/10 rounded-xl leading-5 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:bg-white dark:focus:bg-[#1D1E23] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 dark:focus:border-orange-500/50 sm:text-sm text-gray-900 dark:text-gray-100 transition-all duration-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoComplete="off"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-2xl"
                >
                    <TeacherClassroomList classrooms={filteredClassrooms} />
                </motion.div>

                {/* Dialogs */}
                {institutionId && (
                    <CreateClassroomDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        institutionId={institutionId}
                    />
                )}
            </div>
        </motion.div>
    );
}
