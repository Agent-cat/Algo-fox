import { getUserSettings } from "@/actions/user.action";
import { ResumeSettingsClient } from "@/components/settings/ResumeSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resume | Settings | Algo Fox",
    description: "Upload and manage your resumes.",
};

export default async function ResumeSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <ResumeSettingsClient user={userSettings} />;
}
