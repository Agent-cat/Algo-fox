"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function CreateAptitudeProblemContent() {
    return (
        <div className="min-h-screen pt-16 pb-32 bg-white dark:bg-[#121212]">
            {/* Page header */}
            <div className="max-w-6xl mx-auto px-8 pt-10 pb-6 flex items-center gap-4">
                <Link
                    href="/admin/aptitude/problems"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Aptitude Problems
                </Link>
                <span className="text-gray-200 dark:text-gray-700">/</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Create Question</span>
            </div>

            <div className="max-w-6xl mx-auto px-8 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    New Aptitude Question
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Create a new MCQ-style aptitude question.
                </p>
            </div>

            <ProblemForm
                onSubmit={createProblem}
                submitLabel="Publish Question"
                domain="APTITUDE"
                redirectPath="/admin/aptitude/problems"
            />
        </div>
    );
}

export default function CreateAptitudeProblemPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent" />
            </div>
        }>
            <CreateAptitudeProblemContent />
        </Suspense>
    );
}
