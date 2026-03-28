import { getDashboardStats } from "@/actions/dashboard.action";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { UserProfileCard } from "@/components/dashboard/UserProfileCard";
import { ProfilesStatusCard } from "@/components/dashboard/ProfilesStatusCard";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { LanguagesCard } from "@/components/dashboard/LanguagesCard";
import { ProblemOverviewCard } from "@/components/dashboard/ProblemOverviewCard";
import { RecentSubmissionsCard } from "@/components/dashboard/RecentSubmissionsCard";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardLoading from "./loading";

function ProfileSection({ stats }: { stats: any }) {
  return (
    <aside className="lg:col-span-3 space-y-6">
      <UserProfileCard
        name={stats.name}
        email={stats.email}
        image={stats.image}
        bio={stats.bio}
        leetCodeHandle={stats.leetCodeHandle}
        codeChefHandle={stats.codeChefHandle}
        codeforcesHandle={stats.codeforcesHandle}
        githubHandle={stats.githubHandle}
        role={stats.role}
        institutionName={stats.institution?.name}
      />
      <ProfilesStatusCard user={stats} />
      <AchievementsCard
        badges={{
          gold: stats.goldBadges,
          silver: stats.silverBadges,
          bronze: stats.bronzeBadges,
        }}
      />
      <LanguagesCard languageCounts={stats.languageCounts} />
    </aside>
  );
}

function MainStatsSection({ stats }: { stats: any }) {
  return (
    <div className="space-y-8">
      <ProblemOverviewCard
        solvedByDifficulty={stats.solvedByDifficulty}
        totalProblems={stats.totalProblems}
        problemsSolved={stats.problemsSolved}
        contestStats={stats.contestStats}
        leetCodeHandle={stats.leetCodeHandle}
        codeChefHandle={stats.codeChefHandle}
        codeforcesHandle={stats.codeforcesHandle}
      />
    </div>
  );
}

function ActivitySection({ stats }: { stats: any }) {
  const submissions = stats.submissions;
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] hover:shadow-md transition-shadow duration-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Submission Activity
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {submissions.length} submissions recently
          </p>
        </div>
        <div className="p-6">
          <ActivityHeatmap submissions={submissions} />
        </div>
      </div>
      <RecentSubmissionsCard submissions={submissions} />
    </div>
  );
}

export default async function Dashboard() {
  const stats = await getDashboardStats();

  if (!stats) {
    redirect("/signin");
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <ProfileSection stats={stats} />
          <main className="lg:col-span-9 space-y-8">
            <MainStatsSection stats={stats} />
            <ActivitySection stats={stats} />
          </main>
        </div>
      </div>
    </div>
  );
}
