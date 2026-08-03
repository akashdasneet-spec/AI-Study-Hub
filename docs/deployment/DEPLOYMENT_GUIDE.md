# Cloud Deployment & Production Readiness Guide

This guide outlines the step-by-step deployment procedure for releasing the **AI-Powered Group Study Hub (`v1.0.0-beta.1`)** to cloud infrastructure.

---

## 1. Backend Microservices Deployment (Railway / Render / Docker)

### 1.1 Provision Database & Caching Services
1. Provision a **PostgreSQL 16** database instance on Railway / Supabase.
2. Run database migrations:
   ```bash
   pnpm --filter @hub/database prisma db push
   ```
3. Provision a **Redis 7** instance on Railway / Upstash.

### 1.2 Deploy Modular Monolith Services
1. Link GitHub repository to Railway / Render.
2. Configure Environment Variables:
   - `NODE_ENV=production`
   - `PORT=4000`
   - `DATABASE_URL=postgresql://...`
   - `REDIS_HOST=...`
   - `REDIS_PORT=6379`
   - `OPENAI_API_KEY=sk-...`
   - `OPENAI_MODEL=gpt-4o`
   - `GEMINI_API_KEY=AIza...`
   - `GEMINI_MODEL=gemini-1.5-pro`
   - `JWT_SECRET=super_secure_production_secret`
3. Verify Health Check Endpoint:
   ```bash
   curl -I https://api-service-production.up.railway.app/api/v1/rooms
   ```

---

## 2. Frontend Student Portal Deployment (Vercel)

### 2.1 Import & Build Settings
1. Import `apps/web` into Vercel.
2. Root Directory: `apps/web`
3. Build Command: `pnpm build`
4. Output Directory: `.next`

### 2.2 Configure Environment Variables
- `NEXT_PUBLIC_API_URL=https://api-service-production.up.railway.app/api/v1`
- `NEXT_PUBLIC_WS_URL=wss://websocket-production.up.railway.app/realtime/rooms`

---

## 3. Post-Deployment Verification Checklist

- [ ] Execute `pnpm run lint` & `pnpm run typecheck` across all workspace modules.
- [ ] Run Playwright End-to-End tests against production URL.
- [ ] Conduct Lighthouse Audit (Target: Performance > 90, Accessibility > 95, SEO > 95).
- [ ] Tag git release: `git tag -a v1.0.0-beta.1 -m "Release v1.0.0-beta.1"`
