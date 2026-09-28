"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Check, Save, Image as ImageIcon, Clock, Settings, FileText } from "lucide-react";
import { toast } from "sonner";
import { MarkdownTextarea } from "@/components/quiz/teacher/MarkdownTextarea";
import Link from "next/link";

interface ClassroomOption {
  id: string;
  name: string;
  studentCount: number;
}

interface QuestionDraft {
  text: string;
  options: string[];
  correctOption: number;
  timeLimit: number;
  isMultiSelect?: boolean;
  type?: "quiz" | "true_false";
  correctOptions?: number[];
}

function defaultQuestion(): QuestionDraft {
  return { text: "", options: ["", "", "", ""], correctOption: 0, correctOptions: [0], timeLimit: 20, isMultiSelect: false, type: "quiz" };
}

const OPTION_COLORS = [
  "bg-red-500",    // Kahoot Red (Triangle)
  "bg-blue-500",   // Kahoot Blue (Diamond)
  "bg-yellow-500", // Kahoot Yellow (Circle)
  "bg-green-500",  // Kahoot Green (Square)
];

const OPTION_LABELS = ["A", "B", "C", "D"];

interface Template {
  id: string;
  title: string;
  description: string | null;
  questions: QuestionDraft[];
}

interface Props {
  classrooms: ClassroomOption[];
  initialTemplate?: Template;
}

export function QuizCreateForm({ classrooms, initialTemplate }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTemplate?.title || "");
  const [description, setDescription] = useState(initialTemplate?.description || "");
  const [questions, setQuestions] = useState<QuestionDraft[]>(
    initialTemplate?.questions?.length ? initialTemplate.questions : [defaultQuestion()]
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  
  // AI Form State
  const [aiTopic, setAiTopic] = useState("");
  const [aiLang, setAiLang] = useState("English");
  const [aiLevel, setAiLevel] = useState("Intermediate");
  const [aiNum, setAiNum] = useState(5);
  const [aiFile, setAiFile] = useState<File | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Drag and Drop State
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null);
      setDraggedIndex(null);
      return;
    }

    const newQuestions = [...questions];
    const [draggedQ] = newQuestions.splice(draggedIndex, 1);
    newQuestions.splice(dropIndex, 0, draggedQ);
    
    setQuestions(newQuestions);
    
    if (activeIndex === draggedIndex) setActiveIndex(dropIndex);
    else if (activeIndex > draggedIndex && activeIndex <= dropIndex) setActiveIndex(activeIndex - 1);
    else if (activeIndex < draggedIndex && activeIndex >= dropIndex) setActiveIndex(activeIndex + 1);

    setDragOverIndex(null);
    setDraggedIndex(null);
  };

  const activeQuestion = questions[activeIndex] || defaultQuestion();

  const updateActiveQuestion = (patch: Partial<QuestionDraft>) => {
    setQuestions(prev => prev.map((q, i) => i === activeIndex ? { ...q, ...patch } : q));
  };

  const updateOption = (oi: number, value: string) => {
    const newOptions = [...activeQuestion.options];
    newOptions[oi] = value;
    updateActiveQuestion({ options: newOptions });
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, defaultQuestion()]);
    setActiveIndex(questions.length);
  };

  const removeQuestion = (i: number) => {
    if (questions.length <= 1) return;
    setQuestions(prev => prev.filter((_, idx) => idx !== i));
    if (activeIndex >= i && activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const duplicateQuestion = (i: number) => {
    const qToDup = questions[i];
    setQuestions(prev => {
      const newArr = [...prev];
      newArr.splice(i + 1, 0, { ...qToDup });
      return newArr;
    });
    setActiveIndex(i + 1);
  };

  const uploadMedia = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    return data.url;
  };

  const generateWithAI = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    try {
      const formData = new FormData();
      if (aiTopic) formData.append("topic", aiTopic);
      if (aiLang) formData.append("language", aiLang);
      if (aiLevel) formData.append("skillLevel", aiLevel);
      formData.append("numQuestions", aiNum.toString());
      if (aiFile) formData.append("file", aiFile);

      const res = await fetch("/api/generate-quiz", { method: "POST", body: formData });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Generation failed");
      
      if (data.questions && Array.isArray(data.questions)) {
        const newQs = data.questions.map((q: any) => ({
          text: q.text || "",
          options: q.options || ["", "", "", ""],
          correctOption: q.correctOption || 0,
          timeLimit: q.timeLimit || 20,
          isMultiSelect: false
        }));
        setQuestions(prev => [...prev, ...newQs]);
        toast.success(`Generated ${newQs.length} questions!`);
        setShowAIModal(false);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to generate AI questions");
    } finally {
      setAiLoading(false);
    }
  };

  const validate = () => {
    if (!title.trim()) return "Quiz title is required";
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) return `Question ${i + 1}: text is required`;
      if (q.options.some((o) => !o.trim())) return `Question ${i + 1}: all options must be filled`;
      if (q.correctOption >= q.options.length) return `Question ${i + 1}: invalid correct option`;
    }
    return null;
  };

  const saveTemplate = async () => {
    const err = validate();
    if (err) { toast.error(err); return; }

    setLoading(true);
    try {
      const url = initialTemplate ? `/api/quiz-template/${initialTemplate.id}` : "/api/quiz-template";
      const method = initialTemplate ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          questions,
        }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Failed to save quiz"); return; }
      toast.success(initialTemplate ? "Quiz template updated!" : "Quiz template saved!");
      router.push("/dashboard/teacher/quiz");
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f2f2f2] dark:bg-[#1D1E23] overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-[#24262C] border-b border-gray-200 dark:border-[#222] px-5 flex items-center justify-between shrink-0 z-10 shadow-sm">
        <div className="flex items-center gap-5">
          <Link href="/dashboard/teacher/quiz" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium">
            ← Back
          </Link>
          <div className="h-6 w-px bg-gray-200 dark:bg-[#333]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Quiz Title</span>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className={`text-lg font-black bg-transparent border-b-2 focus:outline-none text-gray-900 dark:text-white px-0 py-0.5 min-w-[250px] transition-all placeholder:text-gray-300 dark:placeholder:text-gray-600 ${!title.trim() ? "border-red-300 dark:border-red-500/50 focus:border-red-500" : "border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-orange-500"}`}
              placeholder="Enter quiz title..."
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{questions.length} question{questions.length !== 1 ? "s" : ""}</span>
          <button
            onClick={saveTemplate}
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm shadow-orange-500/25 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Question List */}
        <div className="w-48 lg:w-60 bg-white dark:bg-[#24262C] border-r border-gray-200 dark:border-[#222] flex flex-col shrink-0 shadow-sm z-10">
          <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
            {questions.map((q, i) => (
              <div 
                key={i}
                draggable
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, i)}
                onClick={() => setActiveIndex(i)}
                className={`relative group rounded-lg p-2 cursor-pointer transition-all border-2 
                  ${activeIndex === i ? "border-orange-500 bg-orange-50 dark:bg-orange-500/10" : "border-transparent hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"}
                  ${draggedIndex === i ? "opacity-50 border-dashed" : ""}
                  ${dragOverIndex === i && draggedIndex !== i ? "border-t-4 border-t-orange-500" : ""}
                `}
              >
                <div className="text-[10px] font-black text-gray-500 mb-1 flex justify-between">
                  <span>{i + 1} Quiz</span>
                  <button onClick={(e) => { e.stopPropagation(); duplicateQuestion(i); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-orange-500" title="Duplicate">
                    <FileText className="w-3.5 h-3.5" />
                  </button>
                  {questions.length > 1 && (
                    <button onClick={(e) => { e.stopPropagation(); removeQuestion(i); }} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="aspect-video bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded overflow-hidden flex flex-col justify-between p-1.5 shadow-sm">
                  <div className="text-[8px] text-center text-gray-600 truncate">{q.text || "Question"}</div>
                  <div className="flex items-center justify-center text-gray-300">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="grid grid-cols-2 gap-0.5 mt-auto">
                    {[0,1,2,3].map(optI => (
                      <div key={optI} className={`h-1.5 rounded-sm ${q.correctOption === optI ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 dark:border-[#222] bg-white dark:bg-[#24262C] space-y-2">
            <button
              onClick={addQuestion}
              className="w-full py-2 bg-white dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-200 rounded-md font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add question
            </button>
            <button
              onClick={() => setShowAIModal(true)}
              className="w-full py-2 bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-md font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              Create with AI
            </button>
          </div>
        </div>

        {/* Center Panel - Active Question Editor */}
        <div className="flex-1 bg-[#f2f2f2] dark:bg-[#121317] overflow-y-auto p-6 sm:p-10 flex flex-col items-center custom-scrollbar relative">
          
          <div className="w-full max-w-3xl flex flex-col gap-8">
            {/* Question Section */}
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Question {activeIndex + 1}</span>
              </div>
              <MarkdownTextarea
                value={activeQuestion.text}
                onChange={(text) => updateActiveQuestion({ text })}
                placeholder="Type your question here..."
                rows={8}
                className="w-full"
                onImageUpload={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.onchange = async (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (!file) return;
                    const toastId = toast.loading("Uploading image...");
                    try {
                      const url = await uploadMedia(file);
                      updateActiveQuestion({ text: activeQuestion.text + "\n![Image](" + url + ")" });
                      toast.success("Image uploaded", { id: toastId });
                    } catch {
                      toast.error("Failed to upload image", { id: toastId });
                    }
                  };
                  input.click();
                }}
              />
            </div>

            {/* Options Section */}
            <div className="w-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-bold text-gray-500 dark:text-gray-400">Answer Options</span>
                <span className="text-[10px] font-bold text-gray-300 dark:text-gray-600 ml-auto">
                  {activeQuestion.isMultiSelect ? "Click multiple to select" : "Click a letter to mark correct"}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {activeQuestion.options.map((opt, oi) => {
                  const isSelected = activeQuestion.isMultiSelect 
                    ? activeQuestion.correctOptions?.includes(oi) 
                    : activeQuestion.correctOption === oi;

                  return (
                  <div key={oi} className="flex items-start gap-3">
                    {/* Option Label */}
                    <button
                      onClick={() => {
                        if (activeQuestion.isMultiSelect) {
                          const curr = activeQuestion.correctOptions || [];
                          const next = curr.includes(oi) ? curr.filter(x => x !== oi) : [...curr, oi];
                          updateActiveQuestion({ correctOptions: next, correctOption: next[0] ?? 0 });
                        } else {
                          updateActiveQuestion({ correctOption: oi, correctOptions: [oi] });
                        }
                      }}
                      className={`mt-1.5 w-9 h-9 rounded-lg flex items-center justify-center text-sm font-black shrink-0 transition-all border-2 ${
                        isSelected
                          ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-500/25"
                          : "bg-white dark:bg-[#24262C] border-gray-200 dark:border-[#444] text-gray-400 dark:text-gray-500 hover:border-green-400 dark:hover:border-green-500 hover:text-green-500"
                      }`}
                      title="Mark as correct answer"
                    >
                      {OPTION_LABELS[oi]}
                    </button>

                    {/* Option Input */}
                    <div className="flex-1">
                      <MarkdownTextarea
                        value={opt}
                        onChange={(val) => updateOption(oi, val)}
                        placeholder={`Option ${OPTION_LABELS[oi]}`}
                        rows={3}
                        isOption
                        onImageUpload={() => {
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = async (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (!file) return;
                            const toastId = toast.loading("Uploading image...");
                            try {
                              const url = await uploadMedia(file);
                              updateOption(oi, activeQuestion.options[oi] + "\n![Image](" + url + ")");
                              toast.success("Image uploaded", { id: toastId });
                            } catch {
                              toast.error("Failed to upload image", { id: toastId });
                            }
                          };
                          input.click();
                        }}
                      />
                    </div>
                  </div>
                );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-56 lg:w-72 bg-white dark:bg-[#24262C] border-l border-gray-200 dark:border-[#222] flex flex-col shrink-0 shadow-sm z-10 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-2">
              <Settings className="w-3.5 h-3.5" /> Question type
            </div>
            <select
              value={activeQuestion.type || "quiz"}
              onChange={(e) => {
                const newType = e.target.value as "quiz" | "true_false";
                if (newType === "true_false") {
                  updateActiveQuestion({ type: newType, options: ["True", "False"], correctOption: Math.min(activeQuestion.correctOption, 1) });
                } else {
                  updateActiveQuestion({ type: newType, options: ["", "", "", ""] });
                }
              }}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="quiz">Quiz</option>
              <option value="true_false">True or false</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-2">
              <Clock className="w-3.5 h-3.5" /> Time limit
            </div>
            <select 
              value={activeQuestion.timeLimit}
              onChange={(e) => updateActiveQuestion({ timeLimit: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="5">5 seconds</option>
              <option value="10">10 seconds</option>
              <option value="20">20 seconds</option>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="120">2 minutes</option>
            </select>
            <button className="text-[10px] text-gray-400 mt-1 underline hover:text-gray-600">Apply to all questions</button>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 mb-2">
              <Check className="w-3.5 h-3.5" /> Answer options
            </div>
            <select 
              value={activeQuestion.isMultiSelect ? "multi" : "single"}
              onChange={(e) => updateActiveQuestion({ isMultiSelect: e.target.value === "multi" })}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="single">Single select</option>
              <option value="multi">Multi-select (Premium)</option>
            </select>
          </div>
          
          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-[#222]">
            <div className="flex items-center gap-2 justify-between">
               <button onClick={() => removeQuestion(activeIndex)} className="text-sm font-bold text-gray-500 hover:text-red-500">Delete</button>
               <button onClick={() => duplicateQuestion(activeIndex)} className="text-sm font-bold bg-gray-100 dark:bg-[#333] px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#444]">Duplicate</button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Generate Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#24262C] rounded-md max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 dark:border-[#333]">
            <button onClick={() => setShowAIModal(false)} className="absolute top-4 right-4 text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white bg-gray-100 hover:bg-gray-200 dark:bg-[#333] dark:hover:bg-[#444] px-2 py-1 rounded">
              CLOSE
            </button>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Create with AI</h2>
            </div>
            
            <form onSubmit={generateWithAI} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Topic or Context</label>
                <textarea
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  placeholder="E.g. Binary Search Trees, React Hooks..."
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Or Upload PDF Document</label>
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={e => setAiFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100 dark:file:bg-orange-500/10 dark:file:text-orange-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Language</label>
                  <select value={aiLang} onChange={e => setAiLang(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500">
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Skill Level</label>
                  <select value={aiLevel} onChange={e => setAiLevel(e.target.value)} className="w-full px-3 py-2 bg-gray-50 dark:bg-[#1D1E23] border border-gray-200 dark:border-[#333] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-orange-500">
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Number of Questions: {aiNum}</label>
                <input type="range" min="1" max="20" value={aiNum} onChange={e => setAiNum(parseInt(e.target.value))} className="w-full accent-orange-500" />
              </div>

              <button
                type="submit"
                disabled={aiLoading || (!aiTopic && !aiFile)}
                className="w-full py-3 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 rounded-md font-bold text-sm shadow-sm transition-all mt-4 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {aiLoading ? <span className="animate-pulse">Generating...</span> : <span>Generate Questions</span>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inline styles for custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
      `}} />
    </div>
  );
}
