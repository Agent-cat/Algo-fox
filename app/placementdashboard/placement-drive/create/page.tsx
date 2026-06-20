
import { PlacementDriveWizardClient } from "@/components/placementdashboard/PlacementDriveWizardClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CreatePlacementDrivePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
        redirect("/dashboard");
    }

    const { getStudentTagCounts } = await import("@/actions/placement-students");
    const res = await getStudentTagCounts();
    const availableTags = res.success && res.tags ? res.tags : [];

    return <PlacementDriveWizardClient availableTags={availableTags} />;
}
