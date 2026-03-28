import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getVisibleContests } from "@/actions/contest";
import { getUpcomingContests } from "@/actions/external-contests.action";
import { ContestPageClient } from "@/components/contest/ContestPageClient";
import { Suspense } from "react";
import { Trophy } from "lucide-react";

async function ContestsDataWrapper({ searchParams }: { searchParams: Promise<{ page?: string; type?: string }> }) {
  const { page, type } = await searchParams;
  let pageNumber = parseInt(page || "1", 10);
  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
  }
  const status = (type === "past" ? "past" : "active") as "active" | "past";

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/signin");
  }

  // Fetch both internal and external contests in parallel
  const [internalRes, externalRes] = await Promise.all([
    getVisibleContests({ page: pageNumber, status }),
    getUpcomingContests()
  ]);

  const internalContests = (internalRes.success && "contests" in internalRes) ? internalRes.contests || [] : [];
  const externalContests = (externalRes.success && "contests" in externalRes) ? externalRes.contests || [] : [];
  const pagination = (internalRes.success && "page" in internalRes) ? {
    page: internalRes.page,
    totalPages: internalRes.totalPages,
    total: internalRes.total
  } : undefined;

  return (
    <ContestPageClient
      internalContests={internalContests}
      externalContests={externalContests}
      pagination={pagination}
      initialTab={status}
    />
  );
}

export default function StudentContestsPage({ searchParams }: { searchParams: Promise<{ page?: string; type?: string }> }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contests...</p>
          </div>
        </div>
      }
    >
      <ContestsDataWrapper searchParams={searchParams} />
    </Suspense>
  );
}
