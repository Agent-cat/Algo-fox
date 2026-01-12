import { getDashboardStats } from "@/actions/dashboard.action";
import { getStudentClassrooms } from "@/actions/classroom";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import { UserProfileCard } from "@/components/dashboard/UserProfileCard";
import { AchievementsCard } from "@/components/dashboard/AchievementsCard";
import { LanguagesCard } from "@/components/dashboard/LanguagesCard";
import { ProblemOverviewCard } from "@/components/dashboard/ProblemOverviewCard";
import { RecentSubmissionsCard } from "@/components/dashboard/RecentSubmissionsCard";
import { ClassroomDropdown } from "@/components/classroom/ClassroomDropdown";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardLoading from "./loading";
import Link from "next/link";
import { School, ArrowRight } from "lucide-react";

async function DashboardContent() {
    const [stats, classroomsRes] = await Promise.all([
        getDashboardStats(),
        getStudentClassrooms()
    ]);

    if (!stats) {
        redirect("/signin");
    }

    const user = stats;
    const submissions = user.submissions;
    const classrooms = classroomsRes.success ? classroomsRes.classrooms : [];
    const canCreateClassroom = ["ADMIN", "INSTITUTION_MANAGER", "TEACHER"].includes(user.role);

    return (
        <div className="min-h-screen bg-white transition-colors">
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
                                hackerrankHandle={user.hackerrankHandle}
                                githubHandle={user.githubHandle}
                            />
                        </section>

                        {/* TEACHER DASHBOARD LINK */}
                        {canCreateClassroom && (
                            <section>
                                <Link
                                    href="/dashboard/teacher/classrooms"
                                    className="flex items-center justify-between p-4 bg-gray-900 rounded-2xl text-white hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/20 rounded-lg">
                                            <School className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold">Teacher Center</span>
                                    </div>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </section>
                        )}

                        {/* CLASSROOMS SECTION */}
                        <section>
                            <ClassroomDropdown classrooms={classrooms as any} />
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

export default async function Dashboard() {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent />
        </Suspense>
    );
}
