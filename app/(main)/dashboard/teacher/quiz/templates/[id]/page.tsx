import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-utils";
import { prisma } from "@/lib/prisma";
import { QuizCreateForm } from "@/components/quiz/teacher/QuizCreateForm";

export const metadata = { title: "Edit Quiz Template — Teacher" };

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session?.user) redirect("/signin");

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    redirect("/dashboard");
  }

  const { id } = await params;

  const template = await prisma.quizTemplate.findFirst({
    where: { id, teacherId: user.id },
    include: {
      questions: { orderBy: { order: "asc" } },
      assignments: {
        include: { classroom: { select: { id: true, name: true, section: true } } },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!template) notFound();

  return (
    <div className="h-[calc(100vh-64px)] bg-[#fafafa] dark:bg-[#24262C] flex flex-col">
      <QuizCreateForm 
        classrooms={[]} 
        initialTemplate={JSON.parse(JSON.stringify(template))} 
      />
    </div>
  );
}
