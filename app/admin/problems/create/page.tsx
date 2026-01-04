"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";

export default function CreateProblemPage() {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create New Problem</h1>
                <p className="text-gray-500 text-lg">Add a new challenge for the community.</p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-xl shadow-gray-200/40">
                <ProblemForm
                    onSubmit={createProblem}
                    submitLabel="Create Problem"
                />
            </div>
        </div>
    );
}
