import { getProblem } from "@/actions/problems";
import Workspace from "@/components/workspace/Workspace";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProblemPage({ params }: PageProps) {
  const { slug } = await params;
  const problem = await getProblem(slug);

  if (!problem) {
    return notFound();
  }

  return (
    <>
      <div className="md:hidden flex flex-col items-center justify-center min-h-screen p-8 text-center bg-gray-50">
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="14" x="2" y="3" rx="2" />
            <line x1="8" x2="16" y1="21" y2="21" />
            <line x1="12" x2="12" y1="17" y2="21" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Desktop Required</h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          For the best coding experience, please open this problem on a desktop or laptop device.
        </p>
      </div>
      <div className="hidden md:block">
        <Workspace problem={problem} />
      </div>
    </>
  );
}

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
