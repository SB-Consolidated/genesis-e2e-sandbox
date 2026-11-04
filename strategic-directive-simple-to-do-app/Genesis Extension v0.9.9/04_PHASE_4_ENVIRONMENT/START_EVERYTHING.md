````markdown
# Governed Start:Everything Contract

## Purpose
Make `start:everything` a first-class governance contract: versioned, validated, and self-updating. Eliminate startup drift and undocumented assumptions.

## Canonical Contract
Path: `Genesis Execution/start-everything.contract.json`

Declares:
- Required tools with version ranges
- Required processes and ports
- Startup order
- Health checks per process
- READY signals and message

This file is authoritative.

## Orchestrator Behavior
Script: `scripts/start-everything.ps1`
- Loads contract strictly
- Validates tools before starting
- Starts processes in declared order
- Runs health checks from contract
- Prints READY only when conditions satisfied
- Fails deterministically with remediation if not

## Contract Update Workflow
Command:
```powershell
npm run start:everything:update
```
- Detects current tool versions
- Refreshes `Genesis Execution/start-everything.contract.json`
- Logs last update time and command

## Governance Gate
Script: `scripts/preflight/start-everything-gate.ps1`
- Validates contract presence and JSON
- Ensures tool version ranges satisfied
- Verifies orchestrator references the contract
- Blocks preflight if missing/stale/invalid

## UI Integration (Read-Only)
Dashboard surfaces startup readiness and contract version.
No execution controls are present in UI.

## Verification
```powershell
npm run preflight
npm run start:everything
```
Optional re-learning:
```powershell
npm run start:everything:update
npm run preflight
```

## Guarantees
- Declared startup behavior (not inferred)
- Versioned and auditable contract
- Deterministic validation
- Automatic re-learning via update command

## Context7 Authority for Changes (GOV/0003)

- Any update to the start:everything contract or orchestrator counts as a governance change and must cite a Context7 source (URL or record ID with retrieval date) as the authority for the adjustment.
- PR descriptions and completion contracts must include a `Context7 Source:` line referencing that citation; missing citations block merge under the Context7 Authority Gate.
````