"use client";
import React from "react";
import EditorSettingsModal from "./EditorSettingsModal";
import { StreakCelebrationModal } from "../shared/StreakCelebrationModal";
import { PointsCelebration } from "../shared/PointsCelebration";
import ContestProtection from "../contest/ContestProtection";
import ContestNavigationGuard from "../contest/ContestNavigationGuard";

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
    handleContestBlocked
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
        </>
    );
});
