import { getPlacementStudents } from "@/actions/placement-students";
import { PlacementStudentsClient } from "@/components/placementdashboard/PlacementStudentsClient";

export default async function PlacementStudentsPage() {
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
