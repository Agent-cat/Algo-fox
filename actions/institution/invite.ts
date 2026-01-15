"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const createInviteSchema = z.object({
  institutionId: z.string(),
  role: z.enum(["TEACHER", "CONTEST_MANAGER", "STUDENT"]),
  maxUses: z.number().int().positive().optional(),
  expiresAt: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
});

export async function createInvite(data: z.infer<typeof createInviteSchema>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) return { success: false, error: "Unauthorized" };
    const currentUser = session.user as any;

    if (
      currentUser.role !== "ADMIN" &&
      (currentUser.role !== "INSTITUTION_MANAGER" || currentUser.institutionId !== data.institutionId)
    ) {
      return { success: false, error: "Unauthorized" };
    }

    const parsedData = createInviteSchema.parse(data);
    const { institutionId, role, maxUses, expiresAt } = parsedData;

    // Generate unique code
    let code = "";
    let isUnique = false;
    while (!isUnique) {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const existing = await prisma.institutionInvite.findUnique({ where: { code } });
      if (!existing) isUnique = true;
    }

    const invite = await prisma.institutionInvite.create({
      data: {
        code,
        institutionId,
        role,
        maxUses,
        expiresAt,
      },
    });

    revalidatePath("/dashboard/institution/invites");
    return { success: true, invite };
  } catch (error) {
    console.error("Create invite error:", error);
    return { success: false, error: "Failed to create invite" };
  }
}

export async function toggleInvite(id: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) return { success: false, error: "Unauthorized" };

    const invite = await prisma.institutionInvite.findUnique({ where: { id } });
    if (!invite) return { success: false, error: "Invite not found" };

    const currentUser = session.user as any;
    if (
        currentUser.role !== "ADMIN" &&
        (currentUser.role !== "INSTITUTION_MANAGER" || currentUser.institutionId !== invite.institutionId)
    ) {
        return { success: false, error: "Unauthorized" };
    }

    await prisma.institutionInvite.update({
        where: { id },
        data: { isActive: !invite.isActive }
    });

    revalidatePath("/dashboard/institution/invites");
    return { success: true };
  } catch (error) {
    console.error("Toggle invite error:", error);
    return { success: false, error: "Failed to toggle invite" };
  }
}

export async function deleteInvite(id: string) {
    try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user) return { success: false, error: "Unauthorized" };

      const invite = await prisma.institutionInvite.findUnique({ where: { id } });
      if (!invite) return { success: false, error: "Invite not found" };

      const currentUser = session.user as any;
      if (
          currentUser.role !== "ADMIN" &&
          (currentUser.role !== "INSTITUTION_MANAGER" || currentUser.institutionId !== invite.institutionId)
      ) {
          return { success: false, error: "Unauthorized" };
      }

      await prisma.institutionInvite.delete({
          where: { id }
      });

      revalidatePath("/dashboard/institution/invites");
      return { success: true };
    } catch (error) {
      console.error("Delete invite error:", error);
      return { success: false, error: "Failed to delete invite" };
    }
  }

export async function getInstitutionInvites(institutionId: string) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) return { success: false, error: "Unauthorized" };

        const currentUser = session.user as any;
         if (
            currentUser.role !== "ADMIN" &&
            (currentUser.role !== "INSTITUTION_MANAGER" || currentUser.institutionId !== institutionId)
        ) {
            return { success: false, error: "Unauthorized" };
        }

        const invites = await prisma.institutionInvite.findMany({
            where: { institutionId },
            orderBy: { createdAt: 'desc' }
        });

        return { success: true, invites };
    } catch (error) {
        console.error("Get invites error:", error);
        return { success: false, error: "Failed to get invites" };
    }
}

export async function getInviteDetails(code: string) {
    // Public endpoint, but returns minimal info
    try {
        const invite = await prisma.institutionInvite.findUnique({
            where: { code },
            include: {
                institution: {
                    select: {
                        name: true,
                        logo: true,
                        id: true
                    }
                }
            }
        });

        if (!invite) return { success: false, error: "Invite not found" };
        if (!invite.isActive) return { success: false, error: "Invite is deactivated" };
        if (invite.expiresAt && new Date() > invite.expiresAt) return { success: false, error: "Invite expired" };
        if (invite.maxUses && invite.uses >= invite.maxUses) return { success: false, error: "Invite limit reached" };

        return {
            success: true,
            invite: {
                role: invite.role,
                institutionName: invite.institution.name,
                institutionLogo: invite.institution.logo,
                code: invite.code
            }
        };
    } catch (error) {
        console.error("Get invite details error:", error);
        return { success: false, error: "Invalid invite" };
    }
}

export async function acceptInvite(code: string) {
     try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) return { success: false, error: "Unauthorized" };

        const user = session.user;

        // Transaction to ensure atomicity
        const result = await prisma.$transaction(async (tx) => {
            const invite = await tx.institutionInvite.findUnique({
                where: { code },
                include: { institution: true }
            });

            if (!invite) throw new Error("Invite not found");
            if (!invite.isActive) throw new Error("Invite is deactivated");
            if (invite.expiresAt && new Date() > invite.expiresAt) throw new Error("Invite expired");
            if (invite.maxUses && invite.uses >= invite.maxUses) throw new Error("Invite usage limit reached");

            // Update user
            await tx.user.update({
                where: { id: user.id },
                data: {
                    institutionId: invite.institutionId,
                    role: invite.role,
                    onboardingCompleted: true
                }
            });

            // Increment usage
            await tx.institutionInvite.update({
                where: { id: invite.id },
                data: { uses: { increment: 1 } }
            });

            return invite;
        });

        revalidatePath("/dashboard");
        return { success: true, institutionName: result.institution.name };
     } catch (error: any) {
         console.error("Accept invite error:", error);
         return { success: false, error: error.message || "Failed to accept invite" };
     }
}
