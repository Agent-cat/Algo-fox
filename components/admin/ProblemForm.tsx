"use client";

import { useState } from "react";
import { Difficulty, ProblemDomain } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TagInput } from "./TagInput";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    difficulty: z.nativeEnum(Difficulty),
    hidden: z.boolean(),
    hiddenQuery: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    testCases: z.array(z.object({
        input: z.string(),
        output: z.string(),
        hidden: z.boolean().optional()
    })).min(1, "At least one test case is required")
});

type FormValues = z.infer<typeof formSchema>;

interface ProblemFormProps {
    initialData?: Omit<Partial<FormValues>, "tags"> & { tags?: { name: string; slug: string }[] };
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    submitLabel: string;
    domain?: ProblemDomain;
    redirectPath?: string;
}

export default function ProblemForm({ initialData, onSubmit, submitLabel, domain = "DSA", redirectPath }: ProblemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTags, setSelectedTags] = useState<{ name: string, slug: string }[]>(initialData?.tags || []);
    const router = useRouter();

    const { register, control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            difficulty: initialData?.difficulty || "EASY",
            hidden: domain === "DSA" ? false : (initialData?.hidden ?? false),
            hiddenQuery: initialData?.hiddenQuery || "",
            testCases: initialData?.testCases?.length ? initialData.testCases : [{ input: "", output: "", hidden: false }],
            tags: initialData?.tags?.map(t => t.slug) || []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "testCases"
    });

    const hiddenValue = watch("hidden");

    const steps = [
        { id: 1, name: "Basic Details" },
        { id: 2, name: "Description" },
        { id: 3, name: "Test Cases" }
    ];

    const handleNext = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await trigger(["title", "slug", "difficulty"]);
        } else if (currentStep === 2) {
            isValid = await trigger(["description"]);
        }

        if (isValid) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    async function onSubmitForm(data: FormValues) {
        setIsLoading(true);

        const submissionData = {
            ...data,
            hidden: domain === "DSA" ? false : data.hidden,
            hiddenQuery: domain === "SQL" ? (data.hiddenQuery?.trim() || null) : null,
            domain,
            tags: selectedTags.map(t => t.slug),
        };

        const res = await onSubmit(submissionData);

        if (res.success) {
            toast.success("Saved successfully");
            if (redirectPath !== undefined) {
                router.push(redirectPath || "/admin/problems");
                router.refresh();
            }
        } else {
            toast.error(res.error || "Something went wrong");
        }
        setIsLoading(false);
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden">
            {/* Steps Header */}
            <div className="border-b border-gray-100 bg-gray-50/50 p-6">
                <div className="flex items-center justify-between max-w-2xl mx-auto">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-3">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors
                                ${currentStep >= step.id ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"}
                            `}>
                                {step.id}
                            </div>
                            <span className={`text-sm font-medium ${currentStep >= step.id ? "text-gray-900" : "text-gray-400"}`}>
                                {step.name}
                            </span>
                            {step.id < 3 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
                        </div>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmitForm)} className="p-8">
                {/* Step 1: Basics */}
                {currentStep === 1 && (
                    <div className="space-y-6 max-w-2xl mx-auto animation-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Problem Title</label>
                            <input
                                {...register("title")}
                                placeholder="e.g. Two Sum"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                            />
                            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Slug</label>
                            <input
                                {...register("slug")}
                                placeholder="e.g. two-sum"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                            />
                            {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                        </div>

                        <div className={`grid gap-6 ${domain === "SQL" ? "grid-cols-2" : "grid-cols-1"}`}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Difficulty</label>
                                <select
                                    {...register("difficulty")}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all bg-white font-medium text-gray-700"
                                >
                                    <option value="EASY">Easy</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HARD">Hard</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Tags</label>
                                <TagInput
                                    value={selectedTags}
                                    onChange={(newTags) => {
                                        setSelectedTags(newTags);
                                        setValue("tags", newTags.map(t => t.slug));
                                    }}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Hidden</label>
                                {domain === "SQL" && (
                                    <div className="space-y-2 flex flex-col justify-end">
                                        <button
                                            type="button"
                                            onClick={() => setValue("hidden", !hiddenValue)}
                                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors border ${hiddenValue
                                                ? "bg-gray-50 text-gray-600 border-gray-200"
                                                : "bg-green-50 text-green-700 border-green-200"
                                                }`}
                                        >
                                            {hiddenValue ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            {hiddenValue ? "Hidden Problem" : "Visible Problem"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Description */}
                {currentStep === 2 && (
                    <div className="space-y-4 max-w-4xl mx-auto animation-fade-in">
                        <label className="text-sm font-semibold text-gray-700">Description (Markdown)</label>
                        <textarea
                            {...register("description")}
                            rows={15}
                            placeholder="# Problem Description..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-mono text-sm leading-relaxed text-gray-900"
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}

                        {/* Hidden Query field - only for SQL domain */}
                        {domain === "SQL" && (
                            <div className="space-y-2 mt-6">
                                <label className="text-sm font-semibold text-gray-700">
                                    Hidden Query (Optional)
                                    <span className="text-xs text-gray-500 font-normal ml-2">
                                        This SQL query will be prepended to the user's code before execution
                                    </span>
                                </label>
                                <textarea
                                    {...register("hiddenQuery")}
                                    rows={5}
                                    placeholder="-- e.g. CREATE TABLE temp_table AS SELECT * FROM ..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-mono text-sm leading-relaxed text-gray-900"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Step 3: Test Cases */}
                {currentStep === 3 && (
                    <div className="space-y-6 max-w-3xl mx-auto animation-fade-in">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Test Cases</h3>
                            <button
                                type="button"
                                onClick={() => append({ input: "", output: "", hidden: false })}
                                className="flex items-center gap-2 px-3 py-1.5 text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Case
                            </button>
                        </div>

                        <div className="space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:border-orange-200 transition-colors">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-medium text-gray-500">INPUT</label>
                                        <textarea
                                            {...register(`testCases.${index}.input` as const)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-orange-500 outline-none text-sm font-mono"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-medium text-gray-500">OUTPUT</label>
                                        <textarea
                                            {...register(`testCases.${index}.output` as const)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-orange-500 outline-none text-sm font-mono"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-6">
                                        <button type="button" onClick={() => remove(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {errors.testCases && <p className="text-xs text-red-500">{errors.testCases.root?.message || "Invalid test cases"}</p>}
                        </div>
                    </div>
                )}

                {/* Footer Actions */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Back
                    </button>

                    {currentStep < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Next Step
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-8 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors disabled:opacity-70 flex items-center gap-2"
                        >
                            {isLoading ? "Saving..." : submitLabel}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
