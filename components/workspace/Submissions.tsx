"use client";

import { authClient } from '@/lib/auth-client';
import { SubmissionResult } from '@prisma/client';
import { Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        if (!session?.user?.id) return;
        try {
            setLoading(true);
            const res = await fetch(`/api/submissions?problemId=${problemId}&userId=${session.user.id}`);
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error("Failed to fetch submissions", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [problemId, session?.user?.id]);

    if (loading && submissions.length === 0) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-orange-500" /></div>;
    }

    if (!session?.user) {
        return <div className="p-8 text-center text-gray-500">Please sign in to view submissions.</div>;
    }

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-700">My Submissions</h3>
                <button
                    onClick={fetchSubmissions}
                    className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="overflow-y-auto flex-1 custom-scrollbar">
                {submissions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No submissions yet.</div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Language</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Memory</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((sub) => (
                                <tr key={sub.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">
                                        <span className={`
                                            px-2 py-1 rounded-full text-xs font-bold
                                            ${sub.status === 'ACCEPTED' ? 'text-emerald-600 bg-emerald-50' :
                                                sub.status === 'PENDING' ? 'text-amber-600 bg-amber-50' :
                                                    'text-red-600 bg-red-50'}
                                        `}>
                                            {sub.status.replace(/_/g, " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{sub.language.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{sub.time ? `${sub.time}ms` : '-'}</td>
                                    <td className="px-6 py-4 text-gray-600">{sub.memory ? `${sub.memory}KB` : '-'}</td>
                                    <td className="px-6 py-4 text-gray-500 text-xs">
                                        {new Date(sub.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
