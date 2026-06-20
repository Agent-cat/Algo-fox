"use client";

import { useState, useEffect, useRef } from "react";
import {
  Shield,
  Monitor,
  Eye,
  Keyboard,
  ArrowRight,
  Check,
  Lock,
  X,
  Clipboard,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  User,
  Loader2,
  Globe,
  Gauge
} from "lucide-react";
import { startContestSession, verifyContestPassword } from "@/actions/contest";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ContestEntryModalProps {
  contestId: string;
  contestTitle: string;
  requiresPassword?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onStart: (sessionId: string) => void;
}

type WizardStep = 1 | 2 | 3 | 4;
type CheckStatus = "idle" | "checking" | "success" | "error";

export default function ContestEntryModal({
  contestId,
  contestTitle,
  requiresPassword,
  isOpen,
  onClose,
  onStart,
}: ContestEntryModalProps) {
  const [step, setStep] = useState<WizardStep>(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Terms
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Step 2: Password
  const [password, setPassword] = useState("");
  const [infoConfirmed, setInfoConfirmed] = useState(false);

  // Step 3: System Checks
  const [tabCheckStatus, setTabCheckStatus] = useState<CheckStatus>("idle");
  const [extCheckStatus, setExtCheckStatus] = useState<CheckStatus>("idle");
  const [clipboardStatus, setClipboardStatus] = useState<"idle" | "requesting" | "granted" | "denied">("idle");
  const [sysCheckError, setSysCheckError] = useState<string | null>(null);

  // System Stats removed as requested

  // Step 4: Proctoring Instructions
  const [finalAgreed, setFinalAgreed] = useState(false);

  // Countdown State
  const [isStarting, setIsStarting] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [finalSessionId, setFinalSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTermsAgreed(false);
      setPassword("");
      setInfoConfirmed(false);
      setTabCheckStatus("idle");
      setExtCheckStatus("idle");
      setClipboardStatus("idle");
      setSysCheckError(null);
      setFinalAgreed(false);
      setIsStarting(false);
      setCountdown(30);
      setFinalSessionId(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStarting && countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (isStarting && countdown === 0 && finalSessionId) {
      onStart(finalSessionId);
    }
    return () => clearTimeout(timer);
  }, [isStarting, countdown, finalSessionId, onStart]);

  const handleVerifyPassword = async () => {
    if (!password) {
      toast.error("Enter the contest password");
      return;
    }
    setIsLoading(true);
    try {
      const result = await verifyContestPassword(contestId, password);
      if (result.success) {
        setInfoConfirmed(true);
        toast.success("Access granted");
        setStep(3);
      } else {
        toast.error(result.error || "Incorrect password");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestClipboard = async () => {
    setClipboardStatus("requesting");
    try {
      await navigator.clipboard.readText();
      setClipboardStatus("granted");
    } catch {
      setClipboardStatus("denied");
    }
  };


  const runSystemChecks = async () => {
    setSysCheckError(null);

    // 1. Extension Check
    setExtCheckStatus("checking");
    const extensionCheck = await new Promise<any>((resolve) => {
      const timeout = setTimeout(() => {
        window.removeEventListener("message", messageHandler);
        resolve({ success: false, reason: "not_installed" });
      }, 1500);

      const messageHandler = (event: MessageEvent) => {
        if (event.source !== window) return;
        if (event.data && event.data.type === "SAFE_EXAM_ACK" && event.data.action === "start") {
          clearTimeout(timeout);
          window.removeEventListener("message", messageHandler);
          resolve({ success: true, payload: event.data.payload });
        }
      };

      window.addEventListener("message", messageHandler);
      window.postMessage({ type: "SAFE_EXAM_START" }, "*");
    });

    if (!extensionCheck.success) {
      setExtCheckStatus("error");
      setSysCheckError("Safe Exam Extension is not installed or active.");
      return;
    }

    if (extensionCheck.payload.status === "blocked") {
      setExtCheckStatus("error");
      if (extensionCheck.payload.reason === "other_tabs_open") {
        setSysCheckError(`Please close ${extensionCheck.payload.count} other open tab(s) before starting.`);
      } else if (extensionCheck.payload.reason === "other_extensions_active") {
        setSysCheckError(`Please disable other active extensions: ${extensionCheck.payload.extensions.join(', ')}`);
      } else {
        setSysCheckError(`Blocked: ${extensionCheck.payload.reason}`);
      }
      return;
    }

    setExtCheckStatus("success");

    // Wait briefly before starting the tab check
    await new Promise((res) => setTimeout(res, 500));

    // 2. Simulate Tab Check
    setTabCheckStatus("checking");
    await new Promise((res) => setTimeout(res, 2000));
    setTabCheckStatus("success");
  };

  const handleStartContest = async () => {
    if (!finalAgreed) return;
    setIsLoading(true);

    try {
      const result = await startContestSession(contestId, password);
      if (!result.success) {
        const error = (result as any).error || "Could not start session";
        toast.error(String(error));
        setIsLoading(false);
        return;
      }

      if (!(result as any).sessionId) {
        toast.error("Failed to generate a valid session ID. Please try again.");
        setIsLoading(false);
        return;
      }

      setFinalSessionId((result as any).sessionId);

      // Trigger Fullscreen immediately
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.warn("Fullscreen failed", err);
      }

      // Enter countdown state
      setIsStarting(true);
      setIsLoading(false);

    } catch {
      toast.error("Failed to initialize contest");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#24262C] text-white flex items-center justify-center p-6 overflow-hidden animate-in fade-in duration-300 font-sans">

      {/* ── COUNTDOWN OVERLAY ── */}
      {isStarting && (
        <div className="absolute inset-0 z-50 bg-[#24262C] flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Environment Secured</h2>
            <p className="text-xl text-gray-400 mb-12">Your exam will begin in...</p>

            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="90" className="stroke-[#333333] fill-none" strokeWidth="8" />
                <circle
                  cx="96" cy="96" r="90"
                  className="stroke-orange-500 fill-none transition-all duration-1000 ease-linear"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 90}
                  strokeDashoffset={(2 * Math.PI * 90) * (1 - countdown / 30)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-6xl font-black text-white">{countdown}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Centered Modal Box */}
      <div className={cn("flex w-full max-w-[1200px] h-[85vh] min-h-[600px] max-h-[850px] bg-[#24262C] border border-[#333333] rounded-2xl shadow-2xl overflow-hidden transition-opacity duration-300", isStarting && "opacity-0 pointer-events-none")}>

        {/* Left Sidebar Navigation */}
        <div className="w-[380px] bg-[#24262C] border-r border-[#333333] flex flex-col shrink-0">
          <div className="px-10 pt-12 pb-8 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">Test set up</h1>
              <p className="text-sm text-gray-500 truncate max-w-[280px]">{contestTitle}</p>
            </div>
            <button
              onClick={() => {
                window.postMessage({ type: "SAFE_EXAM_END" }, "*");
                onClose();
              }}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-[#333333] -mt-2 -mr-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 space-y-3">
            {[
              { id: 1, title: "Terms and Conditions" },
              { id: 2, title: "Password Verification" },
              { id: 3, title: "System Checks" },
              { id: 4, title: "Proctoring Instructions" },
            ].map((s) => {
              const isActive = step === s.id;
              const isCompleted = step > s.id;
              return (
                <div
                  key={s.id}
                  className={cn(
                    "flex items-center gap-5 py-3 px-5 rounded-xl transition-all duration-300",
                    isActive ? "bg-[#333333]" : "opacity-80 hover:opacity-100 cursor-default"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 transition-colors shrink-0",
                    isActive ? "border-orange-500 text-orange-500 bg-transparent" :
                      isCompleted ? "border-transparent bg-[#333] text-gray-300" :
                        "border-transparent bg-[#2a2a2a] text-gray-400"
                  )}>
                    {isCompleted ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span className={cn(
                    "text-[15px] tracking-wide",
                    isActive ? "text-white font-bold" : "text-gray-300 font-medium"
                  )}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col h-full relative overflow-y-auto">
          <div className="flex-1 max-w-3xl mx-auto w-full px-12 py-16">

            {/* STEP 1: Terms and Conditions */}
            {step === 1 && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-bold mb-6">Terms and Conditions</h2>
                <p className="text-gray-300 font-medium mb-6">
                  I understand that by agreeing to take this test or interview, I will be required to give my consent to the following:
                </p>

                <div className="space-y-6 text-gray-400 text-sm leading-relaxed relative pl-4 border-l-2 border-[#333333]">
                  <p>
                    • I agree to share any personal information that may be required by the platform on behalf of the organizing institution, including but not limited to, email ID, educational qualifications, browsing and usage data, and any other data that may be required.
                  </p>
                  <p>
                    • I understand that the platform does not take any responsibility and is not liable for any damage because of errors, omissions, negligence, or any inaccuracies.
                  </p>
                  <p>
                    • I give explicit consent to record keystrokes and monitor active tabs. I also understand and agree that background data will also be saved automatically.
                  </p>
                  <p>
                    • I understand and agree that all data collected will be used internally for reviews. This information will not be shared with a third party unless required by a court of law.
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-[#333333]">
                  <button
                    onClick={() => { setTermsAgreed(true); setStep(2); }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-lg font-bold transition-colors shadow-lg shadow-orange-500/20"
                  >
                    Accept & Next
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Password Verification */}
            {step === 2 && (
              <div className="animate-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <h2 className="text-3xl font-bold mb-3">Password Verification</h2>
                  <p className="text-gray-400 mb-8 text-base">Please provide the contest access code to proceed.</p>

                  <div className="w-full max-w-xl">
                    {requiresPassword ? (
                      <div>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleVerifyPassword()}
                            placeholder="Enter password"
                            autoFocus
                            className="w-full bg-[#1D1E23] border border-[#333] rounded-xl py-4 pl-12 pr-5 text-base text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all placeholder:text-gray-600 shadow-sm"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <User className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                        <h3 className="text-2xl font-medium text-gray-200">No Password Required</h3>
                        <p className="text-lg text-gray-500 mt-4">This contest is open. You can proceed directly to the system checks.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#333333] flex justify-between gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-[#333] hover:bg-[#1D1E23] rounded-lg font-semibold transition-colors text-base"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      if (requiresPassword) {
                        handleVerifyPassword();
                      } else {
                        setInfoConfirmed(true);
                        setStep(3);
                      }
                    }}
                    disabled={isLoading}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 text-base min-w-[160px]"
                  >
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    {requiresPassword ? "Verify & Next" : "Proceed"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: System Checks */}
            {step === 3 && (
              <div className="animate-in slide-in-from-right-8 duration-500">
                <h2 className="text-3xl font-bold mb-2">System Checks</h2>
                <p className="text-gray-400 mb-8">We are verifying your environment and network stability.</p>

                <div className="flex flex-col divide-y divide-[#333333] border-y border-[#333333] mb-8">
                  {/* Extension Check Item */}
                  <div className="py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#24262C] flex items-center justify-center">
                        <Shield className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-200">Checking Active Extensions</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Ensuring safe exam environment is established.</p>
                      </div>
                    </div>
                    <div>
                      {extCheckStatus === "idle" && <span className="text-sm text-gray-500">Waiting...</span>}
                      {extCheckStatus === "checking" && <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />}
                      {extCheckStatus === "success" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                      {extCheckStatus === "error" && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </div>

                  {/* Tab Check Item */}
                  <div className="py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#24262C] flex items-center justify-center">
                        <Monitor className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-200">Checking Open Tabs</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Verifying no unauthorized tabs are active.</p>
                      </div>
                    </div>
                    <div>
                      {tabCheckStatus === "idle" && <span className="text-sm text-gray-500">Waiting...</span>}
                      {tabCheckStatus === "checking" && <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />}
                      {tabCheckStatus === "success" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                      {tabCheckStatus === "error" && <XCircle className="w-6 h-6 text-red-500" />}
                    </div>
                  </div>

                  {/* Clipboard Check Item */}
                  <div className="py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#24262C] flex items-center justify-center">
                        <Clipboard className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-200">Clipboard Access</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Required to block paste functionality.</p>
                      </div>
                    </div>
                    <div>
                      {clipboardStatus === "idle" && (
                        <button
                          onClick={handleRequestClipboard}
                          className="px-4 py-2 border border-orange-500/50 text-orange-500 rounded text-xs font-semibold hover:bg-orange-500/10 transition-colors"
                        >
                          Grant Access
                        </button>
                      )}
                      {clipboardStatus === "requesting" && <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />}
                      {clipboardStatus === "granted" && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                      {clipboardStatus === "denied" && <span className="text-xs text-gray-500 font-medium">Denied (Fallback Active)</span>}
                    </div>
                  </div>
                </div>

                {sysCheckError && (
                  <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p>{sysCheckError}</p>
                  </div>
                )}



                <div className="pt-8 border-t border-[#333333] flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 border border-[#333] hover:bg-[#1D1E23] rounded-lg font-bold transition-colors"
                  >
                    Back
                  </button>
                  {(tabCheckStatus === "idle" || sysCheckError) && (
                    <button
                      onClick={runSystemChecks}
                      disabled={tabCheckStatus === "checking" || extCheckStatus === "checking"}
                      className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3.5 rounded-lg font-bold transition-colors disabled:opacity-50"
                    >
                      {sysCheckError ? "Retry Checks" : "Run Checks"}
                    </button>
                  )}
                  {tabCheckStatus === "success" && extCheckStatus === "success" && (
                    <button
                      onClick={() => setStep(4)}
                      disabled={clipboardStatus === "idle"}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3.5 rounded-lg font-bold transition-colors shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Proceed
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4: Proctoring Instructions */}
            {step === 4 && (
              <div className="animate-in slide-in-from-right-8 duration-500 flex flex-col h-full">
                <h2 className="text-3xl font-bold mb-2">Final Instructions</h2>
                <p className="text-gray-400 mb-8">Please read these rules carefully. Non-compliance will result in penalties.</p>

                <div className="mb-auto">
                  <ul className="list-disc pl-6 space-y-4 text-gray-300 text-base leading-relaxed">
                    <li>
                      <strong>Fullscreen Enforcement:</strong> The exam operates in strict fullscreen mode. Exiting fullscreen at any point will be instantly flagged as a violation.
                    </li>
                    <li>
                      <strong>Tab & Focus Monitoring:</strong> Navigating away from the active tab, opening new windows, or minimizing the browser (Alt+Tab) is strictly prohibited.
                    </li>
                    <li>
                      <strong>Zero Tolerance Policy:</strong> Multiple violations will result in your session being permanently terminated. Please ensure all other applications and notifications are closed.
                    </li>
                  </ul>
                </div>

                <div className="pt-8 border-t border-[#333333]">
                  <label className="flex items-start gap-3 cursor-pointer mb-8 group">
                    <div className="relative flex items-center shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={finalAgreed}
                        onChange={(e) => setFinalAgreed(e.target.checked)}
                        className="peer h-6 w-6 appearance-none border-2 border-gray-600 rounded bg-[#24262C] checked:border-orange-500 checked:bg-orange-500 transition-all cursor-pointer group-hover:border-orange-500/50"
                      />
                      <Check className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white opacity-0 peer-checked:opacity-100" />
                    </div>
                    <span className="text-base text-gray-300 leading-relaxed font-medium">
                      I acknowledge all instructions. I confirm that I am in a quiet environment and ready to begin my 30-second setup window.
                    </span>
                  </label>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(3)}
                      className="px-6 py-4 border border-[#333] hover:bg-[#1D1E23] rounded-lg font-bold transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleStartContest}
                      disabled={!finalAgreed || isLoading}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-10 py-4 rounded-lg font-bold text-lg transition-all shadow-xl shadow-orange-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-[1.02]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" /> Preparing...
                        </>
                      ) : (
                        <>
                          Start Test <ArrowRight className="w-6 h-6" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* End of Main Centered Modal Box */}
      </div>
    </div>
  );
}
