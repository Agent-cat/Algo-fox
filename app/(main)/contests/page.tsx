import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVisibleContests } from "@/actions/contest";
import { getUpcomingContests } from "@/actions/external-contests.action";
import { ContestPageClient } from "@/components/contest/ContestPageClient";
import { Suspense } from "react";
import { Trophy } from "lucide-react";

async function ContestsDataWrapper() {
  "use cache: private";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  // Fetch both internal and external contests in parallel
  const [internalRes, externalRes] = await Promise.all([
    getVisibleContests(),
    getUpcomingContests()
  ]);

  const internalContests = internalRes.success ? internalRes.contests || [] : [];
  const externalContests = externalRes.success ? externalRes.contests || [] : [];

  return <ContestPageClient internalContests={internalContests} externalContests={externalContests} />;
}

export default async function StudentContestsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-orange-600 rounded-full border-t-transparent animate-spin" />
        </div>
      }
    >
      <ContestsDataWrapper />
    </Suspense>
  );
}
