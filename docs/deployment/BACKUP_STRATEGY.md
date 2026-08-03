# Database Backup & Disaster Recovery Strategy

## 1. PostgreSQL Persistence & Automated Backups
- **Frequency**: Daily automated `pg_dump` snapshots; continuous WAL archiving for Point-In-Time Recovery (PITR).
- **Retention Policy**: Daily backups retained for 30 days; weekly backups retained for 12 months.
- **Storage Target**: Off-site S3-compatible encrypted bucket with Lifecycle Object Lock.

## 2. Redis Cache & State Persistence Strategy
- **Persistence Mode**: Dual RDB (snapshotting every 15m) + AOF (Append-Only File with `everysec` fsync).
- **Eviction Policy**: `volatile-lru` for prompt caching keys (`ai:*`); zero eviction for persistent session states.

## 3. Disaster Recovery & Migration Rollback Procedure
1. **Rollback Migration**: Execute `pnpm --filter @hub/database prisma migrate resolve --rolled-back <migration_name>`.
2. **Database Restore**: Execute `pg_restore -U postgres -d aistudyhub /backups/latest.dump`.
3. **Verification**: Run health check endpoints (`/health/readiness`) and typecheck validations.
