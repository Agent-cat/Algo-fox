/**
 * Converts a heading string to a URL-safe slug ID.
 * Must be used consistently in both the TOC parser and
 * the ReactMarkdown heading component overrides.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`~[\]()]/g, "")     // Strip markdown formatting
    .replace(/[^a-z0-9\s-]/g, "")   // Remove special chars
    .trim()
    .replace(/\s+/g, "-")            // Spaces → dashes
    .replace(/-+/g, "-");            // Collapse multiple dashes
}
