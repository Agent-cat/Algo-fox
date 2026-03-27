# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Base image with shared OS deps
# ============================================
FROM oven/bun:1.2-alpine AS base

# Install OS dependencies required for Prisma and native modules
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# ============================================
# Stage 2: Dependencies
# ============================================
FROM base AS deps

# Copy lockfile and package.json
COPY package.json bun.lock ./

# Install all dependencies (including devDependencies for build)
RUN bun install --frozen-lockfile

# ============================================
# Stage 3: Builder
# ============================================
FROM base AS builder

WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN bun prisma generate

# Build arguments for environment variables needed during build
ARG DATABASE_URL
ARG BETTER_AUTH_SECRET
ARG REDIS_HOST=127.0.0.1
ARG REDIS_PORT=6379

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV REDIS_HOST=${REDIS_HOST}
ENV REDIS_PORT=${REDIS_PORT}
ENV SKIP_CACHE_HANDLER=1

# Build the application
RUN bun run build

# ============================================
# Stage 4: Runner
# ============================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output from builder
# Next.js standalone mode moves everything into .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files for runtime (sometimes needed for binary discovery)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Copy the cache handler for Redis caching if it exists
COPY --from=builder --chown=nextjs:nodejs /app/lib/cache-handler-redis.js ./lib/cache-handler-redis.js

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the Next.js server with Bun
CMD ["bun", "server.js"]
