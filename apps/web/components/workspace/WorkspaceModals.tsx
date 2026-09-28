"use client";
import React from "react";
import EditorSettingsModal from "./EditorSettingsModal";
import { StreakCelebrationModal } from "../shared/StreakCelebrationModal";
import { PointsCelebration } from "../shared/PointsCelebration";
import ContestProtection from "../contest/ContestProtection";
import ContestNavigationGuard from "../contest/ContestNavigationGuard";
import { SubmitConfirmationModal } from "./SubmitConfirmationModal";

interface WorkspaceModalsProps {
    isSettingsOpen: boolean;
    handleCloseSettings: () => void;
    editorSettings: any;
    handleSettingsChange: (settings: any) => void;
    isStreakModalOpen: boolean;
    handleCloseStreak: () => void;
    streakCount: number;
    isPointsModalOpen: boolean;
    handleClosePoints: () => void;
    pointsGained: number;
    contestId?: string;
    contestModeActive?: boolean;
    contestSessionId?: string | null;
    handleContestBlocked: (reason: string) => void;
    isSubmitConfirmOpen: boolean;
    handleCloseSubmitConfirm: () => void;
    handleConfirmSubmit: () => void;
    isSubmitting: boolean;
}

export const WorkspaceModals = React.memo(({
    isSettingsOpen,
    handleCloseSettings,
    editorSettings,
    handleSettingsChange,
    isStreakModalOpen,
    handleCloseStreak,
    streakCount,
    isPointsModalOpen,
    handleClosePoints,
    pointsGained,
    contestId,
    contestModeActive,
    contestSessionId,
    handleContestBlocked,
    isSubmitConfirmOpen,
    handleCloseSubmitConfirm,
    handleConfirmSubmit,
    isSubmitting
}: WorkspaceModalsProps) => {
    return (
        <>
            <EditorSettingsModal
                isOpen={isSettingsOpen}
                onClose={handleCloseSettings}
                settings={editorSettings}
                onSettingsChange={handleSettingsChange}
            />

            <StreakCelebrationModal
                isOpen={isStreakModalOpen}
                onClose={handleCloseStreak}
                currentStreak={streakCount}
            />

            <PointsCelebration
                isOpen={isPointsModalOpen}
                onClose={handleClosePoints}
                points={pointsGained}
            />

            {contestId && contestModeActive && contestSessionId && (
                <>
                    <ContestProtection
                        contestId={contestId}
                        sessionId={contestSessionId}
                        onBlocked={() => handleContestBlocked("Maximum violations reached or session terminated")}
                    />
                    <ContestNavigationGuard
                        contestId={contestId}
                        allowedPaths={[
                            `/problems/`,
                            `/contest/${contestId}`,
                        ]}
                    />
                </>
            )}

            <SubmitConfirmationModal
                isOpen={isSubmitConfirmOpen}
                onClose={handleCloseSubmitConfirm}
                onConfirm={handleConfirmSubmit}
                loading={isSubmitting}
            />
        </>
    );
});
