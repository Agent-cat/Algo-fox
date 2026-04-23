/**
 * Structured Logging Utility
 * Extracts non-sensitive error details for safe logging.
 */

export const sanitizeError = (error: any) => {
    if (!error) return { message: "Unknown error" };

    return {
        message: error.message || "An unexpected error occurred",
        code: error.code || error.name,
        // Include only safe metadata if needed
    };
};

export const processLogger = {
    info: (message: string, metadata?: any) => {
        console.log(`[INFO] ${message}`, metadata ? JSON.stringify(metadata) : '');
    },
    warn: (message: string, metadata?: any) => {
        console.warn(`[WARN] ${message}`, metadata ? JSON.stringify(sanitizeError(metadata)) : '');
    },
    error: (message: string, error: any) => {
        const sanitized = sanitizeError(error);
        console.error(`[ERROR] ${message}:`, JSON.stringify(sanitized));
        // In production, you might send this to Sentry/LogDNA
    }
};
