import { getUserSettings } from "@/actions/user.action";
import { CertificatesSettingsClient } from "@/components/settings/CertificatesSettingsClient";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certificates | Settings | Algo Fox",
    description: "Update your certifications and licenses.",
};

export default async function CertificatesSettingsPage() {
    const userSettings = await getUserSettings();

    if (!userSettings) {
        redirect("/login");
    }

    return <CertificatesSettingsClient user={userSettings} />;
}
