export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* PROFILE SECTION SKELETON */}
          <aside className="lg:col-span-3 space-y-6">
            {/* User Profile Card Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 animate-pulse space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/10 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-3 w-1/2 bg-gray-200 dark:bg-white/10 rounded" />
                </div>
              </div>
              <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 dark:bg-white/10 rounded" />
                <div className="h-3 w-4/5 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
            </div>

            {/* Profiles Status Card Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 animate-pulse space-y-4">
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-white/10 rounded" />
              <div className="space-y-3">
                <div className="h-12 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                <div className="h-12 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                <div className="h-12 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
              </div>
            </div>

            {/* Achievements Card Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 animate-pulse space-y-4">
              <div className="h-4 w-2/5 bg-gray-200 dark:bg-white/10 rounded" />
              <div className="flex gap-4 justify-around py-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10" />
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10" />
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-white/10" />
              </div>
            </div>

            {/* Languages Card Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 animate-pulse space-y-4">
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-white/10 rounded" />
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-3 w-8 bg-gray-200 dark:bg-white/10 rounded" />
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full" />
              </div>
            </div>
          </aside>

          {/* MAIN COLUMN SKELETON */}
          <main className="lg:col-span-9 space-y-8">
            {/* ProblemOverviewCard Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 h-[500px] animate-pulse flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-gray-200 dark:bg-white/10 rounded" />
                  <div className="h-3 w-40 bg-gray-200 dark:bg-white/10 rounded" />
                </div>
                <div className="h-8 w-60 bg-gray-200 dark:bg-white/10 rounded-full" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-12 py-8">
                <div className="w-48 h-48 rounded-full border-8 border-gray-200 dark:border-white/10 flex items-center justify-center">
                  <div className="h-10 w-20 bg-gray-200 dark:bg-white/10 rounded" />
                </div>
                <div className="w-1/3 space-y-4">
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                  <div className="h-10 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                </div>
              </div>
            </div>

            {/* Submission Activity Heatmap Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 animate-pulse space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-36 bg-gray-200 dark:bg-white/10 rounded" />
                <div className="h-3 w-28 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
              <div className="h-36 w-full bg-gray-200 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5" />
            </div>

            {/* Recent Submissions Skeleton */}
            <div className="bg-[#fafafa] dark:bg-[#1D1E23] rounded-3xl border-2 border-dotted border-gray-300 dark:border-white/20 p-6 animate-pulse space-y-6">
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded" />
                <div className="h-3 w-48 bg-gray-200 dark:bg-white/10 rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-16 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                <div className="h-16 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
                <div className="h-16 w-full bg-gray-200 dark:bg-white/10 rounded-xl" />
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
