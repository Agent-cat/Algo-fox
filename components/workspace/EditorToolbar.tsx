"use client";
import React from 'react';
import { ChevronDown, Code2, Loader2, AlignLeft, RotateCcw, Maximize2, Minimize2, Settings } from 'lucide-react';
import CustomTooltip from '../ui/CustomTooltip';
import { GithubSyncDialog } from '../settings/GithubSyncDialog';

const GithubIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="none"
        className={className}
    >
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
);

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
        <div className="flex items-center justify-between px-4 py-2 border-b border-dashed border-gray-300 dark:border-white/10 bg-gray-50/50 dark:bg-[#1D1E23]">
            <div className="flex items-center gap-3">
                <div className="relative" ref={dropdownRef}>
                    <button
                        id="language-dropdown"
                        onClick={() => !readOnly && setIsDropdownOpen(!isDropdownOpen)}
                        disabled={readOnly}
                        className={`flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors ${readOnly
                            ? "opacity-70 cursor-default"
                            : "hover:bg-gray-200 dark:hover:bg-[#262626] cursor-pointer"
                            }`}
                    >
                        {currentLanguageName}
                        {!readOnly && (
                            <ChevronDown
                                className={`w-3 h-3 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        )}
                    </button>
                    {isDropdownOpen && !readOnly && (
                        <div className="absolute top-full left-0 mt-1 bg-[#fafafa] dark:bg-[#24262C] border border-gray-200 dark:border-[#262626] rounded-lg shadow-lg z-50 min-w-30">
                            {availableLanguages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => {
                                        handleLanguageChange(lang.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors first:rounded-t-lg last:rounded-b-lg ${effectiveLanguageId === lang.id
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
                        className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300 px-2 py-1 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors cursor-pointer"
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
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>
                </CustomTooltip>

                {!readOnly && (
                    <CustomTooltip content="Reset to Default" shortcut="Alt+Backspace" side="bottom">
                        <button
                            onClick={handleReset}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </CustomTooltip>
                )}

                <CustomTooltip content={isFullScreen ? "Exit Full Screen" : "Full Screen"} shortcut="Alt+Z" side="bottom">
                    <button
                        onClick={handleFullScreen}
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
                    >
                        {isFullScreen ? (
                            <Minimize2 className="w-4 h-4" />
                        ) : (
                            <Maximize2 className="w-4 h-4" />
                        )}
                    </button>
                </CustomTooltip>

                {!readOnly && (
                    <CustomTooltip content="GitHub Sync Settings" side="bottom">
                        <GithubSyncDialog>
                            <button
                                className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
                            >
                                <GithubIcon className="w-4 h-4" />
                            </button>
                        </GithubSyncDialog>
                    </CustomTooltip>
                )}

                {!readOnly && onOpenSettings && (
                    <CustomTooltip content="Editor Settings" shortcut="Ctrl+," side="bottom">
                        <button
                            onClick={onOpenSettings}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-[#262626] rounded transition-colors text-gray-500 dark:text-gray-400 cursor-pointer"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    </CustomTooltip>
                )}
            </div>
        </div>
    );
});
