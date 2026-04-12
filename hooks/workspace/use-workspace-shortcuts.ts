import { useEffect } from "react";

interface useWorkspaceShortcutsProps {
    onRun: () => void;
    onSubmit: () => void;
    onAddFile: () => void;
    onSwitchTab: (index: number) => void;
    onRemoveActiveFile: () => void;
    onNextProblem: () => void;
    onPrevProblem: () => void;
    isRunning: boolean;
    isSubmitting: boolean;
    nextProblemSlug?: string | null;
    prevProblemSlug?: string | null;
}

export function useWorkspaceShortcuts({
    onRun,
    onSubmit,
    onAddFile,
    onSwitchTab,
    onRemoveActiveFile,
    onNextProblem,
    onPrevProblem,
    isRunning,
    isSubmitting,
    nextProblemSlug,
    prevProblemSlug,
}: useWorkspaceShortcutsProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip shortcuts if user is typing in an input or textarea
            const target = e.target as HTMLElement;
            const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

            // Allow shortcuts even if in input if they use Ctrl/Alt/Meta
            if (isInput && !e.ctrlKey && !e.altKey && !e.metaKey) return;

            // 1. Submit (Ctrl + Shift + Enter)
            if (e.ctrlKey && e.shiftKey && e.key === 'Enter' && !isRunning && !isSubmitting) {
                e.preventDefault();
                onSubmit();
                return;
            }

            // 2. Run (Ctrl + Enter)
            if (e.ctrlKey && e.key === 'Enter' && !isRunning && !isSubmitting) {
                e.preventDefault();
                onRun();
                return;
            }

            // 3. New File (Alt + N)
            if (e.altKey && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                onAddFile();
                return;
            }

            // 4. Switch Tabs (Alt + 1 to 9)
            if (e.altKey && /^[1-9]$/.test(e.key)) {
                e.preventDefault();
                const index = parseInt(e.key, 10) - 1;
                onSwitchTab(index);
                return;
            }

            // 5. Delete active file (Alt + W)
            if (e.altKey && e.key.toLowerCase() === 'w') {
                e.preventDefault();
                onRemoveActiveFile();
                return;
            }

            // 6. Navigation: Next/Previous Problem (Alt + ArrowRight/Left)
            if (e.altKey && e.key === 'ArrowRight' && nextProblemSlug) {
                e.preventDefault();
                onNextProblem();
                return;
            }

            if (e.altKey && e.key === 'ArrowLeft' && prevProblemSlug) {
                e.preventDefault();
                onPrevProblem();
                return;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [
        isRunning,
        isSubmitting,
        onRun,
        onSubmit,
        onAddFile,
        onSwitchTab,
        onRemoveActiveFile,
        onNextProblem,
        onPrevProblem,
        nextProblemSlug,
        prevProblemSlug
    ]);
}
