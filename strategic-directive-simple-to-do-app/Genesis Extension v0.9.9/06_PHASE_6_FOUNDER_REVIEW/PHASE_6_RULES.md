# Phase 6: Founder Review And Refinement

**Version:** v0.9.7

## Purpose

Phase 6 is the founder review loop. It validates that Phase 5 outputs satisfy intent and specifications, and it routes any requested changes back through governed tickets.

## Approved Review Surfaces

- Founder review in VS Code
- Browser-driven validation and evidence capture
- GitHub PR and issue review
- Copilot review, skills, and read-only MCP for inspection and summarization
- PR update handling from chat as a review convenience

## Required Rules

- Browser evidence may support founder review but does not bypass Phase 5 controls.
- Browser evidence should run under explicit domain policy and workspace trust controls.
- Any requested refinement that changes code, tests, behavior, assets, or governance artifacts must enter a canonical revision intake before tickets are created.
- Founder or authorized reviewer feedback must be captured in a persistent revision request artifact, not left as chat-only guidance.
- Revision requests must be normalized into a revision spec before Coordinator drafts new or amended Phase 5 tickets.
- Revision specs must include traceability to founder feedback, impacted intent/spec artifacts, risk class, affected tickets, and acceptance criteria.
- If requested changes alter intent, scope, authority, or release commitments beyond the approved baseline, the workflow must return to the appropriate earlier phase before execution tickets are drafted.
- Refinement tickets follow the same validation, authorization, evidence, and merge rules as Phase 5.
- Session-aware workflows and worktrees may be used during review only when tied to explicit tickets or governance tasks.
- Multi-chat and peer-chat review branches are allowed only when evidence is persisted back into canonical artifacts.

## Revision Intake And Re-entry

### Canonical Artifacts

- Revision requests live in `Genesis Execution/revisions/requests/REVISION-REQUEST-[TIMESTAMP].md`.
- Approved revision specs live in `Genesis Execution/revisions/specs/REVISION-SPEC-[NNN].md`.
- Revision-to-ticket handoffs live in `Genesis Execution/handoffs/revision-spec/REVISION-SPEC-HANDOFF-[TIMESTAMP].md`.

### Required Workflow

1. Founder, Strategy Agent, or Coordinator records requested changes in a revision request artifact.
2. Strategy Agent or Coordinator classifies the request as clarification, scoped refinement, or upstream phase amendment.
3. Coordinator creates a revision spec that consolidates requested changes, impact analysis, affected baselines, risks, acceptance criteria, and implementation decomposition guidance.
4. If the revision changes intent, specifications, governance, or authorization boundaries, the applicable upstream artifact must be amended before Phase 5 ticket creation resumes.
5. Coordinator uses the approved revision spec as the only valid source for drafting new refinement tickets in `01_DRAFT`.
6. Intent Overseer validates the resulting tickets under normal Phase 5 gates.

### Enterprise Control Expectations

- Revision requests must preserve the original feedback wording, submitter, timestamp, and review context.
- Revision specs must state whether the change is additive, corrective, rollback, compliance-driven, or release-blocking.
- Revision specs must define blast radius, regression risk, required evidence updates, and whether existing completion contracts are invalidated.
- Each refinement ticket must reference its originating revision spec.
- Closed revision specs must record disposition: implemented, rejected, deferred, or superseded.

## Forbidden

- Advancing to Phase 7 without founder approval.
- Introducing new scope without returning to the appropriate earlier phase.
- Treating browser review as a substitute for merge evidence or headless execution evidence.
- Drafting Phase 5 refinement tickets directly from chat or ad hoc comments without a persisted revision spec.
