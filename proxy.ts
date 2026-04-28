import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { getClientIP, getCloudflareSecurityInfo } from '@/lib/ddos-protection';
import { getRateLimiter, RATE_LIMIT_CONFIGS } from "@/lib/rate-limiter";

// RATE LIMITS MAPPING
const PATH_TO_CONFIG = {
  "/api/auth/signin": RATE_LIMIT_CONFIGS.AUTH_LOGIN,
  "/api/auth/signup": RATE_LIMIT_CONFIGS.AUTH_REGISTER,
  "/api/auth/reset-password": RATE_LIMIT_CONFIGS.AUTH_PASSWORD_RESET,
  "/api/submissions": RATE_LIMIT_CONFIGS.SUBMISSIONS,
  "/problems": RATE_LIMIT_CONFIGS.API_GENERAL,
  "/api": RATE_LIMIT_CONFIGS.API_GENERAL,
} as const;

export async function proxy(request: NextRequest) {
  const clientIp = getClientIP(request);
  const url = new URL(request.url);
  const pathname = url.pathname;
  let session: any = null;
  let sessionFetched = false;

  const getSession = async () => {
    if (sessionFetched) return session;
    try {
      session = await auth.api.getSession({ headers: request.headers });
    } catch (e) {
      console.error("[Auth] Session fetch failed:", e);
    }
    sessionFetched = true;
    return session;
  };

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
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/dashboard/institution") ||
    pathname.startsWith("/dashboard/teacher") ||
    pathname.startsWith("/dashboard/contests");

  const isGuestOnly =
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup");

  if (isAuthProtected || isGuestOnly) {
    try {
      const currentSession = await getSession();

      if (isGuestOnly && currentSession) {
        // If logged in and trying to access signin/signup, redirect to dashboard
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      if (isAuthProtected && !currentSession) {
        // If not logged in and trying to access protected route, redirect to signin
        return NextResponse.redirect(new URL("/signin", request.url));
      }

      if (currentSession) {
        const userRole = (currentSession.user as any).role;

        // Role Checks
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
      }
    } catch (error) {
      console.error("[Auth] Session validation failed:", error);
      if (isAuthProtected) {
        return NextResponse.redirect(new URL("/signin", request.url));
      }
    }
  }

  // 4. Rate Limiting System (Optimized via centralized RateLimiter)
  const limitEntry = Object.entries(PATH_TO_CONFIG).find(([path]) => pathname.startsWith(path));
  let response: NextResponse | null = null;

  if (limitEntry) {
    const [, config] = limitEntry;
    const limiter = getRateLimiter();

    // User-aware rate limiting if authenticated
    let identifier = clientIp;
    const currentSession = await getSession();
    if (currentSession?.user?.id) identifier = currentSession.user.id;

    try {
        const result = await limiter.checkLimit(identifier, config);

        if (!result.allowed) {
          return NextResponse.json(
            { error: "Too many requests", retryAfter: result.retryAfter },
            {
              status: 429,
              headers: {
                "Retry-After": (result.retryAfter || 60).toString(),
                "X-RateLimit-Limit": config.maxRequests.toString(),
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": result.resetTime.toString(),
              },
            }
          );
        }

        response = NextResponse.next();
        response.headers.set("X-RateLimit-Limit", config.maxRequests.toString());
        response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
    } catch (error) {
        console.error("[RateLimit] Check failed (fail-open):", error);
        response = NextResponse.next();
    }
} else {
    response = NextResponse.next();
  }

  // 5. Global Security Headers (Optimized for Cloudflare)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
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
    '/((?!_next/static|_next/image|favicon.ico|manifest.json).*)',
  ],
};
