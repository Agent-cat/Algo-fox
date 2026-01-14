"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { getRandomProblem } from "@/actions/problems";
import { ProblemType, ProblemDomain } from "@prisma/client";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle,
  Clock,
  Send,
  Moon,
  Sun,
  ShieldAlert,
  Shuffle,
  Play
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import UserPoints from "@/components/UserPoints";
import { useTheme } from "next-themes";

// Theme toggle button component
function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button className="p-2 text-gray-500 opacity-50 cursor-default">
         <Moon className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

interface WorkspaceHeaderProps {
  onSubmit: () => void;
  onRun: () => void;
  isSubmitting: boolean;
  isRunning: boolean;
  contestId?: string;
  endTime?: string | Date;
  nextProblemSlug?: string | null;
  prevProblemSlug?: string | null;
  domain?: ProblemDomain;
  type?: ProblemType;
}

export default function WorkspaceHeader({
  onSubmit,
  onRun,
  isSubmitting,
  isRunning,
  contestId,
  endTime,
  nextProblemSlug,
  prevProblemSlug,
  domain,
  type
}: WorkspaceHeaderProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isRandomizing, startRandomizing] = useTransition();
  const profileRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const notifiedMins = useRef<Set<number>>(new Set());

  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // CONTEST TIMER & NOTIFICATIONS
  useEffect(() => {
    if (!contestId || !endTime) return;

    const targetDate = new Date(endTime);

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      );

      // Sonner notifications for 30m, 10m, 5m, 1m
      const totalMinutes = Math.floor(diff / (1000 * 60));
      if ([30, 10, 5, 1].includes(totalMinutes) && !notifiedMins.current.has(totalMinutes)) {
        toast.warning(`${totalMinutes} minute${totalMinutes > 1 ? 's' : ''} remaining!`, {
          description: "Make sure to submit your work before the time expires.",
          duration: 10000,
        });
        notifiedMins.current.add(totalMinutes);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [contestId, endTime]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="h-16 bg-white dark:bg-[#0a0a0a] border-b border-dashed border-gray-200 dark:border-[#262626] flex items-center justify-between px-4 z-10 relative">
      {/* LEFT: NAVIGATION */}
      <div className={`flex items-center gap-4 ${contestId ? 'w-1/3' : ''}`}>
        <Link href={contestId ? `/contest/${contestId}` : "/"} className="flex items-center gap-2 group mr-4">
          <span className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-sm font-bold">
            A
          </span>
          {contestId && (
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 leading-none">Contest</span>
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight">Arena Active</span>
            </div>
          )}
        </Link>

        {!contestId && (
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={domain === "SQL" ? "/problems/sql" : "/problems/dsa"}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span className="sr-only">List</span>
              Problem List
            </Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            {/* PREVIOUS - NEWER PROBLEM */}
            <button
              className={`p-1 rounded-lg transition-colors ${prevProblemSlug ? 'hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
              disabled={!prevProblemSlug}
              onClick={() => prevProblemSlug && router.push(`/problems/${prevProblemSlug}`)}
              title="Previous Problem"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {/* NEXT - OLDER PROBLEM */}
            <button
              className={`p-1 rounded-lg transition-colors ${nextProblemSlug ? 'hover:bg-gray-100 dark:hover:bg-[#1a1a1a] text-gray-500' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
              disabled={!nextProblemSlug}
              onClick={() => nextProblemSlug && router.push(`/problems/${nextProblemSlug}`)}
              title="Next Problem"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <button
              onClick={() => {
                if (domain && type) {
                  startRandomizing(async () => {
                    const slug = await getRandomProblem(domain, type);
                    if (slug) router.push(`/problems/${slug}`);
                    else toast.error("No other problems found");
                  });
                }
              }}
              disabled={isRandomizing}
              className={`p-1 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg text-gray-500 transition-colors ${isRandomizing ? 'opacity-50' : ''}`}
              title="Random Problem"
            >
              <Shuffle className={`w-4 h-4 ${isRandomizing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* CENTER / RIGHT: ACTIONS */}
      <div className={`flex items-center gap-2 ${contestId ? 'flex-1 justify-center' : ''}`}>
        <button
          className={`flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#262626] text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg transition-all disabled:opacity-50 ${contestId ? 'border border-gray-200 dark:border-[#262626] shadow-sm' : ''}`}
          onClick={onRun}
          disabled={isRunning || isSubmitting}
        >
          {isRunning ? (
            <div className="w-3 h-3 border-2 border-gray-500/30 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          {isRunning ? 'Running...' : 'Run'}
        </button>

        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`flex items-center gap-2 px-8 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-black uppercase tracking-wider rounded-lg shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95`}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          {isSubmitting ? 'Submitting...' : 'Submit Now'}
        </button>

        {contestId && timeLeft && (
          <div className="flex flex-col items-center justify-center px-4 py-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/30 ml-6">
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none mb-0.5">Time Left</span>
            <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 leading-none">{timeLeft}</span>
          </div>
        )}
      </div>

      {/* RIGHT: USER / SETTINGS */}
      <div className={`flex items-center gap-4 ${contestId ? 'w-1/3 justify-end' : ''}`}>
        {!contestId && (
          <>
            <ThemeToggleButton />

            {session ? (
              <div className="flex items-center gap-4">
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#262626]"
                  >
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:block">
                      {session.user.name}
                    </span>
                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white dark:ring-[#0a0a0a] bg-orange-50 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center font-bold text-xs ring-offset-1">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        session.user.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl shadow-lg p-1 z-50 origin-top-right"
                      >
                        {(session.user as any).role === "ADMIN" && (
                          <Link
                            href="/admin"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg"
                            onClick={() => setProfileOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg"
                          onClick={() => setProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <UserPoints className="hidden md:flex" />
              </div>
            ) : (
              <Link
                href="/signin"
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-600"
              >
                Sign In
              </Link>
            )}
          </>
        )}
        {contestId && (
          <div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-500/30">
            <ShieldAlert className="w-4 h-4 text-orange-600" />
            <span className="text-[10px] font-black text-orange-700 dark:text-orange-400 uppercase tracking-tighter">Proctored Mode</span>
          </div>
        )}
      </div>
    </div>
  );
}
