# API Specification — Version 1.0 (`/api/v1`)

## 1. Governance & Overview

All REST API endpoints are prefixed with `/api/v1`. Authentication relies on HTTP Bearer JWT tokens. Requests containing a payload MUST specify `Content-Type: application/json`.

---

## 2. Standard Response Wrapper Schema

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}
```

---

## 3. REST Endpoints

### 3.1 Authentication & User Management (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Register new student account | No |
| `POST` | `/api/v1/auth/login` | Authenticate & issue JWT token | No |
| `POST` | `/api/v1/auth/refresh` | Refresh expired access token | Yes |
| `GET` | `/api/v1/auth/me` | Fetch active user profile | Yes |

### 3.2 Study Rooms (`/api/v1/rooms`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/v1/rooms` | List active public study rooms | Yes |
| `POST` | `/api/v1/rooms` | Create a new study room | Yes |
| `GET` | `/api/v1/rooms/:id` | Fetch study room details & state | Yes |
| `POST` | `/api/v1/rooms/:id/join` | Join study room session | Yes |
| `DELETE` | `/api/v1/rooms/:id` | Close/Archive study room | Yes (Owner/Admin) |

### 3.3 AI Study Assistant Gateway (`/api/v1/ai`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/ai/summarize` | Generate smart note summary from text/transcript | Yes |
| `POST` | `/api/v1/ai/generate-quiz` | Synthesize practice MCQs from study content | Yes |
| `POST` | `/api/v1/ai/explain` | AI concept explainer with adjustable complexity | Yes |

---

## 4. WebSockets Event Contracts (`Socket.IO`)

Namespace: `/realtime/rooms`

### Inbound Events (Client -> Server)
- `room:join` `{ roomId: string, userId: string }`
- `room:leave` `{ roomId: string, userId: string }`
- `whiteboard:draw` `{ roomId: string, strokeData: object }`
- `chat:message` `{ roomId: string, message: string }`
- `timer:toggle` `{ roomId: string, action: 'start' | 'pause' | 'reset' }`

### Outbound Events (Server -> Client)
- `room:user-joined` `{ user: UserProfile }`
- `room:user-left` `{ userId: string }`
- `whiteboard:update` `{ strokeData: object }`
- `chat:broadcast` `{ id: string, sender: UserProfile, message: string, timestamp: string }`
- `timer:sync` `{ remainingSeconds: number, status: string }`
