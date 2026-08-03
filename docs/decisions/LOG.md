# Architectural Decision Log (Informal Log)

| Date | Topic | Informal Decision Summary |
| :--- | :--- | :--- |
| 2026-08-03 | Deployment Strategy | Adopted Modular Monolith (v1) to deploy `api`, `websocket`, and `ai` as a single runtime while maintaining strict directory isolation for future microservice extraction. |
| 2026-08-03 | Rate Limiting Policy | Soft cap of 500,000 AI tokens/day per org; max 10 participants per public study room. |
| 2026-08-03 | Event Infrastructure | Reserved `@hub/events` package for in-process event bus dispatching (`RoomCreated`, `NotesGenerated`). |
