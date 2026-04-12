"use client";

import { useState, useEffect, useRef } from "react";
import { Difficulty, ProblemDomain } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Plus, Trash2, Eye, EyeOff, Code2, Check, List,
    FileText, BookOpen, FlaskConical, Braces, ChevronRight, ChevronLeft, Loader2, Image as ImageIcon
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
    slugPrefix?: string;
}

function MarkdownPreview({ content, placeholder }: { content: string; placeholder?: string }) {
    if (!content?.trim()) {
        return (
            <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center text-[#738f93] bg-[#f8f9fa] dark:bg-[#111] gap-3 font-mono">
                <BookOpen className="w-10 h-10 opacity-30" />
                <span className="text-sm italic">{placeholder || "Nothing to preview yet..."}</span>
            </div>
        );
    }
    return (
        <div className="w-full min-h-[460px] px-6 py-6 overflow-auto prose prose-base dark:prose-invert max-w-none bg-[#f8f9fa] dark:bg-[#111] text-[#39424e] dark:text-gray-300 font-mono text-[15px]
            prose-pre:bg-[#1e1e2e] prose-pre:text-gray-100 prose-pre:rounded-[3px] prose-pre:border prose-pre:border-gray-700/40
            prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a2e] prose-code:rounded-[3px] prose-code:px-1.5 prose-code:text-[0.85em]
            prose-headings:text-[#39424e] dark:prose-headings:text-white prose-headings:font-bold prose-headings:font-mono
            prose-a:text-[#26bd58] prose-strong:text-[#39424e] dark:prose-strong:text-white
            prose-blockquote:border-[#26bd58] prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ children }) => (
                        <div className="my-6 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-[#262626]">
                            <div className="overflow-x-auto text-left">
                                <table className="w-full border-collapse text-sm">{children}</table>
                            </div>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-gray-100/40 dark:bg-white/2 border-b border-gray-200/60 dark:border-[#262626] font-mono">{children}</thead>
                    ),
                    th: ({ children }) => (
                        <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[11px] font-mono align-middle">{children}</th>
                    ),
                    td: ({ children }) => (
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border-t border-gray-100/80 dark:border-white/5 tabular-nums font-mono text-[13px] align-middle">{children}</td>
                    ),
                    tr: ({ children }) => (
                        <tr className="hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors duration-150">{children}</tr>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

const DIFFICULTY_OPTIONS = [
    { value: "EASY", label: "Easy", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30" },
    { value: "MEDIUM", label: "Medium", color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
    { value: "HARD", label: "Hard", color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30" },
];

export default function ProblemForm({ initialData, onSubmit, submitLabel, domain = "DSA", redirectPath, slugPrefix = "/problems/" }: ProblemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTags, setSelectedTags] = useState<{ name: string, slug: string }[]>(initialData?.tags || []);
    const [descriptionPreview, setDescriptionPreview] = useState(false);
    const [solutionPreview, setSolutionPreview] = useState(false);
    const [useFunctionTemplate, setUseFunctionTemplate] = useState(initialData?.useFunctionTemplate || false);
    const [functionTemplates, setFunctionTemplates] = useState<FunctionTemplate[]>(initialData?.functionTemplates || []);
    const [fetchedCategories, setFetchedCategories] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const solutionRef = useRef<HTMLTextAreaElement>(null);
    const descriptionFileInputRef = useRef<HTMLInputElement>(null);
    const solutionFileInputRef = useRef<HTMLInputElement>(null);

    const insertMarkdown = (fieldName: "description" | "solution", type: string) => {
        const textarea = fieldName === "description" ? descriptionRef.current : solutionRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = watch(fieldName) || "";
        const selectedText = value.substring(start, end);

        const isAtStart = start === 0 || value[start - 1] === "\n";
        let before = "";
        let after = "";
        let placeholder = "";

        switch (type) {
            case "bold": before = "**"; after = "**"; placeholder = "bold text"; break;
            case "italic": before = "*"; after = "*"; placeholder = "italic text"; break;
            case "list": before = isAtStart ? "- " : "\n- "; after = ""; placeholder = "item"; break;
            case "code": before = "```\n"; after = "\n```"; placeholder = "code"; break;
            case "inline-code": before = "`"; after = "`"; placeholder = "code"; break;
            case "h2": before = "## "; after = ""; placeholder = "Heading"; break;
            case "h3": before = "### "; after = ""; placeholder = "Subheading"; break;
            case "link": before = "["; after = "](url)"; placeholder = "link text"; break;
        }

        const textToInsert = selectedText || placeholder;
        const newValue = value.substring(0, start) + before + textToInsert + after + value.substring(end);

        setValue(fieldName, newValue);

        // Ensure state is updated before focusing
        setTimeout(() => {
            textarea.focus();
            if (selectedText) {
                textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
            } else {
                textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
            }
        }, 0);
    };

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

    const { ref: descriptionFormRef, ...descriptionRegister } = register("description");
    const { ref: solutionFormRef, ...solutionRegister } = register("solution");

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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "description" | "solution") => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (result.success) {
                const markdownImage = `\n![${file.name}](${result.url})\n`;
                const currentValue = watch(fieldName) || "";
                setValue(fieldName, currentValue + markdownImage);
                toast.success("Image uploaded successfully");
            } else {
                toast.error(result.error || "Upload failed");
            }
        } catch (err) {
            console.error("Upload error:", err);
            toast.error("Upload failed");
        } finally {
            setIsUploading(false);
            e.target.value = ""; // Reset input
        }
    };

    const progressPct = Math.round((currentStep / totalSteps) * 100);

    const inputCls = "w-full px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all text-[15px] font-mono shadow-sm text-gray-900 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-600";
    const labelCls = "text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono mb-1.5 flex gap-1";

    return (
        <div className="w-full">

            {/* ── TABS NAV (HackerRank Style) ── */}
            <div className="flex flex-wrap border border-gray-200 dark:border-[#333] bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-[3px] mb-8">
                {steps.map((step) => {
                    const isActive = currentStep === step.id;
                    const isClickable = step.id <= currentStep;
                    return (
                        <button
                            key={step.id}
                            type="button"
                            onClick={() => handleStepClick(step.id)}
                            disabled={!isClickable && !isActive}
                            className={`px-8 py-3.5 text-[14px] font-bold transition-all border-r border-gray-200 dark:border-[#333] last:border-r-0 ${
                                isActive
                                ? "text-[#39424e] dark:text-white bg-white dark:bg-[#121212]"
                                : "text-[#738f93] dark:text-gray-400 hover:text-[#39424e] dark:hover:text-white hover:bg-[#ebf0f4] dark:hover:bg-[#222]"
                            }`}
                        >
                            {step.name}
                        </button>
                    );
                })}
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="max-w-6xl mx-auto px-8">

                    {/* ─── STEP 1: Basics ─── */}
                    {currentStep === 1 && (
                        <div className="py-2 space-y-10">
                            <div>
                                <h2 className="text-[28px] font-bold text-[#39424e] dark:text-white mb-2 font-mono tracking-tight">Basic Details</h2>
                                <p className="text-[15px] italic text-[#738f93] dark:text-gray-400 font-serif max-w-2xl">Define the problem identity and visibility settings.</p>
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
                                        <div className="relative flex items-center">
                                            <div className="absolute left-4 text-gray-400 dark:text-gray-600 text-sm font-mono pointer-events-none whitespace-nowrap">
                                                {slugPrefix}
                                            </div>
                                            <input
                                                {...register("slug")}
                                                placeholder="two-sum"
                                                style={{ paddingLeft: `${(slugPrefix.length * 0.6) + 1}rem` }}
                                                className={inputCls}
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
                                        <div className="p-6 rounded-[3px] bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-[#444] space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[10px] font-bold text-[#39424e] dark:text-gray-300 uppercase tracking-widest">MCQ Options</label>
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" {...register("isMcq")} className="hidden" />
                                                    <span className="text-[10px] text-gray-500 font-medium italic">At least 2 required</span>
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
                                                            className="mt-3 w-4 h-4 text-[#26bd58] bg-gray-100 border-gray-300 focus:ring-[#26bd58] dark:focus:ring-[#26bd58] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                                                <div className="text-sm font-semibold text-[#26bd58] dark:text-[#26bd58] truncate bg-white dark:bg-[#121212] px-3 py-2 rounded-[3px] border border-gray-300 dark:border-[#444] min-h-[40px] flex items-center font-mono">
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
                                                        py-3 px-4 rounded-[3px] border text-sm font-bold transition-all
                                                        ${difficultyValue === opt.value
                                                            ? opt.color + " border-current scale-[1.02] shadow-sm"
                                                            : "border-gray-300 dark:border-[#444] text-gray-400 dark:text-gray-600 hover:border-gray-400 dark:hover:border-[#555]"
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
                                                    flex items-center justify-center gap-2 py-3 rounded-[3px] border text-sm font-semibold transition-all
                                                    ${!hiddenValue
                                                        ? "border-[#26bd58] bg-emerald-50 dark:bg-emerald-500/10 text-[#26bd58]"
                                                        : "border-gray-300 dark:border-[#444] text-gray-400 dark:text-gray-600"
                                                    }
                                                `}
                                            >
                                                <Eye className="w-4 h-4" /> Visible
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setValue("hidden", true)}
                                                className={`
                                                    flex items-center justify-center gap-2 py-3 rounded-[3px] border text-sm font-semibold transition-all
                                                    ${hiddenValue
                                                        ? "border-gray-400 bg-gray-100 dark:bg-[#222] text-gray-700 dark:text-gray-300"
                                                        : "border-gray-300 dark:border-[#444] text-gray-400 dark:text-gray-600"
                                                    }
                                                `}
                                            >
                                                <EyeOff className="w-4 h-4" /> Hidden
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview card */}
                                    <div className="mt-2 p-5 rounded-[3px] bg-gray-50 dark:bg-[#111] border border-gray-300 dark:border-[#444]">
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
                        <div className="py-2 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-[28px] font-bold text-[#39424e] dark:text-white mb-2 font-mono tracking-tight">Problem Description</h2>
                                    <p className="text-[15px] italic text-[#738f93] dark:text-gray-400 font-serif max-w-2xl">Write a clear problem statement using Markdown.</p>
                                </div>

                            </div>

                            <div className="border border-gray-300 dark:border-[#444] rounded-[3px] overflow-hidden">
                                {/* Enhanced Toolbar */}
                                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-[#333] bg-[#f8f9fa] dark:bg-[#151515]">
                                    <div className="flex items-center gap-1">
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("description", "bold")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bold"><span className="text-sm">B</span></button>
                                            <button type="button" onClick={() => insertMarkdown("description", "italic")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white italic hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Italic"><span className="text-sm">i</span></button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("description", "h2")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 2"><span className="text-xs">H2</span></button>
                                            <button type="button" onClick={() => insertMarkdown("description", "h3")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 3"><span className="text-xs">H3</span></button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("description", "list")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bullet List">
                                                <List className="w-3.5 h-3.5" />
                                            </button>
                                            <button type="button" onClick={() => insertMarkdown("description", "code")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Code Block">
                                                <Code2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button
                                                type="button"
                                                onClick={() => descriptionFileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors disabled:opacity-50"
                                                title="Upload Image"
                                            >
                                                {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                                            </button>
                                            <button type="button" onClick={() => insertMarkdown("description", "link")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Insert Link">
                                                <Plus className="w-3.5 h-3.5 rotate-45" />
                                            </button>
                                        </div>
                                        <input
                                            type="file"
                                            ref={descriptionFileInputRef}
                                            onChange={(e) => handleImageUpload(e, "description")}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setDescriptionPreview(!descriptionPreview)}
                                        className="px-3 py-1.5 text-xs font-semibold bg-[#ebf0f4] dark:bg-[#222] text-[#39424e] dark:text-gray-300 border border-[#dcdcdc] dark:border-[#444] rounded-[3px] shadow-sm hover:bg-[#e2e8ec] dark:hover:bg-[#333] transition-colors flex items-center gap-2"
                                    >
                                        {descriptionPreview ? <><Code2 className="w-3.5 h-3.5" /> Edit</> : <><Eye className="w-3.5 h-3.5" /> Preview</>}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1">
                                    {!descriptionPreview ? (
                                        <div className="border-r border-gray-200 dark:border-[#333]">
                                            <textarea
                                                {...descriptionRegister}
                                                ref={(e) => {
                                                    descriptionFormRef(e);
                                                    descriptionRef.current = e;
                                                }}
                                                rows={28}
                                                placeholder={"# Problem\n\nDescribe the problem here...\n\n## Constraints\n- 1 ≤ n ≤ 10⁵\n\n## Example\n\n**Input:** nums = [2,7,11,15], target = 9\n**Output:** [0,1]"}
                                                className="w-full px-5 py-4 bg-white dark:bg-[#1a1a1a] focus:outline-none transition-all font-mono text-[15px] leading-7 text-[#39424e] dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none shadow-inner min-h-[500px]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-[#f8f9fa] dark:bg-[#111] overflow-y-auto min-h-[500px]">
                                            <MarkdownPreview content={descriptionValue} placeholder="Nothing to preview yet..." />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errors.description && <p className="text-xs text-red-500 mt-1">⚠ {errors.description.message}</p>}

                            {/* SQL: Hidden Query */}
                            {domain === "SQL" && (
                                <div className="mt-6 space-y-3 p-6 rounded-[3px] border border-dashed border-gray-300 dark:border-[#444] bg-gray-50/50 dark:bg-[#0d0d0d]">
                                    <div>
                                        <label className={labelCls}>Hidden Query <span className="normal-case font-normal text-gray-400">(Optional)</span></label>
                                        <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">Prepended to the user's code before execution (e.g. schema setup).</p>
                                        <textarea
                                            {...register("hiddenQuery")}
                                            rows={6}
                                            placeholder={"-- CREATE TABLE employees (\n--   id INT PRIMARY KEY,\n--   name VARCHAR(100)\n-- );"}
                                            className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111] resize-none"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ─── STEP 3: Solution ─── */}
                    {currentStep === 3 && (
                        <div className="py-2 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-[28px] font-bold text-[#39424e] dark:text-white mb-2 font-mono tracking-tight">Solution / Editorial</h2>
                                    <p className="text-[15px] italic text-[#738f93] dark:text-gray-400 font-serif max-w-2xl">Shown only after a user successfully solves the problem.</p>
                                </div>

                            </div>

                            <div className="border border-gray-300 dark:border-[#444] rounded-[3px] overflow-hidden">
                                {/* Enhanced Toolbar */}
                                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-[#333] bg-[#f8f9fa] dark:bg-[#151515]">
                                    <div className="flex items-center gap-1">
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("solution", "bold")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bold"><span className="text-sm">B</span></button>
                                            <button type="button" onClick={() => insertMarkdown("solution", "italic")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white italic hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Italic"><span className="text-sm">i</span></button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("solution", "h2")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 2"><span className="text-xs">H2</span></button>
                                            <button type="button" onClick={() => insertMarkdown("solution", "h3")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 3"><span className="text-xs">H3</span></button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("solution", "list")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bullet List">
                                                <List className="w-3.5 h-3.5" />
                                            </button>
                                            <button type="button" onClick={() => insertMarkdown("solution", "code")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Code Block">
                                                <Code2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button
                                                type="button"
                                                onClick={() => solutionFileInputRef.current?.click()}
                                                disabled={isUploading}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors disabled:opacity-50"
                                                title="Upload Image"
                                            >
                                                {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                                            </button>
                                            <button type="button" onClick={() => insertMarkdown("solution", "link")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Insert Link">
                                                <Plus className="w-3.5 h-3.5 rotate-45" />
                                            </button>
                                        </div>
                                        <input
                                            type="file"
                                            ref={solutionFileInputRef}
                                            onChange={(e) => handleImageUpload(e, "solution")}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSolutionPreview(!solutionPreview)}
                                        className="px-3 py-1.5 text-xs font-semibold bg-[#ebf0f4] dark:bg-[#222] text-[#39424e] dark:text-gray-300 border border-[#dcdcdc] dark:border-[#444] rounded-[3px] shadow-sm hover:bg-[#e2e8ec] dark:hover:bg-[#333] transition-colors flex items-center gap-2"
                                    >
                                        {solutionPreview ? <><Code2 className="w-3.5 h-3.5" /> Edit</> : <><Eye className="w-3.5 h-3.5" /> Preview</>}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1">
                                    {!solutionPreview ? (
                                        <div className="border-r border-gray-200 dark:border-[#333]">
                                            <textarea
                                                {...solutionRegister}
                                                ref={(e) => {
                                                    solutionFormRef(e);
                                                    solutionRef.current = e;
                                                }}
                                                rows={28}
                                                placeholder={"# Approach\n\nExplain the solution approach...\n\n## Algorithm\n1. Step one\n2. Step two\n\n## Complexity\n- **Time:** O(n)\n- **Space:** O(1)\n\n```python\ndef solve(nums):\n    pass\n```"}
                                                className="w-full px-5 py-4 bg-white dark:bg-[#1a1a1a] focus:outline-none transition-all font-mono text-[15px] leading-7 text-[#39424e] dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none shadow-inner min-h-[500px]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-[#f8f9fa] dark:bg-[#111] overflow-y-auto min-h-[500px]">
                                            <MarkdownPreview content={solutionValue} placeholder="Nothing to preview yet..." />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 4: Test Cases ─── */}
                    {currentStep === 4 && (
                        <div className="py-2 space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-[28px] font-bold text-[#39424e] dark:text-white mb-2 font-mono tracking-tight">Test Cases</h2>
                                    <p className="text-[15px] italic text-[#738f93] dark:text-gray-400 font-serif max-w-2xl">Define input/output pairs used to validate submissions.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ input: "", output: "", hidden: false })}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#39424e] dark:bg-white text-white dark:text-[#39424e] text-sm font-bold rounded-[3px] transition-all shadow-sm"
                                >
                                    <Plus className="w-4 h-4" /> Add Test Case
                                </button>
                            </div>

                            <div className="space-y-5">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="group rounded-[3px] border border-gray-300 dark:border-[#444] bg-white dark:bg-[#0f0f0f] overflow-hidden hover:border-gray-400 dark:hover:border-[#555] transition-colors shadow-sm">
                                        {/* Card header */}
                                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-300 dark:border-[#444] bg-gray-50/80 dark:bg-[#111]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-6 h-6 rounded-full bg-[#39424e] dark:bg-white text-white dark:text-[#39424e] flex items-center justify-center text-xs font-bold">
                                                    {index + 1}
                                                </div>
                                                <span className="text-[13px] font-bold text-[#39424e] dark:text-gray-300 font-mono">Test Case {index + 1}</span>
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
                                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-[#444]">
                                            <div className="p-5 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                                    Input {domain === "SQL" && <span className="font-normal opacity-60 ml-1">— optional</span>}
                                                </label>
                                                <textarea
                                                    {...register(`testCases.${index}.input` as const)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none text-sm font-mono bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 resize-none"
                                                    placeholder={"nums = [2,7,11,15]\ntarget = 9"}
                                                />
                                            </div>
                                            <div className="p-5 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Expected Output</label>
                                                <textarea
                                                    {...register(`testCases.${index}.output` as const)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none text-sm font-mono bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-gray-100 resize-none"
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
                                    <div className="py-16 text-center rounded-[3px] border border-dashed border-gray-300 dark:border-[#444]">
                                        <FlaskConical className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-700 mb-3" />
                                        <p className="text-sm text-gray-400 dark:text-gray-600">No test cases yet.</p>
                                        <button type="button" onClick={() => append({ input: "", output: "", hidden: false })}
                                            className="mt-4 px-4 py-2 text-sm font-semibold text-[#39424e] dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-[3px] transition-colors">
                                            + Add your first test case
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 5: Code Templates (DSA only) ─── */}
                    {isDSA && currentStep === 5 && (
                        <div className="py-2 space-y-8">
                            <div>
                                <h2 className="text-[28px] font-bold text-[#39424e] dark:text-white mb-2 font-mono tracking-tight">Code Templates</h2>
                                <p className="text-[15px] italic text-[#738f93] dark:text-gray-400 font-serif max-w-2xl">Define the starter code users will see when they open the problem.</p>
                            </div>
                            <FunctionTemplateEditor
                                value={functionTemplates}
                                onChange={setFunctionTemplates}
                                useFunctionTemplate={useFunctionTemplate}
                                onUseFunctionTemplateChange={setUseFunctionTemplate}
                            />
                        </div>
                    )}

                    {/* ── FOOTER NAV ── */}
                    <div className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-[#333] mt-12">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="px-6 py-2.5 text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors disabled:opacity-30"
                        >
                            Previous
                        </button>

                        <div className="flex gap-4">
                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 py-2.5 bg-[#39424e] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black font-bold text-[14px] rounded-[3px] shadow-sm transition-all flex items-center gap-2"
                                >
                                    Next Section
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-10 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[14px] rounded-[3px] shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Check className="w-4 h-4" />
                                    )}
                                    {submitLabel}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
