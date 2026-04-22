"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Save, Database, Code2, Brain, Lightbulb, ChevronRight, ArrowLeft } from "lucide-react";
import ProblemForm from "./ProblemForm";
import { createProblemAndAddToModule } from "@/actions/admin/course";
import { ProblemDomain } from "@prisma/client";
import { toast } from "sonner";

interface ProblemCreatorModalProps {
    moduleId: string;
    onClose: () => void;
}

type Mode = "select-type" | "form";

export default function ProblemCreatorModal({ moduleId, onClose }: ProblemCreatorModalProps) {
    const router = useRouter();
    const [mode, setMode] = useState<Mode>("select-type");
    const [selectedDomain, setSelectedDomain] = useState<ProblemDomain>("DSA");
    const [isConcept, setIsConcept] = useState(false);

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
        setMode("form");
    };

    const handleSubmit = async (data: any) => {
        const finalData = {
            ...data,
            domain: selectedDomain,
            difficulty: isConcept ? "CONCEPT" : data.difficulty
        };

        const res = await createProblemAndAddToModule(moduleId, finalData);
        if (res.success) {
            toast.success("Problem created and added to module");
            onClose();
            router.refresh();
            return { success: true };
        } else {
            return { success: false, error: res.error };
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-[#121212] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-[#262626]">
                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-[#262626] flex justify-between items-center bg-gray-50/50 dark:bg-white/2">
                    <div className="flex items-center gap-4">
                        {mode === "form" && (
                            <button
                                onClick={() => setMode("select-type")}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-xl text-gray-400 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                        )}
                        <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                {mode === "select-type" ? "Select Problem Type" : `Create ${selectedDomain} ${isConcept ? "Concept" : "Problem"}`}
                            </h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {mode === "select-type" ? "1" : "2"} of 2</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-xl text-gray-400 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                    {mode === "select-type" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto py-12">
                            {types.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => handleSelectType(type)}
                                    className="group p-8 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-orange-500 rounded-4xl border border-transparent transition-all duration-300 text-left flex items-start gap-6 hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/10"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${type.bg} group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors`}>
                                        <type.icon className={`w-7 h-7 ${type.color} group-hover:text-white transition-colors`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-white transition-colors">{type.name}</h3>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors">{type.desc}</p>
                                        <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-500 group-hover:text-white transition-colors">
                                            Select Type
                                            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            </div>
        </div>
    );
}
