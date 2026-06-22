"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { getSession } from "@/lib/auth-utils";
import crypto from "crypto";

export async function checkSessionConflict() {
  const session = await getSession();

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
  const session = await getSession();

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

export async function checkEmailExists(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true }
  });

  if (!user) {
    return { exists: false };
  }

  const hasPassword = user.accounts.some(acc => acc.providerId === "credential" && acc.password);
  
  return { 
    exists: true, 
    hasPassword,
    name: user.name
  };
}

export async function setPasswordForUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Hash password using the same scrypt algorithm and format as better-auth
  const config = { N: 16384, r: 16, p: 1, dkLen: 64 };
  const salt = crypto.randomBytes(16).toString("hex");
  const key = crypto.scryptSync(password.normalize("NFKC"), salt, config.dkLen, {
      N: config.N,
      r: config.r,
      p: config.p,
      maxmem: 128 * config.N * config.r * 2
  });
  const hashedPassword = `${salt}:${key.toString("hex")}`;

  const existingAccount = user.accounts.find(acc => acc.providerId === "credential");

  if (existingAccount) {
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: { password: hashedPassword }
    });
  } else {
    // accountId for better-auth credential provider is the email
    await prisma.account.create({
      data: {
        id: Math.random().toString(36).slice(2),
        userId: user.id,
        providerId: "credential",
        accountId: email,
        password: hashedPassword,
      }
    });
  }

  return { success: true };
}
