"use client";

import { useState, useRef, useEffect } from "react";
import { 
    Bold, Italic, Heading, List, ListOrdered, Code, 
    Image as ImageIcon, Link as LinkIcon, Quote, 
    X, Send, Sigma, Terminal, Eye, Edit3, Plus
} from "lucide-react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { toast } from "sonner";
import { postComment } from "@/actions/discussion";

interface SolutionFormProps {
    problemId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export function SolutionForm({ problemId, onSuccess, onCancel }: SolutionFormProps) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [content, setContent] = useState("# Intuition\n<!-- Describe your first thoughts on how to solve this problem. -->\n\n# Approach\n<!-- Describe your approach to solving the problem. -->\n\n# Complexity\n- Time complexity: \n<!-- Add your time complexity here, e.g. $$O(n)$$ -->\n\n- Space complexity: \n<!-- Add your space complexity here, e.g. $$O(n)$$ -->\n\n# Code\n```java\n\n```");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const insertText = (before: string, after: string = "") => {
        if (!textAreaRef.current) return;
        const start = textAreaRef.current.selectionStart;
        const end = textAreaRef.current.selectionEnd;
        const selectedText = content.substring(start, end);
        const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
        setContent(newText);
        
        // Reset focus and selection
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                const newPos = start + before.length + selectedText.length + after.length;
                textAreaRef.current.setSelectionRange(newPos, newPos);
            }
        }, 0);
    };

    const handleSubmit = async () => {
        if (!title.trim()) return toast.error("Title is required");
        if (!content.trim()) return toast.error("Content is required");

        setIsSubmitting(true);
        try {
            const res = await postComment(problemId, content, undefined, title, tags);
            if (res.success) {
                toast.success("Solution posted successfully!");
                onSuccess();
            } else {
                toast.error(res.error || "Failed to post solution");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-[#fafafa] dark:bg-[#121212] animate-in fade-in zoom-in-95 duration-300 z-50">
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-[#1e1e1e] bg-white dark:bg-[#121212]">
                <div className="flex-1 mr-8">
                    <input 
                        type="text" 
                        placeholder="Title of your solution..." 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-transparent text-3xl font-bold text-gray-900 dark:text-gray-100 outline-none placeholder:text-gray-300 dark:placeholder:text-gray-700 tracking-tight"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={onCancel}
                        className="px-5 py-2.5 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? "Posting..." : "Post Solution"}
                    </button>
                </div>
            </div>

            {/* TAGS */}
            <div className="flex items-center gap-4 p-4 px-6 border-b border-gray-200 dark:border-[#1e1e1e] bg-gray-50/50 dark:bg-[#0a0a0a]">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">
                    <Plus className="w-3 h-3" />
                    Tags
                </div>
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white dark:bg-[#1a1a1a] text-xs font-bold text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-[#262626] shadow-sm">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                    <input 
                        type="text" 
                        placeholder="Add tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        className="bg-transparent text-sm text-gray-600 dark:text-gray-400 outline-none min-w-[120px]"
                    />
                </div>
            </div>

            {/* TOOLBAR */}
            <div className="flex items-center gap-1 p-3 px-6 border-b border-gray-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111] overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-1 pr-4 border-r border-gray-200 dark:border-[#262626]">
                    <button onClick={() => insertText("# ", "")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Heading"><Heading className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("**", "**")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Bold"><Bold className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("*", "*")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Italic"><Italic className="w-4.5 h-4.5" /></button>
                </div>
                <div className="flex items-center gap-1 px-4 border-r border-gray-200 dark:border-[#262626]">
                    <button onClick={() => insertText("- ", "")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Bullet List"><List className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("1. ", "")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Numbered List"><ListOrdered className="w-4.5 h-4.5" /></button>
                </div>
                <div className="flex items-center gap-1 px-4 border-r border-gray-200 dark:border-[#262626]">
                    <button onClick={() => insertText("`", "`")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Inline Code"><Code className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("```\n", "\n```")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Code Block"><Terminal className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("$$", "$$")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Math"><Sigma className="w-4.5 h-4.5" /></button>
                </div>
                <div className="flex items-center gap-1 pl-4">
                    <button onClick={() => insertText("![alt text](url)", "")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Image"><ImageIcon className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("[text](url)", "")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Link"><LinkIcon className="w-4.5 h-4.5" /></button>
                    <button onClick={() => insertText("> ", "")} className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors text-gray-600 dark:text-gray-400" title="Quote"><Quote className="w-4.5 h-4.5" /></button>
                </div>
            </div>

            {/* EDITOR & PREVIEW SPLIT */}
            <div className="flex-1 flex overflow-hidden">
                {/* EDITOR */}
                <div className="flex-1 flex flex-col border-r border-gray-200 dark:border-[#1e1e1e]">
                    <div className="flex items-center gap-2 px-6 py-2 bg-gray-50/30 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#1e1e1e]">
                        <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Editor</span>
                    </div>
                    <textarea 
                        ref={textAreaRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your intuition, approach, complexity, and code here..."
                        className="flex-1 w-full p-8 bg-transparent resize-none outline-none font-mono text-base leading-relaxed text-gray-800 dark:text-gray-300 custom-scrollbar"
                    />
                </div>

                {/* PREVIEW */}
                <div className="flex-1 flex flex-col bg-white dark:bg-[#080808]">
                    <div className="flex items-center gap-2 px-6 py-2 bg-gray-50/30 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#1e1e1e]">
                        <Eye className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Preview</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 prose prose-slate dark:prose-invert max-w-none custom-scrollbar selection:bg-orange-500/20">
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                            {content}
                        </Markdown>
                    </div>
                </div>
            </div>
        </div>
    );
}
