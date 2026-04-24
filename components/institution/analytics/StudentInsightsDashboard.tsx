"use client";

import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Code2,
    Flame,
    Trophy,
    Medal,
    MapPin,
    GraduationCap,
    Crown,
    Star,
    Zap,
    Activity,
} from "lucide-react";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { ContestPerformanceCard } from "./ContestPerformanceCard";
import { CourseProgressCard } from "./CourseProgressCard";
import { ExternalPlatformCard } from "./ExternalPlatformCard";
import type { StudentInsights } from "@/actions/institution/analytics";
import type { PerformanceTier } from "@/lib/institution-analytics";

const TIER_CONFIG: Record<
    PerformanceTier,
    { label: string; icon: React.ElementType; className: string; glowClass: string }
> = {
    elite: {
        label: "Elite",
        icon: Crown,
        className:
            "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
        glowClass: "ring-1 ring-amber-400/30",
    },
    advanced: {
        label: "Advanced",
        icon: Star,
        className:
            "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30",
        glowClass: "ring-1 ring-emerald-400/30",
    },
    growing: {
        label: "Growing",
        icon: Zap,
        className:
            "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30",
        glowClass: "ring-1 ring-blue-400/30",
    },
    beginner: {
        label: "Beginner",
        icon: Activity,
        className:
            "bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#262626]",
        glowClass: "",
    },
};

interface StudentInsightsDashboardProps {
    student: StudentInsights;
}

export function StudentInsightsDashboard({ student }: StudentInsightsDashboardProps) {
    const router = useRouter();
    const tier = TIER_CONFIG[student.tier];
    const TierIcon = tier.icon;

    const badgeTotal = student.goldBadges + student.silverBadges + student.bronzeBadges;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {/* Back + Student Header */}
            <div className="flex flex-col gap-6">
                <button
                    onClick={() => router.push("/dashboard/institution/analytics")}
                    className="flex items-center gap-2 text-xs font-black text-gray-400 dark:text-gray-500 hover:text-orange-500 dark:hover:text-orange-400 transition-all w-fit group uppercase tracking-widest"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    Back to Registry
                </button>

                {/* Student Profile Header - Command Center Style */}
                <div className="relative bg-white dark:bg-[#141414] rounded-[2.5rem] border border-dashed border-gray-300 dark:border-[#262626] p-8 lg:p-10 overflow-hidden shadow-2xl shadow-orange-500/5">
                    {/* Background Decorative Pattern */}
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-l from-orange-500 to-transparent" />
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 L100 0 L100 100 Z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className="relative flex flex-col lg:flex-row items-center lg:items-center gap-10">
                        {/* Avatar Hub */}
                        <div className="relative flex-shrink-0">
                            <div className={`w-32 h-32 rounded-[2rem] bg-gray-50 dark:bg-[#1a1a1a] border-4 border-white dark:border-[#141414] shadow-2xl flex items-center justify-center overflow-hidden ${tier.glowClass}`}>
                                {student.image ? (
                                    <img
                                        src={student.image}
                                        alt={student.name}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <span className="text-4xl font-black text-gray-300 dark:text-gray-600">
                                        {student.name?.[0]?.toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl border-4 border-white dark:border-[#141414] ${tier.className} flex items-center justify-center shadow-lg`}>
                                <TierIcon className="w-5 h-5" />
                            </div>
                        </div>

                        {/* Core Identity */}
                        <div className="flex-1 min-w-0 text-center lg:text-left">
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-4">
                                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                                    {student.name}
                                </h1>
                                <div className="flex gap-2">
                                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black bg-orange-500 text-white shadow-lg shadow-orange-500/20 uppercase tracking-widest">
                                        Rank #{student.institutionRank}
                                    </span>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${tier.className}`}>
                                        {tier.label} Specialist
                                    </span>
                                </div>
                            </div>

                            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 font-medium">
                                {student.email}
                            </p>

                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 dark:text-gray-400">
                                {student.branch && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#262626]">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        <span className="font-bold">{student.branch}</span>
                                    </div>
                                )}
                                {student.year && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#262626]">
                                        <GraduationCap className="w-4 h-4 text-blue-500" />
                                        <span className="font-bold">Batch of {new Date().getFullYear() + (4 - student.year)}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* High-Impact Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 flex-shrink-0 w-full lg:w-auto">
                            <QuickStat
                                icon={<Code2 className="w-5 h-5 text-blue-500" />}
                                value={student.problemsSolved}
                                label="Concepts Mastered"
                            />
                            <QuickStat
                                icon={<Trophy className="w-5 h-5 text-orange-500" />}
                                value={student.totalScore.toLocaleString()}
                                label="Global Influence"
                            />
                            <QuickStat
                                icon={<Flame className="w-5 h-5 text-red-500" />}
                                value={`${student.currentStreak}d`}
                                label="Continuous Focus"
                            />
                            <QuickStat
                                icon={<Medal className="w-5 h-5 text-amber-500" />}
                                value={badgeTotal}
                                label="Total Honors"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bento Grid - Row 1: Contest + Platform */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-8 min-h-[320px]">
                    <ContestPerformanceCard data={student.contestPerformance} />
                </div>
                <div className="lg:col-span-4 min-h-[320px]">
                    <ExternalPlatformCard student={student} />
                </div>
            </div>

            {/* Row 2: Course Progress */}
            <CourseProgressCard courses={student.courseEnrollments} />

            {/* Row 3: Activity Heatmap */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 flex items-center justify-center">
                            <Activity className="w-4.5 h-4.5 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                                Submission Activity
                            </h3>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                Daily submission intensity · last 12 months
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <ActivityHeatmap submissions={student.submissions} />
                </div>
            </div>

            {/* Row 4: Badges + Streak Detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatDetailCard
                    label="Problems Solved"
                    value={student.problemsSolved}
                    sub="total accepted"
                    color="blue"
                />
                <StatDetailCard
                    label="Total Score"
                    value={student.totalScore.toLocaleString()}
                    sub="cumulative points"
                    color="orange"
                />
                <StatDetailCard
                    label="Current Streak"
                    value={`${student.currentStreak}d`}
                    sub={`best: ${student.longestStreak}d`}
                    color="red"
                />
                <StatDetailCard
                    label="Contests"
                    value={student.contestPerformance.length}
                    sub="participated"
                    color="purple"
                />
            </div>
        </div>
    );
}

function QuickStat({
    icon,
    value,
    label,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
}) {
    return (
        <div className="flex flex-col items-center lg:items-start bg-gray-50/50 dark:bg-[#1a1a1a]/50 backdrop-blur-sm border border-gray-100 dark:border-[#262626] rounded-2xl p-4 min-w-[140px] transition-all hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-xl group">
            <div className="mb-3 p-2 bg-white dark:bg-[#0a0a0a] rounded-xl shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
            <p className="text-2xl font-black text-gray-900 dark:text-white tabular-nums leading-none mb-1">
                {value}
            </p>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {label}
            </p>
        </div>
    );
}

function StatDetailCard({
    label,
    value,
    sub,
    color,
}: {
    label: string;
    value: string | number;
    sub: string;
    color: "blue" | "orange" | "red" | "purple";
}) {
    const colorMap = {
        blue: "bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-500",
        orange: "bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20 text-orange-500",
        red: "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-500",
        purple: "bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/20 text-purple-500",
    };

    return (
        <div className={`rounded-2xl border p-5 ${colorMap[color]}`}>
            <p className="text-2xl font-black tabular-nums mb-1">{value}</p>
            <p className="text-sm font-bold text-gray-900 dark:text-white">{label}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
        </div>
    );
}
