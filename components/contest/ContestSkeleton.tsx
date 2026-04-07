import { Trophy, Globe } from "lucide-react";

export function ContestSkeleton() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto relative">
                {/* Background Glow */}
                <div className="absolute left-1/2 -top-24 -translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-orange-600/20 dark:bg-orange-500/10 blur-[100px]"></div>

                <div className="text-center mb-16 relative z-10">
                    <div className="flex justify-center">
                        <div className="bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md p-1 rounded-xl border border-gray-200 dark:border-[#262626] shadow-sm flex items-center gap-1">
                            <div className="px-6 py-2 rounded-lg bg-orange-600/10 animate-pulse flex items-center gap-2">
                                <Trophy className="w-3.5 h-3.5 text-orange-600/50" />
                                <div className="h-3 w-16 bg-orange-600/20 rounded"></div>
                            </div>
                            <div className="px-6 py-2 rounded-lg flex items-center gap-2 opacity-50">
                                <Globe className="w-3.5 h-3.5 text-gray-400" />
                                <div className="h-3 w-16 bg-gray-200 dark:bg-[#262626] rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-5 shadow-sm overflow-hidden relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-[#262626] animate-pulse rounded-lg"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 w-full bg-gray-100 dark:bg-[#1a1a1a] animate-pulse rounded"></div>
                                    <div className="h-4 w-2/3 bg-gray-100 dark:bg-[#1a1a1a] animate-pulse rounded"></div>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="h-8 w-24 bg-gray-200 dark:bg-[#262626] animate-pulse rounded-lg"></div>
                                    <div className="h-8 w-8 bg-gray-200 dark:bg-[#262626] animate-pulse rounded-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
