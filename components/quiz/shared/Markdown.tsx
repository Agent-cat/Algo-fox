import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

interface MarkdownProps {
  content: string;
  className?: string;
  isOption?: boolean;
}

const HLJS_STYLE = `
  .hljs { display: block; overflow-x: auto; padding: 1em; }
  .hljs-keyword, .hljs-selector-tag, .hljs-literal, .hljs-section, .hljs-link { color: #ff7b72; }
  .hljs-function .hljs-keyword { color: #ff7b72; }
  .hljs-literal { color: #79c0ff; }
  .hljs-number { color: #79c0ff; }
  .hljs-string, .hljs-attribute { color: #a5d6ff; }
  .hljs-class .hljs-title, .hljs-title { color: #ffa657; }
  .hljs-type { color: #ffa657; }
  .hljs-variable, .hljs-template-variable { color: #ffa657; }
  .hljs-subst { color: #c9d1d9; }
  .hljs-comment, .hljs-quote { color: #8b949e; font-style: italic; }
  .hljs-doctag { color: #a5d6ff; }
  .hljs-meta, .hljs-meta .hljs-keyword { color: #79c0ff; }
  .hljs-meta .hljs-string { color: #a5d6ff; }
  .hljs-attr { color: #79c0ff; }
  .hljs-tag { color: #7ee787; }
  .hljs-name { color: #7ee787; }
  .hljs-regexp { color: #a5d6ff; }
  .hljs-symbol { color: #79c0ff; }
  .hljs-bullet { color: #f2cc60; }
  .hljs-built_in { color: #ffa657; }
  .hljs-addition { color: #aff5b4; background-color: #033a16; }
  .hljs-deletion { color: #ffdcd7; background-color: #67060c; }
`;

import { useEffect } from "react";

export function Markdown({ content, className = "", isOption = false }: MarkdownProps) {
  useEffect(() => {
    const styleId = "algofox-hljs-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = HLJS_STYLE;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className={`
      prose dark:prose-invert max-w-none
      prose-p:leading-relaxed
      prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10 prose-pre:rounded-xl
      prose-code:before:content-none prose-code:after:content-none
      ${isOption
        ? "prose-code:text-white prose-code:bg-white/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-black"
        : "prose-code:text-orange-500 dark:prose-code:text-orange-400 prose-code:bg-orange-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md"
      }
      prose-code:before:hidden prose-code:after:hidden
      ${className}
    `}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : null;

            if (!inline && language) {
              const codeString = String(children).replace(/\n$/, "");
              try {
                const highlighted = hljs.highlight(codeString, { language }).value;
                return (
                  <code
                    className={`${className} hljs bg-transparent p-0`}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                );
              } catch (e) {
                return <code className={className} {...props}>{children}</code>;
              }
            }

            // Fallback for auto-highlighting if language is not specified but it's a block
            if (!inline && !language) {
              const codeString = String(children).replace(/\n$/, "");
              try {
                const highlighted = hljs.highlightAuto(codeString).value;
                return (
                  <code
                    className="hljs bg-transparent p-0"
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                );
              } catch (e) {
                return <code className={className} {...props}>{children}</code>;
              }
            }

            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
