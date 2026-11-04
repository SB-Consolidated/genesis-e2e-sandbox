# Phase 4: Environment Setup

**Version:** v0.9.9

## Purpose

Phase 4 establishes the governed operating environment for Genesis Extension work.

## Required Outputs

- Imported governance package
- Active governance reference
- VS Code settings baseline
- Approved extension operating surfaces

## Approved Operating Surfaces

- governed agent sessions
- session-aware chat workflows
- agent host sessions where the supported VS Code floor allows them
- worktrees bound to explicit tickets or governance tasks
- browser tooling for later deterministic review and evidence capture
- read-only MCP and review tooling when configured

## Required Phase 4 Policy Decisions

- Decide whether the supported VS Code floor is high enough to enable agent host and July 2026 agent-session features.
- Define domain allow and deny rules before enabling browser tooling for governed review.
- Define whether session streaming is required for enterprise audit export or deferred.

## Track B Repository Hardening

Phase 4 must install and verify:

- `.github/workflows/genesis-application-ci.yml`
- `CODEOWNERS`
- `main` as the default branch with no persistent environment branches
- required checks and required review when GitHub access is available

Phase 4 prepares these capabilities. It does not authorize feature execution outside explicit setup work.
