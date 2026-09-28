import { getUserSettings } from "@/actions/user.action";
import { AwardsSettingsClient } from "@/components/settings/AwardsSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awards & Recognitions | Settings | Algo Fox",
    description: "Update your awards and recognitions.",
};

export default async function AwardsSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <AwardsSettingsClient user={userSettings} />;
}
