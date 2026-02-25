"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { toast } from "sonner";

import {
  AlertTriangle,
  ShieldX,
  Monitor,
  Eye,
  Lock,
  Ban,
  Clock,
} from "lucide-react";
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
  { key: "c", ctrl: true, shift: false }, // Ctrl+C
  { key: "v", ctrl: true, shift: false }, // Ctrl+V
  { key: "x", ctrl: true, shift: false }, // Ctrl+X
  { key: "u", ctrl: true, shift: false }, // Ctrl+U (view source)
  { key: "s", ctrl: true, shift: false }, // Ctrl+S
  { key: "p", ctrl: true, shift: false }, // Ctrl+P (print)
  { key: "i", ctrl: true, shift: true }, // Ctrl+Shift+I (devtools)
  { key: "j", ctrl: true, shift: true }, // Ctrl+Shift+J (console)
  { key: "c", ctrl: true, shift: true }, // Ctrl+Shift+C (inspect)
  { key: "F12", ctrl: false, shift: false }, // F12
];

export default function ContestProtection({
  contestId,
  sessionId,
  onAutoSubmit,
  onBlocked,
  paused = false,
}: ContestProtectionProps) {
  const [violations, setViolations] = useState<ViolationState>({
    total: 0,
    isFlagged: false,
    isBlocked: false,
    tempBlockedUntil: null,
    permanentlyBlocked: false,
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
  const handleViolation = useCallback(
    async (
      type:
        | "TAB_SWITCH"
        | "FULLSCREEN_EXIT"
        | "COPY_PASTE"
        | "DEVTOOLS_OPEN"
        | "KEYBOARD_SHORTCUT"
        | "NAVIGATION_ATTEMPT"
        | "MULTI_TAB",
      message: string
    ) => {
      // Skip if navigating internally (prevents false positives when clicking problems)
      if (!isMounted.current || isRefreshing.current || isNavigating.current)
        return;

      // Navigation attempts: just show a toast, don't count or show popup
      if (type === "NAVIGATION_ATTEMPT") {
        toast.error("Navigation blocked", {
          description: message,
          duration: 3000,
        });
        return;
      }

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
            permanentlyBlocked: result.permanentlyBlocked || false,
          };
          setViolations(newState);

          // Handle tiered escalation
          if (result.permanentlyBlocked) {
            setIsEditorLocked(true);
            onBlocked?.();
          } else if (result.tempBlockedUntil) {
            setIsEditorLocked(true);
            // Calculate time left
            const timeLeft =
              new Date(result.tempBlockedUntil).getTime() - Date.now();
            setTempBlockTimeLeft(Math.max(0, Math.floor(timeLeft / 1000)));
          }
        }
      } catch (error) {
        console.error("Failed to log violation:", error);
      } finally {
        isProcessingViolation.current = false;
      }
    },
    [contestId, canLogViolation, onAutoSubmit, onBlocked]
  );

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
          permanentlyBlocked: false,
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
      setTempBlockTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer expired - unblock
          setIsEditorLocked(false);
          setViolations((v) => ({
            ...v,
            isBlocked: false,
            tempBlockedUntil: null,
          }));
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
          broadcastChannel.current?.postMessage({
            type: "conflict",
            sessionId,
          });
        }
        if (
          event.data.type === "conflict" &&
          event.data.sessionId !== sessionId
        ) {
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
      handleViolation(
        "COPY_PASTE",
        `${e.type.charAt(0).toUpperCase() + e.type.slice(1)} is not allowed`
      );
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
      const isBlocked = BLOCKED_SHORTCUTS.some((shortcut) => {
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatch =
          e.ctrlKey === shortcut.ctrl || e.metaKey === shortcut.ctrl;
        const shiftMatch = e.shiftKey === shortcut.shift;
        return keyMatch && ctrlMatch && shiftMatch;
      });

      if (isBlocked) {
        e.preventDefault();
        e.stopPropagation();
        handleViolation(
          "KEYBOARD_SHORTCUT",
          `Blocked shortcut: ${e.ctrlKey ? "Ctrl+" : ""}${
            e.shiftKey ? "Shift+" : ""
          }${e.key}`
        );
        return false;
      }

      // Detect Refresh to suppress false positives
      const isRefresh =
        e.key === "F5" ||
        (e.key.toLowerCase() === "r" && (e.ctrlKey || e.metaKey));

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
      if (
        paused ||
        isProcessingViolation.current ||
        isEditorLocked ||
        showWarningPopup ||
        needsFullscreenRef.current
      )
        return;

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
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        // If it's an internal link (same origin or relative path)
        if (
          href &&
          (href.startsWith("/") || href.startsWith(window.location.origin))
        ) {
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
    document.documentElement
      .requestFullscreen()
      .then(() => setNeedsFullscreen(false))
      .catch(() => {
        // If fails, keeps the popup open
      });
  };

  const remainingWarnings = MAX_WARNINGS - violations.total;

  return (
    <>
      {/* === Popup Animation Styles === */}
      <style jsx global>{`
        @keyframes cp-enter {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cp-overlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cp-glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(249,115,22,0.08); }
          50% { box-shadow: 0 0 40px rgba(249,115,22,0.15); }
        }
        @keyframes cp-dot-ping {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes cp-scan-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes cp-timer-pulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* ============================================= */}
      {/* VIOLATION WARNING / BLOCK POPUP               */}
      {/* ============================================= */}
      {(isEditorLocked || showWarningPopup) && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            animation: 'cp-overlay 0.25s ease-out',
          }}
        >
          <div
            className="w-full max-w-[560px] rounded-2xl overflow-hidden bg-white dark:bg-[#161618] border border-gray-200/80 dark:border-[#2a2a2e]"
            style={{
              animation: 'cp-enter 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.03) inset',
            }}
          >
            {/* Top accent line */}
            <div
              className="h-[3px] w-full"
              style={{
                background: violations.permanentlyBlocked
                  ? 'linear-gradient(90deg, #ef4444 0%, #dc2626 50%, #ef4444 100%)'
                  : 'linear-gradient(90deg, #f97316 0%, #f59e0b 50%, #f97316 100%)',
              }}
            />

            <div className="px-6 pt-6 pb-2">
              {/* Icon + Title Row */}
              <div className="flex items-center gap-4 mb-1">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    violations.permanentlyBlocked
                      ? 'bg-red-500/10 dark:bg-red-500/15'
                      : 'bg-orange-500/10 dark:bg-orange-500/15'
                  }`}
                >
                  {violations.permanentlyBlocked ? (
                    <Ban className="w-5 h-5 text-red-500" />
                  ) : tempBlockTimeLeft > 0 ? (
                    <Clock className="w-5 h-5 text-orange-500" />
                  ) : isEditorLocked ? (
                    <Lock className="w-5 h-5 text-orange-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-gray-900 dark:text-white leading-tight">
                    {violations.permanentlyBlocked
                      ? "Session Terminated"
                      : tempBlockTimeLeft > 0
                      ? "Temporarily Suspended"
                      : "Violation Detected"}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-gray-500 dark:text-[#888] leading-relaxed mt-3 pl-14">
                {violations.permanentlyBlocked
                  ? "Your session has been permanently blocked due to repeated violations."
                  : tempBlockTimeLeft > 0
                  ? "Your access is temporarily suspended. Wait for the timer."
                  : currentViolationType || "This action is not allowed during the contest."}
              </p>
            </div>

            {/* Timer Section */}
            {tempBlockTimeLeft > 0 && (
              <div className="mx-6 mt-4 mb-2 p-5 rounded-xl bg-gray-50 dark:bg-[#1c1c1f] border border-gray-100 dark:border-[#2a2a2e]">
                <div className="text-[10px] font-medium text-gray-400 dark:text-[#666] uppercase tracking-[0.15em] text-center mb-2">
                  Resumes in
                </div>
                <div
                  className="text-center text-4xl font-bold font-mono tabular-nums text-orange-500 dark:text-orange-400"
                  style={{ animation: 'cp-timer-pulse 2s ease-in-out infinite' }}
                >
                  {Math.floor(tempBlockTimeLeft / 60)}:{String(tempBlockTimeLeft % 60).padStart(2, "0")}
                </div>
              </div>
            )}

            {/* Warning Dots + Progress */}
            {!violations.permanentlyBlocked && tempBlockTimeLeft <= 0 && (
              <div className="mx-6 mt-4 mb-2">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-medium text-gray-400 dark:text-[#666]">
                    Warnings
                  </span>
                  <span className="text-[11px] font-semibold text-gray-600 dark:text-[#999]">
                    {violations.total} of {MAX_WARNINGS}
                  </span>
                </div>
                {/* Segmented dots */}
                <div className="flex gap-1.5">
                  {Array.from({ length: MAX_WARNINGS }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-2 rounded-full transition-all duration-500"
                      style={{
                        background:
                          i < violations.total
                            ? violations.total >= 4
                              ? '#ef4444'
                              : '#f97316'
                            : 'rgba(0,0,0,0.06)',
                        boxShadow:
                          i < violations.total
                            ? violations.total >= 4
                              ? '0 0 8px rgba(239,68,68,0.3)'
                              : '0 0 8px rgba(249,115,22,0.2)'
                            : 'none',
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-gray-300 dark:text-[#444]">Safe</span>
                  <span className={`text-[10px] font-medium ${violations.total >= 4 ? 'text-red-500' : 'text-orange-400'}`}>
                    {violations.total >= 4 ? 'Critical' : violations.total >= 2 ? 'Caution' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="mx-6 h-px bg-gray-100 dark:bg-[#2a2a2e] my-2" />

            {/* Action */}
            <div className="px-6 pb-5 pt-3">
              {!violations.permanentlyBlocked && tempBlockTimeLeft <= 0 ? (
                <button
                  onClick={handleDismissWarning}
                  className="w-full py-3 rounded-xl text-[13px] font-semibold text-white bg-gray-900 dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 active:scale-[0.98]"
                >
                  Continue
                </button>
              ) : tempBlockTimeLeft > 0 ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl text-[13px] font-semibold text-gray-400 dark:text-[#555] bg-gray-100 dark:bg-[#1c1c1f] cursor-not-allowed border border-gray-200 dark:border-[#2a2a2e]"
                >
                  Locked
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-3 rounded-xl text-[13px] font-semibold text-red-500/80 bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10 cursor-not-allowed"
                >
                  Contact Administrator
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================= */}
      {/* FULLSCREEN REQUIRED POPUP                     */}
      {/* ============================================= */}
      {needsFullscreen && !isEditorLocked && !showWarningPopup && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'cp-overlay 0.3s ease-out',
          }}
        >
          <div
            className="w-full max-w-[520px] rounded-2xl overflow-hidden bg-white dark:bg-[#161618] border border-gray-200/80 dark:border-[#2a2a2e]"
            style={{
              animation: 'cp-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset',
            }}
          >
            {/* Animated scan line */}
            <div className="h-[3px] w-full overflow-hidden relative">
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
                  animation: 'cp-scan-line 2s ease-in-out infinite',
                }}
              />
            </div>

            <div className="p-8 flex flex-col items-center text-center">
              {/* Shield Icon */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-orange-500/10 dark:bg-orange-500/15"
                style={{ animation: 'cp-glow-pulse 3s ease-in-out infinite' }}
              >
                <ShieldX className="w-8 h-8 text-orange-500" />
              </div>

              {/* Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/8 dark:bg-orange-500/10 border border-orange-500/15 mb-4">
                <Monitor className="w-3 h-3 text-orange-500" />
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  Fullscreen Required
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Re-activate Proctoring
              </h3>
              <p className="text-[13px] text-gray-500 dark:text-[#777] leading-relaxed mb-7 max-w-[280px]">
                Re-enter fullscreen mode to continue your contest session. This is required for proctoring.
              </p>

              <button
                onClick={handleReEnterFullscreen}
                className="w-full py-3.5 rounded-xl text-[13px] font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2.5 group active:scale-[0.98]"
                style={{
                  boxShadow: '0 4px 16px rgba(249,115,22,0.25)',
                }}
              >
                <Monitor className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Go Full Screen
              </button>

              <p className="text-[10px] text-gray-400 dark:text-[#555] mt-4 tracking-wide">
                Do not attempt to stay in windowed mode
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================= */}
      {/* PROCTORING INDICATOR BADGE                    */}
      {/* ============================================= */}
      <div className="fixed top-4 right-4 z-[100] flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 dark:bg-[#1c1c1f]/90 border border-gray-200/60 dark:border-[#2a2a2e] backdrop-blur-xl shadow-sm dark:shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
        <div className="relative">
          <div className="w-[6px] h-[6px] bg-emerald-500 rounded-full" />
          <div
            className="absolute inset-0 w-[6px] h-[6px] bg-emerald-400 rounded-full"
            style={{ animation: 'cp-dot-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }}
          />
        </div>
        <span className="text-[11px] text-gray-600 dark:text-[#999] font-medium">
          Proctored
        </span>
        {violations.total > 0 && (
          <span className="min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 dark:bg-orange-500/15">
            {violations.total}
          </span>
        )}
      </div>
    </>
  );
}
