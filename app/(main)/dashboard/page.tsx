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

async function DashboardContent() {
  const stats = await getDashboardStats();

  if (!stats) {
    redirect("/signin");
  }

  const user = stats;
  const submissions = user.submissions;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            {/* PROFILE SECTION */}
            <section>
              <UserProfileCard
                name={user.name}
                email={user.email}
                image={user.image}
                bio={user.bio}
                leetCodeHandle={user.leetCodeHandle}
                codeChefHandle={user.codeChefHandle}
                codeforcesHandle={user.codeforcesHandle}
                githubHandle={user.githubHandle}
                role={user.role}
                institutionName={user.institution?.name}
              />
            </section>

            {/* PROFILES STATUS SECTION */}
            <section>
              <ProfilesStatusCard user={user} />
            </section>

            {/* ACHIEVEMENTS SECTION */}
            <section>
              <AchievementsCard
                badges={{
                  gold: user.goldBadges,
                  silver: user.silverBadges,
                  bronze: user.bronzeBadges,
                }}
              />
            </section>

            {/* LANGUAGES SECTION */}
            <section>
              <LanguagesCard languageCounts={user.languageCounts} />
            </section>
          </aside>

          <main className="lg:col-span-9 space-y-8">
            {/* PROBLEM OVERVIEW */}
            <section>
              <ProblemOverviewCard
                solvedByDifficulty={user.solvedByDifficulty}
                totalProblems={user.totalProblems}
                problemsSolved={user.problemsSolved}
                leetCodeHandle={user.leetCodeHandle}
                codeChefHandle={user.codeChefHandle}
                codeforcesHandle={user.codeforcesHandle}
              />
            </section>

            {/* ACTIVITY HEATMAP */}
            <section>
              <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#262626] hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Submission Activity
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {submissions.length} submissions in{" "}
                    {new Date().getFullYear()}
                  </p>
                </div>
                <div className="p-6">
                  <ActivityHeatmap submissions={submissions} />
                </div>
              </div>
            </section>

            {/* RECENT SUBMISSIONS */}
            <section>
              <RecentSubmissionsCard submissions={submissions} />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
