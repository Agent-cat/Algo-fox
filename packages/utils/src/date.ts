/**
 * Canonical date/time formatting helpers.
 * All rendering code should use these instead of ad-hoc
 * `toLocaleDateString` / `toLocaleTimeString` calls so formatting
 * stays consistent across the app.
 */

type DateInput = string | number | Date;

function toDate(input: DateInput): Date {
  return input instanceof Date ? input : new Date(input);
}

/** "Jan 5, 2026" */
export function formatDate(input: DateInput): string {
  return toDate(input).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** "02:30 PM" (hour + minute, locale default) */
export function formatTime(input: DateInput): string {
  return toDate(input).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "Jan 5, 2026, 02:30 PM" */
export function formatDateTime(input: DateInput): string {
  return toDate(input).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Relative time: "Just now", "5m ago", "3h ago", "2d ago",
 * falling back to "Jan 5" for older dates.
 */
export function timeAgo(input: DateInput, now: Date = new Date()): string {
  const d = toDate(input);
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
