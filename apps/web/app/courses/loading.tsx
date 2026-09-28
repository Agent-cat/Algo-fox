export default function CoursesLoading() {
    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23]">
            <main className="w-full px-6 lg:px-12 pt-6 pb-20">
                <div className="space-y-8">
                    <header className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight mb-6">
                            Courses
                        </h1>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="w-full md:flex-1 h-10 bg-gray-50/50 dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-lg animate-pulse" />
                            <div className="w-48 h-10 bg-gray-100 dark:bg-[#1D1E23] rounded-lg animate-pulse" />
                        </div>
                    </header>
                    <div className="pt-2">
                        <div className="mb-6">
                            <div className="w-32 h-6 bg-gray-100 dark:bg-[#1D1E23] rounded animate-pulse" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-[400px] rounded-4xl bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-white/10 animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
