"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { GithubService } from "@/lib/github";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-utils";

export async function updateGithubSettings(data: {
  repoName: string;
  syncMode: string;
  autoSync: boolean;
}) {
  const session = await getSession();

  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userId = session.user.id;

    await prisma.user.update({
      where: { id: userId },
      data: {
        githubRepo: data.repoName,
        githubSyncMode: data.syncMode,
        githubAutoSync: data.autoSync,
      },
    });

    revalidatePath("/dashboard/settings"); // Or wherever the settings are
    return { success: true };
  } catch (error) {
    console.error("[updateGithubSettings] Error:", error);
    return { success: false, error: "Failed to update settings" };
  }
}

export async function connectGithubRepo(repoName: string) {
  const session = await getSession();

  if (!session || !session.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userId = session.user.id;
    const token = await GithubService.getGithubToken(userId);

    if (!token) {
      return { success: false, error: "GitHub account not connected or missing token" };
    }

    // Check if repo exists, if not create it
    const exists = await GithubService.checkRepoExists(token, repoName);
    if (!exists) {
      const created = await GithubService.createRepository(token, repoName);
      if (!created) {
        return { success: false, error: "Failed to create GitHub repository. Ensure the app has repo permissions." };
      }
    }

    // Save to DB
    await prisma.user.update({
      where: { id: userId },
      data: {
        githubRepo: repoName,
      },
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("[connectGithubRepo] Error:", error);
    return { success: false, error: "Failed to connect repository" };
  }
}

export async function syncGithubAccount() {
  const session = await getSession();

  if (!session?.user) return { success: false };

  const account = await prisma.account.findFirst({
    where: { userId: session.user.id, providerId: "github" },
  });

  if (!account || !account.accessToken) return { success: false };

  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${account.accessToken}`,
        "User-Agent": "Algo-fox",
      },
    });
    if (res.ok) {
      const profile = await res.json();
      if (profile.login && session.user.githubHandle !== profile.login) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { githubHandle: profile.login },
        });
        return { success: true, updated: true, handle: profile.login };
      }
      return { success: true, updated: false, handle: profile.login };
    }
  } catch (e) {
    console.error("[syncGithubAccount] Error syncing GitHub account:", e);
  }
  return { success: true, updated: false, handle: session.user.githubHandle };
}

export async function syncPreviousSubmissions() {
  const session = await getSession();

  if (!session?.user) return { success: false, error: "Unauthorized" };

  try {
    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.githubRepo) {
      return { success: false, error: "GitHub repository not configured" };
    }

    const whereClause: any = {
      userId,
      mode: "SUBMIT",
      githubSyncedAt: null, // Only sync unsynced submissions
    };

    if (user.githubSyncMode === "ACCEPTED_ONLY") {
      whereClause.status = "ACCEPTED";
    }

    const unsyncedCount = await prisma.submission.count({
      where: whereClause,
    });

    if (unsyncedCount === 0) {
      return { success: true, count: 0 };
    }

    const { addGithubBatchSyncJob } = await import("@/core/queues/github-sync.queue");
    
    await addGithubBatchSyncJob(userId);

    return { success: true, count: unsyncedCount };
  } catch (error) {
    console.error("[syncPreviousSubmissions] Error:", error);
    return { success: false, error: "Failed to sync previous submissions" };
  }
}
