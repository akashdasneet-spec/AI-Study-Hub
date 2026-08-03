# ADR 001: Modular Monolith Initial Deployment Strategy

- **Status**: Approved
- **Deciders**: Lead Architect & Core Team
- **Date**: 2026-08-03

## Context
The AI-Powered Group Study Hub requires clean separation between REST API endpoints, real-time WebSockets collaboration, and AI Gateway processing. While microservice architecture offers independent scaling, deploying multiple distinct runtime services during v1 increases infrastructure management overhead.

## Decision
We will build the application as a **Modular Monolith**. Code is partitioned into distinct service directories (`services/api`, `services/websocket`, `services/ai`) and shared domain packages (`packages/*`), but deployed together as a single runtime process for v1.

## Consequences
- **Positive**: Simplified deployment on Vercel/Railway/Docker, low latency in-process communication, zero service discovery complexity during early phases.
- **Negative**: Requires discipline to enforce module boundaries and avoid direct cross-module memory mutation.
- **Future Migration**: Any module (`services/ai` or `services/websocket`) can be extracted into an independent microservice deployment with zero code refactoring when operational traffic scales.
