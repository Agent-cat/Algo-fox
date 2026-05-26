"use client";

import { authClient } from '@/lib/auth-client';
import { SubmissionResult } from '@prisma/client';
import { Loader2, RefreshCw, SquareArrowOutUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
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
    code: string;
}

interface SubmissionsProps {
    problemId: string;
    onRestoreCode?: (code: string, languageId: number) => void;
}

export default function Submissions({ problemId, onRestoreCode }: SubmissionsProps) {
    const { data: session } = authClient.useSession();

    const [submissions, setSubmissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const PAGE_SIZE = 15;

    const loadSubmissions = async (cursor?: string, isMounted: boolean = true, isSilent: boolean = false) => {
        if (!problemId) return;
        if (cursor) setLoadingMore(true);
        else if (!isSilent) setLoading(true);

        try {
            const { getProblemSubmissionsAction } = await import("@/actions/submission.action");
            const data = await getProblemSubmissionsAction(problemId, PAGE_SIZE, cursor);

            if (!isMounted) return;

            // Only show completed submissions
            const completedData = data.filter(
                (d) => d.status !== "PENDING" && d.status !== "PROCESSING"
            );

            if (cursor) {
                setSubmissions(prev => {
                    const prevIds = new Set(prev.map(p => p.id));
                    const newItems = completedData.filter(d => !prevIds.has(d.id));
                    return [...prev, ...newItems];
                });
            } else {
                setSubmissions(completedData);
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
                {submissions.length === 0 ? (
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
                                {submissions.map((sub) => (
                                    <motion.div
                                        key={sub.id}
                                        layout
                                        initial={{ opacity: 0, x: -80, height: 0 }}
                                        animate={{ opacity: 1, x: 0, height: "auto" }}
                                        exit={{ opacity: 0, x: 80, height: 0 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 30,
                                            height: { duration: 0.35 },
                                            opacity: { duration: 0.25 }
                                        }}
                                        className="border-b border-gray-200 dark:border-white/10 overflow-hidden"
                                    >
                                        <Link
                                            href={`/submissions/${sub.id}`}
                                            className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors group items-center border-l-4 border-l-transparent"
                                        >
                                            <div className="font-medium">
                                                <span className={`
                                                    px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tight
                                                    ${sub.status === 'ACCEPTED' ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-500 border border-emerald-100 dark:border-emerald-500/20' :
                                                        'text-rose-700 bg-rose-50 dark:bg-rose-500/10 dark:text-rose-500 border border-rose-100 dark:border-rose-500/20'}
                                                `}>
                                                    {sub.status.replace(/_/g, " ")}
                                                </span>
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-300 font-medium">{sub.language.name}</div>
                                            <div className="text-gray-500 dark:text-gray-400 font-mono text-xs">{sub.time ? `${Number(sub.time).toFixed(3)}ms` : '-'}</div>
                                            <div className="text-gray-500 dark:text-gray-400 font-mono text-xs">{sub.memory ? `${sub.memory}KB` : '-'}</div>
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
                                ))}
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
