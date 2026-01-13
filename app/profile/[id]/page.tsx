import { getUserProfile } from "@/actions/dashboard.action";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { UserProfileCard } from "@/components/dashboard/UserProfileCard";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { LanguagesCard } from "@/components/dashboard/LanguagesCard";
import { ProblemOverviewCard } from "@/components/dashboard/ProblemOverviewCard";
import { RecentSubmissionsCard } from "@/components/dashboard/RecentSubmissionsCard";
import { redirect, notFound } from "next/navigation";
import { Suspense } from "react";
import DashboardLoading from "@/app/(main)/dashboard/loading";
import { BackButton } from "@/components/ui/BackButton";

interface ProfilePageProps {
    params: Promise<{ id: string }>;
}

async function ProfileContent({ params }: ProfilePageProps) {
    const { id } = await params;
    const stats = await getUserProfile(id);

    if (!stats) {
        notFound();
    }

    const user = stats;
    const submissions = user.submissions;

    return (
        <div className="min-h-screen bg-gray-50/50 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Header with Back Button */}
                <div className="mb-6">
                    <BackButton>Back to Contest</BackButton>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <aside className="lg:col-span-3 space-y-6">
                        {/* PROFILE SECTION (Read Only) */}
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
                                readonly={true}
                            />
                        </section>

                        {/* ACHIEVEMENTS SECTION */}
                        <section>
                             <AchievementsCard badges={{
                                gold: user.goldBadges,
                                silver: user.silverBadges,
                                bronze: user.bronzeBadges
                            }} />
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
                            />
                        </section>

                        {/* ACTIVITY HEATMAP */}
                        <section>
                            <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow duration-200 overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
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

export default function ProfilePage({ params }: ProfilePageProps) {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <ProfileContent params={params} />
        </Suspense>
    );
}
