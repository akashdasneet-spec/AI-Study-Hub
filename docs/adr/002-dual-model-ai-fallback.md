# ADR 002: Dual-Model AI Completion & Prompt Caching Strategy

- **Status**: Approved
- **Deciders**: Lead Architect & AI Team
- **Date**: 2026-08-03

## Context
High availability of AI-generated study notes and practice quizzes is critical. AI provider outages or rate limits can degrade user experience. Additionally, un-cached repetitive prompts waste API token budget.

## Decision
1. Implement a **Dual-Model Fallback Gateway**:
   - Primary: OpenAI completion routed to `OPENAI_MODEL` environment variable.
   - Secondary: On 5xx status or timeout (>5s), automatic failover to Google Gemini (`GEMINI_MODEL`).
2. Implement **Redis Prompt Hash Caching**:
   - Hash prompt inputs using SHA-256 (`ai:<capability>:<sha256>`).
   - Store completion responses with a 24-hour TTL (86,400s) to guarantee zero token expenditure on duplicate queries.

## Consequences
- **Positive**: 99.99% AI completion resilience, reduced token expenditure by 40-60% on popular study topics.
- **Negative**: Requires maintaining dual provider API SDKs and response transformation logic.
