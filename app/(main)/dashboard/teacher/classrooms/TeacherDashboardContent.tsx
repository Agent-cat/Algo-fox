"use client";

import { useState } from "react";
import Link from "next/link";
import { TeacherClassroomList } from "@/components/classroom/TeacherClassroomList";
import { CreateClassroomDialog } from "@/components/classroom/CreateClassroomDialog";

interface TeacherDashboardContentProps {
    classrooms: any[];
    institutionId: string | null;
}

export function TeacherDashboardContent({ classrooms, institutionId }: TeacherDashboardContentProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-100 dark:border-[#262626] pb-8">
                    <div className="space-y-3">
                        <Link
                            href="/dashboard"
                            className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] hover:text-black dark:hover:text-white transition-colors"
                        >
                            ← Dashboard
                        </Link>
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                                Classrooms
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-lg">
                                Manage your learning environments and track student performance.
                            </p>
                        </div>
                    </div>

                    {institutionId && (
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:bg-orange-600 dark:hover:bg-gray-200 transition-all shadow-lg active:scale-[0.98]"
                        >
                            Create Classroom
                        </button>
                    )}
                </div>

                {/* Main Content */}
                <TeacherClassroomList classrooms={classrooms} />

                {/* Dialogs */}
                {institutionId && (
                    <CreateClassroomDialog
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        institutionId={institutionId}
                    />
                )}
            </div>
        </div>
    );
}
