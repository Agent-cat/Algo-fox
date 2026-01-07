"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCategoryById,
  getCategoryProblems,
  removeProblemFromCategory,
  createProblemAndAddToCategory,
} from "@/actions/category.action";
import { Plus, Trash2, ArrowLeft, X, BookText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Difficulty, ProblemDomain } from "@prisma/client";
import ProblemForm from "@/components/admin/ProblemForm";
import ConceptForm from "@/components/admin/ConceptForm";

type ProblemWithStats = {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  type: any;
  acceptance: number;
  solved?: number | null;
  isSolved?: boolean;
};

import { Suspense } from "react";

function DsaCategoryProblemsContent() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id as string;

  const [category, setCategory] = useState<any>(null);
  const [problems, setProblems] = useState<ProblemWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConceptModal, setShowConceptModal] = useState(false);

  useEffect(() => {
    if (categoryId) {
      fetchCategory();
      fetchProblems();
    }
  }, [categoryId]);

  const fetchCategory = async () => {
    try {
      const res = await getCategoryById(categoryId);
      if (res.success) {
        setCategory(res.category);
      } else {
        toast.error(res.error || "Failed to load category");
      }
    } catch (error) {
      console.error("Failed to fetch category:", error);
      toast.error("Failed to load category");
    }
  };

  const fetchProblems = async () => {
    setIsLoading(true);
    try {
      const res = await getCategoryProblems(categoryId, 1, 100);
      setProblems(res.problems);
    } catch (error) {
      console.error("Failed to fetch problems:", error);
      toast.error("Failed to load problems");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  const handleCreateProblem = async (data: any) => {
    const res = await createProblemAndAddToCategory(categoryId, data);
    if (res.success) {
      toast.success("Problem created and added to category");
      setShowAddModal(false);
      fetchProblems();
    } else {
      toast.error(res.error || "Failed to create problem");
      throw new Error(res.error || "Failed to create problem");
    }
    return res;
  };

  const handleCreateConcept = async (data: any) => {
    const res = await createProblemAndAddToCategory(categoryId, data);
    if (res.success) {
      toast.success("Concept created and added to category");
      setShowConceptModal(false);
      fetchProblems();
    } else {
      toast.error(res.error || "Failed to create concept");
      throw new Error(res.error || "Failed to create concept");
    }
    return res;
  };

  const handleRemove = async (problemId: string) => {
    if (!confirm("Are you sure you want to remove this problem from the category?")) {
      return;
    }

    const res = await removeProblemFromCategory(categoryId, problemId);
    if (res.success) {
      toast.success("Problem removed from category");
      fetchProblems();
    } else {
      toast.error(res.error || "Failed to remove problem");
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "MEDIUM":
        return "text-amber-700 bg-amber-50 border-amber-200";
      case "HARD":
        return "text-rose-700 bg-rose-50 border-rose-200";
      case "CONCEPT":
        return "text-indigo-700 bg-indigo-50 border-indigo-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };


  if (isLoading && !category) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto ml-0">
        <Link
          href="/admin/dsa/categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to DSA Categories
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {category?.name || "Category Problems"}
            </h1>
            <p className="text-gray-500">
              {category?.description || "Manage problems in this category"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowConceptModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl transition-all border border-indigo-200"
          >
            <BookText className="w-5 h-5" />
            Add Concept
          </button>
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-orange-200"
          >
            <Plus className="w-5 h-5" />
            Add Problem
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : problems.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="mb-4">No problems in this category yet.</p>
            <button
              onClick={handleAddClick}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add First Problem
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {problems.map((problem) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{problem.title}</div>
                      <div className="text-xs text-gray-400 font-mono mt-0.5">
                        {problem.slug}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/problems/${problem.id}/edit`}
                          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Edit Problem"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleRemove(problem.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove from Category"
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

      {/* Add Problem Modal */}
      {
        showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 relative">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900">Create New Problem</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <ProblemForm
                  onSubmit={handleCreateProblem}
                  submitLabel="Create Problem"
                  domain="DSA"
                  redirectPath={undefined}
                />
              </div>
            </div>
          </div>
        )
      }

      {/* Add Concept Modal */}
      {
        showConceptModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 relative">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10 rounded-t-2xl">
                <h2 className="text-2xl font-bold text-gray-900">Create New Concept</h2>
                <button
                  onClick={() => setShowConceptModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <ConceptForm
                  onSubmit={handleCreateConcept}
                />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}

export default function DsaCategoryProblemsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    }>
      <DsaCategoryProblemsContent />
    </Suspense>
  );
}

