"use client";

import React, { useState, useEffect, ReactElement, ReactNode } from "react";
import { Copy, Check, Maximize2, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css"; // Ensure a dark theme is available, or use a specific one

// Helper to extract text from React children
const extractText = (children: ReactNode): string => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    const props = (children as any).props;
    if (props && props.children) {
      return extractText(props.children);
    }
  }
  return "";
};

interface CodeSnippet {
  language: string;
  code: string;
  element: ReactNode;
}

interface SolutionCodeGroupProps {
  title?: string;
  children: ReactNode;
}

const STORAGE_KEY = "algofox_solution_lang_pref";

export default function SolutionCodeGroup({ title = "Solution", children }: SolutionCodeGroupProps) {
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [activeLang, setActiveLang] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Parse children to extract code blocks and languages
  useEffect(() => {
    const validSnippets: CodeSnippet[] = [];

    // React.Children.toArray transforms children to an array for safe iteration
    React.Children.forEach(children, (child) => {
      // We expect 'pre' tags containing 'code' tags from markdown
      if (React.isValidElement(child)) {
        // Direct code block in pre usually looks like <pre><code className="language-xyz">...</code></pre>
        const childEl = child as any;
        if (childEl.type === 'pre' && childEl.props.children) {
          const codeElement = childEl.props.children as ReactElement;
          if (React.isValidElement(codeElement) && (codeElement as any).type === 'code') {
            const codeProps = (codeElement as any).props;
            const className = codeProps.className || "";
            // Extract language from className "language-xyz"
            const match = /language-(\w+)/.exec(className);
            const language = match ? match[1] : "text";
            const code = extractText(codeProps.children);

            validSnippets.push({
              language,
              code,
              element: child // Keep original element for rendering if needed, or we reproduce it
            });
          }
        }
      }
    });

    setSnippets(validSnippets);

    // Set initial active language based on localStorage or default to first
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (validSnippets.length > 0) {
      if (savedLang && validSnippets.some(s => s.language === savedLang)) {
        setActiveLang(savedLang);
      } else {
        setActiveLang(validSnippets[0].language);
      }
    }
  }, [children]);

  const handleLangChange = (lang: string) => {
    setActiveLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const activeSnippet = snippets.find(s => s.language === activeLang) || snippets[0];

  const handleCopy = async () => {
    if (!activeSnippet) return;
    try {
      await navigator.clipboard.writeText(activeSnippet.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const getLangName = (lang: string) => {
    const map: Record<string, string> = {
      cpp: "C++",
      java: "Java",
      python: "Python",
      py: "Python",
      js: "JavaScript",
      javascript: "JavaScript",
      ts: "TypeScript",
      typescript: "TypeScript",
      c: "C",
      cs: "C#",
      csharp: "C#",
      go: "Go",
      rust: "Rust",
      sql: "SQL",
      swift: "Swift",
      kotlin: "Kotlin"
    };
    return map[lang.toLowerCase()] || lang.toUpperCase();
  };

  // Syntax highlighting
  const HighlightedCode = ({ code, language }: { code: string, language: string }) => {
    // In a real implementation with shiki, we would perform async highlighting.
    // With highlight.js in client, we can do:
  const highlighted = hljs.highlightAuto(code, [language]).value;

    return (
       <code
         className={`language-${language} bg-transparent !p-0 !m-0 border-none shadow-none font-mono text-sm leading-relaxed`}
         style={{ backgroundColor: 'transparent' }}
         dangerouslySetInnerHTML={{ __html: highlighted }}
       />
    );
  };

  if (snippets.length === 0) return null;

  const Container = isFullscreen ? motion.div : "div";
  const containerProps = isFullscreen ? {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    className: "fixed inset-0 z-[100] bg-[#1e1e1e] flex flex-col p-4 md:p-8 overflow-hidden font-sans"
  } : {
    className: "w-full rounded-xl overflow-hidden bg-[#1e1e1e] border border-gray-800 my-8 shadow-xl font-sans"
  };

  return (
    <AnimatePresence>
      {/* @ts-ignore - dynamic component handling */}
      <Container {...containerProps}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#252526] px-2 border-b border-gray-800">
           <div className="flex items-center overflow-hidden">
              <span className="text-gray-400 font-bold text-xs uppercase tracking-wider px-4 py-3 hidden md:block border-r border-gray-800 mr-2">{title}</span>

              {/* Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar mask-gradient-right">
                {snippets.map((snippet) => (
                   <button
                     key={snippet.language}
                     onClick={() => handleLangChange(snippet.language)}
                     className={`
                       relative px-4 py-3 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap outline-none
                       ${activeLang === snippet.language
                         ? 'text-orange-500 bg-[#1e1e1e]'
                         : 'text-gray-500 hover:text-gray-300 hover:bg-[#2a2a2b]'}
                     `}
                   >
                     {getLangName(snippet.language)}
                     {activeLang === snippet.language && (
                       <motion.div
                         layoutId={`underline-${title}`}
                         className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500"
                       />
                     )}
                   </button>
                ))}
              </div>
           </div>

           {/* Actions */}
           <div className="flex items-center gap-1 py-1 pr-2 md:py-0 self-end md:self-auto bg-[#252526] pl-2 shadow-[-10px_0_10px_#252526]">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-500 hover:text-white hover:bg-[#333] rounded-md transition-colors"
                title="Copy code"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-gray-500 hover:text-white hover:bg-[#333] rounded-md transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
           </div>
        </div>

        {/* Code Area */}
        <div className={`
          relative bg-[#1e1e1e] overflow-auto custom-scrollbar group
          ${isFullscreen ? 'flex-1 p-8' : 'p-6 max-h-[600px]'}
        `}>
          <pre className="!bg-transparent !p-0 !m-0 !border-0 font-mono text-[13px] md:text-sm leading-7 text-gray-300 font-medium">
             <HighlightedCode code={activeSnippet.code} language={activeSnippet.language} />
          </pre>
        </div>
      </Container>
    </AnimatePresence>
  );
}
