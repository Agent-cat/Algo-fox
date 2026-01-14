"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { useEffect, useState } from "react";
import { getUserProgressHistory } from "@/actions/analytics";
import { Loader2 } from "lucide-react";

export default function ProgressLineChart({ userId }: { userId?: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserProgressHistory(userId).then((res) => {
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

  if (data.length < 2) {
      return (
          <div className="h-64 flex flex-col items-center justify-center text-gray-400 text-sm border border-dashed rounded-xl">
              <p>Not enough data yet.</p>
              <p>Keep solving!</p>
          </div>
      )
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: "#9ca3af", fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
            labelStyle={{ color: "#6b7280", fontSize: "12px" }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#ea580c"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorCount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
