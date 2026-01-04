
import { getAdminProblems } from "@/actions/problems";
import { Plus, Pencil, Eye, EyeOff, TrendingUp, Users, FileCode, Activity } from "lucide-react";
import Link from "next/link";
import DeleteProblemButton from "@/components/admin/DeleteProblemButton";

export default async function AdminDashboardPage() {
    const { problems } = await getAdminProblems(1, 100);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "text-emerald-700 bg-emerald-50 border-emerald-200/50";
            case "MEDIUM": return "text-amber-700 bg-amber-50 border-amber-200/50";
            case "HARD": return "text-rose-700 bg-rose-50 border-rose-200/50";
            default: return "text-gray-700 bg-gray-50 border-gray-200/50";
        }
    };

    // Placeholder stats - in a real app these would come from an API
    const stats = [
        { label: "Total Problems", value: problems.length.toString(), change: "+12%", icon: FileCode, color: "text-blue-600 bg-blue-50" },
        { label: "Active Users", value: "1,234", change: "+5%", icon: Users, color: "text-purple-600 bg-purple-50" },
        { label: "Total Submissions", value: "45.2k", change: "+24%", icon: Activity, color: "text-orange-600 bg-orange-50" },
        { label: "Success Rate", value: "32%", change: "+2%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50" },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Overview of your platform's performance.</p>
                </div>
                <Link
                    href="/admin/problems/create"
                    className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="w-5 h-5" />
                    Add Problem
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white/60 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Content Section */}
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl shadow-gray-200/40 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Direct Problems</h2>
                        <p className="text-sm text-gray-500 mt-1">Manage existing coding problems.</p>
                    </div>
                    <div className="flex gap-2">
                        {/* Placeholder filters could go here */}
                    </div>
                </div>

                {problems.length === 0 ? (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileCode className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No problems found</h3>
                        <p className="text-gray-500">Create your first problem to get started.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Difficulty</th>
                                    <th className="px-6 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {problems.map((problem: any) => (
                                    <tr key={problem.id} className="group hover:bg-orange-50/30 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="font-bold text-gray-900">{problem.title}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-1">{problem.slug}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                {problem.hidden ? (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                                                        <EyeOff className="w-3.5 h-3.5" /> Hidden
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/50">
                                                        <Eye className="w-3.5 h-3.5" /> Visible
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                <Link
                                                    href={`/admin/problems/${problem.id}/edit`}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <DeleteProblemButton id={problem.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
