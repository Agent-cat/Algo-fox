import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVisibleContests } from "@/actions/contest";
import { ContestsPageContent } from "@/components/contest/ContestsPageContent";
import { Suspense } from "react";
import { Trophy } from "lucide-react";

async function StudentContestsContent() {
  "use cache: private";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  const contestsRes = await getVisibleContests();
  const contests = contestsRes.success ? contestsRes.contests || [] : [];

  return <ContestsPageContent contests={contests} />;
}

export default async function StudentContestsPage() {
  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-[#0a0a0a] pb-20 pt-24">
      {/* Header */}
      <div className="relative mb-12 bg-white dark:bg-[#0a0a0a] border-b border-gray-100 dark:border-[#262626] pb-32  overflow-hidden">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-orange-500 opacity-20 dark:opacity-30 blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative group cursor-default">
              <div className="absolute -inset-1  rounded-full "></div>
              <div className="relative inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-[#0a0a0a] text-orange-600 dark:text-orange-500 rounded-full text-sm font-bold uppercase tracking-wider border border-orange-100 dark:border-orange-500/20 ">
                <Trophy className="w-4 h-4" />
                Competition Arena
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-[#141414] rounded-3xl border border-gray-100 dark:border-[#262626] shadow-sm">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-orange-100 dark:border-orange-500/20 rounded-full" />
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-400 font-bold tracking-tight">
                Gathering contests...
              </p>
            </div>
          }
        >
          <StudentContestsContent />
        </Suspense>
      </div>
    </div>
  );
}
