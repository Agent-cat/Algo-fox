import Link from "next/link";
import { GraduationCap, Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

interface CourseCardProps {
    course: {
        id: string;
        title: string;
        slug: string;
        description: string;
        image?: string | null;
        difficulty: string;
        tags: string[];
        duration?: string | null;
        _count?: {
            modules: number;
        };
    };
    enrollment?: {
        progress: number;
        completedAt?: Date | null;
    } | null;
}

export function CourseCard({ course, enrollment }: CourseCardProps) {
    return (
        <div className="group bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#262626] overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-video overflow-hidden">
                {course.image ? (
                    <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-[#262626] flex items-center justify-center">
                        <GraduationCap className="w-12 h-12 text-gray-300 dark:text-[#333]" />
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col grow">
                <h3 className="text-[17px] font-bold text-gray-900 dark:text-gray-100 mb-1 leading-tight line-clamp-2">
                    {course.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                    Instructor
                </p>

                <div className="mt-auto">
                    {enrollment ? (
                        <div className="space-y-3">
                            {/* Progress Bar matching image (indigo/purple) */}
                            <div className="h-1 w-full bg-gray-100 dark:bg-[#262626] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-1000"
                                    style={{ width: `${enrollment.progress}%` }}
                                />
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-[13px] font-bold text-gray-700 dark:text-gray-300">
                                    {Math.round(enrollment.progress)}% complete
                                </span>
                            </div>

                            <Link
                                href={`/courses/${course.slug}`}
                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:bg-black dark:hover:bg-gray-100 transition-all mt-2"
                            >
                                Continue Learning
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <GraduationCap className="w-4 h-4" />
                                <span className="text-xs font-bold">{course._count?.modules || 0} Modules</span>
                            </div>

                            <Link
                                href={`/courses/${course.slug}`}
                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:bg-black dark:hover:bg-gray-100 transition-all shadow-sm"
                            >
                                Register
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

