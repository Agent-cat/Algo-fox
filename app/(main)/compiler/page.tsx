"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Play, Loader2, X, Terminal, Cpu, Clock, AlertTriangle, PlayCircle, Sun, Moon, Maximize2, Minimize2, Settings, RotateCcw, AlignLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { LdCodeSquare } from "solar-icon-react/ld";
import { authClient } from "@/lib/auth-client";
import { saveCodeDraft, getCodeDraft } from "@/lib/db";
import { getLanguageById, DEFAULT_LANGUAGE_ID } from "@/lib/languages";
import EditorSettingsModal, { EditorSettings } from "@/components/workspace/EditorSettingsModal";

const CodeEditor = dynamic(() => import("@/components/workspace/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#fafafa] dark:bg-[#1D1E23]">
      <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
    </div>
  ),
});

const getBoilerplate = (langId: number): string => {
  return getLanguageById(langId)?.boilerplate ?? "// Write your code here";
};

const expectsStdin = (code: string, langId: number): boolean => {
  const c = code.toLowerCase();
  switch (langId) {
    case 63: // JavaScript
      return c.includes("readfilesync(0") || c.includes("readline") || c.includes("stdin");
    case 62: // Java
      return c.includes("scanner") || c.includes("system.in") || c.includes("bufferedreader");
    case 71: // Python
      return c.includes("input(") || c.includes("sys.stdin");
    case 50: // C
    case 54: // C++
      return c.includes("cin") || c.includes("scanf") || c.includes("getchar(") || c.includes("gets(") || c.includes("stdin");
    case 73: // Rust
      return c.includes("stdin") || c.includes("read_line");
    case 60: // Go
      return c.includes("scan") || c.includes("os.stdin");
    default:
      return false;
  }
};

const getFilename = (langId: number): string => {
  switch (langId) {
    case 50: return "main.c";
    case 54: return "main.cpp";
    case 62: return "Main.java";
    case 63: return "main.js";
    case 71: return "main.py";
    case 60: return "main.go";
    case 73: return "main.rs";
    case 82: return "query.sql";
    default: return "main.txt";
  }
};

const parseErrorLine = (message: string): number | null => {
  if (!message) return null;
  const linePatterns = [
    /line\s+(\d+)/i,
    /:(\d+):/,
    /at\s+(\d+)/i
  ];
  for (const pattern of linePatterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
  }
  return null;
};

export default function CompilerPage() {
  const { data: session, isPending } = authClient.useSession();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  const [languageId, setLanguageId] = useState<number>(DEFAULT_LANGUAGE_ID);
  const [code, setCode] = useState<string>("");
  const [stdin, setStdin] = useState<string>("");
  const [lastStdout, setLastStdout] = useState<string>("");
  const [terminalWidth, setTerminalWidth] = useState<number>(50); // snap-breakpoints: 30, 50
  const [highlightLine, setHighlightLine] = useState<number | null>(null);
  
  // Terminal states
  const [terminalInput, setTerminalInput] = useState<string>("");
  const [waitingForInput, setWaitingForInput] = useState<boolean>(false);
  const [terminalLines, setTerminalLines] = useState<Array<{ text: string; type: string }>>([]);

  const handleClear = () => {
    setTerminalLines([]);
    setWaitingForInput(false);
    setResults(null);
    setStdin("");
    setLastStdout("");
  };
  
  // Settings state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    fontSize: 14,
    tabSize: 4,
    theme: "vs-light",
    keybinding: "standard",
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Compiler results state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<{
    stdout: string;
    stderr: string;
    compile_output: string;
    status: { id: number; description: string };
    time: number;
    memory: number;
  } | null>(null);

  // Initialize client settings and language/draft preferences
  useEffect(() => {
    setMounted(true);
    
    // Load layout settings
    const savedWidth = localStorage.getItem("algofox_compiler_layout_width");
    if (savedWidth !== null) {
      setTerminalWidth(Number(savedWidth));
    }

    // Load editor settings
    const storedSettings = localStorage.getItem("algofox_editor_settings");
    if (storedSettings) {
      try {
        setEditorSettings(JSON.parse(storedSettings));
      } catch {}
    }

    // Load language preference
    const storedLang = localStorage.getItem("algofox_compiler_language_id");
    const parsedLang = storedLang ? parseInt(storedLang, 10) : DEFAULT_LANGUAGE_ID;
    const effectiveLang = isNaN(parsedLang) ? DEFAULT_LANGUAGE_ID : parsedLang;
    setLanguageId(effectiveLang);

    // Fetch code draft from IndexedDB
    const userId = session?.user?.id || "guest";
    getCodeDraft(userId, "compiler", effectiveLang).then((draft) => {
      if (draft) {
        setCode(draft);
      } else {
        setCode(getBoilerplate(effectiveLang));
      }
    });
  }, [session]);

  // Synchronize editor theme with system theme
  useEffect(() => {
    if (!resolvedTheme) return;
    setEditorSettings((prev) => {
      const nextTheme = (resolvedTheme === "dark" ? "vs-dark" : "vs-light") as "vs-dark" | "vs-light";
      if (prev.theme === nextTheme) return prev;
      const next = { ...prev, theme: nextTheme };
      try {
        localStorage.setItem("algofox_editor_settings", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [resolvedTheme]);

  const handleLanguageChange = useCallback((newLangId: number) => {
    setLanguageId(newLangId);
    setHighlightLine(null);
    try {
      localStorage.setItem("algofox_compiler_language_id", newLangId.toString());
    } catch {}

    const userId = session?.user?.id || "guest";
    getCodeDraft(userId, "compiler", newLangId).then((draft) => {
      if (draft) {
        setCode(draft);
      } else {
        setCode(getBoilerplate(newLangId));
      }
    });
  }, [session]);

  const handleSettingsChange = useCallback((newSettings: EditorSettings) => {
    setEditorSettings((prev) => {
      const next = { ...prev, ...newSettings };
      try {
        localStorage.setItem("algofox_editor_settings", JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const executeProgram = async (inputVal: string) => {
    setIsRunning(true);
    setWaitingForInput(false);

    try {
      const response = await fetch("/api/compiler/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          languageId,
          stdin: inputVal,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Execution failed");
      }

      const data = await response.json();
      setResults(data);

      const isSuccess = data.status?.id === 3;
      const isCompileError = data.status?.id === 6;

      const newLines: Array<{ text: string; type: string }> = [];

      if (isCompileError) {
        const compileOut = data.compile_output || data.status?.description || "Compilation Error";
        newLines.push({ text: compileOut, type: "error" });
        setTerminalLines((prev) => [...prev, ...newLines]);
        toast.error(`Compilation Error: ${data.status?.description || "Failed to compile"}`);
        const errLine = parseErrorLine(compileOut);
        if (errLine) setHighlightLine(errLine);
      } else {
        // Decode and diff stdout
        const currentStdout = data.stdout || "";
        let newStdout = currentStdout;
        if (lastStdout && currentStdout.startsWith(lastStdout)) {
          newStdout = currentStdout.substring(lastStdout.length);
        }
        setLastStdout(currentStdout);

        // Check if there is stderr
        const errText = data.stderr || "";
        const isEOF = errText.includes("NoSuchElementException") || 
                      errText.includes("EOFError") || 
                      errText.includes("InputMismatchException");

        if (newStdout) {
          newLines.push({ text: newStdout, type: "output" });
        }

        if (errText) {
          if (isEOF) {
            // It's a temporary input error, we wait for next input
            setWaitingForInput(true);
          } else {
            // It's a real runtime crash error, print it
            newLines.push({ text: errText, type: "error" });
            const errLine = parseErrorLine(errText);
            if (errLine) setHighlightLine(errLine);
          }
        }

        setTerminalLines((prev) => [...prev, ...newLines]);

        if (isSuccess) {
          toast.success("Execution completed successfully");
        } else if (!isEOF) {
          toast.error(`Execution failed: ${data.status?.description || "Error"}`);
        }
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred while compiling code.";
      setTerminalLines((prev) => [
        ...prev,
        { text: `Error: ${errorMessage}`, type: "error" }
      ]);
      toast.error(errorMessage);
      const errLine = parseErrorLine(errorMessage);
      if (errLine) setHighlightLine(errLine);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Code cannot be empty");
      return;
    }

    setIsRunning(false);
    setTerminalWidth((w) => (w === 0 ? 50 : w));
    setResults(null);
    setTerminalInput("");
    setStdin(""); // Clear accumulated stdin
    setLastStdout(""); // Clear last stdout
    setHighlightLine(null);

    const needsInput = expectsStdin(code, languageId);

    if (needsInput) {
      setTerminalLines([
        { text: "Input required:", type: "info" }
      ]);
      setWaitingForInput(true);
      return;
    }

    setTerminalLines([]);
    await executeProgram("");
  };

  const handleTerminalInputSubmit = async () => {
    const val = terminalInput;
    setTerminalInput("");
    setWaitingForInput(false);
    
    // Append the new input line to accumulated stdin
    const newStdin = stdin ? `${stdin}\n${val}` : val;
    setStdin(newStdin);

    setTerminalLines((prev) => [
      ...prev,
      { text: `> ${val}`, type: "input" }
    ]);
    await executeProgram(newStdin);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const container = e.currentTarget.parentElement;
    const containerWidth = container?.clientWidth || 1000;
    const initialWidthPercent = terminalWidth;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const currentPercent = initialWidthPercent - deltaPercent;
      // Bounded dragging boundaries: 25% to 60%
      const boundedPercent = Math.max(25, Math.min(60, currentPercent));
      setTerminalWidth(boundedPercent);
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const deltaX = upEvent.clientX - startX;
      const deltaPercent = (deltaX / containerWidth) * 100;
      const finalPercent = initialWidthPercent - deltaPercent;

      // Snapping to breakpoints: 30% (narrow), 50% (exact center)
      const candidates = [30, 50];
      const closest = candidates.reduce((prev, curr) => {
        return Math.abs(curr - finalPercent) < Math.abs(prev - finalPercent) ? curr : prev;
      });

      setTerminalWidth(closest);
      try {
        localStorage.setItem("algofox_compiler_layout_width", closest.toString());
      } catch {}
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (!mounted || isPending) {
    return (
      <div className="flex items-center justify-center min-h-[var(--content-height)] bg-[#fafafa] dark:bg-[#1D1E23]">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[var(--content-height)] bg-[#fafafa] dark:bg-[#1D1E23] p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Authentication Required</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-4">
          Please sign in to AlgoFox to access the online code compiler and run your code.
        </p>
      </div>
    );
  }

  const outputContent = () => {
    const isEmpty = terminalLines.length === 0 && !isRunning && !waitingForInput;
    return (
      <div className={`flex flex-col gap-1.5 text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed ${
        isEmpty ? "h-full justify-center items-center" : ""
      }`}>
        {terminalLines.map((line, idx) => {
          const getColorClass = () => {
            switch (line.type) {
              case "command":
                return "text-orange-600 dark:text-orange-400 font-semibold";
              case "input":
                return "text-blue-600 dark:text-blue-400 font-medium";
              case "output":
                return "text-gray-850 dark:text-gray-200 whitespace-pre-wrap";
              case "error":
                return "text-red-650 dark:text-red-400 whitespace-pre-wrap font-medium";
              case "status":
                return "text-emerald-600 dark:text-emerald-400 font-bold";
              case "info":
                return "text-zinc-500 dark:text-zinc-400 italic";
              default:
                return "text-gray-700 dark:text-gray-300";
            }
          };
          return (
            <pre key={idx} className={`${getColorClass()} font-mono whitespace-pre-wrap`}>
              {line.text}
            </pre>
          );
        })}

        {waitingForInput && (
          <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 mt-1">
            <span className="font-bold">&gt;</span>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleTerminalInputSubmit();
                }
              }}
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-gray-950 dark:text-gray-100 font-mono text-sm p-0 m-0"
              autoFocus
              placeholder="Type input and press Enter..."
            />
          </div>
        )}

        {isRunning && (
          <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 animate-pulse mt-1">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Running...</span>
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center gap-2.5 text-gray-400 dark:text-gray-500 animate-fadeIn">
            <PlayCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 animate-pulse" />
            <span className="text-sm font-semibold tracking-wide">Click &quot;Run&quot; to start terminal session</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`h-[var(--content-height)] w-full bg-[#fafafa] dark:bg-[#1D1E23] flex flex-col overflow-hidden ${
      isFullscreen ? "relative z-[60]" : "animate-fadeIn"
    }`}>
      {/* Settings Modal */}
      <EditorSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={editorSettings}
        onSettingsChange={handleSettingsChange}
      />

      {/* Editor & Resizable Output Layout */}
      {/* Mobile: flex-col (stacked). Desktop: flex-row (side-by-side with drag resize) */}
      <div className="flex-1 flex flex-col md:flex-row min-w-0 bg-[#f0f0f0] dark:bg-[#1D1E23] relative overflow-hidden">
        {/* Left: Code Editor Container */}
        <div 
          className={`min-h-0 overflow-hidden flex flex-col bg-white dark:bg-[#1D1E23] ${
            isFullscreen ? "fixed inset-0 z-[60] w-full" : "h-[55vh] md:h-full flex-shrink-0 md:flex-shrink"
          }`} 
          style={isFullscreen ? undefined : { width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${100 - terminalWidth}%` : undefined }}
        >
          {/* Custom Editor Toolbar matching Workspace */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 bg-[#fafafa] dark:bg-[#1C1D21] h-14 px-4 shrink-0 select-none">
            {/* Left Side: Language Selector */}
            <div className="flex items-center gap-3 h-full">
              <div className="relative">
                <select
                  value={languageId}
                  onChange={(e) => handleLanguageChange(Number(e.target.value))}
                  className="bg-transparent border-none outline-none text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <option value={50}>C</option>
                  <option value={54}>C++</option>
                  <option value={62}>Java</option>
                  <option value={63}>JavaScript</option>
                  <option value={71}>Python</option>
                  <option value={60}>Go</option>
                  <option value={73}>Rust</option>
                  <option value={82}>SQL</option>
                </select>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Format Code Button */}
              <button
                onClick={() => window.dispatchEvent(new Event('algofox_format_code'))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-[#262626] rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer animate-fadeIn"
                title="Format Code"
              >
                <AlignLeft className="w-4 h-4" />
              </button>

              {/* Reset Code Button */}
              <button
                onClick={() => window.dispatchEvent(new Event('algofox_reset_code'))}
                className="p-2 hover:bg-gray-200 dark:hover:bg-[#262626] rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer animate-fadeIn"
                title="Reset to Default"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Settings Button */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-[#262626] rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer animate-fadeIn"
                title="Editor Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-200 dark:hover:bg-[#262626] rounded-lg text-gray-500 dark:text-gray-400 cursor-pointer"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Orange Run Button */}
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 sm:gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer shadow-sm shadow-orange-500/10 ml-1"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
                    <span className="hidden xs:inline sm:inline">Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                    <span className="hidden xs:inline sm:inline">Run</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Monaco Code Editor */}
          <div className="flex-1 min-h-0">
            <CodeEditor
              key={languageId}
              problemId="compiler"
              defaultValue={code}
              value={code}
              onChange={(val) => {
                const newCode = val || "";
                setCode(newCode);
                setHighlightLine(null);
                const userId = session?.user?.id || "guest";
                saveCodeDraft(userId, "compiler", languageId, newCode);
              }}
              languageId={languageId}
              onLanguageChange={handleLanguageChange}
              settings={editorSettings}
              onOpenSettings={() => setIsSettingsOpen(true)}
              userId={session?.user?.id || "guest"}
              highlightLine={highlightLine}
              allowPaste={true}
              hideToolbar={true}
            />
          </div>
        </div>

        {/* Divider / Snapping Resizer bar */}
        {terminalWidth > 0 && (
          <div
            className="w-[1px] h-full cursor-col-resize bg-gray-200 dark:bg-white/10 hover:bg-orange-500 active:bg-orange-600 transition-colors relative z-20 shrink-0"
            onMouseDown={handleMouseDown}
          />
        )}

        {/* Right: Terminal Console */}
        {/* Mobile: always show terminal below editor (full width) */}
        {/* Desktop: show terminal in side panel when terminalWidth > 0 */}
        <div 
          className={`min-h-0 flex flex-col bg-[#FFFFFE] dark:bg-[#1D1E23] border-t md:border-t-0 md:border-l border-gray-200 dark:border-white/10 relative ${
            terminalWidth > 0 ? 'animate-slideLeft' : 'hidden md:hidden'
          }`}
          style={{ 
            height: typeof window !== 'undefined' && window.innerWidth < 768 ? '45vh' : undefined,
            width: typeof window !== 'undefined' && window.innerWidth >= 768 && terminalWidth > 0 ? `${terminalWidth}%` : undefined 
          }}
          >
            {/* Console Header - Matches Image Layout */}
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/5 px-4 shrink-0 bg-gray-50/50 dark:bg-[#1C1D21] h-14 select-none">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
                <Terminal className="w-4 h-4 text-orange-500" />
                <span>Output</span>
              </div>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 border border-gray-300 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/5 text-xs font-semibold text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded transition-all cursor-pointer bg-white dark:bg-transparent"
              >
                Clear
              </button>
            </div>

            {/* Console Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar min-h-0 bg-[#FFFFFE] dark:bg-[#1D1E23] flex flex-col">
              {outputContent()}
            </div>
          </div>
        </div>
      </div>
  );
}
