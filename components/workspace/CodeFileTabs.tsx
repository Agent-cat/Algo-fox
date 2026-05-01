"use client";
import React, { useState, useRef, useEffect, memo } from "react";
import { FilePlus, X, Pencil, Check, FileCode2 } from "lucide-react";
import { CodeFile } from "@/lib/db";
import CustomTooltip from "../ui/CustomTooltip";

interface CodeFileTabsProps {
    files: CodeFile[];
    activeFileId: string | null;
    onSelect: (fileId: string) => void;
    onAdd: () => void;
    onRename: (fileId: string, name: string) => void;
    onRemove: (fileId: string) => void;
}

const CodeFileTabs = memo(({
    files,
    activeFileId,
    onSelect,
    onAdd,
    onRename,
    onRemove,
}: CodeFileTabsProps) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingId && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [editingId]);

    // Keyboard shortcuts for management
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Guard against inputs/contentEditables
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
            if (editingId) return;

            // 1. Rename (Alt + R)
            if (e.altKey && e.key.toLowerCase() === 'r' && activeFileId) {
                e.preventDefault();
                const activeFile = files.find(f => f.fileId === activeFileId);
                if (activeFile) {
                    setEditingId(activeFile.fileId);
                    setEditValue(activeFile.name);
                }
            }
            // 2. Close (Alt + W)
            else if (e.altKey && e.key.toLowerCase() === 'w' && activeFileId) {
                e.preventDefault();
                if (files.length > 1) {
                    onRemove(activeFileId);
                }
            }
            // 3. New File (Alt + N)
            else if (e.altKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                onAdd();
            }
            // 4. Switch (Alt + 1-9)
            else if (e.altKey && /^[1-9]$/.test(e.key)) {
                const index = parseInt(e.key, 10) - 1;
                if (files[index]) {
                    e.preventDefault();
                    onSelect(files[index].fileId);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeFileId, files, editingId, onAdd, onRemove, onSelect]);

    const startEdit = (e: React.MouseEvent | null, file: CodeFile) => {
        if (e) e.stopPropagation();
        setEditingId(file.fileId);
        setEditValue(file.name);
    };

    const commitEdit = (fileId: string) => {
        const trimmed = editValue.trim();
        if (trimmed) onRename(fileId, trimmed);
        setEditingId(null);
    };

    const cancelEdit = () => setEditingId(null);

    return (
        <div className="flex items-center gap-0 overflow-x-auto no-scrollbar border-b border-dashed border-gray-200 dark:border-[#2a2a2a] bg-gray-50 dark:bg-[#161616] px-2 pt-1 min-h-[36px]">
            {files.map((file, idx) => {
                const isActive = file.fileId === activeFileId;
                const isEditing = editingId === file.fileId;

                return (
                    <div
                        key={file.fileId}
                        onClick={() => !isEditing && onSelect(file.fileId)}
                        className={`
                            group relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t-md cursor-pointer
                            whitespace-nowrap transition-all duration-150 shrink-0 mr-0.5
                            ${isActive
                                ? "bg-white dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 border border-b-0 border-gray-200 dark:border-[#2a2a2a] shadow-sm"
                                : "text-gray-500 dark:text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] border border-transparent border-b-0"
                            }
                        `}
                    >
                        <FileCode2
                            className={`w-3 h-3 shrink-0 ${isActive ? "text-orange-500" : "text-gray-400 dark:text-gray-600 group-hover:text-gray-500"}`}
                        />

                        {isEditing ? (
                            <input
                                ref={inputRef}
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") commitEdit(file.fileId);
                                    if (e.key === "Escape") cancelEdit();
                                }}
                                onBlur={() => commitEdit(file.fileId)}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-transparent outline-none border-b border-orange-400 text-gray-900 dark:text-gray-100 w-24 text-xs"
                            />
                        ) : (
                            <CustomTooltip content={`Switch to tab ${idx + 1}`} shortcut={idx < 9 ? `Alt+${idx + 1}` : undefined} delay={0.5}>
                                <span className="max-w-[100px] truncate">{file.name}</span>
                            </CustomTooltip>
                        )}

                        {/* Action buttons — visible on hover or when active */}
                        {!isEditing && (
                            <div
                                className={`flex items-center gap-0.5 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                            >
                                <CustomTooltip content="Rename file" shortcut="Alt+R" side="top">
                                    <button
                                        onClick={(e) => startEdit(e, file)}
                                        className="p-0.5 hover:text-orange-500 transition-colors rounded"
                                    >
                                        <Pencil className="w-2.5 h-2.5" />
                                    </button>
                                </CustomTooltip>
                                {files.length > 1 && (
                                    <CustomTooltip content="Close file" shortcut="Alt+W" side="top">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemove(file.fileId);
                                            }}
                                            className="p-0.5 hover:text-red-500 transition-colors rounded"
                                        >
                                            <X className="w-2.5 h-2.5" />
                                        </button>
                                    </CustomTooltip>
                                )}
                            </div>
                        )}

                        {isEditing && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    commitEdit(file.fileId);
                                }}
                                className="p-0.5 hover:text-green-500 transition-colors rounded"
                            >
                                <Check className="w-2.5 h-2.5" />
                            </button>
                        )}
                    </div>
                );
            })}

            {/* Add new file button */}
            <CustomTooltip content="Add new file" shortcut="Alt+N" side="bottom">
                <button
                    onClick={onAdd}
                    className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-400 dark:text-gray-600 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-t-md transition-colors shrink-0 ml-0.5 border border-transparent"
                >
                    <FilePlus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">New File</span>
                </button>
            </CustomTooltip>
        </div>
    );
});

export default CodeFileTabs;
