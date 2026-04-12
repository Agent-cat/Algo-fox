"use client";
import React from "react";
import dynamic from "next/dynamic";

const ProblemSidebar = dynamic(() => import("./ProblemSidebar"), {
    loading: () => null,
    ssr: false,
});
const ContestSidebar = dynamic(() => import("./ContestSidebar"), {
    loading: () => null,
    ssr: false,
});

interface WorkspaceSidebarsProps {
    contestId?: string;
    isSidebarOpen: boolean;
    handleCloseSidebar: () => void;
    problem: any;
    solvedIds: string[];
    contest?: any;
}

export const WorkspaceSidebars = React.memo(({
    contestId,
    isSidebarOpen,
    handleCloseSidebar,
    problem,
    solvedIds,
    contest
}: WorkspaceSidebarsProps) => {
    if (!problem) return null;

    if (!contestId) {
        return (
            <ProblemSidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
                currentProblemId={problem.id}
                domain={problem.domain}
                problemType={problem.type}
                solvedProblemIds={solvedIds}
            />
        );
    }

    return (
        <ContestSidebar
            isOpen={isSidebarOpen}
            onClose={handleCloseSidebar}
            contest={contest}
            currentProblemId={problem.id}
            solvedProblemIds={solvedIds}
        />
    );
});
