"use client";

import { useEffect, useState } from "react";
import { getLeaderboardData, LeaderboardEntry } from "@/actions/leaderboard.action";
import { motion } from "framer-motion";
import Link from "next/link";
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

    const getRankStyle = (rank: number) => {
        if (rank === 1) return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
        if (rank === 2) return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
        if (rank === 3) return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800";
        return "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-transparent";
    };

    return (
        <div className="min-h-screen bg-white pb-20 transition-colors">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 py-10 mt-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-black tracking-tight">Global Leaderboard</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Top solvers and their scores based on problem difficulty.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        <div className="col-span-1 text-center">Rank</div>
                        <div className="col-span-5 md:col-span-4">User</div>
                        <div className="col-span-2 text-center hidden md:block">Solved</div>
                        <div className="col-span-3 md:col-span-3">Difficulty Breakdown</div>
                        <div className="col-span-3 md:col-span-2 text-right pr-4">Fox Score</div>
                    </div>

                    {/* Rows */}
                    {isLoading ? (
                        <div className="p-12 flex justify-center">
                            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {leaderboard.map((user, index) => (
                                <motion.div
                                    key={user.userId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    {/* Rank */}
                                    <div className="col-span-1 flex justify-center">
                                        <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border ${getRankStyle(user.rank)}`}>
                                            {user.rank}
                                        </span>
                                    </div>

                                    {/* User */}
                                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden ring-2 ring-transparent group-hover:ring-orange-100 dark:group-hover:ring-orange-900 transition-all flex items-center justify-center text-gray-400 dark:text-gray-500 font-bold">
                                            {user.image ? (
                                                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name.charAt(0).toUpperCase()
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white line-clamp-1">{user.name}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-0.5">
                                                {user.tags.length > 0 && (
                                                    <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[10px] uppercase font-medium">{user.tags[0]}</span>
                                                )}
                                                {/* Social Icons */}
                                                <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    {user.socials.github && (
                                                        <a href={user.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" title="GitHub">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                        </a>
                                                    )}
                                                    {user.socials.leetcode && (
                                                        <span className="text-[10px] text-orange-400 font-bold" title="LeetCode">LC</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Solved */}
                                    <div className="col-span-2 md:block hidden text-center">
                                        <div className="font-bold text-black">{user.problemsSolved}</div>
                                        <div className="text-[10px] text-gray-400 dark:text-gray-500">Problems</div>
                                    </div>

                                    {/* Breakdown */}
                                    <div className="col-span-3 md:col-span-3">
                                        <div className="flex items-center gap-1 h-2 rounded-full overflow-hidden bg-gray-100 max-w-[120px]">
                                            {user.stats.easy > 0 && (
                                                <div
                                                    className="h-full bg-green-500"
                                                    style={{ width: `${(user.stats.easy / (user.problemsSolved || 1)) * 100}%` }}
                                                />
                                            )}
                                            {user.stats.medium > 0 && (
                                                <div
                                                    className="h-full bg-orange-500"
                                                    style={{ width: `${(user.stats.medium / (user.problemsSolved || 1)) * 100}%` }}
                                                />
                                            )}
                                            {user.stats.hard > 0 && (
                                                <div
                                                    className="h-full bg-red-500"
                                                    style={{ width: `${(user.stats.hard / (user.problemsSolved || 1)) * 100}%` }}
                                                />
                                            )}
                                            {user.problemsSolved === 0 && <div className="w-full h-full bg-gray-200" />}
                                        </div>
                                        <div className="flex gap-2 mt-1 text-[10px] text-gray-400">
                                            <span className="text-green-600 font-medium">{user.stats.easy}E</span>
                                            <span className="text-orange-600 font-medium">{user.stats.medium}M</span>
                                            <span className="text-red-600 font-medium">{user.stats.hard}H</span>
                                        </div>
                                    </div>

                                    {/* Score */}
                                    <div className="col-span-3 md:col-span-2 text-right pr-4">
                                        <div className="font-extrabold text-black text-lg">{user.totalScore.toLocaleString()}</div>
                                        <div className="text-[10px] text-orange-500 dark:text-orange-400 font-bold uppercase tracking-wide">Points</div>
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
