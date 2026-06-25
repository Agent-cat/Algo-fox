"use client";

import { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import { ChevronDown, ChevronRight, Loader2, Copy, Check, Plus, X } from "lucide-react";
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
    /** Language names selected in Step 1 (e.g. ["C++", "Python", "Java"]) */
    allowedLanguages?: string[];
    /** Callback to update the allowedLanguages in the parent form */
    onAllowedLanguagesChange?: (langs: string[]) => void;
}

export default function FunctionTemplateEditor({
    value,
    onChange,
    useFunctionTemplate,
    onUseFunctionTemplateChange,
    allowedLanguages = [],
    onAllowedLanguagesChange,
}: FunctionTemplateEditorProps) {
    const [expandedLanguages, setExpandedLanguages] = useState<Set<number>>(new Set());
    const [copiedFrom, setCopiedFrom] = useState<number | null>(null);
    const [showLangPicker, setShowLangPicker] = useState(false);
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    // Visible languages: if allowedLanguages is set, filter to those; else show all DSA langs
    const visibleLanguages = useMemo(() => {
        if (allowedLanguages.length === 0) return DSA_LANGUAGES;
        return DSA_LANGUAGES.filter(lang => allowedLanguages.includes(lang.name));
    }, [allowedLanguages]);

    // Create a map for quick lookup
    const templateMap = useMemo(() => {
        const map = new Map<number, FunctionTemplate>();
        value.forEach(t => map.set(t.languageId, t));
        return map;
    }, [value]);

    const toggleLanguage = (langId: number) => {
        setExpandedLanguages(prev => {
            const next = new Set(prev);
            if (next.has(langId)) next.delete(langId);
            else next.add(langId);
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

    const getTemplate = (languageId: number): FunctionTemplate =>
        templateMap.get(languageId) || { languageId, functionTemplate: "", driverCode: "" };

    const copyToAllLanguages = (sourceLanguageId: number) => {
        const source = getTemplate(sourceLanguageId);
        if (!source.functionTemplate && !source.driverCode) return;

        const newTemplates: FunctionTemplate[] = visibleLanguages.map(lang => ({
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

    // Toggle a language in the allowedLanguages list (from inside template mode)
    const toggleAllowedLang = (langName: string) => {
        if (!onAllowedLanguagesChange) return;
        const current = allowedLanguages;
        if (current.includes(langName)) {
            onAllowedLanguagesChange(current.filter(l => l !== langName));
        } else {
            onAllowedLanguagesChange([...current, langName]);
        }
    };

    return (
        <div className="space-y-6">
            {/* Mode Toggle */}
            <div className="bg-gray-50 dark:bg-[#1D1E23] rounded-[3px] p-1.5 border border-gray-200 dark:border-[#333]">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => onUseFunctionTemplateChange(false)}
                        className={`flex-1 px-4 py-3 rounded-[3px] text-sm font-bold transition-all ${!useFunctionTemplate
                            ? "bg-white dark:bg-[#1D1E23] text-[#39424e] dark:text-white shadow-sm border border-gray-200 dark:border-[#444]"
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
                            ? "bg-white dark:bg-[#1D1E23] text-[#39424e] dark:text-white shadow-sm border border-gray-200 dark:border-[#444]"
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
                <div className="space-y-4">

                    {/* ── Language Selector ── */}
                    <div className="border border-gray-200 dark:border-[#333] rounded-[3px] overflow-hidden">
                        <div
                            className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-[#1D1E23] cursor-pointer select-none"
                            onClick={() => setShowLangPicker(p => !p)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-[12px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                                    Active Languages
                                </span>
                                {allowedLanguages.length === 0 ? (
                                    <span className="text-[11px] text-gray-400 dark:text-gray-600 italic">All languages</span>
                                ) : (
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        {allowedLanguages.map(name => (
                                            <span
                                                key={name}
                                                className="px-2 py-0.5 rounded-[3px] bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 text-[11px] font-bold"
                                            >
                                                {name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button type="button" className="flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
                                {showLangPicker ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                {showLangPicker ? "Close" : "Edit"}
                            </button>
                        </div>

                        {showLangPicker && (
                            <div className="px-4 py-3 bg-white dark:bg-[#24262C] border-t border-gray-200 dark:border-[#333]">
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-3">
                                    Select which languages to include. If none selected, all languages are shown.
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {DSA_LANGUAGES.map(lang => {
                                        const isSelected = allowedLanguages.includes(lang.name);
                                        return (
                                            <button
                                                key={lang.id}
                                                type="button"
                                                onClick={() => toggleAllowedLang(lang.name)}
                                                className={`flex items-center gap-2 px-3 py-2 rounded-[3px] border text-[11px] font-bold transition-all ${isSelected
                                                    ? "border-orange-400 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400"
                                                    : "border-gray-200 dark:border-[#333] text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-[#444]"
                                                    }`}
                                            >
                                                {isSelected
                                                    ? <Check className="w-3 h-3 flex-shrink-0" />
                                                    : <div className="w-3 h-3 flex-shrink-0" />
                                                }
                                                {lang.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Language Template Accordions */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[14px] font-bold text-[#39424e] dark:text-gray-300 font-mono">
                                Language Templates
                            </h3>
                            <span className="text-xs italic text-gray-500 dark:text-gray-500">
                                {visibleLanguages.length === DSA_LANGUAGES.length
                                    ? "Showing all languages"
                                    : `Showing ${visibleLanguages.length} of ${DSA_LANGUAGES.length} languages`}
                            </span>
                        </div>

                        {visibleLanguages.length === 0 ? (
                            <div className="border border-dashed border-gray-300 dark:border-[#444] rounded-[3px] p-8 text-center">
                                <p className="text-sm text-gray-400 dark:text-gray-600">
                                    No languages selected. Use "Edit" above to add languages.
                                </p>
                            </div>
                        ) : (
                            <div className="border border-gray-200 dark:border-[#333] rounded-[3px] overflow-hidden shadow-sm">
                                {visibleLanguages.map((lang, idx) => {
                                    const isExpanded = expandedLanguages.has(lang.id);
                                    const template = getTemplate(lang.id);
                                    const hasTemplateContent = hasContent(lang.id);

                                    return (
                                        <div key={lang.id} className={idx > 0 ? "border-t border-gray-200 dark:border-[#333]" : ""}>
                                            {/* Language Header */}
                                            <div className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-[#1D1E23] hover:bg-gray-100 dark:hover:bg-[#222] transition-colors">
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
                                                            <><Check className="w-3 h-3" /> Copied!</>
                                                        ) : (
                                                            <><Copy className="w-3 h-3" /> Copy to all</>
                                                        )}
                                                    </button>
                                                )}
                                            </div>

                                            {/* Language Content */}
                                            {isExpanded && (
                                                <div className="p-4 bg-white dark:bg-[#24262C] space-y-4">
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
                                                                (Hidden - calls user&apos;s function)
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
                                                            This code wraps the user&apos;s implementation. Include input parsing and function call.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
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
