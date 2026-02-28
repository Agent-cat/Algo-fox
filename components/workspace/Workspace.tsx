"use client";
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import TestCases from './TestCases';
import { Problem, ProblemTestCase } from '@prisma/client';

import WorkspaceHeader from './WorkspaceHeader';
import ContestProtection from '../contest/ContestProtection';
import ContestEntryModal from '../contest/ContestEntryModal';
import ContestNavigationGuard from '../contest/ContestNavigationGuard';
import ContestSidebar from './ContestSidebar';

import dynamic from 'next/dynamic';
import ProblemTour from '../tour/ProblemTour';

const ProblemSidebar = dynamic(() => import('./ProblemSidebar'), {
    loading: () => null, // Optional: rendering nothing while loading
    ssr: false // Client-side specific interaction
});

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getParticipationStatus } from '@/actions/contest';
import EditorSettingsModal from './EditorSettingsModal';
import { useRouter } from 'next/navigation';

interface FunctionTemplate {
    languageId: number;
    functionTemplate: string;
    driverCode: string;
}

interface WorkspaceProps {
    problem: Problem & {
        testCases: ProblemTestCase[];
        functionTemplates?: FunctionTemplate[];
        useFunctionTemplate?: boolean;
        solution?: string | null;
        tags?: { name: string; slug: string }[];
    };
    isSolved: boolean;
    contestId?: string;
    contest?: any;
    solvedProblemIds?: string[];
    nextProblemSlug?: string | null;
    prevProblemSlug?: string | null;
}

import { authClient } from '@/lib/auth-client';
import { DEFAULT_LANGUAGE_ID } from '@/lib/languages';
import { usePersistentSplit } from '@/hooks/use-layout';

const LANGUAGE_STORAGE_KEY = 'algofox_selected_language';
const SQL_LANGUAGE_ID = 82; // SQL language ID

// Get language from localStorage or use default
function getStoredLanguageId(domain?: string): number {
    if (typeof window === 'undefined') {
        // For SQL problems, default to SQL language
        return domain === "SQL" ? SQL_LANGUAGE_ID : DEFAULT_LANGUAGE_ID;
    }
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored) {
            const id = parseInt(stored, 10);
            if (!isNaN(id)) {
                // For SQL problems, always use SQL language
                if (domain === "SQL") {
                    return SQL_LANGUAGE_ID;
                }
                return id;
            }
        }
    } catch (e) {
        console.error('Failed to read language from localStorage', e);
    }
    // For SQL problems, default to SQL language
    return domain === "SQL" ? SQL_LANGUAGE_ID : DEFAULT_LANGUAGE_ID;
}


export default function Workspace({ problem, isSolved, contestId, contest, solvedProblemIds = [], nextProblemSlug, prevProblemSlug }: WorkspaceProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const [code, setCode] = useState<string>("// Write your code here");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSolvedState, setIsSolvedState] = useState(isSolved);

    // Contest session state
    const [showEntryModal, setShowEntryModal] = useState(false);
    const [contestSessionId, setContestSessionId] = useState<string | null>(null);
    const [contestModeActive, setContestModeActive] = useState(false);

    // Sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Start with default language to avoid hydration mismatch, then update from localStorage
    const [languageId, setLanguageId] = useState(
        problem.domain === "SQL" ? SQL_LANGUAGE_ID : DEFAULT_LANGUAGE_ID
    );

    // Load language from localStorage after hydration (client-side only)
    useEffect(() => {
        const storedLanguageId = getStoredLanguageId(problem.domain);
        // For SQL problems, always use SQL language
        const finalLanguageId = problem.domain === "SQL" ? SQL_LANGUAGE_ID : storedLanguageId;
        if (finalLanguageId !== languageId) {
            setLanguageId(finalLanguageId);
            // Clear default boilerplate if we are switching languages on load
            setCode("");
        }
    }, [problem.domain]);

    // Check existing contest participation on mount
    useEffect(() => {
        if (!contestId) return;

        const checkParticipation = async () => {
            const result = await getParticipationStatus(contestId);
            if (result.success && result.participation) {
                if (result.participation.sessionId && result.participation.acceptedRules) {
                    // User has already started - activate contest mode
                    setContestSessionId(result.participation.sessionId);
                    setContestModeActive(true);
                } else if (!result.participation.isFinished && !result.participation.isBlocked) {
                    // Show entry modal for new participants
                    setShowEntryModal(true);
                }
            } else {
                // No participation yet - show entry modal
                setShowEntryModal(true);
            }
        };

        checkParticipation();
    }, [contestId]);

    const handleContestStart = (sessionId: string) => {
        setContestSessionId(sessionId);
        setContestModeActive(true);
        setShowEntryModal(false);
        toast.success("Contest mode activated! Good luck!");
    };

    const handleContestBlocked = () => {
        // Just a callback, UI is handled by ContestProtection
    };

    // Handle language change and persist to localStorage
    const handleLanguageChange = (newLanguageId: number) => {
        // For SQL problems, always use SQL language - don't allow changes
        if (problem.domain === "SQL") {
            return; // Prevent language changes for SQL problems
        }

        setLanguageId(newLanguageId);
        setCode(""); // Clear code to prevent stale submissions while new draft loads
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguageId.toString());
        } catch (e) {
            console.error('Failed to save language to localStorage', e);
        }
    };

    // Editor Settings State
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [editorSettings, setEditorSettings] = useState({
        fontSize: 14,
        tabSize: 4,
        theme: "vs-light" as "vs-light" | "vs-dark",
        keybinding: "standard" as "standard" | "vim"
    });

    // Load settings from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem('algofox_editor_settings');
            if (stored) {
                setEditorSettings(JSON.parse(stored));
            }
        } catch (e) {
            console.error('Failed to load editor settings', e);
        }
    }, []);

    // Save settings to localStorage
    const handleSettingsChange = (newSettings: Omit<typeof editorSettings, "theme"> & { theme?: "vs-light" | "vs-dark" }) => {
        setEditorSettings({
            ...newSettings,
            theme: newSettings.theme || "vs-light"
        });
        try {
            localStorage.setItem('algofox_editor_settings', JSON.stringify(newSettings));
        } catch (e) {
            console.error('Failed to save editor settings', e);
        }
    };

    const [activeTab, setActiveTab] = useState<"description" | "solutions" | "submissions">("description");
    const [isRunning, setIsRunning] = useState(false);
    const [submissionResults, setSubmissionResults] = useState<any[] | undefined>(undefined);
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
    const [submissionMode, setSubmissionMode] = useState<"RUN" | "SUBMIT" | null>(null);

    const {
        sizes: mainSizes,
        setSizes: setMainSizes,
        isHydrated: mainHydrated
    } = usePersistentSplit('algofox_workspace_main_split', [40, 60]);

    const {
        sizes: verticalSizes,
        setSizes: setVerticalSizes,
        setSizesProgrammatically: setVerticalSizesProgrammatically,
        layoutKey: verticalLayoutKey,
        isHydrated: verticalHydrated
    } = usePersistentSplit('algofox_workspace_vertical_split', [60, 40]);

    // Solved Problem IDs State (for Sidebar & Optimistic Updates)
    const [solvedIds, setSolvedIds] = useState<string[]>(solvedProblemIds);

    // Sync if props change (e.g. navigation)
    useEffect(() => {
        setSolvedIds(solvedProblemIds);
    }, [solvedProblemIds]);

    const handleSubmission = async (mode: "RUN" | "SUBMIT") => {
        if (!code) {
            toast.error("Code cannot be empty");
            return;
        }

        if (!session?.user?.id) {
            toast.error("Please sign in to submit");
            return;
        }

        // AUTO-EXPAND: Check if TestCases pane is collapsed (e.g., < 5%)
        // Vertical split sizes are [Editor%, TestCases%]
        // If TestCases is too small, reset to default [60, 40]
        if (verticalSizes[1] < 5) {
            setVerticalSizesProgrammatically([60, 40]);
        }

        try {
            if (mode === "RUN") setIsRunning(true);
            else setIsSubmitting(true);

            toast.info(mode === "RUN" ? "Running code..." : "Submitting code...");

            // 1. Create Submission / Run Code
            const res = await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: session.user.id,
                    problemId: problem.id,
                    languageId: languageId,
                    code: code,
                    mode: mode,
                    contestId: contestId
                })
            });

            if (!res.ok) throw new Error("Submission failed");
            const data = await res.json();



            // HANDLE BOTH RUN & SUBMIT MODES (SSE)
            const { submissionId } = data;

            setSubmissionMode(mode);
            setSubmissionResults(problem.testCases.map((tc, idx) => ({
                index: idx,
                status: "PENDING"
            })));
            setSubmissionStatus(null);

            // Connect to SSE
            const eventSource = new EventSource(`/api/sse/submission/${submissionId}`);

            eventSource.onmessage = (event) => {
                const payload = JSON.parse(event.data);

                if (payload.type === "CASE_UPDATE") {
                    // payload.data is array of updated cases
                    setSubmissionResults(prev => {
                        const current = prev ? [...prev] : [];
                        const updates = payload.data as any[];

                        updates.forEach(update => {
                             // Find if exists
                             const idx = current.findIndex(c => c.index === update.index);
                             if (idx >= 0) {
                                 current[idx] = update;
                             } else {
                                 current.push(update);
                             }
                        });
                        // Sort by index just in case
                        return current.sort((a, b) => a.index - b.index);
                    });
                } else if (payload.type === "COMPLETE") {
                     eventSource.close();
                     setSubmissionStatus(payload.data.status);

                     if (mode === "RUN") setIsRunning(false);
                     else setIsSubmitting(false);

                     if (payload.data.status === "ACCEPTED") {
                         const desc = `Time: ${payload.data.time?.toFixed(3) || 0}s | Memory: ${payload.data.memory || 0}KB`;
                         if (mode === "SUBMIT") {
                             toast.success("Submitted Successfully!", { description: desc, descriptionClassName: "!text-white/90" });
                             setIsSolvedState(true);
                             setActiveTab("submissions");

                             // Optimistically update solved status in sidebar
                             if (!solvedIds.includes(problem.id)) {
                                 setSolvedIds(prev => [...prev, problem.id]);
                             }

                             // Refresh server components to update lists/cache
                             router.refresh();

                             window.dispatchEvent(new CustomEvent("pointsUpdated"));

                             // If in contest and submitted successfully, redirect back to contest dashboard
                             if (contestId) {
                                toast.success("Problem Solved! Returning to contest...", { duration: 2000 });
                                setTimeout(() => {
                                    router.push(`/contest/${contestId}`);
                                }, 1500);
                             }
                         } else {
                             toast.success("Run Accepted!", { description: desc, descriptionClassName: "!text-white/90" });
                         }
                     } else {
                          toast.error(`Result: ${payload.data.status}`);
                     }
                }
            };

            eventSource.onerror = (err) => {
                console.error("SSE Error:", err);
                eventSource.close();
                // Fallback polling or simple completion check could go here if needed
                // For now, just stop the spinner
                if (mode === "RUN") setIsRunning(false);
                else setIsSubmitting(false);
            };

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            if (mode === "RUN") setIsRunning(false);
            else setIsSubmitting(false);
        }
    };

    if (!mainHydrated || !verticalHydrated) {
        return null; // or a loading skeleton
    }

    return (
        <div className="h-screen w-full bg-white dark:bg-[#0a0a0a] flex flex-col overflow-hidden animate-fadeIn">
             {/* TOUR COMPONENT - Only render if not in contest mode (optional) or just always render and let it handle its own state */}
             {!contestId && <ProblemTour />}

            <EditorSettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                settings={editorSettings}
                onSettingsChange={handleSettingsChange}
            />

            {/* Contest Protection (only active after entry) */}
            {contestId && contestModeActive && contestSessionId && (
                <>
                    <ContestProtection
                        contestId={contestId}
                        sessionId={contestSessionId}
                        onBlocked={handleContestBlocked}
                    />
                    <ContestNavigationGuard
                        contestId={contestId}
                        allowedPaths={[
                            `/problems/`,  // Allow all problem pages
                            `/contest/${contestId}`,
                        ]}
                    />
                </>
            )}
            {/* Problem Navigation Sidebar - Only show when not in contest mode */}
            {!contestId && (
                <ProblemSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    currentProblemId={problem.id}
                    domain={problem.domain}
                    problemType={problem.type}
                    solvedProblemIds={solvedIds}
                />
            )}

            <WorkspaceHeader
                onSubmit={() => handleSubmission("SUBMIT")}
                onRun={() => handleSubmission("RUN")}
                isSubmitting={isSubmitting}
                isRunning={isRunning}
                contestId={contestId}
                endTime={contest?.endTime}
                nextProblemSlug={nextProblemSlug}
                prevProblemSlug={prevProblemSlug}
                domain={problem.domain}
                type={problem.type}
                onToggleSidebar={() => setIsSidebarOpen(true)}
            />
            <div className="flex-1 overflow-hidden flex flex-row min-h-0">
                {contest && (
                    <ContestSidebar
                        contest={contest}
                        currentProblemId={problem.id}
                        solvedProblemIds={solvedProblemIds}
                    />
                )}
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
                                isSolved={isSolvedState}
                                contestId={contestId}
                            />
                        </div>

                        {/* RIGHT SIDE: EDITOR + TESTCASES */}
                        <div className="h-full overflow-hidden flex flex-col">
                            <Split
                                key={verticalLayoutKey} // Force remount if we programmatically resize
                                className="split-vertical flex flex-col h-full"
                                direction="vertical"
                                sizes={verticalSizes}
                                minSize={0} // Allow collapsing fully if needed
                                gutterSize={4}
                                onDragEnd={setVerticalSizes}
                            >
                                <div id="code-editor" className="h-full overflow-hidden">
                                    <CodeEditor
                                        key={`${problem.id}-${languageId}`} // Stable key: remount only when problem or language changes
                                        value={code}
                                        onChange={(value) => setCode(value || "")}
                                        languageId={languageId}
                                        onLanguageChange={handleLanguageChange}
                                        problemId={problem.id}
                                        domain={problem.domain}
                                        functionTemplates={
                                            problem.useFunctionTemplate && problem.functionTemplates
                                                ? problem.functionTemplates
                                                : undefined
                                        }
                                        settings={editorSettings}
                                        onOpenSettings={() => setIsSettingsOpen(true)}
                                        readOnly={isSubmitting}
                                        userId={session?.user?.id || ""}
                                    />
                                </div>
                                <div id="test-cases" className="h-full overflow-hidden flex flex-col bg-white dark:bg-[#0a0a0a]">
                                    <TestCases
                                        cases={problem.testCases}
                                        results={submissionResults}
                                        status={submissionStatus}
                                        mode={submissionMode}
                                        problemId={problem.id}
                                    />
                                </div>
                            </Split>
                        </div>
                    </Split>

                    <style jsx global>{`
                    .split {
                        display: flex;
                    }
                    .split-vertical {
                        display: flex;
                        flex-direction: column;
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
                    .gutter.gutter-vertical {
                        cursor: row-resize;
                        border-top: 1px solid #e5e7eb;
                        border-bottom: none;
                    }
                    .gutter.gutter-vertical::after {
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 32px;
                        height: 3px;
                    }
                    .dark .gutter.gutter-vertical {
                        border-top: 1px solid #1e1e1e;
                    }
                `}</style>
                </div>
            </div>
        </div>
    );
}
