"use server";

import { prisma } from "@/lib/prisma";

import { ProblemDomain } from "@prisma/client";

export async function searchTags(query: string) {
    try {
        const tags = await prisma.tag.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                },
            },
            take: 10,
            orderBy: {
                name: 'asc'
            }
        });

        return { success: true, tags };
    } catch (error) {
         console.error("Failed to search tags:", error);
        return { success: false, error: "Failed to search tags" };
    }
}

export async function getAllTags(domain?: ProblemDomain) {
    try {
        const tags = await prisma.tag.findMany({
            where: domain ? {
                problems: {
                    some: {
                        domain: domain
                    }
                }
            } : {},
            orderBy: {
                name: 'asc'
            }
        });

        return { success: true, tags };
    } catch (error) {
         console.error("Failed to get all tags:", error);
        return { success: false, error: "Failed to get all tags" };
    }
}

export async function createTag(name: string) {
    try {
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

        const tag = await prisma.tag.upsert({
            where: { slug },
            update: {},
            create: {
                name,
                slug,
            },
        });

        return { success: true, tag };
    } catch (error) {
         console.error("Failed to create tag:", error);
        return { success: false, error: "Failed to create tag" };
    }
}
