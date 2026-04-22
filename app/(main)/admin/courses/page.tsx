"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Eye, Users, BookOpen, ChevronRight } from "lucide-react";
import AdminListPage from "@/components/admin/AdminListPage";
import { getAdminCourses } from "@/actions/admin/course";
import { toast } from "sonner";
import DeleteCourseButton from "./_components/DeleteCourseButton";

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCourses = async () => {
        setIsLoading(true);
        try {
            const data = await getAdminCourses();
            setCourses(data);
        } catch (error) {
            toast.error("Failed to load courses");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="min-h-screen pt-4">
            <AdminListPage
                title="Manage Courses"
                subtitle="Build and manage learning paths for your students."
                createLink="/admin/courses/new"
                createLabel="New Course"
                data={courses}
                isLoading={isLoading}
                searchFields={["title", "description"]}
                columns={[
                    { label: "Course Details" },
                    { label: "Statistics" },
                    { label: "Status" },
                    { label: "Actions", className: "text-right" }
                ]}
                renderItem={(course) => (
                    <tr key={course.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1a1a] transition-colors group">
                        <td className="px-6 py-5">
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{course.title}</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1 mt-0.5">{course.description}</span>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Enrolled</span>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                                        <Users className="w-3.5 h-3.5 text-orange-500" />
                                        {course._count.enrollments}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Modules</span>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                                        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                                        {course._count.modules}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            {course.isPublished ? (
                                <span className="px-2.5 py-1 bg-green-500/10 text-green-600 dark:text-green-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-500/20">Published</span>
                            ) : (
                                <span className="px-2.5 py-1 bg-gray-100 dark:bg-[#1a1a1a] text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-200 dark:border-transparent">Draft</span>
                            )}
                        </td>
                        <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    href={`/admin/courses/${course.id}/modules`}
                                    className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-all"
                                    title="Curriculum"
                                >
                                    <BookOpen className="w-4 h-4" />
                                </Link>
                                <Link
                                    href={`/admin/courses/${course.id}/edit`}
                                    className="p-2.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
                                    title="Edit"
                                >
                                    <Edit className="w-4 h-4" />
                                </Link>
                                <DeleteCourseButton
                                    courseId={course.id}
                                    courseTitle={course.title}
                                    onSuccess={fetchCourses}
                                />
                            </div>
                        </td>
                    </tr>
                )}
            />
        </div>
    );
}
