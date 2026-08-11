# 🏭 Production Deployment & Operations Manual — `DEPLOYMENT.md`

## 1. Executive Summary & Production Topology

The **AI-Powered Group Study Hub** monorepo is structured for production deployment using a hybrid architecture:
- **Frontend Portals (`apps/web`, `apps/admin`)**: Deployed to **Vercel** (`https://app.example.com` & `https://admin.example.com`).
- **REST API Gateway (`services/api`)**: Deployed to persistent Node/Container hosting (Railway / Render / AWS ECS / Render).
- **AI Gateway Service (`services/ai`)**: Deployed to persistent Node/Container hosting with OpenAI & Gemini provider adapters.
- **WebSocket Service (`services/websocket`)**: Deployed to persistent Node/Container hosting maintaining stateful Socket.IO connections.
- **Infrastructure Events Service (`services/events`)**: Deployed to persistent Node/Container hosting handling background job event streams.
- **PostgreSQL Database**: PostgreSQL 16 instance with SSL connection pooling and automated WAL backups.
- **Redis In-Memory Store**: Redis 7 instance supporting SHA-256 prompt caching and state failover.

---

## 2. Platform Compatibility & Hosting Recommendations

| Service / App | Recommended Platform | Reason / Architecture Constraint |
| :--- | :--- | :--- |
| `apps/web` | **Vercel** | Next.js 14 App Router, static page prerendering, serverless functions. |
| `apps/admin` | **Vercel** | Next.js 14 Admin Portal, static route optimization. |
| `services/api` | **Node/Container (Railway / AWS / Render)** | Persistent NestJS REST API Gateway server instance. |
| `services/ai` | **Node/Container (Railway / AWS / Render)** | Persistent Express AI Provider Gateway. |
| `services/websocket` | **Node/Container (Railway / AWS / Render)** | **Requires persistent Node runtime**; Socket.IO WebSockets are not compatible with Vercel serverless function limits. |
| `services/events` | **Node/Container (Railway / AWS / Render)** | Event listener background worker process. |

---

## 3. Production Environment Variable Specification

### 3.1 Server-Only Environment Variables (Keep Private & Never Expose)
```ini
NODE_ENV=production
PORT=4000
API_PREFIX=/api/v1

# PostgreSQL Database
DATABASE_URL="postgresql://postgres:SecureProdPassword@postgres.example.com:5432/ai_study_hub?sslmode=require"

# Redis Cache & Broker
REDIS_URL="redis://:SecureRedisPassword@redis.example.com:6379"

# Security & Authentication
JWT_SECRET="prod_jwt_secret_min_32_characters_long_security_key"
JWT_EXPIRES_IN="15m"
CORS_ALLOWED_ORIGINS="https://app.example.com,https://admin.example.com"

# AI Provider Credentials
OPENAI_API_KEY="sk-prod-openai-key-here"
OPENAI_MODEL="gpt-4o"
GEMINI_API_KEY="AIzaSyProdGeminiKeyHere"
GEMINI_MODEL="gemini-1.5-pro"
```

### 3.2 Client-Side Public Environment Variables (Exposed via Next.js)
```ini
# apps/web & apps/admin
NEXT_PUBLIC_APP_URL="https://app.example.com"
NEXT_PUBLIC_ADMIN_URL="https://admin.example.com"
NEXT_PUBLIC_API_URL="https://api.example.com/api/v1"
NEXT_PUBLIC_WS_URL="wss://ws.example.com/realtime/rooms"
```

---

## 4. Step-by-Step Production Deployment Procedure

### 4.1 Database Provisioning & Prisma Migrations
```bash
# Apply pending Prisma migrations to production database without data destruction
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma

# Generate production Prisma Client bindings
npx prisma generate --schema=packages/database/prisma/schema.prisma
```

### 4.2 API, AI & WebSocket Container Service Deployment
```bash
# Build and run containers via Docker Compose
docker-compose -f docker-compose.yml up -d --build
```

### 4.3 Frontend Next.js Portal Deployment (Vercel)
```bash
# Deploy Student Portal
vercel --cwd apps/web --prod

# Deploy Admin Portal
vercel --cwd apps/admin --prod
```

---

## 5. Rollback Procedure

In the event of a production deployment issue:
1. **Container Microservices**: Revert container images using tag-based deployment:
   ```bash
   docker-compose down
   docker pull studyhub/api:v1.0.0-previous
   docker-compose up -d
   ```
2. **Frontend Applications**: Revert to the previous instant deployment alias in Vercel Dashboard or via CLI:
   ```bash
   vercel rollback --cwd apps/web
   ```

---

## 6. Health Checks & Post-Deployment Smoke Tests

1. **API Health Endpoint**:
   ```bash
   curl -i https://api.example.com/api/v1/telemetry/health
   # Expected: HTTP/2 200 OK with {"success": true, "status": "HEALTHY"}
   ```
2. **WebSocket Handshake Verification**:
   Verify `wss://ws.example.com/realtime/rooms` accepts socket connections cleanly.
3. **YouTube Import & Persistent Notes Pipeline**:
   - POST YouTube URL `https://www.youtube.com/watch?v=dQw4w9WgXcQ` to `/api/v1/notes/import-youtube`.
   - Refresh page and verify note is retrieved from database via `GET /api/v1/notes`.
4. **AI Gateway Dual-Model Failover**:
   Verify primary OpenAI responses succeed; verify Gemini fallback when OpenAI API key is toggled.
