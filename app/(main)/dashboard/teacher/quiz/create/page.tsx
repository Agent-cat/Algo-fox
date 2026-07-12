import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth-utils";
import { QuizCreateForm } from "@/components/quiz/teacher/QuizCreateForm";

export const metadata = { title: "Create Quiz Template — Teacher" };

export default async function CreateQuizPage() {
  const session = await getSession();
  if (!session?.user) redirect("/signin");

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) redirect("/dashboard");

  return (
    <div className="h-[calc(100vh-64px)] bg-[#fafafa] dark:bg-[#24262C] relative overflow-hidden flex flex-col">
      <QuizCreateForm classrooms={[]} />
    </div>
  );
}
