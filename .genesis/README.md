# Genesis Governance

This folder holds the governance control plane, versioned governance sets, and orchestrator state. Project documents live outside `.genesis/`.

## Structure

- governance/versions/ - Imported governance versions
- governance/overrides/ - Amendments and project-specific overrides (see governance/overrides/amendments.log.md)
- Active governance version and phase: the canonical record is `Genesis Execution/governance/active.json` (workspace root, committed); `.genesis/governance/active.json` is a derived local mirror written from it
- governance/execution-authorization.json - Ticket execution authorization
- bootstrap/state.json - Bootstrap status and verification steps
- orchestrator/state.json - Orchestrator status
- orchestrator/assignments.json - Work assigned to execution agent
- orchestrator/completions.json - Completed work reports
- orchestrator/coordinator/logs/ - Coordinator logs
- orchestrator/execution/logs/ - Execution logs
