"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
    Loader2, X, Trophy, Calendar, Users,
    Globe, School, BookOpen, Plus, CheckCircle2, Layers,
    ChevronRight, ChevronLeft, Image, FileText, Award, Settings,
    Code, Database, Eye, EyeOff
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { createContest, getInstitutionalClassrooms, createContestWithProblems, checkContestSlug, updateContestWithProblems } from "@/actions/contest";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import ProblemForm from "@/components/admin/ProblemForm";
import { ProblemDomain } from "@prisma/client";
import { useCallback, useRef } from "react";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Extended contest schema with new fields
const contestSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    startTimeOfDay: z.string().min(1, "Start time is required"),
    startAmPm: z.enum(["AM", "PM"]).default("AM"),
    endDate: z.string().optional(),
    endTimeOfDay: z.string().optional(),
    endAmPm: z.enum(["AM", "PM"]).default("AM"),
    hasNoEndTime: z.boolean().default(false),
    visibility: z.enum(["PUBLIC", "INSTITUTION", "CLASSROOM"]),
    hidden: z.boolean(),
    classroomId: z.string().optional(),
    backgroundImage: z.string().optional(),
    ogImage: z.string().optional(),
    useOgImage: z.boolean().default(false),
    prizes: z.string().optional(),
    rules: z.string().optional(),
    scoring: z.string().optional(),
    isProtected: z.boolean().default(true),
    targetEmails: z.string().optional(), // We'll parse this as array on submit
    mode: z.enum(["SEQUENTIAL", "PARALLEL"]).default("PARALLEL"),
    durationMinutes: z.number().int().min(1).optional().nullable(),
    sections: z.array(z.object({
        id: z.string(),
        title: z.string().min(1, "Section title required"),
        description: z.string().optional(),
        order: z.number(),
        durationMinutes: z.number().int().min(1).optional().nullable(),
        problems: z.array(z.object({
            id: z.string(),
            title: z.string(),
            domain: z.enum(["DSA", "SQL"]),
        })).optional()
    })).min(1, "At least one section is required"),
    contestPassword: z.string().optional(),
    randomizeQuestions: z.boolean().default(false),
    isIPRestricted: z.boolean().default(false),
    allowedIPs: z.string().optional(),
});

type FormData = z.infer<typeof contestSchema>;

interface ContestProblem {
    id: string;
    title: string;
    domain: "DSA" | "SQL";
    data: any; // Full problem data
}

interface ContestSection {
    id: string;
    title: string;
    description?: string;
    order: number;
    durationMinutes?: number | null;
    problems: ContestProblem[];
}

function MarkdownEditor({ label, name, register, watch, setValue, placeholder }: any) {
    const [preview, setPreview] = useState(false);
    const value = watch(name) || "";

    return (
        <div className="space-y-2 max-w-4xl">
            <div className="flex items-center justify-between">
                <label className="block text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono mb-1.5">{label}</label>
            </div>
            <div className="border border-gray-300 dark:border-[#444] rounded-[3px] overflow-hidden bg-white dark:bg-[#1a1a1a]">
                {/* Toolbar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-[#333] bg-[#f8f9fa] dark:bg-[#111]">
                    <div className="flex items-center gap-1 text-gray-400">
                        <button type="button" onClick={() => setValue(name, value + "**bold text** ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white font-bold font-serif hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors"><span className="text-sm">B</span></button>
                        <button type="button" onClick={() => setValue(name, value + "*italic text* ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white italic font-serif hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors"><span className="text-sm">i</span></button>
                        <div className="w-px h-4 bg-gray-300 dark:bg-[#444] mx-1"></div>
                        <button type="button" onClick={() => setValue(name, value + "\n- list item ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors">
                            <Layers className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => setValue(name, value + "\n1. list item ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors">
                            <span className="font-mono text-[10px] font-bold leading-none py-0.5 px-0.5 border border-current rounded-sm whitespace-nowrap">1 2</span>
                        </button>
                        <div className="w-1px h-4 bg-gray-300 dark:bg-[#444] mx-1"></div>
                        <button type="button" onClick={() => setValue(name, value + "![alt text](image url) ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors">
                            <Image className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => setValue(name, value + "[link text](url) ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors">
                            <Globe className="w-4 h-4" />
                        </button>
                        <button type="button" onClick={() => setValue(name, value + "`inline code` ")} className="w-8 h-8 flex items-center justify-center hover:text-[#39424e] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#333] rounded-[3px] transition-colors">
                            <Code className="w-4 h-4" />
                        </button>
                    </div>
                    <button type="button" onClick={() => setPreview(!preview)} className="px-3 py-1.5 text-xs font-semibold bg-[#ebf0f4] dark:bg-[#222] text-[#39424e] dark:text-gray-300 border border-[#dcdcdc] dark:border-[#444] rounded-[3px] shadow-sm hover:bg-[#e2e8ec] dark:hover:bg-[#333] transition-colors">
                        {preview ? "Edit" : "Preview"}
                    </button>
                </div>
                {/* Editor/Preview */}
                <div className="p-0">
                    {preview ? (
                        <div className="p-4 prose dark:prose-invert max-w-none text-[#39424e] dark:text-gray-300 text-[15px] font-mono whitespace-pre-wrap min-h-[160px] bg-[#f8f9fa] dark:bg-[#111]">
                            {value ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown> : <span className="text-gray-400 italic font-mono">No content provider. Rendered markdown will appear here.</span>}
                        </div>
                    ) : (
                        <textarea
                            {...register(name)}
                            rows={6}
                            className="w-full px-4 py-3 bg-white dark:bg-[#1a1a1a] focus:outline-none transition-all text-[15px] font-mono text-[#39424e] dark:text-gray-300 resize-y min-h-[160px]"
                            placeholder={placeholder}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

interface CreateContestWizardProps {
    institutionId?: string | null;
    userId?: string;
    userRole?: string;
    initialData?: any;
    isEditing?: boolean;
}

export default function CreateContestWizard({
    institutionId: initialInstitutionId,
    userId,
    userRole,
    initialData,
    isEditing
}: CreateContestWizardProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("Details");
    const [isLoading, setIsLoading] = useState(false);
    const [institutionId, setInstitutionId] = useState<string | null>(initialInstitutionId || initialData?.institutionId || null);
    const [classrooms, setClassrooms] = useState<any[]>([]);

    // Core section state replacing flat problems
    const [sections, setSections] = useState<ContestSection[]>([{
        id: `sec-${Date.now()}`,
        title: "Main Section",
        order: 0,
        problems: []
    }]);

    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const [showProblemForm, setShowProblemForm] = useState<"DSA" | "SQL" | null>(null);
    const [isCreatingProblem, setIsCreatingProblem] = useState(false);
    const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null);
    const [isCheckingSlug, setIsCheckingSlug] = useState(false);
    const [problemToEdit, setProblemToEdit] = useState<ContestProblem | null>(null);


    const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(contestSchema) as any,
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            startDate: initialData?.startTime ? new Date(initialData.startTime).toISOString().split('T')[0] : "",
            startTimeOfDay: initialData?.startTime ? new Date(initialData.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "",
            startAmPm: "AM", // We'll set this below if needed
            endDate: initialData?.endTime ? new Date(initialData.endTime).toISOString().split('T')[0] : "",
            endTimeOfDay: initialData?.endTime ? new Date(initialData.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : "",
            endAmPm: "AM",
            hasNoEndTime: !initialData?.endTime,
            visibility: initialData?.visibility || (userRole === "CONTEST_MANAGER" ? (initialInstitutionId ? "INSTITUTION" : "CLASSROOM") : "PUBLIC"),
            hidden: initialData?.hidden || false,
            classroomId: initialData?.classroomId || "",
            backgroundImage: initialData?.backgroundImage || "",
            ogImage: initialData?.ogImage || "",
            useOgImage: initialData?.useOgImage || false,
            prizes: initialData?.prizes || "",
            rules: initialData?.rules || "",
            scoring: initialData?.scoring || "",
            isProtected: initialData?.isProtected !== undefined ? initialData.isProtected : true,
            targetEmails: initialData?.targetEmails?.join(", ") || "",
            mode: initialData?.mode || "PARALLEL",
            durationMinutes: initialData?.durationMinutes || null,
            sections: [], // Initialized via useEffect sync
            contestPassword: "", // Start empty in edit mode to avoid showing hashes
            randomizeQuestions: initialData?.randomizeQuestions || false,
            isIPRestricted: initialData?.isIPRestricted || false,
            allowedIPs: initialData?.allowedIPs?.join(", ") || "",
        } as Partial<FormData>,
        mode: "onBlur",
        reValidateMode: "onChange",
    });

    const visibility = watch("visibility");
    const isHidden = watch("hidden");
    // const isContestManager = userRole === "CONTEST_MANAGER"; // userRole is no longer a prop

    // Fetch classrooms if institution visibility or classroom visibility is selected
    useEffect(() => {
        // Assuming institutionId is available from initialData or context if editing
        const currentInstitutionId = initialData?.institutionId || institutionId; // Use initialData's institutionId if available
        if (currentInstitutionId && (visibility === "CLASSROOM" || visibility === "INSTITUTION")) {
            getInstitutionalClassrooms(currentInstitutionId).then(res => {
                if (res.success) setClassrooms(res.classrooms || []);
            });
        }
    }, [visibility, initialData?.institutionId, institutionId]);

    // Manual debounce for slug check
    const debounceTimer = useRef<NodeJS.Timeout|null>(null);
    const checkSlugAvailability = useCallback((slug: string) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        if (slug.length < 3) {
            setIsSlugAvailable(null);
            return;
        }

        setIsCheckingSlug(true);
        debounceTimer.current = setTimeout(async () => {
            if (isEditing && slug === initialData?.slug) {
                setIsSlugAvailable(true);
                setIsCheckingSlug(false);
                return;
            }
            const res = await checkContestSlug(slug);
            if (res.success) {
                setIsSlugAvailable(res.isAvailable ?? false);
            }
            setIsCheckingSlug(false);
        }, 500);
    }, []);

    const slug = watch("slug");
    useEffect(() => {
        if (slug) {
            checkSlugAvailability(slug);
        } else {
            setIsSlugAvailable(null);
        }
    }, [slug, checkSlugAvailability]);

    // Auto-generate slug from title
    const title = watch("title");
    useEffect(() => {
        if (title && !slug) { // Only auto-generate if slug is empty
            const autoSlug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setValue("slug", autoSlug);
        }
    }, [title, setValue]);

    const isInitializedRef = useRef(false);
    // Set initial sections if editing or first load
    useEffect(() => {
        if (isInitializedRef.current) return;

        if (isEditing && initialData?.sections) {
            const mappedSections = initialData.sections.map((sec: any) => ({
                id: sec.id || `sec-${Date.now()}-${Math.random()}`,
                title: sec.title,
                description: sec.description || "",
                order: sec.order,
                durationMinutes: sec.durationMinutes || null,
                problems: (sec.problems || []).map((cp: any) => ({
                    id: cp.problem.id,
                    title: cp.problem.title,
                    domain: cp.problem.domain,
                    data: cp.problem,
                }))
            }));

            if (mappedSections.length > 0) {
                setSections(mappedSections);
                setActiveSectionId(mappedSections[0].id);
                setValue("sections", mappedSections);
                isInitializedRef.current = true;
            }
        } else if (!isEditing && sections.length > 0) {
            // First time load: active section is the default one
            setActiveSectionId(sections[0].id);
            setValue("sections", sections);
            isInitializedRef.current = true;
        }
    }, [isEditing, initialData, setValue, sections, setActiveSectionId]);

    // Set AM/PM for start/end times based on initialData
    useEffect(() => {
        if (initialData?.startTime) {
            const startHour = new Date(initialData.startTime).getHours();
            setValue("startAmPm", startHour >= 12 ? "PM" : "AM");
        }
        if (initialData?.endTime) {
            const endHour = new Date(initialData.endTime).getHours();
            setValue("endAmPm", endHour >= 12 ? "PM" : "AM");
        }
    }, [initialData, setValue]);

    const handleProblemSubmit = async (data: any, domain: "DSA" | "SQL") => {
        if (!activeSectionId) {
            toast.error("Please select a section first");
            return;
        }

        setIsCreatingProblem(true);
        try {
            const problemId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const newProblem: ContestProblem = {
                id: problemId,
                title: data.title,
                domain,
                data: { ...data, domain },
            };

            const updatedSections = sections.map(sec =>
                sec.id === activeSectionId
                    ? { ...sec, problems: [...sec.problems, newProblem] }
                    : sec
            );

            setSections(updatedSections);
            setValue("sections", updatedSections);
            setShowProblemForm(null);
            toast.success(`${domain} problem added successfully!`);
        } catch (error) {
            toast.error("Failed to add problem");
        } finally {
            setIsCreatingProblem(false);
        }
    };

    const removeProblem = (sectionId: string, problemId: string) => {
        const updatedSections = sections.map(sec =>
            sec.id === sectionId
                ? { ...sec, problems: sec.problems.filter(p => p.id !== problemId) }
                : sec
        );
        setSections(updatedSections);
        setValue("sections", updatedSections);
    };

    const onInvalid = (errors: any) => {
        console.error("Form errors:", errors);
        const firstErrorPath = Object.keys(errors)[0];
        const firstError = errors[firstErrorPath];
        toast.error(`Please fix errors in ${firstErrorPath}: ${firstError?.message || 'Invalid input'}`);
    };

    const onSubmit = async (formData: FormData) => {
        // Validate sections and problems
        if (sections.length === 0 || sections.some(s => s.problems.length === 0)) {
            toast.error("Every section must contain at least one problem");
            setActiveTab("Challenges");
            return;
        }

        if (isSlugAvailable === false) {
            toast.error("Contest URL is already taken");
            setActiveTab("Details");
            return;
        }

        setIsLoading(true);
        const toastId = toast.loading(isEditing ? "Updating contest..." : "Creating contest...");
        try {
            // Parse emails
            const emailArray = formData.targetEmails
                ? formData.targetEmails.split(",").map(e => e.trim()).filter(e => e.length > 0)
                : [];

            const parseTime = (timeStr: string, amPm: "AM" | "PM") => {
                let [hours, minutes] = timeStr.split(":").map(Number);
                if (amPm === "PM" && hours < 12) hours += 12;
                if (amPm === "AM" && hours === 12) hours = 0;
                return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            };

            const startTimeOfDay24 = parseTime(formData.startTimeOfDay, formData.startAmPm);
            let finalStartTime = new Date();
            if (formData.startDate && startTimeOfDay24) {
                finalStartTime = new Date(`${formData.startDate}T${startTimeOfDay24}`);
            }

            let finalEndTime = new Date("2099-12-31T23:59:00");
            if (!formData.hasNoEndTime && formData.endDate && formData.endTimeOfDay) {
                const endTimeOfDay24 = parseTime(formData.endTimeOfDay, formData.endAmPm);
                finalEndTime = new Date(`${formData.endDate}T${endTimeOfDay24}`);
            }

            const currentInstitutionId = initialData?.institutionId || institutionId; // Use initialData's institutionId if available

            const contestData = {
                ...formData,
                startTime: finalStartTime,
                endTime: finalEndTime,
                institutionId: formData.visibility !== "PUBLIC" ? currentInstitutionId : null,
                targetEmails: emailArray,
                sections: sections.map(sec => ({
                    title: sec.title.trim() || 'Untitled Section',
                    description: sec.description || undefined,
                    order: sec.order,
                    durationMinutes: sec.durationMinutes ? parseInt(sec.durationMinutes.toString()) : null,
                    problems: sec.problems.map(p => p.data),
                })),
                isIPRestricted: formData.isIPRestricted,
                allowedIPs: formData.allowedIPs ? formData.allowedIPs.split(",").map(ip => ip.trim()).filter(ip => ip.length > 0) : [],
            };

            const res = isEditing && initialData?.id
                ? await updateContestWithProblems(initialData.id, contestData)
                : await createContestWithProblems(contestData);

            if (res.success) {
                toast.success(isEditing ? "Contest updated successfully!" : "Contest launched successfully!", { id: toastId });
                router.push("/dashboard/contests");
                router.refresh();
            } else {
                toast.error(res.error || `Failed to ${isEditing ? 'update' : 'create'} contest`, { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    const tabs = ["Details", "Landing Page", "Challenges", "Settings"];

    const renderTabContent = () => {
        switch (activeTab) {
            case "Details":
                return (
                    <div className="space-y-10 max-w-4xl py-2">
                        <div>
                            <h2 className="text-[28px] font-bold text-[#39424e] dark:text-white mb-2 font-mono tracking-tight">Contest Details</h2>
                            <p className="text-[15px] italic text-[#738f93] dark:text-gray-400 font-serif max-w-2xl">
                                Customize your contest by providing more information needed to create your landing page. Your contest will only be available to those who have access to the contest URL.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="grid grid-cols-[220px_1fr] items-center gap-6">
                                <label className="text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono flex gap-1">
                                    Contest Name <span className="text-red-500">*</span>
                                </label>
                                <div>
                                    <input
                                        {...register("title")}
                                        className="w-full max-w-[320px] px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all text-[15px] font-mono shadow-sm"
                                        placeholder="one 1774192669"
                                    />
                                    {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-[220px_1fr] items-center gap-6">
                                <label className="text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono">
                                    Contest URL
                                </label>
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center text-[15px] text-[#39424e] dark:text-gray-300 font-mono">
                                        https://www.algo-fox.com/contest/
                                        <input
                                            {...register("slug")}
                                            className="ml-1 w-64 px-2 py-1 bg-transparent border-b border-dashed border-gray-400 dark:border-[#555] focus:outline-none focus:border-solid focus:border-[#26bd58] transition-all font-mono text-[15px] text-[#39424e] dark:text-gray-300"
                                            placeholder="weekly-challenge"
                                        />
                                    </div>
                                    <div className="flex items-center px-1 text-xs font-medium">
                                        {isCheckingSlug ? (
                                            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                        ) : isSlugAvailable === true ? (
                                            <span className="text-[#26bd58] font-mono">Available</span>
                                        ) : isSlugAvailable === false ? (
                                            <span className="text-red-600 font-mono">Taken</span>
                                        ) : null}
                                    </div>
                                    {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-[220px_1fr] items-start gap-6">
                                <label className="text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono mt-2 flex gap-1">
                                    Start Time <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="date"
                                            {...register("startDate")}
                                            className="w-[160px] px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all text-[15px] font-mono shadow-sm text-[#39424e] dark:text-gray-300 uppercase tracking-widest"
                                        />
                                        <span className="text-[#39424e] dark:text-gray-400 font-mono font-bold text-[14px]">at</span>
                                        <div className="flex items-center group">
                                            <input
                                                type="text"
                                                {...register("startTimeOfDay")}
                                                placeholder="12:00"
                                                className="w-[80px] px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] border-r-0 rounded-l-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all text-[15px] font-mono shadow-sm text-[#39424e] dark:text-gray-300 tracking-widest"
                                            />
                                            <select
                                                {...register("startAmPm")}
                                                className="px-2 py-[8.5px] bg-gray-50 dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-r-[3px] text-[13px] font-bold font-mono text-[#39424e] dark:text-gray-300 appearance-none cursor-pointer hover:bg-gray-100 focus:outline-none"
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                        <span className="text-[#39424e] dark:text-gray-400 font-mono text-[14px] ml-1">IST</span>
                                    </div>
                                    {(errors.startDate || errors.startTimeOfDay) && <p className="text-xs text-red-500">{(errors.startDate?.message || errors.startTimeOfDay?.message) as string}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-[220px_1fr] items-start gap-6">
                                <label className="text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono mt-2 flex gap-1">
                                    End Time <span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="date"
                                            disabled={watch("hasNoEndTime")}
                                            {...register("endDate")}
                                            className="w-[160px] px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all text-[15px] font-mono shadow-sm disabled:bg-gray-100 disabled:opacity-50 text-[#39424e] dark:text-gray-300 uppercase tracking-widest"
                                        />
                                        <span className="text-[#39424e] dark:text-gray-400 font-mono font-bold text-[14px]">at</span>
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                disabled={watch("hasNoEndTime")}
                                                {...register("endTimeOfDay")}
                                                placeholder="12:00"
                                                className="w-[80px] px-3 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] border-r-0 rounded-l-[3px] focus:outline-none focus:border-[#26bd58] focus:ring-1 focus:ring-[#26bd58] transition-all text-[15px] font-mono shadow-sm disabled:bg-gray-100 disabled:opacity-50 text-[#39424e] dark:text-gray-300 tracking-widest"
                                            />
                                            <select
                                                disabled={watch("hasNoEndTime")}
                                                {...register("endAmPm")}
                                                className="px-2 py-[8.5px] bg-gray-50 dark:bg-[#222] border border-gray-300 dark:border-[#444] rounded-r-[3px] text-[13px] font-bold font-mono text-[#39424e] dark:text-gray-300 appearance-none cursor-pointer hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 focus:outline-none"
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                        <span className="text-[#39424e] dark:text-gray-400 font-mono text-[14px] ml-1">IST</span>
                                    </div>
                                    {(!watch("hasNoEndTime") && (errors.endDate || errors.endTimeOfDay)) && <p className="text-xs text-red-500">{(errors.endDate?.message || errors.endTimeOfDay?.message) as string}</p>}

                                    <div className="flex items-center gap-3 pt-1">
                                        <input
                                            type="checkbox"
                                            {...register("hasNoEndTime")}
                                            className="w-[18px] h-[18px] rounded-[3px] border-2 border-gray-300 text-[#1ba94c] focus:ring-0 focus:ring-offset-0 transition-all checked:bg-[#1ba94c] checked:border-[#1ba94c] cursor-pointer"
                                        />
                                        <span className="text-[13px] text-[#39424e] dark:text-gray-400 font-mono font-medium">This contest has no end time.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case "Landing Page":
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Landing Page Customization</h3>
                            <p className="text-sm text-gray-500 mb-6">Design how participants see your contest before they join.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-500/5 border border-orange-100 dark:border-orange-500/20 rounded-xl">
                                <input
                                    type="checkbox"
                                    id="useOgImage"
                                    {...register("useOgImage")}
                                    className="w-4 h-4 text-orange-600 rounded border-gray-300"
                                />
                                <label htmlFor="useOgImage" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Use as Open Graph Image (Social Sharing Preview)
                                </label>
                            </div>

                            <MarkdownEditor label="Description" name="description" register={register} watch={watch} setValue={setValue} placeholder="Tell participants what this contest is about..." />

                            <MarkdownEditor label="Prizes (Optional)" name="prizes" register={register} watch={watch} setValue={setValue} placeholder="List the awards or recognition..." />

                            <MarkdownEditor label="Rules" name="rules" register={register} watch={watch} setValue={setValue} placeholder="Anti-plagiarism rules, environment details, etc..." />

                            <MarkdownEditor label="Scoring" name="scoring" register={register} watch={watch} setValue={setValue} placeholder="How will points be awarded?" />
                        </div>
                    </div>
                );
            case "Challenges":
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Sections & Challenges</h3>
                                <p className="text-sm text-gray-500 max-w-xl">Group your contest problems into sections. {watch("mode") === "SEQUENTIAL" && <span className="text-orange-500 font-semibold">Sequential Mode active: Participants must submit sections in order without returning.</span>}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSections([...sections, { id: `sec-${Date.now()}`, title: `Section ${String.fromCharCode(65 + sections.length)}`, order: sections.length, problems: [] }])}
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-2 text-sm transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Add Section
                            </button>
                        </div>

                        <div className="space-y-8">
                            {sections.map((sec, sIdx) => (
                                <div key={sec.id} className="border border-gray-200 dark:border-[#333] rounded-xl p-5 sm:p-6 bg-white dark:bg-[#1a1a1a] shadow-sm relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>

                                    {/* Section Header Controls */}
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 block">Section Title <span className="text-red-500">*</span></label>
                                                <input
                                                    value={sec.title}
                                                    onChange={e => { const updated = [...sections]; updated[sIdx].title = e.target.value; setSections(updated); setValue("sections", updated); }}
                                                    className="w-full px-3 py-2 bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-[#444] rounded-[5px] focus:outline-none focus:border-blue-500 font-semibold text-gray-900 dark:text-white h-[42px]"
                                                    placeholder="Section Name (e.g., Aptitude)"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-2 ">
                                                    Duration (Mins) <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded font-normal text-[9px]">Optional</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={sec.durationMinutes || ""}
                                                    onChange={e => { const updated = [...sections]; updated[sIdx].durationMinutes = e.target.value ? parseInt(e.target.value) : null; setSections(updated); setValue("sections", updated); }}
                                                    className="w-full sm:w-[150px] px-3 py-2 bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-[#444] rounded-[5px] focus:outline-none focus:border-blue-500 font-mono text-gray-900 dark:text-white h-[42px]"
                                                    placeholder="Unlimited"
                                                />
                                            </div>
                                        </div>
                                        {sections.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => { const updated = sections.filter(s => s.id !== sec.id); setSections(updated); setValue("sections", updated); }}
                                                className="self-end sm:self-start p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 dark:bg-black/20 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-900 h-[42px]"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Action Triggers */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => { setActiveSectionId(sec.id); setShowProblemForm("DSA"); }}
                                            className="flex flex-col items-center justify-center p-4 bg-[#fafafa] dark:bg-[#111] border border-dashed border-gray-300 dark:border-[#444] hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-xl transition-all group max-h-[140px]"
                                        >
                                            <div className="p-2 bg-orange-100 dark:bg-orange-500/10 text-orange-600 rounded-lg mb-2 group-hover:scale-110 transition-transform">
                                                <Code className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white text-sm">Add DSA</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setActiveSectionId(sec.id); setShowProblemForm("SQL"); }}
                                            className="flex flex-col items-center justify-center p-4 bg-[#fafafa] dark:bg-[#111] border border-dashed border-gray-300 dark:border-[#444] hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/5 rounded-xl transition-all group max-h-[140px]"
                                        >
                                            <div className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded-lg mb-2 group-hover:scale-110 transition-transform">
                                                <Database className="w-5 h-5" />
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white text-sm">Add SQL</span>
                                        </button>
                                    </div>

                                    {/* Problems Rendering scoped to loop */}
                                    {sec.problems.length > 0 && (
                                        <div className="space-y-3 mt-6">
                                            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Attached Problems ({sec.problems.length})</h4>
                                            <div className="space-y-2">
                                                {sec.problems.map((problem, index) => (
                                                    <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-lg group/item hover:border-blue-300 dark:hover:border-[#444] transition-colors">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-7 h-7 flex items-center justify-center bg-white dark:bg-black/50 border border-gray-200 dark:border-[#333] rounded-md text-xs font-bold text-gray-500">
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">{problem.title}</p>
                                                                <p className={`text-[10px] uppercase font-bold tracking-wider ${problem.domain === 'DSA' ? 'text-orange-500' : 'text-blue-500'}`}>{problem.domain}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeProblem(sec.id, problem.id)}
                                                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-all"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "Settings":
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Contest Settings</h3>
                            <p className="text-sm text-gray-500 mb-6">Configure security and visibility for your contest.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className=" text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-2">
                                        Password {isEditing && initialData?.contestPassword ? "(Is Set)" : "(Optional)"}
                                        <div className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-[10px] text-gray-500 rounded uppercase font-bold">Security</div>
                                    </label>
                                    <div className="relative">
                                        <input
                                            {...register("contestPassword")}
                                            type="text"
                                            className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-mono"
                                            placeholder={isEditing && initialData?.contestPassword ? "•••••••• (Leave blank to keep current)" : "Enter access code..."}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-[#333] rounded-xl flex flex-col gap-4">
                                        <div>
                                            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5 block  items-center gap-2">
                                                Topology Mode <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-500/10 text-blue-600 rounded text-[10px] uppercase font-bold">Important</span>
                                            </label>
                                            <select
                                                {...register("mode")}
                                                className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-semibold text-gray-800 dark:text-gray-200"
                                            >
                                                <option value="PARALLEL">Parallel (All Sections Open)</option>
                                                <option value="SEQUENTIAL">Sequential (Must complete in order)</option>
                                            </select>
                                            <p className="text-xs text-gray-500 mt-2">
                                                Sequential mode locks users into one section at a time.
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-sm font-semibold text-gray-900 dark:text-white mb-1.5 block  items-center gap-2">
                                                Global Duration <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded text-[10px] uppercase font-bold">Minutes</span>
                                            </label>
                                            <input
                                                type="number"
                                                min="1"
                                                {...register("durationMinutes", { setValueAs: v => v === '' ? undefined : Number(v) })}
                                                placeholder="Total allowed time..."
                                                className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-mono"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">
                                                Leave blank to allow users to work until the global End Time completes.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-[#333] rounded-xl">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Randomize Questions</p>
                                            <p className="text-xs text-gray-500">Each participant sees questions in different order.</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register("randomizeQuestions")}
                                            className="w-5 h-5 text-orange-600 rounded border-gray-300"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-[#333] rounded-xl">
                                        <div className="space-y-0.5">
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Allow Protection</p>
                                            <p className="text-xs text-gray-500">Enable anti-cheat and session monitoring.</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            {...register("isProtected")}
                                            className="w-5 h-5 text-orange-600 rounded border-gray-300"
                                        />
                                    </div>

                                    <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-[#333]">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-[#333] rounded-xl">
                                            <div className="space-y-0.5">
                                                <div className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                    IP Restriction
                                                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-500/10 text-[10px] text-red-600 rounded uppercase font-bold">Advanced</span>
                                                </div>
                                                <p className="text-xs text-gray-500">Allow access only from specific IP addresses.</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                {...register("isIPRestricted")}
                                                className="w-5 h-5 text-orange-600 rounded border-gray-300"
                                            />
                                        </div>

                                        {watch("isIPRestricted") && (
                                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                                <label className="block text-xs font-bold text-[#39424e] dark:text-gray-300 font-mono uppercase tracking-wider">
                                                    Allowed IP Addresses
                                                </label>
                                                <textarea
                                                    {...register("allowedIPs")}
                                                    rows={3}
                                                    className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#444] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-mono text-sm"
                                                    placeholder="103.25.1.10, 103.25.1.11, ..."
                                                />
                                                <p className="text-[11px] text-gray-500 font-serif italic">Separate multiple IP addresses with commas.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Visibility</label>
                                    <select
                                        {...register("visibility")}
                                        className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                    >
                                        <option value="PUBLIC">Public (Visible to everyone)</option>
                                        {institutionId && (
                                            <>
                                                <option value="INSTITUTION">Institutional (Only for your organization)</option>
                                                <option value="CLASSROOM">Classroom (Target specific batch)</option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                {watch("visibility") === "CLASSROOM" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Select Classroom</label>
                                        <select
                                            {...register("classroomId")}
                                            className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                        >
                                            <option value="">Choose a classroom...</option>
                                            {classrooms.map((c) => (
                                                <option key={c.id} value={c.id}>{c.name} {c.section ? `(${c.section})` : ""}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Target Emails (CSV)</label>
                                    <textarea
                                        {...register("targetEmails")}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-[#333] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-sm"
                                        placeholder="email1@example.com, email2@example.com"
                                    />
                                    <p className="text-[10px] text-gray-400 mt-1">Leave empty to allow all eligible participants.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Problem Form Modal via full page override */}
            {showProblemForm && (
                <div className="fixed inset-0 bg-white dark:bg-[#121212] z-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between shadow-sm bg-white dark:bg-[#121212] sticky top-0 z-10 w-full">
                        <div className="flex items-center gap-4">
                            <button type="button" onClick={() => setShowProblemForm(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors flex items-center gap-2">
                                <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                                <span className="font-semibold text-gray-900 dark:text-white text-sm">Back to Contest Wizard</span>
                            </button>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-l pl-4 border-gray-300 dark:border-white/10 hidden sm:block">Create {showProblemForm} Problem</h2>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
                        <div className="max-w-5xl mx-auto">
                            <ProblemForm
                                onSubmit={async (data) => {
                                    if (showProblemForm) await handleProblemSubmit(data, showProblemForm);
                                    return { success: true };
                                }}
                                submitLabel={`Add to Contest`}
                                domain={showProblemForm}
                                redirectPath={undefined}
                                slugPrefix={`/contest/${watch("slug") || "your-contest"}/problem/`}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Layout */}
            <div className="space-y-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span className="hover:text-gray-600 cursor-pointer transition-colors"onClick={() => router.push('/dashboard')}>Manage Contests</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-gray-900 dark:text-white">{watch("title") || "New Contest"}</span>
                </nav>

                {/* Header */}
                <div className="flex items-end justify-between mb-2">
                    <div className="space-y-2">
                        <p className="text-blue-500 hover:underline cursor-pointer text-sm font-mono transition-colors">www.algo-fox.com/contest/{watch("slug") || "new"}</p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex flex-wrap border border-gray-200 dark:border-[#333] bg-[#f8f9fa] dark:bg-[#1a1a1a] rounded-[3px] mb-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-3.5 text-[14px] font-bold transition-all border-r border-gray-200 dark:border-[#333] last:border-r-0 ${
                                activeTab === tab
                                ? "text-[#39424e] dark:text-white bg-white dark:bg-[#121212]"
                                : "text-[#738f93] dark:text-gray-400 hover:text-[#39424e] dark:hover:text-white hover:bg-[#ebf0f4] dark:hover:bg-[#222]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-12 pb-16">
                    <div className="w-full">
                        {renderTabContent()}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between py-6 border-t border-gray-200 dark:border-[#333] mt-12 max-w-4xl">
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => toast.info("Link Preview: /landing/" + watch("slug"))}
                                className="px-6 py-2.5 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-300 font-bold text-sm rounded-xl border border-gray-200 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center gap-2"
                            >
                                <Eye className="w-4 h-4" />
                                Preview Landing Page
                            </button>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="px-6 py-2.5 text-gray-500 font-bold text-sm hover:text-gray-900 transition-colors"
                            >
                                Cancel
                            </button>
                            <AnimatePresence mode="wait">
                                {activeTab !== "Settings" ? (
                                    <motion.button
                                        key="next-btn"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="button"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            let fieldsToValidate: any = [];
                                            if (activeTab === "Details") fieldsToValidate = ["title", "slug", "startDate", "startTimeOfDay"];
                                            const isValid = await trigger(fieldsToValidate);
                                            if (isValid) {
                                                const tabIndex = tabs.indexOf(activeTab);
                                                toast.success(`${activeTab} looks good!`);
                                                setActiveTab(tabs[tabIndex + 1]);
                                            } else {
                                                toast.error("Please fill all required fields correctly.");
                                            }
                                        }}
                                        className="px-8 py-2.5 bg-[#39424e] dark:bg-white hover:bg-black dark:hover:bg-gray-200 text-white dark:text-black font-bold text-[14px] rounded-[3px] shadow-sm transition-all flex items-center gap-2"
                                    >
                                        Next Section
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        key="launch-btn"
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="px-10 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-[14px] rounded-[3px] shadow-lg shadow-orange-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="w-4 h-4" />
                                        )}
                                        {isEditing ? "Update Contest" : "Launch Contest"}
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

