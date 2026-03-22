"use client";

import { useState, useEffect } from "react";
import { Difficulty, ProblemDomain } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Plus, Trash2, Eye, EyeOff, Code2, Check,
    FileText, BookOpen, FlaskConical, Braces, ChevronRight, ChevronLeft
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TagInput } from "./TagInput";
import FunctionTemplateEditor, { FunctionTemplate } from "./FunctionTemplateEditor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCategories } from "@/actions/category.action";

// FUNCTION TEMPLATE SCHEMA
const functionTemplateSchema = z.object({
    languageId: z.number(),
    functionTemplate: z.string(),
    driverCode: z.string(),
});

// FORM SCHEMA
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    difficulty: z.nativeEnum(Difficulty),
    hidden: z.boolean(),
    hiddenQuery: z.string().optional().nullable(),
    tags: z.array(z.string()).optional(),
    testCases: z.array(z.object({
        input: z.string().optional(),
        output: z.string().optional(),
        hidden: z.boolean().optional()
    })).optional(),
    useFunctionTemplate: z.boolean().optional(),
    functionTemplates: z.array(functionTemplateSchema).optional(),
    solution: z.string().optional().nullable(),
    isMcq: z.boolean().optional(),
    options: z.array(z.string()).optional(),
    answer: z.string().optional(),
    categoryId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProblemFormProps {
    initialData?: Omit<Partial<FormValues>, "tags"> & {
        tags?: { name: string; slug: string }[];
        useFunctionTemplate?: boolean;
        functionTemplates?: FunctionTemplate[];
    };
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    submitLabel: string;
    domain?: ProblemDomain;
    redirectPath?: string;
}

function MarkdownPreview({ content, placeholder }: { content: string; placeholder?: string }) {
    if (!content?.trim()) {
        return (
            <div className="w-full h-full min-h-[480px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-3">
                <BookOpen className="w-10 h-10 opacity-30" />
                <span className="text-sm italic">{placeholder || "Nothing to preview yet..."}</span>
            </div>
        );
    }
    return (
        <div className="w-full min-h-[480px] px-2 py-4 overflow-auto prose prose-base dark:prose-invert max-w-none
            prose-pre:bg-[#1e1e2e] prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-700/40
            prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a2e] prose-code:rounded prose-code:px-1.5 prose-code:text-[0.85em]
            prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold
            prose-a:text-orange-500 prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-blockquote:border-orange-400 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    );
}

const DIFFICULTY_OPTIONS = [
    { value: "EASY", label: "Easy", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30" },
    { value: "MEDIUM", label: "Medium", color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
    { value: "HARD", label: "Hard", color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30" },
];

export default function ProblemForm({ initialData, onSubmit, submitLabel, domain = "DSA", redirectPath }: ProblemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTags, setSelectedTags] = useState<{ name: string, slug: string }[]>(initialData?.tags || []);
    const [descriptionPreview, setDescriptionPreview] = useState(false);
    const [solutionPreview, setSolutionPreview] = useState(false);
    const [useFunctionTemplate, setUseFunctionTemplate] = useState(initialData?.useFunctionTemplate || false);
    const [functionTemplates, setFunctionTemplates] = useState<FunctionTemplate[]>(initialData?.functionTemplates || []);
    const [fetchedCategories, setFetchedCategories] = useState<any[]>([]);

    useEffect(() => {
        if (initialData?.useFunctionTemplate !== undefined) setUseFunctionTemplate(initialData.useFunctionTemplate);
        if (initialData?.functionTemplates) setFunctionTemplates(initialData.functionTemplates);

        // Fetch categories for the domain
        const loadCategories = async () => {
            const res = await getCategories(domain);
            if (res.categories) {
                // Build tree
                const map = new Map();
                res.categories.forEach((cat: any) => map.set(cat.id, { ...cat, children: [] }));
                const roots: any[] = [];
                res.categories.forEach((cat: any) => {
                    const node = map.get(cat.id);
                    if (cat.parentId && map.has(cat.parentId)) {
                        map.get(cat.parentId).children.push(node);
                    } else {
                        roots.push(node);
                    }
                });

                // Flatten tree for select
                const flatten = (nodes: any[], level = 0): any[] => {
                    let result: any[] = [];
                    nodes.sort((a, b) => a.order - b.order).forEach(node => {
                        result.push({ ...node, level });
                        if (node.children) {
                            result = [...result, ...flatten(node.children, level + 1)];
                        }
                    });
                    return result;
                };

                setFetchedCategories(flatten(roots));
            }
        };
        loadCategories();
    }, [initialData, domain]);

    const router = useRouter();
    const isDSA = domain === "DSA";
    const isAptitude = domain === "APTITUDE";
    const totalSteps = isDSA ? 5 : isAptitude ? 3 : 4;

    const { register, control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            difficulty: initialData?.difficulty || "EASY",
            hidden: initialData?.hidden || false,
            hiddenQuery: initialData?.hiddenQuery || "",
            testCases: initialData?.testCases?.length ? initialData.testCases : [{ input: "", output: "", hidden: false }],
            tags: initialData?.tags?.map(t => t.slug) || [],
            useFunctionTemplate: initialData?.useFunctionTemplate || false,
            functionTemplates: initialData?.functionTemplates || [],
            solution: initialData?.solution || "",
            isMcq: initialData?.isMcq || domain === "APTITUDE",
            options: (initialData as any)?.options || ["", "", "", ""],
            answer: (initialData as any)?.answer || "",
            categoryId: (initialData as any)?.categoryId || "",
        }
    });

    const { fields, append, remove } = useFieldArray({ control, name: "testCases" });

    const hiddenValue = watch("hidden");
    const difficultyValue = watch("difficulty");
    const descriptionValue = watch("description") || "";
    const solutionValue = watch("solution") || "";
    const titleValue = watch("title") || "";

    const steps = isDSA
        ? [
            { id: 1, name: "Basics", icon: FileText, desc: "Title, slug & settings" },
            { id: 2, name: "Description", icon: BookOpen, desc: "Problem statement" },
            { id: 3, name: "Solution", icon: Code2, desc: "Editorial & explanation" },
            { id: 4, name: "Test Cases", icon: FlaskConical, desc: "Input/output pairs" },
            { id: 5, name: "Templates", icon: Braces, desc: "Starter code" },
        ]
        : isAptitude
            ? [
                { id: 1, name: "Basics", icon: FileText, desc: "Title, slug & settings" },
                { id: 2, name: "Description", icon: BookOpen, desc: "Problem statement" },
                { id: 3, name: "Solution", icon: Code2, desc: "Editorial & explanation" },
            ]
            : [
                { id: 1, name: "Basics", icon: FileText, desc: "Title, slug & settings" },
                { id: 2, name: "Description", icon: BookOpen, desc: "Problem statement" },
                { id: 3, name: "Solution", icon: Code2, desc: "Editorial & explanation" },
                { id: 4, name: "Test Cases", icon: FlaskConical, desc: "Input/output pairs" },
            ];

    const handleNext = async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        e?.stopPropagation();
        let isValid = false;
        if (currentStep === 1) isValid = await trigger(["title", "slug", "difficulty"]);
        else if (currentStep === 2) isValid = await trigger(["description"]);
        else if (currentStep === 3) isValid = await trigger(["solution"]);
        else if (currentStep === 4 && !isAptitude) isValid = await trigger(["testCases"]);
        else isValid = true;
        if (isValid && currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
            setDescriptionPreview(false);
            setSolutionPreview(false);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        setDescriptionPreview(false);
        setSolutionPreview(false);
    };

    const handleStepClick = async (stepId: number) => {
        if (stepId < currentStep) {
            setCurrentStep(stepId);
            setDescriptionPreview(false);
            setSolutionPreview(false);
        }
    };

    async function onSubmitForm(data: FormValues) {
        if (isLoading) return;
        setIsLoading(true);
        const submissionData = {
            ...data,
            hidden: data.hidden,
            hiddenQuery: domain === "SQL" ? (data.hiddenQuery?.trim() || null) : null,
            domain,
            tags: selectedTags.map(t => t.slug),
            useFunctionTemplate: isDSA ? useFunctionTemplate : false,
            functionTemplates: isDSA && useFunctionTemplate ? functionTemplates : [],
            isMcq: data.isMcq,
            options: data.isMcq ? data.options?.filter(o => o.trim() !== "") : [],
            answer: data.isMcq ? data.answer : null,
            testCases: isAptitude ? [] : data.testCases,
            categoryId: data.categoryId || null,
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

    const progressPct = Math.round((currentStep / totalSteps) * 100);

    const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2a2a2a] focus:border-orange-500 dark:focus:border-orange-400 focus:ring-0 outline-none transition-all text-gray-900 dark:text-white bg-white dark:bg-[#111] placeholder:text-gray-400 dark:placeholder:text-gray-600 text-sm";
    const labelCls = "block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2";

    return (
        <div className="w-full">

            {/* ── TOP PROGRESS BAR ── */}
            <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-200 dark:bg-[#222]">
                <div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500 ease-out"
                    style={{ width: `${progressPct}%` }}
                />
            </div>

            {/* ── STEP NAV (sticky below topbar) ── */}
            <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#1e1e1e]">
                <div className="max-w-6xl mx-auto px-8 py-0">
                    <div className="flex items-stretch">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isActive = currentStep === step.id;
                            const isDone = currentStep > step.id;
                            const isClickable = step.id < currentStep;
                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    onClick={() => handleStepClick(step.id)}
                                    disabled={!isClickable && !isActive}
                                    className={`
                                        relative flex items-center gap-3 px-6 py-4 text-left transition-all
                                        border-b-2 flex-1 group
                                        ${isActive
                                            ? "border-orange-500 text-orange-600 dark:text-orange-400"
                                            : isDone
                                                ? "border-transparent text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                                                : "border-transparent text-gray-300 dark:text-gray-700 cursor-default"
                                        }
                                    `}
                                >
                                    <div className={`
                                        w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                                        ${isActive
                                            ? "bg-orange-500 text-white shadow-md shadow-orange-200 dark:shadow-orange-900/30"
                                            : isDone
                                                ? "bg-gray-100 dark:bg-[#222] text-gray-500 dark:text-gray-400"
                                                : "bg-gray-100 dark:bg-[#1e1e1e] text-gray-400 dark:text-gray-600"
                                        }
                                    `}>
                                        {isDone ? <Check className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{step.id}</span>}
                                    </div>
                                    <div className="hidden sm:block">
                                        <div className={`text-sm font-semibold leading-tight ${isActive ? "text-gray-900 dark:text-white" : ""}`}>
                                            {step.name}
                                        </div>
                                        <div className="text-[11px] text-gray-400 dark:text-gray-600 leading-tight mt-0.5">{step.desc}</div>
                                    </div>
                                    {i < steps.length - 1 && (
                                        <ChevronRight className="w-3.5 h-3.5 text-gray-200 dark:text-gray-700 absolute right-0 top-1/2 -translate-y-1/2" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="max-w-6xl mx-auto px-8">

                    {/* ─── STEP 1: Basics ─── */}
                    {currentStep === 1 && (
                        <div className="py-12 space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Basic Details</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Define the problem identity and visibility settings.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left col */}
                                <div className="space-y-6">
                                    <div>
                                        <label className={labelCls}>Problem Title</label>
                                        <input
                                            {...register("title")}
                                            placeholder="e.g. Two Sum"
                                            className={inputCls}
                                        />
                                        {errors.title && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><span>⚠</span>{errors.title.message}</p>}
                                    </div>

                                    <div>
                                        <label className={labelCls}>URL Slug</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-600 text-sm font-mono">/problems/</span>
                                            <input
                                                {...register("slug")}
                                                placeholder="two-sum"
                                                className={`${inputCls} pl-[5.5rem]`}
                                            />
                                        </div>
                                        {errors.slug && <p className="mt-1.5 text-xs text-red-500">{errors.slug.message}</p>}
                                    </div>

                                    <div>
                                        <label className={labelCls}>Tags</label>
                                        <TagInput
                                            value={selectedTags}
                                            onChange={(newTags) => {
                                                setSelectedTags(newTags);
                                                setValue("tags", newTags.map(t => t.slug));
                                            }}
                                        />
                                    </div>

                                    {(watch("isMcq") || isAptitude) && (
                                        <div className="p-6 rounded-2xl bg-blue-50/30 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/10 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">MCQ Options</label>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" {...register("isMcq")} className="hidden" />
                                                    <span className="text-[10px] text-blue-500/60 font-medium italic">At least 2 required</span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                {[0, 1, 2, 3].map((idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <input
                                                            type="radio"
                                                            value={watch(`options.${idx}`)}
                                                            checked={watch("answer") === watch(`options.${idx}`) && watch("answer") !== "" && !!watch("answer")}
                                                            onChange={() => setValue("answer", watch(`options.${idx}`) || "")}
                                                            className="mt-3.5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        />
                                                        <input
                                                            {...register(`options.${idx}` as const)}
                                                            placeholder={`Option ${idx + 1}`}
                                                            className={`${inputCls} py-2`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="pt-2">
                                                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest block mb-1">Correct Answer</label>
                                                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 truncate bg-white dark:bg-[#111] px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-500/10 min-h-[40px] flex items-center">
                                                    {watch("answer") || "Select correct option using radio button"}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Selection */}
                                    <div className="pt-4">
                                        <label className={labelCls}>Assign to Category</label>
                                        <select
                                            {...register("categoryId")}
                                            className={inputCls}
                                        >
                                            <option value="">No Category (Unassigned)</option>
                                            {fetchedCategories.map(cat => (
                                                <option key={cat.id} value={cat.id}>
                                                    {"\u00A0".repeat(cat.level * 4)}
                                                    {cat.level > 0 ? "↳ " : ""}
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                        <p className="mt-1 text-[10px] text-gray-400">Linking this will show it in "Learn" mode for {domain}.</p>
                                    </div>
                                </div>

                                {/* Right col */}
                                <div className="space-y-6">
                                    <div>
                                        <label className={labelCls}>Difficulty</label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {DIFFICULTY_OPTIONS.map(opt => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => setValue("difficulty", opt.value as Difficulty)}
                                                    className={`
                                                        py-3 px-4 rounded-xl border-2 text-sm font-bold transition-all
                                                        ${difficultyValue === opt.value
                                                            ? opt.color + " border-current scale-[1.02] shadow-sm"
                                                            : "border-gray-200 dark:border-[#222] text-gray-400 dark:text-gray-600 hover:border-gray-300 dark:hover:border-[#333]"
                                                        }
                                                    `}
                                                >
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelCls}>Visibility</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setValue("hidden", false)}
                                                className={`
                                                    flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all
                                                    ${!hiddenValue
                                                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                                                        : "border-gray-200 dark:border-[#222] text-gray-400 dark:text-gray-600"
                                                    }
                                                `}
                                            >
                                                <Eye className="w-4 h-4" /> Visible
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("hidden", true)}
                                                className={`
                                                    flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all
                                                    ${hiddenValue
                                                        ? "border-gray-400 bg-gray-100 dark:bg-[#222] text-gray-700 dark:text-gray-300"
                                                        : "border-gray-200 dark:border-[#222] text-gray-400 dark:text-gray-600"
                                                    }
                                                `}
                                            >
                                                <EyeOff className="w-4 h-4" /> Hidden
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview card */}
                                    <div className="mt-2 p-5 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#1e1e1e]">
                                        <div className="text-xs text-gray-400 dark:text-gray-600 mb-3 font-semibold uppercase tracking-wider">Preview</div>
                                        <div className="font-bold text-gray-900 dark:text-white truncate">
                                            {titleValue || <span className="text-gray-300 dark:text-gray-700 font-normal">Problem title will appear here</span>}
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            {difficultyValue && (
                                                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${DIFFICULTY_OPTIONS.find(d => d.value === difficultyValue)?.color}`}>
                                                    {difficultyValue}
                                                </span>
                                            )}
                                            {selectedTags.slice(0, 3).map(tag => (
                                                <span key={tag.slug} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-200 dark:bg-[#222] text-gray-600 dark:text-gray-400">
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 2: Description ─── */}
                    {currentStep === 2 && (
                        <div className="py-12 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Problem Description</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Write a clear problem statement using Markdown.</p>
                                </div>
                                <div className="flex items-center gap-0.5 p-1 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#2a2a2a] flex-shrink-0">
                                    <button type="button" onClick={() => setDescriptionPreview(false)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${!descriptionPreview ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
                                        <Code2 className="w-3.5 h-3.5" /> Write
                                    </button>
                                    <button type="button" onClick={() => setDescriptionPreview(true)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${descriptionPreview ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
                                        <Eye className="w-3.5 h-3.5" /> Preview
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <div className={descriptionPreview ? "hidden xl:block" : ""}>
                                    <textarea
                                        {...register("description")}
                                        rows={28}
                                        placeholder={"# Problem\n\nDescribe the problem here...\n\n## Constraints\n- 1 ≤ n ≤ 10⁵\n\n## Example\n\n**Input:** nums = [2,7,11,15], target = 9\n**Output:** [0,1]"}
                                        className="w-full h-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-[#2a2a2a] focus:border-orange-400 dark:focus:border-orange-400 focus:ring-0 outline-none font-mono text-sm leading-7 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111] placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none"
                                    />
                                </div>
                                <div className={`rounded-2xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111] px-6 py-2 overflow-y-auto ${descriptionPreview ? "" : "hidden xl:block"}`} style={{ minHeight: 460 }}>
                                    <MarkdownPreview content={descriptionValue} placeholder="Start writing on the left to see a live preview..." />
                                </div>
                            </div>
                            {errors.description && <p className="text-xs text-red-500 mt-1">⚠ {errors.description.message}</p>}

                            {/* SQL: Hidden Query */}
                            {domain === "SQL" && (
                                <div className="mt-6 space-y-3 p-6 rounded-2xl border border-dashed border-gray-200 dark:border-[#2a2a2a] bg-gray-50/50 dark:bg-[#0d0d0d]">
                                    <div>
                                        <label className={labelCls}>Hidden Query <span className="normal-case font-normal text-gray-400">(Optional)</span></label>
                                        <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">Prepended to the user's code before execution (e.g. schema setup).</p>
                                        <textarea
                                            {...register("hiddenQuery")}
                                            rows={6}
                                            placeholder={"-- CREATE TABLE employees (\n--   id INT PRIMARY KEY,\n--   name VARCHAR(100)\n-- );"}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#2a2a2a] focus:border-orange-400 dark:focus:border-orange-400 focus:ring-0 outline-none font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111] resize-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── STEP 3: Solution ─── */}
                    {currentStep === 3 && (
                        <div className="py-12 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Solution / Editorial</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Shown only after a user successfully solves the problem.</p>
                                </div>
                                <div className="flex items-center gap-0.5 p-1 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-[#2a2a2a] flex-shrink-0">
                                    <button type="button" onClick={() => setSolutionPreview(false)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${!solutionPreview ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
                                        <Code2 className="w-3.5 h-3.5" /> Write
                                    </button>
                                    <button type="button" onClick={() => setSolutionPreview(true)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${solutionPreview ? "bg-white dark:bg-[#262626] text-gray-900 dark:text-white shadow-sm" : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>
                                        <Eye className="w-3.5 h-3.5" /> Preview
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                <div className={solutionPreview ? "hidden xl:block" : ""}>
                                    <textarea
                                        {...register("solution")}
                                        rows={28}
                                        placeholder={"# Approach\n\nExplain the solution approach...\n\n## Algorithm\n1. Step one\n2. Step two\n\n## Complexity\n- **Time:** O(n)\n- **Space:** O(1)\n\n```python\ndef solve(nums):\n    pass\n```"}
                                        className="w-full h-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-[#2a2a2a] focus:border-orange-400 dark:focus:border-orange-400 focus:ring-0 outline-none font-mono text-sm leading-7 text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111] placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none"
                                    />
                                </div>
                                <div className={`rounded-2xl border border-gray-200 dark:border-[#2a2a2a] bg-white dark:bg-[#111] px-6 py-2 overflow-y-auto ${solutionPreview ? "" : "hidden xl:block"}`} style={{ minHeight: 460 }}>
                                    <MarkdownPreview content={solutionValue} placeholder="Start writing your solution to see a live preview..." />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 4: Test Cases ─── */}
                    {currentStep === 4 && (
                        <div className="py-12 space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Test Cases</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Define input/output pairs used to validate submissions.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ input: "", output: "", hidden: false })}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-orange-200 dark:shadow-none"
                                >
                                    <Plus className="w-4 h-4" /> Add Test Case
                                </button>
                            </div>

                            <div className="space-y-5">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="group rounded-2xl border border-gray-150 dark:border-[#1e1e1e] bg-white dark:bg-[#0f0f0f] overflow-hidden hover:border-orange-200 dark:hover:border-orange-500/20 transition-colors shadow-sm">
                                        {/* Card header */}
                                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-[#1a1a1a] bg-gray-50/80 dark:bg-[#111]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">
                                                    {index + 1}
                                                </div>
                                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider">Test Case {index + 1}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                                    <input
                                                        type="checkbox"
                                                        {...register(`testCases.${index}.hidden` as const)}
                                                        className="w-3.5 h-3.5 rounded border-gray-300 dark:border-[#444] text-orange-500 focus:ring-orange-500 dark:bg-[#111] cursor-pointer"
                                                    />
                                                    <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">Hidden</span>
                                                </label>
                                                <button
                                                    type="button" onClick={() => remove(index)}
                                                    className="p-1.5 text-gray-300 dark:text-gray-700 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        {/* Card body */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-[#1a1a1a]">
                                            <div className="p-5 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                                    Input {domain === "SQL" && <span className="font-normal opacity-60 ml-1">— optional</span>}
                                                </label>
                                                <textarea
                                                    {...register(`testCases.${index}.input` as const)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222] focus:border-orange-400 dark:focus:border-orange-400 focus:ring-0 outline-none text-sm font-mono bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 resize-none"
                                                    placeholder={"nums = [2,7,11,15]\ntarget = 9"}
                                                />
                                            </div>
                                            <div className="p-5 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Expected Output</label>
                                                <textarea
                                                    {...register(`testCases.${index}.output` as const)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#222] focus:border-orange-400 dark:focus:border-orange-400 focus:ring-0 outline-none text-sm font-mono bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 resize-none"
                                                    placeholder={"[0, 1]"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {errors.testCases && (
                                    <p className="text-xs text-red-500">⚠ {errors.testCases.root?.message || "Invalid test cases"}</p>
                                )}
                                {fields.length === 0 && (
                                    <div className="py-16 text-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-[#222]">
                                        <FlaskConical className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-700 mb-3" />
                                        <p className="text-sm text-gray-400 dark:text-gray-600">No test cases yet.</p>
                                        <button type="button" onClick={() => append({ input: "", output: "", hidden: false })}
                                            className="mt-4 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-colors">
                                            + Add your first test case
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 5: Code Templates (DSA only) ─── */}
                    {isDSA && currentStep === 5 && (
                        <div className="py-12 space-y-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Code Templates</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Define the starter code users will see when they open the problem.</p>
                            </div>
                            <FunctionTemplateEditor
                                value={functionTemplates}
                                onChange={setFunctionTemplates}
                                useFunctionTemplate={useFunctionTemplate}
                                onUseFunctionTemplateChange={setUseFunctionTemplate}
                            />
                        </div>
                    )}

                    {/* ─── FOOTER NAV ─── */}
                    <div className="sticky bottom-0 py-5 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-t border-gray-100 dark:border-[#1a1a1a] flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="w-4 h-4" /> Previous
                        </button>

                        <div className="flex items-center gap-2">
                            {steps.map(s => (
                                <div key={s.id} className={`w-1.5 h-1.5 rounded-full transition-all ${s.id === currentStep ? "w-6 bg-orange-500" : s.id < currentStep ? "bg-orange-300 dark:bg-orange-500/50" : "bg-gray-200 dark:bg-[#2a2a2a]"}`} />
                            ))}
                        </div>

                        {currentStep < totalSteps ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all"
                            >
                                Continue <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-all disabled:opacity-60 shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <><Check className="w-4 h-4" />{submitLabel}</>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
