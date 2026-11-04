---
id: TICKET-003
ticket_id: TICKET-003
type: feature
title: Integrate API with UI state and error handling
phase: 5
status: MERGE_READY
state: 02_VERIFIED
owner_role: Execution Agent
security_scope: true
issued_by: Coordinator Agent
issued_date: '2026-11-03'
problem_statement: Connect UI and backend API routes into one deterministic workflow so user actions consistently persist and recover from failures without leaving the single-page experience.
ui_reference_mode: NOT_APPLICABLE
ui_reference_rationale: 'E2E sandbox: no Approved-View.html artifacts exist; UI behavior is governed by Phase 2 screen specs.'
scope_in:
  - Replace local-only UI task mutations with API-backed calls to task API routes.
  - Implement deterministic pending/success/error handling for add/toggle/delete.
  - Implement startup load/reload from API and preserve single-page UX behavior.
  - Ensure API failure handling is user-visible and recoverable without navigation changes.
scope_out:
  - New API features outside CRUD contract.
  - Authentication and authorization systems.
  - Multi-tenant data behavior.
acceptance_criteria:
  - Add, toggle, reopen, and delete actions call API routes and persist correctly.
  - API errors render user-visible status messages and preserve recoverable UI state.
  - UI remains keyboard-accessible and route-free while integrated with API.
  - Completed tasks remain ordered at the bottom after API-backed state updates.
acceptance_validation:
  - End-to-end tests pass for add, list, complete/reopen, delete, restart persistence, and error handling.
  - Manual verification confirms deterministic behavior under API route failures (validation and not-found).
  - No fallback local-only mutation path bypasses API route contract in production flow.
implementation_plan:
  - Implement typed API client wrapper for CRUD API routes.
  - Refactor UI actions to use API client with deterministic state transitions.
  - Add error-state rendering and retry behavior matching UX specifications.
  - Add integration and unit tests for API/UI interaction paths.
  - Verify end-to-end behavior and collect evidence artifacts.
required_evidence:
  - End-to-end test artifacts for full task lifecycle and error recovery.
  - Unit test output for API client behavior and error mapping.
  - Manual evidence demonstrating persistence across restart with API-backed flow.
completion_contract:
  - Provide headless E2E evidence for API-backed add/toggle/delete/reload behavior.
  - Provide unit and integration test output with pass status.
  - Provide failure-path evidence for validation and not-found responses.
updated_at: '2026-11-04T04:39:28.387Z'
---

# TICKET-003 - Integrate API with UI state and error handling

## Intent
Connect UI and backend API routes into one deterministic workflow so user actions consistently persist and recover from failures without leaving the single-page experience.

## Objective
Connect the task-list UI to backend API routes and implement deterministic success/error behavior for add, toggle, and delete actions. Ensure accessibility semantics, keyboard support, and resilient retry/recovery flows from the UX specifications.

## Scope
### In Scope
- Replace local-only UI task mutations with API-backed calls to task API routes.
- Implement deterministic pending/success/error handling for add/toggle/delete.
- Implement startup load/reload from API and preserve single-page UX behavior.
- Ensure API failure handling is user-visible and recoverable without navigation changes.

### Out Of Scope
- New API features outside CRUD contract.
- Authentication and authorization systems.
- Multi-tenant data behavior.

## Acceptance Criteria
- Add, toggle, reopen, and delete actions call API routes and persist correctly.
- API errors render user-visible status messages and preserve recoverable UI state.
- UI remains keyboard-accessible and route-free while integrated with API.
- Completed tasks remain ordered at the bottom after API-backed state updates.

## Success Criteria
- End-to-end tests pass for add, list, complete/reopen, delete, restart persistence, and error handling.
- Manual verification confirms deterministic behavior under API route failures (validation and not-found).
- No fallback local-only mutation path bypasses API route contract in production flow.

## Files Impacted
- strategic-directive-simple-to-do-app/src/main.ts (MODIFIED)
- strategic-directive-simple-to-do-app/src/api/tasks-client.ts (NEW)
- strategic-directive-simple-to-do-app/src/types/task.ts (NEW)
- strategic-directive-simple-to-do-app/tests/e2e/task-list-api-integration.spec.ts (NEW)
- strategic-directive-simple-to-do-app/tests/unit/tasks-client.test.ts (NEW)

## Governance And Constraints
- Must align with strategic directive simplicity and local-only boundaries.
- Must preserve founder-approved UX behavior from Phase 2 specs.
- Must preserve deterministic evidence expectations for Phase 5 validation.

## Revision Traceability
- Source Revision Spec: none
- Revision Type: none
- Prior Evidence Impact: none

## Dependency Declaration
- Execution Type: sequential
- Depends On: TICKET-001, TICKET-002

## Implementation Plan
1. Implement typed API client wrapper for CRUD API routes.
2. Refactor UI actions to use API client with deterministic state transitions.
3. Add error-state rendering and retry behavior matching UX specifications.
4. Add integration and unit tests for API/UI interaction paths.
5. Verify end-to-end behavior and collect evidence artifacts.

## Evidence
- End-to-end test artifacts for full task lifecycle and error recovery.
- Unit test output for API client behavior and error mapping.
- Manual evidence demonstrating persistence across restart with API-backed flow.

## Completion Contract Requirements
- Provide headless E2E evidence for API-backed add/toggle/delete/reload behavior.
- Provide unit and integration test output with pass status.
- Provide failure-path evidence for validation and not-found responses.

## Security Checklist
- [x] Fails closed when a required secret is missing - Not applicable: No required secret is used in this single-user local MVP.
- [x] No hardcoded fallbacks for secrets, keys or credentials - Not applicable: No secrets, keys, or credentials are used by these API routes.
- [x] Authentication and authorization on every route - Not applicable: Authentication and authorization are explicitly out of scope in the strategic directive.
- [x] Tenant scoping on every query and route that reads or writes tenant data - Not applicable: Application is single-user local and has no tenant model.
- [x] No seeded admin accounts.
- [x] No debug routes.
