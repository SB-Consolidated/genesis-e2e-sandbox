# Phase 5: Execution And Automation

**Version:** v0.9.7  
**Status:** Authoritative

## Purpose

Phase 5 governs ticketed execution, dependency-aware authorization, implementation, evidence review, and merge completion.

## Required Invariants

- Tickets start in `01_DRAFT`.
- Ticket IDs use `TICKET-NNN`.
- Intent Overseer exclusively controls `01_DRAFT -> 02_VERIFIED`.
- Coordinator owns authorization and lifecycle progression after validation.
- Execution Agent implements but does not own state transitions.
- `ticket-state.log` is the canonical transition ledger.
- Completion contracts are required before merge review.

## Canonical Flow

1. Coordinator creates tickets in `Genesis Execution/tickets/01_DRAFT/`.
2. Intent Overseer validates and moves approved tickets to `02_VERIFIED/`.
3. Coordinator generates or updates `DEPENDENCY-MATRIX.json`.
4. Coordinator writes `execution-authorization.json`.
5. Governed automation or Coordinator-controlled workflow moves authorized tickets to `03_EXECUTING`.
6. Execution Agent implements work and produces evidence.
7. Completion contract is validated.
8. Governed automation or Coordinator-controlled workflow moves the ticket to `04_MERGE_READY`.
9. Coordinator verifies PR checks, enables auto-merge, and verifies the PR merged (auto-merge after required checks pass; a high-risk Track A PR also needs the Founder's `approved-by-founder` label, which Coordinator never applies). Coordinator then verifies branch deletion and moves the ticket to `05_COMPLETE`.

When Phase 6 founder review requests changes, Coordinator must re-enter this flow from new `01_DRAFT` tickets derived from an approved revision spec. Existing tickets may be superseded or extended only through that governed revision path.

## Authorization Model

- Authorization file: `Genesis Execution/governance/execution-authorization.json`.
- Supports sequential and parallel ticket authorization.
- Must include dependency status and execution type context.
- Authorization grants permission to execute work, not permission to alter governance or workflow ownership.

## Dependency Model

- Dependency matrix file: `Genesis Execution/tickets/DEPENDENCY-MATRIX.json`.
- Each ticket entry must declare:
  - `id`
  - `name`
  - `dependencies`
  - `executionType`
- `executionType` values are `sequential` or `parallel`.
- A ticket is assignable only when all dependencies are in `05_COMPLETE`.

## Issue Resolution Model

- Execution blockers create `issues/[ticket-id].issue.json`.
- Coordinator resolves Tier 1 and Tier 2 issues with `guidance/[ticket-id].guidance.json`.
- Tier 3 issues create `escalation/[ticket-id].escalation.json` for founder decision.
- Retry resumes from the same ticket and same lifecycle lane.

## HOLD Semantics

- HOLD is a pause condition only.
- It may suspend authorization or merge action.
- It does not create a replacement state folder or transfer authority to Execution Agent.

## Review Lane Rules

- `04_MERGE_READY` is the only merge lane state.
- If evidence is incomplete, the ticket remains in `04_MERGE_READY` or returns to governed execution handling without inventing a new lane.
- Re-review after changes remains in the same merge lane semantics.

## Browser, Review, And Session Policy

- Browser tooling may capture deterministic evidence for UI and founder review, especially in Phase 6.
- Copilot code review, skills, and read-only MCP may inspect diffs, PRs, logs, and artifacts.
- Session-aware workflows and worktrees are permitted, but each operating surface must bind to a specific ticket or governance task.

## Phase 6 Revision Re-entry Rules

- Phase 6 changes are not executed from comments alone; they are decomposed from an approved revision spec.
- Each refinement ticket must reference its originating revision spec identifier.
- Coordinator must update `DEPENDENCY-MATRIX.json` when revision-generated tickets add or change sequencing.
- If a revision invalidates prior completion evidence, Coordinator must reopen the affected execution lane through new governed tickets rather than editing historical completion artifacts in place.

## Explicitly Forbidden

- `00_BACKLOG` as a normative lifecycle state.
- Execution Agent manually advancing tickets as a matter of authority.
- Blocker markdown tickets or `06_BLOCKED` folders.
- Completing a ticket without a completion contract, merged PR evidence, and branch cleanup evidence.

---

## Gate to Next Phase
- Coordinator generates Phase 5 completion handoff per HANDOFF_TEMPLATES.md section 11 after all tickets are in 05_COMPLETE, all PRs merged, and ticket-state.log is complete.
- Strategy validates alignment to Phase 1 intent; Founder performs Phase 6 review.
