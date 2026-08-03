# AI-Powered Group Study Hub

> The world's best AI-powered collaborative study platform for students.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Phase%201%3A%20Workspace%20Bootstrap-green.svg)](#)

---

## 🚀 Overview

The **AI-Powered Group Study Hub** is an enterprise-grade SaaS web application built with Next.js, NestJS, Socket.IO, PostgreSQL, Redis, and a multi-provider AI Gateway (OpenAI & Google Gemini).

For the full project specifications, quality gates, security policies, and architectural standards, please consult the [PROJECT_CHARTER.md](./PROJECT_CHARTER.md).

---

## 🏗️ Monorepo Architecture

This repository uses **Turborepo** + **pnpm Workspaces**:

```
/
├── apps/
│   ├── web/           # Student-facing Next.js App
│   ├── admin/         # Admin Dashboard Next.js App
│   └── api/           # NestJS Backend API Service
├── packages/
│   ├── ui/            # Shared React UI Component Library
│   ├── config/        # Shared ESLint, Prettier, TypeScript & Tailwind Configs
│   ├── types/         # Shared TypeScript DTOs, interfaces & domain types
│   └── utils/         # Shared helper functions & input validators
├── turbo.json         # Turborepo task pipeline configuration
├── pnpm-workspace.yaml# pnpm workspace definition
└── package.json       # Workspace root dependencies and scripts
```

---

## 🛠️ Quick Start

### Prerequisites
- **Node.js**: `^20.0.0` or higher
- **pnpm**: `^9.0.0` or higher
- **Docker & Docker Compose** (for local PostgreSQL & Redis)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/ai-study-hub.git
cd ai-study-hub

# Install workspace dependencies
pnpm install

# Copy environment template
cp .env.example .env

# Run development servers
pnpm dev
```

---

## 📜 Repository Standards

- **Main Branch**: `develop`
- **Formatting**: Prettier
- **Linting**: ESLint (`eslint-plugin-import`)
- **Commit Messages**: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`)
- **Git Hooks**: Husky + `lint-staged`

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
