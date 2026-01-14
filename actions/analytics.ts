"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUserTopicStats(userId?: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const targetUserId = userId || session?.user?.id;

  if (!targetUserId) return null;

  // Fetch all accepted submissions with problem tags
  const submissions = await prisma.submission.findMany({
    where: {
      userId: targetUserId,
      status: "ACCEPTED",
    },
    include: {
      problem: {
        include: {
          tags: true,
        },
      },
    },
  });

  // Aggregate by tag
  const tagCounts: Record<string, number> = {};
  const totalSolved = submissions.length;

  submissions.forEach((sub) => {
    sub.problem.tags.forEach((tag) => {
      tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
    });
  });

  // Convert to array and take top 6
  const data = Object.entries(tagCounts)
    .map(([subject, count]) => ({
      subject, // Tag name
      A: count, // User's count
      fullMark: Math.max(count * 1.5, 10), // Arbitrary scaling for chart visual
    }))
    .sort((a, b) => b.A - a.A)
    .slice(0, 6); // Top 6 tags

  return data;
}

export async function getUserProgressHistory(userId?: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const targetUserId = userId || session?.user?.id;

  if (!targetUserId) return null;

  const submissions = await prisma.submission.findMany({
    where: {
      userId: targetUserId,
      status: "ACCEPTED",
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      createdAt: true,
    },
  });

  // Group by date (cumulative)
  const history: { date: string; count: number }[] = [];
  let cumulative = 0;
  const map = new Map<string, number>();

  submissions.forEach((sub) => {
    const date = sub.createdAt.toISOString().split("T")[0]; // YYYY-MM-DD
    map.set(date, (map.get(date) || 0) + 1);
  });

  // Create cumulative data points
  // We can just pick every accepted submission as a point, or group by day
  // Grouping by day is cleaner
  const sortedDates = Array.from(map.keys()).sort();

  for (const date of sortedDates) {
    const dailyCount = map.get(date) || 0;
    cumulative += dailyCount;
    history.push({
        date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count: cumulative
    });
  }

  // Return last 30 data points to avoid clutter, or sample them if huge
  return history.slice(-30);
}

// Peer Comparison (Percentiles)
export async function getProblemStats(problemId: string, runtime: number, memory: number) {
    const totalSubmissions = await prisma.submission.count({
        where: { problemId, status: "ACCEPTED" }
    });

    if (totalSubmissions <= 1) return { runtimePercentile: 100, memoryPercentile: 100 };

    // Runtime Percentile (Higher is better)
    const slowerSubmissions = await prisma.submission.count({
        where: {
            problemId,
            status: "ACCEPTED",
            time: { gt: runtime }
        }
    });

    // Memory Percentile (Higher is better)
    const heavierSubmissions = await prisma.submission.count({
        where: {
            problemId,
            status: "ACCEPTED",
            memory: { gt: memory }
        }
    });

    const runtimePercentile = Math.round((slowerSubmissions / totalSubmissions) * 100);
    const memoryPercentile = Math.round((heavierSubmissions / totalSubmissions) * 100);

    return { runtimePercentile, memoryPercentile };
}
