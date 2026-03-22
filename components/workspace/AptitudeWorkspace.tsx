"use client";
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import WorkspaceHeader from './WorkspaceHeader';
import { Problem, ProblemTestCase } from '@prisma/client';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { usePersistentSplit } from '@/hooks/use-layout';
import AptitudeMCQPanel from './AptitudeMCQPanel';
import ProblemTour from '../tour/ProblemTour';
import dynamic from 'next/dynamic';

const ProblemSidebar = dynamic(() => import('./ProblemSidebar'), {
    loading: () => null,
    ssr: false
});

interface AptitudeWorkspaceProps {
    problem: Problem & {
        testCases: ProblemTestCase[];
        solution?: string | null;
        tags?: { name: string; slug: string }[];
    };
    isSolved: boolean;
    solvedProblemIds?: string[];
    nextProblemSlug?: string | null;
    prevProblemSlug?: string | null;
}

export default function AptitudeWorkspace({
    problem,
    isSolved: initialIsSolved,
    solvedProblemIds = [],
    nextProblemSlug,
    prevProblemSlug
}: AptitudeWorkspaceProps) {
    const router = useRouter();
    const [isSolved, setIsSolved] = useState(initialIsSolved);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"description" | "solutions" | "submissions">("description");
    const [solvedIds, setSolvedIds] = useState<string[]>(solvedProblemIds);

    // Sync state when problem changes
    useEffect(() => {
        setIsSolved(initialIsSolved);
        setSolvedIds(solvedProblemIds);
    }, [problem.id, initialIsSolved, solvedProblemIds]);

    const {
        sizes: mainSizes,
        setSizes: setMainSizes,
        isHydrated: mainHydrated
    } = usePersistentSplit('algofox_aptitude_workspace_main_split', [50, 50]);

    const handleSolved = useCallback(() => {
        setIsSolved(true);
        if (!solvedIds.includes(problem.id)) {
            setSolvedIds(prev => [...prev, problem.id]);
        }
    }, [problem.id, solvedIds]);

    const handleRevealSolution = useCallback(() => {
        setIsSolved(true); // Temporarily mark as solved for viewing
        setActiveTab("solutions");
    }, []);

    if (!mainHydrated) {
        return (
            <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="relative">
                        <div className="h-10 w-10 border-[3px] border-gray-200 dark:border-[#262626] border-t-orange-500 rounded-full animate-spin mx-auto" />
                        <div className="absolute inset-0 h-10 w-10 border-[3px] border-transparent border-b-orange-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading workspace...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-[#fafafa] dark:bg-[#121212] flex flex-col overflow-hidden animate-fadeIn">
            <ProblemTour />

            <ProblemSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                currentProblemId={problem.id}
                domain={problem.domain}
                problemType={problem.type}
                solvedProblemIds={solvedIds}
            />

            <WorkspaceHeader
                onSubmit={() => {}} // Not used in aptitude the same way
                onRun={() => {}}    // Not used in aptitude
                isSubmitting={false}
                isRunning={false}
                nextProblemSlug={nextProblemSlug}
                prevProblemSlug={prevProblemSlug}
                domain={problem.domain}
                type={problem.type}
                onToggleSidebar={() => setIsSidebarOpen(true)}
            />

            <div className="flex-1 overflow-hidden min-w-0">
                <Split
                    className="split flex h-full"
                    sizes={mainSizes}
                    minSize={300}
                    gutterSize={4}
                    snapOffset={30}
                    onDragEnd={setMainSizes}
                >
                    {/* LEFT SIDE: DESCRIPTION */}
                    <div id="problem-description" className="h-full overflow-hidden">
                        <ProblemDescription
                            problem={problem}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            isSolved={isSolved}
                            domain={problem.domain}
                        />
                    </div>

                    {/* RIGHT SIDE: MCQ INTERFACE */}
                    <div className="h-full overflow-hidden flex flex-col bg-[#fafafa] dark:bg-[#121212]">
                        <AptitudeMCQPanel
                            problem={problem}
                            isSolved={isSolved}
                            onSolved={handleSolved}
                            onRevealSolution={handleRevealSolution}
                            nextProblemSlug={nextProblemSlug}
                        />
                    </div>
                </Split>
            </div>

            <style jsx global>{`
                .split {
                    display: flex;
                }
                .gutter {
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    transition: background-color 0.25s ease, opacity 0.25s ease;
                    position: relative;
                }
                .gutter::after {
                    content: '';
                    position: absolute;
                    background: transparent;
                    border-radius: 4px;
                    transition: background-color 0.25s ease;
                }
                .gutter:hover::after {
                    background: rgba(249, 115, 22, 0.25);
                }
                .gutter:active::after {
                    background: rgba(249, 115, 22, 0.4);
                }
                .dark .gutter {
                    background-color: transparent;
                }
                .dark .gutter:hover::after {
                    background: rgba(249, 115, 22, 0.2);
                }
                .dark .gutter:active::after {
                    background: rgba(249, 115, 22, 0.35);
                }
                .gutter.gutter-horizontal {
                    cursor: col-resize;
                    border-left: 1px solid #e5e7eb;
                    border-right: none;
                }
                .gutter.gutter-horizontal::after {
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 3px;
                    height: 32px;
                }
                .dark .gutter.gutter-horizontal {
                    border-left: 1px solid #1e1e1e;
                }
            `}</style>
        </div>
    );
}
