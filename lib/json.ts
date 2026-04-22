export function safeJsonParse<T>(data: string | null | undefined, fallback: T): T | null {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
     console.error("[JSON] Parse error:", error, "Data length:", data.length);
    return null;
  }
}
