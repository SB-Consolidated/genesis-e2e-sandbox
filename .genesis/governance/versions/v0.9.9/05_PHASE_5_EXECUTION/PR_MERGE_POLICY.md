# PR Merge Policy

**Version:** v0.9.9  
**Status:** Enforced  
**Authority:** CODEBASE_MANAGEMENT.md, TICKET_LIFECYCLE.md, SELF_APPLICATION.md

## Default Policy

- `main` is the only long-lived integration branch and must remain deployable.
- Direct commits and direct pushes to `main` are forbidden.
- Native GitHub squash merge is required. Merge commits are not the canonical history.
- Required checks remain mandatory. Review rules follow the Review section for each track.
- Persistent `develop`, `staging`, and `qa` branches are forbidden.

## Required Checks

Track A (Genesis Extension):

- compile / typecheck, lint, and extension tests (job `quality`)
- governed branch name (including the Dependabot exception in `ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md`)
- no secrets in the diff (`Secret scan (gitleaks)`)
- `Dependency audit` (no high or critical production advisories)
- `Merge eligibility` (risk classification and Founder approval for high-risk changes)
- `Ticket ID unique` (a `TICKET-NNN` branch must not reuse a completed ticket ID)

Track B (generated applications):

- compile or build
- lint
- unit and integration tests
- coverage floor of 80% unless Phase 4 records a higher floor
- SAST and dependency scan with zero Critical or High findings
- headless Playwright for UI tickets
- governed branch name
- no secrets in the diff

## Review

### Track A: risk-tiered merge policy

This section is the single statement of the Track A merge policy. Other documents refer to it. The operational detail (risk rules, settings) is in `docs/AUTONOMY_POLICY.md` and `docs/BRANCH_PROTECTION.md`.

- The `Merge eligibility` check classifies every Track A pull request as low risk or high risk from its changed files. Unknown, truncated, or unreadable inputs are high risk (fail closed).
- **Low risk:** no human review is required. The pull request merges through GitHub auto-merge (squash only) once every required check passes.
- **High risk:** the pull request does not merge until the Founder applies the `approved-by-founder` label after the latest commit. Only the Founder applies the label. A new commit invalidates an earlier label.
- **Required approving reviews:** 0 now. The future target is 1 approving review issued by an automation identity. That identity is not defined, and moving to the target needs a later governance amendment.
- **Code Owner review is not required.** The `approved-by-founder` label is the recorded Founder approval for CODEOWNERS-protected paths.
- Agent approval is not a substitute for the Founder label on a high-risk pull request.
- A pull request for a ticket whose self-change class is `governance` or `bootstrap` merges only with recorded Founder approval, even when the classifier rates it low. The classifier does not read ticket classes, so the Coordinator does not request auto-merge on such a pull request until the Founder has approved it.
- Dependabot pull requests are low risk only when they are npm development-dependency minor or patch updates, excluding `0.x` versions. All other Dependabot pull requests are high risk.

### Track B

- Minimum one independent human approval. Authors cannot approve their own code.
- CODEOWNERS extra approval is required for architecture, auth, security, shared libraries, and governance files.
- Track B rules are unchanged by v0.9.9.

## Merge Mechanics (Track A)

- Auto-merge is enabled on every pull request to `main` (Auto-Merge Required Gate in `GOVERNANCE_GATES.md`). For a high-risk pull request, `Merge eligibility` blocks the merge until the Founder label is applied.
- Coordinator enables auto-merge and verifies merge-complete evidence. Coordinator does not apply the Founder label.
- A manual merge is an exception and needs the same Founder approval that the label records.

## Completion Preconditions

- The ticket remains in `04_MERGE_READY` until merge evidence is complete.
- Required evidence: merged PR, passing required checks, completion contract, and remote branch deletion.
- Re-review stays in the merge lane and does not create a new lifecycle state.
- Coordinator must refuse `05_COMPLETE` when merge-complete evidence is missing.
- The ticket-closeout automation derives the merged PR, the squash SHA, the merger, check results, branch deletion, and, for a pull request classified high risk or a ticket whose Self-Change Class is governance or bootstrap (read from the first parent of the squash commit, never from the pull request head), the Founder label time from the GitHub API. A closeout the automation refuses stays in `04_MERGE_READY`. A manual closeout pull request is allowed only after the automation has failed or refused, with the cause recorded in the Action's issue, or, until the automation is enabled (the Enablement Gate in `FOUNDER-DECISION-2026-10-21-002.md` is met and the Founder has set `TICKET_CLOSEOUT_ENABLED` to `true`), under the transitional rule in `TICKET_LIFECYCLE.md`. It fails `Ticket ID unique` by design and merges only with its own recorded Founder waiver of that check, decided per use and not given in advance.

## Branch Cleanup

- Ticket and hotfix branches are ephemeral.
- A ticket cannot be marked complete while its remote `ticket/*` or `hotfix/*` branch still exists, unless a documented exception is recorded in the completion contract.

## Emergency

- Red `main` has ten minutes for a fix-forward on `hotfix/TICKET-NNN-short-slug`.
- If a verified fix cannot land in ten minutes, revert the breaking commit.
- Break-glass still requires a ticket, recorded Founder approval, and a post-incident revision request.
