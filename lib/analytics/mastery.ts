import { TagSubmissionData } from './types';

export type { TagSubmissionData };

/**
 * Computes the Tag Mastery Score (0-100) for a student on a specific tag.
 *
 * Formula components:
 * - Correctness (40%): ACCEPTED / total SUBMIT-mode submissions * 100
 * - Difficulty (20%): Weighted accuracy with EASY=1x, MEDIUM=2x, HARD=3x (CONCEPT skipped)
 * - Recency (20%): Correctness rate within recentCutoffDays (default 30); 0 if no recent subs
 * - Repeat Penalty (10%): 100 - min(100, (avgAttemptsBeforeAccepted - 1) * 20)
 * - Coverage (10%): distinctProblemsAttempted / totalProblemsInTag * 100
 *
 * @param submissions All SUBMIT-mode submissions by the student for problems under this tag
 * @param totalProblemsInTag Total number of problems associated with this tag in the context
 * @param recentCutoffDays Number of days to consider for recency component (default 30)
 * @returns Score clamped to [0, 100]
 */
export function computeTagMastery(
  submissions: TagSubmissionData[],
  totalProblemsInTag: number,
  recentCutoffDays: number = 30
): number {
  if (!submissions || submissions.length === 0) {
    return 0;
  }

  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter((s) => s.status === 'ACCEPTED');

  // 1. Correctness (40%)
  const correctnessRate = (acceptedSubmissions.length / totalSubmissions) * 100;

  // 2. Difficulty (20%)
  let weightedAcceptedPoints = 0;
  let weightedTotalPoints = 0;

  const difficultyWeights: Record<string, number> = {
    EASY: 1,
    MEDIUM: 2,
    HARD: 3,
  };

  for (const sub of submissions) {
    const weight = difficultyWeights[sub.difficulty];
    if (weight) {
      weightedTotalPoints += weight;
      if (sub.status === 'ACCEPTED') {
        weightedAcceptedPoints += weight;
      }
    }
  }

  const difficultyScore =
    weightedTotalPoints > 0 ? (weightedAcceptedPoints / weightedTotalPoints) * 100 : correctnessRate;

  // 3. Recency (20%)
  const now = new Date();
  const cutoffTime = now.getTime() - recentCutoffDays * 24 * 60 * 60 * 1000;
  const recentSubmissions = submissions.filter(
    (s) => new Date(s.createdAt).getTime() >= cutoffTime
  );

  let recencyScore = 0;
  if (recentSubmissions.length > 0) {
    const recentAccepted = recentSubmissions.filter((s) => s.status === 'ACCEPTED').length;
    recencyScore = (recentAccepted / recentSubmissions.length) * 100;
  }

  // 4. Repeat Attempts Penalty (10%)
  // Group submissions by problemId to calculate attempts before first accepted
  const problemSubmissionsMap = new Map<string, TagSubmissionData[]>();
  for (const sub of submissions) {
    const list = problemSubmissionsMap.get(sub.problemId) || [];
    list.push(sub);
    problemSubmissionsMap.set(sub.problemId, list);
  }

  let totalAttemptsForAccepted = 0;
  let acceptedProblemsCount = 0;

  problemSubmissionsMap.forEach((subs) => {
    // Sort chronologically
    const sortedSubs = [...subs].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    const firstAcceptedIdx = sortedSubs.findIndex((s) => s.status === 'ACCEPTED');
    if (firstAcceptedIdx !== -1) {
      acceptedProblemsCount++;
      totalAttemptsForAccepted += firstAcceptedIdx + 1;
    }
  });

  let repeatPenaltyScore = 100;
  if (acceptedProblemsCount > 0) {
    const avgAttemptsBeforeAccepted = totalAttemptsForAccepted / acceptedProblemsCount;
    const penalty = Math.min(100, Math.max(0, (avgAttemptsBeforeAccepted - 1) * 20));
    repeatPenaltyScore = Math.max(0, 100 - penalty);
  }

  // 5. Coverage (10%)
  const distinctProblemsAttempted = problemSubmissionsMap.size;
  const safeTotalProblems = Math.max(1, totalProblemsInTag);
  const coverageScore = Math.min(100, (distinctProblemsAttempted / safeTotalProblems) * 100);

  // Weighted Sum
  const totalScore =
    correctnessRate * 0.4 +
    difficultyScore * 0.2 +
    recencyScore * 0.2 +
    repeatPenaltyScore * 0.1 +
    coverageScore * 0.1;

  return Math.min(100, Math.max(0, Math.round(totalScore * 100) / 100));
}
