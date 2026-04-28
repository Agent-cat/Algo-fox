import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Zap } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Live Quizzes — Teacher" };

export default async function TeacherQuizPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) redirect("/signin");

  const user = session.user as any;
  if (!["TEACHER", "INSTITUTION_MANAGER", "ADMIN"].includes(user.role)) {
    redirect("/dashboard");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { quizzesCreated: true },
  });

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#121212] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-100/50 dark:border-[#1e1e1e] pb-6">
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="text-[10px] font-black text-orange-600 dark:text-orange-500 uppercase tracking-[0.2em] hover:text-black dark:hover:text-white transition-colors"
            >
              ← Dashboard
            </Link>
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2 flex items-center gap-3">
                <Zap className="w-8 h-8 text-orange-500" />
                Live Quizzes
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-lg">
                Create interactive MCQ quizzes. Students join instantly via QR code or link.
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/teacher/quiz/create"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-sm font-bold hover:bg-orange-600 dark:hover:bg-gray-200 transition-all shadow-lg active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            New Quiz
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#222] p-5">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Total Quizzes Hosted</p>
            <p className="text-3xl font-black text-orange-600 dark:text-orange-400 font-mono">{dbUser?.quizzesCreated ?? 0}</p>
          </div>
          <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#222] p-5">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">How it works</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create → Share link → Host live session</p>
          </div>
          <div className="bg-white dark:bg-[#141414] rounded-2xl border border-gray-200 dark:border-[#222] p-5">
            <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Supported</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">5,000+ concurrent students</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-dashed border-gray-200 dark:border-[#222] p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-500/15 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Start a new quiz session</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
            Quiz sessions are live and temporary. Data is cleared automatically after the quiz ends.
          </p>
          <Link
            href="/dashboard/teacher/quiz/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-black hover:bg-orange-600 dark:hover:bg-gray-200 transition-all active:scale-[0.98] shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Create Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
