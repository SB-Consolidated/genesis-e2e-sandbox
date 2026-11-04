---
name: Genesis Governance Framework
description: Root governance and role authority rules for the Genesis Control Plane extension and governed application repos.
---

# Genesis Governance Framework

This repository's active governance package is the v0.9.9 pack in `Genesis Extension v0.9.9/`. It is the product governance for software Genesis builds. For this repository's own development, `Genesis Execution/governance/SELF_DEVELOPMENT_POLICY.md` governs and wins over the pack's Track A text (Amendment #2026-004); the pack itself is unchanged.

## Authority Order

Founder (human authority)  
Strategy Agent  
Coordinator Agent  
Execution Agent  
Intent Overseer

- No agent may exceed its authority scope.
- Escalation is required when authority is insufficient.
- Founder decisions are final.
- Intent Overseer remains independent for validation and governance-blocking authority.
- Track B follows the pack's ticket, branch, evidence, and merge rules. This repository's own development follows `Genesis Execution/governance/SELF_DEVELOPMENT_POLICY.md`.

## Canonical Ticket State Machine

`01_DRAFT -> 02_VERIFIED -> 03_EXECUTING -> 04_MERGE_READY -> 05_COMPLETE`

### Transition Authority

- `01_DRAFT -> 02_VERIFIED`: Intent Overseer only
- `02_VERIFIED -> 03_EXECUTING`: Coordinator-controlled authorization; system or governed workflow performs the move
- `03_EXECUTING -> 04_MERGE_READY`: Coordinator-controlled review admission after evidence validation
- `04_MERGE_READY -> 05_COMPLETE`: Coordinator only, through the governed ticket-closeout automation or the documented fallback, after merge-complete evidence is verified.
- `04_MERGE_READY -> 03_EXECUTING`: Coordinator only, as the return after a sync merge voids the review PASS and the admission while more than one ticket is authorized (`Genesis Execution/governance/SELF_DEVELOPMENT_POLICY.md` Section 6 step 3, Amendment #2026-009); a new Intent Overseer review PASS and a new `03_EXECUTING -> 04_MERGE_READY` admission follow.
- `02_VERIFIED -> 01_DRAFT`: Coordinator only, as the return of a verified ticket that went stale before authorization, after an Intent Overseer FAIL record naming the stale finding and SHA or on Brad's own words for that ticket (`Genesis Execution/governance/SELF_DEVELOPMENT_POLICY.md` Section 6 step 2 (e), Amendment #2026-017); the Intent Overseer validates again under `01_DRAFT -> 02_VERIFIED`.

Execution Agent implements assigned work but does not advance ticket state on its own authority.

## Mandatory Rules

- Validation gates are mandatory and cannot be bypassed.
- Evidence is required for completion claims.
- Governance documents are authoritative. On conflict, `Genesis Execution/governance/SELF_DEVELOPMENT_POLICY.md` wins for this repository's own development; otherwise use the active v0.9.9 package.
- `main` is the only long-lived integration branch; persistent `dev`/`staging`/`qa` branches are forbidden.
- Canonical branch names remain `ticket/TICKET-NNN-short-slug` and `hotfix/TICKET-NNN-short-slug`.
- `backup/*` is archive-only and must not be used as a working trunk.
- Self-application of Genesis must follow the same ticket, PR, merge, and evidence gates. Dependabot pull requests are third-party dependency updates, not self-application: the Founder disposes of them under `Genesis Execution/governance/SELF_DEVELOPMENT_POLICY.md` Section 5 (Amendment #2026-012), and any follow-up change goes through a ticket.

## Evidence Expectations

Acceptable evidence includes terminal output, file contents, test results, commit SHAs, PR references, merge confirmations, and required CI results.

## Repository Guidance

- Prefer the local governance engine and tool surfaces under `src/core` and `src/chat/tools`.
- Keep changes minimal and scoped.
- Do not change governance semantics without explicit founder approval.
- Update the role files under `Genesis Extension v0.9.9/ROLES/` in step with the root governance package.

## Full Governance Source

The active governance package is under `Genesis Extension v0.9.9/`, including `AGENTS.md` and the role-specific files in `ROLES/`. The extracted historical baseline remains under `Genesis-v0.94-extracted/Genesis v0.9.4/` for reference only.