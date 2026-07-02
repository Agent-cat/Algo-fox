"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-utils";
import { revalidatePath, revalidateTag } from "next/cache";

export async function getTopicSheets() {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    // Get solved problem IDs for logged-in user
    const solvedSet = new Set<string>();
    if (userId) {
      const solvedSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          status: "ACCEPTED",
          mode: "SUBMIT",
        },
        select: { problemId: true },
        distinct: ["problemId"],
      });
      solvedSubmissions.forEach((s) => solvedSet.add(s.problemId));
    }

    // Get tags that are connected as topic tags
    const tags = await prisma.tag.findMany({
      where: {
        topicProblems: {
          some: {},
        },
      },
      include: {
        topicProblems: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    const categories = tags.map((tag) => {
      const total = tag.topicProblems.length;
      const solved = tag.topicProblems.filter((p) => solvedSet.has(p.id)).length;
      return {
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        _count: { categoryProblems: total },
        solvedCount: solved,
      };
    });

    return { success: true, categories };
  } catch (error) {
    console.error("Failed to fetch topic sheets:", error);
    return { success: false, categories: [], error: "Failed to fetch topic sheets" };
  }
}

export async function getTopic(slug: string) {
  try {
    const tag = await prisma.tag.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { topicProblems: true },
        },
      },
    });

    if (!tag) {
      return { success: false, error: "Topic not found" };
    }

    return { success: true, category: tag };
  } catch (error) {
    console.error("Failed to fetch topic details:", error);
    return { success: false, error: "Failed to fetch topic details" };
  }
}

export async function getTopicProblems(tagId: string, page: number = 1, pageSize: number = 100) {
  try {
    const session = await getSession();
    const userId = session?.user?.id;

    // Get solved problem IDs for logged-in user
    const solvedSet = new Set<string>();
    if (userId) {
      const solvedSubmissions = await prisma.submission.findMany({
        where: {
          userId,
          status: "ACCEPTED",
          mode: "SUBMIT",
        },
        select: { problemId: true },
        distinct: ["problemId"],
      });
      solvedSubmissions.forEach((s) => solvedSet.add(s.problemId));
    }

    const [problems, total] = await Promise.all([
      prisma.problem.findMany({
        where: {
          topicTags: {
            some: { id: tagId },
          },
        },
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          _count: { select: { submissions: true } },
          tags: { select: { name: true, slug: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.problem.count({
        where: {
          topicTags: {
            some: { id: tagId },
          },
        },
      }),
    ]);

    const problemsWithStats = problems.map((p) => {
      return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        difficulty: p.difficulty,
        type: p.type,
        companies: p.companies,
        acceptance: p._count.submissions > 0
          ? ((p.solved || 0) / p._count.submissions) * 100
          : 0,
        isSolved: solvedSet.has(p.id),
      };
    });

    return {
      problems: problemsWithStats,
      totalPages: Math.ceil(total / pageSize),
      currentPage: page,
      total,
    };
  } catch (error) {
    console.error("Failed to fetch topic problems:", error);
    return { problems: [], totalPages: 0, currentPage: page, total: 0 };
  }
}
