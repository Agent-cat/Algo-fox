import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

interface MarkdownProps {
  content: string;
  className?: string;
  isOption?: boolean;
}

export function Markdown({ content, className = "", isOption = false }: MarkdownProps) {
  return (
    <div className={`
      prose dark:prose-invert max-w-none
      prose-p:leading-relaxed
      prose-pre:bg-[#1a1a1a] prose-pre:border prose-pre:border-[#2a2a2a]
      prose-code:before:content-none prose-code:after:content-none
      ${isOption
        ? "prose-code:text-white prose-code:bg-white/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-black"
        : "prose-code:text-orange-500 dark:prose-code:text-orange-400 prose-code:bg-orange-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md"
      }
      prose-code:before:hidden prose-code:after:hidden
      ${className}
    `}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
