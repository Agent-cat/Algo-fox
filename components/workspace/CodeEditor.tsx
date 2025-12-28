"use client";
import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { AlignLeft, RotateCcw, Maximize2, ChevronDown, Loader2 } from 'lucide-react';
import { getCodeDraft, saveCodeDraft } from '@/lib/db';
import { toast } from 'sonner';
import { LANGUAGES, getLanguageById, DEFAULT_LANGUAGE_ID } from '@/lib/languages';

const LANGUAGE_STORAGE_KEY = 'algofox_selected_language';

interface CodeEditorProps {
    onChange: (value: string | undefined) => void;
    onLanguageChange?: (languageId: number) => void;
    defaultValue?: string;
    value?: string;
    languageId?: number;
    problemId?: string;
}

const AUTOSAVE_DELAY = 1000; // 1 second

export default function CodeEditor({
    onChange,
    onLanguageChange,
    defaultValue,
    value: controlledValue,
    languageId = DEFAULT_LANGUAGE_ID,
    problemId
}: CodeEditorProps) {
    // We rely on the parent key={languageId} to remount this component when language changes
    // sc so we can use languageId prop directly.
    const currentLanguage = getLanguageById(languageId) || LANGUAGES[0];

    // Initialize code state with boilerplate - will be replaced by useEffect when code is loaded
    const [code, setCode] = useState(defaultValue || currentLanguage.boilerplate);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const editorRef = React.useRef<any>(null);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isRestoring, setIsRestoring] = useState(false);
    // Initialize loading state: if we have a problemId, we are loading.
    const [isLoading, setIsLoading] = useState(!!problemId);
    const [isSaving, setIsSaving] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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

    // LOAD SAVED CODE
    useEffect(() => {
        if (!problemId) {
            // If no problemId, just set boilerplate for current language
            const lang = getLanguageById(languageId);
            const langBoilerplate = lang?.boilerplate || LANGUAGES[0].boilerplate;
            setCode(langBoilerplate);
            if (editorRef.current) {
                editorRef.current.setValue(langBoilerplate);
            }
            onChange(langBoilerplate);
            return;
        }

        let isMounted = true;
        let cancelled = false;

        async function loadDraft(retryCount = 0) {
            try {
                // If this is a retry, or initial load, ensure loading state is set (though it should be true from init)
                if (retryCount === 0) setIsLoading(true);
                setIsRestoring(true);

                const savedCode = await getCodeDraft(problemId!, languageId);

                // Check if component is still mounted and effect hasn't been cancelled
                if (!isMounted || cancelled) return;

                // If not found and this is the first attempt, try once more after a delay
                // This handles potential DB initialization race conditions
                if (!savedCode && retryCount === 0) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    if (!isMounted || cancelled) return;
                    return loadDraft(1);
                }

                const lang = getLanguageById(languageId);
                const langBoilerplate = lang?.boilerplate || LANGUAGES[0].boilerplate;

                const codeToSet = savedCode || langBoilerplate;
                setCode(codeToSet);

                if (editorRef.current) {
                    editorRef.current.setValue(codeToSet);
                }
                onChange(codeToSet);
            } catch (error) {
                console.error("Failed to load code draft:", error);
                if (!isMounted || cancelled) return;
                // On error, set boilerplate
                const lang = getLanguageById(languageId);
                const langBoilerplate = lang?.boilerplate || LANGUAGES[0].boilerplate;
                setCode(langBoilerplate);
                if (editorRef.current) {
                    editorRef.current.setValue(langBoilerplate);
                }
                onChange(langBoilerplate);
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
    }, [problemId, languageId]); // languageId dependency is technically static due to key prop, but kept for correctness

    // HANDLE AUTOSAVE
    const debouncedSave = (value: string) => {
        if (!problemId) return;

        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(async () => {
            setIsSaving(true);
            try {
                // Save to DB and wait for at least 500ms to show the spinner
                await Promise.all([
                    saveCodeDraft(problemId, languageId, value),
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
        // Don't change if it's the same language
        if (newLanguageId === languageId) {
            setIsDropdownOpen(false);
            return;
        }

        setIsDropdownOpen(false);
        // Parent component will handle state update and remount us
        if (onLanguageChange) {
            onLanguageChange(newLanguageId);
        }
    };

    const handleEditorDidMount = (editor: any) => {
        editorRef.current = editor;
        // Set initial code value
        if (code) {
            editor.setValue(code);
        }
    };

    const handleFormat = () => {
        if (editorRef.current) {
            editorRef.current.getAction('editor.action.formatDocument').run();
        }
    };

    const handleReset = () => {
        const lang = getLanguageById(languageId);
        const boilerplate = lang?.boilerplate || LANGUAGES[0].boilerplate;
        setCode(boilerplate);
        onChange(boilerplate);
        if (editorRef.current) {
            editorRef.current.setValue(boilerplate);
        }

        if (problemId) {
            // Overwrite draft immediately with boilerplate code
            saveCodeDraft(problemId, languageId, boilerplate).then(() => {
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
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 text-xs font-medium text-gray-700 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                        >
                            {currentLanguage.name} <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => handleLanguageChange(lang.id)}
                                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg ${languageId === lang.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
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
                    <button
                        onClick={handleReset}
                        className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                        title="Reset to Default"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </button>
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
                            onChange(newVal);
                            debouncedSave(newVal);
                        }}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            roundedSelection: true,
                            scrollBeyondLastLine: false,
                            readOnly: false,
                            automaticLayout: true,
                            padding: { top: 16 },
                        }}
                    />
                )}
            </div>
        </div>
    );
}
