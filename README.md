# AI-Powered Group Study Hub

> Enterprise SaaS Monorepo Platform for Collaborative Group Study, AI Note Summaries, Practice Quizzes, and Real-time Whiteboards.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Modular%20Monolith%20v1.0.0--beta.1-green.svg)](#)

---

## 🏗️ Monorepo Architecture

This monorepo uses **Turborepo** + **pnpm Workspaces**:

```
AI-Study-Hub/
├── apps/
│   ├── web/                    # Student Portal Next.js 14 App Router
│   └── admin/                  # Admin Dashboard Next.js 14 App Router
├── services/
│   ├── api/                    # REST API Module Gateway (/api/v1/modules/*)
│   ├── websocket/              # Realtime WebSockets Microservice (Rooms, Chat, Whiteboard)
│   ├── ai/                     # AI Gateway Service (Summarization, Quiz, Providers)
│   └── events/                 # Asynchronous Infrastructure Event Bus (@hub/events)
├── packages/
│   ├── ui/                     # Shared Glassmorphism UI Component Library
│   ├── config/                 # Shared Configs & Feature Flags
│   ├── types/                  # Shared Domain Types & Interfaces
│   ├── utils/                  # Shared Utility Functions & Helpers
│   ├── contracts/              # Shared Zod Schemas & API DTOs (@hub/contracts)
│   ├── database/               # Centralized Prisma ORM & Repositories (@hub/database)
│   ├── auth/                   # Shared Authentication Guards (@hub/auth)
│   ├── logger/                 # Shared Structured JSON Logger (@hub/logger)
│   ├── telemetry/              # Shared Correlation ID Utilities (@hub/telemetry)
│   └── constants/              # System-wide Enums & Constants (@hub/constants)
```

---

## 🛠️ Quick Start

```bash
# 1. Install workspace dependencies
npx pnpm install

# 2. Start local development servers
npx pnpm dev

# 3. Execute workspace tests
npx pnpm test
```

---

## 🔐 Environment Variables Configuration

Copy `.env.example` to `.env` in the root directory:

```ini
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgrespassword@localhost:5432/aistudyhub?schema=public
JWT_SECRET=super-secret-jwt-key-change-in-production-min32chars
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_openai_api_key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_MODEL=gpt-4o
GEMINI_MODEL=gemini-1.5-pro
```

---

## 🐳 Docker Deployment Setup

```bash
# Build and boot full infrastructure stack (PostgreSQL, Redis, API, AI Service, WebSockets, Web, Admin)
docker-compose up --build -d

# Verify container health status
docker-compose ps
```

---

## 🧪 Verification & Testing Commands

```bash
# Monorepo typecheck across all 19 workspace packages
npx --package=pnpm pnpm run typecheck

# Execute Vitest test runner (8 test files, 21 unit & integration tests)
npx --package=pnpm pnpm test
```

---

## 🔧 Troubleshooting Guide

- **PostgreSQL Connection Failures**: Ensure PostgreSQL container is running on port `5432` or run `prisma generate` inside `packages/database`.
- **pnpm Execution Errors on Windows**: Run pnpm commands via `cmd.exe /c "npx --package=pnpm pnpm <command>"` to bypass script execution policy restrictions.
- **AI Gateway Failover**: If `OPENAI_API_KEY` is omitted, the `LLMRouter` automatically degrades to `GeminiAdapter` or `StructuredFallbackAdapter` without crashing.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

