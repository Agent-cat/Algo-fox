export const PII_FIELDS = [
  'phone',
  'dateOfBirth',
  'gender',
  'permanentAddress',
  'currentAddress',
  'educationDetails',
  'experienceDetails',
] as const;

export type PIIField = (typeof PII_FIELDS)[number];

export type AIStudent = {
  id: string;
  name: string | null;
  email: string;
  collegeId: string | null;
  collegeName: string | null;
  branch: string | null;
  year: number | null;
  totalScore: number;
  problemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  image: string | null;
};

export function stripPII<T extends Record<string, unknown>>(obj: T): Omit<T, PIIField> {
  const result = { ...obj };
  for (const field of PII_FIELDS) {
    delete (result as Record<string, unknown>)[field];
  }
  return result as Omit<T, PIIField>;
}

export function stripPIIArray<T extends Record<string, unknown>>(arr: T[]): Omit<T, PIIField>[] {
  return arr.map(stripPII);
}
