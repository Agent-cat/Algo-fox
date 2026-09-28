import { getUserSettings } from "@/actions/user.action";
import { ProjectsSettingsClient } from "@/components/settings/ProjectsSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects | Settings | Algo Fox",
    description: "Update your personal and work projects.",
};

export default async function ProjectsSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <ProjectsSettingsClient user={userSettings} />;
}
