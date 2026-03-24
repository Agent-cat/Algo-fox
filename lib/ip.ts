import { headers } from "next/headers";

/**
 * Gets the user's IP address from headers.
 * Reliable in production environments like Vercel, Cloudflare, or Nginx.
 */
export async function getClientIP(): Promise<string | null> {
    const headersList = await headers();

    // Check for x-forwarded-for first (Standard for proxies)
    const xForwardedFor = headersList.get("x-forwarded-for");
    if (xForwardedFor) {
        // The first IP is the real client IP, subsequent ones are proxies
        const ip = xForwardedFor.split(",")[0].trim();
        return normalizeIP(ip);
    }

    // Direct header for some proxies like Nginx
    const xRealIP = headersList.get("x-real-ip");
    if (xRealIP) return normalizeIP(xRealIP);

    // Cloudflare specific
    const cfConnectionIP = headersList.get("cf-connecting-ip");
    if (cfConnectionIP) return normalizeIP(cfConnectionIP);

    return null;
}

/**
 * Normalizes IP addresses (e.g., converts IPv6 loopback or wrapped IPv4 to standard formats)
 */
function normalizeIP(ip: string): string {
    // Convert IPv6 loopback to IPv4
    if (ip === "::1") return "127.0.0.1";

    // Convert IPv6-wrapped IPv4 (::ffff:127.0.0.1) to standard IPv4
    if (ip.startsWith("::ffff:")) {
        return ip.substring(7);
    }

    return ip;
}

/**
 * Validates if the client IP is allowed for a given contest
 */
export function isIPAllowed(clientIP: string | null, allowedIPs: string[]): boolean {
    if (!clientIP) return false;

    // Normalize client IP just in case
    const normalizedClient = normalizeIP(clientIP);

    // Check for exact match or CIDR notation if needed (keeping it simple for now)
    return allowedIPs.some(allowed => normalizeIP(allowed.trim()) === normalizedClient);
}
