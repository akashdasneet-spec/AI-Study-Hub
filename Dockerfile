# Base image with pnpm installed
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Stage 1: Build workspace packages & applications
FROM base AS builder
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY apps ./apps

RUN pnpm install --frozen-lockfile
RUN pnpm build

# Stage 2: Production runner for NestJS API
FROM node:20-alpine AS api-runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

EXPOSE 4000
CMD ["node", "apps/api/dist/main.js"]
