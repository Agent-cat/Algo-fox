"use client";

import { useRef, useCallback, useState } from "react";
import { MarkdownToolbar } from "./MarkdownToolbar";
import { Markdown } from "@/components/quiz/shared/Markdown";

interface MarkdownTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  isOption?: boolean;
  onImageUpload?: () => void;
}

export function MarkdownTextarea({
  value,
  onChange,
  placeholder = "Type here...",
  rows = 4,
  className = "",
  isOption = false,
  onImageUpload,
}: MarkdownTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mode, setMode] = useState<"edit" | "view">("edit");

  const handleInsert = useCallback(
    (before: string, after: string = "", placeholder: string = "") => {
      const ta = textareaRef.current;
      if (!ta) {
        onChange(value + before + placeholder + after);
        return;
      }
      ta.focus();
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = value.substring(start, end);
      const text = selected || placeholder;
      const newVal =
        value.substring(0, start) + before + text + after + value.substring(end);
      onChange(newVal);
      requestAnimationFrame(() => {
        const cursorPos = start + before.length + text.length;
        ta.setSelectionRange(start + before.length, cursorPos);
      });
    },
    [value, onChange]
  );

  return (
    <div
      className={`flex flex-col border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden bg-white dark:bg-[#24262C] ${className}`}
    >
      <MarkdownToolbar
        onInsert={handleInsert}
        onImageUpload={onImageUpload}
        mode={mode}
        onToggleMode={() => setMode(mode === "edit" ? "view" : "edit")}
      />

      {mode === "edit" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 text-sm font-sans focus:outline-none resize-y bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 min-h-[4rem]"
        />
      ) : (
        <div className="p-3 min-h-[4rem] overflow-y-auto">
          {value ? (
            <div className={`prose prose-sm dark:prose-invert max-w-none ${isOption ? "prose-p:my-1" : ""}`}>
              <Markdown content={value} isOption={isOption} />
            </div>
          ) : (
            <p className="text-gray-400 dark:text-gray-600 italic text-sm">{placeholder}</p>
          )}
        </div>
      )}
    </div>
  );
}
