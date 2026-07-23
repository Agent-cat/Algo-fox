"use client";

import { useState, useEffect, useRef } from "react";
import { Difficulty, ProblemDomain, QuestionType } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    Plus, Trash2, Eye, EyeOff, Code2, Check, List,
    FileText, BookOpen, FlaskConical, Braces, ChevronRight, ChevronLeft, Loader2, Image as ImageIcon, BadgeCheck, Edit3, Save, Sparkles
} from "lucide-react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TagInput } from "./TagInput";
import { parseCompanies } from "../problems/CompanyAvatars";
import FunctionTemplateEditor, { FunctionTemplate } from "./FunctionTemplateEditor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCategories } from "@/actions/category.action";
import { LANGUAGES } from "@/lib/languages";
import remarkDirective from 'remark-directive';
import { remarkSolutionDirective } from '@/lib/markdown-plugins';
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import SolutionTabs from "@/components/markdown/SolutionTabs";
import { preprocessMarkdown } from '@/lib/markdown-utils';
import SolutionsEditor from "./SolutionsEditor";
import AnimationPlayer from "@/components/workspace/AnimationPlayer";


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
    companies: z.array(z.object({
        name: z.string().min(1, "Company name is required"),
        logo: z.string().optional()
    })).optional().nullable(),
    testCases: z.array(z.object({
        input: z.string().optional(),
        output: z.string().optional(),
        hidden: z.boolean().optional()
    })).optional(),
    useFunctionTemplate: z.boolean().optional(),
    functionTemplates: z.array(functionTemplateSchema).optional(),
    solution: z.string().optional().nullable(),
    animationScript: z.string().optional().nullable(),
    isMcq: z.boolean().optional(),
    questionType: z.nativeEnum(QuestionType).optional(),
    options: z.array(z.string()).optional(),
    answer: z.string().optional(),
    categoryId: z.string().optional(),
    categoryIds: z.array(z.string()).optional(),
    topicTags: z.array(z.string()).optional(),
    allowedLanguages: z.array(z.string()).optional(),
    hints: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProblemFormProps {
    initialData?: Omit<Partial<FormValues>, "tags" | "topicTags"> & {
        tags?: { name: string; slug: string }[];
        topicTags?: { name: string; slug: string }[];
        useFunctionTemplate?: boolean;
        functionTemplates?: FunctionTemplate[];
        companies?: any;
        hints?: string[];
    };
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    submitLabel: string;
    domain?: ProblemDomain;
    redirectPath?: string;
    slugPrefix?: string;
}

export function MarkdownPreview({ content, placeholder }: { content: string; placeholder?: string }) {
    if (!content?.trim()) {
        return (
            <div className="w-full h-full min-h-[460px] flex flex-col items-center justify-center text-[#738f93] bg-[#f8f9fa] dark:bg-[#1D1E23] gap-3 font-mono">
                <BookOpen className="w-10 h-10 opacity-30" />
                <span className="text-sm italic">{placeholder || "Nothing to preview yet..."}</span>
            </div>
        );
    }
    return (
        <div className="w-full min-h-[460px] px-6 py-6 overflow-auto prose prose-base dark:prose-invert max-w-none bg-[#f8f9fa] dark:bg-[#1D1E23] text-[#39424e] dark:text-gray-300 font-mono text-[15px]
            prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
            prose-code:bg-gray-100 dark:prose-code:bg-[#1a1a2e] prose-code:rounded-[3px] prose-code:px-1.5 prose-code:text-[0.85em]
            prose-headings:text-[#39424e] dark:prose-headings:text-white prose-headings:font-bold prose-headings:font-mono
            prose-a:text-[#26bd58] prose-strong:text-[#39424e] dark:prose-strong:text-white
            prose-blockquote:border-[#26bd58] prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400">
            <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkDirective, remarkSolutionDirective]}
                components={{
                    // @ts-ignore
                    'solution-group': SolutionCodeGroup,
                    // @ts-ignore
                    'solution-tabs': SolutionTabs,
                    table: ({ children }) => (
                        <table className="my-6 w-full border-collapse text-sm border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden">{children}</table>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-gray-100/40 dark:bg-white/2 border-b border-gray-200/60 dark:border-[#262626] font-mono">{children}</thead>
                    ),
                    th: ({ children }) => (
                        <th className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[11px] font-mono align-middle border border-gray-200 dark:border-[#262626]">{children}</th>
                    ),
                    td: ({ children }) => (
                        <td className="px-6 py-4 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#262626] tabular-nums font-mono text-[13px] align-middle">{children}</td>
                    ),
                    tr: ({ children }) => (
                        <tr className="hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors duration-150">{children}</tr>
                    ),
                    pre: ({ children }) => (
                        <pre className="my-4 p-4 rounded-xl bg-gray-100/50 dark:bg-[#24262C] border border-dashed border-gray-300 dark:border-white/10 overflow-x-auto custom-scrollbar shadow-sm">
                            {children}
                        </pre>
                    ),
                }}
            >
                {preprocessMarkdown(content)}
            </ReactMarkdown>
        </div>
    );
}

function TextAnswerEditor({ answer, onChange, inputCls, labelCls, isLong }: {
    answer: string;
    onChange: (val: string) => void;
    inputCls: string;
    labelCls: string;
    isLong: boolean;
}) {
    let parsed = { minWords: 0, requiredWords: [] as string[] };
    try {
        const obj = JSON.parse(answer);
        if (obj && typeof obj === "object") {
            parsed = { minWords: obj.minWords || 0, requiredWords: Array.isArray(obj.requiredWords) ? obj.requiredWords : [] };
        }
    } catch {
        if (answer.trim()) {
            parsed = { minWords: 0, requiredWords: [] };
        }
    }

    const [minWords, setMinWords] = useState(parsed.minWords);
    const [requiredWords, setRequiredWords] = useState<string[]>(parsed.requiredWords);
    const [keywordInput, setKeywordInput] = useState("");

    const sync = (mw: number, rw: string[]) => {
        onChange(JSON.stringify({ minWords: mw, requiredWords: rw }));
    };

    const addKeyword = () => {
        const kw = keywordInput.trim();
        if (kw && !requiredWords.includes(kw)) {
            const next = [...requiredWords, kw];
            setRequiredWords(next);
            sync(minWords, next);
            setKeywordInput("");
        }
    };

    const removeKeyword = (kw: string) => {
        const next = requiredWords.filter(k => k !== kw);
        setRequiredWords(next);
        sync(minWords, next);
    };

    return (
        <div className="p-6 rounded-[3px] bg-gray-50 dark:bg-[#1D1E23] border border-gray-300 dark:border-[#444] space-y-5">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-[#39424e] dark:text-gray-300 uppercase tracking-widest">
                    Answer Validation Rules
                </label>
                <span className="text-[10px] text-gray-500 font-medium italic">
                    {isLong ? "Descriptive answer" : "Short answer"}
                </span>
            </div>

            {/* Minimum Word Count */}
            <div>
                <label className={labelCls}>Minimum Word Count</label>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        min={0}
                        value={minWords || ""}
                        onChange={(e) => {
                            const v = parseInt(e.target.value) || 0;
                            setMinWords(v);
                            sync(v, requiredWords);
                        }}
                        placeholder="0 = no limit"
                        className={`${inputCls} max-w-[180px]`}
                    />
                    <span className="text-[11px] text-gray-400 dark:text-gray-600">
                        {minWords > 0 ? `Answer must have at least ${minWords} word${minWords !== 1 ? "s" : ""}` : "No minimum word limit"}
                    </span>
                </div>
            </div>

            {/* Required Keywords */}
            <div>
                <label className={labelCls}>Required Keywords / Phrases</label>
                <p className="text-[11px] text-gray-400 dark:text-gray-600 mb-3">
                    Answer must contain all of these words or phrases (case-insensitive).
                </p>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={keywordInput}
                        onChange={(e) => setKeywordInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addKeyword(); } }}
                        placeholder="Type a keyword and press Enter..."
                        className={`${inputCls} flex-1`}
                    />
                    <button
                        type="button"
                        onClick={addKeyword}
                        disabled={!keywordInput.trim()}
                        className="px-4 h-12 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        Add
                    </button>
                </div>
                {requiredWords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {requiredWords.map((kw) => (
                            <span
                                key={kw}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-xs font-semibold text-orange-700 dark:text-orange-400"
                            >
                                {kw}
                                <button
                                    type="button"
                                    onClick={() => removeKeyword(kw)}
                                    className="text-orange-400 hover:text-orange-600 font-bold ml-0.5"
                                >
                                    &times;
                                </button>
                            </span>
                        ))}
                    </div>
                )}
                {requiredWords.length === 0 && (
                    <div className="mt-3 text-[11px] text-gray-300 dark:text-gray-700 italic">No keywords added yet</div>
                )}
            </div>

            {/* Summary */}
            <div className="pt-2 border-t border-gray-200 dark:border-[#333]">
                <div className="text-[11px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest mb-2">Validation Summary</div>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <div>• Minimum <span className="font-bold text-orange-600 dark:text-orange-400">{minWords || "any"}</span> word{minWords !== 1 ? "s" : ""}</div>
                    <div>• Must contain <span className="font-bold text-orange-600 dark:text-orange-400">{requiredWords.length}</span> keyword{requiredWords.length !== 1 ? "s" : ""}: {requiredWords.length > 0 ? requiredWords.map(k => `"${k}"`).join(", ") : "none"}</div>
                </div>
            </div>
        </div>
    );
}

const DIFFICULTY_OPTIONS = [
    { value: "EASY", label: "Easy", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30" },
    { value: "MEDIUM", label: "Medium", color: "text-amber-600 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30" },
    { value: "HARD", label: "Hard", color: "text-rose-600 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/30" },
    { value: "CONCEPT", label: "Concept", color: "text-orange-600 bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/30" },
];

const QUESTION_TYPE_OPTIONS = [
    { value: "MCQ_SINGLE", label: "MCQ (Single Correct)", icon: "⊙", desc: "One correct answer" },
    { value: "MCQ_MULTIPLE", label: "MCQ (Multiple Correct)", icon: "☑", desc: "Multiple correct answers" },
    { value: "TEXT_SHORT", label: "Short Text Input", icon: "—", desc: "Single-line text answer" },
    { value: "TEXT_LONG", label: "Long Text Input", icon: "¶", desc: "Descriptive answer with Markdown" },
];

const PREDEFINED_COMPANIES = [
    { name: "Google", logo: "https://cdn.simpleicons.org/google" },
    { name: "Amazon", logo: "https://cdn.simpleicons.org/amazon" },
    { name: "Microsoft", logo: "https://cdn.simpleicons.org/microsoft" },
    { name: "Meta", logo: "https://cdn.simpleicons.org/meta" },
    { name: "Apple", logo: "https://cdn.simpleicons.org/apple" },
    { name: "Netflix", logo: "https://cdn.simpleicons.org/netflix" },
    { name: "Uber", logo: "https://cdn.simpleicons.org/uber" },
    { name: "Salesforce", logo: "https://cdn.simpleicons.org/salesforce" },
    { name: "Adobe", logo: "https://cdn.simpleicons.org/adobe" },
    { name: "NVIDIA", logo: "https://cdn.simpleicons.org/nvidia" },
    { name: "Tesla", logo: "https://cdn.simpleicons.org/tesla" },
    { name: "X", logo: "https://cdn.simpleicons.org/x" },
    { name: "LinkedIn", logo: "https://cdn.simpleicons.org/linkedin" },
    { name: "Twitter", logo: "https://cdn.simpleicons.org/twitter" },
    { name: "Flipkart", logo: "https://cdn.simpleicons.org/flipkart" },
    { name: "Oracle", logo: "https://cdn.simpleicons.org/oracle" },
    { name: "IBM", logo: "https://cdn.simpleicons.org/ibm" },
    { name: "Atlassian", logo: "https://cdn.simpleicons.org/atlassian" },
    { name: "Spotify", logo: "https://cdn.simpleicons.org/spotify" },
    { name: "Airbnb", logo: "https://cdn.simpleicons.org/airbnb" },
    { name: "Stripe", logo: "https://cdn.simpleicons.org/stripe" },
    { name: "Shopify", logo: "https://cdn.simpleicons.org/shopify" },
    { name: "Dropbox", logo: "https://cdn.simpleicons.org/dropbox" },
    { name: "Slack", logo: "https://cdn.simpleicons.org/slack" },
    { name: "PayPal", logo: "https://cdn.simpleicons.org/paypal" },
    { name: "Walmart", logo: "https://cdn.simpleicons.org/walmart" },
    { name: "ByteDance", logo: "https://cdn.simpleicons.org/bytedance" },
    { name: "TikTok", logo: "https://cdn.simpleicons.org/tiktok" },
    { name: "Intuit", logo: "https://cdn.simpleicons.org/intuit" },
    { name: "Snap", logo: "https://cdn.simpleicons.org/snapchat" },
    { name: "Pinterest", logo: "https://cdn.simpleicons.org/pinterest" },
    { name: "Twitch", logo: "https://cdn.simpleicons.org/twitch" },
    { name: "Reddit", logo: "https://cdn.simpleicons.org/reddit" },
    { name: "GitHub", logo: "https://cdn.simpleicons.org/github" },
    { name: "Databricks", logo: "https://cdn.simpleicons.org/databricks" },
    { name: "Palantir", logo: "https://cdn.simpleicons.org/palantir" },
    { name: "SAP", logo: "https://cdn.simpleicons.org/sap" },
    { name: "Cisco", logo: "https://cdn.simpleicons.org/cisco" },
    { name: "VMware", logo: "https://cdn.simpleicons.org/vmware" },
    { name: "Zoom", logo: "https://cdn.simpleicons.org/zoom" },
];



export default function ProblemForm({ initialData, onSubmit, submitLabel, domain = "DSA", redirectPath, slugPrefix = "/problems/" }: ProblemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTags, setSelectedTags] = useState<{ name: string, slug: string }[]>(initialData?.tags || []);
    const [selectedTopicTags, setSelectedTopicTags] = useState<{ name: string, slug: string }[]>(initialData?.topicTags || []);
    const [descriptionPreview, setDescriptionPreview] = useState(false);
    const [useFunctionTemplate, setUseFunctionTemplate] = useState(initialData?.useFunctionTemplate || false);
    const [functionTemplates, setFunctionTemplates] = useState<FunctionTemplate[]>(initialData?.functionTemplates || []);
    const [fetchedCategories, setFetchedCategories] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const isDraftRef = useRef(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [customLogoUrl, setCustomLogoUrl] = useState("");
    const [isAddingCustom, setIsAddingCustom] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const descriptionFileInputRef = useRef<HTMLInputElement>(null);

    const insertMarkdown = (fieldName: "description", type: string) => {
        const textarea = descriptionRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentValue = descriptionValue;
        const selectedText = currentValue.substring(start, end);

        const isAtStart = start === 0 || currentValue[start - 1] === "\n";
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
        const newValue = currentValue.substring(0, start) + before + textToInsert + after + currentValue.substring(end);

        setValue(fieldName, newValue);

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
        const loadCategories = async () => {
            const res = await getCategories(domain);
            if (res.categories) {
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
    }, [domain]);

    const { register, control, handleSubmit, watch, getValues, setValue, trigger, formState: { errors } } = useForm<FormValues>({
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
            animationScript: (initialData as any)?.animationScript || "",
            isMcq: initialData?.isMcq || domain === "APTITUDE",
            questionType: (initialData as any)?.questionType || "MCQ_SINGLE",
            options: (initialData as any)?.options || ["", "", "", ""],
            answer: (initialData as any)?.answer || "",
            categoryId: (initialData as any)?.categoryId || "",
            categoryIds: initialData?.categoryIds || [],
            topicTags: initialData?.topicTags?.map(t => t.slug) || [],
            allowedLanguages: (initialData as any)?.allowedLanguages || [],
            companies: parseCompanies(initialData?.companies) || [],
            hints: initialData?.hints || [],
        }
    });

    const lastAutoGeneratedSlugRef = useRef(initialData?.slug || "");

    const selectedCompanies = watch("companies") || [];

    const handleSelectCompany = (company: { name: string; logo?: string }) => {
        if (selectedCompanies.some((c: any) => c.name.toLowerCase() === company.name.toLowerCase())) {
            return;
        }
        setValue("companies", [...selectedCompanies, company]);
        setSearchQuery("");
        setShowDropdown(false);
    };

    const handleRemoveCompany = (name: string) => {
        setValue("companies", selectedCompanies.filter((c: any) => c.name !== name));
    };

    const filteredPredefined = PREDEFINED_COMPANIES.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) &&
        !selectedCompanies.some((sc: any) => sc.name.toLowerCase() === c.name.toLowerCase())
    );

    const router = useRouter();
    const isDSA = domain === "DSA";
    const isAptitude = domain === "APTITUDE";

    const mcqOptions = watch("options");
    const mcqAnswer = watch("answer");
    const questionTypeValue = watch("questionType") || "MCQ_SINGLE";
    const isMcqSingle = questionTypeValue === "MCQ_SINGLE";
    const isMcqMultiple = questionTypeValue === "MCQ_MULTIPLE";
    const isTextShort = questionTypeValue === "TEXT_SHORT";
    const isTextLong = questionTypeValue === "TEXT_LONG";
    const isMcqType = isMcqSingle || isMcqMultiple;
    useEffect(() => {
        if (mcqAnswer && mcqOptions && isMcqSingle) {
            const idx = Number(mcqAnswer);
            if (isNaN(idx)) {
                const foundIdx = mcqOptions.indexOf(mcqAnswer);
                if (foundIdx !== -1) {
                    setValue("answer", foundIdx.toString());
                }
            } else if (idx >= mcqOptions.length || idx < 0) {
                setValue("answer", "");
            }
        }
    }, [mcqOptions, mcqAnswer, isMcqSingle, setValue]);

    const { ref: descriptionFormRef, ...descriptionRegister } = register("description");
    const { fields, append, remove } = useFieldArray({ control, name: "testCases" });

    const hintsList = watch("hints") || [];
    const addHint = () => setValue("hints", [...hintsList, ""]);
    const updateHint = (index: number, value: string) => {
        const newHints = [...hintsList];
        newHints[index] = value;
        setValue("hints", newHints);
    };
    const removeHint = (index: number) => {
        const newHints = [...hintsList];
        newHints.splice(index, 1);
        setValue("hints", newHints);
    };

    const hiddenValue = watch("hidden");
    const descriptionValue = watch("description") || "";
    const titleValue = watch("title") || "";
    const difficultyValue = watch("difficulty");
    const isConcept = difficultyValue === "CONCEPT";
    const totalSteps = isConcept ? 2 : (isDSA ? 6 : isAptitude ? 3 : 4);

    const steps = isConcept
        ? [
            { id: 1, name: "Basics", icon: FileText, desc: "Title, slug & settings" },
            { id: 2, name: "Content", icon: BookOpen, desc: "Conceptual Note" },
        ]
        : isDSA
            ? [
                { id: 1, name: "Basics", icon: FileText, desc: "Title, slug & settings" },
                { id: 2, name: "Description", icon: BookOpen, desc: "Problem statement" },
                { id: 3, name: "Solution", icon: Code2, desc: "Editorial & explanation" },
                { id: 4, name: "Animation", icon: Sparkles, desc: "Visual animation script" },
                { id: 5, name: "Test Cases", icon: FlaskConical, desc: "Input/output pairs" },
                { id: 6, name: "Templates", icon: Braces, desc: "Starter code" },
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
        else if (currentStep === 3 && !isConcept) isValid = await trigger(["solution"]);
        else if (currentStep === 4 && isDSA) isValid = true; // Animation script is optional
        else if (currentStep === 5 && !isAptitude && !isConcept) isValid = await trigger(["testCases"]);
        else isValid = true;
        
        if (isValid && currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
            setDescriptionPreview(false);
        }
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
        setDescriptionPreview(false);
    };

    const handleStepClick = async (stepId: number) => {
        if (stepId < currentStep) {
            setCurrentStep(stepId);
            setDescriptionPreview(false);
        }
    };

    async function onSubmitForm(data: FormValues) {
        if (isLoading) return;
        setIsLoading(true);

        const submissionData = {
            ...data,
            solution: data.solution || "",
            animationScript: data.animationScript ? (() => { try { return JSON.parse(data.animationScript); } catch { return null; } })() : null,
            hidden: data.hidden,
            hiddenQuery: domain === "SQL" ? (data.hiddenQuery?.trim() || null) : null,
            domain,
            tags: selectedTags.map(t => t.slug),
            companies: data.companies && data.companies.length > 0 ? { companies: data.companies } : null,
            useFunctionTemplate: isDSA && !isConcept ? useFunctionTemplate : false,
            functionTemplates: isDSA && useFunctionTemplate && !isConcept ? functionTemplates : [],
            isMcq: watch("isMcq"),
            questionType: watch("isMcq") || isAptitude ? questionTypeValue : "MCQ_SINGLE",
            options: watch("isMcq") ? data.options?.filter(o => o.trim() !== "") : [],
            answer: isMcqSingle
                ? (data.options && data.answer !== "" && data.answer !== undefined ? data.options[Number(data.answer)] : null)
                : isMcqMultiple
                    ? (data.answer ? data.answer : null)
                    : (isTextShort || isTextLong)
                        ? (data.answer && data.answer.trim() !== "" ? data.answer : null)
                        : null,
            testCases: (isAptitude || isConcept) ? [] : data.testCases,
            categoryId: data.categoryId || null,
            categoryIds: data.categoryIds || [],
            topicTags: selectedTopicTags.map(c => c.slug),
            allowedLanguages: data.allowedLanguages || [],
            hints: data.hints?.filter(h => h.trim() !== "") || [],
        };
        const res = await onSubmit(submissionData);
        if (res.success) {
            toast.success("Saved successfully");
            if (!isDraftRef.current && redirectPath !== undefined) {
                router.push(redirectPath || "/admin/problems");
                router.refresh();
            } else if (isDraftRef.current) {
                router.refresh();
            }
        } else {
            toast.error(res.error || "Something went wrong");
        }
        setIsLoading(false);
        isDraftRef.current = false;
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: "description") => {
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
                toast.error(result.error || "Failed to upload image");
            }
        } catch (error) {
            toast.error("Error uploading image");
        } finally {
            setIsUploading(false);
            if (descriptionFileInputRef.current) descriptionFileInputRef.current.value = "";
        }
    };

    const uploadImageForSolution = async (file: File) => {
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image size must be less than 5MB");
            return null;
        }

        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const result = await res.json();
            if (result.success) {
                toast.success("Image uploaded successfully");
                return result.url;
            } else {
                toast.error(result.error || "Failed to upload image");
                return null;
            }
        } catch (error) {
            toast.error("Error uploading image");
            return null;
        }
    };

    const progressPct = Math.round((currentStep / totalSteps) * 100);

    const inputCls = "w-full h-12 px-4 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-400";
    const labelCls = "text-sm font-bold text-gray-900 dark:text-white mb-2 block flex items-center gap-1";



    return (
        <div className="w-full">

            {/* Pill Tabs */}
            <div className="flex justify-center mb-8">
                <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-[#1D1E23] rounded-2xl border border-gray-200 dark:border-[#262626] overflow-x-auto hide-scrollbar shadow-sm">
                    {steps.map((step) => {
                        const isActive = currentStep === step.id;
                        const isClickable = step.id <= currentStep;
                        return (
                            <button
                                key={step.id}
                                type="button"
                                onClick={() => handleStepClick(step.id)}
                                disabled={!isClickable && !isActive}
                                className={`relative flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex-shrink-0 z-10 ${
                                    isActive ? "text-gray-900 dark:text-white shadow-sm border border-gray-200/50 dark:border-white/5 bg-gray-100 dark:bg-[#262626]" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                }`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {step.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <div className="max-w-6xl mx-auto px-8">

                    {/* ─── STEP 1: Basics ─── */}
                    {currentStep === 1 && (
                        <div className="py-2 space-y-10">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Basic Details</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">Define the problem identity and visibility settings.</p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left col */}
                                <div className="space-y-6">
                                    <div>
                                        <label className={labelCls}>Problem Title</label>
                                        <input
                                            {...register("title")}
                                            onInput={(e: any) => {
                                                const newSlug = e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
                                                const currentSlug = getValues("slug");
                                                if (!currentSlug || currentSlug === lastAutoGeneratedSlugRef.current) {
                                                    setValue("slug", newSlug, { shouldValidate: true });
                                                    lastAutoGeneratedSlugRef.current = newSlug;
                                                }
                                            }}
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

                                    <div>
                                        <label className={labelCls}>Topic Tags (Topic Sheets)</label>
                                        <TagInput
                                            value={selectedTopicTags}
                                            onChange={(newTopicTags) => {
                                                setSelectedTopicTags(newTopicTags);
                                                setValue("topicTags", newTopicTags.map(t => t.slug));
                                            }}
                                            placeholder="Search or create topic tags..."
                                        />
                                    </div>

                                    {/* Companies Asked In */}
                                    <div className="pt-4" ref={dropdownRef}>
                                        <label className={labelCls}>Companies Asked In</label>
                                        
                                        {/* Selected companies list */}
                                        {selectedCompanies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {selectedCompanies.map((company: any, index: number) => (
                                                    <div
                                                        key={`${company.name}-${index}`}
                                                        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-zinc-900 text-xs font-semibold text-gray-700 dark:text-gray-300"
                                                    >
                                                        {company.logo ? (
                                                            <img src={company.logo} alt={company.name} className="w-3.5 h-3.5 object-contain" />
                                                        ) : (
                                                            <div className="w-3.5 h-3.5 rounded-full bg-gray-200 dark:bg-zinc-800 text-[8px] font-bold flex items-center justify-center capitalize">{company.name.charAt(0)}</div>
                                                        )}
                                                        <span>{company.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveCompany(company.name)}
                                                            className="text-gray-400 hover:text-red-500 font-bold ml-1 transition-colors text-sm leading-none"
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Search Input */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                    setShowDropdown(true);
                                                }}
                                                onFocus={() => setShowDropdown(true)}
                                                placeholder="Search or add companies..."
                                                className={inputCls}
                                            />
                                            {showDropdown && (
                                                <div className="absolute z-50 w-full mt-1.5 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] shadow-lg max-h-[200px] overflow-y-auto pr-1">
                                                    {filteredPredefined.map((company, idx) => (
                                                        <button
                                                            key={idx}
                                                            type="button"
                                                            onClick={() => handleSelectCompany(company)}
                                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold transition-colors duration-150 border-b border-gray-100 dark:border-[#1e1e1e] last:border-b-0"
                                                        >
                                                            <img src={company.logo} alt={company.name} className="w-4 h-4 object-contain" />
                                                            {company.name}
                                                        </button>
                                                    ))}
                                                    
                                                    {searchQuery.trim() !== "" && !filteredPredefined.some(c => c.name.toLowerCase() === searchQuery.toLowerCase().trim()) && (
                                                        <button
                                                            type="button"
                                                            onClick={() => setIsAddingCustom(true)}
                                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-xs text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/5 font-bold transition-colors"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" /> Add custom company "{searchQuery.trim()}"
                                                        </button>
                                                    )}
                                                    
                                                    {filteredPredefined.length === 0 && searchQuery.trim() === "" && (
                                                        <div className="px-4 py-3 text-xs text-gray-400 italic">Type to search or add custom...</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        {/* Add Custom Company Form */}
                                        {isAddingCustom && (
                                            <div className="mt-3 p-4 rounded-[3px] border border-orange-200 dark:border-orange-500/20 bg-orange-50/20 dark:bg-orange-500/5 space-y-3">
                                                <div className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Add Custom Company</div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    <div>
                                                        <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Company Name</label>
                                                        <input
                                                            type="text"
                                                            value={searchQuery}
                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                            className={inputCls}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[11px] font-semibold text-gray-500 mb-1 block">Logo URL (Optional)</label>
                                                        <input
                                                            type="text"
                                                            value={customLogoUrl}
                                                            onChange={(e) => setCustomLogoUrl(e.target.value)}
                                                            placeholder="https://example.com/logo.png"
                                                            className={inputCls}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setIsAddingCustom(false);
                                                            setCustomLogoUrl("");
                                                        }}
                                                        className="px-3 py-1.5 border border-gray-300 dark:border-[#444] rounded-[3px] text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#222]"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (searchQuery.trim() === "") return;
                                                            handleSelectCompany({
                                                                name: searchQuery.trim(),
                                                                logo: customLogoUrl.trim() || undefined
                                                            });
                                                            setIsAddingCustom(false);
                                                            setCustomLogoUrl("");
                                                        }}
                                                        className="px-4 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-[3px] text-xs font-bold shadow-md shadow-orange-500/10"
                                                    >
                                                        Confirm Add
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {isDSA && !isConcept && (
                                        <div className="pt-4 pb-2">
                                            <label className={labelCls}>Problem Format</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("isMcq", false)}
                                                    className={`p-3 rounded-[3px] border text-left transition-all ${!watch("isMcq") ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 shadow-sm" : "border-gray-300 dark:border-[#444] hover:border-gray-400 dark:hover:border-[#555]"}`}
                                                >
                                                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Coding Problem</div>
                                                    <div className="text-[11px] text-gray-500 mt-0.5">Standard algorithm challenge</div>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setValue("isMcq", true);
                                                        if (!watch("questionType") || !watch("questionType")?.startsWith("MCQ")) {
                                                            setValue("questionType", "MCQ_SINGLE");
                                                        }
                                                    }}
                                                    className={`p-3 rounded-[3px] border text-left transition-all ${watch("isMcq") ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 shadow-sm" : "border-gray-300 dark:border-[#444] hover:border-gray-400 dark:hover:border-[#555]"}`}
                                                >
                                                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100">Quiz / MCQ</div>
                                                    <div className="text-[11px] text-gray-500 mt-0.5">Multiple choice or text answer</div>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {(watch("isMcq") || isAptitude) && (
                                        <div className="space-y-4">
                                            {/* Question Type Selector */}
                                            <div>
                                                <label className={labelCls}>Question Type</label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {QUESTION_TYPE_OPTIONS.map(opt => (
                                                        <button
                                                            key={opt.value}
                                                            type="button"
                                                            onClick={() => {
                                                                setValue("questionType", opt.value as QuestionType);
                                                                if (opt.value.startsWith("MCQ")) {
                                                                    setValue("isMcq", true);
                                                                    if (!mcqOptions || mcqOptions.length < 2) {
                                                                        setValue("options", ["", "", "", ""]);
                                                                    }
                                                                } else {
                                                                    setValue("isMcq", false);
                                                                    setValue("options", []);
                                                                }
                                                            }}
                                                            className={`
                                                                p-4 rounded-[3px] border text-left transition-all
                                                                ${questionTypeValue === opt.value
                                                                    ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10 shadow-sm"
                                                                    : "border-gray-300 dark:border-[#444] hover:border-gray-400 dark:hover:border-[#555]"
                                                                }
                                                            `}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className={`text-lg ${questionTypeValue === opt.value ? "text-orange-600" : "text-gray-400"}`}>
                                                                    {opt.icon}
                                                                </span>
                                                                <div>
                                                                    <div className={`text-sm font-bold ${questionTypeValue === opt.value ? "text-orange-700 dark:text-orange-400" : "text-gray-700 dark:text-gray-300"}`}>
                                                                        {opt.label}
                                                                    </div>
                                                                    <div className="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">
                                                                        {opt.desc}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* MCQ Options Editor */}
                                            {isMcqType && (
                                                <div className="p-6 rounded-[3px] bg-gray-50 dark:bg-[#1D1E23] border border-gray-300 dark:border-[#444] space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[10px] font-bold text-[#39424e] dark:text-gray-300 uppercase tracking-widest">MCQ Options</label>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] text-gray-500 font-medium italic">At least 2 required</span>
                                                            {isMcqMultiple && (
                                                                <span className="text-[10px] text-orange-500 font-bold ml-2">Select multiple correct answers</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-6">
                                                        {[0, 1, 2, 3].map((idx) => (
                                                            <div key={idx} className="space-y-2">
                                                                <div className="flex gap-3">
                                                                    <div className="pt-3">
                                                                        {isMcqSingle ? (
                                                                            <input
                                                                                type="radio"
                                                                                value={idx}
                                                                                checked={watch("answer") === idx.toString()}
                                                                                onChange={() => setValue("answer", idx.toString())}
                                                                                className="w-4 h-4 text-[#26bd58] bg-gray-100 border-gray-300 focus:ring-[#26bd58] dark:focus:ring-[#26bd58] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                                                            />
                                                                        ) : (
                                                                            <input
                                                                                type="checkbox"
                                                                                value={idx}
                                                                                checked={(() => {
                                                                                    try {
                                                                                        const parsed = JSON.parse(watch("answer") || "[]");
                                                                                        return Array.isArray(parsed) && parsed.includes(idx);
                                                                                    } catch {
                                                                                        return false;
                                                                                    }
                                                                                })()}
                                                                                onChange={(e) => {
                                                                                    try {
                                                                                        const parsed = JSON.parse(watch("answer") || "[]");
                                                                                        const arr = Array.isArray(parsed) ? parsed : [];
                                                                                        if (e.target.checked) {
                                                                                            setValue("answer", JSON.stringify([...arr, idx]));
                                                                                        } else {
                                                                                            setValue("answer", JSON.stringify(arr.filter((i: number) => i !== idx)));
                                                                                        }
                                                                                    } catch {
                                                                                        setValue("answer", e.target.checked ? JSON.stringify([idx]) : "[]");
                                                                                    }
                                                                                }}
                                                                                className="w-4 h-4 text-[#26bd58] bg-gray-100 border-gray-300 focus:ring-[#26bd58] dark:focus:ring-[#26bd58] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                                                            />
                                                                        )}
                                                                    </div>
                                                                    <div className="flex-1 space-y-2">
                                                                        <textarea
                                                                            {...register(`options.${idx}` as const)}
                                                                            placeholder={`Option ${idx + 1} (Markdown supported)`}
                                                                            rows={3}
                                                                            className={`${inputCls} py-2 min-h-[80px] resize-y`}
                                                                        />
                                                                        {watch(`options.${idx}`) && (
                                                                            <div className="p-3 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#222] rounded-[3px]">
                                                                                <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">Preview</div>
                                                                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                                                        {watch(`options.${idx}`) || ""}
                                                                                    </ReactMarkdown>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="pt-2">
                                                        <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest block mb-1">Correct Answer</label>
                                                        <div className="text-sm font-semibold text-[#26bd58] dark:text-[#26bd58] bg-white dark:bg-[#1D1E23] px-3 py-2 rounded-[3px] border border-gray-300 dark:border-[#444] min-h-[40px] flex items-center font-mono">
                                                            {isMcqSingle ? (
                                                                (watch("options") && watch("answer") !== "" && watch("answer") !== undefined)
                                                                    ? watch(`options.${Number(watch("answer"))}`)
                                                                    : "Select correct option using radio button"
                                                            ) : (
                                                                (() => {
                                                                    try {
                                                                        const parsed = JSON.parse(watch("answer") || "[]");
                                                                        if (Array.isArray(parsed) && parsed.length > 0) {
                                                                            return parsed.map((i: number) => watch(`options.${i}`)).filter(Boolean).join(", ");
                                                                        }
                                                                        return "Select correct options using checkboxes";
                                                                    } catch {
                                                                        return "Select correct options using checkboxes";
                                                                    }
                                                                })()
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Text Input Answer Validation Fields */}
                                            {(isTextShort || isTextLong) && (
                                                <TextAnswerEditor
                                                    answer={watch("answer") || ""}
                                                    onChange={(val) => setValue("answer", val)}
                                                    inputCls={inputCls}
                                                    labelCls={labelCls}
                                                    isLong={isTextLong}
                                                />
                                            )}
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
                                    {/* Allowed Languages */}
                                    {isDSA && !isConcept && (
                                        <div className="pt-4">
                                            <label className={labelCls}>Allowed Languages</label>
                                            <p className="text-[11px] text-gray-400 mb-3">If none selected, all languages are allowed.</p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {LANGUAGES.filter(l => l.name !== "SQL").map((lang) => {
                                                    const isSelected = watch("allowedLanguages")?.includes(lang.name);
                                                    return (
                                                        <button
                                                            key={lang.id}
                                                            type="button"
                                                            onClick={() => {
                                                                const current = watch("allowedLanguages") || [];
                                                                if (isSelected) {
                                                                    setValue("allowedLanguages", current.filter(l => l !== lang.name));
                                                                } else {
                                                                    setValue("allowedLanguages", [...current, lang.name]);
                                                                }
                                                            }}
                                                            className={`
                                                                flex items-center gap-2 px-3 py-2 rounded-[3px] border text-[11px] font-bold transition-all
                                                                ${isSelected
                                                                    ? "border-[#26bd58] bg-emerald-50 dark:bg-emerald-500/10 text-[#26bd58]"
                                                                    : "border-gray-200 dark:border-[#333] text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-[#444]"
                                                                }
                                                            `}
                                                        >
                                                            {isSelected ? <Check className="w-3 h-3" /> : <div className="w-3 h-3" />}
                                                            {lang.name}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
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
                                    <div className="mt-2 p-5 rounded-[3px] bg-gray-50 dark:bg-[#1D1E23] border border-gray-300 dark:border-[#444]">
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
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Problem Description</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">Write a clear problem statement using Markdown.</p>
                                </div>

                            </div>

                            <div className="border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden shadow-sm">
                                {/* Enhanced Toolbar */}
                                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111]">
                                    <div className="flex items-center gap-1">
                                        <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("description", "bold")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bold"><span className="text-sm">B</span></button>
                                            <button type="button" onClick={() => insertMarkdown("description", "italic")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white italic hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Italic"><span className="text-sm">i</span></button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("description", "h2")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 2"><span className="text-xs">H2</span></button>
                                            <button type="button" onClick={() => insertMarkdown("description", "h3")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 3"><span className="text-xs">H3</span></button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                            <button type="button" onClick={() => insertMarkdown("description", "list")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bullet List">
                                                <List className="w-3.5 h-3.5" />
                                            </button>
                                            <button type="button" onClick={() => insertMarkdown("description", "code")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Code Block">
                                                <Code2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
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
                                        className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#222] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#444] rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-[#333] transition-colors flex items-center gap-2"
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
                                                className="w-full px-5 py-4 bg-white dark:bg-[#1D1E23] focus:outline-none transition-all font-mono text-[15px] leading-7 text-[#39424e] dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none shadow-inner min-h-[500px]"
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-[#f8f9fa] dark:bg-[#1D1E23] overflow-y-auto min-h-[500px]">
                                            <MarkdownPreview content={descriptionValue} placeholder="Nothing to preview yet..." />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {errors.description && <p className="text-xs text-red-500 mt-1">⚠ {errors.description.message}</p>}

                            {/* SQL: Hidden Query */}
                            {domain === "SQL" && (
                                <div className="mt-6 space-y-3 p-6 rounded-[3px] border border-dashed border-gray-300 dark:border-[#444] bg-gray-50/50 dark:bg-[#24262C]">
                                    <div>
                                        <label className={labelCls}>Hidden Query <span className="normal-case font-normal text-gray-400">(Optional)</span></label>
                                        <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">Prepended to the user's code before execution (e.g. schema setup).</p>
                                        <textarea
                                            {...register("hiddenQuery")}
                                            rows={6}
                                            placeholder={"-- CREATE TABLE employees (\n--   id INT PRIMARY KEY,\n--   name VARCHAR(100)\n-- );"}
                                            className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1D1E23] resize-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Hints Section */}
                            <div className="mt-6 border-t border-gray-200 dark:border-[#333] pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-[18px] font-bold text-[#39424e] dark:text-white font-mono tracking-tight">Hints <span className="text-gray-400 font-normal text-sm ml-2">(Optional)</span></h3>
                                        <p className="text-sm italic text-[#738f93] dark:text-gray-400 font-serif">Add hints to guide users. Markdown supported.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addHint}
                                        className="px-3 py-1.5 text-xs font-bold text-[#26bd58] bg-emerald-50 dark:bg-emerald-500/10 border border-[#26bd58]/30 rounded-[3px] hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors flex items-center gap-1.5"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Add Hint
                                    </button>
                                </div>
                                
                                {hintsList.length > 0 && (
                                    <div className="space-y-4">
                                        {hintsList.map((hint, idx) => (
                                            <div key={idx} className="flex gap-3 bg-gray-50 dark:bg-[#1D1E23] p-4 rounded-[3px] border border-gray-300 dark:border-[#444]">
                                                <div className="pt-2 text-gray-500 font-bold text-sm">
                                                    #{idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <textarea
                                                        value={hint}
                                                        onChange={(e) => updateHint(idx, e.target.value)}
                                                        placeholder="Write hint here..."
                                                        rows={3}
                                                        className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none font-mono text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-[#1a1a1a] resize-y"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeHint(idx)}
                                                    className="h-10 px-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[3px] transition-colors self-start"
                                                    title="Remove Hint"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 3: Solution ─── */}
                    {currentStep === 3 && (
                        <div className="py-2 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Solution / Editorial</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">Shown only after a user successfully solves the problem.</p>
                                </div>
                            </div>
                            <Controller
                                name="solution"
                                control={control}
                                render={({ field }) => (
                                    <SolutionsEditor
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                        onSave={() => {
                                            isDraftRef.current = true;
                                            handleSubmit(
                                                onSubmitForm,
                                                () => {
                                                    isDraftRef.current = false;
                                                }
                                            )().catch(() => {
                                                isDraftRef.current = false;
                                            });
                                        }}
                                        isSaving={isLoading}
                                        onImageUpload={uploadImageForSolution}
                                    />
                                )}
                            />
                        </div>
                    )}

                    {/* ─── STEP 4: Animation Script (DSA only) ─── */}
                    {currentStep === 4 && isDSA && (
                        <div className="py-2 space-y-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Animation Script</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">
                                        Define a step-by-step animation to visualize the algorithm. Paste a JSON script below.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* JSON Editor */}
                                <div className="space-y-3">
                                    <label className={labelCls}>Animation JSON Script</label>
                                    <textarea
                                        {...register("animationScript")}
                                        rows={20}
                                        placeholder={`{
  "title": "Bubble Sort",
  "steps": [
    {
      "id": 1,
      "line": 2,
      "caption": "Initialize array",
      "speech": "We start with an unsorted array.",
      "state": {
        "array": [5, 3, 8, 1, 2],
        "variables": { "i": 0, "j": 0 }
      }
    }
  ]
}`}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-[#333] focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none font-mono text-xs text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#111] resize-none"
                                    />
                                    <p className="text-[10px] text-gray-400 dark:text-gray-600">
                                        Paste the JSON animation script. See the format guide below.
                                    </p>
                                </div>

                                {/* Preview */}
                                <div className="space-y-3">
                                    <label className={labelCls}>Live Preview</label>
                                    {watch("animationScript") ? (
                                        <AnimationPlayer
                                            animationScript={watch("animationScript") || ""}
                                            compact
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-gray-300 dark:border-[#444] bg-gray-50 dark:bg-[#1D1E23] text-center">
                                            <div className="text-gray-400 dark:text-gray-600">
                                                <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                                <p className="text-xs">Paste a JSON script to preview</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Format Guide */}
                            <div className="p-5 rounded-xl border border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#1D1E23]">
                                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Animation Script Format</h4>
                                <div className="text-[11px] text-gray-600 dark:text-gray-400 space-y-2 font-mono">
                                    <p><span className="text-orange-600 dark:text-orange-400">title</span>: Algorithm name (string)</p>
                                    <p><span className="text-orange-600 dark:text-orange-400">steps</span>: Array of step objects</p>
                                    <p className="ml-4">Each step: {"{ id, line, caption, speech, animation: [], state: {} }"}</p>
                                    <p className="ml-4"><span className="text-orange-600 dark:text-orange-400">state.array</span>: Array of values to display</p>
                                    <p className="ml-4"><span className="text-orange-600 dark:text-orange-400">state.pointer</span>: {"{ name: index }"} for pointer labels</p>
                                    <p className="ml-4"><span className="text-orange-600 dark:text-orange-400">state.variables</span>: {"{ key: value }"} for variable display</p>
                                    <p className="ml-4"><span className="text-orange-600 dark:text-orange-400">animation</span>: [{"{ type: 'swap'|'compare'|'visit'|'highlight', object: 'array', index: N }"}]</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ─── STEP 5: Test Cases ─── */}
                    {currentStep === 5 && (
                        <div className="py-2 space-y-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Test Cases</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">Define input/output pairs used to validate submissions.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ input: "", output: "", hidden: false })}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-bold rounded-xl transition-all shadow-md hover:scale-105 active:scale-95"
                                >
                                    <Plus className="w-4 h-4" /> Add Test Case
                                </button>
                            </div>

                            <div className="space-y-5">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="group rounded-xl border border-gray-200 dark:border-[#333] bg-white dark:bg-[#0f0f0f] overflow-hidden hover:border-gray-300 dark:hover:border-[#444] transition-colors shadow-sm">
                                        {/* Card header */}
                                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-300 dark:border-[#444] bg-gray-50/80 dark:bg-[#1D1E23]">
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
                                                        className="w-3.5 h-3.5 rounded border-gray-300 dark:border-[#444] text-orange-500 focus:ring-orange-500 dark:bg-[#1D1E23] cursor-pointer"
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
                                                    className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none text-sm font-mono bg-gray-50 dark:bg-[#1D1E23] text-gray-900 dark:text-gray-100 resize-none"
                                                    placeholder={"nums = [2,7,11,15]\ntarget = 9"}
                                                />
                                            </div>
                                            <div className="p-5 space-y-2">
                                                <label className="text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">Expected Output</label>
                                                <textarea
                                                    {...register(`testCases.${index}.output` as const)}
                                                    rows={4}
                                                    className="w-full px-4 py-3 rounded-[3px] border border-gray-300 dark:border-[#444] focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] outline-none text-sm font-mono bg-gray-50 dark:bg-[#1D1E23] text-gray-900 dark:text-gray-100 resize-none"
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

                    {/* ─── STEP 6: Code Templates (DSA only) ─── */}
                    {isDSA && currentStep === 6 && (
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
                                allowedLanguages={watch("allowedLanguages") || []}
                                onAllowedLanguagesChange={(langs) => setValue("allowedLanguages", langs)}
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
