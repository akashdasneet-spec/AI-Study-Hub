# AI-Powered Group Study Hub — Project Charter

## Executive Summary

- **Project Name**: AI-Powered Group Study Hub
- **Version**: 0.1.0
- **Project Type**: Enterprise SaaS Web Application
- **Target Users**: Students (School, College, Competitive Exams)
- **Primary Goal**: Create the world's best AI-powered collaborative study platform.
- **Estimated Timeline**: 6–8 Months
- **Development Methodology**: Agile Scrum
- **Architecture Style**: Modular Monorepo (Turborepo + pnpm Workspaces)
- **License**: MIT
- **Status**: Active (Phase 1: Workspace Bootstrap)

---

## Approved Technology Stack

- **Frontend**: Next.js (App Router), React, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: NestJS, TypeScript, Prisma ORM, PostgreSQL
- **Realtime Services**: Socket.IO
- **Caching & Broker**: Redis
- **AI Integration**: Primary OpenAI Model (`OPENAI_MODEL`), Fallback Gemini Model (`GEMINI_MODEL`)
- **Authentication**: JWT, OAuth 2.0 (Google, GitHub)
- **Deployment**: Docker, GitHub Actions CI/CD, Railway, Vercel
- **Monitoring**: Grafana, Prometheus, Sentry

---

## Monorepo Architecture

```
/
├── apps/
│   ├── web/           # Student-facing Next.js App
│   ├── admin/         # Admin Dashboard Next.js App
│   └── api/           # NestJS Monolith/API Gateway Service
├── packages/
│   ├── ui/            # Shared UI components (shadcn/ui based)
│   ├── config/        # Shared ESLint, Prettier, TS, Tailwind configs
│   ├── types/         # Shared DTOs, API payloads, domain types
│   └── utils/         # Shared utilities (formatters, validators)
├── turbo.json         # Turborepo task pipeline configuration
├── pnpm-workspace.yaml# pnpm workspace definition
└── package.json       # Monorepo root dependencies & scripts
```

### Architecture Constraints
1. **App Isolation**: `apps/*` may import from `packages/*`, but NEVER directly from other apps.
2. **Interface Decoupling**: Services communicate strictly through defined interfaces or versioned APIs (`/api/v1`).
3. **Type Centralization**: Shared types belong only in `packages/types`.
4. **Utility Centralization**: Utility helpers belong only in `packages/utils`.

---

## Non-Goals

- ❌ Native Mobile App
- ❌ Desktop App
- ❌ Cryptocurrency
- ❌ NFT
- ❌ Blockchain
- ❌ VR / AR
- ❌ Marketplace

---

## AI Cost Management Policy

- **Primary AI**: Configured via `OPENAI_MODEL` environment variable (latest stable production model).
- **Fallback AI**: Configured via `GEMINI_MODEL` environment variable (latest stable production model).
- **Token Budget**: 500,000 tokens/day soft limit; 1,000,000 tokens/day hard cap.
- **Caching**: 24-hour TTL in Redis for shared prompt outputs and quiz templates.
- **Retry Logic**: Exponential backoff (3 retries, base delay 500ms).

---

## Security & Governance

- Align with **OWASP Top 10** standards.
- Secure secret management via environment variables validated with `Zod`.
- Password hashing with **Argon2id** or **bcrypt**.
- Strict transport encryption (**HTTPS / TLS**).
- Principle of Least Privilege across RBAC roles.

---

## Quality Gates

- [ ] Documentation complete
- [ ] Lint & typecheck pass cleanly
- [ ] Architecture reviewed & monorepo constraints satisfied
- [ ] Mermaid diagrams render without syntax errors
- [ ] Naming conventions verified
- [ ] Acceptance criteria satisfied
- [ ] Phase summary generated
- [ ] Await explicit user approval

---

## Repository Branching Standards

- **Main Branch**: `develop`
- **Feature Branch**: `feature/...`
- **Bugfix Branch**: `bugfix/...`
- **Release Branch**: `release/v1.0`
- **Hotfix Branch**: `hotfix/...`

---

## Project Milestones

- **Milestone A**: Documentation Complete
- **Milestone B**: Backend Foundation
- **Milestone C**: Frontend Foundation
- **Milestone D**: Realtime Collaboration
- **Milestone E**: AI Features
- **Milestone F**: Production Release
