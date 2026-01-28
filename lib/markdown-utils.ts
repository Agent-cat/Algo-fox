
/**
 * Pre-processes markdown content to normalize directive syntax for remark-directive.
 *
 * Handles cases like:
 * - "::: solution" -> ":::solution" (removes space)
 * - ":::solution title="Title"" -> ":::solution{title="Title"}" (wrapping attributes)
 */
export function preprocessMarkdown(content: string): string {
  if (!content) return "";

  // Regex to match "::: solution" or ":::solution" with optional attributes following
  // Capture groups:
  // 1. The colons and name (:::solution)
  // 2. The attributes part (title="...", etc.)

  // This regex finds lines starting with "::: solution" or ":::solution"
  // It effectively collapses "::: solution" to ":::solution"
  // And it wraps attributes in {} if they aren't already

  const processed = content.replace(/^:::\s*([a-zA-Z0-9_-]+)(.*)$/gm, (match, name, args) => {
    const trimmedArgs = args.trim();

    // If no args, just return the directive
    if (!trimmedArgs) {
      return `:::${name}`;
    }

    // If args are already wrapped in {}, return as is (but with normalized name spacing)
    if (trimmedArgs.startsWith('{') && trimmedArgs.endsWith('}')) {
      return `:::${name}${trimmedArgs}`;
    }

    // Otherwise, wrap args in {}
    return `:::${name}{${trimmedArgs}}`;
  });

  return processed;
}
