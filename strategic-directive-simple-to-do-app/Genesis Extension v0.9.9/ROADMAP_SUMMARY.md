# Genesis v0.9.7 Roadmap Summary

**Status:** Planning Summary  
**Scope:** Consolidated roadmap for Genesis Extension and governed application delivery

## Objective

Genesis should operate as an enterprise-grade control plane that can create, govern, release, and continuously evolve production software as company needs, compliance obligations, and platform capabilities change.

## Foundation Already Established In v0.9.7

- Governance normalized around `TICKET-NNN`, canonical ticket states, and Coordinator-owned lifecycle progression.
- Browser-driven founder review, read-only MCP, code review, multi-chat, and worktree use are explicitly governed.
- Phase 6 revision intake and revision specs now route founder-requested changes back into Phase 5 through governed tickets.
- Release governance now treats each release as the next maintainable enterprise baseline.

## Implementation Tracking

- Completed: VS Code engine floor raised to 1.131+ for the extension.
- Completed: Phase 6 review studio persists revision request, revision spec, and revision handoff drafts.
- Completed: Phase 6 review studio can open persisted revision artifacts directly.
- Completed: Root workspace governance surfaces added with `.github/copilot-instructions.md`, `.github/skills/`, and `mcp.json` baseline.
- Completed: Enterprise Playwright worker, sharding, serial-exception, and config-baseline policy documented.
- Completed: Native session-aware chat opening and command fallback sequencing added to the extension runtime.
- Completed: Read-only MCP implementation pattern operationalized with governed artifact inspection tooling.
- Completed: Browser review host policy enforcement added for Phase 6 review surfaces.
- Completed: Read-only versus governed-write LM tool mode separation added.
- Completed: Enterprise audit bundle export baseline added.
- Completed: Workspace readiness reporting added for target-repository onboarding and preflight.
- Planned: Governance-aware review skill expansion beyond the current root skill baseline.
- Planned: Enterprise observability destination integrations such as SIEM or Purview export pipelines.

## Phase 1: Immediate Priorities

1. **Adopt native session-aware operating surfaces.**
   - Status: Baseline implemented in extension chat command routing.
   - Next: Expand governed multi-chat and worktree isolation patterns across more orchestration flows.

2. **Promote code review skills and read-only MCP as first-class review infrastructure.**
   - Status: Read-only governed artifact inspection is implemented.
   - Next: Expand governance-aware skills and richer review-safe MCP capabilities.

3. **Harden browser review governance.**
   - Status: Browser review domain policy enforcement is implemented in Phase 6 review.
   - Next: Add richer deterministic evidence capture on top of the enforced browser policy.

4. **Define enterprise Playwright execution policy.**
   - Require headless execution.
   - Allow multi-worker execution for isolated deterministic suites.
   - Require serial handling for shared-state flows.
   - Standardize CI worker counts and shard strategy.
   - Ship a canonical `playwright.config.ts` governance baseline for governed applications.

## Phase 2: Near-Term Priorities

1. **Modernize the extension UX around native agent surfaces.**
   - Status: Baseline session-aware opening implemented.
   - Next: Reduce remaining custom bootstrap mechanics and improve governed session grouping.

2. **Formalize worktree and session operating conventions.**
   - Bind sessions and worktrees to explicit tickets or governance tasks.
   - Persist decisions and evidence in canonical artifacts.

3. **Expand governed tool policy.**
   - Status: Tool mode separation implemented for LM tool surfaces.
   - Next: Extend role-based policy across more browser, repository, PR, and MCP workflows.

4. **Codify enterprise maintenance workflows.**
   - Use revision requests and revision specs for founder, customer, defect, compliance, and scale-driven changes.
   - Re-enter Phase 5 through validated tickets, not ad hoc comments.

5. **Codify enterprise test-scale standards.**
   - Define parallel versus serial Playwright criteria.
   - Keep end-to-end testing deterministic as the suite grows.
   - Encourage layered testing so E2E remains the critical path, not the whole quality model.

## Phase 3: Advanced Priorities

1. **Enterprise audit and observability.**
   - Status: Local audit export baseline implemented.
   - Next: Map audit bundles and session records into enterprise destinations such as SIEM or Purview.

2. **Custom governance services only where justified.**
   - Build MCP services for governance operations only after native platform surfaces prove insufficient.
   - Keep custom services subordinate to governed workflows.

## Cross-Cutting Enterprise Principles

- Releases are long-lived baselines, not one-off deliverables.
- Every significant change must preserve traceability from request to spec, tickets, evidence, PR, and release.
- Deterministic automation is preferred over manual verification.
- Governance should scale with product, team, and compliance complexity without losing founder control.

## Recommended Execution Order

1. Raise the supported VS Code floor when needed for agent-host and newer agent surfaces.
2. Implement governance-aware review skills and read-only MCP patterns.
3. Add browser domain-control policy and native review workflows.
4. Define the Playwright worker, shard, and serial-exception standard.
5. Automate revision-request and revision-spec generation in the extension.
6. Add enterprise observability integrations only after the core governed workflow is stable.