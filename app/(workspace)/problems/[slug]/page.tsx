import { getProblem, getNextProblem, getPreviousProblem } from "@/actions/problems";
import { getContestDetail } from "@/actions/contest";

import { notFound, redirect } from "next/navigation";
import WorkspaceClientWrapper from "@/components/workspace/WorkspaceClientWrapper";
import { prisma } from "@/lib/prisma";
import { Laptop2 } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ConceptViewer from "@/components/problems/ConceptViewer";
import AptitudeWorkspaceClientWrapper from "@/components/workspace/AptitudeWorkspaceClientWrapper";
import { Suspense } from "react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";

// MIGRATED: Removed export const revalidate = 3600 (incompatible with Cache Components)
// Caching is now handled via "use cache" in the getProblem action with cacheLife

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contestId?: string; courseId?: string }>;
}

// GENERATING METADATA FOR THE PROBLEM PAGE (SEO)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const problem = await getProblem(slug, false);

  if (!problem) {
    return {
      title: "Problem Not Found",
    };
  }

  return {
    title: problem.title,
    description: problem.description.slice(0, 160),
  };
}

// Component that handles searchParams AND params access (wrapped in Suspense)
async function ProblemContentWithParams({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ contestId?: string; courseId?: string }>;
}) {
  "use cache: private";
  cacheLife("minutes"); // Fix: Use explicit built-in profile for nested cache compliance
  const { slug } = await params;
  const { contestId, courseId } = await searchParams;

  // Parallelize core data fetching (Optimized: Session first then problem to avoid redundant calls)
  const session = await auth.api.getSession({ headers: await headers() });
  const problem = await getProblem(slug, session?.user?.role === "ADMIN");

  if (!problem) {
    return notFound();
  }

  // Resolve course context
  const rawCourseId = typeof courseId === 'string' ? courseId : Array.isArray(courseId) ? courseId[0] : undefined;

  // Security Check: If course context provided, ensure user is enrolled or is admin
  if (rawCourseId) {
    const isEnrolled = session?.user ? await prisma.userCourseEnrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId: rawCourseId } }
    }) : null;

    if (!isEnrolled && session?.user?.role !== 'ADMIN') {
        const course = await prisma.course.findUnique({
            where: { id: rawCourseId },
            select: { slug: true }
        });
        if (course) {
            return redirect(`/courses/${course.slug}`);
        }
    }
  }

  // Find the course context detail
  const courseContext = (problem as any).categoryProblems?.find((cp: any) => cp.category?.courseId === rawCourseId || cp.category?.courseId);
  const activeCourseId = rawCourseId || courseContext?.category?.courseId || null;
  const courseName = courseContext?.category?.course?.title || null;
  const courseSlug = courseContext?.category?.course?.slug || null;

  let isSolved = false;
  let contestData = null;
  let solvedProblemIds: string[] = [];

  if (session?.user) {
    if (contestId) {
      const contestResponse = await getContestDetail(contestId);
      if (contestResponse.success) {
        if ((contestResponse.contest as any).isFinished) {
          return redirect(`/contest/${contestId}`);
        }
        contestData = contestResponse.contest;

        // Contextual Check: Is this problem solved IN THIS SPECIFIC CONTEST?
      const contestSubmission = await prisma.submission.findFirst({
        where: {
          problemId: problem.id,
          userId: session.user.id,
          status: "ACCEPTED",
          mode: "SUBMIT",
          contestId: contestId
        }
      });
      isSolved = !!contestSubmission;

        // Fetch all solved problems in this contest for the user
        const contestSolvedSubmissions = await prisma.submission.findMany({
          where: {
            userId: session.user.id,
            status: "ACCEPTED",
            mode: "SUBMIT",
            contestId: contestId,
            problemId: { in: (contestResponse.contest as any).problems.map((p: any) => p.problem.id) }
          },
          select: { problemId: true }
        });
        solvedProblemIds = contestSolvedSubmissions.map(s => s.problemId);
      } else {
           // Fallback if contest not found
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
    } else {
        // Global Check (Not in a contest context)
        const submission = await prisma.submission.findFirst({
            where: {
            problemId: problem.id,
            userId: session.user.id,
            status: "ACCEPTED",
            mode: "SUBMIT"
            }
        });
        isSolved = !!submission;

        // Fetch all solved problems for the user (Global)
        const allSolved = await prisma.submission.findMany({
            where: {
                userId: session.user.id,
                status: "ACCEPTED",
                mode: "SUBMIT"
            },
            select: { problemId: true },
            distinct: ['problemId']
        });
        solvedProblemIds = allSolved.map(s => s.problemId);
    }
  }

  let totalCourseProblems = 0;
  let currentCourseProblemIndex = -1;
  if (activeCourseId) {
    const courseProblems = await prisma.categoryProblem.findMany({
      where: {
        category: { courseId: activeCourseId }
      },
      orderBy: [
        { category: { order: 'asc' } },
        { order: 'asc' }
      ],
      select: { problemId: true }
    });
    totalCourseProblems = courseProblems.length;
    currentCourseProblemIndex = courseProblems.findIndex(cp => cp.problemId === problem.id);
  }

  // NAVIGATION CONTEXT: Check if we are in a course
  const NavigationPromises = [
    getNextProblem(problem.createdAt, problem.domain, problem.type, activeCourseId || undefined, problem.id),
    getPreviousProblem(problem.createdAt, problem.domain, problem.type, activeCourseId || undefined, problem.id)
  ];

  const [nextProblemSlug, prevProblemSlug] = await Promise.all(NavigationPromises);

  if (problem.difficulty === "CONCEPT") {
    return (
      <ConceptViewer
        problem={problem}
        isSolved={isSolved}
        courseId={activeCourseId}
        courseSlug={courseSlug}
        totalCourseProblems={totalCourseProblems}
        currentCourseProblemIndex={currentCourseProblemIndex}
        nextProblemSlug={nextProblemSlug}
        prevProblemSlug={prevProblemSlug}
        solvedIds={Array.from(solvedProblemIds)}
        courseName={courseName}
      />
    );
  }

  if (problem.domain === "APTITUDE") {
    return (
      <>
        <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 dark:bg-[#121212] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/15 rounded-2xl flex items-center justify-center mx-auto border border-orange-200 dark:border-orange-500/30">
              <Laptop2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">Desktop Required</h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
                The aptitude practice workspace is optimized for desktop. Please open this on a larger screen for the best experience.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
        <AptitudeWorkspaceClientWrapper
          problem={problem}
          isSolved={isSolved}
          contestId={contestData?.id || contestId}
          contest={contestData}
          solvedProblemIds={solvedProblemIds}
          nextProblemSlug={nextProblemSlug}
          prevProblemSlug={prevProblemSlug}
          courseId={activeCourseId}
          courseName={courseName}
          courseSlug={courseSlug}
          totalCourseProblems={totalCourseProblems}
          currentCourseProblemIndex={currentCourseProblemIndex}
        />
      </div>
    </>
  );
}
  if (problem.domain === "DSA" || problem.domain === "SQL" || problem.domain === "WEBDEV" || problem.domain === "OOPS") {
    return (
      <>
        <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50 dark:bg-[#121212] relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-500/15 rounded-2xl flex items-center justify-center mx-auto border border-orange-200 dark:border-orange-500/30">
              <Laptop2 className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">Desktop Required</h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto text-sm leading-relaxed">
                For the best coding experience, please open this problem on a desktop or laptop device.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <WorkspaceClientWrapper
            problem={problem}
            isSolved={isSolved}
            contestId={contestData?.id || contestId}
            contest={contestData}
            solvedProblemIds={solvedProblemIds}
            nextProblemSlug={nextProblemSlug}
            prevProblemSlug={prevProblemSlug}
            courseId={activeCourseId}
            courseName={courseName}
            courseSlug={courseSlug}
            totalCourseProblems={totalCourseProblems}
            currentCourseProblemIndex={currentCourseProblemIndex}
          />
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Domain not supported</p>
    </div>
  );
}

export default function ProblemPage({ params, searchParams }: PageProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="h-10 w-10 border-[3px] border-gray-200 dark:border-[#262626] border-t-orange-500 rounded-full animate-spin mx-auto" />
            <div className="absolute inset-0 h-10 w-10 border-[3px] border-transparent border-b-orange-300 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading problem...</p>
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
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return problems.map((p) => ({
      slug: p.slug,
    }));
  } catch (error) {
     console.error("Error generating static params for problems:", error);
    return [];
  }
}

