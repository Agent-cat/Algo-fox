"use client";

import { getProblemById, updateProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Difficulty } from "@prisma/client";

export default function EditProblemPage() {
    const params = useParams();
    const id = params.id as string;
    const [problem, setProblem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProblem = async () => {
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
            <div className="min-h-screen pt-24 pb-12 px-6 bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    <p className="text-gray-500 font-medium">Loading problem...</p>
                </div>
            </div>
        );
    }

    if (!problem) {
        return (
            <div className="min-h-screen pt-24 pb-12 px-6 bg-white text-center">
                <h1 className="text-2xl font-bold text-gray-900">Problem Not Found</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
            <div className="max-w-3xl mx-auto ml-0">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Problem</h1>
                    <p className="text-gray-500">Update problem details and test cases.</p>
                </div>

                <ProblemForm
                    initialData={{
                        title: problem.title,
                        slug: problem.slug,
                        description: problem.description,
                        difficulty: problem.difficulty as Difficulty,
                        hidden: problem.hidden,
                        testCases: problem.testCases || []
                    }}
                    onSubmit={(data) => updateProblem(id, data)}
                    submitLabel="Save Changes"
                />
            </div>
        </div>
    );
}
