"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Markdown from "react-markdown";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface McqWidgetProps {
  data: string; // We'll pass JSON stringified data
}

export default function McqWidget({ data }: McqWidgetProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Parse the data safely
  let parsedData: { question: string; options: Option[] } | null = null;
  try {
    parsedData = JSON.parse(data);
  } catch (e) {
    return <div className="text-red-500">Error parsing MCQ data</div>;
  }

  if (!parsedData) return null;

  const { question, options } = parsedData;

  const handleSelect = (id: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(id);
  };

  const handleSubmit = () => {
    if (!selectedOptionId) return;
    setIsSubmitted(true);
  };

  const selectedOption = options.find((opt) => opt.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect;

  return (
    <div className="my-6 p-6 rounded-xl border border-gray-200 dark:border-[#262626] bg-gray-50/50 dark:bg-[#111111]/50 not-prose">
        <div className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-100">
            {/* Render question with markdown support just in case */}
            <Markdown>{question}</Markdown>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {options.map((option) => {
                let statusClass = "border-gray-200 dark:border-[#333] hover:border-orange-200 dark:hover:border-orange-500/30 hover:bg-white dark:hover:bg-[#1a1a1a]";

                if (isSubmitted) {
                    if (option.isCorrect) {
                        statusClass = "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10";
                    } else if (option.id === selectedOptionId && !option.isCorrect) {
                        statusClass = "border-red-500 bg-red-50 dark:bg-red-500/10";
                    } else {
                        statusClass = "border-gray-200 dark:border-[#333] opacity-50";
                    }
                } else if (selectedOptionId === option.id) {
                     statusClass = "border-orange-500 bg-orange-50 dark:bg-orange-500/10 ring-1 ring-orange-500";
                }

                return (
                    <button
                        key={option.id}
                        onClick={() => handleSelect(option.id)}
                        disabled={isSubmitted}
                        className={cn(
                            "w-full text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between group",
                            statusClass
                        )}
                    >
                        <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            <Markdown components={{ p: ({children}) => <>{children}</> }}>{option.text}</Markdown>
                        </span>

                        {isSubmitted && option.isCorrect && (
                            <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        )}
                        {isSubmitted && !option.isCorrect && option.id === selectedOptionId && (
                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                        )}
                        {!isSubmitted && selectedOptionId === option.id && (
                             <div className="w-4 h-4 rounded-full border-2 border-orange-500 bg-orange-500" />
                        )}
                        {!isSubmitted && selectedOptionId !== option.id && (
                             <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 group-hover:border-orange-400" />
                        )}
                    </button>
                );
            })}
        </div>

        {!isSubmitted && (
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={!selectedOptionId}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
                >
                    Check Answer
                </button>
            </div>
        )}

        {isSubmitted && (
            <div className={cn("mt-4 text-sm font-medium p-3 rounded-lg text-center", isCorrect ? "text-emerald-700 bg-emerald-100/50 dark:text-emerald-400 dark:bg-emerald-500/10" : "text-red-700 bg-red-100/50 dark:text-red-400 dark:bg-red-500/10")}>
                {isCorrect ? "Correct Answer! Well done." : "Incorrect Answer. Try again."}
                 {!isCorrect && <button onClick={() => { setIsSubmitted(false); setSelectedOptionId(null); }} className="block mx-auto mt-2 text-xs underline cursor-pointer">Retry</button>}
            </div>
        )}
    </div>
  );
}
