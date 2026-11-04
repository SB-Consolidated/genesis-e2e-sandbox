---
id: TICKET-006
ticket_id: TICKET-006
type: feature
title: Unify startup workflow for local review and CI
phase: 5
status: VERIFIED
state: 02_VERIFIED
owner_role: Execution Agent
security_scope: true
issued_by: Coordinator Agent
issued_date: '2026-11-04'
problem_statement: The local app cannot be started through a single supported command because the UI launches without the required API server, causing 502 responses while task data loads and task creation requests fail during founder review and CI validation.
ui_reference_mode: NOT_APPLICABLE
ui_reference_rationale: 'UI behavior is governed by the Phase 2 specification and verified through headless Playwright checks; no approved UI artifact is required for this startup workflow fix.'
scope_in:
  - Add a single command that starts the API and UI together for local development.
  - Add a production startup path that serves the built app and required backend service.
  - Update the README with exact commands and expected URLs.
  - Ensure the same startup path is exercised by end-to-end validation.
  - Remove the 502 startup failure path during local review and CI validation.
scope_out:
  - Redesigning the to-do data model or product experience beyond startup reliability.
  - Unrelated refactors or cleanup outside the startup and validation workflow.
  - Feature work outside the local review and startup contract.
acceptance_criteria:
  - '`npm run dev` starts both the API server and the UI without requiring manual separate commands.'
  - 'The app is reachable at the expected local URL without `Unable to load tasks: Request failed with status 502` during startup.'
  - 'Task add and task completion flows work through the same startup path used by review and CI.'
  - '`npm start` provides the production equivalent startup flow for the built app.'
  - 'The README documents the exact startup commands and expected behavior.'
  - 'The Playwright E2E flow exercises the same startup path and passes in local and CI validation.'
acceptance_validation:
  - Local startup command is run from a clean shell and both services respond on their expected ports.
  - Browser validation confirms the task list loads and task creation succeeds without 502s.
  - End-to-end Playwright validation runs against the combined startup path and exits successfully.
implementation_plan:
  - Inspect the Vite proxy and server startup contract to confirm the required backend and frontend ports.
  - Add a single dev startup command that launches the API server before the UI.
  - Add a production `npm start` path that runs the backend and preview build path together.
  - Update the README with exact commands and expected URLs.
  - Validate local review and E2E behavior from the combined startup flow.
required_evidence:
  - Local startup output showing both the API and UI come up from `npm run dev`.
  - Browser or CLI evidence confirming `/api/tasks` is reachable without 502 responses.
  - Playwright output proving the task flow passes through the same startup path.
  - Final README documentation for local and production startup commands.
completion_contract:
  - Provide start-up proof for both the API and UI during local review.
  - Provide browser evidence that task list loading and add-task flows work without 502 errors.
  - Provide E2E evidence using the same startup path and required ports.
  - Provide README evidence that the startup workflow is documented and reproducible.
updated_at: '2026-11-04T07:30:00Z'
---

# TICKET-006 - Unify startup workflow for local review and CI

## Objective
The founder review flow is blocked because the local app cannot be started through a single supported command: `npm run dev` only launches Vite, while the API server at `server/server.ts` on port 3000 remains offline. This causes `502` responses when the UI tries to load tasks and add new items. The fix is to provide a single developer command that starts both the API and UI together, add a matching production `npm start` path, document the workflow in the README, and verify the same startup path with an end-to-end test so the app can be reviewed reliably.

## Scope
### In Scope
- Add a single command that starts the API server and the UI together for local development
- Add a production startup path that serves the built app and required backend service
- Update the project README with the exact commands and expected URLs
- Add or adjust an E2E test that runs against the same startup command used by developers and reviewers
- Ensure task loading and task creation work without `502` responses during local review

### Out Of Scope
- Redesigning the task data model or app UX beyond startup and review readiness
- Unrelated refactors or cleanup outside the startup and validation workflow
- Any non-review feature work that is not needed to satisfy the local app startup and E2E contract

## Acceptance Criteria
- `npm run dev` starts both the API server and the UI without requiring manual separate commands
- The app is reachable at the expected local URL without the `Unable to load tasks: Request failed with status 502` error during startup
- Task add and task completion flows work through the same startup path used in local review
- `npm start` provides the production equivalent startup flow for the built app
- The README documents the exact command sequence and expected behavior
- The E2E test exercises the same startup path and passes in CI/local validation

## Files Impacted
- strategic-directive-simple-to-do-app/package.json (MODIFIED)
- strategic-directive-simple-to-do-app/README.md (MODIFIED)
- strategic-directive-simple-to-do-app/server/server.ts (MODIFIED if startup wiring is needed)
- strategic-directive-simple-to-do-app/vite.config.ts (MODIFIED if proxy/startup integration requires update)
- strategic-directive-simple-to-do-app/tests/e2e/ (NEW or MODIFIED)
- strategic-directive-simple-to-do-app/scripts/ or supporting startup config files (NEW or MODIFIED if needed)

## Governance And Constraints
- Must preserve the existing developer review workflow and allow a single command for local verification
- Must not bypass the project’s testing and E2E requirements
- Must keep the UI and API aligned to the same local port expectations used by the review panel
- All startup behavior must be documented in a way that founders and reviewers can reproduce without manual setup steps
- The fix must follow the same Phase 5 governance pattern: ticketed work, validation, completion contract, and evidence before merge

## Revision Traceability
- Source Revision Spec: REVISION-SPEC-001
- Revision Type: corrective
- Prior Evidence Impact: update completion evidence

## Dependency Declaration
- Execution Type: sequential
- Depends On: none

## Implementation Plan
1. Inspect the current Vite proxy and backend server configuration to confirm the required API port and startup contract.
2. Add a single local startup command that launches the API server and UI together, and ensure a production `npm start` path exists for the built app.
3. Update the README with the exact commands, expected ports, and reviewer workflow for local app startup.
4. Add or update the E2E test to run through the same command path rather than starting the UI in isolation.
5. Validate the application from a fresh local run and record evidence that task loading and add flows work without 502 responses.

## Completion Contract Requirements
- Local startup evidence: `npm run dev` starts both the backend API and UI successfully
- Browser verification: task list loads without 502 and add-task flow succeeds end-to-end
- E2E evidence: the updated test runs against the same startup command and exits successfully
- Documentation evidence: README contains the final local and production startup instructions

## Security Checklist
- [x] Not applicable: this project does not use authentication, secrets, tenant data, or admin accounts.
- [x] Not applicable: no secrets or credentials are stored in code or config for local task review.
- [x] Not applicable: there is no user authentication or authorization model in this local to-do app.
- [x] Not applicable: the app has no tenant-scoped data model or multi-tenant route access pattern.
- [x] Not applicable: no seeded admin accounts or privileged default users are introduced.
- [x] Not applicable: no debug routes or privileged developer endpoints are added as part of this fix.
