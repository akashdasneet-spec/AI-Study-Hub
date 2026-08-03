# Production Deployment & Infrastructure Manual — `DEPLOYMENT.md`

## 1. Executive Summary & Production Topology

The **AI-Powered Group Study Hub** is deployed in production using a **Modular Monolith** architecture:
- **Frontend Portal (`apps/web`)**: Deployed on **Vercel** (`https://studyhub-ai.vercel.app`).
- **Admin Dashboard (`apps/admin`)**: Deployed on **Vercel** (`https://admin-studyhub.vercel.app`).
- **REST API & WebSockets Gateway (`services/api`, `services/websocket`)**: Deployed on **Railway** (`https://api.studyhub.up.railway.app/api/v1`).
- **AI Engine Gateway (`services/ai`)**: Deployed on **Railway** (`https://ai.studyhub.up.railway.app/api/v1`).
- **PostgreSQL Database**: Provisioned PostgreSQL 16 instance with SSL connection pooling.
- **Redis In-Memory Store**: Provisioned Redis 7 instance with dual RDB/AOF persistence for SHA-256 prompt caching.

---

## 2. Production Environment Variable Specification

### 2.1 Backend Microservices Environment Config (`.env.production`)
```ini
NODE_ENV=production
PORT=4000
API_PREFIX=/api/v1

# PostgreSQL Database
DATABASE_URL="postgresql://postgres:SecureProdPassword@postgres.railway.internal:5432/aistudyhub?sslmode=require"

# Redis Cache & Message Broker
REDIS_HOST="redis.railway.internal"
REDIS_PORT=6379
REDIS_PASSWORD="SecureRedisPassword"

# Authentication & Security Secrets
JWT_SECRET="prod_jwt_secret_83hfa92ndk923j109"
JWT_EXPIRES_IN="15m"
CORS_ALLOWED_ORIGINS="https://studyhub-ai.vercel.app,https://admin-studyhub.vercel.app"

# Dynamic AI Models Gateway
OPENAI_API_KEY="sk-prod-openai-key-here"
OPENAI_MODEL="gpt-4o"

GEMINI_API_KEY="AIzaSyProdGeminiKeyHere"
GEMINI_MODEL="gemini-1.5-pro"

# Telemetry & Monitoring
PROMETHEUS_METRICS_PORT=9090
```

### 2.2 Frontend Next.js Portal Environment Config (`apps/web/.env.production`)
```ini
NEXT_PUBLIC_APP_URL="https://studyhub-ai.vercel.app"
NEXT_PUBLIC_API_URL="https://api.studyhub.up.railway.app/api/v1"
NEXT_PUBLIC_WS_URL="wss://api.studyhub.up.railway.app/realtime/rooms"
```

---

## 3. Production Deployment Commands & Step-by-Step Procedure

### 3.1 Database Migration & Seeding
```bash
# Push database migrations to production PostgreSQL instance
pnpm --filter @hub/database prisma db push

# Seed production system roles and admin accounts
pnpm --filter @hub/database prisma db seed
```

### 3.2 Backend Railway Container Deployment
```bash
# Deploy multi-service Docker container via Railway CLI
railway up --service api-gateway
```

### 3.3 Frontend Vercel Production Build
```bash
# Deploy Next.js 14 Student Portal
vercel --cwd apps/web --prod
```

---

## 4. Post-Deployment Smoke Test Protocol

1. **API Health Check**:
   ```bash
   curl -I https://api.studyhub.up.railway.app/api/v1/rooms
   # HTTP/2 200 OK
   ```
2. **WebSockets Handshake Verification**:
   Verify `wss://api.studyhub.up.railway.app/realtime/rooms` emits `room:join` and `chat:broadcast` events cleanly.
3. **Real YouTube Caption Pipeline Verification**:
   POST YouTube URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ` to `/api/v1/notes/import-youtube` and verify real caption text is extracted prior to AI note synthesis.
4. **Dual-Model AI Failover**:
   Verify primary OpenAI call succeeds; test Gemini fallback by setting invalid `OPENAI_API_KEY`.
5. **Redis Prompt Cache Verification**:
   Verify identical AI prompt query returns `cached: true` on second call within 24h.
