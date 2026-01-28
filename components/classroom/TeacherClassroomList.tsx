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
            <div className="text-center py-20 bg-gray-50/50 dark:bg-[#141414] rounded-2xl border border-dashed border-gray-200 dark:border-[#262626]">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-2">No Active Classrooms</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Create your first learning environment above.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom) => (
                <div
                    key={classroom.id}
                    className="group flex flex-col bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] p-6 rounded-md hover:border-orange-500 dark:hover:border-orange-500 shadow-sm dark:shadow-none"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">
                                Classroom
                            </span>
                            <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-orange-600 transition-colors">
                                {classroom.name}
                            </h3>
                        </div>
                        <div className="px-2 py-1 bg-gray-50 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase rounded">
                            {classroom._count.students} Students
                        </div>
                    </div>

                    <div className="flex-grow flex flex-wrap gap-2 mb-6">
                        {classroom.subject && (
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide px-2 py-1 bg-gray-50 dark:bg-[#1a1a1a] rounded">
                                {classroom.subject}
                            </span>
                        )}
                        {classroom.section && (
                            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide px-2 py-1 bg-gray-50 dark:bg-[#1a1a1a] rounded">
                                Sec {classroom.section}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 pt-4 border-t border-gray-50 dark:border-[#262626]">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <span className="text-[9px] font-bold text-gray-300 dark:text-gray-600 uppercase block">Join Link</span>
                                <button
                                    onClick={() => copyLink(classroom.joinCode, classroom.id)}
                                    className="text-lg font-bold font-mono text-black dark:text-white hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                                >
                                    {classroom.joinCode}
                                    <span className="ml-2 text-[8px] font-bold text-orange-600 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                                        {copiedId === classroom.id ? "Copied" : "Copy Link"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <Link
                            href={`/dashboard/classrooms/${classroom.id}`}
                            className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black text-center font-bold text-xs uppercase rounded-md hover:bg-orange-600 dark:hover:bg-gray-200 transition-all"
                        >
                            Open
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
