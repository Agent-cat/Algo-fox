"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useRef } from "react";
import { List, Code2, Plus, Eye, EyeOff } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    const [descriptionPreview, setDescriptionPreview] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter();

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            description: initialData?.description || "",
            hidden: initialData?.hidden || false,
        }
    });

    const descriptionValue = watch("description") || "";
    const { ref: formRef, ...descriptionRegister } = register("description");

    const insertMarkdown = (type: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = descriptionValue;
        const selectedText = value.substring(start, end);

        let before = "";
        let after = "";
        let placeholder = "";

        switch (type) {
            case "bold": before = "**"; after = "**"; placeholder = "bold text"; break;
            case "italic": before = "*"; after = "*"; placeholder = "italic text"; break;
            case "list": before = "\n- "; after = ""; placeholder = "item"; break;
            case "code": before = "```\n"; after = "\n```"; placeholder = "code"; break;
            case "inline-code": before = "`"; after = "`"; placeholder = "code"; break;
            case "h2": before = "## "; after = ""; placeholder = "Heading"; break;
            case "h3": before = "### "; after = ""; placeholder = "Subheading"; break;
            case "link": before = "["; after = "](url)"; placeholder = "link text"; break;
        }

        const textToInsert = selectedText || placeholder;
        const newValue = value.substring(0, start) + before + textToInsert + after + value.substring(end);

        setValue("description", newValue);

        setTimeout(() => {
            textarea.focus();
            if (selectedText) {
                textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
            } else {
                textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
            }
        }, 0);
    };

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
        <div className="bg-white dark:bg-[#141414] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden p-8">
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Concept Title</label>
                    <input
                        {...register("title")}
                        placeholder="e.g. Introduction to Arrays"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#333] focus:border-orange-500 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#121212]"
                    />
                    {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Slug</label>
                    <input
                        {...register("slug")}
                        placeholder="e.g. intro-arrays"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#333] focus:border-orange-500 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-100 dark:focus:ring-orange-500/10 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 font-medium text-gray-900 dark:text-white bg-white dark:bg-[#121212]"
                    />
                    {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-tight">Content (Markdown)</label>
                        <button
                            type="button"
                            onClick={() => setDescriptionPreview(!descriptionPreview)}
                            className="px-3 py-1 text-xs font-semibold bg-gray-100/50 dark:bg-[#222] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#333] rounded-md transition-all hover:bg-gray-200/50 dark:hover:bg-[#333] flex items-center gap-1.5"
                        >
                            {descriptionPreview ? <><Code2 className="w-3.5 h-3.5" /> Edit</> : <><Eye className="w-3.5 h-3.5" /> Preview</>}
                        </button>
                    </div>

                    <div className="border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden shadow-sm">
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50/50 dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#333]">
                             <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-md p-0.5">
                                <button type="button" onClick={() => insertMarkdown("bold")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 font-bold hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Bold">B</button>
                                <button type="button" onClick={() => insertMarkdown("italic")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 italic hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Italic">i</button>
                            </div>
                            <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-md p-0.5">
                                <button type="button" onClick={() => insertMarkdown("h2")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 font-bold hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Heading 2"><span className="text-[10px]">H2</span></button>
                                <button type="button" onClick={() => insertMarkdown("h3")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 font-bold hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Heading 3"><span className="text-[10px]">H3</span></button>
                            </div>
                            <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-md p-0.5">
                                <button type="button" onClick={() => insertMarkdown("list")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Bullet List"><List className="w-3.5 h-3.5" /></button>
                                <button type="button" onClick={() => insertMarkdown("code")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Code Block"><Code2 className="w-3.5 h-3.5" /></button>
                            </div>
                            <div className="flex bg-white dark:bg-[#121212] border border-gray-200 dark:border-[#333] rounded-md p-0.5">
                                <button type="button" onClick={() => insertMarkdown("link")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-sm transition-colors" title="Link"><Plus className="w-3.5 h-3.5 rotate-45" /></button>
                            </div>
                        </div>

                        {!descriptionPreview ? (
                            <textarea
                                {...descriptionRegister}
                                ref={(e) => {
                                    formRef(e);
                                    textareaRef.current = e;
                                }}
                                rows={16}
                                placeholder="# Introduction..."
                                className="w-full px-4 py-3 bg-white dark:bg-[#121212] focus:outline-none transition-all font-mono text-sm leading-relaxed text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none min-h-[400px]"
                            />
                        ) : (
                            <div className="px-6 py-6 min-h-[400px] bg-white dark:bg-[#121212] prose prose-sm dark:prose-invert max-w-none prose-pre:bg-[#1a1a2e] prose-headings:mb-4">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
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
                                        tr: ({ node, ...props }) => <tr className="border-b border-gray-100/80 dark:border-white/5 transition-colors dark:hover:bg-white/2" {...props} />,
                                    }}
                                >
                                    {descriptionValue}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                    {errors.description && <p className="text-xs text-red-500 font-medium">⚠ {errors.description.message}</p>}
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
        </div>
    );
}
