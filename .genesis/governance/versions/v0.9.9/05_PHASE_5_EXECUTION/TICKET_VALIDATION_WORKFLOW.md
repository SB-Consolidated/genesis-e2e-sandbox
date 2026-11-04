# Ticket Validation Workflow

**Status:** Operational  
**Authority:** AGENTS.md, TICKET_TEMPLATE.md, TICKET_LIFECYCLE.md

## Validation Gate

Intent Overseer is the sole authority for `01_DRAFT -> 02_VERIFIED`.

## Required Checks

### Structure
- Filename is `TICKET-NNN.md`.
- Ticket contains all required template sections, including the Security Checklist when the ticket touches authentication, API routes, secrets or tenant data, with every item marked `[x]`. The Intent Overseer returns FAIL, not a recommendation, when that checklist is missing, incomplete or unmarked (Amendment #2026-018).
- Markdown is readable and complete.

### Clarity
- Objective is concise.
- Scope is explicit.
- Out-of-scope exclusions are explicit.
- Success criteria are measurable.

### Governance
- Ticket aligns with the active v0.9.9 package.
- Constraints are explicit.
- Dependency declaration is present.
- No obsolete workflow references such as `00_BACKLOG`, `06_BLOCKED`, or Execution-owned state advancement.

### Acceptance Evidence
- A success criterion that claims an integration with an external system is accepted only with real integration evidence (a run, log or recorded response from the real system) or an explicit `DEMO` label on that criterion; a stub, mock or fake does not count as integration evidence.
- A criterion or claim that data is durable is accepted only when the data is written to a real persistent store; an in-memory map, a mock or a fixture file is not durable.
- Production code paths contain no test hooks (test-only flags, switches, fake injections or bypasses reachable outside the test suite).
- At review, the findings of the Genesis acceptance-evidence check, when that check is present, are resolved or labelled `DEMO` before approval.

### UI Gate
- UI tickets require headless Playwright or equivalent non-interactive browser test criteria.
- Manual-only browser testing is insufficient.

## Outcomes

- Approved: move to `02_VERIFIED` and log transition.
- Rework: keep in `01_DRAFT`, provide feedback, and preserve the same ticket ID.
- Blocked by governance conflict: escalate per governance precedence.
