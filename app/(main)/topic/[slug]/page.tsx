import { getTopic, getTopicProblems } from "@/actions/topic.action";
import { getSession } from "@/lib/auth-utils";
import { redirect, notFound } from "next/navigation";
import { Difficulty } from "@prisma/client";
import { TopicProblemsClient } from "@/components/topic/TopicProblemsClient";

interface TopicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface ProblemWithStatus {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  acceptance: number;
  isSolved?: boolean;
  companies?: any;
}

export default async function TopicDetailPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const session = await getSession();

  if (!session?.user) {
    redirect("/signin");
  }

  const categoryRes = await getTopic(slug);
  if (!categoryRes.success || !categoryRes.category) {
    notFound();
  }

  const category = categoryRes.category;
  
  // Fetch up to 100 problems in this category
  const problemsRes = await getTopicProblems(category.id, 1, 100);
  const problems = (problemsRes.problems as ProblemWithStatus[]) || [];
  const totalProblems = problemsRes.total || problems.length;

  const solvedCount = problems.filter((p) => p.isSolved).length;

  return (
    <TopicProblemsClient
      topicName={category.name}
      problems={problems}
      solvedCount={solvedCount}
      totalProblems={totalProblems}
    />
  );
}
