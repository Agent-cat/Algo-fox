"use client";

import dynamic from "next/dynamic";
import { Problem, ProblemTestCase } from '@prisma/client';

// Define the Props type explicitly to avoid import issues or use 'any' if complex
// Ideally, we import WorkspaceProps, but let's replicate the structure or import if exported.
// Copying relevant parts of the interface from Workspace.tsx for safety or importing it.
// To avoid circular dependency issues if types are in Workspace.tsx, we can try to import just the types,
// but it's safer to just define the props we need or use any for this wrapper.

const Workspace = dynamic(() => import("./Workspace"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading workspace...</p>
            </div>
        </div>
    )
});

export default function WorkspaceClientWrapper(props: any) {
    return <Workspace {...props} />;
}
