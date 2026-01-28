"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft, Users, AlertTriangle, Ban, Clock, CheckCircle2,
    ChevronDown, ChevronUp, Eye, Unlock, Shield
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getContestParticipants, unblockParticipant, getParticipantViolations } from "@/actions/contest";

interface Participant {
    id: string;
    userId: string;
    totalViolations: number;
    isFlagged: boolean;
    isBlocked: boolean;
    permanentlyBlocked: boolean;
    tempBlockedUntil: string | null;
    unblockedBy: string | null;
    unblockedAt: string | null;
    user: {
        id: string;
        name: string;
        email: string;
        image: string | null;
    };
    violations: {
        id: string;
        type: string;
        message: string | null;
        createdAt: string;
    }[];
}

export default function ContestParticipantsPage() {
    const params = useParams();
    const router = useRouter();
    const contestId = params.id as string;

    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [unblocking, setUnblocking] = useState<string | null>(null);

    useEffect(() => {
        loadParticipants();
    }, [contestId]);

    const loadParticipants = async () => {
        setLoading(true);
        const result = await getContestParticipants(contestId);
        if (result.success && result.participants) {
            // Map to handle Date to string conversion
            const mapped = (result.participants as any[]).map(p => ({
                ...p,
                violations: p.violations.map((v: any) => ({
                    ...v,
                    createdAt: v.createdAt instanceof Date ? v.createdAt.toISOString() : v.createdAt
                }))
            }));
            setParticipants(mapped);
        } else {
            toast.error(result.error || "Failed to load participants");
        }
        setLoading(false);
    };

    const handleUnblock = async (userId: string) => {
        setUnblocking(userId);
        const result = await unblockParticipant(contestId, userId);
        if (result.success) {
            toast.success("Participant unblocked successfully");
            loadParticipants();
        } else {
            toast.error(result.error || "Failed to unblock participant");
        }
        setUnblocking(null);
    };

    const getStatusBadge = (p: Participant) => {
        if (p.permanentlyBlocked) {
            return <span className="px-2 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-medium rounded-full flex items-center gap-1">
                <Ban className="w-3 h-3" /> Permanently Blocked
            </span>;
        }
        if (p.tempBlockedUntil && new Date(p.tempBlockedUntil) > new Date()) {
            return <span className="px-2 py-1 bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 text-xs font-medium rounded-full flex items-center gap-1">
                <Clock className="w-3 h-3" /> Temp Blocked
            </span>;
        }
        if (p.isBlocked) {
            return <span className="px-2 py-1 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-medium rounded-full flex items-center gap-1">
                <Ban className="w-3 h-3" /> Blocked
            </span>;
        }
        if (p.isFlagged) {
            return <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-xs font-medium rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Flagged
            </span>;
        }
        if (p.unblockedAt) {
            return <span className="px-2 py-1 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Unblocked
            </span>;
        }
        return <span className="px-2 py-1 bg-gray-100 dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
            Active
        </span>;
    };

    const blockedCount = participants.filter(p => p.isBlocked || p.permanentlyBlocked).length;
    const flaggedCount = participants.filter(p => p.isFlagged && !p.isBlocked).length;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
            {/* Header */}
            <div className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#262626] sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-500 dark:text-gray-400"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Contest Participants</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">View violations and manage blocked participants</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white dark:bg-[#141414] rounded-xl p-4 border border-gray-200 dark:border-[#262626]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{participants.length}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Total Participants</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#141414] rounded-xl p-4 border border-gray-200 dark:border-[#262626]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-100 dark:bg-red-500/10 rounded-lg flex items-center justify-center">
                                <Ban className="w-5 h-5 text-red-600 dark:text-red-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{blockedCount}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Blocked</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#141414] rounded-xl p-4 border border-gray-200 dark:border-[#262626]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{flaggedCount}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Flagged</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-[#141414] rounded-xl p-4 border border-gray-200 dark:border-[#262626]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-500/10 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-green-600 dark:text-green-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                                    {participants.filter(p => p.totalViolations === 0).length}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Clean</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Participants List */}
                <div className="bg-white dark:bg-[#141414] rounded-xl border border-gray-200 dark:border-[#262626] overflow-hidden">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">Loading participants...</div>
                    ) : participants.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">No participants yet</div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-[#262626]">
                            {participants.map((p) => (
                                <div key={p.id} className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a]">
                                    <div
                                        className="p-4 flex items-center justify-between cursor-pointer"
                                        onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gray-200 dark:bg-[#262626] rounded-full flex items-center justify-center overflow-hidden">
                                                {p.user.image ? (
                                                    <img src={p.user.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                ) : (
                                                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                                                        {p.user.name?.charAt(0) || '?'}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-gray-100">{p.user.name}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{p.user.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {getStatusBadge(p)}
                                            <div className="text-center">
                                                <p className={`text-lg font-bold ${
                                                    p.totalViolations >= 6 ? 'text-red-600' :
                                                    p.totalViolations >= 4 ? 'text-orange-600' :
                                                    p.totalViolations >= 1 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                    {p.totalViolations}
                                                </p>
                                                <p className="text-xs text-gray-500">Violations</p>
                                            </div>
                                            {expandedId === p.id ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded details */}
                                    {expandedId === p.id && (
                                        <div className="px-4 pb-4 border-t border-gray-100 dark:border-[#262626] bg-gray-50 dark:bg-[#1a1a1a]">
                                            <div className="pt-4">
                                                {/* Action buttons */}
                                                {(p.isBlocked || p.permanentlyBlocked) && (
                                                    <div className="mb-4">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUnblock(p.userId);
                                                            }}
                                                            disabled={unblocking === p.userId}
                                                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                                        >
                                                            <Unlock className="w-4 h-4" />
                                                            {unblocking === p.userId ? 'Unblocking...' : 'Unblock Participant'}
                                                        </button>
                                                    </div>
                                                )}

                                                {/* Violations list */}
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Recent Violations:</p>
                                                {p.violations.length === 0 ? (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">No violations recorded</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {p.violations.map((v) => (
                                                            <div key={v.id} className="flex items-center justify-between p-2 bg-white dark:bg-[#141414] rounded-lg border border-gray-200 dark:border-[#262626]">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs rounded font-medium">
                                                                        {v.type.replace(/_/g, ' ')}
                                                                    </span>
                                                                    {v.message && (
                                                                        <span className="text-sm text-gray-600 dark:text-gray-400">{v.message}</span>
                                                                    )}
                                                                </div>
                                                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                                                    {new Date(v.createdAt).toLocaleTimeString()}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
