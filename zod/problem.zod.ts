import { z } from "zod";

export const problemSchema = z.object({
    title: z.string(),
    description: z.string(),
    hidden: z.boolean().default(true),
    slug: z.string(),
    solved: z.number().default(0),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("EASY"),
    score: z.number().int().default(0),
    submissions: z.array(z.string()).default([]),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string(),
    })).default([]),
    createdAt: z.date().default(new Date()),
    updatedAt: z.date().default(new Date()),
});
