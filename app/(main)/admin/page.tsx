import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Users, FileCode, Trophy, Send, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

async function AdminDashboardStats() {
    "use cache: private";

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/dashboard");
    }

    // Fetch basic stats
    const [userCount, problemCount, submissionCount, contestCount] = await Promise.all([
        prisma.user.count(),
        prisma.problem.count(),
        prisma.submission.count(),
        prisma.contest.count(),
    ]);

    const stats = [
        { label: "Total Users", value: userCount, icon: Users, color: "text-blue-600 dark:text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { label: "Problems", value: problemCount, icon: FileCode, color: "text-orange-600 dark:text-orange-500", bg: "bg-orange-50 dark:bg-orange-500/10" },
        { label: "Submissions", value: submissionCount, icon: Send, color: "text-green-600 dark:text-green-500", bg: "bg-green-50 dark:bg-green-500/10" },
        { label: "Contests", value: contestCount, icon: Trophy, color: "text-purple-600 dark:text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-[#262626] p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-100 dark:border-[#262626] p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Link
                        href="/admin/problems/create"
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group"
                    >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">Create Problem</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group"
                    >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">Manage Categories</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link
                        href="/admin/dsa/problems"
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group"
                    >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">DSA Problems</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link
                        href="/admin/sql/problems"
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group"
                    >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">SQL Problems</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group"
                    >
                        <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">Manage Users</span>
                        <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-orange-600 dark:group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Admin Dashboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of platform statistics and quick actions</p>
            </div>
            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-24 bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl animate-pulse" />
                    ))}
                </div>
            }>
                <AdminDashboardStats />
            </Suspense>
        </div>
    );
}
