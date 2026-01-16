"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, Search, Mail, Download } from "lucide-react";
import { getTeacherAssignmentAnalytics } from "@/actions/assignment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface AssignmentAnalyticsViewProps {
    assignmentId: string;
    classroomId: string;
    onBack: () => void;
}

export function AssignmentAnalyticsView({ assignmentId, classroomId, onBack }: AssignmentAnalyticsViewProps) {
    const [analytics, setAnalytics] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const data = await getTeacherAssignmentAnalytics(assignmentId, classroomId);
                setAnalytics(data || []);
            } catch (error) {
                console.error("Failed to fetch analytics", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalytics();
    }, [assignmentId, classroomId]);

    const filteredAnalytics = analytics.filter(item =>
        item.student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.student.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const exportToExcel = () => {
        const headers = ["Student Name", "Email", "Completed Problems", "Total Problems", "Completion %", "Status"];
        const rows = analytics.map(item => [
            item.student.name || "Unknown",
            item.student.email,
            item.completedCount,
            item.totalCount,
            `${item.completionPercentage.toFixed(1)}%`,
            item.hasCompletedAll ? "Completed" : "In Progress"
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "assignment_report.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading analytics...</div>;
    }

    // Calculate Summary Stats
    const totalStudents = analytics.length;
    const fullyCompleted = analytics.filter(a => a.hasCompletedAll).length;
    const avgProgress = totalStudents > 0
        ? analytics.reduce((acc, curr) => acc + curr.completionPercentage, 0) / totalStudents
        : 0;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assignment Analytics</h2>
                        <p className="text-sm text-gray-500">Track student progress and submissions</p>
                    </div>
                </div>
                <Button onClick={exportToExcel} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export CSV
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1 font-medium">Completion Rate</div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">
                        {Math.round((fullyCompleted / totalStudents) * 100) || 0}%
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                        {fullyCompleted} of {totalStudents} students completed all problems
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1 font-medium">Avg. Progress</div>
                    <div className="text-3xl font-black text-gray-900 dark:text-white">
                        {Math.round(avgProgress)}%
                    </div>
                    <div className="h-1.5 mt-3 bg-gray-100 dark:bg-[#333] rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${avgProgress}%` }} />
                    </div>
                </div>
                <div className="p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl shadow-sm">
                    <div className="text-sm text-gray-500 mb-1 font-medium">Pending</div>
                    <div className="text-3xl font-black text-orange-600 dark:text-orange-500">
                        {totalStudents - fullyCompleted}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">Students still working</div>
                </div>
            </div>

            {/* Student List */}
            <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl overflow-hidden shadow-sm">
                <div className="p-4 border-b border-gray-50 dark:border-[#262626] flex items-center justify-between gap-4">
                    <h3 className="font-bold text-gray-900 dark:text-white">Student Progress ({filteredAnalytics.length})</h3>
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-9"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-[#202020]">
                            <tr>
                                <th className="px-6 py-3 font-medium">Student</th>
                                <th className="px-6 py-3 font-medium">Progress</th>
                                <th className="px-6 py-3 font-medium text-center">Solved</th>
                                <th className="px-6 py-3 font-medium text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-[#262626]">
                            {filteredAnalytics.map((item) => (
                                <tr key={item.student.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1f1f1f] transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#333] overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-500">
                                                {item.student.image ? (
                                                    <Image src={item.student.image} alt={item.student.name || ''} width={32} height={32} className="object-cover" />
                                                ) : (
                                                    item.student.name?.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-white">{item.student.name || "Unknown"}</div>
                                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {item.student.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 w-1/3">
                                        <div className="flex items-center gap-3">
                                            <div className={`h-2 flex-1 rounded-full overflow-hidden ${item.hasCompletedAll ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-[#333]'}`}>
                                                <div className={`h-full rounded-full transition-all ${item.hasCompletedAll ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${item.completionPercentage}%` }} />
                                            </div>
                                            <span className="text-xs font-bold w-9 text-right">{Math.round(item.completionPercentage)}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-[#333] dark:text-gray-300">
                                            {item.completedCount} / {item.totalCount}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {item.hasCompletedAll ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                Done
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
