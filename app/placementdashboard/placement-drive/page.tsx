import { getPlacementJobs } from "@/actions/placement";
import { PlacementDriveClient } from "@/components/placementdashboard/PlacementDriveClient";

export default async function PlacementDrivePage() {
    const res = await getPlacementJobs();
    
    if (!res.success) {
        return (
            <div className="p-6 text-red-500">
                Failed to load placement jobs: {res.error || "Unknown error"}
            </div>
        );
    }

    const jobs = res.jobs || [];
    
    return <PlacementDriveClient initialJobs={jobs} />;
}
