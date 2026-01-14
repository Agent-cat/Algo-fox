"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { getUserTopicStats } from "@/actions/analytics";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";

export default function TopicRadarChart({ userId }: { userId?: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    getUserTopicStats(userId).then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, [userId]);

  if (loading) {
    return (
        <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
        </div>
    );
  }

  if (data.length < 3) {
      return (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-sm">
              <p>Solve problem in various topics</p>
              <p>to unlock insights!</p>
          </div>
      )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke={isDark ? "#333" : "#e5e7eb"} />
          <PolarAngleAxis dataKey="subject" tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
          <Radar
            name="Problems Solved"
            dataKey="A"
            stroke="#ea580c"
            fill="#ea580c"
            fillOpacity={0.4}
          />
          <Tooltip
            contentStyle={{
                borderRadius: "8px",
                border: isDark ? "1px solid #333" : "none",
                backgroundColor: isDark ? "#141414" : "#fff",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
            }}
            itemStyle={{ color: "#ea580c", fontWeight: "bold" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
