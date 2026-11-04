# Issue Resolution Protocol

**Status:** Authoritative  
**Scope:** Blockers arising during execution or merge readiness

## Canonical Loop

`issue.json -> guidance.json -> retry`

Founder escalation is inserted only when Coordinator lacks decision authority.

## Artifacts

### Issue
Path: `Genesis Execution/issues/[ticket-id].issue.json`

Minimum fields:
- `ticketId`
- `description`
- `timestamp`
- `reportedBy`
- `category`

### Guidance
Path: `Genesis Execution/guidance/[ticket-id].guidance.json`

Minimum fields:
- `ticketId`
- `issueDescription`
- `guidance`
- `timestamp`
- `providedBy`

### Escalation
Path: `Genesis Execution/escalation/[ticket-id].escalation.json`

Use only for business, product, founder-vision, or scope decisions outside Coordinator authority.

## Non-Canonical Patterns

- `06_BLOCKED`
- blocker markdown tickets
- `action-complete.json`

## Logging

If the issue affects lifecycle progression or a pending move, log the pause or retry context to `ticket-state.log`.
