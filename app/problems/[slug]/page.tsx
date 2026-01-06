import { getProblem } from "@/actions/problems";
import Workspace from "@/components/workspace/Workspace";
import { notFound } from "next/navigation";
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

// Dynamic component that checks if problem is solved
async function ProblemContent({ problem }: { problem: any }) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  let isSolved = false;
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
        <Workspace problem={problem} isSolved={isSolved} />
      </div>
    </>
  );
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    return notFound();
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading problem...</p>
        </div>
      </div>
    }>
      <ProblemContent problem={problem} />
    </Suspense>
  );
}


// PRE-GENERATING STATIC PAGES FOR TOP 50 PROBLEMS AT BUILD TIME

export async function generateStaticParams() {
  const problems = await prisma.problem.findMany({
    where: { hidden: false },
    select: { slug: true },
    orderBy: { createdAt: 'desc' },
    take: 50, // PRE-RENDER TOP 50 PROBLEMS
  });

  return problems.map((p) => ({
    slug: p.slug,
  }));
}
