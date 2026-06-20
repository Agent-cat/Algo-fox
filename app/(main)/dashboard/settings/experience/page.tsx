import { getCurrentUser } from "@/lib/auth-utils";
import { UserService } from "@/core/services/user.service";
import { redirect } from "next/navigation";
import { ExperienceSettingsClient } from "@/components/settings/ExperienceSettingsClient";

export default async function ExperienceSettingsPage() {
    const authUser = await getCurrentUser();
    if (!authUser) redirect("/auth/signin");

    const user = await UserService.getUserSettings(authUser.id);
    if (!user) redirect("/auth/signin");

    return <ExperienceSettingsClient user={user} />;
}
