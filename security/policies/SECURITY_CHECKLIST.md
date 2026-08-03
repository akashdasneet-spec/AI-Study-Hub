# Security & Compliance Verification Checklist

## 1. Authentication & Session Security
- [x] Passwords hashed using bcrypt / Argon2id with high cost factor.
- [x] JWT access tokens expire in 15 minutes; refresh tokens stored in HTTP-only secure cookies.
- [x] Role-Based Access Control (RBAC) enforced on administrative routes.

## 2. Data Encryption & Secrets
- [x] Mandatory TLS 1.3 / HTTPS for all in-transit REST and WebSockets traffic.
- [x] Environment secrets strictly isolated from client-side bundles.
- [x] Input sanitization and Zod contract schema validation enforced on all incoming API requests.

## 3. Infrastructure & Resilience
- [x] OWASP Top 10 threat mitigation (XSS, CSRF, Injection).
- [x] Redis rate-limiting configured for AI endpoints (500k token/day soft cap).
- [x] Security Incident Response Runbook documented in `security/incident-response/RUNBOOK.md`.
