import { getUserSettings } from "@/actions/user.action";
import { SkillsSettingsClient } from "@/components/settings/SkillsSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skills & Languages | Settings | Algo Fox",
    description: "Update your technical skills, languages, and subjects.",
};

export default async function SkillsSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <SkillsSettingsClient user={userSettings} />;
}
