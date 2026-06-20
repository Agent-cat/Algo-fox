export type JobStatus = "Applications closed" | "Applied" | "Open";
export type JobCategory = "All Jobs" | "Applied Jobs";

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    timeAgo: string;
    status: string;
    type: string;
    category: string;
    functions: string;
    ctc: string;
    isEligible: boolean;
    description: string[];
    skills: string[];
    logoUrl?: string;
    additionalInfo?: string;
    companyAbout?: string;
    companyWebsite?: string;
    workflow?: { title: string; venue?: string; order: number }[];
    minGpa?: number;
    min10thMarks?: number;
    min12thMarks?: number;
}
