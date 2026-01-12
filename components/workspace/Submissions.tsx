"use client";

import { authClient } from '@/lib/auth-client';
import { SubmissionResult } from '@prisma/client';
import { Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Submission {
    id: string;
    status: SubmissionResult;
    time: number | null;
    memory: number | null;
    createdAt: string;
    language: {
        name: string;
    };
}

interface SubmissionsProps {
    problemId: string;
}

export default function Submissions({ problemId }: SubmissionsProps) {
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

    const loadSubmissions = async (cursor?: string) => {
        if (!problemId) return;
        if (cursor) setLoadingMore(true);
        else setLoading(true);

        try {
            const { getProblemSubmissionsAction } = await import("@/actions/submission.action");
            const data = await getProblemSubmissionsAction(problemId, PAGE_SIZE, cursor);

            if (cursor) {
                setSubmissions(prev => [...prev, ...data]);
            } else {
                setSubmissions(data);
            }

            setHasMore(data.length === PAGE_SIZE);
        } catch (error) {
            console.error("Failed to load submissions", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        loadSubmissions();
        const handleUpdate = () => loadSubmissions();
        window.addEventListener("pointsUpdated", handleUpdate);
        return () => window.removeEventListener("pointsUpdated", handleUpdate);
    }, [problemId]);

    if (!session?.user) {
        return <div className="p-8 text-center text-gray-500">Please sign in to view submissions.</div>;
    }

    if (loading) {
        return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-orange-500" /></div>;
    }

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-2">
                    <span className="w-1 h-3 bg-orange-500 rounded-full" />
                    <h3 className="font-bold text-gray-900 uppercase text-xs tracking-widest">My Submissions</h3>
                </div>
                <button
                    onClick={() => loadSubmissions()}
                    className="p-1.5 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 rounded-lg transition-all"
                >
                    <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {submissions.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 text-sm">No submissions recorded yet.</div>
                ) : (
                    <div className="w-full text-sm text-left">
                        {/* HEADER */}
                        <div className="grid grid-cols-5 gap-4 px-6 py-4 text-[10px] text-gray-400 uppercase bg-gray-100/50 border-b font-black tracking-widest">
                            <div>Status</div>
                            <div>Language</div>
                            <div>Time</div>
                            <div>Memory</div>
                            <div className="text-right">Date</div>
                        </div>
                        {/* ROWS */}
                        <div className="divide-y divide-gray-100">
                            {submissions.map((sub) => (
                                <Link
                                    key={sub.id}
                                    href={`/submissions/${sub.id}`}
                                    className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group items-center"
                                >
                                    <div className="font-medium">
                                        <span className={`
                                            px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-tight
                                            ${sub.status === 'ACCEPTED' ? 'text-emerald-700 bg-emerald-50 border border-emerald-100' :
                                                sub.status === 'PENDING' ? 'text-amber-700 bg-amber-50 border border-amber-100' :
                                                    'text-rose-700 bg-rose-50 border border-rose-100'}
                                        `}>
                                            {sub.status.replace(/_/g, " ")}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 font-medium">{sub.language.name}</div>
                                    <div className="text-gray-500 font-mono text-xs">{sub.time ? `${sub.time}ms` : '-'}</div>
                                    <div className="text-gray-500 font-mono text-xs">{sub.memory ? `${sub.memory}KB` : '-'}</div>
                                    <div className="text-gray-400 text-[10px] font-bold text-right uppercase tracking-tighter">
                                        {new Date(sub.createdAt).toLocaleDateString()}
                                        <div className="opacity-60">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* LOAD MORE */}
                        {hasMore && (
                            <div className="p-6 flex justify-center border-t border-gray-50 bg-gray-50/20">
                                <button
                                    onClick={() => loadSubmissions(submissions[submissions.length - 1].id)}
                                    disabled={loadingMore}
                                    className="flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:shadow-sm transition-all disabled:opacity-50"
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
