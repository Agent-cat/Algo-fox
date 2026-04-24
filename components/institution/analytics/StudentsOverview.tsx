"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    ChevronRight,
    Flame,
    Code2,
    Trophy,
    BookOpen,
    Users,
    Filter,
    Sparkles,
    TrendingUp,
    Star,
    Zap,
} from "lucide-react";
import { StudentSparkline } from "./StudentSparkline";
import type { StudentOverviewItem } from "@/actions/institution/analytics";
import type { PerformanceTier } from "@/lib/institution-analytics";

const TIER_CONFIG: Record<
    PerformanceTier,
    { label: string; className: string; dotClass: string }
> = {
    elite: {
        label: "Elite",
        className:
            "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30",
        dotClass: "bg-amber-500",
    },
    advanced: {
        label: "Advanced",
        className:
            "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30",
        dotClass: "bg-emerald-500",
    },
    growing: {
        label: "Growing",
        className:
            "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30",
        dotClass: "bg-blue-500",
    },
    beginner: {
        label: "Beginner",
        className:
            "bg-gray-50 dark:bg-[#1a1a1a] text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-[#262626]",
        dotClass: "bg-gray-400",
    },
};

const SPARKLINE_COLORS: Record<PerformanceTier, string> = {
    elite: "#f59e0b",
    advanced: "#10b981",
    growing: "#3b82f6",
    beginner: "#9ca3af",
};

interface StudentsOverviewProps {
    initialStudents: StudentOverviewItem[];
    branches: string[];
    years: number[];
}

export function StudentsOverview({
    initialStudents,
    branches,
    years,
}: StudentsOverviewProps) {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [selectedTier, setSelectedTier] = useState<PerformanceTier | "all">("all");
    const [selectedBranch, setSelectedBranch] = useState<string>("all");
    const [selectedYear, setSelectedYear] = useState<number | "all">("all");

    const filtered = useMemo(() => {
        let result = initialStudents;

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (s) =>
                    s.name.toLowerCase().includes(q) ||
                    s.email.toLowerCase().includes(q) ||
                    (s.branch?.toLowerCase().includes(q) ?? false)
            );
        }

        if (selectedTier !== "all") {
            result = result.filter((s) => s.tier === selectedTier);
        }

        if (selectedBranch !== "all") {
            result = result.filter((s) => s.branch === selectedBranch);
        }

        if (selectedYear !== "all") {
            result = result.filter((s) => s.year === selectedYear);
        }

        return result;
    }, [initialStudents, search, selectedTier, selectedBranch, selectedYear]);

    const tierCounts = useMemo(() => {
        return initialStudents.reduce(
            (acc, s) => {
                acc[s.tier] = (acc[s.tier] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>
        );
    }, [initialStudents]);

    const handleStudentClick = (studentId: string) => {
        router.push(`/dashboard/institution/analytics?student=${studentId}`);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header + Quick Stats */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-[#141414] border border-dashed border-gray-200 dark:border-[#262626] rounded-3xl p-6 lg:p-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                        </div>
                        <span className="text-sm font-black text-orange-500 uppercase tracking-[0.2em]">
                            Intelligence
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
                        Student Analytics
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-3 font-medium text-lg">
                        Monitoring <span className="text-gray-900 dark:text-white font-bold">{initialStudents.length}</span> active minds in your institution
                    </p>
                </div>

                {/* Summary Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(["elite", "advanced", "growing", "beginner"] as PerformanceTier[]).map((tier) => (
                        <div
                            key={tier}
                            className={`flex flex-col p-3 rounded-2xl border border-dashed transition-colors ${TIER_CONFIG[tier].className}`}
                        >
                            <span className="text-[10px] font-black uppercase tracking-wider opacity-70 mb-1">
                                {TIER_CONFIG[tier].label}
                            </span>
                            <span className="text-2xl font-black tabular-nums">
                                {tierCounts[tier] || 0}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search + Filters Glass Bar */}
            <div className="sticky top-0 z-10 py-2 -mx-2 px-2 bg-gray-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md">
                <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Identify a student by name, email, or department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:bg-white dark:focus:bg-[#0a0a0a] focus:border-orange-500/50 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all font-medium"
                        />
                    </div>

                    {/* Filter Row */}
                    <div className="flex flex-wrap gap-2 items-center lg:border-l lg:pl-4 dark:border-[#262626]">
                        <div className="flex items-center gap-1.5 mr-2">
                            <Filter className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filters</span>
                        </div>

                        <div className="flex bg-gray-100 dark:bg-[#1a1a1a] p-1 rounded-xl">
                            <button
                                onClick={() => setSelectedTier("all")}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    selectedTier === "all"
                                        ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm"
                                        : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                All
                            </button>
                            {(["elite", "advanced"] as PerformanceTier[]).map((tier) => (
                                <button
                                    key={tier}
                                    onClick={() => setSelectedTier(selectedTier === tier ? "all" : tier)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        selectedTier === tier
                                            ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                                >
                                    {TIER_CONFIG[tier].label}
                                </button>
                            ))}
                        </div>

                        {branches.length > 0 && (
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="px-4 py-2 text-xs font-bold bg-gray-100 dark:bg-[#1a1a1a] border-none rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500/20"
                            >
                                <option value="all">All Departments</option>
                                {branches.map((b) => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        )}

                        {years.length > 0 && (
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value === "all" ? "all" : Number(e.target.value))}
                                className="px-4 py-2 text-xs font-bold bg-gray-100 dark:bg-[#1a1a1a] border-none rounded-xl text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-orange-500/20"
                            >
                                <option value="all">All Batches</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>Year {y}</option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>

            {/* Student List */}
            {filtered.length === 0 ? (
                <div className="text-center py-32 bg-white dark:bg-[#141414] rounded-3xl border border-dashed border-gray-200 dark:border-[#262626]">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="text-lg font-black text-gray-400 dark:text-gray-500">
                        No matches found
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-600 mt-1 max-w-xs mx-auto">
                        We couldn't find any students matching your current filter criteria.
                    </p>
                    <button
                        onClick={() => { setSearch(""); setSelectedTier("all"); setSelectedBranch("all"); setSelectedYear("all"); }}
                        className="mt-6 px-6 py-2 bg-orange-500 text-white text-xs font-black rounded-xl hover:bg-orange-600 transition-colors uppercase tracking-widest"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filtered.map((student) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            onClick={() => handleStudentClick(student.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function StudentCard({
    student,
    onClick,
}: {
    student: StudentOverviewItem;
    onClick: () => void;
}) {
    const tier = TIER_CONFIG[student.tier];
    const sparklineColor = SPARKLINE_COLORS[student.tier];

    return (
        <button
            onClick={onClick}
            className="group w-full bg-white dark:bg-[#141414] border border-dashed border-gray-200 dark:border-[#262626] rounded-3xl p-4 md:p-6 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 hover:border-orange-500/40 transition-all duration-300 relative overflow-hidden text-left"
        >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Ranking & Avatar */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-center justify-center w-12 text-gray-300 dark:text-gray-600 font-black italic">
                        <span className="text-[10px] uppercase not-italic opacity-50">Rank</span>
                        <span className="text-xl tabular-nums">#{student.rank}</span>
                    </div>

                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#1a1a1a] border-2 border-gray-200 dark:border-[#262626] flex items-center justify-center overflow-hidden group-hover:border-orange-500/30 transition-colors">
                            {student.image ? (
                                <img
                                    src={student.image}
                                    alt={student.name}
                                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <span className="text-2xl font-black text-gray-300 dark:text-gray-600">
                                    {student.name?.[0]?.toUpperCase()}
                                </span>
                            )}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-white dark:border-[#141414] ${tier.dotClass} shadow-sm`} />
                    </div>
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-xl font-black text-gray-900 dark:text-white truncate">
                            {student.name}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${tier.className}`}>
                            {tier.label}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 font-medium">
                        <span className="truncate">{student.email}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                        <span>{student.branch || "General"}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                        <span>Year {student.year}</span>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="flex items-center gap-8 md:px-8 md:border-l md:border-dashed md:border-gray-200 md:dark:border-[#262626]">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            <Code2 className="w-3 h-3" /> Solved
                        </span>
                        <span className="text-lg font-black text-gray-900 dark:text-white tabular-nums">
                            {student.problemsSolved}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            <Trophy className="w-3 h-3" /> Score
                        </span>
                        <span className="text-lg font-black text-gray-900 dark:text-white tabular-nums">
                            {student.totalScore.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                            <Flame className="w-3 h-3" /> Streak
                        </span>
                        <span className="text-lg font-black text-red-500 tabular-nums">
                            {student.currentStreak}d
                        </span>
                    </div>
                </div>

                {/* Sparkline & Action */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-3 min-w-[120px]">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Activity</span>
                        <StudentSparkline
                            data={student.sparkline}
                            color={sparklineColor}
                            width={100}
                            height={32}
                        />
                    </div>
                    <div className="flex items-center gap-1 text-xs font-black text-orange-500 uppercase tracking-wider group-hover:gap-2 transition-all">
                        Full Insights
                        <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-orange-500/5 blur-3xl rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
        </button>
    );
}

function StatMini({
    icon,
    label,
    value,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    color: string;
}) {
    return (
        <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-2 text-center">
            <div className={`flex items-center justify-center gap-1 ${color} mb-0.5`}>
                {icon}
            </div>
            <p className="text-xs font-black text-gray-900 dark:text-white tabular-nums">
                {value}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{label}</p>
        </div>
    );
}
