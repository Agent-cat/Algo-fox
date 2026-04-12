"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function CreateSqlProblemContent() {
    return (
        <div className="min-h-screen pt-16 pb-32 bg-white dark:bg-[#121212]">
            {/* Page header */}
            <div className="max-w-6xl mx-auto px-8 pt-10 pb-6 flex items-center gap-4">
                <Link
                    href="/admin/sql/problems"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    SQL Problems
                </Link>
                <span className="text-gray-200 dark:text-gray-700">/</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">Create Problem</span>
            </div>

            <div className="max-w-6xl mx-auto px-8 mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    New SQL Problem
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Fill out the steps below to add a new SQL challenge.
                </p>
            </div>

            <ProblemForm
                onSubmit={createProblem}
                submitLabel="Publish Problem"
                domain="SQL"
                redirectPath="/admin/sql/problems"
            />
        </div>
    );
}

export default function CreateSqlProblemPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
                <div className="animate-spin rounded-full h-10 w-10 border-2 border-orange-500 border-t-transparent" />
            </div>
        }>
            <CreateSqlProblemContent />
        </Suspense>
    );
}
