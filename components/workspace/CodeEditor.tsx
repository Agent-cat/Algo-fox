"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  AlignLeft,
  RotateCcw,
  Maximize2,
  ChevronDown,
  Loader2,
  Settings,
  Minimize2,
  Code2,
} from "lucide-react";
import DriverCodeModal from "./DriverCodeModal";
import { getCodeDraft, saveCodeDraft } from "@/lib/db";
import { toast } from "sonner";
import {
  LANGUAGES,
  getLanguageById,
  DEFAULT_LANGUAGE_ID,
} from "@/lib/languages";
import { ProblemDomain } from "@prisma/client";
import { useTheme } from "next-themes";

// Dynamically import Monaco Editor to prevent SSR issues
const Editor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
      </div>
    ),
  }
);

const LANGUAGE_STORAGE_KEY = "algofox_selected_language";
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
  readOnly?: boolean;
  userId?: string; // Add userId to props
  settings?: {
    fontSize: number;
    tabSize: number;
    theme?: "vs-light" | "vs-dark";
    keybinding: "standard" | "vim";
  };
  onOpenSettings?: () => void;
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
  readOnly = false,
  settings,
  onOpenSettings,
  userId = "",
}: CodeEditorProps) {
  // Get system theme
  const { resolvedTheme } = useTheme();

  // Determine the effective Monaco theme - use system dark mode if settings.theme not explicitly set
  const effectiveTheme =
    settings?.theme || (resolvedTheme === "dark" ? "vs-dark" : "vs-light");

  // Filter languages based on domain: SQL problems only show SQL language
  const availableLanguages =
    domain === "SQL"
      ? LANGUAGES.filter((lang) => lang.id === SQL_LANGUAGE_ID)
      : LANGUAGES.filter((lang) => lang.id !== SQL_LANGUAGE_ID);

  // For SQL problems, default to SQL language
  const effectiveLanguageId =
    domain === "SQL"
      ? languageId === SQL_LANGUAGE_ID
        ? languageId
        : SQL_LANGUAGE_ID
      : languageId;

  // We rely on the parent key={languageId} to remount this component when language changes
  // sc so we can use languageId prop directly.
  const currentLanguage =
    getLanguageById(effectiveLanguageId) || availableLanguages[0];

  // Helper: get the boilerplate for the current language
  // If function template exists for this language, use it; otherwise use default
  const getBoilerplate = (): string => {
    if (domain === "SQL") return "";
    // Check if we have a function template for this language
    if (functionTemplates && functionTemplates.length > 0) {
      const template = functionTemplates.find(
        (t) => t.languageId === effectiveLanguageId
      );
      if (template && template.functionTemplate) {
        return template.functionTemplate;
      }
    }
    // Fall back to default boilerplate from languages.ts
    return currentLanguage.boilerplate;
  };

  const getDriverCode = (): string | null => {
    if (domain === "SQL") return null;
    if (functionTemplates && functionTemplates.length > 0) {
      const template = functionTemplates.find(
        (t) => t.languageId === effectiveLanguageId
      );
      if (template && template.driverCode) {
        return template.driverCode;
      }
    }
    return null;
  };

  const currentDriverCode = getDriverCode();

  // Initialize code state
  // If readOnly, prioritize controlledValue.
  // Else, use domain/boilerplate logic.
  const initialCode =
    readOnly && controlledValue !== undefined
      ? controlledValue
      : domain === "SQL"
      ? defaultValue || ""
      : defaultValue || getBoilerplate();

  const [code, setCode] = useState(initialCode);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const editorRef = React.useRef<any>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [editorError, setEditorError] = useState(false);
  const mountRetryRef = useRef(0);
  const MAX_RETRIES = 3;

  // Initialize loading state: ALWAYS FALSE for Optimistic UI
  // We want the editor to show up immediately.
  const [isLoading, setIsLoading] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDriverCodeModalOpen, setIsDriverCodeModalOpen] = useState(false);

  // Track component mount state with a small delay to ensure DOM is ready
  useEffect(() => {
    // Small delay to ensure Monaco services are ready
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 50);

    return () => {
      clearTimeout(timer);
      setIsMounted(false);
      setEditorError(false);
      mountRetryRef.current = 0;
      // Clean up editor ref
      if (editorRef.current) {
        try {
          const editor = editorRef.current;
          const model = editor.getModel?.();
          if (
            model &&
            !model.isDisposed() &&
            typeof editor.dispose === "function"
          ) {
            editor.dispose();
          }
        } catch (error) {
          // Ignore disposal errors
        }
        editorRef.current = null;
      }
    };
  }, []);

  // Suppress Monaco Editor cancellation and disposal errors (they're harmless)
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const reasonStr = reason?.toString() || "";
      const reasonMsg = reason?.message || "";

      // Suppress Monaco Editor errors
      if (
        reasonMsg === "Canceled" ||
        reasonStr.includes("Canceled") ||
        reasonStr.includes("InstantiationService has been disposed") ||
        reasonMsg.includes("InstantiationService has been disposed") ||
        reasonStr.includes("domNode") ||
        reasonMsg.includes("domNode")
      ) {
        event.preventDefault();
        // Retry mounting if component is still mounted
        if (isMounted && mountRetryRef.current < MAX_RETRIES) {
          mountRetryRef.current++;
          setTimeout(() => {
            if (isMounted) {
              setEditorError(false);
            }
          }, 100 * mountRetryRef.current);
        }
        return;
      }
    };

    const handleError = (event: ErrorEvent) => {
      const message = event.message || "";
      if (
        message.includes("InstantiationService") ||
        message.includes("domNode") ||
        message.includes("Monaco")
      ) {
        event.preventDefault();
        return true;
      }
      return false;
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
      window.removeEventListener("error", handleError);
    };
  }, [isMounted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Handle full screen change
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        document.fullscreenElement === editorContainerRef.current
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  // LOAD SAVED CODE (Only if NOT readOnly)
  useEffect(() => {
    if (readOnly) return; // Skip loading draft if read-only

    let isMounted = true;
    let cancelled = false;

    // If no problemId, we are good with just the initial state (boilerplate)
    if (!problemId) {
      // ... (keeping existing logic for no problemId)
      // If no problemId, set code based on domain
      if (domain === "SQL") {
        setCode("");
        if (editorRef.current && isMounted) {
          try {
            const editor = editorRef.current;
            const model = editor.getModel?.();
            if (model && !model.isDisposed()) {
              editor.setValue("");
            }
          } catch (error) {
            console.debug("setValue error (safe to ignore):", error);
          }
        }
        if (onChange) onChange("");
      } else {
        const langBoilerplate = getBoilerplate();
        setCode(langBoilerplate);
        if (editorRef.current && isMounted) {
          try {
            const editor = editorRef.current;
            const model = editor.getModel?.();
            if (model && !model.isDisposed()) {
              editor.setValue(langBoilerplate);
            }
          } catch (error) {
            console.debug("setValue error (safe to ignore):", error);
          }
        }
        if (onChange) onChange(langBoilerplate);
      }
      return;
    }

    async function loadDraft(retryCount = 0) {
      // For SQL, if no saved code, just set empty and return immediately
      // NOTE: We do NOT set isLoading to true here anymore

      try {
        if (retryCount === 0) setIsRestoring(true); // Helper spinner can still show

        // Fetch draft in background
        const savedCode = await getCodeDraft(
          userId,
          problemId!,
          effectiveLanguageId
        );

        // Check if component is still mounted and effect hasn't been cancelled
        if (!isMounted || cancelled) {
          setIsRestoring(false);
          return;
        }

        // Logic to set code if savedCode exists
        // If it's a retry and we still don't have it, try again
        if (!savedCode && retryCount === 0) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          if (!isMounted || cancelled) {
            setIsRestoring(false);
            return;
          }
          return loadDraft(1);
        }

        // If we found saved code, update the editor!
        if (savedCode) {
          // Only toast if the saved code is different from what's currently shown (boilerplate)
          // This prevents annoying toasts if they match
          //  toast.info("Draft restored");
          const codeToSet = savedCode;
          setCode(codeToSet);

          if (editorRef.current) {
            try {
              const editor = editorRef.current;
              const model = editor.getModel?.();
              if (model && !model.isDisposed()) {
                const currentContent = editor.getValue();
                if (currentContent !== codeToSet) {
                  editor.setValue(codeToSet);
                  toast.success("Saved draft restored");
                }
              }
            } catch (error) {
              console.debug("setValue error (safe to ignore):", error);
            }
          }
          if (onChange) onChange(codeToSet);
        }
        // If NO saved code, we implicitly stick with the boilerplate we already showed.
        // No need to "clear" it unless it's SQL maybe?
      } catch (error) {
        console.error("Failed to load code draft:", error);
        // On error, we just keep the boilerplate.
      } finally {
        if (isMounted && !cancelled) {
          setIsRestoring(false);
          // setIsLoading(false); // No longer used
        }
      }
    }

    loadDraft();

    return () => {
      isMounted = false;
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, effectiveLanguageId, readOnly, isMounted, userId]);

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
          saveCodeDraft(userId, problemId, effectiveLanguageId, value),
          new Promise((resolve) => setTimeout(resolve, 500)),
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

  const handleEditorDidMount = (editor: any, monaco: any) => {
    if (!isMounted) return;

    try {
      editorRef.current = editor;
      setEditorError(false);
      mountRetryRef.current = 0;

      // In readOnly mode, the editor might strictly follow `value` prop if we passed one,
      // but setting it explicitly ensures it matches state.
      if (code && editor) {
        try {
          const model = editor.getModel?.();
          if (model && !model.isDisposed()) {
            editor.setValue(code);
          }
        } catch (error) {
          // Editor might be disposed, ignore
          console.debug("Editor setValue error (safe to ignore):", error);
        }
      }
    } catch (error) {
      console.debug("Editor mount error (safe to ignore):", error);
      // Retry mounting if we haven't exceeded max retries
      if (mountRetryRef.current < MAX_RETRIES && isMounted) {
        mountRetryRef.current++;
        setTimeout(() => {
          if (isMounted) {
            setEditorError(false);
          }
        }, 100 * mountRetryRef.current);
      } else {
        setEditorError(true);
      }
    }
  };

  const handleEditorWillMount = (monaco: any) => {
    // Ensure Monaco is ready before mounting
    if (!isMounted) return;
  };

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      if (editorRef.current) {
        try {
          // Dispose editor properly
          const editor = editorRef.current;
          // Check if editor is still valid before disposing
          if (editor && typeof editor.dispose === "function") {
            // Check if the editor's model is still valid
            const model = editor.getModel?.();
            if (model && !model.isDisposed()) {
              editor.dispose();
            }
          }
          editorRef.current = null;
        } catch (error) {
          // Editor might already be disposed, ignore
          console.debug("Editor disposal error (safe to ignore):", error);
        }
      }
      // Clear any pending save operations
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, []);

  const handleFormat = () => {
    if (editorRef.current) {
      try {
        const editor = editorRef.current;
        const model = editor.getModel?.();
        // Check if editor and model are still valid
        if (model && !model.isDisposed()) {
          editor.getAction("editor.action.formatDocument")?.run();
        }
      } catch (error) {
        console.debug("Format error (safe to ignore):", error);
      }
    }
  };

  const handleReset = () => {
    if (readOnly) return; // Disable reset in read-only

    const resetCode = domain === "SQL" ? "" : getBoilerplate();
    setCode(resetCode);
    if (onChange) onChange(resetCode);
    if (editorRef.current) {
      try {
        const editor = editorRef.current;
        const model = editor.getModel?.();
        // Check if editor and model are still valid
        if (model && !model.isDisposed()) {
          editor.setValue(resetCode);
        }
      } catch (error) {
        console.debug("Reset error (safe to ignore):", error);
      }
    }

    if (problemId) {
      saveCodeDraft(userId, problemId, effectiveLanguageId, resetCode).then(
        () => {
          toast.success("Code reset to default");
        }
      );
    }
  };

  const handleFullScreen = () => {
    if (!editorContainerRef.current) return;

    if (!document.fullscreenElement) {
      editorContainerRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      ref={editorContainerRef}
      className={`h-full flex flex-col bg-white dark:bg-[#1e1e1e] border-l border-gray-200 dark:border-[#262626] ${
        isFullScreen ? "fixed inset-0 z-50" : ""
      }`}
    >
      {/* EDITOR TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => !readOnly && setIsDropdownOpen(!isDropdownOpen)}
              disabled={readOnly}
              className={`flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors ${
                readOnly
                  ? "opacity-70 cursor-default"
                  : "hover:bg-gray-200 dark:hover:bg-[#262626]"
              }`}
            >
              {currentLanguage.name}
              {!readOnly && (
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
            {isDropdownOpen && !readOnly && (
              <div className="absolute top-full left-0 mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-lg shadow-lg z-50 min-w-30">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      effectiveLanguageId === lang.id
                        ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Driver Code Button */}
          {currentDriverCode && !readOnly && (
            <button
              onClick={() => setIsDriverCodeModalOpen(true)}
              className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors"
              title="View Driver Code"
            >
              <Code2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-500" />
              <span className="hidden sm:inline">View Driver Code</span>
            </button>
          )}

          {isSaving && (
            <div className="flex items-center gap-1.5 text-xs text-orange-500 font-medium">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>Saving...</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          {isRestoring && (
            <Loader2 className="w-3 h-3 animate-spin text-gray-400 mr-2" />
          )}
          <button
            onClick={handleFormat}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
            title="Format Code"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          {!readOnly && (
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
              title="Reset to Default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleFullScreen}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
            title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
          >
            {isFullScreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          {!readOnly && (
            <button
              onClick={onOpenSettings}
              className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
              title="Editor Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* MONACO EDITOR */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1e1e1e] z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Loading your code...
              </p>
            </div>
          </div>
        ) : editorError && mountRetryRef.current >= MAX_RETRIES ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1e1e1e] z-10">
            <div className="flex flex-col items-center gap-3 text-center p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Editor failed to load. Please refresh the page.
              </p>
              <button
                onClick={() => {
                  setEditorError(false);
                  mountRetryRef.current = 0;
                  setIsMounted(true);
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        ) : isMounted ? (
          <Editor
            key={`editor-${effectiveLanguageId}-${problemId || "no-problem"}-${
              mountRetryRef.current
            }`}
            height="100%"
            language={currentLanguage.monacoLanguage}
            value={code}
            theme={effectiveTheme}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onChange={(value) => {
              if (!isMounted) return;
              const newVal = value || "";
              setCode(newVal);
              if (onChange) onChange(newVal);
              debouncedSave(newVal);
            }}
            options={{
              minimap: { enabled: false },
              fontSize: settings?.fontSize || 19,
              lineNumbers: "on",
              roundedSelection: true,
              scrollBeyondLastLine: false,
              readOnly: readOnly, // Apply readOnly prop here
              automaticLayout: true,
              padding: { top: 16 },
              tabSize: settings?.tabSize || 4,
            }}
            loading={
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 text-orange-500 animate-spin" />
              </div>
            }
            onValidate={() => {}} // Suppress validation errors during disposal
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1e1e1e] z-10">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Initializing editor...
              </p>
            </div>
          </div>
        )}
      </div>

      <DriverCodeModal
        isOpen={isDriverCodeModalOpen}
        onClose={() => setIsDriverCodeModalOpen(false)}
        code={currentDriverCode || ""}
        languageId={effectiveLanguageId}
      />
    </div>
  );
}
