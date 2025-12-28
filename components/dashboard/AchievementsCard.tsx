import { Trophy } from "lucide-react";

export function AchievementsCard() {
    return (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300  hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-dashed border-gray-200 bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
            </div>
            <div className="p-6">
                <div className="text-center py-6">
                    <div className="relative inline-block mb-4">
                        <Trophy className="w-16 h-16 mx-auto text-gray-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">No badges yet</p>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                        Complete monthly streaks or climb up the challenge leaderboard to earn badges
                    </p>
                </div>
            </div>
        </div>
    );
}
