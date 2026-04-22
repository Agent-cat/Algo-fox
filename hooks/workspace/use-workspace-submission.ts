import { useState, useCallback, MutableRefObject, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Problem } from "@prisma/client";
import { useRouter } from "next/navigation";

interface useWorkspaceSubmissionProps {
    problem: Problem & { testCases: any[] };
    languageId: number;
    contestId?: string;
    sessionRef: MutableRefObject<any>;
    contestSessionIdRef: MutableRefObject<string | null>;
    customTestCasesRef: MutableRefObject<any[]>;
    editorSettingsRef: MutableRefObject<any>;
    solvedIdsRef: MutableRefObject<string[]>;
    codeRef: MutableRefObject<string>;
    setIsTestCasesCollapsed: (collapsed: boolean) => void;
    setVerticalSizesProgrammatically: (sizes: number[]) => void;
    setHighlightLine: (line: number | null) => void;
    onSolved: (streakUpdated?: boolean, currentStreak?: number, firstSolved?: boolean, pointsGained?: number) => void;
}

export function useWorkspaceSubmission({
    problem,
    languageId,
    contestId,
    sessionRef,
    contestSessionIdRef,
    customTestCasesRef,
    editorSettingsRef,
    solvedIdsRef,
    codeRef,
    setIsTestCasesCollapsed,
    setVerticalSizesProgrammatically,
    setHighlightLine,
    onSolved,
}: useWorkspaceSubmissionProps) {
    const router = useRouter();
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMode, setSubmissionMode] = useState<"RUN" | "SUBMIT" | null>(null);
    const [submissionResults, setSubmissionResults] = useState<any[]>([]);
    const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    // Cleanup EventSource on unmount to prevent leaks
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
            }
        };
    }, []);

    const handleSubmission = useCallback(async (mode: "RUN" | "SUBMIT") => {
        const currentCode = codeRef.current;
        const currentSession = sessionRef.current;
        const currentCustomTestCases = customTestCasesRef.current;
        const currentContestSessionId = contestSessionIdRef.current;
        const currentEditorSettings = editorSettingsRef.current;

        if (!currentCode) {
            toast.error("Code cannot be empty");
            return;
        }

        if (!currentSession?.user?.id) {
            toast.error("Please sign in to submit");
            return;
        }

        // AUTO-EXPAND
        setIsTestCasesCollapsed(false);
        setVerticalSizesProgrammatically([60, 40]);

        try {
            if (mode === "RUN") setIsRunning(true);
            else setIsSubmitting(true);

            toast.info(mode === "RUN" ? "Running code..." : "Submitting code...");

            setHighlightLine(null); // Clear previous highlights before new run

            // 1. Create Submission / Run Code
            const res = await fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: currentSession.user.id,
                    problemId: problem.id,
                    languageId: languageId,
                    code: currentCode,
                    mode: mode,
                    contestId: contestId,
                    sessionId: currentContestSessionId,
                    customTestCases: mode === "RUN" ? currentCustomTestCases : undefined
                })
            });

            if (!res.ok) throw new Error("Submission failed");
            const data = await res.json();

            // HANDLE BOTH RUN & SUBMIT MODES (SSE)
            const { submissionId } = data;

            setSubmissionMode(mode);
            const initialResults = [
                ...problem.testCases.map((tc, idx) => ({
                    index: idx,
                    status: "PENDING"
                })),
                ...(mode === "RUN" ? currentCustomTestCases.map((_, idx) => ({
                    index: problem.testCases.length + idx,
                    status: "PENDING"
                })) : [])
            ];
            setSubmissionResults(initialResults);
            setSubmissionStatus(null);

            // Connect to SSE
            if (eventSourceRef.current) eventSourceRef.current.close();
            const eventSource = new EventSource(`/api/sse/submission/${submissionId}`);
            eventSourceRef.current = eventSource;

            eventSource.onmessage = (event) => {
                try {
                    const payload = JSON.parse(event.data);

                if (payload.type === "CASE_UPDATE") {
                    setSubmissionResults(prev => {
                        const current = prev ? [...prev] : [];
                        const updates = payload.data as any[];

                        updates.forEach(update => {
                             const idx = current.findIndex(c => c.index === update.index);
                             if (idx >= 0) {
                                 current[idx] = update;
                             } else {
                                 current.push(update);
                             }
                        });
                        return current.sort((a, b) => a.index - b.index);
                    });
                } else if (payload.type === "COMPLETE") {
                     eventSource.close();
                     setSubmissionStatus(payload.data.status);

                     if (mode === "RUN") setIsRunning(false);
                     else setIsSubmitting(false);

                     if (payload.data.status === "ACCEPTED") {
                         if (mode === "SUBMIT" && currentEditorSettings.enableCorrectSound) {
                             const audio = new Audio('/submission.mp3');
                             audio.play().catch(e => {});
                         }

                         const desc = `Time: ${payload.data.time?.toFixed(3) || 0}s | Memory: ${payload.data.memory || 0}KB`;
                         if (mode === "SUBMIT") {
                             toast.success("Submitted Successfully!", { description: desc, descriptionClassName: "!text-white/90" });

                             // Refresh server components to update lists/cache
                             router.refresh();
                             window.dispatchEvent(new CustomEvent("pointsUpdated"));

                             onSolved(
                                 payload.data.streakUpdated,
                                 payload.data.currentStreak,
                                 payload.data.firstSolved,
                                 payload.data.pointsGained
                             );

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
                           if (mode === "SUBMIT" && currentEditorSettings.enableWrongSound) {
                               const audio = new Audio('/faaah.mp3');
                               audio.play().catch(e => {});
                           }
                           toast.error(`Result: ${payload.data.status}`);
                      }
                }
            } catch (e) {
                 console.error("Failed to parse SSE message:", e);
            }
        };

            eventSource.onerror = (err) => {
                 console.error("SSE Error:", err);
                eventSource.close();
                if (mode === "RUN") setIsRunning(false);
                else setIsSubmitting(false);
            };

        } catch (error) {
             console.error(error);
            toast.error("Something went wrong");
            if (mode === "RUN") setIsRunning(false);
            else setIsSubmitting(false);
        }
    }, [
        problem.id,
        problem.testCases,
        languageId,
        contestId,
        codeRef,
        sessionRef,
        customTestCasesRef,
        contestSessionIdRef,
        editorSettingsRef,
        solvedIdsRef,
        setIsTestCasesCollapsed,
        setVerticalSizesProgrammatically,
        setHighlightLine,
        onSolved,
        router
    ]);

    return {
        handleSubmission,
        isRunning,
        isSubmitting,
        submissionMode,
        submissionResults,
        submissionStatus
    };
}
