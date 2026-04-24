import Navbar from "@/components/Navbar";
import { CourseService } from "@/core/services/course.service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Metadata } from "next";
import CourseDetailClient from "./_components/CourseDetailClient";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const course = await CourseService.getCourseBySlug(slug);
    if (!course) return { title: "Course Not Found" };
    return {
        title: course.title,
        description: course.description
    };
}

async function CourseContent({ slug }: { slug: string }) {
    const session = await auth.api.getSession({ headers: await headers() });
    const course = await CourseService.getCourseBySlug(slug);

    if (!course) {
        notFound();
    }

    const enrollment = session?.user
        ? await CourseService.getEnrollment(session.user.id, course.id)
        : null;

    // Get solved counts for each module (category) if user is logged in
    let solvedMap = new Map<string, number>();
    if (session?.user) {
        const solvedCountsRaw = await prisma.$queryRaw<any[]>`
            SELECT
                cp."categoryId",
                CAST(COUNT(DISTINCT cp."problemId") AS INTEGER) as "count"
            FROM "CategoryProblem" cp
            JOIN "Submission" s ON cp."problemId" = s."problemId"
            WHERE s."userId" = ${session.user.id}
                AND s."status" = 'ACCEPTED'::"SubmissionResult"
                AND s."mode" = 'SUBMIT'::"SubmissionMode"
            GROUP BY cp."categoryId"
        `;
        solvedCountsRaw.forEach((row: any) => {
            solvedMap.set(row.categoryId, row.count);
        });
    }

    // Format modules to match the "Category" interface expected by LearnMode
    const formattedModules = course.modules.map((mod: any) => ({
        id: mod.id,
        name: mod.name,
        description: mod.description || "",
        slug: mod.slug || mod.id, // Fallback to ID if no slug
        order: mod.order,
        parentId: mod.parentId,
        solvedCount: solvedMap.get(mod.id) || 0,
        _count: {
            categoryProblems: mod.categoryProblems.length
        },
        // Include problem titles for better client-side search
        problemTitles: mod.categoryProblems.map((cp: any) => cp.problem.title)
    }));

    // Get total solved problem IDs for the user in this course
    const solvedProblemIds = session?.user ? new Set(
        (await prisma.submission.findMany({
            where: {
                userId: session.user.id,
                status: 'ACCEPTED',
                mode: 'SUBMIT',
                problemId: { in: course.modules.flatMap(m => m.categoryProblems.map(cp => cp.problemId)) }
            },
            select: { problemId: true }
        })).map(s => s.problemId)
    ) : new Set<string>();

    const totalProblems = course.modules.flatMap(m => m.categoryProblems).length;
    const solvedCount = solvedProblemIds.size;
    const progress = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

    return (
        <CourseDetailClient
            course={course}
            enrollment={enrollment}
            initialModules={formattedModules}
            userRole={session?.user?.role || "STUDENT"}
            progress={progress}
            solvedCount={solvedCount}
            totalProblems={totalProblems}
            session={session}
        />
    );
}

function CourseSkeleton() {
    return (
        <div className="space-y-10 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white/80 dark:bg-[#121212]/80 border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="flex-1 space-y-6 w-full">
                        <div className="flex gap-2">
                            <div className="h-5 w-16 bg-gray-200/50 dark:bg-white/5 rounded-full" />
                            <div className="h-5 w-24 bg-gray-200/50 dark:bg-white/5 rounded-full" />
                        </div>
                        <div className="h-10 w-2/3 bg-gray-200/50 dark:bg-white/5 rounded-xl" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                            <div className="h-4 w-4/5 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                        </div>
                        <div className="pt-4 space-y-3">
                            <div className="flex justify-between">
                                <div className="h-3 w-32 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                                <div className="h-3 w-20 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                            </div>
                            <div className="h-3 w-full bg-gray-200/50 dark:bg-white/5 rounded-full" />
                        </div>
                    </div>
                    <div className="w-full md:w-64 h-14 bg-gray-200/50 dark:bg-white/5 rounded-2xl shrink-0" />
                </div>
            </div>

            {/* Modules List Skeleton */}
            <div className="max-w-7xl mx-auto space-y-8 pt-6">
                <div className="flex justify-end">
                    <div className="h-10 w-full md:max-w-xs bg-gray-200/50 dark:bg-white/5 rounded-xl" />
                </div>

                <div className="space-y-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white/40 dark:bg-[#121212]/40 border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 flex items-center justify-between">
                            <div className="flex items-center gap-5 flex-1">
                                <div className="p-3 w-12 h-12 rounded-2xl bg-gray-200/50 dark:bg-white/5 shadow-sm" />
                                <div className="space-y-2 flex-1 max-w-sm">
                                    <div className="h-5 w-48 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                                    <div className="h-3 w-32 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                                </div>
                            </div>
                            <div className="hidden md:flex items-center gap-8">
                                <div className="flex items-center gap-4 w-[280px]">
                                    <div className="flex-1 h-2 bg-gray-200/50 dark:bg-white/5 rounded-full" />
                                    <div className="h-3 w-10 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                                </div>
                                <div className="h-6 w-6 bg-gray-200/50 dark:bg-white/5 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function CourseDetailPage({ params }: Props) {
    const { slug } = await params;

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212]">
            <Suspense fallback={<div className="h-16 w-full" />}>
                <Navbar />
            </Suspense>

            <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <div className="mb-8">
                    <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Courses
                    </Link>
                </div>

                <Suspense fallback={<CourseSkeleton />}>
                    <CourseContent slug={slug} />
                </Suspense>
            </main>
        </div>
    );
}
