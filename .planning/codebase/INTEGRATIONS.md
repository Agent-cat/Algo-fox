# External Integrations

**Analysis Date:** 2026-03-27

## APIs & External Services

**Authentication:**
- Google OAuth - Social login support
  - Hostname: `lh3.googleusercontent.com`
  - Integration: via Better Auth

**Coding Platforms:**
- LeetCode API - Integration for problem/contest data
  - Client: `leetcode-query` npm package

**Communication:**
- Telegram - Bot integration for notifications/interactions
  - Client: `node-telegram-bot-api`

## Data Storage

**Databases:**
- PostgreSQL - Primary data store
  - Connection: via `DATABASE_URL` env var
  - Client: Prisma ORM v5.x
  - Location: `prisma/schema.prisma`

**Caching:**
- Redis - High-performance caching and queue management
  - Client: `ioredis` v5.x
  - Connection: via `REDIS_URL` or fallback to localhost
  - Usage: Custom cache handler in `lib/cache-handler-redis.js`

**Message Queues:**
- BullMQ - Distributed job processing (backed by Redis)
  - Client: `bullmq` v5.x

## Authentication & Identity

**Auth Provider:**
- better-auth - Comprehensive authentication framework
  - Implementation: Social login (Google) + likely credentials
  - Token storage: Client-side storage/cookies

## CI/CD & Deployment

**Hosting:**
- Docker - Standalone container deployment
  - Files: `Dockerfile`, `docker-compose.yml`, `.dockerignore`

**Configuration:**
- Environment variables via `.env` file
- Next.js built-in configuration (App Router, Cache Components)

## Environment Configuration

**Development:**
- Required env vars: `DATABASE_URL`, `REDIS_URL`, `BETTER_AUTH_SECRET`, etc.
- Local services: Postgres, Redis

**Production:**
- Secrets management: Expected via environment variables in hosting platform

---

*Integration audit: 2026-03-27*
*Update when adding/removing external services*
