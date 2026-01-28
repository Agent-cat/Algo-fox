"use client";

import { getProblemById, updateProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import ConceptForm from "@/components/admin/ConceptForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Difficulty } from "@prisma/client";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function EditProblemContent() {
    const params = useParams();
    const id = params?.id as string;
    const [problem, setProblem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProblem = async () => {
            if (!id) return;
            const res = await getProblemById(id);
            if (res.success) {
                setProblem(res.data);
            } else {
                toast.error("Failed to fetch problem");
            }
            setIsLoading(false);
        };
        fetchProblem();
    }, [id]);

    if (isLoading) {
        return (
            <div className="h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                    <p className="text-gray-500 font-medium">Loading problem data...</p>
                </div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="h-[60vh] flex items-center justify-center text-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Problem Not Found</h1>
                    <p className="text-gray-500">The problem you are looking for does not exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex flex-col gap-1 mb-8">
                <Link
                    href="/admin/dsa/problems"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Problems
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Edit Problem</h1>
                <p className="text-gray-500 dark:text-gray-400">Update problem details and test cases.</p>
            </div>

            <div>
                {problem.difficulty === "CONCEPT" ? (
                    <ConceptForm
                        initialData={{
                            title: problem.title,
                            slug: problem.slug,
                            description: problem.description,
                            hidden: problem.hidden,
                        }}
                        onSubmit={(data) => updateProblem(id, data)}
                        submitLabel="Save Changes"
                    />
                ) : (
                    <ProblemForm
                        initialData={{
                            title: problem.title,
                            slug: problem.slug,
                            description: problem.description,
                            difficulty: problem.difficulty as Difficulty,
                            hidden: problem.hidden,
                            hiddenQuery: problem.hiddenQuery || null,
                            testCases: problem.testCases || [],
                            tags: problem.tags || [],
                            useFunctionTemplate: problem.useFunctionTemplate || false,
                            functionTemplates: problem.functionTemplates || [],
                            solution: problem.solution || ""
                        }}
                        onSubmit={(data) => updateProblem(id, data)}
                        submitLabel="Save Changes"
                        domain={problem.domain || "DSA"}
                    />
                )}
            </div>
        </div>
    );
}

export default function EditProblemPage() {
    return (
        <Suspense fallback={
            <div className="h-[60vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                    <p className="text-gray-500 font-medium">Loading problem data...</p>
                </div>
            </div>
        }>
            <EditProblemContent />
        </Suspense>
    );
}
