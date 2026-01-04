"use client";

import { useEffect, useState } from "react";
import { getAdminProblems, deleteProblem } from "@/actions/problems";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AdminListPage from "@/components/admin/AdminListPage";

export default function DsaAdminProblemsPage() {
    const [problems, setProblems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchProblems = async () => {
        setIsLoading(true);
        try {
            const res = await getAdminProblems(1, 100, "DSA", "CONCEPT");
            setProblems(res.problems);
        } catch (error) {
            toast.error("Failed to load problems");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this problem?")) return;

        const res = await deleteProblem(id);
        if (res.success) {
            toast.success("Problem deleted");
            fetchProblems();
            router.refresh();
        } else {
            toast.error(res.error || "Failed to delete");
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY": return "text-emerald-700 bg-emerald-50 border-emerald-200";
            case "MEDIUM": return "text-amber-700 bg-amber-50 border-amber-200";
            case "HARD": return "text-rose-700 bg-rose-50 border-rose-200";
            default: return "text-gray-700 bg-gray-50 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen pt-4">
            <AdminListPage
                title="DSA Practice Problems"
                subtitle="Create, edit, and manage DSA coding challenges with ease."
                createLink="/admin/dsa/problems/create"
                createLabel="New Problem"
                data={problems}
                isLoading={isLoading}
                searchPlaceholder="Search by title or slug..."
                searchFields={["title", "slug"]}
                columns={[
                    { label: "Title" },
                    { label: "Difficulty" },
                    { label: "Status" },
                    { label: "Actions", className: "text-right" }
                ]}
                renderItem={(problem) => (
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
                )}
            />
        </div>
    );
}


