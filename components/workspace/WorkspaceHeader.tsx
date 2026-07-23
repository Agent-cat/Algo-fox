"use client";

import { useState, useRef, useEffect, useTransition, memo } from "react";
import { getRandomProblem } from "@/actions/problems";
import { ProblemType, ProblemDomain } from "@prisma/client";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  CheckCircle,
  Clock,
  Send,
  ShieldAlert,
  Shuffle,
  Play,
  Menu,
  List,
  Loader2,
  Lock
} from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import UserPoints from "@/components/UserPoints";
import { getPointsLabel } from '@/lib/points';
import { ThemeToggleButton } from "@/components/shared/ThemeToggleButton";
import { TimeTracker } from "./TimeTracker";
import { ContestTimer } from "./ContestTimer";
import CustomTooltip from "../ui/CustomTooltip";
import { BookmarkButton } from "./BookmarkButton";
import { getUserInstitutionDetails } from "@/actions/user.action";

interface WorkspaceHeaderProps {
  onSubmit: () => void;
  onRun: () => void;
  isSubmitting: boolean;
  isRunning: boolean;
  contestId?: string;
  courseId?: string | null;
  courseSlug?: string | null;
  endTime?: string | Date;
  nextProblemSlug?: string | null;
  prevProblemSlug?: string | null;
  domain?: ProblemDomain;
  type?: ProblemType | "CONCEPT";
  totalCourseProblems?: number;
  currentCourseProblemIndex?: number;
  onToggleSidebar?: () => void;
  problemId?: string;
  isSubmissionPassed?: boolean;
}

const WorkspaceHeader = memo(({
  onSubmit,
  onRun,
  isSubmitting,
  isRunning,
  contestId,
  courseId,
  courseSlug,
  endTime,
  nextProblemSlug,
  prevProblemSlug,
  domain,
  type,
  totalCourseProblems = 0,
  currentCourseProblemIndex = -1,
  onToggleSidebar,
  problemId,
  isSubmissionPassed
}: WorkspaceHeaderProps) => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isRandomizing, startRandomizing] = useTransition();
  const profileRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [institution, setInstitution] = useState<{name: string, logo: string | null} | null>(null);

  useEffect(() => {
      setMounted(true);
  }, []);

  useEffect(() => {
    if ((session?.user as any)?.institutionId) {
      try {
          const stored = localStorage.getItem('algofox_user_institution');
          if (stored) setInstitution(JSON.parse(stored));
      } catch (e) {}

      getUserInstitutionDetails().then((data) => {
        if (data) {
          setInstitution(data as any);
          try {
              localStorage.setItem('algofox_user_institution', JSON.stringify(data));
          } catch (e) {}
        }
      });
    } else if (session?.user && !(session?.user as any)?.institutionId) {
        setInstitution(null);
        try {
            localStorage.removeItem('algofox_user_institution');
        } catch (e) {}
    }
  }, [(session?.user as any)?.institutionId, session?.user]);

  const isInstitutionLoading = isPending || (!mounted && !!(session?.user as any)?.institutionId) || (!!(session?.user as any)?.institutionId && !institution);

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

  const getProblemListUrl = () => {
    if (courseSlug) return `/courses/${courseSlug}`;
    if (courseId) return `/courses/${courseId}`; // Fallback
    if (domain === "SQL") return "/problems/sql";
    if (domain === "APTITUDE") return "/problems/aptitude";
    return "/problems/dsa";
  };

  const getNextUrl = () => {
    if (!nextProblemSlug) return "#";
    return `/problems/${nextProblemSlug}${courseId ? `?courseId=${courseId}` : ''}`;
  };

  const getPrevUrl = () => {
    if (!prevProblemSlug) return "#";
    return `/problems/${prevProblemSlug}${courseId ? `?courseId=${courseId}` : ''}`;
  };

  const CourseProgress = () => {
    if (totalCourseProblems <= 0) return null;

    return (
      <div className="flex items-center gap-3 w-[260px] lg:w-[480px] px-2 group/nav shrink-0">
        <button
          onClick={() => prevProblemSlug && router.push(getPrevUrl())}
          disabled={!prevProblemSlug}
          className="flex items-center gap-1.5 p-1 text-gray-400 hover:text-orange-500 transition-colors disabled:opacity-10 shrink-0 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">prev</span>
        </button>

        <div className="flex-1 flex gap-1 h-2 items-center">
          {Array.from({ length: totalCourseProblems }).map((_, i) => (
            <div
              key={i}
              className={`h-full flex-1 rounded-sm transition-all duration-300 ${
                i === currentCourseProblemIndex
                  ? 'bg-orange-500'
                  : i < currentCourseProblemIndex
                    ? 'bg-orange-500/40'
                    : 'bg-gray-300 dark:bg-[#333]'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => nextProblemSlug && router.push(getNextUrl())}
          disabled={!nextProblemSlug}
          className="flex items-center gap-1.5 p-1 text-gray-400 hover:text-orange-500 transition-colors disabled:opacity-10 shrink-0 group"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">next</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-14 bg-[#fafafa] dark:bg-[#1D1E23] border-b border-dashed border-gray-300/80 dark:border-white/10 flex items-center justify-between px-2 sm:px-4 z-50 relative"
    >
      {/* LEFT: NAVIGATION */}
      <div className={`flex items-center gap-1.5 sm:gap-3 ${contestId ? 'w-1/3' : ''} min-w-0 shrink-0`}>
        {onToggleSidebar && (
          <CustomTooltip content="Toggle Sidebar" side="bottom">
            <motion.button
              id="problem-list-toggle"
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100/50 dark:hover:bg-white/3 rounded-xl text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 transition-all duration-300 border border-transparent shadow-none group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <List className="w-4.5 h-4.5 transition-transform duration-300 group-hover:rotate-1" />
            </motion.button>
          </CustomTooltip>
        )}

        <Link href={contestId ? `/contest/${contestId}` : "/"} className="flex items-center gap-2 group">
          {isInstitutionLoading ? (
            <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ) : institution?.logo ? (
            <motion.img
              src={institution.logo}
              alt={institution.name}
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-8 h-8 object-contain rounded-lg shadow-sm"
            />
          ) : institution ? (
            <motion.span
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-8 h-8 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-orange-500/20 text-sm font-bold"
            >
              {institution.name.charAt(0).toUpperCase()}
            </motion.span>
          ) : (
            <motion.img
              src="/icons/fox.png"
              alt="Algo-fox"
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-8 h-8 object-contain rounded-lg"
            />
          )}
          {contestId && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 leading-none">Contest</span>
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
            {/* NAVIGATION_BUTTON_ALREADY_MOVED_UP */}
            <Link
              href={getProblemListUrl()}
              className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-[#24262C]"
            >
              {courseId ? "Course Home" : "Problem List"}
            </Link>
            {courseId && (
              <>
                <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1" />
                <ThemeToggleButton />
              </>
            )}
            {!courseId && (
              <>
                <span className="text-gray-200 dark:text-gray-700 select-none">|</span>
                <div className="flex items-center gap-0.5 bg-gray-50 dark:bg-[#24262C] rounded-lg p-0.5 border border-gray-100 dark:border-[#1e1e1e]">
                  <CustomTooltip content="Previous Problem" shortcut="Alt+ArrowLeft" side="bottom">
                    <motion.button
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${prevProblemSlug ? 'hover:bg-[#fafafa] dark:hover:bg-[#24262C] text-gray-500 hover:text-orange-500 dark:hover:text-orange-500 hover:shadow-sm' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
                      disabled={!prevProblemSlug}
                      onClick={() => prevProblemSlug && router.push(getPrevUrl())}
                      whileHover={prevProblemSlug ? { scale: 1.1 } : {}}
                      whileTap={prevProblemSlug ? { scale: 0.9 } : {}}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </motion.button>
                  </CustomTooltip>
                  <CustomTooltip content="Next Problem" shortcut="Alt+ArrowRight" side="bottom">
                    <motion.button
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${nextProblemSlug ? 'hover:bg-[#fafafa] dark:hover:bg-[#24262C] text-gray-500 hover:text-orange-500 dark:hover:text-orange-500 hover:shadow-sm' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'}`}
                      disabled={!nextProblemSlug}
                      onClick={() => nextProblemSlug && router.push(getNextUrl())}
                      whileHover={nextProblemSlug ? { scale: 1.1 } : {}}
                      whileTap={nextProblemSlug ? { scale: 0.9 } : {}}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </CustomTooltip>
                </div>
              </>
            )}

            {!courseId && (
              <CustomTooltip content="Random Problem" side="bottom">
                <motion.button
                  onClick={() => {
                    if (domain && type && type !== "CONCEPT") {
                      startRandomizing(async () => {
                        const slug = await getRandomProblem(domain, type, courseId || undefined);
                        if (slug) router.push(`/problems/${slug}${courseId ? `?courseId=${courseId}` : ''}`);
                        else toast.error("No other problems found");
                      });
                    }
                  }}
                  disabled={isRandomizing}
                  className={`p-1.5 hover:bg-gray-100 dark:hover:bg-[#1D1E23] rounded-lg text-gray-500 transition-colors cursor-pointer ${isRandomizing ? 'opacity-50' : ''}`}
                  whileHover={{ scale: 1.08}}
                  whileTap={{ scale: 0.9 }}
                  // transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Shuffle className={`w-4 h-4 ${isRandomizing ? '' : ''}`} />
                </motion.button>
              </CustomTooltip>
            )}
            
            {/* BOOKMARK BUTTON */}
            {!contestId && problemId && (
              <BookmarkButton problemId={problemId} />
            )}
          </motion.div>
        )}
      </div>

      {/* CENTER: PROGRESS OR ACTIONS */}
      <div className="flex-1 flex justify-center items-center px-4 gap-4">
        {domain !== "APTITUDE" && type?.toString().toUpperCase() !== "CONCEPT" && domain?.toString().toUpperCase() !== "CONCEPT" && (
          <div className="flex items-center gap-2">
            <CustomTooltip
              content={session?.user?.role === "USER" ? "Subscription Required to Run Code" : "Run your code"}
              shortcut={session?.user?.role === "USER" ? undefined : "Ctrl+Enter"}
              side="bottom"
            >
              <motion.button
                id="run-button"
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2
                  bg-gray-100 dark:bg-[#24262C] hover:bg-gray-200 dark:hover:bg-[#2a2d35]
                  text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-bold rounded-lg
                  transition-colors duration-200 disabled:opacity-50 cursor-pointer
                  border border-gray-200/80 dark:border-[#262626]
                  ${contestId ? 'shadow-sm' : ''}
                  ${(isPending || session?.user?.role === "USER") ? 'cursor-not-allowed border-orange-500/20 shadow-orange-500/5' : ''}
                `}
                onClick={(isPending || session?.user?.role === "USER") ? () => !isPending && toast.error("Please subscribe to use this feature") : onRun}
                disabled={isPending || isRunning || isSubmitting}
                whileHover={(isPending || session?.user?.role === "USER") ? {} : { y: -1 }}
                whileTap={(isPending || session?.user?.role === "USER") ? {} : { scale: 0.97 }}
              >
                  {isRunning ? (
                  <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin" />
                ) : session?.user?.role === "USER" ? (
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500" />
                ) : (
                  <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
                )}
                <span className="hidden xs:inline sm:inline">{isRunning ? 'Running...' : 'Run'}</span>
              </motion.button>
            </CustomTooltip>

            <CustomTooltip
              content={session?.user?.role === "USER" ? "Subscription Required to Submit" : "Save & Submit"}
              shortcut={session?.user?.role === "USER" ? undefined : "Ctrl+Shift+Enter"}
              side="bottom"
            >
              <motion.button
                id="submit-button"
                onClick={session?.user?.role === "USER" ? () => toast.error("Please subscribe to use this feature") : onSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-7 py-1.5 sm:py-2 text-xs sm:text-sm font-black uppercase tracking-wider rounded-lg shadow-lg transition-colors cursor-pointer ${
                  session?.user?.role === "USER"
                    ? 'bg-gray-100 dark:bg-[#24262C] text-gray-400 dark:text-gray-600 border border-gray-200/80 dark:border-[#262626] shadow-none cursor-not-allowed'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/20'
                }`}
                whileHover={session?.user?.role === "USER" ? {} : { y: -1 }}
                whileTap={session?.user?.role === "USER" ? {} : { scale: 0.96 }}
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                ) : session?.user?.role === "USER" ? (
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                ) : (
                  <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                )}
                <span className="hidden xs:inline sm:inline">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
              </motion.button>
            </CustomTooltip>
          </div>
        )}

        {contestId && endTime && (
            <ContestTimer contestId={contestId} endTime={endTime} />
        )}
      </div>

      {/* RIGHT: USER OR COURSE ACTIONS */}
      <div className={`flex items-center gap-3 ${contestId ? 'w-1/3 justify-end' : ''}`}>
        {courseId ? (
          <div className="flex items-center gap-0">
            <CourseProgress />
          </div>
        ) : (
          !contestId && (
            <>
              <TimeTracker isSubmissionPassed={isSubmissionPassed} />
              <div className="h-4 w-px bg-gray-300 dark:bg-[#333] mx-1 hidden sm:block" />
              <ThemeToggleButton />
              {session ? (
                <div className="flex items-center gap-1.5 sm:gap-3">
                    <UserPoints className="hidden lg:flex" />
                    <div className="h-4 w-px bg-gray-300 dark:bg-[#333] mx-1 hidden lg:block" />
                  <div className="relative" ref={profileRef}>
                    <motion.button
                      onClick={() => setProfileOpen(!isProfileOpen)}
                      className="flex items-center justify-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1D1E23] transition-all border border-transparent hover:border-gray-200 dark:hover:border-[#262626] cursor-pointer"
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white dark:ring-[#1D1E23] bg-gray-100 dark:bg-[#1D1E23] text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-xs"
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
                          className="absolute right-0 top-full mt-2 w-48 bg-[#fafafa] dark:bg-[#24262C] border border-gray-100 dark:border-[#262626] rounded-xl shadow-xl shadow-black/5 dark:shadow-black/20 p-1 z-50 origin-top-right"
                        >
                          {(session.user as any).role === "ADMIN" && (
                            <Link
                              href="/admin"
                              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1D1E23] rounded-lg transition-colors"
                              onClick={() => setProfileOpen(false)}
                            >
                              Admin Panel
                            </Link>
                          )}
                          <Link
                            href="/dashboard"
                            className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1D1E23] rounded-lg transition-colors"
                            onClick={() => setProfileOpen(false)}
                          >
                            Dashboard
                          </Link>
                          {(session.user as any).role === "PLACEMENT_DIRECTOR" && (
                            <Link
                              href="/placementdashboard"
                              className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1D1E23] rounded-lg transition-colors"
                              onClick={() => setProfileOpen(false)}
                            >
                              Placement Dashboard
                            </Link>
                          )}
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
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="text-sm font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
              )}
            </>
          )
        )}
        {contestId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 bg-red-50 dark:bg-red-500/10 px-3 py-1.5 rounded-full border border-red-100 dark:border-red-500/30"
          >
            <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-500" />
            <span className="text-[10px] font-black text-red-700 dark:text-red-400 uppercase tracking-tighter">Proctored Mode</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

export default WorkspaceHeader;
