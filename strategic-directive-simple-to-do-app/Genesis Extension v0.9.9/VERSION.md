# Genesis Governance Version History

**Current Version:** v0.9.9  
**Status:** Released as a package; becomes the active package when TICKET-142 merges (until then v0.9.8 is active)  
**Last Updated:** 2026-10-16

## v0.9.9 - Track A Risk-Tiered Merge Policy (Autonomy Amendment)

### Purpose
This release amends the Track A merge governance so low-risk pull requests merge automatically once required checks pass, while high-risk pull requests wait for the Founder's `approved-by-founder` label. The statements that conflicted with that policy are amended, and the automated `Merge eligibility` and `Ticket ID unique` checks gain written governance authority.

### Authority
Founder decisions 1 to 7 are recorded in `Genesis Execution/revisions/specs/REVISION-SPEC-002.md` (2026-10-16). Change record: `GOVERNANCE_V0.9.9_CHANGES.md`. Amendment log: `Genesis Execution/governance/overrides/amendments.log.md`. Source ticket: TICKET-134.

### Major Changes
- Track A review is risk-tiered and stated once in `05_PHASE_5_EXECUTION/PR_MERGE_POLICY.md`. Required approving reviews are 0 now, with a future target of 1 approving review from an automation identity.
- Track A required checks add `Dependency audit`, `Merge eligibility`, and `Ticket ID unique`.
- The `approved-by-founder` label, applied by a Founder login after the latest commit, is the recorded Founder approval for CODEOWNERS-protected paths. Only the Founder applies it.
- Class 3 is the default for Track A tickets whose pull request is rated low risk, and stays forbidden for `governance`, `bootstrap`, commercial, and auth changes. EDH paths are not yet classified; this is a recorded open gap.
- `dependabot/*` branches opened by `dependabot[bot]` are a documented Track A exception to the one-ticket-one-branch rule.
- Role files state who applies the label, who enables auto-merge, who may edit gate files, and who validates gate changes.
- Track B is unchanged.

### Activation
- Active governance package path becomes `Genesis Extension v0.9.9` when TICKET-142 merges. Until then v0.9.8 is active and this amendment is not in force.
- `Genesis Extension v0.9.8` is not edited in place and becomes reference-only.

When older documents, examples, or historical notes conflict with v0.9.9, the v0.9.9 document set is authoritative once it is active.

---

## v0.9.8 - Dual-Track Codebase Management And Self-Application

### Purpose
This release makes Genesis follow one enterprise SDLC spine for both the extension product (Track A) and the applications it builds (Track B), while defining how Genesis may later improve itself without bypassing those gates.

### Major Changes
- Dual-track codebase management is now authoritative: Track A is the extension, Track B is generated applications.
- Canonical branch names remain `ticket/TICKET-NNN-short-slug` and `hotfix/TICKET-NNN-short-slug`. `feature/` and `bugfix/` prefixes stay non-canonical.
- `main` is the only long-lived integration branch. Persistent `dev` / `staging` / `qa` branches are forbidden.
- `backup/*` is archive-only and must not be used as a working trunk.
- Machine transfer for Track A is git-first and bound to `C:\Dev\Genesis-Extension`.
- Self-application and autonomy classes 0-4 are defined so recursive improvement cannot skip tickets, PRs, or merge evidence.
- Track B CI requires build, tests, coverage floor, SAST/dependency scan, and CODEOWNERS. Track A requires compile, lint, and extension tests.
- Phase 7 promotes immutable artifacts or tags from `main`. Rebuild-between-environments is forbidden for Track B.
- Completion to `05_COMPLETE` requires merged PR, required checks, and remote branch deletion unless a documented exception exists.
- Feature flags are an optional overlay, not the default trunk-based incomplete-merge model.

### Runtime Enforcement
- Merge-complete evidence is validated before Coordinator-owned `04_MERGE_READY -> 05_COMPLETE`.
- Phase 4 installs application CI and CODEOWNERS into target repositories.
- Workspace readiness fails when application CI or CODEOWNERS are missing.
- Active governance package path is `Genesis Extension v0.9.8`.

When older documents, examples, or historical notes conflict with v0.9.8, the v0.9.8 document set is authoritative.

---

## v0.9.7 - Governance Normalization And Platform Readiness

### Purpose
This release normalizes the Genesis Extension governance package so the document set matches the intended operating model, the v0.9.7 fixes plan, and the current extension workflow constraints.

### Major Changes
- Canonical ticket ID format is now `TICKET-NNN` across templates, examples, handoffs, and automation artifacts.
- `01_DRAFT` is the canonical first ticket state. `00_BACKLOG` is removed from normative lifecycle documents.
- Execution Agent no longer owns ticket state transitions. Coordinator owns lifecycle advancement; automation may perform file moves only as a governed mechanism.
- `execution-authorization.json` is normalized to an array-capable schema supporting sequential and parallel dependency-aware authorization.
- `ticket-state.log` is confirmed as the canonical transition log.
- Issue handling is standardized as `issue.json -> guidance.json -> retry`, with Founder escalation only when Coordinator lacks authority.
- HOLD semantics are tightened so a hold pauses progression without inventing new state ownership.
- Merge-ready re-review remains inside the review and merge lane.

### Platform Policy Additions
- Browser-driven Phase 6 review and evidence capture are explicitly allowed when used as founder review evidence, not as an execution shortcut.
- Copilot code review, agent skills, and read-only MCP are explicitly allowed for review, inspection, and evidence gathering.
- Session-aware operating patterns are added for agent sessions, multi-chat workflows, and worktrees so parallel operating surfaces do not dilute governance.
- Agent host sessions, chat-surfaced PR follow-up, and worktrees with any harness are now explicitly recognized as preferred or permitted native operating surfaces where supported.
- Browser domain controls are now part of the governance baseline for browser-assisted review.
- Copilot session streaming is recognized as an optional enterprise audit export path, not a required execution dependency.

### Enterprise Lifecycle Additions
- Governance now explicitly treats each release as the next maintainable baseline for future enterprise change.
- Phase 6 and Phase 7 now formalize how founder, customer, compliance, defect, and scale-driven updates are reintroduced through governed revision intake and ticketed execution.

### Testing Policy Additions
- Playwright governance now explicitly allows multi-worker headless execution when determinism controls are satisfied.
- CI worker counts, shard strategy, and serial exceptions are treated as governed quality-gate policy rather than ad hoc local preference.
- A canonical Playwright config baseline is now documented for governed enterprise application projects.

### Document Alignment
- Root metadata updated to v0.9.7.
- Phase 4 environment docs updated for modern VS Code and Copilot surfaces.
- Phase 5 lifecycle, authorization, ticket, merge, and completion contract docs normalized.
- Phase 6 founder review rules updated to formalize browser-based evidence and refinement governance.
- Phase 6 revision intake and revision-spec workflow added so founder-requested changes re-enter Phase 5 through traceable, enterprise-grade controls.
- Role contracts updated to align with the corrected authority model.
- Root extension workspace now carries live governance instructions, governance-review skills, a Phase 6 revision skill, a commercial-readiness skill, and a read-only MCP baseline.

---

## Prior Lineage

- `v0.9.6` introduced file-structure and completion-contract normalization, but left internal conflicts across lifecycle and role documents.
- `v0.9.5` introduced dependency-aware execution and the issue/guidance loop.
- `v0.9.4` provided the extracted baseline from which this package was derived.
- `v0.8` established the multi-agent model.
- `v0.7` established the phase model.

When older documents, examples, or historical notes conflict with v0.9.8, the v0.9.8 document set is authoritative.
