"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { getClassroomLiveTracking, toggleClassroomTracking } from "@/actions/classroom";
import { toast } from "sonner";
import { Play, Square, Loader2, Code, Clock, CheckCircle2, XCircle, ChevronRight, Activity, Filter, Search, BarChart3, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LiveTrackingProps {
    classroomId: string;
}

export function LiveTracking({ classroomId }: LiveTrackingProps) {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isToggling, setIsToggling] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

    // Filters
    const [searchTerm, setSearchTerm] = useState("");
    const [minSubmissions, setMinSubmissions] = useState(0);

    const fetchTrackingData = useCallback(async () => {
        const res = await getClassroomLiveTracking(classroomId);
        if (res.success) {
            setData(res);
        }
        setIsLoading(false);
    }, [classroomId]);

    useEffect(() => {
        fetchTrackingData();
        const interval = setInterval(fetchTrackingData, 2000);
        return () => clearInterval(interval);
    }, [fetchTrackingData]);

    const handleToggle = async (active: boolean) => {
        setIsToggling(true);
        const res = await toggleClassroomTracking(classroomId, active);
        if (res.success) {
            toast.success(active ? "Tracking session started" : "Tracking session ended");
            fetchTrackingData();
        } else {
            toast.error(res.error || "Operation failed");
        }
        setIsToggling(false);
    };

    // Derived Statistics & Filtered Data
    const { stats, filteredStudents } = useMemo(() => {
        if (!data?.students) return { stats: null, filteredStudents: [] };

        let activeCount = 0;
        let totalSubs = 0;
        let acceptedSubs = 0;

        const allStudents = data.students;

        // Calculate Global Stats
        allStudents.forEach((s: any) => {
            if (s.submissions.length > 0) {
                activeCount++;
                totalSubs += s.submissions.length;
                acceptedSubs += s.submissions.filter((sub: any) => sub.status === 'ACCEPTED').length;
            }
        });

        const acceptanceRate = totalSubs > 0 ? Math.round((acceptedSubs / totalSubs) * 100) : 0;

        // Filter Students
        const filtered = allStudents.filter((student: any) => {
            const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMinSubs = student.submissions.length >= minSubmissions;
            return matchesSearch && matchesMinSubs;
        });

        return {
            stats: {
                activeStudents: activeCount,
                totalSubmissions: totalSubs,
                acceptanceRate,
                totalStudents: allStudents.length
            },
            filteredStudents: filtered
        };
    }, [data, searchTerm, minSubmissions]);

    if (isLoading && !data) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            {/* Header Control Panel */}
            <div className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${data?.isTrackingActive ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-gray-100 dark:bg-[#1a1a1a]'}`}>
                                <Activity className={`w-4 h-4 ${data?.isTrackingActive ? 'text-orange-600 animate-pulse' : 'text-gray-400'}`} />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Live Session Hub</span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Real-Time Monitor</h2>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {data?.isTrackingActive ? (
                                <>
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    Monitoring activity since {new Date(data.trackingStartedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : (
                                <>
                                    <span className="w-2 h-2 bg-gray-300 rounded-full" />
                                    Session inactive. Start tracking to collect data.
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                         {/* Stats Pill */}
                        {data?.isTrackingActive && stats && (
                            <div className="hidden md:flex bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-1 gap-1">
                                <div className="px-4 py-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-100 dark:border-transparent">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Active</div>
                                    <div className="text-lg font-black text-gray-900 dark:text-white leading-none">{stats.activeStudents}<span className="text-gray-300 text-xs font-normal">/{stats.totalStudents}</span></div>
                                </div>
                                <div className="px-4 py-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-100 dark:border-transparent">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Submitted</div>
                                    <div className="text-lg font-black text-gray-900 dark:text-white leading-none">{stats.totalSubmissions}</div>
                                </div>
                                <div className="px-4 py-2 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-100 dark:border-transparent">
                                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-0.5">Success Rate</div>
                                    <div className="text-lg font-black text-emerald-500 leading-none">{stats.acceptanceRate}%</div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => handleToggle(!data?.isTrackingActive)}
                            disabled={isToggling}
                            className={`h-14 px-8 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg ${
                                data?.isTrackingActive
                                    ? "bg-white text-red-600 border-2 border-red-50 hover:bg-red-50 hover:border-red-100 shadow-red-100/50"
                                    : "bg-orange-600 text-white hover:bg-orange-500 shadow-orange-200 dark:shadow-none border-2 border-transparent"
                            }`}
                        >
                            {isToggling ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                data?.isTrackingActive ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />
                            )}
                            {data?.isTrackingActive ? "Stop Session" : "Start Session"}
                        </button>
                    </div>
                </div>

                {/* Filters Toolbar */}
                {data?.isTrackingActive && (
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-[#262626] flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by student name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-12 pl-11 pr-4 bg-gray-50 dark:bg-[#1a1a1a] border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-orange-500/20 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                            />
                        </div>
                        <div className="flex gap-4">
                             <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Filter className="w-4 h-4 text-gray-400" />
                                </div>
                                <select
                                    value={minSubmissions}
                                    onChange={(e) => setMinSubmissions(Number(e.target.value))}
                                    className="h-12 pl-11 pr-8 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#262626] rounded-xl text-sm font-bold text-gray-700 dark:text-gray-200 border-none outline-none appearance-none cursor-pointer transition-all min-w-[200px]"
                                >
                                    <option value={0}>All Submissions</option>
                                    <option value={1}>At least 1 submission</option>
                                    <option value={3}>At least 3 submissions</option>
                                    <option value={5}>More than 5 submissions</option>
                                    <option value={10}>More than 10 submissions</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student: any) => {
                        const total = student.submissions.length;
                        const accepted = student.submissions.filter((s: any) => s.status === 'ACCEPTED').length;
                        const rate = total > 0 ? Math.round((accepted / total) * 100) : 0;

                        return (
                            <div
                                key={student.id}
                                className="bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-2xl overflow-hidden hover:shadow-lg dark:hover:shadow-non hover:border-orange-100 dark:hover:border-orange-900/30 transition-all duration-300 group"
                            >
                                {/* Card Header */}
                                <div className="p-6 pb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#333] relative overflow-hidden">
                                            {student.image ? (
                                                <Image src={student.image} alt={student.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-500 font-black text-xl bg-orange-50 dark:bg-orange-900/10">
                                                    {student.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{student.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-[#1a1a1a] px-2 py-0.5 rounded-full">
                                                    #{student.id.slice(-4)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-gray-900 dark:text-white leading-none mb-1">
                                            {total}
                                        </div>
                                        <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Subs</div>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                {total > 0 && (
                                    <div className="px-6 mb-4">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                            <span className="text-emerald-600">{accepted} Accepted</span>
                                            <span className="text-red-500">{total - accepted} Errors</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden flex">
                                            <div className="h-full bg-emerald-500" style={{ width: `${rate}%` }} />
                                            <div className="h-full bg-red-400" style={{ width: `${100 - rate}%` }} />
                                        </div>
                                    </div>
                                )}

                                {/* Recent Activity Feed */}
                                <div className="border-t border-gray-100 dark:border-[#262626] bg-gray-50/30 dark:bg-black/20">
                                    <div className="max-h-[220px] overflow-y-auto custom-scrollbar p-2">
                                        {student.submissions.length > 0 ? (
                                            student.submissions.map((sub: any) => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => setSelectedSubmission({ ...sub, student })}
                                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white dark:hover:bg-[#1a1a1a] hover:shadow-sm transition-all group/item text-left mb-1"
                                                >
                                                    <div className="flex items-start gap-3 min-w-0">
                                                        <div className={`mt-0.5 ${
                                                            sub.status === 'ACCEPTED' ? 'text-emerald-500' :
                                                            sub.status === 'PENDING' ? 'text-orange-500' : 'text-red-500'
                                                        }`}>
                                                            {sub.status === 'ACCEPTED' ? <CheckCircle2 className="w-4 h-4" /> :
                                                             sub.status === 'PENDING' ? <Loader2 className="w-4 h-4 animate-spin" /> :
                                                             <XCircle className="w-4 h-4" />}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="font-bold text-xs text-gray-700 dark:text-gray-300 truncate group-hover/item:text-orange-600 transition-colors">
                                                                {sub.problemTitle}
                                                            </div>
                                                            <div className="text-[9px] font-medium text-gray-400 mt-0.5">
                                                                {new Date(sub.createdAt).toLocaleTimeString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="w-3 h-3 text-gray-300 opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all" />
                                                </button>
                                            ))
                                        ) : (
                                            <div className="py-8 text-center">
                                                <Clock className="w-5 h-5 text-gray-300 dark:text-gray-700 mx-auto mb-2" />
                                                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">No Activity Yet</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center bg-gray-50/50 dark:bg-[#141414] border-2 border-dashed border-gray-200 dark:border-[#262626] rounded-3xl">
                        <Users className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No Students Found</h3>
                        <p className="text-gray-500 text-sm">Adjust filters or search criteria to see results.</p>
                    </div>
                )}
            </div>

             {/* Code Preview Modal */}
            <AnimatePresence>
                {selectedSubmission && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSubmission(null)}
                            className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl bg-white dark:bg-[#141414] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh] border border-gray-100 dark:border-[#333]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between bg-white dark:bg-[#141414]">
                                <div className="flex items-center gap-5">
                                    <div className="w-10 h-10 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 rounded-lg flex items-center justify-center font-black text-lg">
                                        {selectedSubmission.student.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                {selectedSubmission.student.name}
                                            </h3>
                                            <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-md ${
                                                selectedSubmission.status === 'ACCEPTED' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500'
                                            }`}>
                                                {selectedSubmission.status}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-0.5">
                                            {selectedSubmission.problemTitle} • {new Date(selectedSubmission.createdAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSubmission(null)}
                                    className="h-8 px-4 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-gray-200 transition-colors uppercase text-[9px] font-black tracking-widest rounded-lg"
                                >
                                    Close
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0c0c0c] p-0">
                                <div className="p-8">
                                    <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-800 dark:text-gray-200 bg-white dark:bg-[#141414] p-6 rounded-xl border border-gray-100 dark:border-[#262626]">
                                        <code>{selectedSubmission.code}</code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
