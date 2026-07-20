"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-utils";
import { revalidateTag, cacheTag, cacheLife } from "next/cache";

// ─── Constants ────────────────────────────────────────────────────────────────

const DAILY_CHALLENGE_TAG_NAME = "Daily Challenge";
const DAILY_CHALLENGE_TAG_SLUG = "daily-challenge";

const DAILY_CHALLENGE_CACHE_LIFE = {
  stale: 60,
  revalidate: 120,
  expire: 86_400, // 24 hours — day-level data
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDateString(date: Date): string {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

/** Upserts the "Daily Challenge" tag and connects it to the given problem. */
async function ensureDailyChallengeTag(problemId: string): Promise<void> {
  await prisma.tag.upsert({
    where: { slug: DAILY_CHALLENGE_TAG_SLUG },
    update: {
      problems: { connect: { id: problemId } },
    },
    create: {
      name: DAILY_CHALLENGE_TAG_NAME,
      slug: DAILY_CHALLENGE_TAG_SLUG,
      problems: { connect: { id: problemId } },
    },
  });
}

// ─── Public Queries ───────────────────────────────────────────────────────────

/**
 * Fetches the daily challenge for today (or an explicit YYYY-MM-DD date).
 * Cached for the day with a private profile since it is user-agnostic public data.
 */
export async function getDailyChallenge(dateStr?: string) {
  const targetDate = dateStr ?? toDateString(new Date());
  return getCachedDailyChallenge(targetDate);
}

async function getCachedDailyChallenge(dateStr: string) {
  "use cache";
  cacheLife(DAILY_CHALLENGE_CACHE_LIFE);
  cacheTag("daily-challenge", `daily-challenge-${dateStr}`);

  const challenge = await prisma.dailyChallenge.findUnique({
    where: { date: new Date(dateStr) },
    include: {
      problem: {
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          domain: true,
          solved: true,
          tags: { select: { name: true, slug: true } },
        },
      },
    },
  });

  return { success: true, challenge };
}

/**
 * Fetches all daily challenges for a given month (for the admin calendar).
 * Returns a map of "YYYY-MM-DD" → challenge record.
 */
export async function getDailyChallengesForMonth(year: number, month: number) {
  return getCachedMonthChallenges(year, month);
}

async function getCachedMonthChallenges(year: number, month: number) {
  "use cache";
  cacheLife(DAILY_CHALLENGE_CACHE_LIFE);
  cacheTag("daily-challenge", `daily-challenge-month-${year}-${month}`);

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // last day of month

  const challenges = await prisma.dailyChallenge.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      problem: {
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          domain: true,
        },
      },
    },
    orderBy: { date: "asc" },
  });

  return {
    success: true,
    challenges: challenges.map((c) => ({
      ...c,
      date: c.date.toISOString(),
    })),
  };
}

// ─── Weekly History Query ─────────────────────────────────────────────────────

export interface WeekDayEntry {
  dateStr: string;      // YYYY-MM-DD
  dayLabel: string;     // "Mon", "Tue", …
  hasChallengeSet: boolean;
  completed: boolean;   // ACCEPTED submission by user ON that day
  isMissed: boolean;    // past day with no accepted submission
  isToday: boolean;
  isFuture: boolean;
}

/**
 * Returns the 7-day challenge tracker for the current week (Mon → Sun).
 * A day is "completed" only if the user has an ACCEPTED submission for
 * that day's problem **on that calendar day** — regardless of prior solves.
 * NOT cached: user-specific, must be fresh.
 */
export async function getWeeklyDailyChallengeHistory(): Promise<{
  success: boolean;
  week: WeekDayEntry[];
}> {
  const session = await getSession();
  const userId = session?.user?.id ?? null;

  const now = new Date();
  const todayStr = toDateString(now);

  // Build Mon → Sun window for the current week
  const dayOfWeek = now.getDay(); // 0 = Sun
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const weekDates: Date[] = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });

  const weekStart = weekDates[0];
  const weekEnd = weekDates[6];

  // Fetch all daily challenges for the week in one query
  const challenges = await prisma.dailyChallenge.findMany({
    where: {
      date: { gte: weekStart, lte: weekEnd },
    },
    select: { date: true, problemId: true },
  });

  const challengeByDate = new Map(
    challenges.map((c) => [toDateString(c.date), c.problemId])
  );

  // Fetch accepted submissions for this user across this week (one query)
  let acceptedByDate = new Map<string, Set<string>>(); // dateStr → Set<problemId>

  if (userId) {
    const submissions = await prisma.submission.findMany({
      where: {
        userId,
        status: "ACCEPTED",
        mode: "SUBMIT",
        createdAt: {
          gte: weekStart,
          lte: new Date(weekEnd.getTime() + 86_400_000), // inclusive of Sunday end
        },
      },
      select: { problemId: true, createdAt: true },
    });

    for (const sub of submissions) {
      const dayKey = toDateString(sub.createdAt);
      if (!acceptedByDate.has(dayKey)) acceptedByDate.set(dayKey, new Set());
      acceptedByDate.get(dayKey)!.add(sub.problemId);
    }
  }

  const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const week: WeekDayEntry[] = weekDates.map((date) => {
    const dateStr = toDateString(date);
    const problemId = challengeByDate.get(dateStr) ?? null;
    const hasChallengeSet = problemId !== null;
    const isToday = dateStr === todayStr;
    const isFuture = date > now && !isToday;
    const isPast = !isToday && !isFuture;

    const solvedToday =
      hasChallengeSet &&
      problemId !== null &&
      (acceptedByDate.get(dateStr)?.has(problemId) ?? false);

    const isMissed = isPast && hasChallengeSet && !solvedToday;

    return {
      dateStr,
      dayLabel: DAY_LABELS[date.getDay()],
      hasChallengeSet,
      completed: solvedToday,
      isMissed,
      isToday,
      isFuture,
    };
  });

  return { success: true, week };
}

// ─── Admin Mutations ──────────────────────────────────────────────────────────

/**
 * Upserts the problem-of-the-day for a given date (YYYY-MM-DD).
 * Also applies the "daily-challenge" tag to the problem.
 * Admin-only.
 */
export async function setDailyChallenge(dateStr: string, problemId: string) {
  const session = await getSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const date = new Date(dateStr);

    const [challenge] = await Promise.all([
      prisma.dailyChallenge.upsert({
        where: { date },
        update: { problemId },
        create: { date, problemId },
        include: {
          problem: {
            select: { id: true, title: true, slug: true, difficulty: true },
          },
        },
      }),
      ensureDailyChallengeTag(problemId),
    ]);

    // Bust caches
    revalidateTag("daily-challenge", "max");
    revalidateTag(`daily-challenge-${dateStr}`, "max");
    revalidateTag(
      `daily-challenge-month-${date.getFullYear()}-${date.getMonth() + 1}`,
      "max"
    );
    revalidateTag("problems-list", "max");

    return {
      success: true,
      challenge: {
        ...challenge,
        date: challenge.date.toISOString(),
      },
    };
  } catch (error) {
    console.error("[setDailyChallenge] error:", error);
    return { success: false, error: "Failed to set daily challenge" };
  }
}

/**
 * Removes the daily challenge for a given date (YYYY-MM-DD).
 * Admin-only.
 */
export async function removeDailyChallenge(dateStr: string) {
  const session = await getSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const date = new Date(dateStr);

    await prisma.dailyChallenge.delete({ where: { date } });

    revalidateTag("daily-challenge", "max");
    revalidateTag(`daily-challenge-${dateStr}`, "max");
    revalidateTag(
      `daily-challenge-month-${date.getFullYear()}-${date.getMonth() + 1}`,
      "max"
    );

    return { success: true };
  } catch (error) {
    console.error("[removeDailyChallenge] error:", error);
    return { success: false, error: "Failed to remove daily challenge" };
  }
}

/**
 * Searches existing problems (title match) for the admin picker dialog.
 */
export async function searchProblemsForChallenge(query: string) {
  const session = await getSession();

  if (!session?.user || session.user.role !== "ADMIN") {
    return { success: false, error: "Unauthorized", problems: [] };
  }

  if (!query.trim()) {
    return { success: true, problems: [] };
  }

  try {
    const problems = await prisma.problem.findMany({
      where: {
        hidden: false,
        title: { contains: query, mode: "insensitive" },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        difficulty: true,
        domain: true,
        solved: true,
      },
      take: 20,
      orderBy: { title: "asc" },
    });

    return { success: true, problems };
  } catch (error) {
    console.error("[searchProblemsForChallenge] error:", error);
    return { success: false, error: "Search failed", problems: [] };
  }
}
