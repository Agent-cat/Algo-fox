"use client";

import { useEffect, useState } from "react";
import { getLeaderboardData, LeaderboardEntry } from "@/actions/leaderboard.action";
import { motion } from "framer-motion";
import { Trophy, Medal } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function LeaderboardPage() {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getLeaderboardData();
                setLeaderboard(data);
            } catch (error) {
                console.error("Failed to fetch leaderboard", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const getRankIcon = (rank: number) => {
        if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-gray-400 fill-gray-400" />;
        if (rank === 3) return <Medal className="w-5 h-5 text-orange-500 fill-orange-500" />;
        return null;
    };

    const getRankStyle = (rank: number) => {
        if (rank === 1) return "bg-yellow-50 border-yellow-200 text-yellow-700";
        if (rank === 2) return "bg-gray-50 border-gray-200 text-gray-600";
        if (rank === 3) return "bg-orange-50 border-orange-200 text-orange-600";
        return "bg-white border-gray-200 text-gray-600";
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-12 mt-16">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leaderboard</h1>
                            <p className="text-gray-500 mt-1">Top students ranked by their problem-solving skills</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 border-b border-gray-200">
                        <div className="col-span-1 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Rank
                        </div>
                        <div className="col-span-5 md:col-span-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Student
                        </div>
                        <div className="col-span-2 text-center hidden md:block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Solved
                        </div>
                        <div className="col-span-3 md:col-span-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Breakdown
                        </div>
                        <div className="col-span-3 md:col-span-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider pr-4">
                            Points
                        </div>
                    </div>

                    {/* Table Rows */}
                    {isLoading ? (
                        <div className="p-12 flex justify-center">
                            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                        </div>
                    ) : leaderboard.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            <Trophy className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                            <p className="font-medium">No data available</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {leaderboard.map((user, index) => (
                                <motion.div
                                    key={user.userId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50/50 transition-colors group"
                                >
                                    {/* Rank */}
                                    <div className="col-span-1 flex justify-center">
                                        <div className={`flex items-center justify-center gap-2 w-10 h-10 rounded-lg border ${getRankStyle(user.rank)}`}>
                                            {getRankIcon(user.rank) || (
                                                <span className="text-sm font-bold">{user.rank}</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* User */}
                                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-orange-50 border-2 border-white ring-2 ring-gray-100 overflow-hidden flex items-center justify-center text-orange-600 font-bold text-sm shadow-sm">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-semibold text-gray-900 truncate">{user.name}</div>
                                            <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                                                {user.tags.length > 0 && (
                                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-medium uppercase">
                                                        {user.tags[0]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Solved */}
                                    <div className="col-span-2 hidden md:flex flex-col items-center">
                                        <div className="font-bold text-gray-900 text-lg">{user.problemsSolved}</div>
                                        <div className="text-xs text-gray-500">Problems</div>
                                    </div>

                                    {/* Difficulty Breakdown */}
                                    <div className="col-span-3 md:col-span-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-100">
                                                {user.problemsSolved > 0 ? (
                                                    <>
                                                        {user.stats.easy > 0 && (
                                                            <div
                                                                className="h-full bg-emerald-500"
                                                                style={{ width: `${(user.stats.easy / user.problemsSolved) * 100}%` }}
                                                            />
                                                        )}
                                                        {user.stats.medium > 0 && (
                                                            <div
                                                                className="h-full bg-amber-500"
                                                                style={{ width: `${(user.stats.medium / user.problemsSolved) * 100}%` }}
                                                            />
                                                        )}
                                                        {user.stats.hard > 0 && (
                                                            <div
                                                                className="h-full bg-rose-500"
                                                                style={{ width: `${(user.stats.hard / user.problemsSolved) * 100}%` }}
                                                            />
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mt-2 text-xs text-gray-500">
                                            <span className="font-medium text-emerald-600">{user.stats.easy}E</span>
                                            <span className="font-medium text-amber-600">{user.stats.medium}M</span>
                                            <span className="font-medium text-rose-600">{user.stats.hard}H</span>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="col-span-3 md:col-span-2 flex flex-col items-end pr-4">
                                        <div className="font-extrabold text-gray-900 text-lg">{user.totalScore.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500 font-medium">pts</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
