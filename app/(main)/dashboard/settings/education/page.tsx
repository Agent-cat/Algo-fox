import { getCurrentUser } from "@/lib/auth-utils";
import { UserService } from "@/core/services/user.service";
import { redirect } from "next/navigation";
import { EducationSettingsClient } from "@/components/settings/EducationSettingsClient";

export default async function EducationSettingsPage() {
    const authUser = await getCurrentUser();
    if (!authUser) redirect("/auth/signin");

    const user = await UserService.getUserSettings(authUser.id);
    if (!user) redirect("/auth/signin");

    return <EducationSettingsClient user={user} />;
}
