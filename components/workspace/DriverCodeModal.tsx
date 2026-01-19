"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, Copy, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { getLanguageById } from "@/lib/languages";

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

interface DriverCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  languageId: number;
}

export default function DriverCodeModal({
  isOpen,
  onClose,
  code,
  languageId,
}: DriverCodeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  const currentLanguage = getLanguageById(languageId);
  const theme = resolvedTheme === "dark" ? "vs-dark" : "vs-light";

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    toast.success("Driver code copied to clipboard", {
      className: "rounded-xl border border-gray-200 dark:border-white/10 shadow-lg",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-4xl h-[80vh] bg-white dark:bg-[#141414] rounded-xl shadow-2xl border border-gray-200 dark:border-[#262626] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-[#262626] flex items-center justify-between bg-gray-50/50 dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                    <Code2 className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Driver Code
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        This is the code that runs your solution
                    </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {isCopied ? "Copied" : "Copy"}
                </button>
                <div className="w-px h-6 bg-gray-200 dark:bg-[#333] mx-1" />
                <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative bg-white dark:bg-[#1e1e1e]">
                 <Editor
                    height="100%"
                    language={currentLanguage?.monacoLanguage || "plaintext"}
                    value={code}
                    theme={theme}
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        padding: { top: 16, bottom: 16 },
                    }}
                />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-gray-50 dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-[#262626] flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                <p>Read-only mode</p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-bold text-white bg-gray-900 dark:bg-white dark:text-black rounded-lg hover:bg-black dark:hover:bg-gray-200 transition-colors"
                >
                    Close
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
