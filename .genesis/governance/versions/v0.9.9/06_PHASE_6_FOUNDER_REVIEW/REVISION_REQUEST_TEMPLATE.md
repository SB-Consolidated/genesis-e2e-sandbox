# Revision Request Template

**Version:** v0.9.7  
**Status:** Authoritative

## Purpose

Use this template to capture founder or authorized reviewer change requests during Phase 6 before any ticket drafting begins.

## Template

```markdown
# REVISION-REQUEST-[TIMESTAMP] - [Short Title]

## Submission Metadata
- Requested By: [Founder | Strategy Agent | Authorized Reviewer]
- Submitted At: [ISO 8601 timestamp]
- Review Context: [PR / branch / environment / ticket set]
- Source Surface: [VS Code review | browser review | PR review | other governed surface]

## Requested Changes
- [Verbatim or near-verbatim summary of requested update]

## Business Or Governance Rationale
- [Why this change is required]

## Urgency
- Priority: [low | normal | high | release-blocking]
- Decision Deadline: [date | none]

## Affected Scope
- Suspected Tickets: [none | list]
- Suspected Artifacts: [none | list]
- Suspected Evidence Impact: [none | list]

## Attachments And References
- [PR link, artifact path, screenshot path, transcript excerpt path, or other evidence]

## Intake Notes
- [Coordinator or Strategy Agent notes; do not convert this into ticket instructions yet]
```

## Rules

- Preserve the request as submitted; clarifications belong in the revision spec, not by rewriting the intake.
- One request artifact may contain multiple related changes if they are reviewed as a single decision set.
- Sensitive or privileged material must remain in governed storage and referenced accordingly.