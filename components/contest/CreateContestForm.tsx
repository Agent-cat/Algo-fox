"use client";

import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
    Loader2, X, Trophy, Calendar, Users,
    Globe, School, BookOpen, Plus, Search, CheckCircle2, Layers
} from "lucide-react";
import { toast } from "sonner";
import { createContest, getInstitutionalClassrooms, getSelectableProblems } from "@/actions/contest";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const contestSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().optional(),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    visibility: z.enum(["PUBLIC", "INSTITUTION", "CLASSROOM"]),
    contestPassword: z.string().optional(),
    randomizeQuestions: z.boolean().default(false),
    classroomId: z.string().optional(),
    problems: z.array(z.string()).min(1, "Select at least one problem"),
});

type FormData = z.infer<typeof contestSchema>;

interface CreateContestFormProps {
    institutionId: string | null;
    userId: string;
}

export function CreateContestForm({ institutionId, userId }: CreateContestFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [classrooms, setClassrooms] = useState<any[]>([]);
    const [problemSearch, setProblemSearch] = useState("");
    const [selectableProblems, setSelectableProblems] = useState<any[]>([]);
    const [selectedProblems, setSelectedProblems] = useState<any[]>([]);
    const [isSearchingProblems, setIsSearchingProblems] = useState(false);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(contestSchema) as any,
        defaultValues: {
            title: "",
            description: "",
            visibility: "PUBLIC",
            problems: [],
            randomizeQuestions: false,
        }
    });

    const visibility = watch("visibility");

    // Fetch classrooms if institution visibility or classroom visibility is selected
    useEffect(() => {
        if (institutionId && (visibility === "CLASSROOM" || visibility === "INSTITUTION")) {
            getInstitutionalClassrooms(institutionId).then(res => {
                if (res.success) setClassrooms(res.classrooms || []);
            });
        }
    }, [visibility, institutionId]);

    // Problem search logic
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (problemSearch.length >= 2) {
                setIsSearchingProblems(true);
                getSelectableProblems(problemSearch).then(res => {
                    if (res.success) setSelectableProblems(res.problems || []);
                    setIsSearchingProblems(false);
                });
            } else {
                setSelectableProblems([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [problemSearch]);

    const toggleProblem = (problem: any) => {
        const isSelected = selectedProblems.some(p => p.id === problem.id);
        let newSelected;
        if (isSelected) {
            newSelected = selectedProblems.filter(p => p.id !== problem.id);
        } else {
            newSelected = [...selectedProblems, problem];
        }
        setSelectedProblems(newSelected);
        setValue("problems", newSelected.map(p => p.id));
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const res = await createContest({
                ...data,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                institutionId: visibility !== "PUBLIC" ? institutionId : null,
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Basic Info Section */}
                <section className="bg-white border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-orange-600" />
                        Basic Information
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Contest Title</label>
                            <input
                                {...register("title")}
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                placeholder="e.g. Weekly DSA Challenge #1"
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                {...register("description")}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none"
                                placeholder="Describe the rules, topics, and prizes..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                                <div className="relative">
                                    <input
                                        type="datetime-local"
                                        {...register("startTime")}
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    />
                                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                                {errors.endTime && <p className="text-xs text-red-500 mt-1">{errors.endTime.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-100">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Access Password (Optional)</label>
                                <input
                                    {...register("contestPassword")}
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    placeholder="Leave empty for open access"
                                />
                                <p className="text-xs text-gray-500 mt-1">If set, users must enter this password to join.</p>
                            </div>

                             <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("randomizeQuestions")}
                                    className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <div>
                                    <span className="block text-sm font-medium text-gray-900">Randomize Questions</span>
                                    <span className="text-xs text-gray-500">Problems will be shown in a different order for each user.</span>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Audience & Scope Section */}
                <section className="bg-white border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-orange-600" />
                        Target Audience
                    </h2>

                    <div className="space-y-3">
                        <label className={`flex items-center gap-3 p-4 border-2 cursor-pointer transition-all ${visibility === 'PUBLIC' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" {...register("visibility")} value="PUBLIC" className="hidden" />
                            <div className={`p-2 ${visibility === 'PUBLIC' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                <Globe className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                                <span className="block font-semibold text-gray-900">Public</span>
                                <span className="text-xs text-gray-500">Visible to everyone</span>
                            </div>
                            {visibility === 'PUBLIC' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                        </label>

                        {institutionId && (
                            <>
                                <label className={`flex items-center gap-3 p-4 border-2 cursor-pointer transition-all ${visibility === 'INSTITUTION' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input type="radio" {...register("visibility")} value="INSTITUTION" className="hidden" />
                                    <div className={`p-2 ${visibility === 'INSTITUTION' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        <School className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <span className="block font-semibold text-gray-900">Entire Institute</span>
                                        <span className="text-xs text-gray-500">Only for your organization</span>
                                    </div>
                                    {visibility === 'INSTITUTION' && <CheckCircle2 className="w-5 h-5 text-orange-600" />}
                                </label>

                                <label className={`flex items-center gap-3 p-4 border-2 cursor-pointer transition-all ${visibility === 'CLASSROOM' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                    <input type="radio" {...register("visibility")} value="CLASSROOM" className="hidden" />
                                    <div className={`p-2 ${visibility === 'CLASSROOM' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
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

                        {visibility === "CLASSROOM" && (
                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Classroom</label>
                                <select
                                    {...register("classroomId")}
                                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                </section>
            </div>

            {/* Problem Selection Section */}
            <section className="bg-white border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-orange-600" />
                            Contest Problems
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">Search and select problems for this contest</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold border border-orange-100">
                        {selectedProblems.length} Selected
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                value={problemSearch}
                                onChange={(e) => setProblemSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                                placeholder="Search by problem name or slug..."
                            />
                        </div>

                        <div className="border border-gray-200 overflow-hidden min-h-[200px] max-h-[400px] overflow-y-auto">
                            {isSearchingProblems ? (
                                <div className="flex items-center justify-center h-40">
                                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                                </div>
                            ) : selectableProblems.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {selectableProblems.map((problem) => {
                                        const isSelected = selectedProblems.some(p => p.id === problem.id);
                                        return (
                                            <div
                                                key={problem.id}
                                                onClick={() => toggleProblem(problem)}
                                                className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${isSelected ? 'bg-orange-50' : 'hover:bg-gray-50'}`}
                                            >
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm">{problem.title}</p>
                                                    <span className={`text-xs font-semibold ${problem.difficulty === 'EASY' ? 'text-emerald-600' :
                                                        problem.difficulty === 'MEDIUM' ? 'text-amber-600' : 'text-rose-600'
                                                        }`}>
                                                        {problem.difficulty}
                                                    </span>
                                                </div>
                                                <button type="button" className={`p-1.5 transition-all ${isSelected ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                    <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 text-center px-6">
                                    <Search className="w-8 h-8 text-gray-300 mb-2" />
                                    <p className="text-sm text-gray-500">Type to search for problems</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-gray-700">Selected Problems</h3>
                        <div className="border-2 border-dashed border-gray-200 min-h-[250px] p-4">
                            {selectedProblems.length > 0 ? (
                                <div className="space-y-2">
                                    {selectedProblems.map((problem, index) => (
                                        <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 flex items-center justify-center bg-white border border-gray-300 text-xs font-semibold text-gray-600">
                                                    {index + 1}
                                                </span>
                                                <p className="font-semibold text-gray-900 text-sm">{problem.title}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => toggleProblem(problem)}
                                                className="p-1.5 hover:bg-gray-200 text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 text-center opacity-40">
                                    <Layers className="w-10 h-10 text-gray-300 mb-2" />
                                    <p className="text-sm text-gray-500">No problems added yet</p>
                                </div>
                            )}
                        </div>
                        {errors.problems && <p className="text-xs text-red-500">{errors.problems.message as string}</p>}
                    </div>
                </div>
            </section>

            {/* Submit Section */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-2 bg-gray-900 text-white font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trophy className="w-4 h-4" />}
                    Create Contest
                </button>
            </div>
        </form>
    );
}
