"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import { Suspense } from "react";

function CreateProblemContent() {
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

export default function CreateProblemPage() {
    return (
        <Suspense fallback={
            <div className="w-full max-w-5xl mx-auto pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        }>
            <CreateProblemContent />
        </Suspense>
    );
}
