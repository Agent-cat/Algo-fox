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
        <div className="min-h-screen bg-[#FFFFFF]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-gray-100 pb-8">
                    <div className="space-y-2">
                        <Link
                            href="/dashboard"
                            className="text-[10px] font-bold text-orange-600 uppercase tracking-widest hover:text-black transition-colors"
                        >
                            ← Dashboard
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-black tracking-tight">
                                Classrooms
                            </h1>
                            <p className="text-sm text-gray-400 max-w-lg font-medium">
                                Manage your learning environments and track student performance.
                            </p>
                        </div>
                    </div>

                    {institutionId && (
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="inline-flex items-center justify-center px-6 py-2.5 bg-black text-white rounded-md text-sm font-bold hover:bg-orange-600 transition-all active:scale-[0.98]"
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
