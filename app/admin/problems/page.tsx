"use client";

import { useEffect, useState } from "react";
import { getAdminProblems, deleteProblem } from "@/actions/problems";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdminProblemsPage() {
    const [problems, setProblems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchProblems = async () => {
        setIsLoading(true);
        const res = await getAdminProblems(1, 100);
        setProblems(res.problems);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchProblems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this problem?")) return;

        const res = await deleteProblem(id);
        if (res.success) {
            toast.success("Problem deleted");
            fetchProblems(); // Refresh list
            router.refresh(); // Refresh server state if needed
        } else {
            toast.error(res.error || "Failed to delete");
        }
    }

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "text-emerald-700 bg-emerald-50 border-emerald-200";
            case "MEDIUM": return "text-amber-700 bg-amber-50 border-amber-200";
            case "HARD": return "text-rose-700 bg-rose-50 border-rose-200";
            default: return "text-gray-700 bg-gray-50 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
            <div className="max-w-6xl mx-auto ml-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Problems</h1>
                        <p className="text-gray-500">Create, edit, and manage coding challenges.</p>
                    </div>
                    <Link
                        href="/admin/problems/create"
                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-200"
                    >
                        <Plus className="w-5 h-5" />
                        New Problem
                    </Link>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                        </div>
                    ) : problems.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">
                            No problems found. Create one to get started.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Difficulty</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {problems.map((problem) => (
                                        <tr key={problem.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900">{problem.title}</div>
                                                <div className="text-xs text-gray-400 font-mono mt-0.5">{problem.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(problem.difficulty)}`}>
                                                    {problem.difficulty}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    {problem.hidden ? (
                                                        <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                                                            <EyeOff className="w-3.5 h-3.5" /> Hidden
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                                            <Eye className="w-3.5 h-3.5" /> Visible
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/admin/problems/${problem.id}/edit`}
                                                        className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(problem.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
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
        </div>
    );
}
