"use client";

import { Trophy, Medal, Crown, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface AchievementsCardProps {
    badges?: {
        gold: number;
        silver: number;
        bronze: number;
    };
}

export function AchievementsCard({ badges }: AchievementsCardProps) {
    const earnedBadges = [
        { type: 'gold', count: badges?.gold || 0, icon: Crown, label: 'Gold', color: 'from-yellow-400 to-yellow-600', shadow: 'shadow-yellow-500/30', bg: 'bg-yellow-50' },
        { type: 'silver', count: badges?.silver || 0, icon: Medal, label: 'Silver', color: 'from-slate-300 to-slate-500', shadow: 'shadow-slate-400/30', bg: 'bg-slate-50' },
        { type: 'bronze', count: badges?.bronze || 0, icon: Medal, label: 'Bronze', color: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/30', bg: 'bg-orange-50' },
    ].filter(b => b.count > 0);

    const hasBadges = earnedBadges.length > 0;

    return (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-[#262626] hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full flex flex-col">
            <div className="px-6 py-5 border-b border-dashed border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a] flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Achievements</h3>
                {hasBadges && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                        {earnedBadges.reduce((acc, curr) => acc + curr.count, 0)} Badges
                    </span>
                )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-center">
                {hasBadges ? (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {earnedBadges.map((badge, index) => (
                            <motion.div
                                key={badge.type}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.4, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                                className="relative flex flex-col items-center group cursor-default"
                            >
                                {/* Main Badge Circle */}
                                <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br ${badge.color} text-white shadow-md ${badge.shadow} border-2 border-white dark:border-[#262626] ring-1 ring-gray-100 dark:ring-[#333]`}>
                                    <badge.icon className="w-8 h-8 drop-shadow-sm" strokeWidth={2} />
                                </div>

                                {/* Pill Count Indicator */}
                                <div className="absolute -bottom-2 bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400 px-2 py-0.5 rounded-full border-2 border-white dark:border-[#262626] shadow-sm text-[10px] font-bold tracking-tight z-10">
                                    x{badge.count}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 opacity-70">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative inline-block mb-4"
                        >
                            <Trophy className="w-20 h-20 mx-auto text-gray-200" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                <Lock className="w-4 h-4 text-gray-400" />
                            </div>
                        </motion.div>
                        <p className="text-gray-900 dark:text-gray-100 font-bold mb-1">Locked</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px] mx-auto">
                            Finish in the Top 3 of a contest to unlock your first badge.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
