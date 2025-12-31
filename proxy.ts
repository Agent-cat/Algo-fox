import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redis from '@/lib/redis';


const RATE_LIMITS = {
    '/api': { requests: 100, window: 60 }, // 100 requests per minute
    '/problems': { requests: 200, window: 60 }, // 200 requests per minute
} as const;


export default async function proxy(request: NextRequest) {
    // GETTING IP FROM HEADERS
    const ip = request.headers.get('x-forwarded-for') ??
        request.headers.get('x-real-ip') ??
        'unknown';
    const pathname = request.nextUrl.pathname;

    // FINDING MATCHING RATE LIMIT CONFIGURATION
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

        // SETTING EXPIRY ON FIRST REQUEST
        if (count === 1) {
            await redis.expire(key, limit.window);
        }

        // CHECKING IF RATE LIMIT EXCEEDED
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

        // ADDING RATE LIMIT HEADERS TO RESPONSE
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', limit.requests.toString());
        response.headers.set('X-RateLimit-Remaining', (limit.requests - count).toString());

        return response;
    } catch (error) {
        console.error('Rate limiting error:', error);
        // FAIL OPEN - ALLOW REQUEST IF REDIS IS DOWN
        return NextResponse.next();
    }
}

// CONFIGURING WHICH ROUTES TO APPLY MIDDLEWARE TO
export const config = {
    matcher: [
        '/api/:path*',
        '/problems/:path*',
    ],
};
