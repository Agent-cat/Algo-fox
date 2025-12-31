"use server";

import { prisma } from "@/lib/prisma";
import { onboardingSchema } from "@/zod/user.zod";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const completeOnboarding = async (data: z.infer<typeof onboardingSchema>) => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    const validatedFields = onboardingSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, error: "Invalid fields" };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...validatedFields.data,
                onboardingCompleted: true
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Onboarding error:", error);
        return { success: false, error: "Failed to update profile" };
    }
};


// GETTING A USER 

export const getUser = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user) return null;

    try {
    const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });
        return user;
    } catch (error) {
        console.error("Failed to get user:", error);
        return null;
    }
}
