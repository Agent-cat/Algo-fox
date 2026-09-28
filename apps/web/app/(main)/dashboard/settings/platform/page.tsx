import { PlatformSettings } from "@/components/settings/PlatformSettings";
import { prisma } from "@algofox/db";
import { auth } from "@algofox/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@algofox/auth";

export default async function PlatformSettingsPage() {
    const session = await getSession();

    if (!session?.user?.id) {
        redirect("/signin");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            leetCodeHandle: true,
            codeChefHandle: true,
            codeforcesHandle: true,
            githubHandle: true,
            codeChefVerified: true,
            codeforcesVerified: true,
            leetCodeVerified: true,
            // These fields might not exist in DB yet, but I'll try to select them if they existed or return null.
            // Since they don't exist in schema, prisma will error if I select them.
            // So I will NOT select them. I will pass them as null/undefined to the component.
        }
    });

    if (!user) {
        redirect("/signin");
    }

    // Transform undefined to null for serialization if needed, or just pass as is.
    // PlatformSettings optional props handle it.

    return (
        <PlatformSettings user={user} />
    );
}
