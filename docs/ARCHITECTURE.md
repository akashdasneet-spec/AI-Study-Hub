# Architecture Blueprint & System Design

## 1. System Architecture Diagram

```mermaid
flowchart TB
    subgraph Clients
        Web[Next.js Web App - apps/web]
        Admin[Next.js Admin - apps/admin]
    end

    subgraph API Gateway & Service Layer
        Gateway[NestJS API Gateway - apps/api]
        AuthModule[Auth Module]
        RoomModule[Study Room Module]
        AIModule[AI Gateway Module]
    end

    subgraph Data & Messaging Infrastructure
        Postgres[(PostgreSQL Primary DB)]
        Redis[(Redis Cache & Pub/Sub)]
        Sockets[Socket.IO Server]
    end

    subgraph External AI Services
        OpenAI[OpenAI Primary API]
        Gemini[Google Gemini Fallback API]
    end

    Web -->|HTTP / REST| Gateway
    Web -->|WebSockets| Sockets
    Admin -->|HTTP / REST| Gateway

    Gateway --> AuthModule
    Gateway --> RoomModule
    Gateway --> AIModule

    RoomModule --> Sockets
    Sockets --> Redis

    AuthModule --> Postgres
    RoomModule --> Postgres

    AIModule -->|1. Check Cache| Redis
    AIModule -->|2. Primary Request| OpenAI
    AIModule -->|3. Fallback on 5xx/Timeout| Gemini
```

---

## 2. Realtime WebSockets Collaboration Sequence

```mermaid
sequenceDiagram
    autonumber
    actor Student1 as Student A
    actor Student2 as Student B
    participant WS as Socket.IO Server
    participant Redis as Redis Pub/Sub
    participant DB as PostgreSQL

    Student1->>WS: Emit `room:join` (roomId: 101)
    WS->>Redis: Subscribe socket connection to `room:101`
    WS->>DB: Log room participant entry
    WS-->>Student2: Broadcast `room:user-joined` (Student A)

    Student1->>WS: Emit `whiteboard:draw` (vector stroke data)
    WS->>Redis: Publish stroke payload to `room:101`
    Redis-->>WS: Deliver message to subscriber sockets
    WS-->>Student2: Emit `whiteboard:update` (vector stroke data)
```

---

## 3. Dual-Model AI Fallback Gateway Sequence

```mermaid
sequenceDiagram
    autonumber
    actor User as Client Application
    participant AIMod as NestJS AI Module
    participant Redis as Redis Cache
    participant OpenAI as OpenAI API (OPENAI_MODEL)
    participant Gemini as Gemini API (GEMINI_MODEL)

    User->>AIMod: POST /api/v1/ai/generate-quiz
    AIMod->>Redis: GET prompt_hash
    alt Cache Hit
        Redis-->>AIMod: Return cached quiz output
        AIMod-->>User: HTTP 200 (cached: true)
    else Cache Miss
        AIMod->>OpenAI: Request completions (timeout: 5000ms)
        alt OpenAI Success
            OpenAI-->>AIMod: Return completion payload
        else OpenAI Timeout / 5xx Error
            AIMod->>Gemini: Fallback Request completions
            Gemini-->>AIMod: Return fallback payload
        end
        AIMod->>Redis: SET prompt_hash (TTL: 86400s)
        AIMod-->>User: HTTP 200 (cached: false)
    end
```

---

## 4. Package Import Rules & Boundaries

```
apps/web ----> packages/ui
apps/web ----> packages/types
apps/web ----> packages/utils
apps/admin --> packages/ui
apps/admin --> packages/types
apps/admin --> packages/utils
apps/api ----> packages/types
apps/api ----> packages/utils
packages/ui --> packages/config
```
- **Constraint**: `apps/*` modules are completely isolated and cannot import from sibling apps.
- **Constraint**: Shared state & schema DTOs are defined strictly in `packages/types`.
