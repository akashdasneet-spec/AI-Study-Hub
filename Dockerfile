# Base image with pnpm installed
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate
WORKDIR /app

# Stage 1: Build workspace packages & applications
FROM base AS builder
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY packages ./packages
COPY services ./services
COPY apps ./apps

RUN pnpm install --frozen-lockfile
RUN pnpm build

# Stage 2: Production runner for NestJS API Service
FROM node:20-alpine AS api-runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/services/api/dist ./services/api/dist
COPY --from=builder /app/services/api/package.json ./services/api/package.json

EXPOSE 4000
CMD ["node", "services/api/dist/main.js"]
