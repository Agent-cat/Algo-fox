"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";

function hasPlacementDirectorRole(user: any): user is { role: string } {
    return user && typeof user === "object" && "role" in user && user.role === "PLACEMENT_DIRECTOR";
}

export async function createPlacementJob(data: {
    title: string;
    companyName: string;
    companyAbout?: string;
    companyWebsite?: string;
    companyLogoUrl?: string;
    type: string;
    location: string;
    category: string;
    functions: string;
    ctc: string;
    description: string[];
    requiredSkills: string[];
    additionalInfo?: string;
    attachedDocs: string[];
    targetTags: string[];
    minGpa?: number;
    min10thMarks?: number;
    min12thMarks?: number;
    workflow: { title: string; venue?: string; order: number }[];
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized" };
        }

        const result = await prisma.$transaction(async (tx: any) => {
            // Find or create company
            const company = await tx.company.upsert({
                where: { name: data.companyName },
                update: {},
                create: {
                    name: data.companyName,
                    about: data.companyAbout,
                    website: data.companyWebsite,
                    logoUrl: data.companyLogoUrl,
                }
            });

            // Create job
            const job = await tx.placementJob.create({
                data: {
                    title: data.title,
                    companyId: company.id,
                    type: data.type,
                    location: data.location,
                    category: data.category,
                    functions: data.functions,
                    ctc: data.ctc,
                    description: data.description,
                    requiredSkills: data.requiredSkills,
                    additionalInfo: data.additionalInfo,
                    attachedDocs: data.attachedDocs,
                    minGpa: data.minGpa,
                    min10thMarks: data.min10thMarks,
                    min12thMarks: data.min12thMarks,
                    status: "Open",
                    targetTags: data.targetTags,
                    workflow: {
                        create: data.workflow.map(step => ({
                            title: step.title,
                            venue: step.venue,
                            order: step.order
                        }))
                    }
                }
            });

            return job;
        });

        revalidatePath("/placementdashboard/placement-drive");
        return { success: true, job: result };
    } catch (error: any) {
        console.error("Failed to create placement job:", error);
        return { success: false, error: "An error occurred while creating the placement job." };
    }
}

export async function getPlacementJobs() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user || !hasPlacementDirectorRole(session.user)) {
            return { success: false, error: "Unauthorized", jobs: [] };
        }

        const jobs = await prisma.placementJob.findMany({
            include: {
                company: true,
                workflow: {
                    orderBy: { order: "asc" }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return { success: true, jobs };
    } catch (error: any) {
        console.error("Failed to fetch placement jobs:", error);
        return { success: false, error: "An error occurred while fetching placement jobs.", jobs: [] };
    }
}

export async function getEligiblePlacementJobs() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        if (!user) return { success: false, error: "User not found" };

        const userTags = user.tags || [];

        const jobs = await prisma.placementJob.findMany({
            where: {
                status: "Open", // typically students only see open jobs, but let's just use the group filter
                OR: [
                    { targetTags: { isEmpty: true } },
                    { targetTags: { hasSome: userTags } }
                ]
            },
            include: {
                company: true,
                workflow: {
                    orderBy: { order: "asc" }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        const edu = (user.educationDetails || {}) as any;
        const currentCgpa = parseFloat(edu.currentCourse?.cgpa) || 0;
        let tenthMarks = 0;
        let twelfthMarks = 0;
        
        if (Array.isArray(edu.previousEducations)) {
            const tenth = edu.previousEducations.find((e: any) => e.educationType?.includes("10") || e.program?.includes("10"));
            if (tenth) tenthMarks = parseFloat(tenth.score) || 0;
            
            const twelfth = edu.previousEducations.find((e: any) => e.educationType?.includes("12") || e.program?.includes("12"));
            if (twelfth) twelfthMarks = parseFloat(twelfth.score) || 0;
        }

        const jobsWithEligibility = jobs.map(job => ({
            ...job,
            isEligible: (!job.minGpa || currentCgpa >= job.minGpa) &&
                        (!job.min10thMarks || tenthMarks >= job.min10thMarks) &&
                        (!job.min12thMarks || twelfthMarks >= job.min12thMarks)
        }));

        return { success: true, jobs: jobsWithEligibility };
    } catch (error: any) {
        console.error("Failed to fetch eligible placement jobs:", error);
        return { success: false, error: "An error occurred while fetching eligible placement jobs.", jobs: [] };
    }
}
