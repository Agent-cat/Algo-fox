"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
    Loader2, X, Trophy, Calendar, Users,
    Globe, School, BookOpen, Plus, CheckCircle2, Layers,
    ChevronRight, ChevronLeft, Image, FileText, Award, Settings,
    Code, Database, Eye, EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { createContest, getInstitutionalClassrooms, createContestWithProblems } from "@/actions/contest";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import ProblemForm from "@/components/admin/ProblemForm";
import { ProblemDomain } from "@prisma/client";

// Extended contest schema with new fields
const contestSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    visibility: z.enum(["PUBLIC", "INSTITUTION", "CLASSROOM"]),
    hidden: z.boolean(),
    classroomId: z.string().optional(),
    backgroundImage: z.string().optional(),
    prizes: z.string().optional(),
    rules: z.string().optional(),
    problems: z.array(z.object({
        id: z.string(),
        title: z.string(),
        domain: z.enum(["DSA", "SQL"]),
    })).optional(), // Optional in schema, validated manually on step 3
});

type FormData = z.infer<typeof contestSchema>;

interface ContestProblem {
    id: string;
    title: string;
    domain: "DSA" | "SQL";
    data: any; // Full problem data
}

interface CreateContestWizardProps {
    institutionId: string | null;
    userId: string;
    userRole: string;
}

export function CreateContestWizard({ institutionId, userId, userRole }: CreateContestWizardProps) {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [classrooms, setClassrooms] = useState<any[]>([]);
    const [contestProblems, setContestProblems] = useState<ContestProblem[]>([]);
    const [showProblemForm, setShowProblemForm] = useState<"DSA" | "SQL" | null>(null);
    const [isCreatingProblem, setIsCreatingProblem] = useState(false);

    const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(contestSchema),
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            startTime: "",
            endTime: "",
            visibility: userRole === "CONTEST_MANAGER" ? (institutionId ? "INSTITUTION" : "CLASSROOM") : "PUBLIC",
            hidden: false,
            classroomId: "",
            backgroundImage: "",
            prizes: "",
            rules: "",
            problems: [],
        } as Partial<FormData>,
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const visibility = watch("visibility");
    const isHidden = watch("hidden");
    const isContestManager = userRole === "CONTEST_MANAGER";

    // Fetch classrooms if institution visibility or classroom visibility is selected
    useEffect(() => {
        if (institutionId && (visibility === "CLASSROOM" || visibility === "INSTITUTION")) {
            getInstitutionalClassrooms(institutionId).then(res => {
                if (res.success) setClassrooms(res.classrooms || []);
            });
        }
    }, [visibility, institutionId]);

    // Auto-generate slug from title
    const title = watch("title");
    useEffect(() => {
        if (title && currentStep === 1) {
            const autoSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setValue("slug", autoSlug);
        }
    }, [title, currentStep, setValue]);

    const handleProblemSubmit = async (data: any, domain: "DSA" | "SQL") => {
        setIsCreatingProblem(true);
        try {
            // Create a temporary problem object (will be saved when contest is created)
            const problemId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const newProblem: ContestProblem = {
                id: problemId,
                title: data.title,
                domain,
                data: { ...data, domain },
            };
            setContestProblems(prev => [...prev, newProblem]);
            setValue("problems", [...contestProblems, newProblem].map(p => ({ id: p.id, title: p.title, domain: p.domain })));
            setShowProblemForm(null);
            toast.success(`${domain} problem added successfully!`);
        } catch (error) {
            toast.error("Failed to add problem");
        } finally {
            setIsCreatingProblem(false);
        }
    };

    const removeProblem = (problemId: string) => {
        const updated = contestProblems.filter(p => p.id !== problemId);
        setContestProblems(updated);
        setValue("problems", updated.map(p => ({ id: p.id, title: p.title, domain: p.domain })));
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();

        if (currentStep === 1) {
            const isValid = await trigger(["title", "slug", "startTime", "endTime"]);
            if (!isValid) {
                toast.error("Please fill in all required fields");
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            const fields: (keyof FormData)[] = ["visibility"];
            if (visibility === "CLASSROOM") {
                fields.push("classroomId");
            }
            const isValid = await trigger(fields);
            if (!isValid) {
                toast.error("Please complete all required fields");
                return;
            }
            setCurrentStep(3);
        }
    };

    const onSubmit = async (data: FormData) => {
        // Only submit on final step
        if (currentStep < 3) {
            return;
        }

        // Validate problems on final step
        if (contestProblems.length === 0) {
            toast.error("Please add at least one problem");
            return;
        }

        setIsLoading(true);
        try {
            const res = await createContestWithProblems({
                ...data,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                institutionId: visibility !== "PUBLIC" ? institutionId : null,
                problems: contestProblems.map(p => p.data),
            });

            if (res.success) {
                toast.success("Contest created successfully!");
                router.push(`/contest/${res.contestId}`);
            } else {
                toast.error(res.error || "Failed to create contest");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const steps = [
        { id: 1, name: "General Details", icon: BookOpen },
        { id: 2, name: "Customization & Rules", icon: Settings },
        { id: 3, name: "Problem Management", icon: Layers },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            {/* Problem Form Modal - Outside main form to avoid nested forms */}
            {showProblemForm && currentStep === 3 && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10 rounded-t-2xl">
                            <h2 className="text-2xl font-bold text-gray-900">Create {showProblemForm} Problem</h2>
                            <button
                                type="button"
                                onClick={() => setShowProblemForm(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <ProblemForm
                                onSubmit={async (data) => {
                                    await handleProblemSubmit(data, showProblemForm);
                                    return { success: true };
                                }}
                                submitLabel={`Add ${showProblemForm} Problem`}
                                domain={showProblemForm}
                                redirectPath={undefined}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;
                        return (
                            <div key={step.id} className="flex items-center flex-1">
                                <div className="flex flex-col items-center flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "border-orange-500 bg-orange-50 text-orange-600" :
                                            isCompleted ? "border-green-500 bg-green-50 text-green-600" :
                                                "border-gray-300 bg-white text-gray-400"
                                        }`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`mt-2 text-sm font-medium ${isActive ? "text-orange-600" :
                                            isCompleted ? "text-green-600" :
                                                "text-gray-400"
                                        }`}>
                                        {step.name}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"
                                        }`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: General Details */}
                {currentStep === 1 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-orange-600" />
                            General Details
                        </h2>

                        <div className="grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contest Name</label>
                                <input
                                    {...register("title")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    placeholder="e.g. Weekly DSA Challenge #1"
                                />
                                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Custom Contest URL (Slug)</label>
                                <input
                                    {...register("slug")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all font-mono text-sm"
                                    placeholder="weekly-dsa-challenge-1"
                                />
                                {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
                                <p className="text-xs text-gray-500 mt-1">URL will be: /contest/your-slug</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            {...register("startTime")}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                        />
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.startTime && <p className="text-xs text-red-500 mt-1">{errors.startTime.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                                    <div className="relative">
                                        <input
                                            type="datetime-local"
                                            {...register("endTime")}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                        />
                                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.endTime && <p className="text-xs text-red-500 mt-1">{errors.endTime.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Customization & Rules */}
                {currentStep === 2 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-orange-600" />
                            Customization & Rules
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Image className="w-4 h-4" />
                                    Landing Page Background Image URL
                                </label>
                                <input
                                    {...register("backgroundImage")}
                                    type="url"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Rich Text Description (Markdown)
                                </label>
                                <textarea
                                    {...register("description")}
                                    rows={8}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none font-mono text-sm"
                                    placeholder="Describe the contest, topics covered, and any important information..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <Award className="w-4 h-4" />
                                    Prizes
                                </label>
                                <textarea
                                    {...register("prizes")}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                                    placeholder="List prizes, rewards, or recognition for winners..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Rules
                                </label>
                                <textarea
                                    {...register("rules")}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                                    placeholder="Contest rules, guidelines, and scoring logic..."
                                />
                            </div>

                            {/* Visibility Settings */}
                            <div className="border-t pt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">Contest Visibility</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setValue("hidden", false)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${!isHidden
                                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        <Eye className="w-4 h-4" />
                                        <span className="font-medium">Visible</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setValue("hidden", true)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${isHidden
                                                ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                            }`}
                                    >
                                        <EyeOff className="w-4 h-4" />
                                        <span className="font-medium">Hidden</span>
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {isHidden
                                        ? "Contest will be hidden from public view and only accessible to authorized users."
                                        : "Contest will be visible to the selected target audience."}
                                </p>
                            </div>

                            {/* Target Audience */}
                            <div className="border-t pt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-4">Target Audience</label>
                                <div className="space-y-3">
                                    {!isContestManager && (
                                        <label className={`flex items-center gap-3 p-4 border-2 cursor-pointer transition-all rounded-lg ${visibility === 'PUBLIC' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}>
                                            <input type="radio" {...register("visibility")} value="PUBLIC" className="hidden" />
                                            <div className={`p-2 ${visibility === 'PUBLIC' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'} rounded`}>
                                                <Globe className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="block font-semibold text-gray-900">Public</span>
                                                <span className="text-xs text-gray-500">Visible to everyone</span>
                                            </div>
                                            {visibility === 'PUBLIC' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                                        </label>
                                    )}

                                    {institutionId && (
                                        <>
                                            <label className={`flex items-center gap-3 p-4 border-2 cursor-pointer transition-all rounded-lg ${visibility === 'INSTITUTION' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <input type="radio" {...register("visibility")} value="INSTITUTION" className="hidden" />
                                                <div className={`p-2 ${visibility === 'INSTITUTION' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'} rounded`}>
                                                    <School className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="block font-semibold text-gray-900">Entire Institute</span>
                                                    <span className="text-xs text-gray-500">Only for your organization</span>
                                                </div>
                                                {visibility === 'INSTITUTION' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                                            </label>

                                            <label className={`flex items-center gap-3 p-4 border-2 cursor-pointer transition-all rounded-lg ${visibility === 'CLASSROOM' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}>
                                                <input type="radio" {...register("visibility")} value="CLASSROOM" className="hidden" />
                                                <div className={`p-2 ${visibility === 'CLASSROOM' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'} rounded`}>
                                                    <Users className="w-4 h-4" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="block font-semibold text-gray-900">Specific Classroom</span>
                                                    <span className="text-xs text-gray-500">Target a single batch</span>
                                                </div>
                                                {visibility === 'CLASSROOM' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                                            </label>
                                        </>
                                    )}
                                </div>

                                {visibility === "CLASSROOM" && (
                                    <div className="pt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Classroom</label>
                                        <select
                                            {...register("classroomId")}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                        >
                                            <option value="">Choose a classroom...</option>
                                            {classrooms.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name} {c.section ? `(${c.section})` : ""}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.classroomId && <p className="text-xs text-red-500 mt-1">{errors.classroomId.message}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Problem Management */}
                {currentStep === 3 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                            <Layers className="w-5 h-5 text-orange-600" />
                            Problem Management
                        </h2>
                        <p className="text-sm text-gray-600">
                            Add problems exclusively for this contest. These problems will not appear in the public problem bank.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setShowProblemForm("DSA")}
                                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                                        <Code className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">Add DSA Problem</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Create a new DSA problem specifically for this contest
                                </p>
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowProblemForm("SQL")}
                                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">Add SQL Problem</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Create a new SQL problem specifically for this contest
                                </p>
                            </button>
                        </div>

                        {/* List of added problems */}
                        {contestProblems.length > 0 && (
                            <div className="border-t pt-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Added Problems ({contestProblems.length})
                                </h3>
                                <div className="space-y-2">
                                    {contestProblems.map((problem, index) => (
                                        <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 text-xs font-semibold text-gray-600 rounded">
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{problem.title}</p>
                                                    <span className={`text-xs font-semibold ${problem.domain === 'DSA' ? 'text-orange-600' : 'text-blue-600'
                                                        }`}>
                                                        {problem.domain}
                                                    </span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeProblem(problem.id)}
                                                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-red-600 transition-colors rounded"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {errors.problems && (
                            <p className="text-xs text-red-500">{errors.problems.message as string}</p>
                        )}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => {
                            if (currentStep > 1) {
                                setCurrentStep(prev => prev - 1);
                            } else {
                                router.back();
                            }
                        }}
                        className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        {currentStep === 1 ? "Cancel" : "Previous"}
                    </button>

                    <div className="flex items-center gap-2">
                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-2 px-6 py-2 bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors rounded-lg"
                            >
                                Next
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isLoading || contestProblems.length === 0}
                                className="flex items-center gap-2 px-8 py-2 bg-gray-900 text-white font-semibold hover:bg-orange-600 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <Trophy className="w-4 h-4" />
                                        Create Contest
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

