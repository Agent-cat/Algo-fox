export type PerformanceTier = "elite" | "advanced" | "growing" | "beginner";

export function getPerformanceTier(
    totalScore: number,
    problemsSolved: number
): PerformanceTier {
    if (totalScore >= 5000 || problemsSolved >= 100) return "elite";
    if (totalScore >= 2000 || problemsSolved >= 50) return "advanced";
    if (totalScore >= 500 || problemsSolved >= 20) return "growing";
    return "beginner";
}
