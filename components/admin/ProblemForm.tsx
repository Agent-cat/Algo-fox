"use client";

import { useState } from "react";
import { Difficulty } from "@prisma/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";

interface ProblemFormProps {
    initialData?: {
        title: string;
        slug: string;
        description: string;
        difficulty: Difficulty;
        hidden: boolean;
        testCases: { input: string; output: string; hidden?: boolean }[];
    };
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    submitLabel: string;
}

export default function ProblemForm({ initialData, onSubmit, submitLabel }: ProblemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [testCases, setTestCases] = useState<{ input: string; output: string; hidden?: boolean }[]>(
        initialData?.testCases || []
    );
    const [hidden, setHidden] = useState(initialData?.hidden ?? true);

    const router = useRouter();

    const addTestCase = () => {
        setTestCases([...testCases, { input: "", output: "", hidden: false }]);
    };

    const removeTestCase = (index: number) => {
        setTestCases(testCases.filter((_, i) => i !== index));
    };

    const updateTestCase = (index: number, field: "input" | "output" | "hidden", value: string | boolean) => {
        const newTestCases = [...testCases];
        // @ts-ignore
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const title = formData.get("title") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string;
        const difficulty = formData.get("difficulty") as Difficulty;

        if (!title || !slug || !description || !difficulty) {
            toast.error("Please fill in all required fields");
            setIsLoading(false);
            return;
        }

        const data = {
            title,
            slug,
            description,
            difficulty,
            hidden,
            testCases,
        };

        const res = await onSubmit(data);

        if (res.success) {
            toast.success("Saved successfully");
            router.push("/admin/problems");
            router.refresh();
        } else {
            toast.error(res.error || "Something went wrong");
        }
        setIsLoading(false);
    }

    return (
        <form action={handleSubmit} className="space-y-6 bg-white border border-gray-100 p-8 rounded-2xl shadow-xl shadow-gray-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-semibold text-gray-700">Problem Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={initialData?.title}
                        placeholder="e.g. Two Sum"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="slug" className="text-sm font-semibold text-gray-700">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        id="slug"
                        defaultValue={initialData?.slug}
                        placeholder="e.g. two-sum"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label htmlFor="difficulty" className="text-sm font-semibold text-gray-700">Difficulty</label>
                    <div className="relative">
                        <select
                            name="difficulty"
                            id="difficulty"
                            defaultValue={initialData?.difficulty || "EASY"}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all appearance-none bg-white font-medium text-gray-700"
                            required
                        >
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 flex flex-col justify-end">
                    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setHidden(!hidden)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${hidden
                                ? "bg-gray-100 text-gray-600"
                                : "bg-green-50 text-green-700 border border-green-200"
                                }`}
                        >
                            {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {hidden ? "Hidden" : "Visible"}
                        </button>
                        <span className="text-sm text-gray-500">
                            {hidden ? "Problem is hidden from users." : "Problem is visible to everyone."}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-semibold text-gray-700">Description (Markdown)</label>
                <textarea
                    name="description"
                    id="description"
                    defaultValue={initialData?.description}
                    rows={10}
                    placeholder="# Problem Description..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium font-mono text-sm leading-relaxed text-gray-900"
                    required
                />
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700">Test Cases</label>
                    <button
                        type="button"
                        onClick={addTestCase}
                        className="flex items-center gap-2 px-3 py-1.5 text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        Add Case
                    </button>
                </div>

                <div className="space-y-4">
                    {testCases.map((testCase, index) => (
                        <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 group hover:border-orange-200 transition-colors">
                            <div className="flex-1 space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Input</label>
                                <textarea
                                    value={testCase.input}
                                    onChange={(e) => updateTestCase(index, "input", e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none text-sm font-mono text-gray-900 bg-white"
                                    rows={2}
                                    placeholder="Input..."
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Output</label>
                                <textarea
                                    value={testCase.output}
                                    onChange={(e) => updateTestCase(index, "output", e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none text-sm font-mono text-gray-900 bg-white"
                                    rows={2}
                                    placeholder="Output..."
                                />
                            </div>
                            <div className="flex flex-col items-end gap-2 pt-6">
                                <button
                                    type="button"
                                    onClick={() => updateTestCase(index, "hidden", !testCase.hidden)}
                                    className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border transition-colors ${testCase.hidden
                                        ? "bg-gray-100 text-gray-600 border-gray-200"
                                        : "bg-white text-gray-400 border-gray-200 hover:text-orange-600 hover:border-orange-200"
                                        }`}
                                    title="Toggle Hidden"
                                >
                                    {testCase.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    {testCase.hidden ? "Hidden" : "Public"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeTestCase(index)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {testCases.length === 0 && (
                        <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
                            No test cases added yet.
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-linear-to-r from-orange-500 to-red-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:from-orange-600 hover:to-red-700 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                        </span>
                    ) : (
                        submitLabel
                    )}
                </button>
            </div>
        </form>
    );
}
