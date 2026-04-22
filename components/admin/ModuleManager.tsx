"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Plus,
    Trash2,
    GripVertical,
    ChevronDown,
    ChevronUp,
    Box,
    FilePlus,
    Loader2,
    BookOpen,
    Layout,
    Search,
    Check,
    MoreHorizontal,
    PlusCircle,
    Copy,
    Edit3,
    X
} from "lucide-react";
import { createModule, addProblemToModule, removeProblemFromModule, updateModule, deleteModule } from "@/actions/admin/course";
import { searchProblems } from "@/actions/problems";
import { toast } from "sonner";
import Link from "next/link";

export default function ModuleManager({ course }: any) {
    const router = useRouter();
    const [newModuleName, setNewModuleName] = useState("");
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [expandedModules, setExpandedModules] = useState<string[]>(course.modules.map((m: any) => m.id));
    const [submoduleInput, setSubmoduleInput] = useState<{ parentId: string, name: string } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [activeSearchModuleId, setActiveSearchModuleId] = useState<string | null>(null);

    // Edit states
    const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
    const [editingModuleName, setEditingModuleName] = useState("");
    const [isUpdatingModule, setIsUpdatingModule] = useState(false);

    // Build Module Tree
    const moduleTree = course.modules.reduce((acc: any[], current: any) => {
        if (!current.parentId) {
            acc.push({ ...current, children: course.modules.filter((m: any) => m.parentId === current.id) });
        }
        return acc;
    }, []);

    const toggleModule = (id: string) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
        );
    };

    const handleAddModule = async (parentId: string | null = null) => {
        const name = parentId ? submoduleInput?.name : newModuleName;
        if (!name?.trim()) {
            toast.error("Please enter a module name");
            return;
        }

        setIsAddingModule(true);
        try {
            await createModule(course.id, name, parentId);
            if (parentId) {
                setSubmoduleInput(null);
            } else {
                setNewModuleName("");
            }
            toast.success(parentId ? "Submodule added" : "Module added");
            router.refresh();
        } catch (error) {
            toast.error("Failed to create module");
             console.error(error);
        } finally {
            setIsAddingModule(false);
        }
    };

    const handleUpdateModule = async () => {
        if (!editingModuleId || !editingModuleName.trim()) return;

        setIsUpdatingModule(true);
        try {
            await updateModule(editingModuleId, editingModuleName);
            toast.success("Module updated");
            setEditingModuleId(null);
            router.refresh();
        } catch (error) {
            toast.error("Failed to update module");
        } finally {
            setIsUpdatingModule(false);
        }
    };

    const handleDeleteModule = async (moduleId: string, isSubmodule: boolean = false) => {
        if (!confirm(`Are you sure you want to delete this ${isSubmodule ? 'submodule' : 'module'}? All nested items will be removed.`)) return;

        try {
            await deleteModule(moduleId);
            toast.success(isSubmodule ? "Submodule deleted" : "Module deleted");
            router.refresh();
        } catch (error) {
            toast.error("Failed to delete module");
        }
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const results = await searchProblems(query, "LEARN", course.domain);
            setSearchResults(results.problems || []);
        } catch (error) {
             console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddExistingProblem = async (moduleId: string, problemId: string) => {
        try {
            await addProblemToModule(moduleId, problemId);
            toast.success("Problem added to module");
            router.refresh();
        } catch (error) {
            toast.error("Failed to add problem");
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Top Navigation & Add Module */}
            <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                            <Layout className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase">Curriculum Builder</h2>
                            <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Structure your course content</p>
                        </div>
                    </div>

                    <div className="flex flex-1 md:max-w-md items-center gap-2">
                        <div className="relative flex-1">
                            <PlusCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={newModuleName}
                                onChange={(e) => setNewModuleName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddModule()}
                                placeholder="Core Module Title..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1a1a1a] border dark:border-[#262626] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                            />
                        </div>
                        <button
                            onClick={() => handleAddModule()}
                            disabled={isAddingModule}
                            className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-[11px] font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                        >
                            {isAddingModule ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Module"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Module Hierarchy */}
            <div className="space-y-4">
                {moduleTree.map((module: any) => (
                    <div key={module.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-[#262626] rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
                        <div className="p-5 flex items-center justify-between bg-gray-50/50 dark:bg-[#161616]/50 border-b border-gray-100 dark:border-[#262626]">
                            <div className="flex items-center gap-4 flex-1 mr-4">
                                <button
                                    onClick={() => toggleModule(module.id)}
                                    className={`p-2 rounded-lg transition-colors ${expandedModules.includes(module.id) ? 'bg-orange-500/10 text-orange-500' : 'text-gray-400 hover:bg-gray-100'}`}
                                >
                                    {expandedModules.includes(module.id) ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>

                                {editingModuleId === module.id ? (
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="text"
                                            value={editingModuleName}
                                            onChange={(e) => setEditingModuleName(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateModule()}
                                            autoFocus
                                            className="px-3 py-1 bg-white dark:bg-[#111] border border-orange-500/50 rounded text-xs font-bold uppercase tracking-tight outline-none w-full max-w-sm"
                                        />
                                        <button onClick={handleUpdateModule} disabled={isUpdatingModule} className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded">
                                            {isUpdatingModule ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                        </button>
                                        <button onClick={() => setEditingModuleId(null)} className="p-1 text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 rounded">
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="group/title flex items-center gap-3">
                                        <div>
                                            <h3 className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{module.name}</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{module.children.length} Submodules • {module.categoryProblems.length} Problems</p>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 group-hover/title:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => { setEditingModuleId(module.id); setEditingModuleName(module.name); }}
                                                className="p-1.5 text-gray-400 hover:text-orange-500 rounded-md hover:bg-orange-500/5"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteModule(module.id)}
                                                className="p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-500/5"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setSubmoduleInput({ parentId: module.id, name: "" })}
                                    className="px-3 py-1.5 bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:border-orange-500 transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                    <Plus className="w-3 h-3" /> Submodule
                                </button>
                                <Link
                                    href={`/admin/courses/${course.id}/modules/${module.id}/problems/new`}
                                    className="px-3 py-1.5 bg-white dark:bg-[#222] border border-gray-200 dark:border-[#333] rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:border-orange-500 transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                    <Plus className="w-3 h-3" /> Create
                                </Link>
                                <button
                                    onClick={() => {
                                        setActiveSearchModuleId(activeSearchModuleId === module.id ? null : module.id);
                                        setSearchQuery("");
                                        setSearchResults([]);
                                    }}
                                    className={`px-3 py-1.5 border rounded-lg text-[9px] font-black uppercase tracking-widest transition-colors flex items-center gap-1.5 shadow-sm ${
                                        activeSearchModuleId === module.id
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-white dark:bg-[#222] border-gray-200 dark:border-[#333] text-gray-600 dark:text-gray-400 hover:border-blue-500'
                                    }`}
                                >
                                    <Copy className="w-3 h-3" /> Pool
                                </button>
                            </div>
                        </div>

                        {expandedModules.includes(module.id) && (
                            <div className="p-6 space-y-8 animate-in slide-in-from-top-2 duration-300">
                                {/* Submodules Grid */}
                                {module.children.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {module.children.map((sub: any) => (
                                            <div key={sub.id} className="p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#262626] group/sub transition-all hover:border-blue-500/20">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3 flex-1 mr-2">
                                                        <BookOpen className="w-4 h-4 text-blue-500" />
                                                        {editingModuleId === sub.id ? (
                                                            <div className="flex items-center gap-2 flex-1">
                                                                <input
                                                                    type="text"
                                                                    value={editingModuleName}
                                                                    onChange={(e) => setEditingModuleName(e.target.value)}
                                                                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateModule()}
                                                                    autoFocus
                                                                    className="px-2 py-0.5 bg-white dark:bg-[#111] border border-blue-500/50 rounded text-[11px] font-bold uppercase tracking-tight outline-none w-full"
                                                                />
                                                                <button onClick={handleUpdateModule} disabled={isUpdatingModule} className="p-1 text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 rounded">
                                                                    <Check className="w-3 h-3" />
                                                                </button>
                                                                <button onClick={() => setEditingModuleId(null)} className="p-1 text-gray-400">
                                                                    <X className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2 group/subtitle">
                                                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tight">{sub.name}</span>
                                                                <div className="flex items-center gap-0.5 opacity-0 group-hover/subtitle:opacity-100 transition-opacity">
                                                                    <button onClick={() => { setEditingModuleId(sub.id); setEditingModuleName(sub.name); }} className="p-1 text-gray-400 hover:text-blue-500"><Edit3 className="w-3 h-3" /></button>
                                                                    <button onClick={() => handleDeleteModule(sub.id, true)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                                        <Link
                                                            href={`/admin/courses/${course.id}/modules/${sub.id}/problems/new`}
                                                            className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-white/5 rounded-lg"
                                                            title="Create Problem"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                setActiveSearchModuleId(activeSearchModuleId === sub.id ? null : sub.id);
                                                                setSearchQuery("");
                                                                setSearchResults([]);
                                                            }}
                                                            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-white/5 rounded-lg"
                                                            title="Add from Pool"
                                                        >
                                                            <Copy className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Submodule Problems */}
                                                <div className="space-y-1.5">
                                                    {sub.categoryProblems.map(({ problem }: any) => (
                                                        <div key={problem.id} className="flex items-center justify-between p-2 bg-white dark:bg-[#111] rounded-lg border border-gray-50 dark:border-[#262626] text-[11px] group/p transition-all hover:bg-gray-50 dark:hover:bg-[#1a1a1a]">
                                                            <span className="font-medium text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{problem.title}</span>
                                                            <div className="flex items-center gap-1 opacity-0 group-hover/p:opacity-100 transition-all">
                                                                <Link
                                                                    href={`/admin/problems/${problem.id}/edit`}
                                                                    className="p-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded"
                                                                >
                                                                    <Edit3 className="w-3 h-3" />
                                                                </Link>
                                                                <button
                                                                    onClick={() => {
                                                                        toast.promise(removeProblemFromModule(sub.id, problem.id), {
                                                                            loading: 'Removing...',
                                                                            success: 'Problem removed',
                                                                            error: 'Failed to remove'
                                                                        });
                                                                        router.refresh();
                                                                    }}
                                                                    className="text-gray-300 hover:text-red-500 p-1 hover:bg-red-50 dark:hover:bg-red-500/10 rounded"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {sub.categoryProblems.length === 0 && (
                                                        <p className="text-[10px] text-gray-400 italic py-2">No problems added yet</p>
                                                    )}
                                                </div>

                                                {/* Submodule Search & Add */}
                                                {activeSearchModuleId === sub.id && (
                                                    <div className="mt-4 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                                        <div className="relative mb-3">
                                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                                                            <input
                                                                autoFocus
                                                                type="text"
                                                                value={searchQuery}
                                                                onChange={(e) => handleSearch(e.target.value)}
                                                                placeholder="Search pool..."
                                                                className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-lg text-[10px] font-bold outline-none ring-1 ring-transparent focus:ring-blue-500/20"
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-hide">
                                                            {isSearching ? (
                                                                <div className="py-2 text-center"><Loader2 className="w-4 h-4 animate-spin mx-auto text-blue-500" /></div>
                                                            ) : searchQuery.length > 1 && searchResults.map((p) => (
                                                                <button
                                                                    key={p.id}
                                                                    onClick={() => handleAddExistingProblem(sub.id, p.id)}
                                                                    className="w-full flex items-center justify-between p-2 bg-white dark:bg-[#222] rounded-lg border border-gray-50 dark:border-[#2a2a2a] text-[10px] font-bold text-gray-700 dark:text-gray-300 hover:border-blue-500/50 transition-colors"
                                                                >
                                                                    <span>{p.title}</span>
                                                                    <Plus className="w-3 h-3 text-blue-500" />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add Submodule Input */}
                                {submoduleInput?.parentId === module.id && (
                                    <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/20 animate-in zoom-in-95 duration-200">
                                        <div className="flex items-center gap-2">
                                            <input
                                                autoFocus
                                                type="text"
                                                value={submoduleInput?.name || ""}
                                                onChange={(e) => setSubmoduleInput(prev => prev ? { ...prev, name: e.target.value } : null)}
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddModule(module.id)}
                                                placeholder="Submodule name..."
                                                className="flex-1 px-4 py-2 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#333] rounded-lg text-xs font-bold outline-none"
                                            />
                                            <button
                                                onClick={() => handleAddModule(module.id)}
                                                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setSubmoduleInput(null)}
                                                className="px-3 py-2 text-gray-500 font-bold text-xs"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Search & Add Existing Problem UI */}
                                {activeSearchModuleId === module.id && (
                                    <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20 animate-in slide-in-from-top-2 duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="relative flex-1">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={searchQuery}
                                                    onChange={(e) => handleSearch(e.target.value)}
                                                    placeholder="Search from problem pool..."
                                                    className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                                                />
                                            </div>
                                            <button
                                                onClick={() => setActiveSearchModuleId(null)}
                                                className="px-4 py-3 text-gray-500 font-bold text-xs uppercase tracking-widest"
                                            >
                                                Close
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
                                            {isSearching ? (
                                                <div className="py-8 text-center col-span-full"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-500" /></div>
                                            ) : searchResults.map((p) => (
                                                <div key={p.id} className="flex items-center justify-between p-3 bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#262626] hover:border-blue-500/30 transition-all group/item">
                                                    <div className="flex flex-col">
                                                        <span className="text-[11px] font-bold text-gray-900 dark:text-white uppercase tracking-tight">{p.title}</span>
                                                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">{p.difficulty} • {p.domain}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAddExistingProblem(module.id, p.id)}
                                                        className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors"
                                                    >
                                                        Add
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Problems List */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Core Module Items</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {module.categoryProblems.map(({ problem }: any) => (
                                            <div key={problem.id} className="p-4 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#262626] rounded-xl flex items-center justify-between group/item transition-all hover:border-orange-500/20">
                                                <div className="flex items-center gap-4">
                                                    <GripVertical className="w-4 h-4 text-gray-200 group-hover/item:text-orange-500 cursor-grab" />
                                                    <div>
                                                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100 uppercase tracking-tight">{problem.title}</span>
                                                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-3 opacity-60">{problem.difficulty}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-all">
                                                    <Link
                                                        href={`/admin/problems/${problem.id}/edit`}
                                                        className="p-2 text-blue-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-white/5 rounded-xl transition-all"
                                                        title="Edit Problem Details"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            toast.promise(removeProblemFromModule(module.id, problem.id), {
                                                                loading: 'Removing...',
                                                                success: 'Problem removed',
                                                                error: 'Failed to remove'
                                                            });
                                                            router.refresh();
                                                        }}
                                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-white/5 rounded-xl transition-all"
                                                        title="Remove from Module"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {module.categoryProblems.length === 0 && module.children.length === 0 && (
                                        <div className="py-12 text-center bg-gray-50/50 dark:bg-[#161616]/50 rounded-2xl border-2 border-dashed border-gray-100 dark:border-[#262626]">
                                            <Box className="w-10 h-10 text-gray-200 dark:text-gray-800 mx-auto mb-3" />
                                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Empty Module</p>
                                            <Link
                                                href={`/admin/courses/${course.id}/modules/${module.id}/problems/new`}
                                                className="px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-lg"
                                            >
                                                Add First Content
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {moduleTree.length === 0 && (
                    <div className="py-24 text-center bg-white dark:bg-[#111] border-2 border-dashed border-gray-100 dark:border-[#262626] rounded-2xl">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl flex items-center justify-center mx-auto mb-6">
                            <Plus className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight uppercase">Empty Board</h3>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto mt-2 font-medium">Use the "Add Module" form at the top to begin building.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
