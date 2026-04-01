# Stage 1: Dependencies
FROM oven/bun:1-alpine AS deps

# Add libc6-compat and openssl for Prisma
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy package files first for better caching
COPY package.json bun.lock ./
# Copy prisma directory because postinstall needs the schema
COPY prisma ./prisma/

# Install dependencies (use --frozen-lockfile for consistency)
RUN bun install --frozen-lockfile

# Stage 2: Builder
FROM oven/bun:1-alpine AS builder
# Add openssl for prisma generate
RUN apk add --no-cache openssl
WORKDIR /app

# Accept DATABASE_URL for build-time static generation, with a dummy fallback
ARG DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build-time environment variables
ARG BETTER_AUTH_SECRET
ENV BETTER_AUTH_SECRET=${BETTER_AUTH_SECRET}
ENV BETTER_AUTH_URL=http://localhost:3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_CACHE_HANDLER=1

# Note: server.js is created by next build when output: 'standalone' is enabled
# Using dynamic build-time DATABASE_URL (passed via build args) to allow static generation
RUN bun run build

# Stage 3: Runner
FROM oven/bun:1-alpine AS runner
# Add openssl to the runner image because Prisma needs it at runtime
RUN apk add --no-cache openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Security: add system user for better security
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Copy standalone build and static assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# server.js is created by next build when output: 'standalone' is enabled
CMD ["bun", "server.js"]
