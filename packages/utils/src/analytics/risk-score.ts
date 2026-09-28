import type { RiskInput, RiskBreakdown } from "@algofox/types";

export type { RiskInput, RiskBreakdown };

/**
 * Computes the composite Risk Score (0-100) and factor breakdown for a student.
 *
 * Weight breakdown:
 * - lowMastery (30%): (100 - averageMastery) * 0.30
 * - lowRecentAccuracy (20%): if no submissions in last 14d -> 20; else (100 - accuracy_14d) * 0.20
 * - inactivity (15%): min(daysSinceLastSubmit / 14, 1) * 15
 * - repeatedFailures (15%): (problemsWithRepeatedFailures / max(totalProblems, 1)) * 0.15 * 100
 * - assignmentIncomplete (10%): (incompleteAssignments / max(totalAssignments, 1)) * 0.10 * 100 (0 if totalAssignments === 0)
 * - decliningPerformance (10%): 10 if accuracy7dLast < accuracy7dPrev - 20, else 0
 *
 * @param input RiskInput values
 * @returns RiskBreakdown containing total score and factor array
 */
export function computeRiskScore(input: RiskInput): RiskBreakdown {
  const {
    averageMastery,
    recentSubmissions14d,
    daysSinceLastSubmit,
    problemsWithRepeatedFailures,
    totalProblems,
    incompleteAssignments,
    totalAssignments,
    accuracy7dLast,
    accuracy7dPrev,
  } = input;

  // 1. lowMastery (30%)
  const clampedMastery = Math.min(100, Math.max(0, averageMastery));
  const lowMasteryContribution = (100 - clampedMastery) * 0.3;

  // 2. lowRecentAccuracy (20%)
  let lowRecentAccuracyContribution = 0;
  if (!recentSubmissions14d || recentSubmissions14d.length === 0) {
    lowRecentAccuracyContribution = 20;
  } else {
    const acceptedCount = recentSubmissions14d.filter((s) => s.status === 'ACCEPTED').length;
    const accuracy14d = (acceptedCount / recentSubmissions14d.length) * 100;
    lowRecentAccuracyContribution = (100 - accuracy14d) * 0.2;
  }

  // 3. inactivity (15%)
  const safeDaysInactive = Math.max(0, daysSinceLastSubmit);
  const inactivityRatio = Math.min(safeDaysInactive / 14, 1);
  const inactivityContribution = inactivityRatio * 15;

  // 4. repeatedFailures (15%)
  const safeTotalProblems = Math.max(1, totalProblems);
  const repeatedFailuresRatio = Math.min(1, Math.max(0, problemsWithRepeatedFailures / safeTotalProblems));
  const repeatedFailuresContribution = repeatedFailuresRatio * 15;

  // 5. assignmentIncomplete (10%)
  let assignmentIncompleteContribution = 0;
  if (totalAssignments > 0) {
    const incompleteRatio = Math.min(1, Math.max(0, incompleteAssignments / totalAssignments));
    assignmentIncompleteContribution = incompleteRatio * 10;
  }

  // 6. decliningPerformance (10%)
  let decliningPerformanceContribution = 0;
  if (accuracy7dLast < accuracy7dPrev - 20) {
    decliningPerformanceContribution = 10;
  }

  const rawTotalScore =
    lowMasteryContribution +
    lowRecentAccuracyContribution +
    inactivityContribution +
    repeatedFailuresContribution +
    assignmentIncompleteContribution +
    decliningPerformanceContribution;

  const totalScore = Math.min(100, Math.max(0, Math.round(rawTotalScore * 100) / 100));

  const factors = [
    {
      name: 'lowMastery',
      contribution: Math.round(lowMasteryContribution * 100) / 100,
      label: `Low Tag Mastery (${Math.round(clampedMastery)}%)`,
    },
    {
      name: 'lowRecentAccuracy',
      contribution: Math.round(lowRecentAccuracyContribution * 100) / 100,
      label:
        recentSubmissions14d && recentSubmissions14d.length > 0
          ? `Low 14-Day Accuracy`
          : `No Submissions in 14 Days`,
    },
    {
      name: 'inactivity',
      contribution: Math.round(inactivityContribution * 100) / 100,
      label: `${Math.round(safeDaysInactive)} Days Inactive`,
    },
    {
      name: 'repeatedFailures',
      contribution: Math.round(repeatedFailuresContribution * 100) / 100,
      label: `${problemsWithRepeatedFailures} Problems with Repeated Failures`,
    },
    {
      name: 'assignmentIncomplete',
      contribution: Math.round(assignmentIncompleteContribution * 100) / 100,
      label: `${incompleteAssignments} Incomplete Assignments`,
    },
    {
      name: 'decliningPerformance',
      contribution: Math.round(decliningPerformanceContribution * 100) / 100,
      label: `Declining Performance (>20% drop)`,
    },
  ];

  return {
    score: totalScore,
    factors,
  };
}
