import { getProblem, getNextProblem, getPreviousProblem } from "@/actions/problems";
import { getContestDetail } from "@/actions/contest";
import Workspace from "@/components/workspace/Workspace";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Laptop2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ConceptViewer from "@/components/problems/ConceptViewer";
import { Suspense } from "react";

// MIGRATED: Removed export const revalidate = 3600 (incompatible with Cache Components)
// Caching is now handled via "use cache" in the getProblem action with cacheLife

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contestId?: string }>;
}

// GENERATING METADATA FOR THE PROBLEM PAGE (SEO)
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    return {
      title: "Problem Not Found",
    };
  }

  return {
    title: `${problem.title} | Algofox`,
    description: problem.description.slice(0, 160),
  };
}

// Component that handles searchParams AND params access (wrapped in Suspense)
async function ProblemContentWithParams({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contestId?: string }>;
}) {
  "use cache: private";
  const { slug } = await params;
  const { contestId } = await searchParams;

  const problem = await getProblem(slug);

  if (!problem) {
    return notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers()
  });

  let isSolved = false;
  let contestData = null;
  let solvedProblemIds: string[] = [];

  if (session?.user) {
    if (session.user.role === "ADMIN") {
      isSolved = true;
    } else {
      const submission = await prisma.submission.findFirst({
        where: {
          problemId: problem.id,
          userId: session.user.id,
          status: "ACCEPTED",
          mode: "SUBMIT"
        }
      });
      isSolved = !!submission;
    }

    if (contestId) {
      const contestResponse = await getContestDetail(contestId);
      if (contestResponse.success) {
        if ((contestResponse.contest as any).isFinished) {
          return redirect(`/contest/${contestId}`);
        }
        contestData = contestResponse.contest;
        // Fetch all solved problems in this contest for the user
        const contestSolvedSubmissions = await prisma.submission.findMany({
          where: {
            userId: session.user.id,
            status: "ACCEPTED",
            mode: "SUBMIT",
            problemId: { in: (contestResponse.contest as any).problems.map((p: any) => p.problem.id) }
          },
          select: { problemId: true }
        });
        solvedProblemIds = contestSolvedSubmissions.map(s => s.problemId);
      }
    }
  }

  if (problem.difficulty === "CONCEPT") {
    return (
      <ConceptViewer problem={problem} isSolved={isSolved} />
    );
  }

  return (
    <>
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Laptop2 className="w-8 h-8 text-orange-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Desktop Required</h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          For the best coding experience, please open this problem on a desktop or laptop device.
        </p>
      </div>
      <div className="hidden md:block">
        <Workspace
          problem={problem}
          isSolved={isSolved}
          contestId={contestId}
          contest={contestData}
          solvedProblemIds={solvedProblemIds}
          nextProblemSlug={await getNextProblem(problem.createdAt, problem.domain, problem.type)}
          prevProblemSlug={await getPreviousProblem(problem.createdAt, problem.domain, problem.type)}
        />
      </div>
    </>
  );
}

export default function ProblemPage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading problem...</p>
        </div>
      </div>
    }>
      <ProblemContentWithParams params={params} searchParams={searchParams} />
    </Suspense>
  );
}



// PRE-GENERATING STATIC PAGES FOR TOP 50 PROBLEMS AT BUILD TIME
// Note: Contest-specific problems (hidden: true) are not included here but will be handled dynamically

export async function generateStaticParams() {
  try {
    const problems = await prisma.problem.findMany({
      where: { hidden: false },
      select: { slug: true },
      orderBy: { createdAt: 'desc' },
      take: 50, // PRE-RENDER TOP 50 PROBLEMS
    });

    // Next.js 16 requires at least one result for Cache Components
    // If no problems exist, return a placeholder that will be handled by the dynamic route
    if (problems.length === 0) {
      return [{ slug: 'placeholder' }];
    }

    return problems.map((p) => ({
      slug: p.slug,
    }));
  } catch (error) {
    // Fallback to ensure we always return at least one result
    console.error("Error generating static params for problems:", error);
    return [{ slug: 'placeholder' }];
  }
}
