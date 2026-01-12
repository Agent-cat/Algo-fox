"use client";

import { useEffect, useState, useRef, useCallback } from "react";

import { AlertTriangle, ShieldX, Monitor, Eye, Lock, Ban, Clock } from "lucide-react";
import { logContestViolation, getParticipationStatus } from "@/actions/contest";

interface ContestProtectionProps {
    contestId: string;
    sessionId: string;
    onAutoSubmit?: () => void;
    onBlocked?: () => void;
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
    onBlocked
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

    // Global debounce - only ONE violation allowed every 15 seconds
    const canLogViolation = useCallback(() => {
        const now = Date.now();

        // If already processing a violation, block
        if (isProcessingViolation.current) return false;

        // 15 second global cooldown
        if (now - lastViolationTime.current < 15000) return false;

        return true;
    }, []);

    // Log violation to server and update state
    const handleViolation = useCallback(async (
        type: "TAB_SWITCH" | "FULLSCREEN_EXIT" | "COPY_PASTE" | "DEVTOOLS_OPEN" | "KEYBOARD_SHORTCUT" | "NAVIGATION_ATTEMPT" | "MULTI_TAB",
        message: string
    ) => {
        if (!isMounted.current || isRefreshing.current) return;

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

                if (p.permanentlyBlocked) {
                    setViolations({
                        total: p.totalViolations || 0,
                        isFlagged: p.isFlagged,
                        isBlocked: true,
                        tempBlockedUntil: null,
                        permanentlyBlocked: true
                    });
                    setIsEditorLocked(true);
                    onBlocked?.();
                } else if (p.tempBlockedUntil) {
                    const blockEnd = new Date(p.tempBlockedUntil);
                    if (blockEnd > new Date()) {
                        setViolations({
                            total: p.totalViolations || 0,
                            isFlagged: p.isFlagged,
                            isBlocked: true,
                            tempBlockedUntil: p.tempBlockedUntil,
                            permanentlyBlocked: false
                        });
                        setIsEditorLocked(true);
                        const timeLeft = blockEnd.getTime() - Date.now();
                        setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
                    }
                } else if (p.isBlocked) {
                    setViolations({
                        total: p.totalViolations || 0,
                        isFlagged: p.isFlagged,
                        isBlocked: true,
                        tempBlockedUntil: null,
                        permanentlyBlocked: false
                    });
                    setIsEditorLocked(true);
                }
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
        // 6. DEVTOOLS DETECTION
        // =============================================
        const checkDevTools = () => {
            if (!isMounted.current) return;
            const threshold = 160;
            const widthDiff = window.outerWidth - window.innerWidth;
            const heightDiff = window.outerHeight - window.innerHeight;

            if (widthDiff > threshold || heightDiff > threshold) {
                handleViolation("DEVTOOLS_OPEN", "Developer tools detected");
            }
        };

        const devToolsInterval = setInterval(checkDevTools, 3000);

        // =============================================
        // 7. CONTEXT MENU DISABLE
        // =============================================
        const preventContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };
        document.addEventListener("contextmenu", preventContextMenu);

        // =============================================
        // 8. BEFOREUNLOAD WARNING
        // =============================================
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            isRefreshing.current = true; // Mark as refreshing before the browser shows the dialog
            e.preventDefault();
            e.returnValue = "You are in contest mode. Are you sure you want to leave?";
            return e.returnValue;
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
            clearInterval(devToolsInterval);
            broadcastChannel.current?.close();
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("copy", preventClipboard);
            document.removeEventListener("cut", preventClipboard);
            document.removeEventListener("paste", preventClipboard);
            document.removeEventListener("keydown", handleKeyDown, true);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleWindowBlur);
            document.removeEventListener("contextmenu", preventContextMenu);
            window.removeEventListener("beforeunload", handleBeforeUnload);
            document.removeEventListener("dragover", preventDragDrop);
            document.removeEventListener("drop", preventDragDrop);
        };
    }, [contestId, sessionId, handleViolation]);

    const handleDismissWarning = () => {
        setShowWarningPopup(false);
        // Re-enter fullscreen
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
        }
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
            {/* Unified Warning/Block Card */}
            {(isEditorLocked || showWarningPopup) && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden border border-orange-100">
                        {/* Orange accent bar */}
                        <div className="h-1.5 bg-gradient-to-r from-orange-400 to-orange-500" />

                        <div className="p-6">
                            {/* Header with icon */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                    violations.permanentlyBlocked
                                        ? 'bg-red-50'
                                        : 'bg-orange-50'
                                }`}>
                                    {violations.permanentlyBlocked ? (
                                        <Ban className="w-6 h-6 text-red-500" />
                                    ) : tempBlockTimeLeft > 0 ? (
                                        <Clock className="w-6 h-6 text-orange-500" />
                                    ) : isEditorLocked ? (
                                        <Lock className="w-6 h-6 text-orange-500" />
                                    ) : (
                                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900">
                                        {violations.permanentlyBlocked
                                            ? 'Session Blocked'
                                            : tempBlockTimeLeft > 0
                                                ? 'Temporary Block'
                                                : isEditorLocked
                                                    ? 'Access Suspended'
                                                    : 'Action Blocked'
                                        }
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {violations.permanentlyBlocked
                                            ? 'Contact contest manager'
                                            : tempBlockTimeLeft > 0
                                                ? 'Please wait for timer'
                                                : isEditorLocked
                                                    ? 'Too many violations'
                                                    : currentViolationType || 'This action is not allowed'
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Timer - For temp block */}
                            {tempBlockTimeLeft > 0 && (
                                <div className="bg-orange-50 border border-orange-100 rounded-xl p-5 mb-5 text-center">
                                    <p className="text-xs text-orange-600 uppercase tracking-wide mb-2">Time Remaining</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <Clock className="w-7 h-7 text-orange-500" />
                                        <span className="text-4xl font-bold text-orange-600 font-mono tracking-tight">
                                            {Math.floor(tempBlockTimeLeft / 60)}:{String(tempBlockTimeLeft % 60).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-orange-500 mt-3">
                                        You can continue after the timer expires
                                    </p>
                                </div>
                            )}

                            {/* Permanent block info */}
                            {violations.permanentlyBlocked && (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-5">
                                    <p className="text-red-700 font-medium text-sm">Maximum violations reached ({violations.total})</p>
                                    <p className="text-xs text-red-600 mt-1">
                                        Contact your contest manager for assistance
                                    </p>
                                </div>
                            )}

                            {/* Violation progress - Not for permanent block or timer */}
                            {!violations.permanentlyBlocked && tempBlockTimeLeft <= 0 && (
                                <div className="mb-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-gray-500">Violations</span>
                                        <span className="text-xs font-semibold text-gray-700">{violations.total} / {MAX_WARNINGS}</span>
                                    </div>
                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300"
                                            style={{ width: `${Math.min((violations.total / MAX_WARNINGS) * 100, 100)}%` }}
                                        />
                                    </div>
                                    {violations.total >= 3 && violations.total < 4 && (
                                        <p className="text-xs text-orange-600 mt-2">⚠️ Next violation will trigger a 5-minute block</p>
                                    )}
                                </div>
                            )}

                            {/* Continue button - Only when not permanently blocked and no timer */}
                            {!violations.permanentlyBlocked && tempBlockTimeLeft <= 0 && (
                                <button
                                    onClick={handleDismissWarning}
                                    className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                                >
                                    I Understand, Continue
                                </button>
                            )}

                            {/* Waiting state during timer */}
                            {tempBlockTimeLeft > 0 && (
                                <button
                                    disabled
                                    className="w-full py-3 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed"
                                >
                                    Please wait...
                                </button>
                            )}
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
                            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
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
            <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-700 font-medium">Proctored</span>
                {violations.total > 0 && (
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                        {violations.total}
                    </span>
                )}
            </div>
        </>
    );
}

