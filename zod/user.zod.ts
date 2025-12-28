import { z } from "zod";

export const onboardingSchema = z.object({
    bio: z.string().optional(),
    collageId: z.string().min(1, "College ID/Name is required"),
    leetCodeHandle: z.string().optional(),
    codeChefHandle: z.string().optional(),
    hackerrankHandle: z.string().optional(),
    githubHandle: z.string().optional(),
});
