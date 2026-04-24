"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function resolveTargetUserId(requestedId?: string): Promise<string | null> {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return null;

    const sessionUser = session.user as any;

    // If a specific userId was requested, enforce ownership unless admin
    if (requestedId && requestedId !== session.user.id) {
        if (sessionUser.role !== "ADMIN") return null; // Silently block cross-user access
        return requestedId;
    }

    return requestedId || session.user.id;
}

export async function getUserTopicStats(userId?: string) {
    const targetUserId = await resolveTargetUserId(userId);
    if (!targetUserId) return null;

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

    const tagCounts: Record<string, number> = {};

    submissions.forEach((sub) => {
        sub.problem.tags.forEach((tag) => {
            tagCounts[tag.name] = (tagCounts[tag.name] || 0) + 1;
        });
    });

    const data = Object.entries(tagCounts)
        .map(([subject, count]) => ({
            subject,
            A: count,
            fullMark: Math.max(count * 1.5, 10),
        }))
        .sort((a, b) => b.A - a.A)
        .slice(0, 6);

    return data;
}

export async function getUserProgressHistory(userId?: string) {
    const targetUserId = await resolveTargetUserId(userId);
    if (!targetUserId) return null;

    const submissions = await prisma.submission.findMany({
        where: {
            userId: targetUserId,
            status: "ACCEPTED",
        },
        orderBy: { createdAt: "asc" },
        select: { createdAt: true },
    });

    const map = new Map<string, number>();
    submissions.forEach((sub) => {
        const date = sub.createdAt.toISOString().split("T")[0];
        map.set(date, (map.get(date) || 0) + 1);
    });

    const sortedDates = Array.from(map.keys()).sort();
    let cumulative = 0;
    const history: { date: string; count: number }[] = [];

    for (const date of sortedDates) {
        cumulative += map.get(date) || 0;
        history.push({
            date: new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            count: cumulative,
        });
    }

    return history.slice(-30);
}

// Peer Comparison (Percentiles) — problem stats are not user-specific, no auth needed
export async function getProblemStats(problemId: string, runtime: number, memory: number) {
    const totalSubmissions = await prisma.submission.count({
        where: { problemId, status: "ACCEPTED" },
    });

    if (totalSubmissions <= 1) return { runtimePercentile: 100, memoryPercentile: 100 };

    const [slowerSubmissions, heavierSubmissions] = await Promise.all([
        prisma.submission.count({
            where: { problemId, status: "ACCEPTED", time: { gt: runtime } },
        }),
        prisma.submission.count({
            where: { problemId, status: "ACCEPTED", memory: { gt: memory } },
        }),
    ]);

    return {
        runtimePercentile: Math.round((slowerSubmissions / totalSubmissions) * 100),
        memoryPercentile: Math.round((heavierSubmissions / totalSubmissions) * 100),
    };
}
