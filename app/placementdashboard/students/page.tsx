import { getPlacementStudents } from "@/actions/placement-students";
import { PlacementStudentsClient } from "@/components/placementdashboard/PlacementStudentsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PlacementStudentsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.user || (session.user as any).role !== "PLACEMENT_DIRECTOR") {
        redirect("/dashboard");
    }

    const res = await getPlacementStudents();
    
    if (!res.success) {
        return (
            <div className="p-6 text-red-500">
                Failed to load students: {res.error || "Unknown error"}
            </div>
        );
    }

    const students = res.students || [];

    return <PlacementStudentsClient initialStudents={students} />;
}
