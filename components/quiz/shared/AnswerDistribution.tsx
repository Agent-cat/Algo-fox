"use client";

import { Markdown } from "@/components/quiz/shared/Markdown";

interface AnswerDistributionProps {
  options: string[];
  distribution: number[];
  correctOption: number;
  selectedOption?: number;
}

const indexToLabel = (index: number) => {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export function AnswerDistribution({
  options,
  distribution,
  correctOption,
  selectedOption,
}: AnswerDistributionProps) {
  const total = distribution.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-2">
      {options.map((option, i) => {
        const count = distribution[i] ?? 0;
        const percent = total > 0 ? Math.round((count / total) * 100) : 0;
        const isCorrect = i === correctOption;
        const isSelected = i === selectedOption;

        return (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black shrink-0 ${
                    isCorrect
                      ? "bg-green-500 text-white"
                      : isSelected
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {indexToLabel(i)}
                </span>
                <div className={`truncate font-medium flex-1 ${isCorrect ? "text-green-700 dark:text-green-400" : "text-gray-700 dark:text-gray-300"}`}>
                  <Markdown content={option} className="inline-block prose-p:my-0" />
                </div>
              </div>
              <span className="font-black font-mono text-xs ml-2 shrink-0">
                {percent}%
                <span className="text-gray-400 ml-1">({count})</span>
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-[#2a2a2a] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isCorrect ? "bg-green-500" : "bg-gray-300 dark:bg-[#404040]"
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
