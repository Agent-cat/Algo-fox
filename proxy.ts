import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redis from '@/lib/redis';

// Rate limit configuration per route pattern
const RATE_LIMITS = {
    '/api': { requests: 100, window: 60 }, // 100 requests per minute
    '/problems': { requests: 200, window: 60 }, // 200 requests per minute
} as const;

/**
 * Rate limiting middleware to prevent abuse
 * Uses Redis for distributed rate limiting
 */
export default async function proxy(request: NextRequest) {
    // Get IP from headers (Next.js doesn't expose request.ip directly)
    const ip = request.headers.get('x-forwarded-for') ??
        request.headers.get('x-real-ip') ??
        'unknown';
    const pathname = request.nextUrl.pathname;

    // Find matching rate limit configuration
    const limitEntry = Object.entries(RATE_LIMITS).find(([path]) =>
        pathname.startsWith(path)
    );

    if (!limitEntry) {
        return NextResponse.next();
    }

    const [, limit] = limitEntry;
    const key = `rate-limit:${ip}:${pathname.split('/').slice(0, 3).join('/')}`;

    try {
        const count = await redis.incr(key);

        // Set expiry on first request
        if (count === 1) {
            await redis.expire(key, limit.window);
        }

        // Check if rate limit exceeded
        if (count > limit.requests) {
            return NextResponse.json(
                {
                    error: 'Rate limit exceeded',
                    retryAfter: limit.window
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': limit.window.toString(),
                        'X-RateLimit-Limit': limit.requests.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': (Date.now() + limit.window * 1000).toString(),
                    }
                }
            );
        }

        // Add rate limit headers to response
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', limit.requests.toString());
        response.headers.set('X-RateLimit-Remaining', (limit.requests - count).toString());

        return response;
    } catch (error) {
        console.error('Rate limiting error:', error);
        // Fail open - allow request if Redis is down
        return NextResponse.next();
    }
}

// Configure which routes to apply middleware to
export const config = {
    matcher: [
        '/api/:path*',
        '/problems/:path*',
    ],
};
