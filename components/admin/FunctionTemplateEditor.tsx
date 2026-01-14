"use client";

import { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { ChevronDown, ChevronRight, Loader2, Copy, Check } from "lucide-react";
import { LANGUAGES } from "@/lib/languages";
import { useTheme } from "next-themes";

// DSA languages only (exclude SQL which has id 82)
const DSA_LANGUAGES = LANGUAGES.filter(lang => lang.id !== 82);

export interface FunctionTemplate {
    languageId: number;
    functionTemplate: string;
    driverCode: string;
}

interface FunctionTemplateEditorProps {
    value: FunctionTemplate[];
    onChange: (templates: FunctionTemplate[]) => void;
    useFunctionTemplate: boolean;
    onUseFunctionTemplateChange: (use: boolean) => void;
}

export default function FunctionTemplateEditor({
    value,
    onChange,
    useFunctionTemplate,
    onUseFunctionTemplateChange,
}: FunctionTemplateEditorProps) {
    const [expandedLanguages, setExpandedLanguages] = useState<Set<number>>(new Set());
    const [copiedFrom, setCopiedFrom] = useState<number | null>(null);
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Create a map for quick lookup
    const templateMap = useMemo(() => {
        const map = new Map<number, FunctionTemplate>();
        value.forEach(t => map.set(t.languageId, t));
        return map;
    }, [value]);

    const toggleLanguage = (langId: number) => {
        setExpandedLanguages(prev => {
            const next = new Set(prev);
            if (next.has(langId)) {
                next.delete(langId);
            } else {
                next.add(langId);
            }
            return next;
        });
    };

    const updateTemplate = (languageId: number, field: "functionTemplate" | "driverCode", newValue: string) => {
        const existing = templateMap.get(languageId);
        const updated: FunctionTemplate = existing
            ? { ...existing, [field]: newValue }
            : { languageId, functionTemplate: "", driverCode: "", [field]: newValue };

        const newTemplates = value.filter(t => t.languageId !== languageId);
        newTemplates.push(updated);
        onChange(newTemplates);
    };

    const getTemplate = (languageId: number): FunctionTemplate => {
        return templateMap.get(languageId) || { languageId, functionTemplate: "", driverCode: "" };
    };

    const copyToAllLanguages = (sourceLanguageId: number) => {
        const source = getTemplate(sourceLanguageId);
        if (!source.functionTemplate && !source.driverCode) return;

        const newTemplates: FunctionTemplate[] = DSA_LANGUAGES.map(lang => ({
            languageId: lang.id,
            functionTemplate: source.functionTemplate,
            driverCode: source.driverCode,
        }));

        onChange(newTemplates);
        setCopiedFrom(sourceLanguageId);
        setTimeout(() => setCopiedFrom(null), 2000);
    };

    const hasContent = (languageId: number): boolean => {
        const t = getTemplate(languageId);
        return !!(t.functionTemplate || t.driverCode);
    };

    return (
        <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="bg-gray-50 dark:bg-[#141414] rounded-xl p-4 border border-gray-200 dark:border-[#262626]">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => onUseFunctionTemplateChange(false)}
                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all border-2 ${!useFunctionTemplate
                            ? "bg-white dark:bg-[#1a1a1a] border-orange-500 text-orange-700 dark:text-orange-400 shadow-sm"
                            : "bg-transparent border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-semibold">Use Default</span>
                            <span className="text-xs opacity-75">Standard boilerplate code</span>
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => onUseFunctionTemplateChange(true)}
                        className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all border-2 ${useFunctionTemplate
                            ? "bg-white dark:bg-[#1a1a1a] border-orange-500 text-orange-700 dark:text-orange-400 shadow-sm"
                            : "bg-transparent border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span className="font-semibold">Use Function</span>
                            <span className="text-xs opacity-75">Custom function template + driver</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Function Template Editor (shown when useFunctionTemplate is true) */}
            {useFunctionTemplate && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Language Templates
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            Define function signature and driver code for each language
                        </span>
                    </div>

                    {/* Language Accordion */}
                    <div className="border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden">
                        {DSA_LANGUAGES.map((lang, idx) => {
                            const isExpanded = expandedLanguages.has(lang.id);
                            const template = getTemplate(lang.id);
                            const hasTemplateContent = hasContent(lang.id);

                            return (
                                <div key={lang.id} className={idx > 0 ? "border-t border-gray-200 dark:border-[#262626]" : ""}>
                                    {/* Language Header */}
                                    <div className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#202020] transition-colors">
                                        <button
                                            type="button"
                                            onClick={() => toggleLanguage(lang.id)}
                                            className="flex items-center gap-3 flex-1"
                                        >
                                            {isExpanded ? (
                                                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                            )}
                                            <span className="font-medium text-gray-700 dark:text-gray-200">{lang.name}</span>
                                            {hasTemplateContent && (
                                                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">
                                                    Configured
                                                </span>
                                            )}
                                        </button>
                                        {isExpanded && hasTemplateContent && (
                                            <button
                                                type="button"
                                                onClick={() => copyToAllLanguages(lang.id)}
                                                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded transition-colors"
                                            >
                                                {copiedFrom === lang.id ? (
                                                    <>
                                                        <Check className="w-3 h-3" />
                                                        Copied!
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-3 h-3" />
                                                        Copy to all
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {/* Language Content */}
                                    {isExpanded && (
                                        <div className="p-4 bg-white dark:bg-[#141414] space-y-4">
                                            {/* Function Template */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                    Function Template
                                                    <span className="font-normal text-gray-400 dark:text-gray-500 ml-2">
                                                        (What user sees as boilerplate)
                                                    </span>
                                                </label>
                                                <div className="border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden h-40">
                                                    <Editor
                                                        height="100%"
                                                        language={lang.monacoLanguage}
                                                        value={template.functionTemplate}
                                                        theme={isDark ? "vs-dark" : "vs-light"}
                                                        onChange={(val) => updateTemplate(lang.id, "functionTemplate", val || "")}
                                                        options={{
                                                            minimap: { enabled: false },
                                                            fontSize: 13,
                                                            lineNumbers: "on",
                                                            scrollBeyondLastLine: false,
                                                            automaticLayout: true,
                                                            padding: { top: 8 },
                                                        }}
                                                        loading={
                                                            <div className="flex items-center justify-center h-full">
                                                                <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Driver Code */}
                                            <div className="space-y-2">
                                                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                    Driver Code
                                                    <span className="font-normal text-gray-400 dark:text-gray-500 ml-2">
                                                        (Hidden - calls user&apos;s function)
                                                    </span>
                                                </label>
                                                <div className="border border-gray-200 dark:border-[#333] rounded-lg overflow-hidden h-48">
                                                    <Editor
                                                        height="100%"
                                                        language={lang.monacoLanguage}
                                                        value={template.driverCode}
                                                        theme={isDark ? "vs-dark" : "vs-light"}
                                                        onChange={(val) => updateTemplate(lang.id, "driverCode", val || "")}
                                                        options={{
                                                            minimap: { enabled: false },
                                                            fontSize: 13,
                                                            lineNumbers: "on",
                                                            scrollBeyondLastLine: false,
                                                            automaticLayout: true,
                                                            padding: { top: 8 },
                                                        }}
                                                        loading={
                                                            <div className="flex items-center justify-center h-full">
                                                                <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    This code wraps the user&apos;s implementation. Include input parsing and function call.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Helper tip */}
                    <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg p-3">
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                            <strong>Tip:</strong> Define the function signature in &quot;Function Template&quot; and the I/O handling in &quot;Driver Code&quot;.
                            When running, the system combines: <code className="bg-blue-100 dark:bg-blue-500/20 px-1 rounded">driver code + user&apos;s function</code>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
