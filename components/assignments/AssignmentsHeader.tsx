"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PageTooltip } from "@/components/shared/PageTooltip";

export function AssignmentsHeader() {
    return (
        <div className="mb-8">
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
            </Link>
            <div className="flex items-center gap-2">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                    My Assignments
                </h1>
                <PageTooltip description="Check pending and completed assignments, submit solutions, and track grades." />
            </div>
            <p className="text-gray-500 mt-1">Complete assignments from your enrolled classrooms</p>
        </div>
    );
}
