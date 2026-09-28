"use client";

import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Code,
  FileCode,
  Quote,
  List,
  ListOrdered,
  Link,
  ImagePlus,
  Minus,
  Pencil,
  Eye,
} from "lucide-react";

interface MarkdownToolbarProps {
  onInsert: (before: string, after?: string, placeholder?: string) => void;
  onImageUpload?: () => void;
  mode: "edit" | "view";
  onToggleMode: () => void;
}

export function MarkdownToolbar({ onInsert, onImageUpload, mode, onToggleMode }: MarkdownToolbarProps) {
  const buttons = [
    { icon: Bold, label: "Bold", action: () => onInsert("**", "**", "bold text") },
    { icon: Italic, label: "Italic", action: () => onInsert("*", "*", "italic text") },
    { icon: Strikethrough, label: "Strikethrough", action: () => onInsert("~~", "~~", "strikethrough") },
    { type: "divider" as const },
    { icon: Heading1, label: "Heading 1", action: () => onInsert("# ", "", "Heading 1") },
    { icon: Heading2, label: "Heading 2", action: () => onInsert("## ", "", "Heading 2") },
    { icon: Heading3, label: "Heading 3", action: () => onInsert("### ", "", "Heading 3") },
    { type: "divider" as const },
    { icon: Code, label: "Inline Code", action: () => onInsert("`", "`", "code") },
    { icon: FileCode, label: "Code Block", action: () => onInsert("\n```\n", "\n```\n", "code here") },
    { icon: Quote, label: "Blockquote", action: () => onInsert("> ", "", "quote") },
    { type: "divider" as const },
    { icon: List, label: "Bullet List", action: () => onInsert("- ", "", "list item") },
    { icon: ListOrdered, label: "Numbered List", action: () => onInsert("1. ", "", "list item") },
    { icon: Minus, label: "Horizontal Rule", action: () => onInsert("\n---\n") },
    { type: "divider" as const },
    { icon: Link, label: "Link", action: () => onInsert("[", "](https://url)", "link text") },
    ...(onImageUpload
      ? [{ icon: ImagePlus, label: "Image", action: onImageUpload }]
      : []),
  ];

  return (
    <div className="flex items-center gap-0.5 px-2 py-1.5 bg-gray-50 dark:bg-[#1a1b20] border-b border-gray-200 dark:border-[#333] overflow-x-auto flex-shrink-0">
      {buttons.map((btn, i) => {
        if ("type" in btn && btn.type === "divider") {
          return (
            <div
              key={`d-${i}`}
              className="w-px h-5 bg-gray-200 dark:bg-[#444] mx-1 shrink-0"
            />
          );
        }
        const Icon = btn.icon;
        return (
          <button
            key={btn.label}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              btn.action();
            }}
            title={btn.label}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-[#333] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors shrink-0"
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
      {/* Spacer + Edit/View Toggle */}
      <div className="flex-1" />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={onToggleMode}
        title={mode === "edit" ? "Preview" : "Edit"}
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold transition-colors shrink-0 ${
          mode === "edit"
            ? "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-[#333] hover:text-gray-900 dark:hover:text-white"
            : "text-orange-500 bg-orange-50 dark:bg-orange-500/10 hover:bg-orange-100 dark:hover:bg-orange-500/20"
        }`}
      >
        {mode === "edit" ? <Eye className="w-3.5 h-3.5" /> : <Pencil className="w-3.5 h-3.5" />}
        {mode === "edit" ? "Preview" : "Edit"}
      </button>
    </div>
  );
}
