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

    const loadSubmissions = async () => {
        if (!problemId) return;
        setLoading(true);
        try {
            // dynamic import to break boundary just in case, though usually direct import works for actions
            const { getProblemSubmissionsAction } = await import("@/actions/submission.action");
            const data = await getProblemSubmissionsAction(problemId);
            setSubmissions(data);
        } catch (error) {
            console.error("Failed to load submissions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSubmissions();

        // Listen for pointsUpdated event (fired on successful submit) to reload list
        const handleUpdate = () => loadSubmissions();
        window.addEventListener("pointsUpdated", handleUpdate);
        return () => window.removeEventListener("pointsUpdated", handleUpdate);
    }, [problemId]);

    if (!session?.user) {
        return <div className="p-8 text-center text-gray-500">Please sign in to view submissions.</div>;
    }

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-orange-500" /></div>;
    }

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-700">My Submissions</h3>
                <button
                    onClick={loadSubmissions}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {submissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No submissions yet.</div>
                ) : (
                    <div className="w-full text-sm text-left">
                        {/* HEADER */}
                        <div className="grid grid-cols-5 gap-4 px-6 py-3 text-xs text-gray-500 uppercase bg-gray-50 border-b font-semibold">
                            <div>Status</div>
                            <div>Language</div>
                            <div>Time</div>
                            <div>Memory</div>
                            <div>Date</div>
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
                                            px-2 py-1 rounded-full text-xs font-bold
                                            ${sub.status === 'ACCEPTED' ? 'text-emerald-600 bg-emerald-50' :
                                                sub.status === 'PENDING' ? 'text-amber-600 bg-amber-50' :
                                                    'text-red-600 bg-red-50'}
                                        `}>
                                            {sub.status.replace(/_/g, " ")}
                                        </span>
                                    </div>
                                    <div className="text-gray-600">{sub.language.name}</div>
                                    <div className="text-gray-600">{sub.time ? `${sub.time}ms` : '-'}</div>
                                    <div className="text-gray-600">{sub.memory ? `${sub.memory}KB` : '-'}</div>
                                    <div className="text-gray-500 text-xs">
                                        {new Date(sub.createdAt).toLocaleString()}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
