import { getUserSettings } from "@/actions/user.action";
import { PatentsSettingsClient } from "@/components/settings/PatentsSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Patents | Settings | Algo Fox",
    description: "Update your patents.",
};

export default async function PatentsSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <PatentsSettingsClient user={userSettings} />;
}
