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
        <div className="space-y-6 max-w-[1400px] mx-auto">
            {/* Header Control Panel */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[2rem] p-6 shadow-xl transition-all duration-300">
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <div className={`flex items-center justify-center w-8 h-8 rounded-xl ${data?.isTrackingActive ? 'bg-orange-100 dark:bg-orange-900/20' : 'bg-gray-100 dark:bg-[#1a1a1a]'}`}>
                                 <Activity className={`w-4 h-4 ${data?.isTrackingActive ? 'text-orange-600 animate-pulse' : 'text-gray-400'}`} />
                             </div>
                             <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Neural Monitoring Hub</span>
                        </div>
                        <h2 className="text-2xl font-black text-gray-950 dark:text-white uppercase tracking-tight">Real-Time Alpha</h2>
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500 dark:text-gray-400 font-bold">
                            {data?.isTrackingActive ? (
                                <>
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    Sync: {new Date(data.trackingStartedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </>
                            ) : (
                                <>
                                    <span className="w-2 h-2 bg-gray-300 dark:bg-[#262626] rounded-full" />
                                    Standby mode.
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {/* Stats Pills - Compact Glass */}
                        {data?.isTrackingActive && stats && (
                            <div className="hidden md:flex bg-black/5 dark:bg-black/40 backdrop-blur-md rounded-xl border border-white/10 p-1 gap-1">
                                <div className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-lg border border-white/10">
                                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Core</div>
                                    <div className="text-sm font-black text-gray-950 dark:text-white leading-none">{stats.activeStudents}<span className="text-gray-400 text-[10px] font-normal">/{stats.totalStudents}</span></div>
                                </div>
                                <div className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-lg border border-white/10">
                                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Logs</div>
                                    <div className="text-sm font-black text-gray-950 dark:text-white leading-none">{stats.totalSubmissions}</div>
                                </div>
                                <div className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-lg border border-white/10">
                                    <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Accepted</div>
                                    <div className="text-sm font-black text-emerald-500 leading-none">{stats.acceptanceRate}%</div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={() => handleToggle(!data?.isTrackingActive)}
                            disabled={isToggling}
                            className={`h-11 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 shadow-lg ${
                                data?.isTrackingActive
                                    ? "bg-red-500 text-white hover:bg-red-600 shadow-red-200/50"
                                    : "bg-gray-950 dark:bg-white text-white dark:text-gray-950 hover:bg-orange-600 dark:hover:bg-gray-200"
                            } disabled:opacity-50`}
                        >
                            {isToggling ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                data?.isTrackingActive ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />
                            )}
                            {data?.isTrackingActive ? "Kill Hub" : "Init Link"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Toolbar */}
            {data?.isTrackingActive && (
                <div className="flex flex-col md:flex-row gap-4 bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-[1.5rem] p-4 shadow-lg">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Locate student signature..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-11 pl-11 pr-4 bg-white/50 dark:bg-black/20 backdrop-blur-sm border border-gray-100 dark:border-white/5 rounded-xl text-xs font-bold focus:ring-4 focus:ring-orange-500/5 outline-none transition-all placeholder:text-gray-400 dark:text-white"
                        />
                    </div>
                    <div className="flex gap-4">
                         <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <Filter className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                            </div>
                            <select
                                value={minSubmissions}
                                onChange={(e) => setMinSubmissions(Number(e.target.value))}
                                className="h-11 pl-11 pr-10 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-200 outline-none appearance-none cursor-pointer transition-all min-w-[200px]"
                            >
                                <option value={0}>All Signatures</option>
                                <option value={1}>MIN: 1 Entry</option>
                                <option value={3}>MIN: 3 Entries</option>
                                <option value={5}>MIN: 5 Entries</option>
                                <option value={10}>MIN: 10 Entries</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform">
                                <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                                className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:border-orange-500/50 transition-all duration-500 group"
                            >
                                {/* Card Header */}
                                <div className="p-6 pb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gray-50 dark:bg-black/20 rounded-xl border border-white/10 relative overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-500">
                                            {student.image ? (
                                                <Image src={student.image} alt={student.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-orange-600 dark:text-orange-500 font-black text-xl bg-orange-50 dark:bg-orange-500/10">
                                                    {student.name?.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-gray-950 dark:text-white mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors tracking-tight">{student.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest bg-gray-100/50 dark:bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                                                    ID: {student.id.slice(-6).toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-gray-950 dark:text-white leading-none mb-1 tabular-nums">
                                            {total}
                                        </div>
                                        <div className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Logs</div>
                                    </div>
                                </div>

                                {/* Stats Bar */}
                                {total > 0 && (
                                    <div className="px-6 mb-4">
                                        <div className="flex items-center justify-between text-[8px] font-black text-gray-400 dark:text-gray-600 mb-1.5 uppercase tracking-widest">
                                            <span className="text-emerald-500">{accepted} Resolved</span>
                                            <span className="text-orange-500">{rate}% Success</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 dark:bg-black/20 rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${rate}%` }}
                                                className={`h-full bg-gradient-to-r ${rate > 70 ? 'from-emerald-400 to-emerald-500' : 'from-orange-400 to-orange-500'} rounded-full`}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Submissions Feed */}
                                <div className="px-6 pb-6 mt-4">
                                    <h4 className="text-[8px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                        Activity Stream
                                        <div className="flex-1 h-px bg-gray-100 dark:bg-white/5" />
                                    </h4>
                                    <div className="space-y-2 max-h-[120px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 dark:scrollbar-thumb-white/10">
                                        {student.submissions.length > 0 ? (
                                            student.submissions.slice(0, 5).map((sub: any) => (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => setSelectedSubmission({ ...sub, student })}
                                                    className="w-full flex items-center justify-between p-2.5 bg-white/50 dark:bg-white/5 rounded-lg border border-white/10 group/item hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm text-left"
                                                >
                                                    <div className="flex flex-col min-w-0">
                                                         <span className="text-[9px] font-black text-gray-950 dark:text-white line-clamp-1 group-hover/item:text-orange-600 transition-colors uppercase tracking-tight">{sub.problem?.title || "Project Log"}</span>
                                                         <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                    <div className={`px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest border ${
                                                        sub.status === 'ACCEPTED'
                                                            ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100/50'
                                                            : 'bg-red-50 dark:bg-red-500/10 text-red-600 border-red-100/50'
                                                    }`}>
                                                        {sub.status}
                                                    </div>
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 bg-gray-50/50 dark:bg-black/20 rounded-xl border border-white/5">
                                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">No activity recorded</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-sm">
                        <div className="w-16 h-16 bg-gray-100/50 dark:bg-black/20 rounded-full flex items-center justify-center mb-6 text-gray-400 dark:text-gray-600">
                            <Activity className="w-8 h-8" />
                        </div>
                         <h3 className="text-xl font-black text-gray-950 dark:text-white mb-2 uppercase tracking-tight">Zero Activity Detected</h3>
                         <p className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-[0.15em]">Neural Link Standby • System Idle</p>
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
                            className="relative w-full max-w-4xl bg-white dark:bg-[#0a0a0a] rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-[#262626] flex flex-col max-h-[85vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl ${selectedSubmission.status === 'ACCEPTED' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-red-50 dark:bg-red-500/10 text-red-600'}`}>
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-gray-950 dark:text-white uppercase tracking-tight">{selectedSubmission.problem?.title || "Source Analysis"}</h3>
                                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{selectedSubmission.student.name} • {new Date(selectedSubmission.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSubmission(null)}
                                    className="h-10 px-6 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
