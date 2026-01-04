"use client";
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { AlignLeft, RotateCcw, Maximize2, ChevronDown, Loader2 } from 'lucide-react';
import { getCodeDraft, saveCodeDraft } from '@/lib/db';
import { toast } from 'sonner';
import { LANGUAGES, getLanguageById, DEFAULT_LANGUAGE_ID } from '@/lib/languages';
import { ProblemDomain } from '@prisma/client';

const LANGUAGE_STORAGE_KEY = 'algofox_selected_language';
const SQL_LANGUAGE_ID = 82; // SQL language ID

interface FunctionTemplate {
    languageId: number;
    functionTemplate: string;
    driverCode: string;
}

interface CodeEditorProps {
    onChange?: (value: string | undefined) => void;
    onLanguageChange?: (languageId: number) => void;
    defaultValue?: string;
    value?: string;
    languageId?: number;
    problemId?: string;
    domain?: ProblemDomain;
    functionTemplates?: FunctionTemplate[];
}

const AUTOSAVE_DELAY = 1000; // 1 second

export default function CodeEditor({
    onChange,
    onLanguageChange,
    defaultValue,
    value: controlledValue,
    languageId = DEFAULT_LANGUAGE_ID,
    problemId,
    domain,
    functionTemplates,
    readOnly = false
}: CodeEditorProps & { readOnly?: boolean }) {
    // Filter languages based on domain: SQL problems only show SQL language
    const availableLanguages = domain === "SQL"
        ? LANGUAGES.filter(lang => lang.id === SQL_LANGUAGE_ID)
        : LANGUAGES.filter(lang => lang.id !== SQL_LANGUAGE_ID);

    // For SQL problems, default to SQL language
    const effectiveLanguageId = domain === "SQL"
        ? (languageId === SQL_LANGUAGE_ID ? languageId : SQL_LANGUAGE_ID)
        : languageId;

    // We rely on the parent key={languageId} to remount this component when language changes
    // sc so we can use languageId prop directly.
    const currentLanguage = getLanguageById(effectiveLanguageId) || availableLanguages[0];

    // Helper: get the boilerplate for the current language
    // If function template exists for this language, use it; otherwise use default
    const getBoilerplate = (): string => {
        if (domain === "SQL") return "";
        // Check if we have a function template for this language
        if (functionTemplates && functionTemplates.length > 0) {
            const template = functionTemplates.find(t => t.languageId === effectiveLanguageId);
            if (template && template.functionTemplate) {
                return template.functionTemplate;
            }
        }
        // Fall back to default boilerplate from languages.ts
        return currentLanguage.boilerplate;
    };

    // Initialize code state
    // If readOnly, prioritize controlledValue.
    // Else, use domain/boilerplate logic.
    const initialCode = readOnly && controlledValue !== undefined
        ? controlledValue
        : (domain === "SQL" ? (defaultValue || "") : (defaultValue || getBoilerplate()));

    const [code, setCode] = useState(initialCode);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const editorRef = React.useRef<any>(null);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isRestoring, setIsRestoring] = useState(false);

    // Initialize loading state: if we have a problemId AND NOT readOnly, we are loading.
    const [isLoading, setIsLoading] = useState(!!problemId && domain !== "SQL" && !readOnly);

    const [isSaving, setIsSaving] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Suppress Monaco Editor cancellation errors (they're harmless)
    useEffect(() => {
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            // Suppress "Canceled" errors from Monaco Editor disposal
            if (event.reason?.message === 'Canceled' ||
                event.reason?.toString()?.includes('Canceled')) {
                event.preventDefault();
                return;
            }
        };

        window.addEventListener('unhandledrejection', handleUnhandledRejection);
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isDropdownOpen]);

    // LOAD SAVED CODE (Only if NOT readOnly)
    useEffect(() => {
        if (readOnly) return; // Skip loading draft if read-only

        if (!problemId) {
            // If no problemId, set code based on domain
            if (domain === "SQL") {
                setCode("");
                if (editorRef.current) {
                    editorRef.current.setValue("");
                }
                if (onChange) onChange("");
            } else {
                const langBoilerplate = getBoilerplate();
                setCode(langBoilerplate);
                if (editorRef.current) {
                    editorRef.current.setValue(langBoilerplate);
                }
                if (onChange) onChange(langBoilerplate);
            }
            return;
        }

        let isMounted = true;
        let cancelled = false;

        async function loadDraft(retryCount = 0) {
            // For SQL, if no saved code, just set empty and return immediately
            if (domain === "SQL" && retryCount === 0) {
                try {
                    setIsLoading(true);
                    const savedCode = await getCodeDraft(problemId!, effectiveLanguageId);
                    if (!isMounted || cancelled) {
                        setIsLoading(false);
                        return;
                    }
                    const codeToSet = savedCode || "";
                    setCode(codeToSet);
                    if (editorRef.current) {
                        editorRef.current.setValue(codeToSet);
                    }
                    if (onChange) onChange(codeToSet);
                    setIsLoading(false);
                    return;
                } catch (error) {
                    console.error("Failed to load code draft:", error);
                    if (isMounted && !cancelled) {
                        setCode("");
                        if (editorRef.current) {
                            editorRef.current.setValue("");
                        }
                        if (onChange) onChange("");
                        setIsLoading(false);
                    }
                    return;
                }
            }

            try {
                // If this is a retry, or initial load, ensure loading state is set
                if (retryCount === 0) setIsLoading(true);
                setIsRestoring(true);

                const savedCode = await getCodeDraft(problemId!, effectiveLanguageId);

                // Check if component is still mounted and effect hasn't been cancelled
                if (!isMounted || cancelled) {
                    setIsLoading(false);
                    setIsRestoring(false);
                    return;
                }

                // If not found and this is the first attempt, try once more after a delay
                if (!savedCode && retryCount === 0) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    if (!isMounted || cancelled) {
                        setIsLoading(false);
                        setIsRestoring(false);
                        return;
                    }
                    return loadDraft(1);
                }

                // For SQL, use empty string if no saved code; for others, use boilerplate
                let codeToSet: string;
                if (domain === "SQL") {
                    codeToSet = savedCode || "";
                } else {
                    const langBoilerplate = getBoilerplate();
                    codeToSet = savedCode || langBoilerplate;
                }

                setCode(codeToSet);

                if (editorRef.current) {
                    editorRef.current.setValue(codeToSet);
                }
                if (onChange) onChange(codeToSet);
            } catch (error) {
                console.error("Failed to load code draft:", error);
                if (!isMounted || cancelled) {
                    setIsLoading(false);
                    setIsRestoring(false);
                    return;
                }
                // On error, set empty for SQL, boilerplate for others
                if (domain === "SQL") {
                    setCode("");
                    if (editorRef.current) {
                        editorRef.current.setValue("");
                    }
                    if (onChange) onChange("");
                } else {
                    const langBoilerplate = getBoilerplate();
                    setCode(langBoilerplate);
                    if (editorRef.current) {
                        editorRef.current.setValue(langBoilerplate);
                    }
                    if (onChange) onChange(langBoilerplate);
                }
            } finally {
                if (isMounted && !cancelled) {
                    setIsRestoring(false);
                    setIsLoading(false);
                }
            }
        }

        loadDraft();

        return () => {
            isMounted = false;
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [problemId, effectiveLanguageId, readOnly]);

    // HANDLE AUTOSAVE (Only if NOT readOnly)
    const debouncedSave = (value: string) => {
        if (!problemId || readOnly) return; // Skip saving logic entirely if readOnly

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(async () => {
            setIsSaving(true);
            try {
                // Save to DB and wait for at least 500ms to show the spinner
                await Promise.all([
                    saveCodeDraft(problemId, effectiveLanguageId, value),
                    new Promise(resolve => setTimeout(resolve, 500))
                ]);
            } catch (err) {
                console.error("Autosave failed:", err);
            } finally {
                setIsSaving(false);
            }
        }, AUTOSAVE_DELAY);
    };

    const handleLanguageChange = (newLanguageId: number) => {
        // In read-only mode, we likely disable changing lang, but if allowed:
        if (newLanguageId === effectiveLanguageId) {
            setIsDropdownOpen(false);
            return;
        }

        setIsDropdownOpen(false);
        if (onLanguageChange) {
            onLanguageChange(newLanguageId);
        }
    };

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
        // In readOnly mode, the editor might strictly follow `value` prop if we passed one,
        // but setting it explicitly ensures it matches state.
        if (code) {
            editor.setValue(code);
        }
    };

    // Cleanup editor on unmount
    useEffect(() => {
        return () => {
            if (editorRef.current) {
                try {
                    // Dispose editor properly
                    const editor = editorRef.current;
                    if (editor.dispose) {
                        editor.dispose();
                    }
                    editorRef.current = null;
                } catch (error) {
                    console.debug('Editor disposal error (safe to ignore):', error);
                }
            }
        };
    }, []);

    const handleFormat = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
        }
    };

    const handleReset = () => {
        if (readOnly) return; // Disable reset in read-only

        const resetCode = domain === "SQL" ? "" : getBoilerplate();
        setCode(resetCode);
        if (onChange) onChange(resetCode);
        if (editorRef.current) {
            editorRef.current.setValue(resetCode);
        }

        if (problemId) {
            saveCodeDraft(problemId, effectiveLanguageId, resetCode).then(() => {
                toast.success("Code reset to default");
            });
        }
    };

    const handleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div className="h-full flex flex-col bg-white border-l border-gray-200">
            {/* EDITOR TOOLBAR */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => !readOnly && setIsDropdownOpen(!isDropdownOpen)}
                            disabled={readOnly}
                            className={`flex items-center gap-2 text-xs font-medium text-gray-700 px-2 py-1 rounded transition-colors ${readOnly ? 'opacity-70 cursor-default' : 'hover:bg-gray-200'}`}
                        >
                            {currentLanguage.name}
                            {!readOnly && <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
                        </button>
                        {isDropdownOpen && !readOnly && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                                {availableLanguages.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => handleLanguageChange(lang.id)}
                                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${effectiveLanguageId === lang.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                                            }`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    {isSaving && (
                        <div className="flex items-center gap-1.5 text-xs text-orange-500 font-medium">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Saving...</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                    {isRestoring && <Loader2 className="w-3 h-3 animate-spin text-gray-400 mr-2" />}
                    <button
                        onClick={handleFormat}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="Format Code"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                    {!readOnly && (
                        <button
                            onClick={handleReset}
                            className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                            title="Reset to Default"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={handleFullScreen}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="Full Screen"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* MONACO EDITOR */}
            <div className="flex-1 relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                        <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                            <p className="text-sm text-gray-500 font-medium">Loading your code...</p>
                        </div>
                    </div>
                ) : (
                    <Editor
                        height="100%"
                        language={currentLanguage.monacoLanguage}
                        value={code}
                        theme="vs-light"
                        onMount={handleEditorDidMount}
                        onChange={(value) => {
                            const newVal = value || "";
                            setCode(newVal);
                            if (onChange) onChange(newVal);
                            debouncedSave(newVal);
                        }}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            roundedSelection: true,
                            scrollBeyondLastLine: false,
                            readOnly: readOnly, // Apply readOnly prop here
                            automaticLayout: true,
                            padding: { top: 16 },
                        }}
                        loading={<div className="flex items-center justify-center h-full"><Loader2 className="w-6 h-6 text-orange-500 animate-spin" /></div>}
                    />
                )}
            </div>
        </div>
    );
}
