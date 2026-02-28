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
  Play,
  Menu
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

  if (!mounted) {
    return (
      <button className="p-2 text-gray-500 opacity-50 cursor-default rounded-lg">
         <Moon className="w-4 h-4" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92, rotate: isDark ? 90 : -90 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
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
  onToggleSidebar?: () => void;
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
  type,
  onToggleSidebar
}: WorkspaceHeaderProps) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isRandomizing, startRandomizing] = useTransition();
  const profileRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const notifiedMins = useRef<Set<number>>(new Set());

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
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-14 bg-white dark:bg-[#0a0a0a] border-b border-gray-200/80 dark:border-[#1e1e1e] flex items-center justify-between px-4 z-10 relative"
    >
      {/* LEFT: NAVIGATION */}
      <div className={`flex items-center gap-3 ${contestId ? 'w-1/3' : ''}`}>
        <Link href={contestId ? `/contest/${contestId}` : "/"} className="flex items-center gap-2 group mr-3">
          <motion.span
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-sm font-bold"
          >
            A
          </motion.span>
          {contestId && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 leading-none">Contest</span>
              <span className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight">Arena Active</span>
            </motion.div>
          )}
        </Link>

        {!contestId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="hidden md:flex items-center gap-1.5"
          >
            {onToggleSidebar && (
              <motion.button
                id="problem-list-toggle"
                onClick={onToggleSidebar}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg text-gray-500 transition-colors"
                title="Toggle Problem List"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
              >
                <Menu className="w-4 h-4" />
              </motion.button>
            )}
            <Link
              href={domain === "SQL" ? "/problems/sql" : "/problems/dsa"}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-[#141414]"
            >
              <span className="sr-only">List</span>
              Problem List
            </Link>
            <span className="text-gray-200 dark:text-gray-700 select-none">|</span>

            {/* Navigation buttons */}
            <div className="flex items-center gap-0.5 bg-gray-50 dark:bg-[#141414] rounded-lg p-0.5 border border-gray-100 dark:border-[#1e1e1e]">
              <motion.button
                className={`p-1.5 rounded-md transition-colors ${prevProblemSlug ? 'hover:bg-white dark:hover:bg-[#1a1a1a] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:shadow-sm' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
                disabled={!prevProblemSlug}
                onClick={() => prevProblemSlug && router.push(`/problems/${prevProblemSlug}`)}
                title="Previous Problem"
                whileHover={prevProblemSlug ? { scale: 1.1 } : {}}
                whileTap={prevProblemSlug ? { scale: 0.9 } : {}}
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                className={`p-1.5 rounded-md transition-colors ${nextProblemSlug ? 'hover:bg-white dark:hover:bg-[#1a1a1a] text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:shadow-sm' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
                disabled={!nextProblemSlug}
                onClick={() => nextProblemSlug && router.push(`/problems/${nextProblemSlug}`)}
                title="Next Problem"
                whileHover={nextProblemSlug ? { scale: 1.1 } : {}}
                whileTap={nextProblemSlug ? { scale: 0.9 } : {}}
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            <motion.button
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
              className={`p-1.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg text-gray-500 transition-colors ${isRandomizing ? 'opacity-50' : ''}`}
              title="Random Problem"
              whileHover={{ scale: 1.08, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <Shuffle className={`w-4 h-4 ${isRandomizing ? 'animate-spin' : ''}`} />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* CENTER: ACTIONS */}
      <div className={`flex items-center gap-2 ${contestId ? 'flex-1 justify-center' : ''}`}>
        <motion.button
          id="run-button"
          className={`
            flex items-center gap-2 px-5 py-2
            bg-gray-100 dark:bg-[#141414] hover:bg-gray-200 dark:hover:bg-[#1c1c1c]
            text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg
            transition-colors duration-200 disabled:opacity-50
            border border-gray-200/80 dark:border-[#262626]
            ${contestId ? 'shadow-sm' : ''}
          `}
          onClick={onRun}
          disabled={isRunning || isSubmitting}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {isRunning ? (
            <motion.div
              className="w-3.5 h-3.5 border-2 border-gray-400/30 border-t-gray-600 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          {isRunning ? 'Running...' : 'Run'}
        </motion.button>

        <motion.button
          id="submit-button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-7 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-black uppercase tracking-wider rounded-lg shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ y: -1, boxShadow: "0 8px 20px -4px rgba(249, 115, 22, 0.3)" }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {isSubmitting ? (
            <motion.div
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </motion.button>

        {contestId && timeLeft && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center px-4 py-1.5 bg-orange-50 dark:bg-orange-500/10 rounded-lg border border-orange-200 dark:border-orange-500/30 ml-4"
          >
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none mb-0.5">Time Left</span>
            <span className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100 leading-none tabular-nums">{timeLeft}</span>
          </motion.div>
        )}
      </div>

      {/* RIGHT: USER / SETTINGS */}
      <div className={`flex items-center gap-3 ${contestId ? 'w-1/3 justify-end' : ''}`}>
        {!contestId && (
          <>
            <ThemeToggleButton />

            {session ? (
              <div className="flex items-center gap-3">
                <div className="relative" ref={profileRef}>
                  <motion.button
                    onClick={() => setProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#262626]"
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 hidden md:block">
                      {session.user.name}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white dark:ring-[#0a0a0a] bg-orange-50 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center font-bold text-xs"
                    >
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        session.user.name?.charAt(0).toUpperCase()
                      )}
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#141414] border border-gray-100 dark:border-[#262626] rounded-xl shadow-xl shadow-black/5 dark:shadow-black/20 p-1 z-50 origin-top-right"
                      >
                        {(session.user as any).role === "ADMIN" && (
                          <Link
                            href="/admin"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            Admin Panel
                          </Link>
                        )}
                        <Link
                          href="/dashboard"
                          className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <div className="my-1 border-t border-gray-100 dark:border-[#262626]" />
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
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
                className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-orange-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </>
        )}
        {contestId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-100 dark:border-orange-500/30"
          >
            <ShieldAlert className="w-4 h-4 text-orange-600" />
            <span className="text-[10px] font-black text-orange-700 dark:text-orange-400 uppercase tracking-tighter">Proctored Mode</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
