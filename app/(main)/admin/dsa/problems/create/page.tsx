"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function CreateDsaProblemContent() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-3xl mx-auto ml-0">
                <Link
                    href="/admin/dsa/problems"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to DSA Problems
                </Link>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create New DSA Problem</h1>
                    <p className="text-gray-500 dark:text-gray-400">Add a new challenge for the community.</p>
                </div>

                <ProblemForm
                    onSubmit={createProblem}
                    submitLabel="Create Problem"
                    domain="DSA"
                    redirectPath="/admin/dsa/problems"
                />
            </div>
        </div>
    );
}

export default function CreateDsaProblemPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        }>
            <CreateDsaProblemContent />
        </Suspense>
    );
}
