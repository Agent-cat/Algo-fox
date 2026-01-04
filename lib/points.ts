import { Difficulty } from "@prisma/client";

/**
 * Get points awarded for solving a problem based on difficulty
 * Easy: 5 points
 * Medium: 10 points
 * Hard: 15 points
 */
export function getPointsForDifficulty(difficulty: Difficulty): number {
    switch (difficulty) {
        case "EASY":
            return 5;
        case "MEDIUM":
            return 10;
        case "HARD":
            return 15;
        case "CONCEPT":
            return 0;
        default:
            return 0;
    }
}

/**
 * Get formatted points string for display
 */
export function getPointsLabel(difficulty: Difficulty): string {
    const points = getPointsForDifficulty(difficulty);
    return `${points} pts`;
}

