import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-utils";
import { getDailyChallengesForMonth } from "@/actions/daily-challenge.action";
import DailyChallengeClient from "./_components/DailyChallengeClient";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Daily Challenge | Admin",
  description: "Schedule the Problem of the Day for Algo-fox users.",
};

export default async function DailyChallengePage() {
  const session = await getSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const { challenges = [] } = await getDailyChallengesForMonth(year, month);

  return (
    <div className="w-full max-w-5xl mx-auto py-4">
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-orange-200 dark:border-orange-500/10">
          <Sparkles className="w-3 h-3" />
          Engagement Feature
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
          Daily Challenge
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-2 font-medium max-w-xl">
          Schedule a Problem of the Day for each calendar date. The selected
          problem will be featured prominently on the homepage for all users.
        </p>
      </div>

      <DailyChallengeClient
        initialChallenges={challenges as any}
        initialYear={year}
        initialMonth={month}
      />
    </div>
  );
}
