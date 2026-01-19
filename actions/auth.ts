"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function checkSessionConflict() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { conflict: false };
  }

  const activeSessions = await prisma.session.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      expiresAt: true,
      userAgent: true,
      ipAddress: true,
      token: true, // Need token to identify current session
    },
  });

  // Filter out expired sessions just in case, though better-auth likely handles cleanup or assumes valid if in DB
  const validSessions = activeSessions.filter(s => s.expiresAt > new Date());

  if (validSessions.length > 1) {
    return {
      conflict: true,
      currentSessionToken: session.session.token,
      sessions: validSessions.map(s => ({
        ...s,
        isCurrent: s.token === session.session.token
      }))
    };
  }

  return { conflict: false };
}

export async function resolveSessionConflict(action: "LOGOUT_OTHERS" | "LOGOUT_CURRENT") {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("No active session");
  }

  if (action === "LOGOUT_OTHERS") {
    // Delete all sessions for this user EXCEPT the current one
    await prisma.session.deleteMany({
      where: {
        userId: session.user.id,
        token: {
          not: session.session.token
        }
      }
    });
    return { success: true, message: "Other sessions terminated" };
  } else if (action === "LOGOUT_CURRENT") {
    // Sign out the current session
    // We can use auth.api.signOut or just delete the session manually
    await prisma.session.delete({
      where: {
        token: session.session.token
      }
    });
    return { success: true, message: "Current session terminated" };
  }
}
