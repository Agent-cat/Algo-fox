"use client";

import { useEffect, useState, useRef, useCallback } from "react";

import { AlertTriangle, ShieldX, Monitor, Eye, Lock, Ban, Clock } from "lucide-react";
import { logContestViolation, getParticipationStatus } from "@/actions/contest";

interface ContestProtectionProps {
    contestId: string;
    sessionId: string;
    onAutoSubmit?: () => void;
    onBlocked?: () => void;
    paused?: boolean;
}

interface ViolationState {
    total: number;
    isFlagged: boolean;
    isBlocked: boolean;
    tempBlockedUntil: string | null;
    permanentlyBlocked: boolean;
}

const MAX_WARNINGS = 6;
const FLAG_THRESHOLD = 3;

// Blocked keyboard shortcuts
const BLOCKED_SHORTCUTS = [
    { key: "c", ctrl: true, shift: false },        // Ctrl+C
    { key: "v", ctrl: true, shift: false },        // Ctrl+V
    { key: "x", ctrl: true, shift: false },        // Ctrl+X
    { key: "u", ctrl: true, shift: false },        // Ctrl+U (view source)
    { key: "s", ctrl: true, shift: false },        // Ctrl+S
    { key: "p", ctrl: true, shift: false },        // Ctrl+P (print)
    { key: "i", ctrl: true, shift: true },         // Ctrl+Shift+I (devtools)
    { key: "j", ctrl: true, shift: true },         // Ctrl+Shift+J (console)
    { key: "c", ctrl: true, shift: true },         // Ctrl+Shift+C (inspect)
    { key: "F12", ctrl: false, shift: false },     // F12
];

export default function ContestProtection({
    contestId,
    sessionId,
    onAutoSubmit,
    onBlocked,
    paused = false
}: ContestProtectionProps) {
    const [violations, setViolations] = useState<ViolationState>({
        total: 0,
        isFlagged: false,
        isBlocked: false,
        tempBlockedUntil: null,
        permanentlyBlocked: false
    });
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [needsFullscreen, setNeedsFullscreen] = useState(false);
    const [currentViolationType, setCurrentViolationType] = useState<string>("");
    const [isEditorLocked, setIsEditorLocked] = useState(false);
    const [tempBlockTimeLeft, setTempBlockTimeLeft] = useState<number>(0);
    const isMounted = useRef(false);
    const broadcastChannel = useRef<BroadcastChannel | null>(null);
    const lastViolationTime = useRef<number>(0);
    const isProcessingViolation = useRef(false);
    const isRefreshing = useRef(false);
    const isNavigating = useRef(false); // Track internal navigation to problem pages

    // Ref to track fullscreen needs for event listeners (avoids stale closures)
    const needsFullscreenRef = useRef(false);

    useEffect(() => {
        needsFullscreenRef.current = needsFullscreen;
    }, [needsFullscreen]);

    // Global debounce - only ONE violation allowed every 2 seconds
    const canLogViolation = useCallback(() => {
        const now = Date.now();
        if (paused) return false;

        // If already processing or locked - DO NOT log more violations
        if (isProcessingViolation.current) return false;
        if (isEditorLocked) return false;
        // NOTE: We allow logging even if showWarningPopup is true (e.g. for tab switching while popup is open)
        // Violations are logged even during temp block to allow escalation to permanent block

        // 2 second global cooldown to prevent double-logging same event
        if (now - lastViolationTime.current < 2000) return false;

        return true;
    }, [isEditorLocked, paused]);

    // Log violation to server and update state
    const handleViolation = useCallback(async (
        type: "TAB_SWITCH" | "FULLSCREEN_EXIT" | "COPY_PASTE" | "DEVTOOLS_OPEN" | "KEYBOARD_SHORTCUT" | "NAVIGATION_ATTEMPT" | "MULTI_TAB",
        message: string
    ) => {
        // Skip if navigating internally (prevents false positives when clicking problems)
        if (!isMounted.current || isRefreshing.current || isNavigating.current) return;

        // Always show popup for user awareness
        setCurrentViolationType(message);
        setShowWarningPopup(true);

        // Keyboard shortcuts and copy/paste ONLY show warning, don't count as violations
        const warningOnlyTypes = ["KEYBOARD_SHORTCUT", "COPY_PASTE"];
        if (warningOnlyTypes.includes(type)) {
            // Just show warning, don't log to server or increment counter
            return;
        }

        // But only log to server if cooldown passed
        if (!canLogViolation()) {
            return;
        }

        // Lock and update timestamp immediately
        isProcessingViolation.current = true;
        lastViolationTime.current = Date.now();

        try {
            const result = await logContestViolation(contestId, type, message);

            if (result.success) {
                const newState = {
                    total: result.totalViolations || 0,
                    isFlagged: result.isFlagged || false,
                    isBlocked: result.isBlocked || false,
                    tempBlockedUntil: result.tempBlockedUntil || null,
                    permanentlyBlocked: result.permanentlyBlocked || false
                };
                setViolations(newState);

                // Handle tiered escalation
                if (result.permanentlyBlocked) {
                    setIsEditorLocked(true);
                    onBlocked?.();
                } else if (result.tempBlockedUntil) {
                    setIsEditorLocked(true);
                    // Calculate time left
                    const timeLeft = new Date(result.tempBlockedUntil).getTime() - Date.now();
                    setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
                }
            }
        } catch (error) {
            console.error("Failed to log violation:", error);
        } finally {
            isProcessingViolation.current = false;
        }
    }, [contestId, canLogViolation, onAutoSubmit, onBlocked]);

    // Check for existing block status on mount (persists across refresh)
    useEffect(() => {
        if (!contestId) return;

        const checkBlockStatus = async () => {
            const result = await getParticipationStatus(contestId);
            if (result.success && result.participation) {
                const p = result.participation as any;

                // ALWAYS sync the violation counts and flags
                const newViolationState = {
                    total: p.totalViolations || 0,
                    isFlagged: p.isFlagged || false,
                    isBlocked: false,
                    tempBlockedUntil: null,
                    permanentlyBlocked: false
                };

                if (p.permanentlyBlocked) {
                    newViolationState.isBlocked = true;
                    newViolationState.permanentlyBlocked = true;
                    setIsEditorLocked(true);
                    onBlocked?.();
                } else if (p.tempBlockedUntil) {
                    const blockEnd = new Date(p.tempBlockedUntil);
                    if (blockEnd > new Date()) {
                        newViolationState.isBlocked = true;
                        newViolationState.tempBlockedUntil = p.tempBlockedUntil;
                        setIsEditorLocked(true);
                        const timeLeft = blockEnd.getTime() - Date.now();
                        setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
                    }
                } else if (p.isBlocked) {
                    newViolationState.isBlocked = true;
                    setIsEditorLocked(true);
                }

                setViolations(newViolationState);
            }
        };

        checkBlockStatus();
    }, [contestId, onBlocked]);

    // Countdown timer for temp block
    useEffect(() => {
        if (tempBlockTimeLeft <= 0) return;

        const interval = setInterval(() => {
            setTempBlockTimeLeft(prev => {
                if (prev <= 1) {
                    // Timer expired - unblock
                    setIsEditorLocked(false);
                    setViolations(v => ({ ...v, isBlocked: false, tempBlockedUntil: null }));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [tempBlockTimeLeft > 0]); // Keep boolean dependency but ensure it works on reset

    useEffect(() => {
        if (!contestId || !sessionId) return;

        // Setup delay to prevent false positives
        const mountTimeout = setTimeout(() => {
            isMounted.current = true;

            // After refresh, check if we need to re-enter fullscreen
            if (!document.fullscreenElement && !isRefreshing.current) {
                setNeedsFullscreen(true);
                needsFullscreenRef.current = true; // Immediate sync for event listeners
            }
        }, 3000);

        // =============================================
        // 1. MULTI-TAB DETECTION via BroadcastChannel
        // =============================================
        try {
            broadcastChannel.current = new BroadcastChannel(`contest-${contestId}`);

            // Announce presence
            broadcastChannel.current.postMessage({ type: "ping", sessionId });

            // Listen for other tabs
            broadcastChannel.current.onmessage = (event) => {
                if (event.data.type === "ping" && event.data.sessionId !== sessionId) {
                    handleViolation("MULTI_TAB", "Contest opened in multiple tabs");
                    // Respond so the other tab knows
                    broadcastChannel.current?.postMessage({ type: "conflict", sessionId });
                }
                if (event.data.type === "conflict" && event.data.sessionId !== sessionId) {
                    handleViolation("MULTI_TAB", "Contest opened in multiple tabs");
                }
            };
        } catch (e) {
            console.warn("BroadcastChannel not supported");
        }

        // =============================================
        // 2. FULLSCREEN ENFORCEMENT
        // =============================================
        const enterFullscreen = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        };

        const handleFullscreenChange = () => {
            if (!isMounted.current) return;
            if (!document.fullscreenElement) {
                handleViolation("FULLSCREEN_EXIT", "You exited fullscreen mode");
            }
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        // =============================================
        // 3. COPY/PASTE/CUT PREVENTION
        // =============================================
        const preventClipboard = (e: ClipboardEvent) => {
            if (!isMounted.current) return;
            e.preventDefault();
            handleViolation("COPY_PASTE", `${e.type.charAt(0).toUpperCase() + e.type.slice(1)} is not allowed`);
            return false;
        };

        document.addEventListener("copy", preventClipboard);
        document.addEventListener("cut", preventClipboard);
        document.addEventListener("paste", preventClipboard);

        // =============================================
        // 4. KEYBOARD SHORTCUT BLOCKING
        // =============================================
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isMounted.current) return;

            // Check against blocked shortcuts
            const isBlocked = BLOCKED_SHORTCUTS.some(shortcut => {
                const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
                const ctrlMatch = e.ctrlKey === shortcut.ctrl || e.metaKey === shortcut.ctrl;
                const shiftMatch = e.shiftKey === shortcut.shift;
                return keyMatch && ctrlMatch && shiftMatch;
            });

            if (isBlocked) {
                e.preventDefault();
                e.stopPropagation();
                handleViolation("KEYBOARD_SHORTCUT", `Blocked shortcut: ${e.ctrlKey ? "Ctrl+" : ""}${e.shiftKey ? "Shift+" : ""}${e.key}`);
                return false;
            }

            // Detect Refresh to suppress false positives
            const isRefresh = (e.key === "F5") ||
                            ((e.key.toLowerCase() === "r") && (e.ctrlKey || e.metaKey));

            if (isRefresh) {
                isRefreshing.current = true;
            }
        };

        document.addEventListener("keydown", handleKeyDown, true);

        // =============================================
        // 5. TAB SWITCH / FOCUS DETECTION
        // =============================================
        const handleVisibilityChange = () => {
            if (!isMounted.current) return;
            if (document.hidden) {
                handleViolation("TAB_SWITCH", "You switched away from the contest tab");
            }
        };

        const handleWindowBlur = () => {
            if (!isMounted.current) return;
            handleViolation("TAB_SWITCH", "Window lost focus");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleWindowBlur);

        // =============================================
        // 5b. INTERACTION-BASED COMPLIANCE (Optimized)
        // =============================================
        // =============================================
        // 5b. INTERACTION-BASED COMPLIANCE (Optimization: Throttled)
        // =============================================
        let lastCheck = 0;
        const checkCompliance = () => {
             const now = Date.now();
             // Throttle: Max once per 2 seconds during active interaction
             if (now - lastCheck < 2000) return;
             lastCheck = now;

             if (!isMounted.current) return;
             // Skip if already processing/blocked OR if waiting for fullscreen (using Ref for live value) OR PAUSED
             if (paused || isProcessingViolation.current || isEditorLocked || showWarningPopup || needsFullscreenRef.current) return;

             // 1. Check Fullscreen
             if (!document.fullscreenElement && !isRefreshing.current) {
                 handleViolation("FULLSCREEN_EXIT", "You must stay in fullscreen mode");
                 return;
             }
        };

        // Event-driven checks are sufficient without polling overhead
        document.addEventListener("mousedown", checkCompliance);
        document.addEventListener("keydown", checkCompliance);
        document.addEventListener("touchstart", checkCompliance);

        // No polling heartbeat needed - visibilitychange and fullscreenchange handle the critical events instantly

        // =============================================
        // 6. DEVTOOLS DETECTION (Event-Driven)
        // =============================================
        let resizeTimeout: NodeJS.Timeout;
        const checkDevTools = () => {
            if (!isMounted.current) return;
            const threshold = 160;
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;

            if (widthDiff > threshold || heightDiff > threshold) {
                handleViolation("DEVTOOLS_OPEN", "Developer tools detected");
            }
        };

        const handleResize = () => {
             clearTimeout(resizeTimeout);
             resizeTimeout = setTimeout(checkDevTools, 500); // Debounce resize check
        };

        window.addEventListener("resize", handleResize);

        // =============================================
        // 7. CONTEXT MENU DISABLE
        // =============================================
        const preventContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };
        document.addEventListener("contextmenu", preventContextMenu);

        // =============================================
        // 8. INTERNAL NAVIGATION TRACKING
        // =============================================
        // Track clicks on links to prevent false positives when navigating to problems
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            if (link) {
                const href = link.getAttribute('href');
                // If it's an internal link (same origin or relative path)
                if (href && (href.startsWith('/') || href.startsWith(window.location.origin))) {
                    isNavigating.current = true;
                    // Reset after a short delay in case navigation is cancelled
                    setTimeout(() => {
                        isNavigating.current = false;
                    }, 2000);
                }
            }
        };
        document.addEventListener("click", handleLinkClick, true);

        // =============================================
        // 8. BEFOREUNLOAD WARNING
        // =============================================
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            isRefreshing.current = true; // Mark as refreshing/navigating
            // DISABLE LEAVE CONFIRMATION
            // e.preventDefault();
            // e.returnValue = "You are in contest mode. Are you sure you want to leave?";
            // return e.returnValue;
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        // =============================================
        // 9. DRAG/DROP PREVENTION
        // =============================================
        const preventDragDrop = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };
        document.addEventListener("dragover", preventDragDrop);
        document.addEventListener("drop", preventDragDrop);

        // Cleanup
        return () => {
            clearTimeout(mountTimeout);
            clearTimeout(resizeTimeout);
            broadcastChannel.current?.close();
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("copy", preventClipboard);
            document.removeEventListener("cut", preventClipboard);
            document.removeEventListener("paste", preventClipboard);
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleWindowBlur);
            window.removeEventListener("resize", handleResize);

            document.removeEventListener("mousedown", checkCompliance);
            document.removeEventListener("keydown", checkCompliance);
            document.removeEventListener("touchstart", checkCompliance);

            document.removeEventListener("contextmenu", preventContextMenu);
            document.removeEventListener("click", handleLinkClick, true);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("dragover", preventDragDrop);
            document.removeEventListener("drop", preventDragDrop);
        };
    }, [contestId, sessionId, handleViolation]);

    const handleDismissWarning = () => {
        // Only allow dismissing if we successfully enter fullscreen
        const enterFullscreen = async () => {
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
                // Only if successful, close popup
                setShowWarningPopup(false);
            } catch (err) {
                 // If user denies fullscreen or it fails, keep popup open
                 // Maybe show a toast or shake animation in future
            }
        };
        enterFullscreen();
    };

    const handleReEnterFullscreen = () => {
        document.documentElement.requestFullscreen()
            .then(() => setNeedsFullscreen(false))
            .catch(() => {
                // If fails, keeps the popup open
            });
    };

    const remainingWarnings = MAX_WARNINGS - violations.total;

    return (
        <>
            {/* Unified Warning/Block Card - Redesigned */}
            {(isEditorLocked || showWarningPopup) && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#141414] rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-orange-100 dark:border-orange-500/20 transform transition-all scale-100">

                        {/* Status Bar Top */}
                         <div className={`h-2 w-full ${
                                violations.permanentlyBlocked ? 'bg-red-500' : 'bg-orange-500'
                            }`}
                        />

                        <div className="p-6 md:p-8">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                {/* Large Icon Box */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                                    violations.permanentlyBlocked
                                        ? 'bg-red-50 dark:bg-red-500/10 text-red-500'
                                        : 'bg-orange-50 dark:bg-orange-500/10 text-orange-500'
                                }`}>
                                    {violations.permanentlyBlocked ? (
                                        <Ban className="w-8 h-8" />
                                    ) : tempBlockTimeLeft > 0 ? (
                                        <Clock className="w-8 h-8 animate-pulse" />
                                    ) : isEditorLocked ? (
                                        <Lock className="w-8 h-8" />
                                    ) : (
                                        <AlertTriangle className="w-8 h-8" />
                                    )}
                                </div>

                                <div className="flex-1 space-y-1">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                                        {violations.permanentlyBlocked
                                            ? 'Contest Session Terminated'
                                            : tempBlockTimeLeft > 0
                                                ? 'Temporary Suspension'
                                                : 'Violation Detected'
                                        }
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                                         {violations.permanentlyBlocked
                                            ? 'Multiple violations detected. Your session has been permanently blocked.'
                                            : tempBlockTimeLeft > 0
                                                ? 'Please wait for the timer to expire before continuing.'
                                                : currentViolationType || 'This action is prohibited during the contest.'
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Timer Section */}
                            {tempBlockTimeLeft > 0 && (
                                <div className="mt-8 p-6 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/20 flex flex-col items-center justify-center">
                                    <span className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Access Resumes In</span>
                                    <div className="text-5xl font-black text-orange-500 font-mono tracking-tighter tabular-nums">
                                        {Math.floor(tempBlockTimeLeft / 60)}:{String(tempBlockTimeLeft % 60).padStart(2, '0')}
                                    </div>
                                </div>
                            )}

                             {/* Progress Bar (Only if not perma-blocked and no timer active) */}
                            {!violations.permanentlyBlocked && tempBlockTimeLeft <= 0 && (
                                <div className="mt-8 space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Warning Level</span>
                                        <span className="text-sm font-bold text-gray-900 dark:text-white">{violations.total} <span className="text-gray-400 font-normal">/ {MAX_WARNINGS}</span></span>
                                    </div>
                                    <div className="h-3 bg-gray-100 dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-500 ease-out ${
                                                violations.total >= 4 ? 'bg-red-500' : 'bg-orange-500'
                                            }`}
                                            style={{ width: `${Math.min((violations.total / MAX_WARNINGS) * 100, 100)}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-400">Low Risk</span>
                                        {violations.total >= 4 ? (
                                             <span className="text-red-500 font-medium">Critical Risk</span>
                                        ) : (
                                            <span className="text-orange-500 font-medium">Caution</span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="mt-8">
                                {!violations.permanentlyBlocked && tempBlockTimeLeft <= 0 ? (
                                    <button
                                        onClick={handleDismissWarning}
                                        className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform active:scale-[0.98] shadow-lg shadow-gray-200 dark:shadow-none"
                                    >
                                        Acknowledge & Continue
                                    </button>
                                ) : tempBlockTimeLeft > 0 ? (
                                     <button disabled className="w-full py-4 bg-gray-100 dark:bg-[#1a1a1a] text-gray-400 dark:text-gray-600 rounded-xl font-bold cursor-not-allowed">
                                        Suspended
                                    </button>
                                ) : (
                                    <button className="w-full py-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-500 rounded-xl font-bold border border-red-100 dark:border-red-500/20 cursor-not-allowed">
                                        Contact Administrator
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Required Prompt (Post-Refresh) */}
            {needsFullscreen && !isEditorLocked && !showWarningPopup && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-md">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden border-2 border-orange-500 animate-in fade-in zoom-in duration-300">
                        <div className="bg-orange-600 px-6 py-4 flex items-center gap-3">
                            <Monitor className="w-6 h-6 text-white" />
                            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Fullscreen Required</h2>
                        </div>

                        <div className="p-6 text-center">
                            <div className="w-20 h-20 bg-orange-50 dark:bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ShieldX className="w-10 h-10 text-orange-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Re-activate Proctoring</h3>
                            <p className="text-gray-600 mb-8 text-sm">
                                To continue your contest session, you must re-enter fullscreen mode. This is required for proctoring accuracy.
                            </p>

                            <button
                                onClick={handleReEnterFullscreen}
                                className="w-full py-4 bg-orange-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 group"
                            >
                                <Monitor className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Go Full Screen
                            </button>

                            <p className="text-[10px] text-gray-400 mt-4 font-medium uppercase tracking-tighter">
                                Do not attempt to stay in windowed mode
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {/* Proctoring Indicator - Clean white style */}
            <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Proctored</span>
                {violations.total > 0 && (
                    <span className="px-2 py-0.5 bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded text-xs font-semibold">
                        {violations.total}
                    </span>
                )}
            </div>
        </>
    );
}

