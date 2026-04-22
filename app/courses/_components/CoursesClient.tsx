"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import ModeToggle from "../../../components/problems/ModeToggle";
import { CourseCard } from "../../../components/courses/CourseCard";
import { motion, AnimatePresence } from "framer-motion";
import CourseSearchBar from "../../../components/courses/CourseSearchBar";

interface CoursesClientProps {
    courses: any[];
    enrollments: any[];
}

export default function CoursesClient({ courses, enrollments }: CoursesClientProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // learn = Explore (All Courses), practice = My Learning (Enrolled Only)
    const mode = (searchParams.get("mode") as "practice" | "learn") || "learn";

    const setMode = (newMode: "practice" | "learn") => {
        const params = new URLSearchParams(searchParams.toString());
        if (newMode === "learn") {
            params.delete("mode");
        } else {
            params.set("mode", newMode);
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const enrolledCourses = courses
        .filter(course => enrollments.some(e => e.courseId === course.id))
        .sort((a, b) => {
            const enA = enrollments.find(e => e.courseId === a.id);
            const enB = enrollments.find(e => e.courseId === b.id);
            return (enB?.progress || 0) - (enA?.progress || 0);
        });

    const filteredCourses = mode === "practice" ? enrolledCourses : courses;

    return (
        <div className="space-y-12">
            <header className="mb-10">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-8 text-center">
                    Courses
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 w-full max-w-4xl mx-auto md:mx-0">
                        <CourseSearchBar />
                    </div>
                    <ModeToggle mode={mode} onModeChange={setMode} />
                </div>
            </header>

            <AnimatePresence mode="wait">
                <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-14"
                >
                    <section className="pt-2">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight capitalize">
                                {mode === "practice" ? "My Learning" : "Explore Catalog"}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => {
                                    const enrollment = enrollments.find(e => e.courseId === course.id);
                                    return (
                                        <CourseCard
                                            key={course.id}
                                            course={course}
                                            enrollment={enrollment}
                                        />
                                    );
                                })
                            ) : (
                                <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-dashed border-gray-200 dark:border-[#262626] text-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                                        {mode === "practice" ? "No Enrolled Courses" : "No Courses Found"}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {mode === "practice" ? "Explore the catalog to start learning something new!" : "We're preparing new content for you."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
