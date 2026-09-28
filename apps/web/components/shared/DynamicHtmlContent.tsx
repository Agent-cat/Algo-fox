"use client";

import React, { useEffect, useRef } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkDirective from "remark-directive";
import rehypeRaw from "rehype-raw";
import SolutionCodeGroup from "@/components/markdown/SolutionCodeGroup";
import { remarkSolutionDirective } from "@/lib/markdown-plugins";
import { preprocessMarkdown } from "@/lib/markdown-utils";

interface DynamicHtmlContentProps {
  content: string;
  className?: string;
  isMarkdown?: boolean;
}

export function DynamicHtmlContent({ content, className = "", isMarkdown = true }: DynamicHtmlContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scripts = Array.from(container.querySelectorAll("script"));

    if (scripts.length === 0) return;

    // Scope inline scripts in an IIFE/block to avoid "SyntaxError: redeclaration of const/let"
    // when React re-renders or updates the preview tab.
    const wrapInScope = (code: string) => {
      return `{\n${code}\n}`;
    };

    const loadScript = (oldScript: HTMLScriptElement): Promise<void> => {
      return new Promise((resolve) => {
        const newScript = document.createElement("script");

        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });

        if (oldScript.src) {
          newScript.onload = () => resolve();
          newScript.onerror = () => resolve();
          oldScript.parentNode?.replaceChild(newScript, oldScript);
        } else {
          newScript.textContent = wrapInScope(oldScript.textContent || "");
          oldScript.parentNode?.replaceChild(newScript, oldScript);
          resolve();
        }
      });
    };

    (async () => {
      for (const script of scripts) {
        await loadScript(script);
      }
    })();
  }, [content]);

  if (!isMarkdown) {
    return (
      <div
        ref={containerRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,
          remarkBreaks,
          remarkDirective,
          remarkSolutionDirective,
        ]}
        rehypePlugins={[rehypeRaw]}
        components={{
          "solution-group": SolutionCodeGroup,
          table: ({ children }) => (
            <table className="my-6 w-full border-collapse text-sm border border-gray-200 dark:border-[#262626] rounded-xl overflow-hidden">
              {children}
            </table>
          ),
          thead: ({ children, ...props }) => (
            <thead
              className="bg-gray-100/40 dark:bg-white/2 border-b border-gray-200/60 dark:border-[#262626] font-mono"
              {...props}
            >
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-6 py-4 font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest text-[11px] font-mono align-middle border border-gray-200 dark:border-[#262626]"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="px-6 py-4 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#262626] tabular-nums font-mono text-[13px] align-middle"
              {...props}
            >
              {children}
            </td>
          ),
          tr: ({ children, ...props }) => (
            <tr
              className="hover:bg-gray-50/50 dark:hover:bg-white/2 transition-colors duration-150"
              {...props}
            >
              {children}
            </tr>
          ),
        } as Components}
      >
        {preprocessMarkdown(content)}
      </ReactMarkdown>
    </div>
  );
}
