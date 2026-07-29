import { getProblem, getNextProblem, getPreviousProblem } from "@/actions/problems";
import { getContestDetail } from "@/actions/contest";

import { notFound, redirect } from "next/navigation";
import WorkspaceClientWrapper from "@/components/workspace/WorkspaceClientWrapper";
import { prisma } from "@/lib/prisma";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ConceptViewer from "@/components/problems/ConceptViewer";
import AptitudeWorkspaceClientWrapper from "@/components/workspace/AptitudeWorkspaceClientWrapper";
import { Suspense } from "react";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import WorkspaceSkeleton from "@/components/workspace/WorkspaceSkeleton";
import { getSession } from "@/lib/auth-utils";

// MIGRATED: Removed export const revalidate = 3600 (incompatible with Cache Components)
// Caching is now handled via "use cache" in the getProblem action with cacheLife

interface PageProps {
  params: Promise<{ slug: string; tab?: string[] }>;
  searchParams: Promise<{ contestId?: string; courseId?: string }>;
}

// GENERATING METADATA FOR THE PROBLEM PAGE (SEO)
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { contestId } = await searchParams;
  const problem = await getProblem(slug, false, contestId);

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
  params: Promise<{ slug: string; tab?: string[] }>;
  searchParams: Promise<{ contestId?: string; courseId?: string }>;
}) {
  const { slug } = await params;
  const { contestId, courseId } = await searchParams;

  // Parallelize core data fetching (Optimized: Session first then problem to avoid redundant calls)
  const session = await getSession();
  const problem = await getProblem(slug, session?.user?.role === "ADMIN", contestId);

  if (!problem) {
    return notFound();
  }

  // Resolve course context
  const rawCourseId = typeof courseId === 'string' ? courseId : Array.isArray(courseId) ? courseId[0] : undefined;
  const courseContext = rawCourseId ? (problem as any).categoryProblems?.find((cp: any) => cp.category?.courseId === rawCourseId) : null;
  const activeCourseId = courseContext?.category?.courseId || null;
  const courseName = courseContext?.category?.course?.title || null;
  const courseSlug = courseContext?.category?.course?.slug || null;

  // Set up all independent queries to run concurrently
  const promises: Promise<any>[] = [];

  // 1. Course Enrollment Check
  let enrollmentIdx = -1;
  if (rawCourseId && (!session?.user || session.user.role !== 'ADMIN')) {
    enrollmentIdx = promises.length;
    promises.push(
      (async () => {
        if (!session?.user) return { redirect: `/courses/${rawCourseId}` }; // Fallback if needed
        const isEnrolled = await prisma.userCourseEnrollment.findUnique({
          where: { userId_courseId: { userId: session.user.id, courseId: rawCourseId } }
        });
        if (!isEnrolled) {
          const course = await prisma.course.findUnique({
            where: { id: rawCourseId },
            select: { slug: true }
          });
          if (course) return { redirect: `/courses/${course.slug}` };
        }
        return null;
      })()
    );
  }

  // 2. Contest Details & Submissions
  let contestIdx = -1;
  let submissionsIdx = -1;

  if (session?.user) {
    if (contestId) {
      contestIdx = promises.length;
      promises.push(getContestDetail(contestId));

      submissionsIdx = promises.length;
      promises.push(
        Promise.all([
          prisma.submission.findFirst({
            where: { problemId: problem.id, userId: session.user.id, status: "ACCEPTED", mode: "SUBMIT", contestId }
          }),
          prisma.submission.findMany({
            where: { userId: session.user.id, status: "ACCEPTED", mode: "SUBMIT", contestId },
            select: { problemId: true }
          })
        ])
      );
    } else {
      submissionsIdx = promises.length;
      promises.push(
        Promise.all([
          prisma.submission.findFirst({
            where: { problemId: problem.id, userId: session.user.id, status: "ACCEPTED", mode: "SUBMIT" }
          }),
          prisma.submission.findMany({
            where: { userId: session.user.id, status: "ACCEPTED", mode: "SUBMIT" },
            select: { problemId: true },
            distinct: ['problemId']
          })
        ])
      );
    }
  }

  // 3. Course Problems
  let courseProblemsIdx = -1;
  if (activeCourseId) {
    courseProblemsIdx = promises.length;
    promises.push(
      prisma.categoryProblem.findMany({
        where: { category: { courseId: activeCourseId } },
        orderBy: [{ category: { order: 'asc' } }, { order: 'asc' }],
        select: { problemId: true }
      })
    );
  }

  // 4. Navigation Links
  const nextProblemIdx = promises.length;
  promises.push(getNextProblem(problem.createdAt, problem.domain, problem.type, activeCourseId || undefined, problem.id));

  const prevProblemIdx = promises.length;
  promises.push(getPreviousProblem(problem.createdAt, problem.domain, problem.type, activeCourseId || undefined, problem.id));

  // WAIT FOR ALL PROMISES
  const results = await Promise.all(promises);

  // Extract Results
  if (enrollmentIdx !== -1 && results[enrollmentIdx]?.redirect) {
    return redirect(results[enrollmentIdx].redirect);
  }

  let contestData = null;
  if (contestIdx !== -1) {
    const contestResponse = results[contestIdx];
    if (contestResponse?.success) {
      if ((contestResponse.contest as any).isFinished) {
        return redirect(`/contest/${contestId}`);
      }
      contestData = contestResponse.contest;
    }
  }

  let isSolved = false;
  let solvedProblemIds: string[] = [];
  if (submissionsIdx !== -1) {
    const [submission, allSolved] = results[submissionsIdx];
    isSolved = !!submission;
    solvedProblemIds = allSolved.map((s: any) => s.problemId);
  }

  let totalCourseProblems = 0;
  let currentCourseProblemIndex = -1;
  if (courseProblemsIdx !== -1) {
    const courseProblems = results[courseProblemsIdx];
    totalCourseProblems = courseProblems.length;
    currentCourseProblemIndex = courseProblems.findIndex((cp: any) => cp.problemId === problem.id);
  }

  const nextProblemSlug = results[nextProblemIdx];
  const prevProblemSlug = results[prevProblemIdx];

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
    );
  }
  if (problem.domain === "DSA" || problem.domain === "SQL" || problem.domain === "WEBDEV" || problem.domain === "OOPS") {
    return (
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
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Domain not supported</p>
    </div>
  );
}

export default function ProblemPage({ params, searchParams }: PageProps) {
  return <ProblemContentWithParams params={params} searchParams={searchParams} />;
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

    const paths: { slug: string; tab?: string[] }[] = [];
    for (const p of problems) {
      paths.push({ slug: p.slug });
      paths.push({ slug: p.slug, tab: ['description'] });
      paths.push({ slug: p.slug, tab: ['solutions'] });
      paths.push({ slug: p.slug, tab: ['submissions'] });
    }
    return paths;
  } catch (error) {
     console.error("Error generating static params for problems:", error);
    return [];
  }
}

