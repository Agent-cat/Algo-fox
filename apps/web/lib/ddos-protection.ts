import { NextRequest, NextResponse } from 'next/server';
import { getRateLimiter, RATE_LIMIT_CONFIGS, RateLimitConfig } from './rate-limiter';

export interface DDoSConfig {
  enableCloudflareHeaders: boolean;
  enableRateLimit: boolean;
  rateLimitConfig: RateLimitConfig;
  customKeyGenerator?: (req: NextRequest) => string;
}

/**
 * Get client IP address, considering Cloudflare headers
 */
export function getClientIP(req: NextRequest): string {
  // Cloudflare headers
  const cfConnectingIp = req.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Standard forwarded headers
  const xForwardedFor = req.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return xForwardedFor.split(',')[0].trim();
  }

  // Fallback to localhost
  return '127.0.0.1';
}

/**
 * Get Cloudflare security info from headers
 */
export function getCloudflareSecurityInfo(req: NextRequest) {
  return {
    country: req.headers.get('cf-ipcountry'),
    threatScore: req.headers.get('cf-threat-score'),
    botScore: req.headers.get('cf-bot-management-score'),
    isBot: req.headers.get('cf-bot-management-score') ? parseInt(req.headers.get('cf-bot-management-score')!) > 50 : false,
    ray: req.headers.get('cf-ray'),
    tlsVersion: req.headers.get('cf-tls-version'),
    tlsCipher: req.headers.get('cf-tls-cipher'),
  };
}

/**
 * Main middleware for DDoS and rate limiting protection
 */
export async function withDDoSProtection(
  handler: (req: NextRequest) => Promise<NextResponse>,
  config: DDoSConfig
): Promise<(req: NextRequest) => Promise<NextResponse>> {
  return async (req: NextRequest) => {
    const clientIp = getClientIP(req);

    // Check Cloudflare security info
    if (config.enableCloudflareHeaders) {
      const securityInfo = getCloudflareSecurityInfo(req);

      // Block if threat score is too high (Cloudflare detected threat)
      if (securityInfo.threatScore) {
        const score = parseInt(securityInfo.threatScore);
        if (score > 80) {
           console.warn(`[DDoS] Blocked request from ${clientIp} (threat score: ${score})`);
          return NextResponse.json(
            { error: 'Request blocked for security reasons' },
            { status: 403 }
          );
        }
      }

      // Log suspicious activity
      if (securityInfo.isBot) {
         console.info(`[DDoS] Suspected bot detected from ${clientIp}`);
      }
    }

    // Rate limiting
    if (config.enableRateLimit) {
      const keyGenerator = config.customKeyGenerator || ((req: NextRequest) => clientIp);
      const rateLimitKey = keyGenerator(req);

      const limiter = getRateLimiter();
      const result = await limiter.checkLimit(rateLimitKey, config.rateLimitConfig);

      // Add rate limit headers
      const responseHeaders = new Headers();
      responseHeaders.set('X-RateLimit-Limit', config.rateLimitConfig.maxRequests.toString());
      responseHeaders.set('X-RateLimit-Remaining', result.remaining.toString());
      responseHeaders.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());

      if (!result.allowed) {
         console.warn(`[RateLimit] Rate limit exceeded for ${rateLimitKey}`);
        responseHeaders.set('Retry-After', result.retryAfter!.toString());

        return NextResponse.json(
          {
            error: 'Too many requests',
            retryAfter: result.retryAfter,
          },
          {
            status: 429,
            headers: responseHeaders,
          }
        );
      }

      // Call the actual handler and add rate limit headers to response
      const response = await handler(req);
      responseHeaders.forEach((value, key) => {
        response.headers.set(key, value);
      });
      return response;
    }

    return handler(req);
  };
}

/**
 * Create a protected endpoint with DDoS and rate limiting
 */
export function createProtectedEndpoint(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: {
    rateLimitConfig?: RateLimitConfig;
    customKeyGenerator?: (req: NextRequest) => string;
    enableCloudflareHeaders?: boolean;
  } = {}
) {
  return async (req: NextRequest) => {
    const config: DDoSConfig = {
      enableCloudflareHeaders: options.enableCloudflareHeaders ?? true,
      enableRateLimit: !!options.rateLimitConfig,
      rateLimitConfig: options.rateLimitConfig || RATE_LIMIT_CONFIGS.API_GENERAL,
      customKeyGenerator: options.customKeyGenerator,
    };

    const protectedHandler = await withDDoSProtection(handler, config);
    return protectedHandler(req);
  };
}
