# Operating Standards

**Status:** Binding  
**Authority:** Genesis Constitution  
**Effective:** Genesis Extension v0.9.9

## Scope

These standards govern ticketing, execution authorization, evidence, merge discipline, and approved operating surfaces.

## Ticket Standards

- Ticket IDs must match `TICKET-NNN`.
- Canonical states are `01_DRAFT`, `02_VERIFIED`, `03_EXECUTING`, `04_MERGE_READY`, `05_COMPLETE`.
- `00_BACKLOG` and `06_BLOCKED` are not canonical states.
- Folder location defines state.
- Every transition is appended to `Genesis Execution/tickets/ticket-state.log`.

## Authorization Standards

- `Genesis Execution/governance/execution-authorization.json` is the sole Phase 5 execution authorization artifact.
- Authorization may be single-ticket or batch-based.
- Dependency rules must be satisfied before authorization.
- Authorization does not transfer lifecycle authority to Execution Agent.

## Merge Standards

- `main` is the sole long-lived branch.
- Merge-ready review stays in `04_MERGE_READY`.
- A ticket cannot be marked complete until merge evidence and branch-cleanup evidence exist.

## Enterprise Lifecycle Standards

- Every production release establishes a new governed baseline for architecture, behavior, evidence, and support expectations.
- Post-release changes from founder direction, customer needs, compliance obligations, defects, platform shifts, or scaling requirements must return through governed intake, specification, ticketing, validation, and evidence capture.
- Backward compatibility, migration impact, and operational risk must be considered explicitly for changes that affect external interfaces, stored data, security posture, or critical workflows.
- Canonical repository artifacts must preserve why a change was made, what baseline it altered, and what evidence replaced prior assumptions.
- Documentation, tests, and operational evidence are part of the maintainable product baseline, not optional follow-up work.

## Platform Standards

- Browser validation is allowed for deterministic review and evidence capture.
- Copilot review, skills, and read-only MCP are approved inspection surfaces.
- Session-aware workflows, multi-chat operation, and worktrees must bind to explicit tickets or governance tasks.
- Canonical evidence must be written to repository artifacts, not left only in chat history.
