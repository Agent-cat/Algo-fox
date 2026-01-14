"use client";

import { useEffect, useState, useCallback } from "react";
import { getClassroomLiveTracking, toggleClassroomTracking } from "@/actions/classroom";
import { toast } from "sonner";
import { Play, Square, Loader2, Code, Clock, CheckCircle2, XCircle, ChevronRight, Activity } from "lucide-react";
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

    const fetchTrackingData = useCallback(async () => {
        const res = await getClassroomLiveTracking(classroomId);
        if (res.success) {
            setData(res);
        }
        setIsLoading(false);
    }, [classroomId]);

    useEffect(() => {
        fetchTrackingData();
        const interval = setInterval(fetchTrackingData, 10000);
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

    if (isLoading && !data) {
        return (
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Minimal Control Bar - White & Orange */}
            <div className="bg-white dark:bg-[#141414] border-2 border-orange-100 dark:border-orange-900/30 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 ${data?.isTrackingActive ? 'bg-orange-500 animate-pulse' : 'bg-gray-300 dark:bg-gray-700'}`} />
                        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Session Hub</span>
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Live Student Tracking</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                        {data?.isTrackingActive
                            ? `Monitoring activity since ${new Date(data.trackingStartedAt).toLocaleTimeString()}`
                            : "Initialize a session to track real-time progress."}
                    </p>
                </div>

                <button
                    onClick={() => handleToggle(!data?.isTrackingActive)}
                    disabled={isToggling}
                    className={`flex items-center gap-3 px-8 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                        data?.isTrackingActive
                            ? "bg-gray-100 text-gray-900 hover:bg-red-50 hover:text-red-600"
                            : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                >
                    {isToggling ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        data?.isTrackingActive ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />
                    )}
                    {data?.isTrackingActive ? "Stop Tracking" : "Start Tracking"}
                </button>
            </div>

            {/* Students Activity Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data?.students.map((student: any) => (
                    <div
                        key={student.id}
                        className="bg-white dark:bg-[#141414] border-2 border-gray-50 dark:border-[#262626] p-6 space-y-6 hover:border-orange-100 dark:hover:border-orange-900/30 transition-colors"
                    >
                        {/* Student Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] relative shadow-inner">
                                    {student.image ? (
                                        <Image src={student.image} alt={student.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-orange-500 font-black">
                                            {student.name?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 dark:text-white uppercase text-sm tracking-tight">{student.name}</h3>
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                        ID: {student.id.slice(-6)}
                                    </span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                                student.submissions.length > 0 ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500" : "bg-gray-50 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-600"
                            }`}>
                                {student.submissions.length} Submissions
                            </div>
                        </div>

                        {/* Submissions List */}
                        <div className="space-y-2">
                            {student.submissions.length > 0 ? (
                                student.submissions.map((sub: any) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => setSelectedSubmission({ ...sub, student })}
                                        className="w-full flex items-center justify-between p-4 bg-gray-50/50 dark:bg-[#1a1a1a]/50 border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 hover:bg-white dark:hover:bg-[#1f1f1f] transition-all group"
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            {sub.status === 'ACCEPTED' ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-red-500" />
                                            )}
                                            <div>
                                                <div className="font-bold text-xs text-gray-900 dark:text-gray-200 uppercase tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-500">
                                                    {sub.problemTitle}
                                                </div>
                                                <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 mt-0.5">
                                                    {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))
                            ) : (
                                <div className="py-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-[#333] transition-colors">
                                    <Clock className="w-5 h-5 text-gray-200 dark:text-gray-700 mb-2" />
                                    <span className="text-[9px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest">Awaiting Activity</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Sharp Code Modal */}
            <AnimatePresence>
                {selectedSubmission && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSubmission(null)}
                            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            className="relative w-full max-w-5xl bg-white dark:bg-[#141414] border-2 border-orange-500 shadow-2xl flex flex-col h-[80vh]"
                        >
                            <div className="p-8 border-b-2 border-orange-100 dark:border-orange-900/30 flex items-center justify-between bg-white dark:bg-[#141414]">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 flex items-center justify-center font-black text-xl">
                                        {selectedSubmission.student.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                {selectedSubmission.student.name}
                                            </h3>
                                            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                                                selectedSubmission.status === 'ACCEPTED' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500' : 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500'
                                            }`}>
                                                {selectedSubmission.status}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">
                                            {selectedSubmission.problemTitle} • {new Date(selectedSubmission.createdAt).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedSubmission(null)}
                                    className="p-3 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-orange-600 dark:hover:bg-gray-200 transition-colors uppercase text-[10px] font-black tracking-widest"
                                >
                                    Close
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto bg-gray-50 dark:bg-[#1a1a1a] p-8">
                                <pre className="text-gray-900 dark:text-gray-100 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                                    <code>{selectedSubmission.code}</code>
                                </pre>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
