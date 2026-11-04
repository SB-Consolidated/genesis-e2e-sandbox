# Phase 6 Revision Spec Workflow

**Version:** v0.9.7  
**Status:** Authoritative

## Purpose

This workflow defines how founder-requested changes are ingested during Phase 6, normalized into a revision spec, and routed back into the Phase 5 ticket lifecycle.

## Design Principles

- No execution from chat-only feedback.
- One canonical revision spec per approved Phase 6 change set.
- Full traceability from founder request to revised tickets, evidence, PRs, and completion contracts.
- Explicit classification of risk, scope, and upstream phase impact.
- Revision control must support long-lived enterprise software that evolves across releases, teams, and operating contexts.

## Canonical Artifacts

- Revision request: `Genesis Execution/revisions/requests/REVISION-REQUEST-[TIMESTAMP].md`
- Revision spec: `Genesis Execution/revisions/specs/REVISION-SPEC-[NNN].md`
- Revision handoff: `Genesis Execution/handoffs/revision-spec/REVISION-SPEC-HANDOFF-[TIMESTAMP].md`
- Governance templates: `REVISION_REQUEST_TEMPLATE.md` and `REVISION_SPEC_TEMPLATE.md`

## Workflow

1. Capture founder or reviewer feedback in a revision request.
2. Classify the request.
3. Produce a revision spec.
4. Amend upstream artifacts if the requested change exceeds current baseline authority.
5. Draft Phase 5 tickets from the revision spec.
6. Validate, authorize, execute, and complete those tickets under normal Phase 5 governance.

## Classification Rules

- `local refinement`: confined to existing approved intent and specification.
- `cross-ticket refinement`: spans multiple completed or active tickets but remains within approved baseline.
- `upstream phase amendment`: changes intent, specification, governance, environment, or release commitments and must update upstream artifacts before ticket drafting.

## Required Revision Spec Sections

```markdown
# REVISION-SPEC-[NNN] - [Short Title]

## Source Intake
- Revision Request: REVISION-REQUEST-[TIMESTAMP]
- Requested By: [Founder | Strategy Agent | Authorized Reviewer]
- Review Context: [PR / branch / environment / ticket set]

## Change Classification
- Change Type: [corrective | additive | rollback | compliance]
- Scope Class: [local refinement | cross-ticket refinement | upstream phase amendment]
- Risk Class: [low | medium | high | release-blocking]

## Requested Outcome
- [Clear description of desired end state]

## Baseline Impact Analysis
- Intent Impact: [none | summary]
- Specification Impact: [none | summary]
- Governance Impact: [none | summary]
- Existing Ticket Impact: [none | list]
- Evidence Impact: [none | summary]

## Acceptance Criteria
- [Objective, testable criteria]

## Ticket Decomposition Guidance
- [Ticket candidates or decomposition rules]

## Controls And Constraints
- [Security, compliance, release, or operational constraints]

## Disposition
- [approved | rejected | deferred | superseded]
```

## Enterprise Controls

- Revision requests and specs must be immutable once superseded or closed; use a new artifact for further changes.
- Revision specs must preserve links to affected tickets, PRs, and evidence updates.
- High-risk or release-blocking revisions must explicitly state rollback or containment expectations.
- Revisions that invalidate prior evidence must require new completion evidence rather than silent edits to historical records.
- Requests sourced from production support, customer commitments, audits, or scaling needs should use the same canonical intake path so growth pressure does not bypass governance.