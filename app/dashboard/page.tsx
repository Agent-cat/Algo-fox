import { getDashboardStats } from "@/actions/dashboard.action";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { UserProfileCard } from "@/components/dashboard/UserProfileCard";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { LanguagesCard } from "@/components/dashboard/LanguagesCard";
import { ProblemOverviewCard } from "@/components/dashboard/ProblemOverviewCard";
import { RecentSubmissionsCard } from "@/components/dashboard/RecentSubmissionsCard";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const stats = await getDashboardStats();

    if (!stats) {
        redirect("/signin");
    }

    const user = stats;
    const submissions = user.submissions;

    return (
        <div className="min-h-screen bg-white transition-colors">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

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
                                hackerrankHandle={user.hackerrankHandle}
                                githubHandle={user.githubHandle}
                            />
                        </section>

                        {/* ACHIEVEMENTS SECTION */}
                        <section>
                            <AchievementsCard />
                        </section>

                        {/* LANGUAGES SECTION */}
                        <section>
                            <LanguagesCard languageCounts={user.languageCounts} />
                        </section>
                    </aside>


                    <main className="lg:col-span-9 space-y-6">
                        {/* PROBLEM OVERVIEW */}
                        <section>
                            <ProblemOverviewCard
                                solvedByDifficulty={user.solvedByDifficulty}
                                totalProblems={user.totalProblems}
                                problemsSolved={user.problemsSolved}
                            />
                        </section>

                        {/* ACTIVITY HEATMAP */}
                        <section>
                            <div className="bg-white rounded-2xl border border-dashed border-gray-300 hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                <div className="px-6 py-5 border-b border-dashed border-gray-200 bg-gray-50">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Submission Activity
                                    </h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {submissions.length} submissions in {new Date().getFullYear()}
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
