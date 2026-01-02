"use client";

import { useState } from "react";
import { Difficulty, ProblemDomain } from "@prisma/client";
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
        hiddenQuery?: string | null;
        testCases: { input: string; output: string; hidden?: boolean }[];
    };
    onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
    submitLabel: string;
    domain?: ProblemDomain;
    redirectPath?: string;
}

export default function ProblemForm({ initialData, onSubmit, submitLabel, domain = "DSA", redirectPath }: ProblemFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [testCases, setTestCases] = useState<{ input: string; output: string; hidden?: boolean }[]>(
        initialData?.testCases || []
    );
    // Default to visible for new problems, preserve existing state for edits
    // For DSA domain, always set hidden to false (always visible)
    const [hidden, setHidden] = useState(
        domain === "DSA" ? false : (initialData?.hidden ?? false)
    );

    // Form fields state
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
        difficulty: initialData?.difficulty || "EASY",
        description: initialData?.description || ""
    });

    // hiddenQuery state (only for SQL domain)
    const [hiddenQuery, setHiddenQuery] = useState(initialData?.hiddenQuery || "");

    const router = useRouter();

    const steps = [
        { id: 1, name: "Basic Details" },
        { id: 2, name: "Description" },
        { id: 3, name: "Test Cases" }
    ];

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

    const handleNext = () => {
        if (currentStep === 1) {
            if (!formData.title || !formData.slug) {
                toast.error("Please fill in title and slug");
                return;
            }
        }
        if (currentStep === 2) {
            if (!formData.description) {
                toast.error("Please add a description");
                return;
            }
        }
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    async function handleSubmit() {
        setIsLoading(true);

        const data = {
            ...formData,
            difficulty: formData.difficulty as Difficulty,
            hidden: domain === "DSA" ? false : hidden, // Always visible for DSA
            hiddenQuery: domain === "SQL" ? (hiddenQuery.trim() || null) : null, // Only for SQL
            domain,
            testCases,
        };

        const res = await onSubmit(data);

        if (res.success) {
            toast.success("Saved successfully");
            // Only redirect if redirectPath is explicitly provided (not undefined)
            if (redirectPath !== undefined) {
                router.push(redirectPath || "/admin/problems");
                router.refresh();
            }
            // If redirectPath is undefined, parent component handles navigation
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

            <div className="p-8">
                {/* Step 1: Basics */}
                {currentStep === 1 && (
                    <div className="space-y-6 max-w-2xl mx-auto animation-fade-in">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Problem Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Two Sum"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Slug</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g. two-sum"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-900"
                            />
                        </div>

                        <div className={`grid gap-6 ${domain === "SQL" ? "grid-cols-2" : "grid-cols-1"}`}>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Difficulty</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={e => setFormData({ ...formData, difficulty: e.target.value as Difficulty })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all bg-white font-medium text-gray-700"
                                >
                                    <option value="EASY">Easy</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HARD">Hard</option>
                                </select>
                            </div>
                            {domain === "SQL" && (
                                <div className="space-y-2 flex flex-col justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setHidden(!hidden)}
                                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-colors border ${hidden
                                            ? "bg-gray-50 text-gray-600 border-gray-200"
                                            : "bg-green-50 text-green-700 border-green-200"
                                            }`}
                                    >
                                        {hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        {hidden ? "Hidden Problem" : "Visible Problem"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 2: Description */}
                {currentStep === 2 && (
                    <div className="space-y-4 max-w-4xl mx-auto animation-fade-in">
                        <label className="text-sm font-semibold text-gray-700">Description (Markdown)</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={15}
                            placeholder="# Problem Description..."
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-mono text-sm leading-relaxed text-gray-900"
                        />
                        
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
                                    value={hiddenQuery}
                                    onChange={e => setHiddenQuery(e.target.value)}
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
                                onClick={addTestCase}
                                className="flex items-center gap-2 px-3 py-1.5 text-orange-600 hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Case
                            </button>
                        </div>

                        <div className="space-y-4">
                            {testCases.map((testCase, index) => (
                                <div key={index} className="flex gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50 hover:border-orange-200 transition-colors">
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-medium text-gray-500">INPUT</label>
                                        <textarea
                                            value={testCase.input}
                                            onChange={(e) => updateTestCase(index, "input", e.target.value)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-orange-500 outline-none text-sm font-mono"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <label className="text-xs font-medium text-gray-500">OUTPUT</label>
                                        <textarea
                                            value={testCase.output}
                                            onChange={(e) => updateTestCase(index, "output", e.target.value)}
                                            className="w-full px-3 py-2 rounded-md border border-gray-200 focus:border-orange-500 outline-none text-sm font-mono"
                                            rows={2}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 pt-6">
                                        <button onClick={() => removeTestCase(index)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-100 bg-gray-50/50 p-6 flex justify-between">
                <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Back
                </button>

                {currentStep < 3 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        Next Step
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-8 py-2.5 rounded-lg bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition-colors disabled:opacity-70"
                    >
                        {isLoading ? "Saving..." : submitLabel}
                    </button>
                )}
            </div>
        </div>
    );
}
