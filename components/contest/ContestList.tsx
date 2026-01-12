"use client";

import { Plus, Search, Trophy, Calendar, Users, Globe, School, ArrowRight, Timer } from "lucide-react";
import Link from "next/link";
import { useState, useMemo } from "react";
import { format } from "date-fns";

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

        if (now >= start && now <= end) return { label: "Live", color: "text-red-600 bg-red-50" };
        if (now < start) return { label: "Upcoming", color: "text-blue-600 bg-blue-50" };
        return { label: "Ended", color: "text-gray-600 bg-gray-50" };
    };

    const getDuration = (start: Date, end: Date) => {
        return Math.round((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60));
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
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                    />
                </div>

                {canCreate && (
                    <Link
                        href="/dashboard/contests/create"
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white font-semibold hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        <Plus className="w-5 h-5" />
                        Create Contest
                    </Link>
                )}
            </div>

            {/* Table */}
            {filteredContests.length === 0 ? (
                <div className="bg-white border border-gray-200 p-16 text-center">
                    <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No contests found</h3>
                    <p className="text-sm text-gray-500">
                        {searchQuery ? "Try adjusting your search query" : "No contests available at the moment"}
                    </p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contest</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Time</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Problems</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Visibility</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredContests.map((contest) => {
                                    const status = getStatus(contest);
                                    return (
                                        <tr key={contest.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{contest.title}</div>
                                                    {contest.description && (
                                                        <div className="text-xs text-gray-500 mt-1 line-clamp-1">{contest.description}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold ${status.color}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    {format(new Date(contest.startTime), "MMM d, yyyy HH:mm")}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                                    <Timer className="w-4 h-4 text-gray-400" />
                                                    {getDuration(contest.startTime, contest.endTime)}h
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-700">{contest._count?.problems || 0}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    {contest.visibility === 'PUBLIC' && <Globe className="w-4 h-4" />}
                                                    {contest.visibility === 'INSTITUTION' && <School className="w-4 h-4" />}
                                                    {contest.visibility === 'CLASSROOM' && <Users className="w-4 h-4" />}
                                                    <span className="capitalize">{contest.visibility.toLowerCase()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/dashboard/contests/${contest.id}/participants`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 hover:bg-orange-100 transition-colors rounded"
                                                    >
                                                        <Users className="w-3.5 h-3.5" />
                                                        Participants
                                                    </Link>
                                                    <Link
                                                        href={`/contest/${contest.id}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
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
        </div>
    );
}
