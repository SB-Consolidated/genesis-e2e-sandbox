# Permission Semantics And Execution Authority

**Version:** v0.9.9  
**Status:** Locked Clarification  
**Purpose:** Clarify how phase permission, ticket authorization, and execution authority interact.

## 1. Core Model

### 1.1 Phases Grant Categories, Not Freeform Action
- Phase entry authorizes a class of work.
- Individual actions still require the correct artifact and actor.

### 1.2 Tickets Direct Work
- Phase 5 and Phase 6 refinement work must be directed by tickets.
- Ticket scope is the execution boundary.

### 1.3 Authorization Trumps General Permission
- A phase may permit execution work, but execution still requires explicit authorization.
- Founder feedback alone does not authorize code changes unless routed through the correct lifecycle.

## 2. Phase Model

### Phase 1
- Permits strategic drafting.
- Does not permit code execution.

### Phase 2
- Permits specification and screen definition.
- Does not permit product implementation.

### Phase 3
- Permits governance review and blocking validation.
- Does not permit implementation.

### Phase 4
- Permits environment setup and governance bootstrap.
- May configure VS Code, Copilot surfaces, MCP, worktrees, and browser tooling as environment capabilities.
- Does not permit feature execution outside explicit setup tasks.

### Phase 5
- Permits implementation, testing, review preparation, and merge workflow.
- Requires ticket plus execution authorization.

### Phase 6
- Permits founder review, browser validation, evidence capture, and ticketed refinements.
- Founder feedback must route back through Phase 5 controls for any code or artifact change.

### Phase 7
- Permits release operations only after founder approval.

## 3. Execution Authorization Rules

- Authorization artifact path: `Genesis Execution/governance/execution-authorization.json`.
- `status = AUTHORIZED` is required for active execution.
- Authorized ticket list must contain the exact `TICKET-NNN` being executed.
- Expired, missing, or mismatched authorization denies execution.

## 4. Authority Semantics By Role

### Founder
- Final authority over approval, escalation, and release.

### Strategy Agent
- Interprets intent and drafts policy.
- Does not self-authorize governance implementation.

### Coordinator Agent
- Orchestrates tickets, authorization, merge lane, and guidance.
- Owns workflow decisions after validation.

### Execution Agent
- Executes within scope.
- Does not own lifecycle state transitions.
- Must stop and report blockers rather than mutate governance flow.

### Intent Overseer
- Independently validates and may block.
- Exclusively owns `01_DRAFT -> 02_VERIFIED`.

## 5. Review And Inspection Surfaces

- Read-only MCP, code review skills, and browser tools are review surfaces, not implicit execution authority.
- Agent sessions and worktrees create operating isolation, not additional permission.
- Evidence must be written to canonical repository artifacts.

## 6. HOLD Semantics

- HOLD pauses a ticket without reassigning ownership.
- HOLD does not create a new lifecycle state.
- Resume requires explicit Coordinator action and, if execution restarts, valid authorization.
4. **Authorization Expires** — EXECUTION_AUTHORIZATION_TEMPLATE.json has optional expiry timestamp
5. **Founder Authority Is Final** — Founder gates and approvals override process conflicts
6. **Phase Boundaries Are Hard** — Scope changes, capability additions, phase reversions require Phase 2 return

---

For detailed phase rules, see GENESIS_LIFECYCLE_GOVERNANCE.md and individual PHASE_X_RULES.md files.
