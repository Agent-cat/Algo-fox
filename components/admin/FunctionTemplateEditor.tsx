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
            <div className="bg-gray-50 dark:bg-[#111] rounded-[3px] p-1.5 border border-gray-200 dark:border-[#333]">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => onUseFunctionTemplateChange(false)}
                        className={`flex-1 px-4 py-3 rounded-[3px] text-sm font-bold transition-all ${!useFunctionTemplate
                            ? "bg-white dark:bg-[#121212] text-[#39424e] dark:text-white shadow-sm border border-gray-200 dark:border-[#444]"
                            : "bg-transparent text-[#738f93] dark:text-gray-400 hover:text-[#39424e] dark:hover:text-white hover:bg-[#ebf0f4] dark:hover:bg-[#222]"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span>Standard Mode</span>
                            <span className="text-[10px] font-normal opacity-70">Generic boilerplate code</span>
                        </div>
                    </button>
                    <button
                        type="button"
                        onClick={() => onUseFunctionTemplateChange(true)}
                        className={`flex-1 px-4 py-3 rounded-[3px] text-sm font-bold transition-all ${useFunctionTemplate
                            ? "bg-white dark:bg-[#121212] text-[#39424e] dark:text-white shadow-sm border border-gray-200 dark:border-[#444]"
                            : "bg-transparent text-[#738f93] dark:text-gray-400 hover:text-[#39424e] dark:hover:text-white hover:bg-[#ebf0f4] dark:hover:bg-[#222]"
                            }`}
                    >
                        <div className="flex flex-col items-center gap-1">
                            <span>Template Mode</span>
                            <span className="text-[10px] font-normal opacity-70">Custom function signature</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Function Template Editor (shown when useFunctionTemplate is true) */}
            {useFunctionTemplate && (
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono">
                            Language Templates
                        </h3>
                        <span className="text-xs italic text-gray-500 dark:text-gray-500">
                            Define function signature and driver code for each language
                        </span>
                    </div>

                    {/* Language Accordion */}
                    <div className="border border-gray-200 dark:border-[#333] rounded-[3px] overflow-hidden shadow-sm">
                        {DSA_LANGUAGES.map((lang, idx) => {
                            const isExpanded = expandedLanguages.has(lang.id);
                            const template = getTemplate(lang.id);
                            const hasTemplateContent = hasContent(lang.id);

                            return (
                                <div key={lang.id} className={idx > 0 ? "border-t border-gray-200 dark:border-[#333]" : ""}>
                                    {/* Language Header */}
                                    <div className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] transition-colors">
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
                                            <span className="text-[13px] font-bold text-[#39424e] dark:text-gray-200 font-mono">{lang.name}</span>
                                            {hasTemplateContent && (
                                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] rounded-[3px] font-bold border border-emerald-100 dark:border-emerald-500/20">
                                                    Configured
                                                </span>
                                            )}
                                        </button>
                                        {isExpanded && hasTemplateContent && (
                                            <button
                                                type="button"
                                                onClick={() => copyToAllLanguages(lang.id)}
                                                className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-bold text-[#39424e] dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-[3px] transition-colors"
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
                                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                                    Function Template
                                                    <span className="font-normal normal-case italic ml-2">
                                                        (What user sees as boilerplate)
                                                    </span>
                                                </label>
                                                <div className="border border-gray-300 dark:border-[#444] rounded-[3px] overflow-hidden h-40 shadow-inner">
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
                                                                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            {/* Driver Code */}
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest">
                                                    Driver Code
                                                    <span className="font-normal normal-case italic ml-2">
                                                        (Hidden - calls user's function)
                                                    </span>
                                                </label>
                                                <div className="border border-gray-300 dark:border-[#444] rounded-[3px] overflow-hidden h-48 shadow-inner">
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
                                                                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                                                            </div>
                                                        }
                                                    />
                                                </div>
                                                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-mono italic">
                                                    This code wraps the user's implementation. Include input parsing and function call.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Helper tip */}
                    <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-[3px] p-4 flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">!</div>
                        <p className="text-xs text-[#39424e] dark:text-gray-300 leading-relaxed">
                            <strong>Tip:</strong> Define the function signature in &quot;Function Template&quot; and the I/O handling in &quot;Driver Code&quot;.
                            When running, the system combines: <code className="bg-emerald-100 dark:bg-emerald-500/20 px-1.5 py-0.5 rounded-[3px] font-mono text-emerald-700 dark:text-emerald-400">driver code + user&apos;s implementation</code>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
