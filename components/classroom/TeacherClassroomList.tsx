"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

interface Classroom {
    id: string;
    name: string;
    section: string | null;
    subject: string | null;
    joinCode: string;
    _count: {
        students: number;
    };
    createdAt: Date;
}

interface TeacherClassroomListProps {
    classrooms: Classroom[];
}

export function TeacherClassroomList({ classrooms }: TeacherClassroomListProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copyLink = (code: string, id: string) => {
        const url = `${window.location.origin}/join-classroom/${code}`;
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        toast.success("Join link copied!");
        setTimeout(() => setCopiedId(null), 2000);
    };

    if (classrooms.length === 0) {
        return (
            <div className="text-center py-16 sm:py-20 bg-gray-50/50 dark:bg-[#24262C]/50 rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-2">No Active Classrooms</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Create your first learning environment above.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {classrooms.map((classroom) => (
                <div
                    key={classroom.id}
                    className="group flex flex-col bg-white dark:bg-[#24262C] border border-gray-100 dark:border-white/10 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:shadow-md dark:hover:shadow-black/20 transition-all duration-200"
                >
                    <div className="flex justify-between items-start mb-4 sm:mb-5 md:mb-6">
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] sm:text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-1">
                                Classroom
                            </span>
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors truncate">
                                {classroom.name}
                            </h3>
                        </div>
                        <div className="px-2 py-1 bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 text-[9px] sm:text-[10px] font-bold uppercase rounded-md shrink-0 ml-2">
                            {classroom._count.students} Students
                        </div>
                    </div>

                    <div className="flex-grow flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5 md:mb-6">
                        {classroom.subject && (
                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide px-2 py-1 bg-gray-50 dark:bg-white/5 rounded-md">
                                {classroom.subject}
                            </span>
                        )}
                        {classroom.section && (
                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide px-2 py-1 bg-gray-50 dark:bg-white/5 rounded-md">
                                Sec {classroom.section}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-100 dark:border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1 min-w-0">
                                <span className="text-[8px] sm:text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase block">Join Link</span>
                                <button
                                    onClick={() => copyLink(classroom.joinCode, classroom.id)}
                                    className="text-sm sm:text-base md:text-lg font-bold font-mono text-gray-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 transition-colors truncate block"
                                >
                                    {classroom.joinCode}
                                    <span className="ml-2 text-[7px] sm:text-[8px] font-bold text-orange-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                        {copiedId === classroom.id ? "Copied" : "Copy Link"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <Link
                            href={`/dashboard/classrooms/${classroom.id}`}
                            className="w-full py-2 sm:py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-center font-bold text-[10px] sm:text-xs uppercase rounded-lg sm:rounded-xl hover:bg-orange-600 dark:hover:bg-orange-500 transition-all active:scale-[0.98]"
                        >
                            Open
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
