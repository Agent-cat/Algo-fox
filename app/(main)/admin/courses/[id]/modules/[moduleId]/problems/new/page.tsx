"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Code2, Database, Brain, Lightbulb, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProblemForm from "@/components/admin/ProblemForm";
import { createProblemAndAddToModule } from "@/actions/admin/course";
import { ProblemDomain } from "@prisma/client";
import { toast } from "sonner";

export default function CreateCourseProblemPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const typeParam = searchParams.get("type");

    const courseId = params.id as string;
    const moduleId = params.moduleId as string;

    const [selectedDomain, setSelectedDomain] = useState<ProblemDomain>((typeParam?.toUpperCase() as ProblemDomain) || "DSA");
    const [isConcept, setIsConcept] = useState(typeParam === "concept");
    const [step, setStep] = useState(typeParam ? 2 : 1);

    const types = [
        {
            id: "dsa",
            name: "DSA Problem",
            domain: "DSA" as ProblemDomain,
            icon: Code2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            desc: "Standard coding problems with test cases"
        },
        {
            id: "sql",
            name: "SQL Query",
            domain: "SQL" as ProblemDomain,
            icon: Database,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            desc: "Database challenges with SQL execution"
        },
        {
            id: "aptitude",
            name: "Aptitude / MCQ",
            domain: "APTITUDE" as ProblemDomain,
            icon: Brain,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            desc: "Logical reasoning and multiple choice questions"
        },
        {
            id: "concept",
            name: "Concept Note",
            domain: "DSA" as ProblemDomain,
            icon: Lightbulb,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            desc: "Theory-based learning with conceptual questions",
            difficulty: "CONCEPT"
        },
    ];

    const handleSelectType = (type: any) => {
        setSelectedDomain(type.domain);
        setIsConcept(type.difficulty === "CONCEPT");
        setStep(2);
    };

    const handleSubmit = async (data: any) => {
        const finalData = {
            ...data,
            domain: selectedDomain,
            difficulty: isConcept ? "CONCEPT" : data.difficulty
        };

        try {
            const res = await createProblemAndAddToModule(moduleId, finalData);
            if (res.success) {
                toast.success("Problem created and added to module");
                router.push(`/admin/courses/${courseId}/modules`);
                router.refresh();
                return { success: true };
            } else {
                toast.error(res.error || "Failed to create problem");
                return { success: false, error: res.error };
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            return { success: false, error: "Unexpected error" };
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href={`/admin/courses/${courseId}/modules`}
                    className="p-3 bg-white dark:bg-[#111] border border-gray-100 dark:border-[#262626] rounded-xl text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                        {step === 1 ? "Select Problem Type" : `Create ${selectedDomain} ${isConcept ? "Concept" : "Problem"}`}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium translate-y-1">
                        {step === 1 ? "Choose what kind of content to add to your module" : "Fill in the details for your new curriculum item"}
                    </p>
                </div>
            </div>

            {step === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                    {types.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => handleSelectType(type)}
                            className="group p-8 bg-white dark:bg-[#111] border border-gray-100 dark:border-[#262626] rounded-2xl transition-all duration-300 text-left flex items-start gap-6 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5"
                        >
                            <div className={`w-14 h-14 rounded-xl ${type.bg} flex items-center justify-center shrink-0`}>
                                <type.icon className={`w-7 h-7 ${type.color}`} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white transition-colors uppercase tracking-tight">{type.name}</h3>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors">{type.desc}</p>
                                <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 opacity-0 group-hover:opacity-100 transition-all">
                                    Start Creating
                                    <ChevronRight className="w-3" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-[#262626] rounded-2xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ProblemForm
                        domain={selectedDomain}
                        initialData={{
                            difficulty: isConcept ? "CONCEPT" : "EASY" as any
                        }}
                        onSubmit={handleSubmit}
                        submitLabel="Create & Add to Module"
                        slugPrefix={`/courses/${selectedDomain.toLowerCase()}/`}
                    />
                </div>
            )}
        </div>
    );
}
