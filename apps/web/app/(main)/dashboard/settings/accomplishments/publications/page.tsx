import { getUserSettings } from "@/actions/user.action";
import { PublicationsSettingsClient } from "@/components/settings/PublicationsSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Publications | Settings | Algo Fox",
    description: "Update your publications and articles.",
};

export default async function PublicationsSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <PublicationsSettingsClient user={userSettings} />;
}
