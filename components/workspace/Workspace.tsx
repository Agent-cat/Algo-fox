"use client";
import Split from 'react-split';
import ProblemDescription from './ProblemDescription';
import CodeEditor from './CodeEditor';
import TestCases from './TestCases';
import { Problem, ProblemTestCase } from '@prisma/client';

import WorkspaceHeader from './WorkspaceHeader';

import { useState } from 'react';
import { toast } from 'sonner';

interface WorkspaceProps {
    problem: Problem & { testCases: ProblemTestCase[] };
}

import { authClient } from '@/lib/auth-client';
import { DEFAULT_LANGUAGE_ID } from '@/lib/languages';
import { useEffect } from 'react';
import { usePersistentSplit } from '@/hooks/use-layout';

const LANGUAGE_STORAGE_KEY = 'algofox_selected_language';

// Get language from localStorage or use default
function getStoredLanguageId(): number {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE_ID;
    try {
        const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (stored) {
            const id = parseInt(stored, 10);
            if (!isNaN(id)) return id;
        }
    } catch (e) {
        console.error('Failed to read language from localStorage', e);
    }
    return DEFAULT_LANGUAGE_ID;
}


export default function Workspace({ problem }: WorkspaceProps) {
    const { data: session } = authClient.useSession();
    const [code, setCode] = useState<string>("// Write your code here");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Start with default language to avoid hydration mismatch, then update from localStorage
    const [languageId, setLanguageId] = useState(DEFAULT_LANGUAGE_ID);

    // Load language from localStorage after hydration (client-side only)
    useEffect(() => {
        const storedLanguageId = getStoredLanguageId();
        if (storedLanguageId !== DEFAULT_LANGUAGE_ID) {
            setLanguageId(storedLanguageId);
            // Clear default boilerplate if we are switching languages on load
            setCode("");
        }
    }, []);

    // Handle language change and persist to localStorage
    const handleLanguageChange = (newLanguageId: number) => {
        setLanguageId(newLanguageId);
        setCode(""); // Clear code to prevent stale submissions while new draft loads
        try {
            localStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguageId.toString());
        } catch (e) {
            console.error('Failed to save language to localStorage', e);
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

            // 1. Create Submission
            const res = await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: session.user.id,
                    problemId: problem.id,
                    languageId: languageId,
                    code: code,
                    mode: mode
                })
            });

            if (!res.ok) throw new Error("Submission failed");
            const { submissionId } = await res.json();

            // 2. Poll for Results
            setSubmissionMode(mode);
            setSubmissionResults(undefined); // Clear previous results
            setSubmissionStatus(null);
            const interval = setInterval(async () => {
                try {
                    const pollRes = await fetch(`/api/submissions/${submissionId}`);
                    if (!pollRes.ok) return;
                    const data = await pollRes.json();

                    // Update results to display in TestCases component
                    if (data.testCases) {
                        setSubmissionResults(data.testCases);
                    }
                    // Update overall status
                    if (data.status) {
                        setSubmissionStatus(data.status);
                    }

                    if (data.status !== "PENDING") {
                        clearInterval(interval);
                        if (mode === "RUN") setIsRunning(false);
                        else setIsSubmitting(false);

                        if (data.status === "ACCEPTED") {
                            toast.success(mode === "RUN" ? "Run Accepted!" : "Submitted Successfully!", {
                                description: `Time: ${data.time}ms | Memory: ${data.memory}KB`
                            });
                            if (mode === "SUBMIT") {
                                setActiveTab("submissions");
                            }
                        } else {
                            toast.error(`Result: ${data.status}`);
                        }
                    }
                } catch (e) {
                    clearInterval(interval);
                    if (mode === "RUN") setIsRunning(false);
                    else setIsSubmitting(false);
                }
            }, 2000);

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
        <div className="h-screen w-full bg-white flex flex-col overflow-hidden">
            <WorkspaceHeader
                onSubmit={() => handleSubmission("SUBMIT")}
                onRun={() => handleSubmission("RUN")}
                isSubmitting={isSubmitting}
                isRunning={isRunning}
            />
            <div className="flex-1 overflow-hidden">
                <Split
                    className="split flex h-full"
                    sizes={mainSizes}
                    minSize={300}
                    gutterSize={4}
                    snapOffset={30}
                    onDragEnd={setMainSizes}
                >
                    {/* LEFT SIDE: DESCRIPTION */}
                    <div className="h-full overflow-hidden">
                        <ProblemDescription
                            problem={problem}
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
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
                            <div className="h-full overflow-hidden">
                                <CodeEditor
                                    key={languageId} // Force remount on language change
                                    value={code}
                                    onChange={(value) => setCode(value || "")}
                                    languageId={languageId}
                                    onLanguageChange={handleLanguageChange}
                                    problemId={problem.id}
                                />
                            </div>
                            <div className="h-full overflow-hidden">
                                <TestCases
                                    cases={problem.testCases || []}
                                    results={submissionResults}
                                    mode={submissionMode}
                                    status={submissionStatus}
                                />
                            </div>
                        </Split>
                    </div>
                </Split>

                <style jsx global>{`
                .split {
                    display: flex; /* generally redundant with class above, but safe */
                }
                .split-vertical {
                    display: flex;
                    flex-direction: column;
                }
                .gutter {
                    background-color: #f3f4f6; /* gray-100 */
                    background-repeat: no-repeat;
                    background-position: 50%;
                    transition: background-color 0.2s;
                }
                .gutter:hover {
                    background-color: #e5e7eb; /* gray-200 */
                }
                .gutter.gutter-horizontal {
                    cursor: col-resize;
                    border-left: 1px solid #e5e7eb;
                    border-right: 1px solid #e5e7eb;
                     background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZgmwIA6Jhouse1DAAAAABJRU5ErkJggg==');
                }
                .gutter.gutter-vertical {
                    cursor: row-resize;
                    border-top: 1px solid #e5e7eb;
                    border-bottom: 1px solid #e5e7eb;
                     background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABoV83XAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjAAIALAAJy8wOmAAAAABJRU5ErkJggg==');
                }
            `}</style>
            </div>
        </div>
    );
}
