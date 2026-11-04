# Genesis Control Plane Extension

**Status:** Authoritative  
**Effective:** Genesis Extension v0.9.7

## Purpose

The extension is the primary governed operating surface for Genesis inside VS Code.

It may:
- initialize and import governance assets
- orchestrate ticket lifecycle automation
- open governed agent sessions
- gather review evidence from GitHub, browser tooling, and local artifacts

## v0.9.7 Platform Policy

- Browser-driven review and evidence capture are approved surfaces for founder review and validation.
- Copilot code review, skills, and read-only MCP are approved inspection surfaces.
- Session-aware workflows, multi-chat operation, and worktrees are allowed when explicitly tied to tickets or governance tasks.
- Custom chat bootstrapping is subordinate to native session-aware operating surfaces when they are available and governable.

## July 2026 Additions

- Agent host sessions should be treated as the preferred long-term operating model when the supported VS Code floor permits them.
- Worktrees with any harness are a supported governance isolation mechanism for parallel ticket or review flows.
- PR updates surfaced in chat are a valid review convenience, but they do not bypass Coordinator merge authority.
- Browser tooling should be constrained with explicit domain allow and deny policy during governed review flows.
- Enterprise Copilot session streaming is optional and should be treated as an audit and observability integration, not a Phase 5 prerequisite.

---

## Related Documents

- [INITIALIZATION_TOOLS.md](INITIALIZATION_TOOLS.md) - Detailed command specifications
- [BOOTSTRAP.md](BOOTSTRAP.md) - Bootstrap system and structure
- [PHASE_4_RULES.md](PHASE_4_RULES.md) - Phase 4 environment setup rules
- [STARTUP_ROLE_CONTRACTS.md](STARTUP_ROLE_CONTRACTS.md) - Role onboarding requirements

---

## Governance Compliance

This extension is:
- **Required** for all Genesis v0.9.2+ projects
- **Governed by** GENESIS_CONSTITUTION.md and Phase 4 rules
- **Maintained** under Genesis governance amendment process
- **Versioned** in sync with governance document versions

Any changes to extension behavior require governance amendment approval per the constitutional amendment process.
