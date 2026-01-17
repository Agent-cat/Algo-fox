import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  reactStrictMode: false,

  compress: true,

  poweredByHeader: false,
  cacheComponents: true,
  cacheHandlers: {
    remote: require.resolve("./lib/cache-handler-redis.js"),
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
  experimental: {
    turbopackUseSystemTlsCerts: true
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;
