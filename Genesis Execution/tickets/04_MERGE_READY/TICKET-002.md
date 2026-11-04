---
id: TICKET-002
ticket_id: TICKET-002
type: feature
title: Build single-page task list interface
phase: 5
status: MERGE_READY
state: 02_VERIFIED
owner_role: Execution Agent
issued_by: Coordinator Agent
issued_date: '2026-11-03'
problem_statement: Implement the founder-approved single-page task UX so users can manage tasks quickly on mobile and desktop with minimal friction.
ui_reference_mode: NOT_APPLICABLE
ui_reference_rationale: 'E2E sandbox: no Approved-View.html artifacts exist; UI behavior is governed by Phase 2 screen specs.'
scope_in:
  - Render one-screen layout with header, inline add form, status text, and task list rows.
  - Implement checkbox completion toggle, delete icon action, and completed-at-bottom ordering.
  - Implement no-route navigation model (`#/add` and task detail route are absent).
  - Apply required accessibility semantics and touch-target sizing from Phase 2 specs.
scope_out:
  - Backend API wiring (handled by TICKET-003).
  - Authentication, accounts, and cloud sync.
  - Nice-to-have features (filters, due dates, labels, analytics).
acceptance_criteria:
  - UI has inline add field at top and supports Enter submit behavior.
  - Each task row includes checkbox, title text, and delete icon without confirmation dialog.
  - Completed tasks always render below incomplete tasks after add/toggle/delete operations.
  - No separate add or detail route is present.
  - Keyboard access and core accessibility semantics work as specified.
acceptance_validation:
  - '`npm run dev` renders single-page interface with required elements and interactions.'
  - UI behavior matches Screen-001, Screen-002, and Screen-003 acceptance criteria for layout and interactions.
  - Headless browser check confirms single-page interaction paths and ordering behavior.
implementation_plan:
  - Build base single-page structure and inline add row.
  - Implement row rendering, completion visuals, and delete icon interaction.
  - Enforce completed-to-bottom sorting in UI state handling.
  - Apply responsive and accessibility requirements from UX specs.
  - Add headless UI test coverage for layout and core interactions.
required_evidence:
  - Screenshots or trace from headless browser run showing single-page layout and interactions.
  - Test output proving ordering behavior and delete-without-confirmation behavior.
  - Accessibility check notes for keyboard navigation and semantic labels.
completion_contract:
  - Provide headless browser evidence for add/complete/delete and ordering behavior.
  - Provide artifact evidence that no separate add/detail route exists.
  - Provide test output with pass status for UI interaction flows.
updated_at: '2026-11-04T03:22:54.252Z'
---

# TICKET-002 - Build single-page task list interface

## Intent
Implement the founder-approved single-page task UX so users can manage tasks quickly on mobile and desktop with minimal friction.

## Objective
Implement the mobile-friendly single-page UI with top inline add field, checkbox completion toggle, and delete icon without confirmation. Completed tasks must always sort to the bottom with no separate add or detail route.

## Scope
### In Scope
- Render one-screen layout with header, inline add form, status text, and task list rows.
- Implement checkbox completion toggle, delete icon action, and completed-at-bottom ordering.
- Implement no-route navigation model (`#/add` and task detail route are absent).
- Apply required accessibility semantics and touch-target sizing from Phase 2 specs.

### Out Of Scope
- Backend API wiring (handled by TICKET-003).
- Authentication, accounts, and cloud sync.
- Nice-to-have features (filters, due dates, labels, analytics).

## Acceptance Criteria
- UI has inline add field at top and supports Enter submit behavior.
- Each task row includes checkbox, title text, and delete icon without confirmation dialog.
- Completed tasks always render below incomplete tasks after add/toggle/delete operations.
- No separate add or detail route is present.
- Keyboard access and core accessibility semantics work as specified.

## Success Criteria
- `npm run dev` renders single-page interface with required elements and interactions.
- UI behavior matches Screen-001, Screen-002, and Screen-003 acceptance criteria for layout and interactions.
- Headless browser check confirms single-page interaction paths and ordering behavior.

## Files Impacted
- strategic-directive-simple-to-do-app/index.html (MODIFIED)
- strategic-directive-simple-to-do-app/src/main.ts (MODIFIED)
- strategic-directive-simple-to-do-app/src/styles.css (MODIFIED)
- strategic-directive-simple-to-do-app/tests/e2e/task-list-ui.spec.ts (NEW)

## Governance And Constraints
- Must remain single-page and local-only per strategic directive and Phase 2 approvals.
- Must not introduce separate add/detail navigation routes.
- Must preserve simple interaction model and no-confirmation delete behavior.

## Revision Traceability
- Source Revision Spec: none
- Revision Type: none
- Prior Evidence Impact: none

## Dependency Declaration
- Execution Type: parallel
- Depends On: none

## Implementation Plan
1. Build base single-page structure and inline add row.
2. Implement row rendering, completion visuals, and delete icon interaction.
3. Enforce completed-to-bottom sorting in UI state handling.
4. Apply responsive and accessibility requirements from UX specs.
5. Add headless UI test coverage for layout and core interactions.

## Evidence
- Screenshots or trace from headless browser run showing single-page layout and interactions.
- Test output proving ordering behavior and delete-without-confirmation behavior.
- Accessibility check notes for keyboard navigation and semantic labels.

## Completion Contract Requirements
- Provide headless browser evidence for add/complete/delete and ordering behavior.
- Provide artifact evidence that no separate add/detail route exists.
- Provide test output with pass status for UI interaction flows.
