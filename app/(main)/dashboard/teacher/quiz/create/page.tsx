import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getTeacherClassrooms } from "@/actions/classroom";
import { QuizCreateForm } from "@/components/quiz/teacher/QuizCreateForm";

export const metadata = { title: "Create Quiz — Teacher" };

export default async function CreateQuizPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin");

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) redirect("/dashboard");

  const result = await getTeacherClassrooms();
  const classrooms = result.success && result.classrooms ? result.classrooms : [];

  if (classrooms.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] flex items-center justify-center p-8">
        <div className="max-w-md text-center space-y-4">
          <div className="text-4xl">🏫</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">No Classrooms Yet</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Create a classroom first before hosting a live quiz.
          </p>
          <Link
            href="/dashboard/teacher/classrooms"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black text-sm hover:bg-orange-600 dark:hover:bg-gray-200 transition-all"
          >
            Go to Classrooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <div className="mb-8">
          <Link
            href="/dashboard/teacher/quiz"
            className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] hover:text-black dark:hover:text-white transition-colors"
          >
            ← Live Quizzes
          </Link>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mt-3 mb-2">
            Create Quiz
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            Select a classroom, add your questions, then host the live session.
          </p>
        </div>

        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#222] p-6 sm:p-8">
          <QuizCreateForm classrooms={classrooms.map((c) => ({ id: c.id, name: c.name, section: c.section ?? undefined, studentCount: (c as any)._count?.students ?? 0 }))} />
        </div>
      </div>
    </div>
  );
}
