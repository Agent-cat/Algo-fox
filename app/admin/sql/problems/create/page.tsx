"use client";

import { createProblem } from "@/actions/problems";
import ProblemForm from "@/components/admin/ProblemForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateSqlProblemPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 bg-white">
            <div className="max-w-3xl mx-auto ml-0">
                <Link
                    href="/admin/sql/problems"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to SQL Problems
                </Link>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New SQL Problem</h1>
                    <p className="text-gray-500">Add a new SQL challenge for the community.</p>
                </div>

                <ProblemForm
                    onSubmit={createProblem}
                    submitLabel="Create Problem"
                    domain="SQL"
                    redirectPath="/admin/sql/problems"
                />
            </div>
        </div>
    );
}

