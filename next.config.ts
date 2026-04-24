import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'algofox-vishnu.s3.ap-south-2.amazonaws.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  reactStrictMode: true, // Re-enabled: BullMQ worker is now guarded by a globalThis singleton

  compress: true,
  poweredByHeader: false,
  cacheComponents: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    optimizePackageImports: [
      '@aws-sdk/client-s3',
      'framer-motion',
      'highlight.js',
      '@tanstack/react-table',
      'react-markdown',
      'zod',
      'xlsx'
    ],
  },
  cacheHandlers: {
    default: process.env.SKIP_CACHE_HANDLER ? undefined : require.resolve("./lib/cache-handler-local.js"),
    remote: process.env.SKIP_CACHE_HANDLER ? undefined : require.resolve("./lib/cache-handler-redis.js"),
  },
  cacheLife: {
    // For contest list - shared across all users
    contests: {
      stale: 300,      // 5 minutes stale
      revalidate: 600, // 10 minutes revalidate
      expire: 3600,    // 1 hour expire
    },
    // For individual contest details
    "contest-detail": {
      stale: 60,       // 1 minute stale
      revalidate: 120, // 2 minutes revalidate
      expire: 600,     // 10 minutes expire
    },
    // For live leaderboard during contests
    leaderboard: {
      stale: 15,       // 15 seconds stale
      revalidate: 30,  // 30 seconds revalidate
      expire: 120,     // 2 minutes expire
    },
    // For assignments list and details
    assignments: {
      stale: 60,       // 1 minute stale
      revalidate: 120, // 2 minutes revalidate
      expire: 600,     // 10 minutes expire
    },
    // For classrooms list
    classrooms: {
      stale: 120,      // 2 minutes stale
      revalidate: 300, // 5 minutes revalidate
      expire: 900,     // 15 minutes expire
    },
    // For institution statistics
    "institution-stats": {
      stale: 300,      // 5 minutes stale
      revalidate: 600, // 10 minutes revalidate
      expire: 3600,    // 1 hour expire
    },
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Enforce HTTPS for 2 years, include subdomains
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Restrict browser feature access
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // CSP: allow Next.js inline scripts + our trusted sources
          // 'unsafe-inline' is required for Next.js hydration scripts
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.googleusercontent.com https://*.amazonaws.com https://www.codechef.com https://codeforces.org https://assets.leetcode.com",
              "font-src 'self' data: https://cdn.jsdelivr.net",
              "worker-src blob: 'self'",
              "connect-src 'self' https://cdn.jsdelivr.net https://leetcode.com https://codeforces.com https://www.codechef.com https://api.github.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
