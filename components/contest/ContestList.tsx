"use client";

import { Plus, Search, Trophy, Calendar, Users, Globe, School, ArrowRight, Timer, Edit, Trash2, X, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { format } from "date-fns";
import { deleteContest } from "@/actions/contest";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";

interface ContestListProps {
    contests: any[];
    userRole: string;
}

export function ContestList({ contests, userRole }: ContestListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const canCreate = ["ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER", "TEACHER"].includes(userRole);

    const filteredContests = useMemo(() => {
        return contests.filter(contest =>
            contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (contest.description && contest.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [contests, searchQuery]);

    const getStatus = (contest: any) => {
        const now = new Date();
        const start = new Date(contest.startTime);
        const end = new Date(contest.endTime);

        if (now >= start && now <= end) return { label: "Live", color: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10" };
        if (now < start) return { label: "Upcoming", color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10" };
        return { label: "Ended", color: "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-[#1a1a1a]" };
    };

    const getDuration = (start: Date, end: Date) => {
        return Math.round((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60));
    };
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<{ id: string, title: string } | null>(null);

    const handleDelete = async () => {
        if (!confirmDelete) return;

        setIsDeleting(confirmDelete.id);
        const res = await deleteContest(confirmDelete.id);
        if (res.success) {
            toast.success("Contest deleted successfully");
        } else {
            toast.error(res.error || "Failed to delete contest");
        }
        setIsDeleting(null);
        setConfirmDelete(null);
    };
    return (
        <div className="space-y-6">
            {/* Header with Search and Create */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search contests..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-[#333] bg-white dark:bg-[#141414] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                    />
                </div>

                {canCreate && (
                    <Link
                        href="/dashboard/contests/create"
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold hover:bg-orange-600 dark:hover:bg-gray-200 shadow-sm transition-colors rounded-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Create Contest
                    </Link>
                )}
            </div>

            {/* Table */}
            {filteredContests.length === 0 ? (
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] p-16 text-center">
                    <Trophy className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No contests found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {searchQuery ? "Try adjusting your search query" : "No contests available at the moment"}
                    </p>
                </div>
            ) : (
                <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#262626]">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Contest</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Start Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Problems</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Visibility</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-[#262626]">
                                {filteredContests.map((contest) => {
                                    const status = getStatus(contest);
                                    return (
                                        <tr key={contest.id} className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a]">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-200">{contest.title}</div>
                                                    {contest.description && (
                                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{contest.description}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold ${status.color}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                    {format(new Date(contest.startTime), "MMM d, yyyy HH:mm")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <Timer className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                                    {getDuration(contest.startTime, contest.endTime)}h
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-700 dark:text-gray-300">{contest._count?.problems || 0}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    {contest.visibility === 'PUBLIC' && <Globe className="w-4 h-4" />}
                                                    {contest.visibility === 'INSTITUTION' && <School className="w-4 h-4" />}
                                                    {contest.visibility === 'CLASSROOM' && <Users className="w-4 h-4" />}
                                                    <span className="capitalize">{contest.visibility.toLowerCase()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/contests/${contest.id}/edit`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 rounded"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                        Edit
                                                    </Link>
                                                    <Link
                                                        href={`/dashboard/contests/${contest.id}/participants`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20 rounded"
                                                    >
                                                        <Users className="w-3.5 h-3.5" />
                                                        Participants
                                                    </Link>
                                                    <button
                                                        onClick={() => setConfirmDelete({ id: contest.id, title: contest.title })}
                                                        disabled={isDeleting === contest.id}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded disabled:opacity-50 transition-all uppercase tracking-widest group/del"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5 group-hover/del:rotate-12 transition-transform" />
                                                        Delete
                                                    </button>
                                                    <Link
                                                        href={`/contest/${contest.id}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-all"
                                                    >
                                                        View
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {confirmDelete && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isDeleting && setConfirmDelete(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-500" />
                                </div>

                                <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2">
                                    Execute Deletion?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium px-4">
                                    Are you sure you want to permanently remove <span className="text-red-500 font-black italic">"{confirmDelete.title}"</span>? This action will destroy all participant history and cannot be undone.
                                </p>
                            </div>

                            <div className="flex bg-gray-50/50 dark:bg-[#141414]/50 border-t border-gray-100 dark:border-white/5">
                                <button
                                    onClick={() => setConfirmDelete(null)}
                                    disabled={!!isDeleting}
                                    className="flex-1 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors border-r border-gray-100 dark:border-white/5 disabled:opacity-50"
                                >
                                    Abort Operation
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={!!isDeleting}
                                    className="flex-1 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                                            Neutralizing...
                                        </>
                                    ) : (
                                        "Confirm Deletion"
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
