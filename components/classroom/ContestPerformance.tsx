"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ChevronRight, Trophy, Download, Loader2, User, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getClassroomContestPerformance } from "@/actions/classroom";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface PerformanceRow {
    studentId: string;
    studentName: string;
    collegeId: string;
    branch: string;
    image: string | null;
    contestName: string;
    contestPoints: number;
    totalPoints: number;
}

interface ContestPerformanceProps {
    classroomId: string;
}

const ITEMS_PER_PAGE = 20;

export function ContestPerformance({ classroomId }: ContestPerformanceProps) {
    const [data, setData] = useState<PerformanceRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState<'name_asc' | 'name_desc' | 'points_desc' | 'points_asc' | 'contest_asc' | 'contest_desc'>('points_desc');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await getClassroomContestPerformance(classroomId);
                if (res.success && res.data) {
                    setData(res.data);
                } else {
                    toast.error(res.error || "Failed to load performance data");
                }
            } catch (error) {
                toast.error("An error occurred while fetching data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [classroomId]);

    const { pivotedData, allContestNames } = useMemo(() => {
        const studentMap = new Map<string, any>();
        const contestsSet = new Set<string>();

        data.forEach(row => {
            contestsSet.add(row.contestName);
            if (!studentMap.has(row.studentId)) {
                studentMap.set(row.studentId, {
                    studentId: row.studentId,
                    studentName: row.studentName,
                    collegeId: row.collegeId,
                    branch: row.branch,
                    image: row.image,
                    totalPoints: row.totalPoints,
                    contestScores: {}
                });
            }
            studentMap.get(row.studentId).contestScores[row.contestName] = row.contestPoints;
        });

        const allContestNames = Array.from(contestsSet).sort();
        const pivotedData = Array.from(studentMap.values());

        return { pivotedData, allContestNames };
    }, [data]);

    const filteredData = useMemo(() => {
        let filtered = pivotedData.filter(row =>
            row.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.collegeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.branch.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name_asc': return a.studentName.localeCompare(b.studentName);
                case 'name_desc': return b.studentName.localeCompare(a.studentName);
                case 'points_desc': return b.totalPoints - a.totalPoints;
                case 'points_asc': return a.totalPoints - b.totalPoints;
                default: return 0;
            }
        });
    }, [pivotedData, searchQuery, sortBy]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleExport = () => {
        try {
            const exportData = filteredData.map(row => {
                const rowData: any = {
                    "Student Name": row.studentName,
                    "College ID": row.collegeId,
                    "Branch": row.branch,
                };
                allContestNames.forEach(name => {
                    rowData[name] = row.contestScores[name] || 0;
                });
                rowData["Total Points"] = row.totalPoints;
                return rowData;
            });

            const ws = XLSX.utils.json_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Contest Performance");

            const date = new Date().toISOString().split('T')[0];
            XLSX.writeFile(wb, `classroom_contest_data_${date}.xlsx`);
            toast.success("Excel report exported successfully");
        } catch (error) {
            toast.error("Failed to export Excel report");
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-full py-20 bg-[#f0f0f0] dark:bg-[#121212]">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Compiling Performance Data...</p>
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full py-20 bg-[#f0f0f0] dark:bg-[#121212] text-center px-6">
                <LayoutDashboard className="w-12 h-12 text-gray-300 dark:text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">No Contest Records</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-xs uppercase font-medium tracking-wide">Establish classroom contests to generate performance tracking reports.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#f0f0f0] dark:bg-[#121212]">
            {/* Header / Controls */}
            <div className="bg-[#f0f0f0] dark:bg-[#111]/40 border-b border-gray-200 dark:border-white/5 p-6 flex flex-col md:flex-row items-center gap-4">
                <div className="relative group flex-1 w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search student or branch..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/50 dark:bg-[#111]/40 backdrop-blur-sm border border-gray-200 dark:border-white/5 pl-14 pr-6 py-4 rounded-none text-xs font-medium focus:ring-0 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 px-4 h-[52px] text-[10px] font-black uppercase tracking-widest outline-none focus:border-orange-500 transition-colors flex-1 md:flex-initial"
                    >
                        <option value="points_desc">Highest Total</option>
                        <option value="points_asc">Lowest Total</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                    </select>

                    <button
                        onClick={handleExport}
                        className="h-[52px] px-6 bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-3 transition-all active:scale-95 shrink-0"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Excel Export</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-[#111]/90">
                            <th className="sticky left-0 px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 w-20 bg-gray-50 dark:bg-[#111] z-30">#</th>
                            <th className="sticky left-20 px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 w-80 bg-gray-50 dark:bg-[#111] z-30">Student Profile</th>
                            <th className="px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 min-w-[150px]">College ID</th>
                            <th className="px-8 py-3 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 min-w-[150px]">Branch</th>

                            {/* Contest Columns */}
                            {allContestNames.map((name) => (
                                <th key={name} className="px-8 py-3 text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 min-w-[120px]">
                                    {name}
                                </th>
                            ))}

                            <th className="px-8 py-3 text-right text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest min-w-[140px] bg-orange-50/20 dark:bg-orange-500/10 z-10">Total points</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50/50 dark:divide-white/5 text-[12px]">
                        <AnimatePresence>
                            {paginatedData.map((row, index) => {
                                const rank = (currentPage - 1) * ITEMS_PER_PAGE + index + 1;
                                const isEven = index % 2 === 0;

                                const rowClass = isEven ? "bg-black/[0.03] dark:bg-white/[0.02]" : "bg-transparent";
                                const stickyClass = isEven ? "bg-[#e5e5e5] dark:bg-[#161616]" : "bg-[#f0f0f0] dark:bg-[#121212]";

                                return (
                                    <motion.tr
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        key={row.studentId}
                                        className={`transition-all ${rowClass}`}
                                    >
                                        <td className={`sticky left-0 px-8 py-2 border-r border-gray-200 dark:border-white/5 ${stickyClass} z-20`}>
                                            <span className="font-semibold tabular-nums text-sm text-gray-400">
                                                {rank}
                                            </span>
                                        </td>
                                        <td className={`sticky left-20 px-8 py-2 border-r border-gray-200 dark:border-white/5 ${stickyClass} z-20`}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 border border-orange-200/50 dark:border-orange-500/20 relative overflow-hidden shrink-0 flex items-center justify-center">
                                                    {row.image ? (
                                                        <Image src={row.image} alt="" fill className="object-cover" />
                                                    ) : (
                                                        <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                                    )}
                                                </div>
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                                    {row.studentName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-2 border-r border-gray-200/50 dark:border-white/5 font-mono text-gray-600 dark:text-gray-400">
                                            {row.collegeId}
                                        </td>
                                        <td className="px-8 py-2 border-r border-gray-200/50 dark:border-white/5 text-gray-700 dark:text-gray-300 font-medium tracking-tight">
                                            {row.branch}
                                        </td>

                                        {/* Contest Scores */}
                                        {allContestNames.map((name) => (
                                            <td key={name} className="px-8 py-2 border-r border-gray-200/50 dark:border-white/5 text-center">
                                                <span className={`text-base font-black tabular-nums ${row.contestScores[name] > 0 ? 'text-orange-600 dark:text-orange-500' : 'text-gray-300 dark:text-gray-700'}`}>
                                                    {row.contestScores[name] || 0}
                                                </span>
                                            </td>
                                        ))}

                                        <td className="px-8 py-2 text-right bg-orange-50/10 dark:bg-orange-500/5 border-l border-gray-200/50 dark:border-white/5 relative">
                                            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-orange-500/40" />
                                            <span className="text-lg font-black text-gray-900 dark:text-white tabular-nums">
                                                {row.totalPoints.toLocaleString()}
                                            </span>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="bg-gray-50/30 dark:bg-[#111]/80 backdrop-blur-md px-8 py-5 flex items-center justify-between border-t border-gray-200 dark:border-white/5 font-mono">
                <p className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                    Entries <span className="text-gray-900 dark:text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)}</span> of {filteredData.length}
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 rounded-none border border-gray-200 dark:border-white/5 disabled:opacity-30 hover:border-orange-500 transition-all shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 rounded-none border border-gray-200 dark:border-white/5 disabled:opacity-30 hover:border-orange-500 transition-all shadow-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
