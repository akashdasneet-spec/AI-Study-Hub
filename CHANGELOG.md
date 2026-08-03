# Changelog

All notable changes to the AI-Powered Group Study Hub project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.1] - 2026-08-03 (Beta Release)

### Added
- **Beta Release Tag (`v1.0.0-beta.1`)**: Initial public beta release for real-world user testing.
- **Deployment Guide (`docs/deployment/DEPLOYMENT_GUIDE.md`)**: Complete step-by-step instructions for deploying backend microservices on Railway/Render and Next.js frontend on Vercel.
- **Authentication & Dashboard**: Glassmorphic `/login`, `/register`, and `/dashboard` pages with JWT persistence.
- **Study Rooms**: Room discovery `/rooms`, room creation modal, and interactive study room `/rooms/[id]` with real-time chat, Pomodoro timer, and presence tracking.
- **AI Workspace**: AI Note Summarization, Flashcard Deck generation, and Practice Quiz engine returning Zod-validated structured JSON output.
- **User Profile & Leaderboard**: `/profile` page with level badges and achievements, `/leaderboard` page with global rank standings matrix.

## [0.2.0] - 2026-08-03 (Enterprise Architecture Release)

### Added
- Enterprise Monorepo Topology (`apps/`, `services/`, `packages/`, `docs/`, `design/`, `tests/`, `infrastructure/`, `security/`, `scripts/`).
- Modular Monolith v1 strategy, domain-expressive repositories in `@hub/database`, capability-driven AI services, and infrastructure event bus `@hub/events`.
