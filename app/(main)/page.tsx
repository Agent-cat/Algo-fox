import { Metadata } from "next";
import { getDashboardStats } from "@/actions/dashboard.action";
import { getVisibleContests } from "@/actions/contest";
import { getUpcomingContests } from "@/actions/external-contests.action";
import { StreakCalendarWidget } from "@/components/home/StreakCalendarWidget";
import { UpcomingContestsWidget } from "@/components/home/UpcomingContestsWidget";
import { getSession } from "@/lib/auth-utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Elite Platform for DSA & SQL Mastery",
  description: "The ultimate platform for competitive programming and interview preparation. Practice DSA, SQL, and join high-stakes contests to boost your career.",
};

export default async function Home() {
  const session = await getSession();
  const isLoggedIn = !!session?.user;

  const stats = await getDashboardStats();

  const activityDates = stats?.activityDates || [];
  const currentStreak = stats?.currentStreak || 0;
  const bestStreak = stats?.bestStreak || 0;

  // Fetch contests in parallel
  const [internalRes, externalRes] = await Promise.all([
    getVisibleContests({ status: "active" }),
    getUpcomingContests()
  ]);

  const internalContests = (internalRes.success && "contests" in internalRes) ? internalRes.contests || [] : [];
  const externalContests = (externalRes.success && "contests" in externalRes) ? externalRes.contests || [] : [];

  const now = new Date();

  // Format and merge internal and external contests
  const formattedInternal = internalContests
    .filter((c: any) => new Date(c.startTime) > now)
    .map((c: any) => ({
      id: c.id,
      name: c.title,
      url: `/contest/${c.slug}`,
      startTime: new Date(c.startTime),
      endTime: new Date(c.endTime),
      platform: "Algo-fox"
    }));

  const formattedExternal = externalContests
    .filter((c: any) => new Date(c.start_time) > now)
    .map((c: any) => ({
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
      <div className="w-full h-full px-6 lg:px-12 py-6 relative z-10 flex flex-col lg:flex-row gap-8 overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 min-h-0 h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
            
            {/* Clean Welcome Header */}
            <div className="flex items-center gap-4 py-4">
                {isLoggedIn && (
                    session?.user?.image ? (
                        <img 
                            src={session.user.image} 
                            alt={session.user.name || "User Avatar"} 
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-200 dark:ring-white/10"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 flex items-center justify-center font-bold text-lg border border-gray-200 dark:border-white/10">
                            {(session?.user?.name || "D").charAt(0).toUpperCase()}
                        </div>
                    )
                )}
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                        {isLoggedIn ? `Welcome back, ${session?.user?.name || "Developer"}!` : "Welcome to Algo-fox!"}
                    </h1>
                </div>
            </div>

            {/* Main Widget Area */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center bg-white/50 dark:bg-[#24262C]/50">
                <p className="text-gray-400 font-medium">Main widgets go here</p>
            </div>
        </div>

        {/* Right Sidebar (Widgets) */}
        <div className="w-full lg:w-[400px] shrink-0 min-h-0 h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
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
           <UpcomingContestsWidget contests={allUpcomingContests} />
        </div>

      </div>
    </div>
  );
}
