"use client";

import { School, BookOpen, User, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Classroom {
    id: string;
    name: string;
    section: string | null;
    subject: string | null;
    teacher: {
        name: string | null;
    };
}

interface StudentClassroomListProps {
    classrooms: Classroom[];
}

export function StudentClassroomList({ classrooms }: StudentClassroomListProps) {
    if (classrooms.length === 0) {
        return (
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-8 text-center">
                <div className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                    <School className="w-7 h-7 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Batches Yet</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[200px] mx-auto">
                    Use a join code to enroll in a classroom and start learning.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 px-1">
                <School className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                My Batches
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {classrooms.map((classroom) => (
                    <Link
                        key={classroom.id}
                        href={`/dashboard/classrooms/${classroom.id}`}
                        className="group bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-5 hover:border-indigo-500 dark:hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-indigo-50 dark:bg-[#1a1a1a] rounded-xl text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {classroom.name}
                                </h4>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <User className="w-3.5 h-3.5" />
                                        {classroom.teacher.name || "Unknown Teacher"}
                                    </div>
                                    {classroom.section && (
                                        <>
                                            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Section {classroom.section}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                ))}
            </div>
        </div>
    );
}
