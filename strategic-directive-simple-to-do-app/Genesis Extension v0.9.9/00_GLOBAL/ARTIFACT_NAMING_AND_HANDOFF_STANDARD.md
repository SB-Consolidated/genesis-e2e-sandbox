# Artifact Naming, Location, Branch, And Handoff Standard

**Version:** v0.9.9  
**Status:** Authoritative

## Purpose

This standard defines the canonical naming, file locations, branch conventions, and handoff rules used across Genesis phases. If another document conflicts with this file on artifact naming, location, or ownership, this standard wins until the conflicting document is corrected.

## Design Principles

- Every significant change must be traceable from request to release.
- Governance artifacts are the source of truth; branches and chats are implementation surfaces, not authority records.
- One artifact type should represent one responsibility only.
- Filenames must be stable, sortable, machine-parseable, and human-readable.
- Net-new features and cross-cutting changes must be decomposed into governed tickets before execution.

## Canonical Naming Rules

- Ticket identifiers use `TICKET-NNN` with uppercase prefix and three digits.
- Revision specs use `REVISION-SPEC-NNN` with uppercase prefix and three digits.
- Revision requests use `REVISION-REQUEST-[TIMESTAMP]` where timestamp format is `YYYYMMDD-HHMMSS`.
- Phase gate files use `PHASE-N-COMPLETE-[TIMESTAMP].md`.
- Completion contracts use `[TICKET-ID].contract.md`.
- JSON workflow artifacts use the governed identifier in the filename, for example `[TICKET-ID].issue.json`.
- Branch prefixes are lowercase and semantic: `ticket/`, `hotfix/`, `release/`.
- Free-text slugs may improve readability but must always follow the governed identifier.

## Canonical Artifact Matrix

| Artifact | Filename Pattern | Location | Created By | Consumed By | Hand-off Meaning |
| --- | --- | --- | --- | --- | --- |
| Revision Request | `REVISION-REQUEST-[TIMESTAMP].md` | `Genesis Execution/revisions/requests/` | Founder, Strategy, or Coordinator | Strategy or Coordinator | Captures requested change in durable form |
| Revision Spec | `REVISION-SPEC-[NNN].md` | `Genesis Execution/revisions/specs/` | Coordinator | Coordinator, Intent Overseer, Founder | Normalized change package for ticket drafting |
| Revision-to-Ticket Handoff | `REVISION-SPEC-HANDOFF-[TIMESTAMP].md` | `Genesis Execution/handoffs/revision-spec/` | Coordinator | Coordinator, Founder | Signals Phase 5 re-entry package is ready |
| Draft Ticket | `TICKET-NNN.md` | `Genesis Execution/tickets/01_DRAFT/` | Coordinator | Intent Overseer | Requests validation |
| Validation Feedback | `TICKET-NNN-FEEDBACK.md` | `Genesis Execution/tickets/01_DRAFT/` | Intent Overseer | Coordinator | Ticket needs rework before approval |
| Verified Ticket | `TICKET-NNN.md` | `Genesis Execution/tickets/02_VERIFIED/` | Intent Overseer or system move | Coordinator, Execution | Ticket is approved and eligible for orchestration |
| Execution Authorization | `execution-authorization.json` | `Genesis Execution/governance/` | Coordinator | Execution or orchestrator | Authorizes entry or resumption in execution lane |
| Completion Contract | `TICKET-NNN.contract.md` | `Genesis Execution/tickets/completion-contracts/` | Execution | Coordinator, Intent Overseer | Signals implementation and evidence are ready for merge review |
| Issue File | `TICKET-NNN.issue.json` | `Genesis Execution/issues/` | Execution | Coordinator | Reports deterministic blocker |
| Guidance File | `TICKET-NNN.guidance.json` | `Genesis Execution/guidance/` | Coordinator | Execution or orchestrator | Returns concrete remediation or hold guidance |
| Escalation File | `TICKET-NNN.escalation.json` | `Genesis Execution/escalation/` | Coordinator | Founder | Requests founder-only decision |
| Phase Gate Handoff | `PHASE-N-COMPLETE-[TIMESTAMP].md` | `Genesis Execution/handoffs/phase-gates/` | Governing phase owner | Next phase owner | Authorizes transition to the next phase |
| Validation Handoff | `VALIDATION-APPROVED-[TIMESTAMP].md`, `VALIDATION-PARTIAL-[TIMESTAMP].md`, `VALIDATION-REWORK-[TIMESTAMP].md` | `Genesis Execution/handoffs/validation-approved/`, `validation-partial/`, `validation-rework/` | Intent Overseer | Coordinator | Reports validation outcome |

## Branch Standard

### Allowed Branch Types

- `ticket/TICKET-NNN-short-slug`
- `hotfix/TICKET-NNN-short-slug`
- `release/x.y.z`
- Track A only: `dependabot/npm_and_yarn/*` and `dependabot/github_actions/*`, when opened by `dependabot[bot]`

### Branch Rules

- Normal implementation work happens only on `ticket/` branches tied to exactly one `TICKET-NNN`.
- The Dependabot branches above are the only Track A exception to the one-ticket-one-branch rule. They carry no `TICKET-NNN`, are risk-classified like any other pull request, and are valid only when `dependabot[bot]` is the author. Any other branch without a governed identifier remains non-canonical.
- Emergency production repair uses `hotfix/` and still requires a governed `TICKET-NNN`.
- Release stabilization uses tags from `main` (`vX.Y.Z`) by default. A `release/x.y.z` branch is an exception with a maximum lifespan of five business days and may contain only release-hardening work.
- Persistent `develop`, `staging`, and `qa` branches are forbidden.
- `backup/*` is archive-only and is not a working trunk.
- Branches such as `feature/my-idea`, `bugfix/JIRA-ID`, `misc-fixes`, or personal branches without a governed identifier are non-canonical.
- Branches are execution lanes only; they do not replace governance artifacts or handoffs.

## New Feature And Large-Change Standard

- New features do not begin as direct feature branches.
- A founder request for a new feature, cross-screen change, or major update must first produce a revision request.
- Coordinator must normalize that request into a revision spec.
- The revision spec is the parent change container for large work.
- Execution begins only after the revision spec is approved and decomposed into one or more `TICKET-NNN` artifacts.
- Each ticket executes on its own `ticket/TICKET-NNN-short-slug` branch.
- Genesis does not require a separate `FEATURE-NNN` object unless portfolio-scale planning later proves that revision specs are insufficient.

## Founder Classification Input

Founder-facing request types may be simpler than governance classification, but both must be preserved.

### Founder Request Types

- Bug fix
- UX refinement
- Existing feature enhancement
- Net-new feature
- Scope change
- Compliance or policy change
- Technical debt or architecture update
- Production hotfix

### Governance Normalization

Each approved revision spec must normalize the founder request into:

- Change Type: `corrective | additive | rollback | compliance`
- Scope Class: `local refinement | cross-ticket refinement | upstream phase amendment`
- Risk Class: `low | medium | high | release-blocking`
- Routing Decision: which phase or artifact set must be revisited before execution

Founder classification is required input, but governance normalization controls routing.

## Phase 6 Re-entry Standard

The canonical Phase 6 re-entry package is:

1. `REVISION-REQUEST-[TIMESTAMP].md`
2. `REVISION-SPEC-[NNN].md`
3. `REVISION-SPEC-HANDOFF-[TIMESTAMP].md`
4. One or more `TICKET-NNN.md` files in `Genesis Execution/tickets/01_DRAFT/`

Rules:

- Tickets must not be treated as execution-ready merely because a founder requested a change.
- New or changed Phase 5 tickets must be derived from an approved revision spec.
- If the change impacts scope, intent, governance, environment, or release commitments, upstream artifacts must be amended before ticket drafting resumes.
- Returning to Phase 5 means returning to Phase 5 Step 1 validation, not jumping directly into execution.

## Handoff Ownership Summary

- Phase 1 -> Phase 2: Strategy Agent creates and uses the Phase 1 gate to continue into Phase 2.
- Phase 2 -> Phase 3: Strategy Agent hands the frozen specification package to Intent Overseer.
- Phase 3 -> Phase 4: Intent Overseer hands approved governance state to Coordinator.
- Phase 4 -> Phase 5: Coordinator hands an environment-ready state to execution workflow.
- Phase 5 -> Phase 6: Coordinator hands a completed implementation baseline to Founder and Strategy.
- Phase 6 -> Phase 5 re-entry: Coordinator hands an approved revision package back to Phase 5 ticket drafting and validation.
- Phase 6 -> Phase 7: Founder and Strategy authorize release progression after review sign-off.

## Explicitly Forbidden

- Direct execution from chat-only founder comments.
- Generic feature branches without a governed identifier.
- Multiple tickets sharing one normal implementation branch.
- Completion contract paths outside `Genesis Execution/tickets/completion-contracts/`.
- Phase transitions based only on branch existence or conversation state.
- Suffix-based naming variants unless another authoritative document explicitly permits them.

## Conflict Resolution

If another governance document disagrees with this standard:

1. Follow this file for naming, location, branch, and handoff semantics.
2. Correct the conflicting document.
3. Do not introduce a second competing convention for backward compatibility unless founder-approved.
