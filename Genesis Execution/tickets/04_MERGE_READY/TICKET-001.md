---
id: TICKET-001
ticket_id: TICKET-001
type: feature
title: Implement core API routes and JSON persistence
phase: 5
status: MERGE_READY
state: 02_VERIFIED
owner_role: Execution Agent
security_scope: true
issued_by: Coordinator Agent
issued_date: '2026-11-03'
problem_statement: Deliver the backend foundation for task operations through API routes with durable local JSON persistence so all core actions are deterministic, validated, and restart-safe.
ui_reference_mode: NOT_APPLICABLE
ui_reference_rationale: 'E2E sandbox: no Approved-View.html artifacts exist; UI behavior is governed by Phase 2 screen specs.'
scope_in:
  - Implement API routes for `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/:id`, and `DELETE /api/tasks/:id`.
  - Implement JSON persistence at `data/tasks.json` with atomic write behavior.
  - Validate request payloads and return deterministic HTTP status and error responses.
  - Define task schema fields used by Phase 2 specs (`id`, `title`, `completed`, `createdAt`, `updatedAt`).
scope_out:
  - Authentication and authorization systems.
  - Multi-tenant data partitioning.
  - Cloud storage, external databases, and background jobs.
acceptance_criteria:
  - API routes respond with valid JSON and expected status codes for success and validation failures.
  - Task create/list/update/delete flows persist correctly to `data/tasks.json` across server restart.
  - Invalid input (empty title, malformed payload, missing task id) fails with deterministic error messages.
  - Atomic persistence prevents partial writes and preserves valid JSON format.
acceptance_validation:
  - '`npm run test` includes API route coverage and passes with exit code 0 for route behavior and persistence checks.'
  - Manual API verification confirms add/list/complete/reopen/delete behavior using local requests.
  - '`data/tasks.json` remains valid JSON after all mutation operations and restart.'
implementation_plan:
  - Define canonical task model and route contract with validation rules.
  - Implement storage helpers for read/write with atomic file replace.
  - Implement API route handlers and wire them into the HTTP server.
  - Add API route tests for positive and negative cases.
  - Verify restart persistence behavior and capture evidence.
required_evidence:
  - API request/response capture for all four routes (success and failure cases).
  - Test run output showing route and persistence checks passing.
  - Before/after `data/tasks.json` snapshots proving durability and update correctness.
completion_contract:
  - Provide command output for automated tests that validate API routes and persistence.
  - Provide route behavior evidence for create/list/update/delete and validation failures.
  - Provide persisted-file evidence confirming restart durability.
updated_at: '2026-11-04T01:05:55.023Z'
---

# TICKET-001 - Implement core API routes and JSON persistence

## Intent
Deliver the backend foundation for task operations through API routes with durable local JSON persistence so all core actions are deterministic, validated, and restart-safe.

## Objective
Build API routes for create, list, update-complete, and delete task operations with atomic local JSON file persistence and input validation. This enables the single-page MVP workflow from the strategic directive while preserving data across refreshes and restarts.

## Scope
### In Scope
- Implement API routes for `GET /api/tasks`, `POST /api/tasks`, `PATCH /api/tasks/:id`, and `DELETE /api/tasks/:id`.
- Implement JSON persistence at `data/tasks.json` with atomic write behavior.
- Validate request payloads and return deterministic HTTP status and error responses.
- Define task schema fields used by Phase 2 specs (`id`, `title`, `completed`, `createdAt`, `updatedAt`).

### Out Of Scope
- Authentication and authorization systems.
- Multi-tenant data partitioning.
- Cloud storage, external databases, and background jobs.

## Acceptance Criteria
- API routes respond with valid JSON and expected status codes for success and validation failures.
- Task create/list/update/delete flows persist correctly to `data/tasks.json` across server restart.
- Invalid input (empty title, malformed payload, missing task id) fails with deterministic error messages.
- Atomic persistence prevents partial writes and preserves valid JSON format.

## Success Criteria
- `npm run test` includes API route coverage and passes with exit code 0 for route behavior and persistence checks.
- Manual API verification confirms add/list/complete/reopen/delete behavior using local requests.
- `data/tasks.json` remains valid JSON after all mutation operations and restart.

## Files Impacted
- strategic-directive-simple-to-do-app/server/server.ts (MODIFIED)
- strategic-directive-simple-to-do-app/server/routes/tasks.ts (NEW)
- strategic-directive-simple-to-do-app/server/storage/tasks-storage.ts (NEW)
- strategic-directive-simple-to-do-app/server/types/task.ts (NEW)
- strategic-directive-simple-to-do-app/data/tasks.json (NEW)
- strategic-directive-simple-to-do-app/tests/api/tasks.api.test.ts (NEW)

## Governance And Constraints
- Must remain single-user local MVP per strategic directive; no auth system may be introduced.
- Must align with Phase 2 behavior expectations for task fields and completion semantics.
- Must produce verifiable evidence for completion contract and Phase 5 gates.

## Revision Traceability
- Source Revision Spec: none
- Revision Type: none
- Prior Evidence Impact: none

## Dependency Declaration
- Execution Type: sequential
- Depends On: none

## Implementation Plan
1. Define canonical task model and route contract with validation rules.
2. Implement storage helpers for read/write with atomic file replace.
3. Implement API route handlers and wire them into the HTTP server.
4. Add API route tests for positive and negative cases.
5. Verify restart persistence behavior and capture evidence.

## Evidence
- API request/response capture for all four routes (success and failure cases).
- Test run output showing route and persistence checks passing.
- Before/after `data/tasks.json` snapshots proving durability and update correctness.

## Completion Contract Requirements
- Provide command output for automated tests that validate API routes and persistence.
- Provide route behavior evidence for create/list/update/delete and validation failures.
- Provide persisted-file evidence confirming restart durability.

## Security Checklist
- [x] Fails closed when a required secret is missing - Not applicable: no required secret in local MVP
- [x] No hardcoded fallbacks for secrets, keys or credentials - Not applicable: no secrets/keys/credentials used
- [x] Authentication and authorization on every route - Not applicable: explicitly out of scope for this ticket
- [x] Tenant scoping on every query and route that reads or writes tenant data - Not applicable: single-user local app with no tenant model
- [x] No seeded admin accounts.
- [x] No debug routes.
