export default function TopicDetailLoading() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] pb-24 animate-pulse">
      {/* Breadcrumbs Skeleton */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4 flex items-center gap-2">
        <div className="w-10 h-3 bg-gray-200 dark:bg-white/5 rounded" />
        <div className="w-3 h-3 bg-gray-200 dark:bg-white/5 rounded-full" />
        <div className="w-24 h-3 bg-gray-200 dark:bg-white/5 rounded" />
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Widget Skeleton */}
        <div className="bg-white dark:bg-[#202227] rounded-3xl p-6 md:p-8 border border-gray-200 dark:border-white/10 mb-6 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
          <div className="w-20 h-24 md:w-24 md:h-28 bg-gray-200 dark:bg-white/5 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <div className="w-48 h-3.5 bg-gray-200 dark:bg-white/5 rounded" />
            <div className="w-64 h-8 bg-gray-200 dark:bg-white/5 rounded-lg" />
            <div className="w-full max-w-md h-3.5 bg-gray-200 dark:bg-white/5 rounded" />
            <div className="flex items-center gap-3 pt-2">
              <div className="w-24 h-10 bg-gray-200 dark:bg-white/5 rounded-full" />
              <div className="w-10 h-10 bg-gray-200 dark:bg-white/5 rounded-full" />
            </div>
          </div>
        </div>

        {/* Progress Bar Area Skeleton */}
        <div className="bg-white dark:bg-[#202227] rounded-3xl p-6 border border-gray-200 dark:border-white/10 mb-6">
          <div className="flex justify-between items-center mb-3">
            <div className="w-32 h-4 bg-gray-200 dark:bg-white/5 rounded" />
            <div className="w-12 h-4 bg-gray-200 dark:bg-white/5 rounded" />
          </div>
          <div className="w-full bg-gray-100 dark:bg-white/5 h-2.5 rounded-full" />
        </div>

        {/* Problem List Table Skeleton */}
        <div className="bg-white dark:bg-[#202227] rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden">
          <div className="grid grid-cols-[1fr_120px] bg-gray-50/50 dark:bg-white/2 border-b border-gray-200 dark:border-white/10 px-6 py-4">
            <div className="w-12 h-3 bg-gray-200 dark:bg-white/5 rounded" />
            <div className="w-16 h-3 bg-gray-200 dark:bg-white/5 rounded ml-auto" />
          </div>
          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="grid grid-cols-[1fr_120px] items-center px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-gray-200 dark:bg-white/5 rounded-full shrink-0" />
                  <div className="w-48 md:w-64 h-4 bg-gray-200 dark:bg-white/5 rounded" />
                </div>
                <div className="w-12 h-3.5 bg-gray-200 dark:bg-white/5 rounded ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
