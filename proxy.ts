import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import redis from "@/lib/redis";
import { auth } from "@/lib/auth";
import { getClientIP, getCloudflareSecurityInfo } from '@/lib/ddos-protection';

// RATE LIMITS
const RATE_LIMITS = {
  "/api": { requests: 200, window: 60 },
  "/problems": { requests: 100, window: 60 },
} as const;

export default async function proxy(request: NextRequest) {
  const clientIp = getClientIP(request);
  const url = new URL(request.url);
  const pathname = url.pathname;

  // 1. Cloudflare Security Information Extraction
  const securityInfo = getCloudflareSecurityInfo(request);

  // Security Logging
  const isSuspicious = (securityInfo.threatScore && parseInt(securityInfo.threatScore) > 10) || securityInfo.isBot;
  const shouldLog = process.env.DEBUG_SECURITY === 'true' || isSuspicious;

  if (shouldLog) {
     console.info(`[Security] ${request.method} ${pathname}`, {
       ip: clientIp,
       country: securityInfo.country || 'Unknown',
       threatScore: securityInfo.threatScore || '0',
       isBot: securityInfo.isBot,
       ray: securityInfo.ray || 'local',
     });
  }

  // 2. Security Blocking Rules
  if (securityInfo.threatScore) {
    const score = parseInt(securityInfo.threatScore);
    if (score > 90) { // Block extremely high threats
      console.error(`[DDoS] Extreme threat score (${score}) from ${clientIp}`);
      return NextResponse.json({ error: 'Security block active' }, { status: 403 });
    }
  }

  const blockedCountries = process.env.BLOCKED_COUNTRIES?.split(',') || [];
  if (securityInfo.country && blockedCountries.includes(securityInfo.country)) {
    console.warn(`[DDoS] Blocked access from region: ${securityInfo.country}`);
    return NextResponse.json({ error: 'Service unavailable in your region' }, { status: 403 });
  }

  // 3. Authentication & Access Control
  const isAuthProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard/institution") ||
    pathname.startsWith("/dashboard/teacher") ||
    pathname.startsWith("/dashboard/contests");

  if (isAuthProtected) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      if (!session) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }

      const userRole = (session.user as any).role;

      // Role Check
      if (pathname.startsWith("/admin") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if (pathname.startsWith("/dashboard/institution") && userRole !== "INSTITUTION_MANAGER") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      if ((pathname.startsWith("/dashboard/teacher") || pathname.startsWith("/dashboard/contests")) &&
          !["TEACHER", "ADMIN", "INSTITUTION_MANAGER", "CONTEST_MANAGER"].includes(userRole)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("[Auth] Session validation failed:", error);
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  // 4. Rate Limiting System
  const limitEntry = Object.entries(RATE_LIMITS).find(([path]) => pathname.startsWith(path));
  let response: NextResponse;

  if (limitEntry) {
    const [, limit] = limitEntry;
    const key = `rate-limit:${clientIp}:${pathname.split("/").slice(0, 3).join("/")}`;

    try {
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, limit.window);

      if (count > limit.requests) {
        return NextResponse.json(
          { error: "Too many requests", retryAfter: limit.window },
          {
            status: 429,
            headers: {
              "Retry-After": limit.window.toString(),
              "X-RateLimit-Limit": limit.requests.toString(),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": (Date.now() + limit.window * 1000).toString(),
            },
          }
        );
      }

      response = NextResponse.next();
      response.headers.set("X-RateLimit-Limit", limit.requests.toString());
      response.headers.set("X-RateLimit-Remaining", (limit.requests - count).toString());
    } catch (error) {
       // Fail-safe: continue on redis error
       console.error("[RateLimit] Redis error:", error);
       response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  // 5. Global Security Headers (Optimized for Cloudflare)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN'); // Matches next.config.ts for consistency
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Custom Cloudflare pass-throughs
  response.headers.set('X-Client-IP', clientIp);
  response.headers.set('X-CF-Ray', securityInfo.ray || 'local');

  // Enforce HSTS in production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with local assets
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
