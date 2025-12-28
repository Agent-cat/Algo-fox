"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";

export default function CreateProblemPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Problem</h1>
                    <p className="text-gray-500">Add a new challenge for the community.</p>
                </div>

                <ProblemForm
                    onSubmit={createProblem}
                    submitLabel="Create Problem"
                />
            </div>
        </div>
    );
}
