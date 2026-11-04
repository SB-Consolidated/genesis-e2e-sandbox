# Execution Authorization Template

**Status:** Reference  
**Version:** v0.9.7

## Purpose

This artifact is the sole machine-readable authorization for Phase 5 execution.

## Canonical Path

`Genesis Execution/governance/execution-authorization.json`

## Required Semantics

- Default state denies execution.
- Authorization may contain one or more tickets.
- Authorized tickets must match the dependency matrix and current execution lane.
- Execution authorization does not transfer lifecycle authority to Execution Agent.

## Required Fields

- `status`: `AUTHORIZED` or `DENIED`
- `mode`: `single` or `batch`
- `authorizedTickets`: array of ticket objects
- `authorizedBy`
- `timestamp`
- `dependencyMatrixVersion`

Each authorized ticket object should include:

- `ticketId`
- `executionOrder`
- `executionType`
- `dependencies`
- `dependenciesMet`

## Example

```json
{
  "status": "AUTHORIZED",
  "mode": "batch",
  "authorizedBy": "Coordinator Agent",
  "timestamp": "2026-07-30T12:00:00Z",
  "dependencyMatrixVersion": "1.1",
  "authorizedTickets": [
    {
      "ticketId": "TICKET-002",
      "executionOrder": 1,
      "executionType": "parallel",
      "dependencies": ["TICKET-001"],
      "dependenciesMet": true
    }
  ]
}
```
