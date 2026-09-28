import { Difficulty } from "@prisma/client";

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


export function getPointsLabel(difficulty: Difficulty): string {
    const points = getPointsForDifficulty(difficulty);
    return `${points} pts`;
}

