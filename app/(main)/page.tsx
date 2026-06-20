import { Metadata } from "next";
import { getDashboardStats } from "@/actions/dashboard.action";
import { getVisibleContests } from "@/actions/contest";
import { getUpcomingContests } from "@/actions/external-contests.action";
import { StreakCalendarWidget } from "@/components/home/StreakCalendarWidget";
import { UpcomingContestsWidget } from "@/components/home/UpcomingContestsWidget";

export const metadata: Metadata = {
  title: "Elite Platform for DSA & SQL Mastery",
  description: "The ultimate platform for competitive programming and interview preparation. Practice DSA, SQL, and join high-stakes contests to boost your career.",
};

export default async function Home() {
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
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1D1E23] text-black dark:text-white font-sans pt-[72px] relative overflow-hidden">
      <div className="w-full px-6 lg:px-12 pt-0 pb-12 relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Main Content Area (Empty for now as requested) */}
        <div className="flex-1">
            <div className="flex flex-col items-center justify-center h-[60vh] border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl">
                <p className="text-gray-400 font-medium">Main widgets go here</p>
            </div>
        </div>

        {/* Right Sidebar (Widgets) */}
        <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-6">
           <StreakCalendarWidget 
              activityDates={activityDates} 
              currentStreak={currentStreak} 
              bestStreak={bestStreak} 
           />
           <UpcomingContestsWidget contests={allUpcomingContests} />
        </div>

      </div>
    </div>
  );
}
