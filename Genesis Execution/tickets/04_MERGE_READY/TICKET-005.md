---
id: TICKET-005
ticket_id: TICKET-005
type: feature
title: Wire quality gates and execution scripts
phase: 5
status: MERGE_READY
state: 02_VERIFIED
owner_role: Execution Agent
issued_by: Coordinator Agent
issued_date: '2026-11-03'
problem_statement: Make quality checks deterministic and runnable through a single command set so Phase 5 execution evidence is consistent and governance-aligned.
ui_reference_mode: NOT_APPLICABLE
ui_reference_rationale: 'E2E sandbox: no Approved-View.html artifacts exist; UI behavior is governed by Phase 2 screen specs.'
scope_in:
  - Add npm scripts for typecheck, lint, build, unit tests, and headless E2E tests.
  - Configure CI workflow checks aligned with Phase 4 locked stack and project scripts.
  - Ensure script order and failure behavior are deterministic for completion evidence.
  - Document execution commands used for local and CI gates.
scope_out:
  - Feature development beyond quality gate wiring.
  - Infrastructure expansion beyond repo-local CI workflow and scripts.
  - Auth, multi-tenant, or external-service integrations.
acceptance_criteria:
  - '`npm run typecheck`, `npm run lint`, `npm run build`, `npm run test`, and headless E2E command are all defined and executable.'
  - CI workflow runs the same quality checks and fails on any non-zero result.
  - Script outputs are sufficient for completion contract evidence collection.
  - No out-of-scope feature changes are introduced while wiring gates.
acceptance_validation:
  - Local preflight command sequence exits 0 with deterministic ordering.
  - CI workflow configuration validates and runs required checks against the project.
  - Evidence package includes command outputs for all required quality gates.
implementation_plan:
  - Define and standardize package scripts for all required quality gates.
  - Add lint/typecheck/build/test configurations where missing.
  - Create or update CI workflow to run the same checks in deterministic order.
  - Validate local and CI command parity and capture outputs.
  - Update project runbook/docs with the final quality gate commands.
required_evidence:
  - Local command output logs for typecheck, lint, build, unit tests, and headless E2E tests.
  - CI workflow file and one successful run artifact reference.
  - Documentation snippet showing exact execution sequence.
completion_contract:
  - Provide command output evidence for all gate scripts with exit code 0.
  - Provide CI workflow evidence showing the same gate sequence is enforced.
  - Provide updated runbook/documentation evidence reflecting final script contracts.
updated_at: '2026-11-04T05:34:15.656Z'
---

# TICKET-005 - Wire quality gates and execution scripts

## Intent
Make quality checks deterministic and runnable through a single command set so Phase 5 execution evidence is consistent and governance-aligned.

## Objective
Finalize project scripts and CI checks for typecheck, lint, build, and test execution in alignment with Phase 4 locked tooling and Phase 5 evidence expectations. Keep scope focused on MVP reliability with no out-of-scope feature expansion.

## Scope
### In Scope
- Add npm scripts for typecheck, lint, build, unit tests, and headless E2E tests.
- Configure CI workflow checks aligned with Phase 4 locked stack and project scripts.
- Ensure script order and failure behavior are deterministic for completion evidence.
- Document execution commands used for local and CI gates.

### Out Of Scope
- Feature development beyond quality gate wiring.
- Infrastructure expansion beyond repo-local CI workflow and scripts.
- Auth, multi-tenant, or external-service integrations.

## Acceptance Criteria
- `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test`, and headless E2E command are all defined and executable.
- CI workflow runs the same quality checks and fails on any non-zero result.
- Script outputs are sufficient for completion contract evidence collection.
- No out-of-scope feature changes are introduced while wiring gates.

## Success Criteria
- Local preflight command sequence exits 0 with deterministic ordering.
- CI workflow configuration validates and runs required checks against the project.
- Evidence package includes command outputs for all required quality gates.

## Files Impacted
- strategic-directive-simple-to-do-app/package.json (MODIFIED)
- strategic-directive-simple-to-do-app/.github/workflows/genesis-application-ci.yml (NEW)
- strategic-directive-simple-to-do-app/README.md (MODIFIED)
- strategic-directive-simple-to-do-app/eslint.config.js (NEW)

## Governance And Constraints
- Must follow locked tooling from `Genesis Execution/specs/technical/ENVIRONMENT_LOCKED.md`.
- Must preserve MVP scope from strategic directive without adding product features.
- Must produce deterministic command evidence for Phase 5 completion contracts.

## Revision Traceability
- Source Revision Spec: none
- Revision Type: none
- Prior Evidence Impact: none

## Dependency Declaration
- Execution Type: sequential
- Depends On: TICKET-004

## Implementation Plan
1. Define and standardize package scripts for all required quality gates.
2. Add lint/typecheck/build/test configurations where missing.
3. Create or update CI workflow to run the same checks in deterministic order.
4. Validate local and CI command parity and capture outputs.
5. Update project runbook/docs with the final quality gate commands.

## Evidence
- Local command output logs for typecheck, lint, build, unit tests, and headless E2E tests.
- CI workflow file and one successful run artifact reference.
- Documentation snippet showing exact execution sequence.

## Completion Contract Requirements
- Provide command output evidence for all gate scripts with exit code 0.
- Provide CI workflow evidence showing the same gate sequence is enforced.
- Provide updated runbook/documentation evidence reflecting final script contracts.
