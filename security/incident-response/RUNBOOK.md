# Security Incident Response Runbook

## 1. Incident Classification
- **P1 (Critical)**: Secrets breach, unauthorized database access, active DDoS attack.
- **P2 (High)**: AI token budget rate limit anomaly, service degradation on WebSockets gateway.
- **P3 (Moderate)**: Minor auth failures, transient API errors.

## 2. Immediate Triage & Containment Procedures
1. Rotate affected credentials in `.env` / secret manager.
2. Invalidate active JWT refresh tokens by flushing Redis token blacklist keys.
3. Review audit logs in `packages/database` / PostgreSQL `audit_logs` table.
4. Deploy emergency patch to `services/api` / `services/websocket` via GitHub Actions pipeline.
