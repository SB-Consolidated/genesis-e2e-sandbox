---
id: "TICKET-004"
ticket_id: "TICKET-004"
type: "feature"
title: "Add automated test coverage for MVP flows"
phase: 5
status: "VERIFIED"
state: "02_VERIFIED"
owner_role: "Execution Agent"
security_scope: true
issued_by: "Coordinator Agent"
issued_date: "2026-11-03"
problem_statement: "Establish deterministic automated verification for all MVP task flows so execution quality is measurable, repeatable, and governance-ready."
ui_reference_mode: "NOT_APPLICABLE"
ui_reference_rationale: "E2E sandbox: no Approved-View.html artifacts exist; UI behavior is governed by Phase 2 screen specs."
scope_in:
  - "Add unit tests for task model validation, ordering behavior, and API client/handler logic."
  - "Add headless Playwright tests for single-page add/list/complete/reopen/delete flows."
  - "Add persistence verification scenarios across refresh and restart."
  - "Add deterministic test fixtures and scripts for repeatable local runs."
scope_out:
  - "New user-facing features outside approved MVP flows."
  - "Authentication and authorization systems."
  - "Non-headless-only acceptance evidence as a replacement for headless tests."
acceptance_criteria:
  - "Unit tests cover task input validation, completion toggling, and ordering rules."
  - "Playwright headless tests cover add/list/complete/reopen/delete and completed-at-bottom behavior."
  - "Tests verify no separate add/detail route behavior remains true."
  - "Tests verify persistence across refresh and restart for API-backed task state."
  - "Local test command suite is repeatable with stable pass/fail outcomes."
acceptance_validation:
  - "`npm run test` exits 0 with required unit coverage for MVP behavior."
  - "`npm run ui:e2e` or equivalent headless Playwright command exits 0 and validates MVP flows."
  - "Test artifacts (report/trace/screenshot on failure path) are generated per configured behavior."
implementation_plan:
  - "Define test matrix from strategic directive and Phase 2 acceptance criteria."
  - "Implement unit tests for task logic and API behavior."
  - "Implement headless Playwright scenarios for end-to-end flows."
  - "Add persistence and error-path scenarios for restart/refresh behavior."
  - "Validate repeatability with consecutive local runs and capture evidence."
required_evidence:
  - "Unit test run output proving coverage of MVP logic and API behavior."
  - "Playwright headless run output with scenario-level pass status."
  - "Persistence scenario evidence for refresh and restart conditions."
completion_contract:
  - "Provide command outputs for unit and headless E2E test suites with exit code 0."
  - "Provide test matrix mapping from acceptance criteria to implemented test cases."
  - "Provide evidence artifacts required by configured Playwright reporting behavior."
---

# TICKET-004 - Add automated test coverage for MVP flows

## Intent
Establish deterministic automated verification for all MVP task flows so execution quality is measurable, repeatable, and governance-ready.

## Objective
Create unit and headless Playwright tests for add, list, complete/reopen, delete, ordering, and persistence across restart/refresh behavior. Include API routes verification coverage in test scenarios and enforce repeatable local pass criteria.

## Scope
### In Scope
- Add unit tests for task model validation, ordering behavior, and API client/handler logic.
- Add headless Playwright tests for single-page add/list/complete/reopen/delete flows.
- Add persistence verification scenarios across refresh and restart.
- Add deterministic test fixtures and scripts for repeatable local runs.

### Out Of Scope
- New user-facing features outside approved MVP flows.
- Authentication and authorization systems.
- Non-headless-only acceptance evidence as a replacement for headless tests.

## Acceptance Criteria
- Unit tests cover task input validation, completion toggling, and ordering rules.
- Playwright headless tests cover add/list/complete/reopen/delete and completed-at-bottom behavior.
- Tests verify no separate add/detail route behavior remains true.
- Tests verify persistence across refresh and restart for API-backed task state.
- Local test command suite is repeatable with stable pass/fail outcomes.

## Success Criteria
- `npm run test` exits 0 with required unit coverage for MVP behavior.
- `npm run ui:e2e` or equivalent headless Playwright command exits 0 and validates MVP flows.
- Test artifacts (report/trace/screenshot on failure path) are generated per configured behavior.

## Files Impacted
- strategic-directive-simple-to-do-app/tests/unit/tasks-core.test.ts (NEW)
- strategic-directive-simple-to-do-app/tests/unit/tasks-api.test.ts (NEW)
- strategic-directive-simple-to-do-app/tests/e2e/mvp-task-flows.spec.ts (NEW)
- strategic-directive-simple-to-do-app/tests/e2e/persistence.spec.ts (NEW)
- strategic-directive-simple-to-do-app/playwright.config.ts (MODIFIED)
- strategic-directive-simple-to-do-app/package.json (MODIFIED)

## Governance And Constraints
- Must align with Phase 2 approved UX behavior and strategic directive constraints.
- Headless browser evidence is mandatory for UI behavior verification.
- Test suite must prioritize deterministic outputs suitable for completion contracts.

## Revision Traceability
- Source Revision Spec: none
- Revision Type: none
- Prior Evidence Impact: none

## Dependency Declaration
- Execution Type: sequential
- Depends On: TICKET-001, TICKET-002, TICKET-003

## Implementation Plan
1. Define test matrix from strategic directive and Phase 2 acceptance criteria.
2. Implement unit tests for task logic and API behavior.
3. Implement headless Playwright scenarios for end-to-end flows.
4. Add persistence and error-path scenarios for restart/refresh behavior.
5. Validate repeatability with consecutive local runs and capture evidence.

## Evidence
- Unit test run output proving coverage of MVP logic and API behavior.
- Playwright headless run output with scenario-level pass status.
- Persistence scenario evidence for refresh and restart conditions.

## Completion Contract Requirements
- Provide command outputs for unit and headless E2E test suites with exit code 0.
- Provide test matrix mapping from acceptance criteria to implemented test cases.
- Provide evidence artifacts required by configured Playwright reporting behavior.

## Security Checklist
- [x] Fails closed when a required secret is missing - Not applicable: No required secret is used in this single-user local MVP.
- [x] No hardcoded fallbacks for secrets, keys or credentials - Not applicable: No secrets, keys, or credentials are used in test flows.
- [x] Authentication and authorization on every route - Not applicable: Authentication and authorization are out of scope in strategic directive.
- [x] Tenant scoping on every query and route that reads or writes tenant data - Not applicable: Application has no tenant model.
- [x] No seeded admin accounts.
- [x] No debug routes.
