"use client";

import dynamic from "next/dynamic";
import { Problem, ProblemTestCase } from '@prisma/client';

const Workspace = dynamic(() => import("./Workspace"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="relative">
                    <div className="h-10 w-10 border-[3px] border-gray-200 dark:border-[#262626] border-t-orange-500 rounded-full animate-spin mx-auto" />
                    <div className="absolute inset-0 h-10 w-10 border-[3px] border-transparent border-b-orange-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading workspace...</p>
            </div>
        </div>
    )
});

export default function WorkspaceClientWrapper(props: any) {
    return <Workspace {...props} />;
}
