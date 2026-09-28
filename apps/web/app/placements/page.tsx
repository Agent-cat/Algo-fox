import { getEligiblePlacementJobs } from "@/actions/placement";
import PlacementsClientPage from "@/components/placements/PlacementsClientPage";

export default async function PlacementsPage() {
    const res = await getEligiblePlacementJobs();
    const rawJobs = res?.jobs || [];
    const formattedJobs = rawJobs.map((job: any) => ({
        id: job.id,
        title: job.title,
        company: job.company?.name || "Unknown Company",
        companyAbout: job.company?.about,
        companyWebsite: job.company?.website,
        location: job.location,
        timeAgo: "Recently", // Simplified for now
        status: job.status,
        type: job.type,
        category: job.category,
        functions: job.functions,
        ctc: job.ctc,
        minGpa: job.minGpa,
        min10thMarks: job.min10thMarks,
        min12thMarks: job.min12thMarks,
        isEligible: job.isEligible ?? true,
        description: job.description,
        skills: job.requiredSkills,
        additionalInfo: job.additionalInfo,
        workflow: job.workflow
    }));

    return <PlacementsClientPage initialJobs={formattedJobs} />;
}
