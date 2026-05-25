"use client";

import { authClient } from '@/lib/auth-client';
import { SubmissionResult } from '@prisma/client';
import { Loader2, RefreshCw, SquareArrowOutUpRight } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface Submission {
    id: string;
    status: SubmissionResult;
    time: number | null;
    memory: number | null;
    createdAt: string;
    language: {
        name: string;
        judge0Id: number;
    };
}

interface SubmissionsProps {
    problemId: string;
    onRestoreCode?: (code: string, languageId: number) => void;
    runningSubmission?: any;
}

export default function Submissions({ problemId, onRestoreCode, runningSubmission }: SubmissionsProps) {
    const { data: session } = authClient.useSession();
    // Use a separate state to handle the list locally if needed, but optimally this should be a client component that receives initial data or fetches via action.
    // Given the requirement to be "nice and optimized", using the server action in useEffect is good,
    // but React Server Components would be better if this was a page. Since it's a tab content,
    // we'll fetch on mount using the action.

    // Actually, to make it truly optimized, we should probably fetch this data in the parent server component
    // and pass it down, but the Tab system is client-side.
    // So client-side fetching via Server Action is the way to go here for SPA-like feel without full reload.

    // Import dynamically to avoid server-only module errors in client component?
    // No, Actions can be imported in Client Components.

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const PAGE_SIZE = 15;

    const [activeRunningSub, setActiveRunningSub] = useState<any | null>(null);

    useEffect(() => {
        if (runningSubmission) {
            setActiveRunningSub(runningSubmission);
        } else if (activeRunningSub) {
            const existsInFetched = submissions.some(sub => sub.id === activeRunningSub.id);
            if (existsInFetched) {
                setActiveRunningSub(null);
            }
        }
    }, [runningSubmission, submissions, activeRunningSub]);

    const displaySubmissions = useMemo(() => {
        if (!activeRunningSub) return submissions;
        const filtered = submissions.filter(sub => sub.id !== activeRunningSub.id);
        return [activeRunningSub, ...filtered];
    }, [activeRunningSub, submissions]);

    const loadSubmissions = async (cursor?: string, isMounted: boolean = true, isSilent: boolean = false) => {
        if (!problemId) return;
        if (cursor) setLoadingMore(true);
        else if (!isSilent) setLoading(true);

        try {
            const { getProblemSubmissionsAction } = await import("@/actions/submission.action");
            const data = await getProblemSubmissionsAction(problemId, PAGE_SIZE, cursor);

            if (!isMounted) return;

            if (cursor) {
                setSubmissions(prev => {
                    const prevIds = new Set(prev.map(p => p.id));
                    const newItems = data.filter(d => !prevIds.has(d.id));
                    return [...prev, ...newItems];
                });
            } else {
                setSubmissions(data);
            }

            setHasMore(data.length === PAGE_SIZE);
        } catch (error) {
             if (isMounted) console.error("Failed to load submissions", error);
        } finally {
            if (isMounted) {
                setLoading(false);
                setLoadingMore(false);
            }
        }
    };

    useEffect(() => {
        let isMounted = true;
        loadSubmissions(undefined, isMounted);
        const handleUpdate = () => loadSubmissions(undefined, isMounted, true);
        window.addEventListener("pointsUpdated", handleUpdate);
        window.addEventListener("submissionsUpdated", handleUpdate);
        return () => {
            isMounted = false;
            window.removeEventListener("pointsUpdated", handleUpdate);
            window.removeEventListener("submissionsUpdated", handleUpdate);
        };
    }, [problemId]);

    if (!session?.user) {
        return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Please sign in to view submissions.</div>;
    }

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-orange-500" /></div>;
    }

    return (
        <div className="bg-[#fafafa] dark:bg-[#121212]">
            <div className="p-5 border-b border-dashed border-gray-200 dark:border-white/10 flex justify-between items-center bg-[#fafafa] dark:bg-[#121212] sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-3 bg-orange-500 rounded-full" />
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 uppercase text-xs tracking-widest">My Submissions</h3>
                </div>
                <button
                    onClick={() => loadSubmissions()}
                    className="p-1.5 hover:bg-[#fafafa] dark:hover:bg-[#1a1a1a] hover:shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-[#333] rounded-lg transition-all"
                >
                    <RefreshCw className={`w-4 h-4 text-gray-500 dark:text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            <div className="">
                {displaySubmissions.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 dark:text-gray-400 text-sm">No submissions recorded yet.</div>
                ) : (
                    <div className="w-full text-sm text-left">
                        {/* HEADER */}
                        <div className="grid grid-cols-6 gap-4 px-6 py-4 text-[10px] text-gray-400 dark:text-gray-500 uppercase bg-[#fafafa] dark:bg-[#141414] border-b border-dashed border-gray-200 dark:border-white/10 font-black tracking-widest">
                            <div>Status</div>
                            <div>Language</div>
                            <div>Time</div>
                            <div>Memory</div>
                            <div className="text-center">Action</div>
                            <div className="text-right">Date</div>
                        </div>
                        {/* ROWS */}
                        <div className="flex flex-col">
                            <AnimatePresence initial={false}>
                                {displaySubmissions.map((sub) => {
                                    const isRunningRow = activeRunningSub && sub.id === activeRunningSub.id;
                                    const isPendingOrProcessing = sub.status === 'PENDING' || sub.status === 'PROCESSING';
                                    return (
                                        <motion.div
                                            key={sub.id}
                                            layout
                                            initial={{ opacity: 0, x: 80, height: 0 }}
                                            animate={isRunningRow ? {
                                                opacity: 1,
                                                x: 0,
                                                height: "auto",
                                                backgroundColor: [
                                                    "rgba(249, 115, 22, 0.02)",
                                                    "rgba(249, 115, 22, 0.08)",
                                                    "rgba(249, 115, 22, 0.02)"
                                                ]
                                            } : {
                                                opacity: 1,
                                                x: 0,
                                                height: "auto",
                                                backgroundColor: "rgba(0, 0, 0, 0)"
                                            }}
                                            exit={{ opacity: 0, x: -80, height: 0 }}
                                            transition={isRunningRow ? {
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                                height: { duration: 0.35 },
                                                opacity: { duration: 0.25 },
                                                backgroundColor: {
                                                    repeat: Infinity,
                                                    duration: 1.8,
                                                    ease: "easeInOut"
                                                }
                                            } : {
                                                type: "spring",
                                                stiffness: 350,
                                                damping: 30,
                                                height: { duration: 0.35 },
                                                opacity: { duration: 0.25 },
                                                backgroundColor: { duration: 0.2 }
                                            }}
                                            className="border-b border-gray-200 dark:border-white/10 overflow-hidden"
                                        >
                                            <Link
                                                href={isPendingOrProcessing ? '#' : `/submissions/${sub.id}`}
                                                onClick={(e) => {
                                                    if (isPendingOrProcessing) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className={`grid grid-cols-6 gap-4 px-6 py-4 transition-colors group items-center border-l-4 ${
                                                    isRunningRow 
                                                        ? 'border-l-orange-500' 
                                                        : 'border-l-transparent hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'
                                                }`}
                                            >
                                                <div className="font-medium">
                                                    <div className="flex flex-col gap-1.5 items-start">
                                                        <span className={`
                                                            inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tight
                                                            ${sub.status === 'ACCEPTED' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-100 dark:border-emerald-500/20' :
                                                                sub.status === 'PENDING' ? 'text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-500 border border-amber-100 dark:border-amber-500/20' :
                                                                sub.status === 'PROCESSING' ? 'text-orange-700 bg-orange-50 dark:bg-orange-500/10 dark:text-orange-500 border border-orange-100 dark:border-orange-500/20' :
                                                                    'text-rose-700 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-500 border border-rose-100 dark:border-rose-500/20'}
                                                        `}>
                                                            {sub.status === 'PENDING' && (
                                                                <Loader2 className="w-2.5 h-2.5 animate-spin text-amber-500" />
                                                            )}
                                                            {sub.status === 'PROCESSING' && (
                                                                <Loader2 className="w-2.5 h-2.5 animate-spin text-orange-500" />
                                                            )}
                                                            {sub.status === 'PENDING' ? 'QUEUED' : sub.status === 'PROCESSING' ? 'GRADING' : sub.status.replace(/_/g, " ")}
                                                        </span>

                                                        {sub.status === 'PROCESSING' && sub.progress && (
                                                            <div className="flex flex-col gap-1 w-24">
                                                                <div className="w-full bg-gray-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                                                                    <div 
                                                                        className="bg-orange-500 h-full rounded-full transition-all duration-300"
                                                                        style={{ width: `${(sub.progress.completed / sub.progress.total) * 100}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-[9px] text-gray-400 font-medium whitespace-nowrap">
                                                                    {sub.progress.passed} / {sub.progress.total} passed
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-300 font-medium">{sub.language.name}</div>
                                                <div className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                                                    {isPendingOrProcessing ? (
                                                        <span className="text-orange-500 dark:text-orange-400 animate-pulse font-medium text-[11px]">
                                                            Evaluating...
                                                        </span>
                                                    ) : sub.time ? (
                                                        `${Number(sub.time).toFixed(3)}ms`
                                                    ) : (
                                                        '-'
                                                    )}
                                                </div>
                                                <div className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                                                    {sub.status === 'PENDING' ? (
                                                        <span className="text-gray-400 dark:text-gray-500 text-[11px] italic">In Queue</span>
                                                    ) : sub.status === 'PROCESSING' && sub.progress ? (
                                                        <span className="text-orange-500 dark:text-orange-400 font-semibold text-[11px]">
                                                            Case {Math.min(sub.progress.completed + 1, sub.progress.total)}/{sub.progress.total}
                                                        </span>
                                                    ) : sub.memory ? (
                                                        `${sub.memory}KB`
                                                    ) : (
                                                        '-'
                                                    )}
                                                </div>
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            onRestoreCode?.(sub.code, sub.language.judge0Id);
                                                        }}
                                                        className="p-2 text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all"
                                                        title="Restore to editor"
                                                    >
                                                        <SquareArrowOutUpRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <div className="text-gray-400 dark:text-gray-500 text-[10px] font-bold text-right uppercase tracking-tighter">
                                                    {new Date(sub.createdAt).toLocaleDateString()}
                                                    <div className="opacity-60">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {/* LOAD MORE */}
                        {hasMore && (
                            <div className="p-6 flex justify-center border-t border-gray-200 dark:border-white/10 bg-gray-50/20 dark:bg-[#141414]">
                                <button
                                    onClick={() => loadSubmissions(submissions[submissions.length - 1].id)}
                                    disabled={loadingMore}
                                    className="flex items-center gap-3 px-8 py-3 bg-[#fafafa] dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 hover:border-orange-200 dark:hover:border-orange-500/30 hover:shadow-sm transition-all disabled:opacity-50"
                                >
                                    {loadingMore ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Loading...
                                        </>
                                    ) : (
                                        "Load More Activity"
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
