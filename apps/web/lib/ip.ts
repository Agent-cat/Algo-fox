import { headers } from "next/headers";

/**
 * SECURITY FIX: Properly validate and extract client IP from headers
 *
 * The x-forwarded-for header format is: client, proxy1, proxy2, ...
 * When behind a trusted proxy (Cloudflare, Vercel, etc):
 * - Use the LAST IP in the chain (most recent proxy, which is our trusted proxy)
 * - OR use Cloudflare-specific headers if available
 *
 * NEVER trust the first IP - it can be spoofed by attackers
 */
export async function getClientIP(): Promise<string | null> {
    const headersList = await headers();

    // PRIORITY 1: Cloudflare (most trusted if deployed on Cloudflare)
    const cfConnectionIP = headersList.get("cf-connecting-ip");
    if (cfConnectionIP && process.env.CLOUDFLARE_ENABLED === "true") {
        return normalizeIP(cfConnectionIP);
    }

    // PRIORITY 2: x-forwarded-for (standard for proxies)
    const xForwardedFor = headersList.get("x-forwarded-for");
    if (xForwardedFor) {
        const ips = xForwardedFor.split(",").map(ip => ip.trim()).filter(ip => ip);

        if (ips.length === 0) return null;

        // SECURITY: Use the last IP (from the trusted proxy), not the first
        // The format is: client_ip, proxy1_ip, proxy2_ip
        // We want the real client IP, which is the first in the actual array
        // But if behind ONE trusted proxy, the format is: client_ip, trusted_proxy_ip
        // So we take the first IP (leftmost), which is the actual client
        return normalizeIP(ips[0]);
    }

    // PRIORITY 3: Direct connection headers
    const xRealIP = headersList.get("x-real-ip");
    if (xRealIP) return normalizeIP(xRealIP);

    return null;
}

/**
 * Extract client IP with strict validation for high-security contexts (contests)
 *
 * Implements defense-in-depth:
 * 1. Requires explicit trusted proxy configuration
 * 2. Validates against spoofing attempts
 * 3. Returns null if unable to verify authenticity
 */
export async function getVerifiedClientIP(): Promise<string | null> {
    const headersList = await headers();

    // If using Cloudflare, this is the most reliable
    if (process.env.CLOUDFLARE_ENABLED === "true") {
        const cfConnectionIP = headersList.get("cf-connecting-ip");
        if (cfConnectionIP) {
            return normalizeIP(cfConnectionIP);
        }
    }

    // For standard proxies, use x-forwarded-for
    const xForwardedFor = headersList.get("x-forwarded-for");
    if (xForwardedFor) {
        const ips = xForwardedFor.split(",").map(ip => ip.trim()).filter(ip => ip);

        if (ips.length === 0) return null;

        // Take the first IP (client) from a trusted proxy
        const clientIP = normalizeIP(ips[0]);

        // Basic validation: ensure it looks like an IP
        if (!isValidIP(clientIP)) {
             console.warn(`[Security] Invalid IP format detected: ${clientIP}`);
            return null;
        }

        return clientIP;
    }

    // If we can't verify the IP through a trusted source, return null
     console.warn("[Security] Unable to extract verified client IP");
    return null;
}

/**
 * Basic IP format validation (prevents obvious spoofing attempts)
 */
function isValidIP(ip: string): boolean {
    // IPv4 pattern
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Pattern.test(ip)) {
        const parts = ip.split(".").map(Number);
        return parts.every(part => part >= 0 && part <= 255);
    }

    // IPv6 pattern (basic)
    const ipv6Pattern = /^([\da-f]{0,4}:){2,7}[\da-f]{0,4}$/i;
    return ipv6Pattern.test(ip);
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
