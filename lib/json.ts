export function safeJsonParse<T>(data: string | null | undefined, fallback: T): T {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error("[JSON] Parse error:", error, "Data:", data.slice(0, 100));
    return fallback;
  }
}
