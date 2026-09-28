import React, { useState, useRef, useEffect } from "react";
import { Plus, Trash2, Eye, Code2, Edit3, Save, Loader2, List, BadgeCheck, Image as ImageIcon } from "lucide-react";
import { MarkdownPreview } from "./ProblemForm";
import AnimationPlayer from "@/components/workspace/AnimationPlayer";

function parseSolutions(markdown: string) {
    if (!markdown) {
        return [{
            id: Math.random().toString(36).substr(2, 9),
            title: "Optimal Solution",
            animation: "",
            content: "```cpp\n// C++ Solution\n```\n\n```python\n# Python Solution\n```\n\n```java\n// Java Solution\n```"
        }];
    }
    const regex = /:::solution\{(?:title="((?:[^"\\]|\\.)*)")?(?:\s*animation="((?:[^"\\]|\\.)*)")?[\s\S]*?\}([\s\S]*?):::/g;
    const results = [];
    let match;
    while ((match = regex.exec(markdown)) !== null) {
        results.push({
            id: Math.random().toString(36).substr(2, 9),
            title: (match[1] || "Solution").replace(/\\"/g, '"'),
            animation: match[2] ? match[2].replace(/\\"/g, '"') : "",
            content: match[3].trim()
        });
    }
    if (results.length === 0 && markdown.trim()) {
        results.push({
            id: Math.random().toString(36).substr(2, 9),
            title: "Optimal Solution",
            animation: "",
            content: markdown.trim()
        });
    }
    return results.length > 0 ? results : [{
        id: Math.random().toString(36).substr(2, 9),
        title: "Optimal Solution",
        animation: "",
        content: ""
    }];
}

function serializeSolutions(solutions: { title: string; animation?: string; content: string }[]) {
    if (solutions.length === 0) return "";
    return solutions.map(s => {
        const escapedTitle = s.title.replace(/"/g, '\\"');
        const animationAttr = s.animation && s.animation.trim() ? ` animation="${s.animation.replace(/"/g, '\\"')}"` : "";
        return `:::solution{title="${escapedTitle}"${animationAttr}}\n\n${s.content}\n\n:::`;
    }).join("\n\n");
}

interface SolutionsEditorProps {
    value: string;
    onChange: (value: string) => void;
    onSave?: () => void;
    isSaving?: boolean;
    onImageUpload?: (file: File) => Promise<string | null>;
}

export default function SolutionsEditor({ value, onChange, onSave, isSaving, onImageUpload }: SolutionsEditorProps) {
    const [solutionsList, setSolutionsList] = useState<{ id: string, title: string, animation?: string, content: string }[]>(() => parseSolutions(value));
    const [activeSolutionId, setActiveSolutionId] = useState<string>(solutionsList[0]?.id || "");
    const [editingSolutionId, setEditingSolutionId] = useState<string | null>(null);
    const [newSolutionTitle, setNewSolutionTitle] = useState("");
    const [isAddingSolution, setIsAddingSolution] = useState(false);
    const [solutionPreview, setSolutionPreview] = useState(false);
    const [showAnimationEditor, setShowAnimationEditor] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // Tracks when WE triggered an onChange so useEffect doesn't re-parse our own updates
    const isInternalUpdateRef = useRef(false);

    // Re-initialize when the parent loads async data
    useEffect(() => {
        if (isInternalUpdateRef.current) {
            isInternalUpdateRef.current = false;
            return;
        }
        const parsed = parseSolutions(value);
        setSolutionsList(parsed);
        setActiveSolutionId(parsed[0]?.id || "");
    }, [value]);

    const updateParent = (newList: { id: string, title: string, animation?: string, content: string }[]) => {
        isInternalUpdateRef.current = true;
        onChange(serializeSolutions(newList));
    };

    const handleSwitchSolution = (newId: string) => {
        if (newId === activeSolutionId) return;
        setActiveSolutionId(newId);
        setSolutionPreview(false);
    };

    const handleAddSolution = () => {
        const id = Math.random().toString(36).substr(2, 9);
        const newSolution = { id, title: newSolutionTitle || `Solution ${solutionsList.length + 1}`, animation: "", content: "" };
        const newList = [...solutionsList, newSolution];
        setSolutionsList(newList);
        updateParent(newList);
        setActiveSolutionId(id);
        setNewSolutionTitle("");
        setIsAddingSolution(false);
    };

    const handleSaveTitle = (id: string) => {
        const newList = solutionsList.map(s => s.id === id ? { ...s, title: newSolutionTitle || s.title } : s);
        setSolutionsList(newList);
        updateParent(newList);
        setEditingSolutionId(null);
    };

    const handleDeleteSolution = (id: string) => {
        if (solutionsList.length <= 1) return;
        const remaining = solutionsList.filter(s => s.id !== id);
        setSolutionsList(remaining);
        updateParent(remaining);
        if (activeSolutionId === id) {
            setActiveSolutionId(remaining[0].id);
        }
    };

    const updateActiveContent = (newContent: string) => {
        const newList = solutionsList.map(s => s.id === activeSolutionId ? { ...s, content: newContent } : s);
        setSolutionsList(newList);
        updateParent(newList);
    };

    const updateActiveAnimation = (newAnimation: string) => {
        const newList = solutionsList.map(s => s.id === activeSolutionId ? { ...s, animation: newAnimation } : s);
        setSolutionsList(newList);
        updateParent(newList);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateActiveContent(e.target.value);
    };

    const handleSolutionKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.currentTarget.selectionStart;
            const end = e.currentTarget.selectionEnd;
            const currentContent = e.currentTarget.value;
            const newContent = currentContent.substring(0, start) + "    " + currentContent.substring(end);
            
            updateActiveContent(newContent);
            
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
                }
            }, 0);
        }
    };

    const insertMarkdown = (type: string) => {
        if (!textareaRef.current) return;
        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const activeContent = solutionsList.find(s => s.id === activeSolutionId)?.content || "";
        const selectedText = activeContent.substring(start, end);
        
        let prefix = "";
        let suffix = "";
        let defaultText = selectedText;

        switch (type) {
            case "bold": prefix = "**"; suffix = "**"; defaultText = defaultText || "bold text"; break;
            case "italic": prefix = "*"; suffix = "*"; defaultText = defaultText || "italic text"; break;
            case "h2": prefix = "\n## "; suffix = ""; defaultText = defaultText || "Heading"; break;
            case "h3": prefix = "\n### "; suffix = ""; defaultText = defaultText || "Heading"; break;
            case "list": prefix = "\n- "; suffix = ""; defaultText = defaultText || "List item"; break;
            case "code": prefix = "\n```\n"; suffix = "\n```\n"; defaultText = defaultText || "code block"; break;
            case "link": prefix = "["; suffix = "](url)"; defaultText = defaultText || "link text"; break;
            case "solution-template":
                prefix = "\n# Approach\n\nExplain the solution approach...\n\n## Algorithm\n1. Step one\n2. Step two\n\n## Complexity\n- **Time:** O(n)\n- **Space:** O(1)\n\n```python\ndef solve(nums):\n    pass\n```\n";
                suffix = "";
                defaultText = "";
                break;
        }

        const newValue = activeContent.substring(0, start) + prefix + defaultText + suffix + activeContent.substring(end);
        updateActiveContent(newValue);

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.selectionStart = start + prefix.length;
                textareaRef.current.selectionEnd = start + prefix.length + defaultText.length;
            }
        }, 0);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !onImageUpload) return;
        setIsUploading(true);
        try {
            const url = await onImageUpload(file);
            if (url) {
                const markdownImage = `\n![${file.name}](${url})\n`;
                const activeContent = solutionsList.find(s => s.id === activeSolutionId)?.content || "";
                updateActiveContent(activeContent + markdownImage);
            }
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const activeSolution = solutionsList.find(s => s.id === activeSolutionId);
    const activeContent = activeSolution?.content || "";
    const activeAnimation = activeSolution?.animation || "";

    return (
        <div className="border border-gray-200 dark:border-[#333] rounded-xl overflow-hidden shadow-sm bg-white dark:bg-[#111]">
            {/* Header with Solution Tabs & Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-3 border-b border-gray-200 dark:border-[#333] bg-gray-50/80 dark:bg-[#1D1E23]">
                <div className="flex items-center gap-3 overflow-x-auto pb-1 custom-scrollbar flex-1">
                    {/* Solution Counter Badge */}
                    <div className="px-2.5 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0 border border-orange-500/20">
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        {solutionsList.length} {solutionsList.length === 1 ? "Solution" : "Solutions"}
                    </div>

                    {solutionsList.map((sol, index) => (
                        <div key={sol.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-bold transition-all flex-shrink-0 ${activeSolutionId === sol.id ? 'border-orange-500 bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 shadow-sm' : 'border-gray-200 bg-white text-gray-600 dark:bg-[#1a1a1a] dark:text-gray-400 dark:border-[#333] hover:bg-gray-50 cursor-pointer'}`}>
                            <span className="text-[10px] opacity-50 font-mono">#{index + 1}</span>
                            {editingSolutionId === sol.id ? (
                                <input
                                    autoFocus
                                    value={newSolutionTitle}
                                    onChange={e => setNewSolutionTitle(e.target.value)}
                                    onBlur={() => handleSaveTitle(sol.id)}
                                    onKeyDown={e => e.key === 'Enter' && handleSaveTitle(sol.id)}
                                    className="bg-transparent outline-none border-b border-orange-500 w-24 text-orange-600"
                                />
                            ) : (
                                <button type="button" onClick={() => handleSwitchSolution(sol.id)} className="flex items-center gap-1.5">
                                    {sol.title}
                                    {sol.animation && (
                                        <span className="w-2 h-2 rounded-full bg-blue-500" title="Has custom animation" />
                                    )}
                                </button>
                            )}

                            {activeSolutionId === sol.id && editingSolutionId !== sol.id && (
                                <div className="flex items-center gap-1 ml-2 border-l pl-2 border-orange-200 dark:border-orange-500/30">
                                    <button type="button" onClick={() => { setEditingSolutionId(sol.id); setNewSolutionTitle(sol.title); }} className="text-orange-400 hover:text-orange-600">
                                        <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    {solutionsList.length > 1 && (
                                        <button type="button" onClick={() => handleDeleteSolution(sol.id)} className="text-orange-400 hover:text-red-500">
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}

                    {isAddingSolution ? (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-orange-500 bg-white dark:bg-[#111] flex-shrink-0">
                            <input
                                autoFocus
                                value={newSolutionTitle}
                                onChange={e => setNewSolutionTitle(e.target.value)}
                                onBlur={handleAddSolution}
                                onKeyDown={e => e.key === 'Enter' && handleAddSolution()}
                                className="bg-transparent outline-none text-sm font-bold text-gray-700 dark:text-gray-200 w-28"
                                placeholder={`Solution ${solutionsList.length + 1}...`}
                            />
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => { setIsAddingSolution(true); setNewSolutionTitle(""); }}
                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 border border-dashed border-gray-300 dark:border-[#444] rounded-lg hover:border-gray-400 dark:hover:border-gray-300 transition-all flex-shrink-0"
                        >
                            <Plus className="w-3.5 h-3.5" /> Add Solution
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        type="button"
                        onClick={() => setShowAnimationEditor(!showAnimationEditor)}
                        className={`px-3 py-1.5 text-xs font-bold border rounded-lg shadow-sm transition-colors flex items-center gap-1.5 ${
                            showAnimationEditor || activeAnimation
                                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/30"
                                : "bg-white dark:bg-[#222] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#444] hover:bg-gray-50"
                        }`}
                    >
                        <span className="text-sm">✨</span> Solution Animation {activeAnimation ? "(Configured)" : ""}
                    </button>
                    <button
                        type="button"
                        onClick={() => setSolutionPreview(!solutionPreview)}
                        className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#222] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#444] rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-[#333] transition-colors flex items-center gap-2"
                    >
                        {solutionPreview ? <><Code2 className="w-3.5 h-3.5" /> Edit</> : <><Eye className="w-3.5 h-3.5" /> Preview</>}
                    </button>
                    {onSave && (
                        <button
                            type="button"
                            onClick={onSave}
                            disabled={isSaving}
                            className="px-3 py-1.5 text-xs font-bold bg-orange-500 text-white border border-orange-600 rounded-lg shadow-sm hover:bg-orange-600 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save Solution
                        </button>
                    )}
                </div>
            </div>

            {/* Animation Config Panel for Active Solution */}
            {showAnimationEditor && (
                <div className="p-4 bg-blue-50/40 dark:bg-blue-500/5 border-b border-blue-100 dark:border-blue-500/10 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                                <span>✨</span> Custom Animation for "{activeSolution?.title}"
                            </h4>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                Add an animation JSON script specific to this solution. If empty, the default problem animation is used.
                            </p>
                        </div>
                        {activeAnimation && (
                            <button
                                type="button"
                                onClick={() => updateActiveAnimation("")}
                                className="text-xs text-red-500 hover:text-red-700 font-bold"
                            >
                                Clear Animation
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <textarea
                            value={activeAnimation}
                            onChange={(e) => updateActiveAnimation(e.target.value)}
                            rows={8}
                            placeholder={`{
  "title": "${activeSolution?.title} Animation",
  "steps": [
    {
      "id": 1,
      "caption": "Step 1...",
      "state": { "array": [1, 2, 3] }
    }
  ]
}`}
                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-[#333] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-mono text-xs text-gray-900 dark:text-gray-100 bg-white dark:bg-[#111] resize-none"
                        />
                        <div className="rounded-xl border border-gray-200 dark:border-[#333] bg-white dark:bg-[#111] p-3">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Live Animation Preview</div>
                            {activeAnimation ? (
                                <AnimationPlayer animationScript={activeAnimation} compact />
                            ) : (
                                <div className="h-40 flex items-center justify-center text-xs text-gray-400 italic border border-dashed border-gray-200 dark:border-[#333] rounded-lg">
                                    Paste animation JSON to preview solution animation
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1">
                {!solutionPreview ? (
                    <div>
                        {/* Enhanced Toolbar */}
                        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 dark:border-[#333] bg-gray-50 dark:bg-[#111]">
                            <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                <button type="button" onClick={() => insertMarkdown("bold")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bold"><span className="text-sm">B</span></button>
                                <button type="button" onClick={() => insertMarkdown("italic")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white italic hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Italic"><span className="text-sm">i</span></button>
                            </div>
                            <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                <button type="button" onClick={() => insertMarkdown("h2")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 2"><span className="text-xs">H2</span></button>
                                <button type="button" onClick={() => insertMarkdown("h3")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white font-bold hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Heading 3"><span className="text-xs">H3</span></button>
                            </div>
                            <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                <button type="button" onClick={() => insertMarkdown("list")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Bullet List">
                                    <List className="w-3.5 h-3.5" />
                                </button>
                                <button type="button" onClick={() => insertMarkdown("code")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Code Block">
                                    <Code2 className="w-3.5 h-3.5" />
                                </button>
                                <button type="button" onClick={() => insertMarkdown("solution-template")} className="px-2 h-8 flex items-center justify-center text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-bold hover:bg-orange-50 dark:hover:bg-orange-500/5 rounded-[2px] transition-colors gap-1.5" title="Insert Solution Template">
                                    <BadgeCheck className="w-3.5 h-3.5" />
                                    <span className="text-[10px] uppercase">Template</span>
                                </button>
                            </div>
                            <div className="flex bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-[3px] p-0.5">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors disabled:opacity-50"
                                    title="Upload Image"
                                >
                                    {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ImageIcon className="w-3.5 h-3.5" />}
                                </button>
                                <button type="button" onClick={() => insertMarkdown("link")} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-[#39424e] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#222] rounded-[2px] transition-colors" title="Insert Link">
                                    <Plus className="w-3.5 h-3.5 rotate-45" />
                                </button>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="relative">
                            <textarea
                                ref={textareaRef}
                                value={activeContent}
                                onChange={handleContentChange}
                                onKeyDown={handleSolutionKeyDown}
                                rows={28}
                                placeholder={"# Approach\n\nExplain the solution approach...\n\n## Algorithm\n1. Step one\n2. Step two\n\n## Complexity\n- **Time:** O(n)\n- **Space:** O(1)\n\n```python\ndef solve(nums):\n    pass\n```"}
                                className="w-full px-5 py-4 bg-white dark:bg-[#1D1E23] focus:outline-none transition-all font-mono text-[15px] leading-7 text-[#39424e] dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-700 resize-none min-h-[500px]"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="bg-[#f8f9fa] dark:bg-[#1D1E23] overflow-y-auto min-h-[500px] p-6 custom-scrollbar prose prose-slate dark:prose-invert max-w-none">
                        {/* Preview animation if present */}
                        {activeAnimation && (
                            <div className="mb-6 not-prose">
                                <AnimationPlayer animationScript={activeAnimation} compact />
                            </div>
                        )}
                        <MarkdownPreview content={activeContent} placeholder="Nothing to preview yet..." />
                    </div>
                )}
            </div>
        </div>
    );
}
