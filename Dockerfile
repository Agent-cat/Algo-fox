# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Dependencies
# ============================================
FROM node:22-alpine AS deps

WORKDIR /app

# Install dependencies required for Prisma and native modules
RUN apk add --no-cache libc6-compat openssl

# Copy package files
COPY package.json bun.lock* package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  elif [ -f bun.lock ]; then npm i -g bun && bun install --frozen-lockfile; \
  else echo "No lockfile found." && npm install; \
  fi

# ============================================
# Stage 2: Builder
# ============================================
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies for building
RUN apk add --no-cache libc6-compat openssl

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

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

# Build the application
RUN npm run build

# ============================================
# Stage 3: Runner
# ============================================
FROM node:22-alpine AS runner

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache libc6-compat openssl

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set correct permissions for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Prisma files for runtime
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Copy the cache handler for Redis caching
COPY --from=builder --chown=nextjs:nodejs /app/lib/cache-handler-redis.js ./lib/cache-handler-redis.js

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run the Next.js server
CMD ["node", "server.js"]
