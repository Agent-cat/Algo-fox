"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    UserCircle2,
    AlertCircle
} from "lucide-react";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { CourseProgressCard } from "./CourseProgressCard";
import { ContestDetailedView } from "./ContestDetailedView";
import { PlatformDetailedView } from "./PlatformDetailedView";
import { LanguagesCard } from "@/components/dashboard/LanguagesCard";
import { RecentSubmissionsCard } from "@/components/dashboard/RecentSubmissionsCard";
import { UserProfileCard } from "@/components/dashboard/UserProfileCard";
import { ProfilesStatusCard } from "@/components/dashboard/ProfilesStatusCard";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { ProblemOverviewCard } from "@/components/dashboard/ProblemOverviewCard";
import type { StudentInsights } from "@/actions/institution/analytics";

interface StudentInsightsDashboardProps {
    student: StudentInsights;
}

export function StudentInsightsDashboard({ student }: StudentInsightsDashboardProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const view = searchParams.get("view");
    const platform = searchParams.get("p") as any;

    const handleViewContests = () => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", "contest");
        router.push(`?${params.toString()}`);
    };

    const handleViewPlatform = (p: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", "platform");
        params.set("p", p);
        router.push(`?${params.toString()}`);
    };

    if (view === "contest") {
        return (
            <ContestDetailedView
                studentName={student.name}
                studentId={student.id}
                performance={student.contestPerformance}
            />
        );
    }

    if (view === "platform") {
        const handle = platform === "LeetCode" ? student.leetCodeHandle : platform === "CodeChef" ? student.codeChefHandle : student.codeforcesHandle;
        if (handle) {
            return (
                <PlatformDetailedView
                    platform={platform}
                    handle={handle}
                    studentName={student.name}
                    studentId={student.id}
                />
            );
        } else {
            return (
                <div className="flex flex-col items-center justify-center py-40 gap-6 animate-in fade-in duration-500 max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 rounded-3xl bg-red-500/10 flex items-center justify-center">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Missing Platform Link</h2>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">
                            This student has not linked their <span className="font-bold text-orange-500">{platform}</span> account yet.
                            Detailed analytics cannot be retrieved.
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.delete("view");
                            params.delete("p");
                            router.push(`?${params.toString()}`);
                        }}
                        className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white transition-all shadow-lg active:scale-95"
                    >
                        Back to Overview
                    </button>
                </div>
            );
        }
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 max-w-7xl mx-auto">
            {/* Header: Back Button + Metadata */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    onClick={() => router.push("/dashboard/institution/analytics")}
                    className="flex items-center gap-2 text-xs font-black text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all w-fit group uppercase tracking-widest"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Institution Registry
                </button>

                <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest">
                        Rank #{student.institutionRank}
                    </div>
                    <div className="px-4 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black uppercase tracking-widest">
                        {student.tier} Specialist
                    </div>
                </div>
            </div>

            {/* Main 3:9 Dashboard Layout - Exact Student View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Information Sidebar (col-span-3) */}
                <aside className="lg:col-span-3 space-y-6">
                    <UserProfileCard
                        name={student.name}
                        email={student.email}
                        image={student.image}
                        bio={student.bio}
                        leetCodeHandle={student.leetCodeHandle}
                        codeChefHandle={student.codeChefHandle}
                        codeforcesHandle={student.codeforcesHandle}
                        readonly={true}
                        institutionName={student.branch ?? undefined}
                    />

                    <ProfilesStatusCard
                        user={{
                            leetCodeHandle: student.leetCodeHandle,
                            leetCodeVerified: student.leetCodeVerified,
                            codeChefHandle: student.codeChefHandle,
                            codeChefVerified: student.codeChefVerified,
                            codeforcesHandle: student.codeforcesHandle,
                            codeforcesVerified: student.codeforcesVerified,
                        }}
                    />

                    <AchievementsCard
                        badges={{
                            gold: student.goldBadges,
                            silver: student.silverBadges,
                            bronze: student.bronzeBadges,
                        }}
                    />

                    <LanguagesCard languageCounts={student.languageCounts} />

                    <div className="hidden lg:block pt-4 border-t border-dashed border-gray-200 dark:border-[#262626]">
                         <CourseProgressCard courses={student.courseEnrollments} />
                    </div>
                </aside>

                {/* Performance Analytics (col-span-9) */}
                <main className="lg:col-span-9 space-y-8">

                    <ProblemOverviewCard
                        solvedByDifficulty={student.solvedByDifficulty}
                        totalProblems={student.totalPlatformProblems}
                        problemsSolved={student.problemsSolved}
                        leetCodeHandle={student.leetCodeHandle}
                        codeChefHandle={student.codeChefHandle}
                        codeforcesHandle={student.codeforcesHandle}
                        leetCodeVerified={student.leetCodeVerified}
                        codeChefVerified={student.codeChefVerified}
                        codeforcesVerified={student.codeforcesVerified}
                        contestStats={{
                            attended: student.contestPerformance.length,
                            totalScore: student.totalScore,
                            performance: student.contestPerformance
                        }}
                        managerViews={{
                            onViewContests: handleViewContests,
                            onViewPlatform: handleViewPlatform
                        }}
                    />

                    <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-md transition-shadow duration-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Submission Activity
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {student.heatmapSubmissions.length} submissions recently
                            </p>
                        </div>
                        <div className="p-6">
                            <ActivityHeatmap submissions={student.heatmapSubmissions} />
                        </div>
                    </div>

                    <RecentSubmissionsCard submissions={student.submissions as any} />

                    <div className="lg:hidden">
                        <CourseProgressCard courses={student.courseEnrollments} />
                    </div>
                </main>
            </div>
        </div>
    );
}
