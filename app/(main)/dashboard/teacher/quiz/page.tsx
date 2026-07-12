import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getSession } from "@/lib/auth-utils";
import { QuizTemplateList } from "@/components/quiz/teacher/QuizTemplateList";
import QuizPageClient from "./QuizPageClient";

export const metadata: Metadata = { title: "Quizzes — Teacher" };

export default async function TeacherQuizPage() {
  const session = await getSession();
  if (!session?.user) redirect("/signin");

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    redirect("/dashboard");
  }

  const templates = await prisma.quizTemplate.findMany({
    where: { teacherId: user.id },
    include: {
      questions: { orderBy: { order: "asc" } },
      assignments: {
        include: { classroom: { select: { id: true, name: true, section: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <QuizPageClient
      templates={JSON.parse(JSON.stringify(templates))}
    />
  );
}
