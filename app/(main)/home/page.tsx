import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getDashboardStats } from "@/actions/dashboard.action";
import { getVisibleContests } from "@/actions/contest";
import { getUpcomingContests } from "@/actions/external-contests.action";
import { StreakCalendarWidget } from "@/components/home/StreakCalendarWidget";
import { UpcomingContestsWidget } from "@/components/home/UpcomingContestsWidget";
import { getSession } from "@/lib/auth-utils";
import Link from "next/link";
import Image from "next/image";

import { getTopicSheets } from "@/actions/topic.action";
import { TopicsCarousel } from "@/components/home/TopicsCarousel";
import { CourseService } from "@/core/services/course.service";
import { ContinueLearningWidget } from "@/components/home/ContinueLearningWidget";
import { getDailyChallenge, getWeeklyDailyChallengeHistory, type WeekDayEntry } from "@/actions/daily-challenge.action";
import { DailyChallengeWidget } from "@/components/home/DailyChallengeWidget";

export const metadata: Metadata = {
  title: "Dashboard | Algo-fox Master DSA & SQL Mastery",
  description: "The ultimate platform for competitive programming and interview preparation. Practice DSA, SQL, and join high-stakes contests to boost your career.",
};

interface InternalContest {
  id: string;
  title: string;
  startTime: string | Date;
  endTime: string | Date;
  slug: string;
}

interface ExternalContest {
  id: string;
  name: string;
  url: string;
  start_time: string | Date;
  end_time: string | Date;
  site: string;
}

export default async function Home() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/");
  }
  const isLoggedIn = true;

  const stats = await getDashboardStats();

  const activityDates = stats?.activityDates || [];
  const currentStreak = stats?.currentStreak || 0;
  const bestStreak = stats?.bestStreak || 0;

  // Fetch contests, topic sheets, enrollments, and daily challenge in parallel
  const [internalRes, externalRes, topicSheetsRes, enrollments, dailyChallengeRes, weekHistoryRes] = await Promise.all([
    getVisibleContests({ status: "active" }),
    getUpcomingContests(),
    getTopicSheets(),
    isLoggedIn ? CourseService.getUserEnrolledCourses(session.user.id) : Promise.resolve([]),
    getDailyChallenge(),
    getWeeklyDailyChallengeHistory(),
  ]);

  const todayChallenge = dailyChallengeRes?.challenge ?? null;
  const weekHistory: WeekDayEntry[] = weekHistoryRes.week ?? [];

  const internalContests = (internalRes.success && "contests" in internalRes) ? internalRes.contests || [] : [];
  const externalContests = (externalRes.success && "contests" in externalRes) ? externalRes.contests || [] : [];
  const categories = topicSheetsRes?.categories || [];

  const now = new Date();

  // Format and merge internal and external contests
  const formattedInternal = (internalContests as InternalContest[])
    .filter((c: InternalContest) => new Date(c.startTime) > now)
    .map((c: InternalContest) => ({
      id: c.id,
      name: c.title,
      url: `/contest/${c.slug}`,
      startTime: new Date(c.startTime),
      endTime: new Date(c.endTime),
      platform: "Algo-fox"
    }));

  const formattedExternal = (externalContests as ExternalContest[])
    .filter((c: ExternalContest) => new Date(c.start_time) > now)
    .map((c: ExternalContest) => ({
      id: c.id,
      name: c.name,
      url: c.url,
      startTime: new Date(c.start_time),
      endTime: new Date(c.end_time),
      platform: c.site
    }));

  const allUpcomingContests = [...formattedInternal, ...formattedExternal]
    .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
    .slice(0, 8);

  return (
    <div className="min-h-screen lg:min-h-0 lg:h-[var(--content-height)] bg-[#fafafa] dark:bg-[#1D1E23] text-black dark:text-white font-sans relative overflow-hidden">
      <div className="w-full h-full pl-6 lg:pl-12 pr-3 lg:pr-6 py-6 relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-14 overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 min-h-0 h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
            
            {/* Clean Welcome Header */}
            <div className="flex items-center gap-4 py-4">
                {isLoggedIn && (
                    session?.user?.image ? (
                        <Image 
                            src={session.user.image} 
                            alt={session.user.name || "User Avatar"} 
                            width={48}
                            height={48}
                            priority
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-white/10"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-lg border border-gray-200 dark:border-white/10">
                            {(session?.user?.name || "D").charAt(0).toUpperCase()}
                        </div>
                    )
                )}
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isLoggedIn ? `Welcome back, ${session?.user?.name || "Developer"}!` : "Welcome to Algo-fox!"}
                    </h1>
                    {isLoggedIn && (stats?.email || stats?.collegeId) && (
                        <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                            {stats?.email && <span>{stats.email}</span>}
                            {stats?.email && stats?.collegeId && <span>•</span>}
                            {stats?.collegeId && <span>Roll No: {stats.collegeId}</span>}
                        </div>
                    )}
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-white/10" />



            {/* Topics Carousel */}
            <TopicsCarousel categories={categories} />

            <div className="border-t border-gray-200 dark:border-white/10" />

            {/* Continue Learning Widget */}
            <ContinueLearningWidget enrollments={enrollments} />
        </div>

        {/* Right Sidebar (Widgets) */}
        <div className="w-full lg:w-[350px] shrink-0 min-h-0 h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
           <div className="relative group">
              <div className={!isLoggedIn ? "filter blur-[6px] opacity-70 pointer-events-none select-none" : ""}>
                 <StreakCalendarWidget
                    activityDates={activityDates} 
                    currentStreak={currentStreak} 
                    bestStreak={bestStreak} 
                 />
              </div>
              {!isLoggedIn && (
                 <div className="absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-[#1D1E23]/40 rounded-3xl z-10 p-6">
                    <div className="text-center w-full bg-white dark:bg-[#2A2B32] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
                        <div className="w-12 h-12 text-orange-500 flex items-center justify-center mx-auto mb-2 relative z-10">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2 relative z-10">Track Your Progress</h3>
                        <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 mb-5 relative z-10">Sign in to save your daily streak and activity history.</p>
                        <Link href="/signin" className="inline-flex items-center justify-center px-5 py-3 bg-transparent border border-gray-900 dark:border-white text-gray-900 dark:text-white text-sm font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm w-full relative z-10 gap-2">
                           Sign In to Unlock
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                           </svg>
                        </Link>
                    </div>
                 </div>
              )}
           </div>
           {todayChallenge && (
             <DailyChallengeWidget problem={todayChallenge.problem as any} weekHistory={weekHistory} />
           )}
           <UpcomingContestsWidget contests={allUpcomingContests} />
        </div>

      </div>
    </div>
  );
}
