# Codebase Management And Dual-Track SDLC

**Version:** v0.9.9  
**Status:** Authoritative  
**Authority:** GENESIS_CONSTITUTION.md, ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md, PR_MERGE_POLICY.md

## Purpose

Genesis operates two related delivery tracks under one spine.

- **Track A** is the Genesis Extension product, including desktop-to-laptop development.
- **Track B** is every application repository Genesis creates or operates.

The tracks are not identical in CI intensity. They are identical in ticket, branch, evidence, PR, merge, and machine-portability rules.

## Shared Spine

- `main` is the only long-lived integration branch and must remain deployable.
- Direct commits and direct pushes to `main` are forbidden.
- One `TICKET-NNN` maps to one `ticket/TICKET-NNN-short-slug` branch and one PR. The only exception is Track A: `dependabot/npm_and_yarn/*` and `dependabot/github_actions/*` branches opened by `dependabot[bot]` are not tied to a ticket and are risk-classified like any other pull request.
- Emergency work uses `hotfix/TICKET-NNN-short-slug` and still requires a ticket.
- `develop`, `staging`, `qa`, and other persistent environment branches are forbidden.
- Environments are populated from tags or immutable artifacts built from `main`.
- `backup/*` is archive-only. It is never a working trunk.
- Completion requires a completion contract, merged PR, passing required checks, and remote branch deletion unless a documented exception exists.
- Execution implements. Intent Overseer validates. Founder releases, owns break-glass, and applies the `approved-by-founder` label.
- Merging: for Track A, Coordinator enables auto-merge and verifies merge-complete evidence, and GitHub performs the merge once the gates pass (see PR_MERGE_POLICY.md). For Track B, Coordinator merges.

## Track A — Extension Product

Track A applies to `C:\Dev\Genesis-Extension` and any authorized clone of `SB-Consolidated/Genesis-Extension`.

Required merge gates:

- compile / typecheck, lint, and extension tests (`quality`)
- governed branch name
- no secrets in the diff
- `Dependency audit`
- `Merge eligibility`
- `Ticket ID unique`

Review (risk-tiered; the policy is stated once in PR_MERGE_POLICY.md):

- Low-risk pull requests merge through auto-merge once required checks pass, with no human review.
- High-risk pull requests need the Founder's `approved-by-founder` label, applied after the latest commit.
- Required approving reviews are 0 now, with a future target of 1 approving review from an automation identity.
- Agent approval is not a substitute for the Founder label on a high-risk pull request.
- Protected paths include `src/core`, `src/governance`, `src/commercial`, and every `Genesis Extension v*` governance package. The full high-risk path list is in `docs/AUTONOMY_POLICY.md`.

Portability:

- Canonical local path is `C:\Dev\Genesis-Extension`.
- Machine transfer is git-first. Push the ticket branch before leaving a machine.
- `.genesis`, `.env`, `node_modules`, and `dist` are not the source of truth.
- Resume is clone or fetch, checkout the same ticket branch or `main`, `npm install`, `npm run compile`.

## Track B — Generated Applications

Track B applies to every Genesis-managed application repository.

Required merge gates:

- compile or build
- lint
- unit and integration tests
- coverage floor of 80% unless Phase 4 records a higher project floor
- SAST and dependency scan with zero Critical or High findings
- headless Playwright for UI tickets
- governed branch name
- no secrets in the diff

Review:

- Minimum one independent human approval. Authors cannot approve their own code.
- CODEOWNERS extra approval is required for architecture, auth, security, and shared libraries.
- Intent Overseer and Coordinator gates remain mandatory.
- Track B rules are unchanged by v0.9.9.

Release:

- Phase 7 promotes the artifact or tag built from `main`.
- Recompiling between environments is forbidden.
- Rollback redeploys the previous artifact. It does not rebuild from mixed local state.

Ticket SLA:

- A Track B ticket branch must merge or enter HOLD with `issue.json` within five business days.
- The 24-48 hour trunk-based limit is not the Genesis default because completion contracts and Playwright evidence require more than a same-day merge.

## Feature Flags

Incomplete work does not land on `main` by default.

A revision spec may authorize a flagged incremental slice only when:

- the change is classified as local or cross-ticket refinement
- the flag has an owner and expiry
- a removal ticket is drafted in the same revision spec

Feature flags are an overlay, not the default SDLC.

## Emergency Protocol

- Red `main` or a broken test environment has ten minutes for a fix-forward on a `hotfix/TICKET-NNN` branch.
- If a verified fix cannot land in ten minutes, revert the breaking commit.
- Break-glass still requires a ticket, recorded Founder approval, and a post-incident revision request.
- No silent push to `main`.

## Conflict Resolution

If this file conflicts with older examples, follow this file and [ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md](ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md).
