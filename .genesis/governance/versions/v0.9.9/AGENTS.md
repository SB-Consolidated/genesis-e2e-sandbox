---
name: Genesis Governance Framework
description: Global governance enforcement rules for the Genesis Extension v0.9.9 multi-agent operating model.
---

# Genesis Governance Framework

**Version:** 0.9.9  
**Effective:** 2026-10-16 (in force when `Genesis Execution/governance/active.json` names this package; until then v0.9.8 is active)  
**Authority:** GENESIS_CONSTITUTION.md, OPERATING_STANDARDS.md, PERMISSION_SEMANTICS.md, CODEBASE_MANAGEMENT.md, SELF_APPLICATION.md

---

## Mandatory Rules For All Agents

### 1. Authority Order Is Absolute

```text
Founder
Strategy Agent
Coordinator Agent
Execution Agent
Intent Overseer
```

- Founder decisions are final.
- No role may exceed its scope.
- Escalation is mandatory when authority is insufficient.
- Intent Overseer remains independent for validation and governance blocking decisions.

### 2. Canonical Ticket State Machine

```text
01_DRAFT -> 02_VERIFIED -> 03_EXECUTING -> 04_MERGE_READY -> 05_COMPLETE
```

- `00_BACKLOG` is obsolete and must not be used.
- Folder location is the authoritative state.
- Every transition must be appended to `Genesis Execution/tickets/ticket-state.log`.

### 3. Transition Authority

- `01_DRAFT -> 02_VERIFIED`: Intent Overseer only.
- `02_VERIFIED -> 03_EXECUTING`: Coordinator-controlled authorization; system or governed workflow performs the move.
- `03_EXECUTING -> 04_MERGE_READY`: Coordinator-controlled review admission; system or governed workflow performs the move after completion evidence is validated.
- `04_MERGE_READY -> 05_COMPLETE`: Coordinator only, through the governed ticket-closeout automation or the documented fallback, after merge-complete evidence is verified.

### 4. Ticket Format Is Canonical

- Ticket IDs must use `TICKET-NNN`.
### 5. Execution Authorization Is Mandatory
- The canonical artifact is `Genesis Execution/governance/execution-authorization.json`.
- Authorization is batch-aware and may authorize more than one ticket when dependency rules allow parallel execution.
- Authorization does not grant authority to change governance, ticket scope, or ticket state ownership.
- UI evidence must include non-interactive, headless test evidence where required.
### 7. Issue-Guidance Loop Is Canonical

- Blockers are reported with `Genesis Execution/issues/[ticket-id].issue.json`.
- Coordinator responds with `Genesis Execution/guidance/[ticket-id].guidance.json`.
- Founder decisions that cannot be resolved by Coordinator use `Genesis Execution/escalation/[ticket-id].escalation.json`.
- `06_BLOCKED` folders and blocker markdown tickets are obsolete.

### 8. Review Lane Integrity

- Re-review after `04_MERGE_READY` remains in the review and merge lane.
- Tickets sent back for evidence defects or merge defects do not create new pseudo-states.
- Holds pause progression but do not rewrite authority ownership.

### 9. Platform Surface Policy

- Agent sessions, multi-chat workflows, worktrees, skills, browser tools, and MCP servers are permitted only within explicit governance boundaries.
- Read-only MCP is preferred for review, inspection, and evidence gathering.
- Write-capable automation must remain scoped to authorized lifecycle operations.

### 10. Governance Documents Are Authoritative

- Use the active v0.9.9 document set.
- Do not rely on stale extracted references when a v0.9.9 document exists.
- Stale version labels in examples are non-authoritative and must be normalized during amendment work.
- Track A (this extension) and Track B (generated applications) share ticket, branch, evidence, and merge rules.
- Genesis may change Genesis only through self-application: ticket, governed branch, gates, PR, and merge evidence.

### 11. Enterprise Continuity Is Required

- Genesis governance is not only for initial build-out; it is the operating model for sustained enterprise software evolution.
- Each approved release becomes the new governed baseline for future changes, evidence, and support decisions.
- Founder or authorized business changes, compliance changes, defect corrections, and platform upgrades must re-enter governance through canonical intake and specification paths.
- Decisions, evidence, and change intent must be preserved in repository artifacts so the product remains maintainable as teams, scope, and operating complexity grow.

### 12. Track A Merge Policy And Branch Exception

- Track A merges are risk-tiered, as stated once in `05_PHASE_5_EXECUTION/PR_MERGE_POLICY.md`: low-risk pull requests merge through auto-merge once required checks pass; high-risk pull requests wait for the `approved-by-founder` label.
- Only the Founder applies `approved-by-founder`. Coordinator enables auto-merge and verifies merge evidence but does not apply the label.
- No agent raises its own autonomy class or edits gate files (`.github/scripts/pr-gates.js`, merge-gate workflows, `docs/AUTONOMY_POLICY.md`, `docs/BRANCH_PROTECTION.md`, `CODEOWNERS`) outside an authorized governance ticket.
- Track A exception to the branch rules: `dependabot/npm_and_yarn/*` and `dependabot/github_actions/*` branches opened by `dependabot[bot]` are valid. Every other non-canonical branch remains invalid.
- Track B keeps one independent human approval and its existing gates.

---

## Role Summary

### Strategy Agent
- Interprets founder intent and prepares policy language.
- Prepares amendment language but does not approve it or implement governance changes without founder approval.

### Coordinator Agent
- Creates tickets, manages authorization, manages merge lane, and owns workflow orchestration.
- Enables auto-merge and verifies merge-complete evidence; does not apply the `approved-by-founder` label.
- Does not perform implementation work.

### Execution Agent
- Implements authorized work within ticket scope.
- Reports blockers and evidence.
- Does not own lifecycle advancement or edit gate files outside an authorized governance ticket.

### Intent Overseer
- Independently validates Phase 2 and Phase 5 artifacts, including gate and governance tickets, and blocks acceptance evidence that rests on stubs or fakes (`05_PHASE_5_EXECUTION/TICKET_VALIDATION_WORKFLOW.md`, Acceptance Evidence).
- Is the sole authority for `01_DRAFT -> 02_VERIFIED`.

---

## Required References

- `00_GLOBAL/OPERATING_STANDARDS.md`
- `00_GLOBAL/PERMISSION_SEMANTICS.md`
- `00_GLOBAL/CODEBASE_MANAGEMENT.md`
- `00_GLOBAL/SELF_APPLICATION.md`
- `00_GLOBAL/MACHINE_TRANSFER.md`
- `05_PHASE_5_EXECUTION/PHASE_5_RULES.md`
- `05_PHASE_5_EXECUTION/TICKET_LIFECYCLE.md`
- `05_PHASE_5_EXECUTION/TICKET_TEMPLATE.md`
- `05_PHASE_5_EXECUTION/TICKET_VALIDATION_WORKFLOW.md`
- `05_PHASE_5_EXECUTION/PR_MERGE_POLICY.md`
- `06_PHASE_6_FOUNDER_REVIEW/PHASE_6_RULES.md`

---

## VS Code Baseline

The recommended workspace baseline is defined in `04_PHASE_4_ENVIRONMENT/VSCODE_SETTINGS_TEMPLATE.md` and assumes:

- `chat.useAgentsMdFile = true`
- `github.copilot.chat.codeGeneration.useInstructionFiles = true`
- skills and MCP are enabled selectively rather than globally by default
- browser validation and agent session features are used only where governance documents authorize them
