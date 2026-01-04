"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Content (Markdown) is required"),
    hidden: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

interface ConceptFormProps {
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    submitLabel?: string;
    initialData?: Partial<FormValues>;
}

export default function ConceptForm({ onSubmit, submitLabel = "Create Concept", initialData }: ConceptFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            hidden: initialData?.hidden || false,
        }
    });

    async function onSubmitForm(data: FormValues) {
        setIsLoading(true);

        const submissionData = {
            ...data,
            difficulty: "CONCEPT",
            testCases: [], // No test cases for concepts
            tags: [],
        };

        const res = await onSubmit(submissionData);

        if (res.success) {
            toast.success("Concept created successfully");
        } else {
            toast.error(res.error || "Something went wrong");
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Concept Title</label>
                <input
                    {...register("title")}
                    placeholder="e.g. Introduction to Arrays"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Slug</label>
                <input
                    {...register("slug")}
                    placeholder="e.g. intro-arrays"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                />
                {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Content (Markdown)</label>
                <textarea
                    {...register("description")}
                    rows={12}
                    placeholder="# Introduction..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-mono text-sm leading-relaxed text-gray-900"
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors disabled:opacity-70"
                >
                    {isLoading ? "Saving..." : submitLabel}
                </button>
            </div>
        </form>
    );
}
