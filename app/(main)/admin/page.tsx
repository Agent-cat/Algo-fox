import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { Users, FileCode, Trophy, Send, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

async function AdminDashboardStats() {
    "use cache: private";
    cacheLife("minutes");

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user || (session.user as any).role !== "ADMIN") {
        redirect("/dashboard");
    }

    const [userCount, problemCount, submissionCount, contestCount] = await Promise.all([
        prisma.user.count(),
        prisma.problem.count(),
        prisma.submission.count(),
        prisma.contest.count(),
    ]);

    const stats = [
        { label: "Total Users", value: userCount, icon: Users, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
        { label: "Active Problems", value: problemCount, icon: FileCode, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-500/10", border: "border-orange-100 dark:border-orange-500/20" },
        { label: "Total Submissions", value: submissionCount, icon: Send, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-500/10", border: "border-green-100 dark:border-green-500/20" },
        { label: "Scheduled Contests", value: contestCount, icon: Trophy, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20" },
    ];

    const actions = [
        {
            title: "Content Management",
            links: [
                { name: "Create Problem", href: "/admin/problems/create" },
                { name: "Manage Categories", href: "/admin/categories" },
                { name: "DSA Challenges", href: "/admin/dsa/problems" },
            ]
        },
        {
            title: "System & Users",
            links: [
                { name: "Manage Users", href: "/admin/users" },
                { name: "SQL Problems", href: "/admin/sql/problems" },
                { name: "Aptitude Problems", href: "/admin/aptitude/problems" },
            ]
        },
        {
            title: "Institutions",
            links: [
                { name: "View All Icons", href: "/admin/institutions" },
                { name: "Create New", href: "/admin/institutions/create" },
            ]
        }
    ];

    return (
        <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className={`relative group bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-300 dark:border-white/10 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 ${stat.bg} rounded-xl`}>
                                    <Icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                                <TrendingUp className="w-4 h-4 text-gray-300 dark:text-gray-700" />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.value.toLocaleString()}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Structured Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {actions.map((group) => (
                    <div key={group.title} className="bg-white/50 dark:bg-[#141414]/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 p-6 flex flex-col h-full">
                        <h2 className="text-md font-black text-gray-900 dark:text-gray-100 mb-6 uppercase tracking-widest flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-orange-500" />
                             {group.title}
                        </h2>
                        <div className="space-y-2 flex-1">
                            {group.links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-2xl hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all group"
                                >
                                    <span className="font-bold text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">{link.name}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function AdminDashboardPage() {
    return (
        <div className="w-full max-w-7xl mx-auto py-4">
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-orange-200 dark:border-orange-500/10">
                    System Control
                </div>
                <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">
                    Admin Dashboard
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 mt-2 font-medium">Manage your platform content and users from one central hub.</p>
            </div>

            <Suspense fallback={
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-40 bg-gray-100 dark:bg-white/5 rounded-2xl animate-pulse border border-dashed border-gray-200 dark:border-gray-800" />
                    ))}
                </div>
            }>
                <AdminDashboardStats />
            </Suspense>
        </div>
    );
}
