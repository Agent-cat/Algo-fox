import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ModuleManager from "@/components/admin/ModuleManager";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function CourseModulesPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            modules: {
                include: {
                    categoryProblems: {
                        include: {
                            problem: true
                        },
                        orderBy: { order: "asc" }
                    }
                },
                orderBy: { order: "asc" }
            }
        }
    });

    if (!course) notFound();

    return (
        <div className="space-y-8 max-w-7xl mx-auto py-8">
            <div className="flex flex-col gap-6">
                <Link
                    href="/admin/courses"
                    className="group inline-flex items-center gap-2 text-[10px] font-black text-gray-400 hover:text-orange-500 transition-all uppercase tracking-[0.2em]"
                >
                    <ChevronLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    Back to Course Management
                </Link>

                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
                        {course.title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest opacity-80">
                        Curriculum Architecture • {course.domain} • {course.modules.length} Modules
                    </p>
                </div>
            </div>

            <ModuleManager course={course} />
        </div>
    );
}
