"use server";

import { prisma } from "@algofox/db";
import { auth } from "@algofox/auth";
import { headers } from "next/headers";
import { getSession } from "@algofox/auth";

async function resolveTargetUserId(requestedId?: string): Promise<string | null> {
    const session = await getSession();
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

    // PERF: replaced findMany(include problem.include tags) + JS counting with a
    // single SQL GROUP BY — avoids loading every accepted submission row + its
    // problem and tag relations into memory just to count tag names.
    const rows = await prisma.$queryRaw<Array<{ subject: string; count: bigint }>>`
        SELECT t."name" AS subject, COUNT(*)::bigint AS count
        FROM "Submission" s
        JOIN "_ProblemToTag" ptn ON ptn."A" = s."problemId"
        JOIN "Tag" t ON t."id" = ptn."B"
        WHERE s."userId" = ${targetUserId}
          AND s."status" = 'ACCEPTED'
        GROUP BY t."name"
        ORDER BY count DESC
    `;

    const data = rows
        .map(({ subject, count }) => {
            const c = Number(count);
            return { subject, A: c, fullMark: Math.max(c * 1.5, 10) };
        })
        .slice(0, 6);

    return data;
}

export async function getUserProgressHistory(userId?: string) {
    const targetUserId = await resolveTargetUserId(userId);
    if (!targetUserId) return null;

    // PERF: daily counts computed in SQL instead of fetching all accepted submissions.
    const rows = await prisma.$queryRaw<Array<{ day: Date; count: bigint }>>`
        SELECT ("createdAt" AT TIME ZONE 'UTC')::date AS day, COUNT(*)::bigint AS count
        FROM "Submission"
        WHERE "userId" = ${targetUserId}
          AND "status" = 'ACCEPTED'
        GROUP BY 1
        ORDER BY 1 ASC
    `;

    let cumulative = 0;
    const history: { date: string; count: number }[] = [];

    for (const row of rows) {
        cumulative += Number(row.count);
        history.push({
            date: new Date(row.day).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
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
