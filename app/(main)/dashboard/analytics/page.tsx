import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import TopicRadarChart from "@/components/analytics/TopicRadarChart";
import ProgressLineChart from "@/components/analytics/ProgressLineChart";
import { BarChart3, TrendingUp, Target } from "lucide-react";

export const metadata = {
  title: "Analytics | AlgoFox",
  description: "Your coding progress and statistics",
};

export default async function AnalyticsPage() {
    const h = await headers();
    const session = await auth.api.getSession({
        headers: h
    });

  if (!session) redirect("/signin");

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-orange-600" />
            Your Analytics
        </h1>
        <p className="text-gray-500 mt-2">Deep dive into your coding journey and identify areas for improvement.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topic Radar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
                <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Topic Mastery</h2>
                <p className="text-sm text-gray-400">Your strengths across different domains</p>
            </div>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            <TopicRadarChart userId={session.user.id} />
          </div>
        </div>

        {/* Progress Line */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-gray-800">Consistency</h2>
                <p className="text-sm text-gray-400">Problems solved over time</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ProgressLineChart userId={session.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
