
export default function Loading() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-8 transition-colors">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
                {/* MODE TOGGLE SKELETON */}
                <div className="flex justify-center mb-8">
                    <div className="bg-gray-100 dark:bg-[#141414] rounded-full p-1 w-64 h-12 animate-pulse" />
                </div>

                {/* CONTENT SKELETON */}
                <div className="w-full max-w-7xl mx-auto">
                    {/* SEARCH BAR SKELETON */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 dark:bg-[#141414] rounded-xl w-full max-w-xl h-12 animate-pulse" />
                    </div>

                    {/* LIST HEADER SKELETON */}
                    <div className="px-6 py-3 border-b border-gray-200 dark:border-[#262626]">
                        <div className="flex gap-4">
                            <div className="flex-1 bg-gray-100 dark:bg-[#141414] h-4 rounded animate-pulse" />
                            <div className="w-24 bg-gray-100 dark:bg-[#141414] h-4 rounded animate-pulse" />
                            <div className="w-24 bg-gray-100 dark:bg-[#141414] h-4 rounded animate-pulse" />
                        </div>
                    </div>

                    {/* PROBLEM ROWS SKELETON */}
                    <div className="space-y-2 mt-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="px-6 py-4 rounded-xl">
                                <div className="flex gap-4 items-center">
                                    <div className="flex-1 bg-gray-100 dark:bg-[#141414] h-6 rounded animate-pulse" />
                                    <div className="w-16 bg-gray-100 dark:bg-[#141414] h-6 rounded-full animate-pulse" />
                                    <div className="w-16 bg-gray-100 dark:bg-[#141414] h-6 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
