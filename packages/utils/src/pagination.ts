/**
 * Canonical pagination helpers.
 * Ported from the problems-list Pagination component — the one
 * pagination implementation with ellipsis + boundary handling.
 * Renderers stay in the app; this is the shared page math.
 */

export type PageNumber = number | "...";

/**
 * Page window with ellipsis, e.g. [1, "...", 4, 5, 6, "...", 12].
 */
export function getPageNumbers(current: number, total: number): PageNumber[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: PageNumber[] = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push("...");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("...");
  pages.push(total);

  return pages;
}

/** Total page count for a list, minimum 1. */
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
}
