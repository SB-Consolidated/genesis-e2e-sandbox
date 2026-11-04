# Revision Spec Template

**Version:** v0.9.7  
**Status:** Authoritative

## Purpose

Use this template to convert approved Phase 6 revision requests into a structured, ticket-ready specification with traceability and control metadata.

## Template

```markdown
# REVISION-SPEC-[NNN] - [Short Title]

## Source Intake
- Revision Request: REVISION-REQUEST-[TIMESTAMP]
- Requested By: [Founder | Strategy Agent | Authorized Reviewer]
- Prepared By: [Coordinator Agent | Strategy Agent]
- Prepared At: [ISO 8601 timestamp]

## Change Classification
- Change Type: [corrective | additive | rollback | compliance]
- Scope Class: [local refinement | cross-ticket refinement | upstream phase amendment]
- Risk Class: [low | medium | high | release-blocking]

## Requested Outcome
- [Clear description of the intended end state]

## Baseline Impact Analysis
- Intent Impact: [none | summary]
- Specification Impact: [none | summary]
- Governance Impact: [none | summary]
- Environment Impact: [none | summary]
- Existing Ticket Impact: [none | list]
- Evidence Impact: [none | summary]

## Controls And Constraints
- [Security, compliance, release, dependency, or operational constraints]

## Acceptance Criteria
- [Objective, testable criterion]

## Ticket Decomposition Guidance
- Proposed Tickets: [none | list]
- Dependency Notes: [none | list]
- Execution Notes: [sequential | parallel | mixed]

## Disposition
- Status: [approved | rejected | deferred | superseded]
- Approved By: [Founder | Strategy Agent per authority]
- Approved At: [ISO 8601 timestamp]
```

## Rules

- The revision spec is the canonical source for drafting Phase 5 refinement tickets.
- Amend upstream artifacts first when the scope class is `upstream phase amendment`.
- If prior evidence is invalidated, require new governed evidence instead of editing historical records in place.