"use client";
import React from 'react';
import { ChevronDown, Code2, Loader2, AlignLeft, RotateCcw, Maximize2, Minimize2, Settings } from 'lucide-react';
import CustomTooltip from '../ui/CustomTooltip';

interface EditorToolbarProps {
    readOnly: boolean;
    isDropdownOpen: boolean;
    setIsDropdownOpen: (open: boolean) => void;
    currentLanguageName: string;
    availableLanguages: any[];
    effectiveLanguageId: number;
    handleLanguageChange: (langId: number) => void;
    currentDriverCode: string | null;
    setIsDriverCodeModalOpen: (open: boolean) => void;
    isSaving: boolean;
    isRestoring: boolean;
    handleFormat: () => void;
    handleReset: () => void;
    handleFullScreen: () => void;
    isFullScreen: boolean;
    onOpenSettings?: () => void;
    dropdownRef: React.RefObject<HTMLDivElement | null>;
}

export const EditorToolbar = React.memo(({
    readOnly,
    isDropdownOpen,
    setIsDropdownOpen,
    currentLanguageName,
    availableLanguages,
    effectiveLanguageId,
    handleLanguageChange,
    currentDriverCode,
    setIsDriverCodeModalOpen,
    isSaving,
    isRestoring,
    handleFormat,
    handleReset,
    handleFullScreen,
    isFullScreen,
    onOpenSettings,
    dropdownRef
}: EditorToolbarProps) => {
    return (
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-[#262626] bg-gray-50/50 dark:bg-[#1a1a1a]">
            <div className="flex items-center gap-3">
                <div className="relative" ref={dropdownRef}>
                    <button
                        id="language-dropdown"
                        onClick={() => !readOnly && setIsDropdownOpen(!isDropdownOpen)}
                        disabled={readOnly}
                        className={`flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors ${
                            readOnly
                                ? "opacity-70 cursor-default"
                                : "hover:bg-gray-200 dark:hover:bg-[#262626]"
                        }`}
                    >
                        {currentLanguageName}
                        {!readOnly && (
                            <ChevronDown
                                className={`w-3 h-3 transition-transform ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        )}
                    </button>
                    {isDropdownOpen && !readOnly && (
                        <div className="absolute top-full left-0 mt-1 bg-[#fafafa] dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#262626] rounded-lg shadow-lg z-50 min-w-30">
                            {availableLanguages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageChange(lang.id)}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                                        effectiveLanguageId === lang.id
                                            ? "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-medium"
                                            : "text-gray-700 dark:text-gray-300"
                                    }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {currentDriverCode && !readOnly && (
                    <button
                        onClick={() => setIsDriverCodeModalOpen(true)}
                        className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors"
                        title="View Driver Code"
                    >
                        <Code2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-500" />
                        <span className="hidden sm:inline">View Driver Code</span>
                    </button>
                )}

                {isSaving && (
                    <div className="flex items-center gap-1.5 text-xs text-orange-500 font-medium">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>Saving...</span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2 text-gray-500">
                {isRestoring && (
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400 mr-2" />
                )}
                <CustomTooltip content="Format Code" shortcut="Shift+Alt+F" side="bottom">
                    <button
                        onClick={handleFormat}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                </CustomTooltip>

                {!readOnly && (
                    <CustomTooltip content="Reset to Default" shortcut="Alt+Backspace" side="bottom">
                        <button
                            onClick={handleReset}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </CustomTooltip>
                )}

                <CustomTooltip content={isFullScreen ? "Exit Full Screen" : "Full Screen"} shortcut="Alt+Z" side="bottom">
                    <button
                        onClick={handleFullScreen}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
                    >
                        {isFullScreen ? (
                            <Minimize2 className="w-4 h-4" />
                        ) : (
                            <Maximize2 className="w-4 h-4" />
                        )}
                    </button>
                </CustomTooltip>

                {!readOnly && (
                    <CustomTooltip content="Editor Settings" shortcut="Ctrl+," side="bottom">
                        <button
                            onClick={onOpenSettings}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </CustomTooltip>
                )}
            </div>
        </div>
    );
});
