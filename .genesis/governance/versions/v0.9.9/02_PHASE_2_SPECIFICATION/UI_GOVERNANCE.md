```markdown
# UI Governance (Consolidated)

**Status:** Authoritative (Consolidated from UI_BEHAVIOR_GATE.md and UI_BEHAVIOR_GATE_POLICY.md)
**Authority:** Genesis Foundational Constitution, Operating Standards
**Scope:** All UI-touching tickets in Genesis v0.6A

---

## UX Constraints (Hard Gates — Blocking)

### Data Sourcing Integrity
UI pages MUST source data from authoritative layers:
- Engine/database via service client
- Deterministic seed scripts (e.g., `ui:seed`)
- Explicit demo mode with visible banner

Prohibited in UI service layer (`src/ui/services/**`):
- Hardcoded portfolio/trade/mock data
- Embedded mock objects in TS/JS
- Stale transpiled `.js` stubs with placeholder UI

**Violation Response:** Execution enters Authorized-but-Paused state at Ticket-Level scope. Remediate by removing prohibited sources and restoring authoritative data paths.

### Accessibility Minimums
Each route MUST render:
- Accessible main landmark (`<main role="main">`)
- Visible page header matching route name
- Stable, role-based selectors for E2E

**Violation Response:** Authorized-but-Paused (Ticket-Level). Fix accessibility and re-run gates.

### Deterministic E2E Gate (Pre-Merge)
- Technology: Playwright E2E in **headless mode** (default and required)
- Required commands: `npm run ui:e2e` (headless - MANDATORY), `npm run ui:e2e:headed` (debug only)
- **Headless Enforcement:** All UI tickets MUST pass Playwright tests in headless mode before PR merge
- **Worker Policy:** Parallel workers are allowed for isolated suites; shared-state flows must run serially or with `workers: 1`
- Artifacts: Screenshots, traces, HTML report on failure
- Integration: Run in preflight (after `ui:seed`, before declaring success)

Required assertions per primary routes (Today, Portfolio, Trade, History, Rules, Alerts):
1. Navigate via sidebar link
2. Page renders (no blank/error state)
3. No placeholders like "coming soon"
4. Main content visible or known empty-state message
5. Consistent header/title

**Gate Failure:** Execution enters Authorized-but-Paused state at Ticket-Level scope. Provide artifacts and remediate.

---

## UX Guidance (Non-Blocking)
- Prefer role-based selectors and semantic HTML for resilience
- Document known instability warnings and waivers with rationale
- Keep UI read-only over engine/DB to preserve trust model

Guidance deviations do not block merge but must be documented.

---

## Configuration References
- `playwright.config.ts`: Vite webServer on port 5173 (`strictPort`)
- Tests: `tests/e2e/nav-and-render.spec.ts`
- Scripts: `npm run ui:e2e`, `npm run ui:e2e:headed`

---

## Enforcement Notes
- Preflight gate must PASS before PR merge
- All gating clauses use standardized halt semantics: "Authorized-but-Paused" with explicit scope (Ticket-Level default)
- Conflict resolution governed by GOVERNANCE_RESOLUTION_PRECEDENCE.md
- CI should use an explicit worker-count standard rather than unlimited machine-default concurrency for merge evidence.

---

## Deprecations
This document supersedes:
- UI_BEHAVIOR_GATE.md
- UI_BEHAVIOR_GATE_POLICY.md

Those documents are deprecated and must not introduce additional rules.

```

## Screen Specification Standards

### Purpose
Defines the required content and structure for UX screen specifications created during Phase 2.

### Specification.md Requirements

Each `Screen-{n}-{name}/Specification.md` must include:

#### 1. Screen Overview
- **Screen Name:** Clear, descriptive name
- **Purpose:** What this screen accomplishes for users
- **User Goals:** What users are trying to achieve
- **Priority:** Critical / High / Medium / Low

#### 2. Navigation Flows
- **Entry Points:** How users arrive at this screen (which screens link here)
- **Exit Paths:** Where users can go from here (navigation options)
- **Deep Links:** Any direct URL access patterns

#### 3. UI Components and Layout
- **Layout Structure:** Header, content area, footer, sidebars
- **Components:** List all UI elements (forms, buttons, tables, cards, etc.)
- **Visual Hierarchy:** Primary, secondary, tertiary elements
- **Responsive Behavior:** Mobile, tablet, desktop considerations

#### 4. Data Requirements
- **Data Displayed:** What information is shown to users
- **Data Collected:** What information users input
- **Data Sources:** APIs, databases, local storage
- **Real-time Updates:** Any live data or websocket needs

#### 5. Interactions and State Changes
- **User Actions:** Click, type, drag, scroll behaviors
- **State Transitions:** Loading, success, error states
- **Feedback:** Visual indicators, animations, notifications
- **Conditional Logic:** Show/hide elements based on conditions

#### 6. Validation Rules
- **Input Validation:** Required fields, format requirements, length limits
- **Business Rules:** Domain-specific validation
- **Client-side vs Server-side:** Where validation occurs

#### 7. Error Handling
- **Error States:** Network errors, validation errors, server errors
- **Error Messages:** User-friendly messaging
- **Recovery Actions:** What users can do when errors occur

#### 8. Acceptance Criteria
- **Definition of Done:** How we know the screen is complete
- **Test Scenarios:** Key user flows to validate
- **Edge Cases:** Unusual situations to handle

### Questions.md Format

Each `Screen-{n}-{name}/Questions.md` should contain:

#### 1. Open Questions
Questions the Strategy Agent needs founder to answer:
- **Q:** [Specific question about functionality]
- **Context:** [Why this question matters]
- **Options:** [Possible approaches if applicable]

#### 2. Design Alternatives
Multiple approaches for founder to choose:
- **Option A:** [Description, pros, cons]
- **Option B:** [Description, pros, cons]
- **Recommendation:** [Agent's suggestion with reasoning]

#### 3. Technical Constraints
Questions about technical limitations or requirements:
- Platform constraints (browser, mobile, etc.)
- Performance requirements
- Integration requirements
- Security considerations

#### 4. Clarifications Needed
Ambiguities from Phase 1 strategic directive:
- Features needing more detail
- User flows needing clarification
- Data models needing definition

### Quality Standards

**Completeness:** All 8 sections of Specification.md must be addressed
**Clarity:** Non-technical founder should understand specifications
**Actionability:** Execution Agent can implement from specification alone
**Testability:** Acceptance criteria must be measurable/verifiable
**Traceability:** Must link back to Phase 1 strategic directive requirements

### Review Process

1. Strategy Agent creates initial specification + questions
2. Founder reviews via Phase Workflow UI
3. Founder provides feedback on unclear/incomplete areas
4. Strategy Agent updates based on feedback (iteration)
5. Founder marks screen as reviewed when satisfied
6. All questions in Questions.md must be resolved before screen approval

### Governance Gate Validation

Intent Overseer will validate in Phase 3:
- All screens meet UI_GOVERNANCE standards
- Specifications are complete per 8-section requirement
- All Questions.md files show resolved questions
- UI behaviors comply with constitutional intent