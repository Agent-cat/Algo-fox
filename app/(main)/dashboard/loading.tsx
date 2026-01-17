export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 space-y-6">
            {/* PROFILE SKELETON */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-50 animate-pulse">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-[#1a1a1a] mb-4" />
                <div className="h-4 w-32 bg-gray-200 dark:bg-[#1a1a1a] rounded mb-2" />
                <div className="h-3 w-48 bg-gray-200 dark:bg-[#1a1a1a] rounded" />
              </div>
            </div>

            {/* ACHIEVEMENTS SKELETON */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-37.5 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 dark:bg-[#1a1a1a] rounded mb-4" />
              <div className="space-y-3">
                <div className="h-3 w-full bg-gray-200 dark:bg-[#1a1a1a] rounded" />
                <div className="h-3 w-2/3 bg-gray-200 dark:bg-[#1a1a1a] rounded" />
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9 space-y-6">
            {/* OVERVIEW SKELETON */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-30" />
              <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-30" />
              <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-30" />
            </div>

            {/* HEATMAP SKELETON */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-75 animate-pulse" />

            {/* RECENT SUBMISSIONS SKELETON */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] p-6 h-100 animate-pulse" />
          </main>
        </div>
      </div>
    </div>
  );
}
