"use client";
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import WorkspaceHeader from './WorkspaceHeader';
import { Problem, ProblemTestCase } from '@prisma/client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { usePersistentSplit } from '@/hooks/use-layout';
import AptitudeMCQPanel from './AptitudeMCQPanel';
import AptitudeTextPanel from './AptitudeTextPanel';
import ProblemTour from '../tour/ProblemTour';
import { PointsCelebration } from '../shared/PointsCelebration';
import dynamic from 'next/dynamic';
import { authClient } from '@/lib/auth-client';
import { WorkspaceSidebars } from './WorkspaceSidebars';
import { getParticipationStatus } from '@/actions/contest';
import { toast } from 'sonner';

interface AptitudeWorkspaceProps {
    problem: Problem & {
        testCases: ProblemTestCase[];
        solution?: string | null;
        tags?: { name: string; slug: string }[];
    };
    isSolved: boolean;
    contestId?: string;
    contest?: any;
    solvedProblemIds?: string[];
    nextProblemSlug?: string | null;
    prevProblemSlug?: string | null;
    courseId?: string | null;
    courseName?: string | null;
    courseSlug?: string | null;
    totalCourseProblems?: number;
    currentCourseProblemIndex?: number;
}

export default function AptitudeWorkspace({
    problem,
    isSolved: initialIsSolved,
    contestId,
    contest,
    solvedProblemIds = [],
    nextProblemSlug,
    prevProblemSlug,
    courseId,
    courseName,
    courseSlug,
    totalCourseProblems = 0,
    currentCourseProblemIndex = -1
}: AptitudeWorkspaceProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const [isSolved, setIsSolved] = useState(initialIsSolved);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"description" | "solutions" | "community" | "submissions">("description");
    const [solvedIds, setSolvedIds] = useState<string[]>(solvedProblemIds);
    const [isPointsModalOpen, setIsPointsModalOpen] = useState(false);
    const [pointsGained, setPointsGained] = useState(0);
    const [contestModeActive, setContestModeActive] = useState(false);
    const [contestSessionId, setContestSessionId] = useState<string | null>(null);

    const isContestMode = !!contestId && contestModeActive;

    // Sync state when problem changes
    useEffect(() => {
        setIsSolved(initialIsSolved);
        setSolvedIds(solvedProblemIds);
    }, [problem.id, initialIsSolved, solvedProblemIds]);

    // Contest participation check
    useEffect(() => {
        if (!contestId) return;
        const checkParticipation = async () => {
            try {
                const result = await getParticipationStatus(contestId);
                if (result.success && result.participation) {
                    if (result.participation.sessionId && result.participation.acceptedRules) {
                        setContestSessionId(result.participation.sessionId);
                        setContestModeActive(true);
                    } else if (result.participation.isBlocked) {
                        toast.error(result.participation.blockReason || "Security violation or manual block.");
                    } else if (result.participation.isFinished) {
                        toast.info("Contest already submitted or session expired.");
                        router.push(`/contest/${contest?.slug || contestId}`);
                    }
                }
            } catch (err) {
                console.error("Failed to check participation:", err);
            }
        };
        checkParticipation();
    }, [contestId, contest?.slug, router]);

    const {
        sizes: mainSizes,
        setSizes: setMainSizes,
        isHydrated: mainHydrated
    } = usePersistentSplit('algofox_aptitude_workspace_main_split', [50, 50]);

    const handleSolved = useCallback((firstSolved?: boolean, points?: number) => {
        setIsSolved(true);
        if (!solvedIds.includes(problem.id)) {
            setSolvedIds(prev => [...prev, problem.id]);
        }
        if (firstSolved && points != null) {
            setPointsGained(points);
            setIsPointsModalOpen(true);
        }
    }, [problem.id, solvedIds]);

    const handleRevealSolution = useCallback(() => {
        setIsSolved(true);
        setActiveTab("solutions");
    }, []);

    const handleCloseSidebar = useCallback(() => setIsSidebarOpen(false), []);
    const handleToggleSidebar = useCallback(() => setIsSidebarOpen(true), []);
    const handleClosePoints = useCallback(() => setIsPointsModalOpen(false), []);
    const handleNoop = useCallback(() => {}, []);

    if (!mainHydrated) {
        return (
            <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] flex items-center justify-center">
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
        <div className="h-screen w-full bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col overflow-hidden animate-fadeIn">
            <ProblemTour />

            <WorkspaceSidebars
                contestId={isContestMode ? contestId : undefined}
                isSidebarOpen={isSidebarOpen}
                handleCloseSidebar={handleCloseSidebar}
                problem={problem}
                solvedIds={solvedIds}
                contest={contest}
                courseId={courseId}
                courseName={courseName}
            />

            <WorkspaceHeader
                onSubmit={handleNoop}
                onRun={handleNoop}
                isSubmitting={false}
                isRunning={false}
                nextProblemSlug={nextProblemSlug}
                prevProblemSlug={prevProblemSlug}
                domain={problem.domain}
                type={problem.type}
                courseId={courseId}
                courseSlug={courseSlug}
                totalCourseProblems={totalCourseProblems}
                currentCourseProblemIndex={currentCourseProblemIndex}
                onToggleSidebar={handleToggleSidebar}
                problemId={problem.id}
                contestId={isContestMode ? contestId : undefined}
            />

            <PointsCelebration
                isOpen={isPointsModalOpen}
                onClose={handleClosePoints}
                points={pointsGained}
            />

            <div className="flex-1 overflow-hidden flex flex-row min-h-0 bg-[#f0f0f0] dark:bg-[#1D1E23]">
                <Split
                    className="split flex h-full w-full"
                    sizes={mainSizes}
                    minSize={300}
                    gutterSize={8}
                    snapOffset={30}
                    onDragEnd={setMainSizes}
                >
                    {/* LEFT SIDE: DESCRIPTION */}
                    <div id="problem-description" className="h-full overflow-hidden border-l border-dashed border-gray-400 dark:border-white/10">
                        <ProblemDescription
                            problem={problem}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                            isSolved={isSolved}
                            domain={problem.domain}
                            nextProblemSlug={nextProblemSlug}
                            courseId={courseId}
                            contestId={isContestMode ? contestId : undefined}
                        />
                    </div>

                    {/* RIGHT SIDE: QUESTION INTERFACE */}
                    <div className="h-full overflow-hidden flex flex-col bg-[#fafafa] dark:bg-[#1D1E23] border-r border-dashed border-gray-400 dark:border-white/10">
                        {(problem as any).questionType === "TEXT_SHORT" || (problem as any).questionType === "TEXT_LONG" ? (
                            <AptitudeTextPanel
                                problem={problem}
                                isSolved={isSolved}
                                onSolved={handleSolved}
                                onRevealSolution={handleRevealSolution}
                                nextProblemSlug={nextProblemSlug}
                                userRole={(session?.user as any)?.role}
                                courseId={courseId}
                                contestMode={isContestMode}
                            />
                        ) : (
                            <AptitudeMCQPanel
                                problem={problem}
                                isSolved={isSolved}
                                onSolved={handleSolved}
                                onRevealSolution={handleRevealSolution}
                                nextProblemSlug={nextProblemSlug}
                                userRole={(session?.user as any)?.role}
                                courseId={courseId}
                                contestMode={isContestMode}
                            />
                        )}
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
                .gutter:hover {
                    background-color: rgba(234, 88, 12, 0.2) !important;
                }
                .gutter:active {
                    background-color: rgba(234, 88, 12, 0.35) !important;
                }
                .gutter:hover::after {
                    background: #ea580c !important;
                    box-shadow: 0 0 8px rgba(234, 88, 12, 0.4);
                }
                .gutter:active::after {
                    background: #c2410c !important;
                }
                .dark .gutter {
                    background-color: transparent;
                }
                .dark .gutter:hover {
                    background-color: rgba(255, 121, 198, 0.15) !important;
                }
                .dark .gutter:active {
                    background-color: rgba(255, 121, 198, 0.3) !important;
                }
                .dark .gutter:hover::after {
                    background: #ff79c6 !important;
                    box-shadow: 0 0 10px rgba(255, 121, 198, 0.3);
                }
                .dark .gutter:active::after {
                    background: #ff79c6 !important;
                }
                .gutter.gutter-horizontal {
                    cursor: col-resize;
                    border-left: 1px dashed #e5e7eb;
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
                    border-left: 1px dashed rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}
