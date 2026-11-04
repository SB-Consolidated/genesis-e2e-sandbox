# Genesis Governance v0.9.9 Changes

**Version:** v0.9.9  
**Date:** 2026-10-16  
**Previous Version:** v0.9.8  
**Status:** Released as a package; in force when TICKET-142 makes it the active package

---

## Authority

- Founder decisions 1 to 7 were given in the working session on 2026-10-16 and are recorded in `Genesis Execution/revisions/specs/REVISION-SPEC-002.md`. The Founder is the decision authority.
- Source ticket: TICKET-134. Revision request: `REVISION-REQUEST-20261016-134900`.
- Amendment language was prepared by the Execution role at the Founder's direction. It becomes approved when the Founder approves the TICKET-134 pull request.
- Intent Overseer validation of TICKET-134 is pending. This document does not record it.

## Overview

v0.9.9 amends Track A merge governance to match `docs/AUTONOMY_POLICY.md`: low-risk pull requests merge through auto-merge once required checks pass, and high-risk pull requests wait for the Founder's `approved-by-founder` label. Track B is unchanged.

## Founder Decisions Reflected

| # | Decision | Where it is stated |
| --- | --- | --- |
| 1 | 0 required approvals now; target 1 approving review from an automation identity (identity undefined; later amendment) | `PR_MERGE_POLICY.md`, `GOVERNANCE_GATES.md` |
| 2 | Auto-merge on all PRs to `main`; `Merge eligibility` holds high-risk PRs until the label | `PR_MERGE_POLICY.md`, `GOVERNANCE_GATES.md`, `docs/AUTONOMY_POLICY.md` |
| 3 | The `approved-by-founder` label, applied by a Founder login after the latest commit, is the recorded Founder approval for CODEOWNERS-protected paths | `SELF_APPLICATION.md`, `PR_MERGE_POLICY.md` |
| 4 | Class 3 is the default for low-risk Track A tickets; forbidden for governance, bootstrap, commercial, auth; EDH classification is an accepted open gap | `SELF_APPLICATION.md` |
| 5 | `dependabot/*` branches by `dependabot[bot]` are a Track A exception; only npm dev minor and patch updates (excluding `0.x`) are low risk | `ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md`, `CODEBASE_MANAGEMENT.md`, `PR_MERGE_POLICY.md`, `AGENTS.md` |
| 6 | Released as a new `Genesis Extension v0.9.9` package; v0.9.8 is not edited and becomes reference-only | `VERSION.md`, this file |
| 7 | Track A only; Track B keeps one independent human approval | all amended files |

## Files Changed Relative To v0.9.8

Policy text:
- `05_PHASE_5_EXECUTION/PR_MERGE_POLICY.md`: required checks, risk-tiered review, merge mechanics.
- `00_GLOBAL/CODEBASE_MANAGEMENT.md`: Track A gates and review, protected paths, Dependabot branch exception, who merges.
- `00_GLOBAL/SELF_APPLICATION.md`: Class 3 allowlist, label as recorded Founder approval, default class, EDH open gap, gate-file rule.
- `03_PHASE_3_GOVERNANCE_REVIEW/GOVERNANCE_GATES.md`: review gates split by track, auto-merge scope, new Track A merge-eligibility and ticket-ID gates.
- `04_PHASE_4_ENVIRONMENT/STARTUP_ROLE_CONTRACTS.md`, `05_PHASE_5_EXECUTION/COORDINATOR_COMPLETION_EXPECTATIONS.md`, `05_PHASE_5_EXECUTION/PHASE_5_RULES.md`, `05_PHASE_5_EXECUTION/EXECUTION_ORCHESTRATOR.md` (Step 2.7): merge responsibility wording.
- `00_GLOBAL/ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md`: Dependabot branch exception.
- `AGENTS.md` and `ROLES/*/agent.md` (four files): label, merge, gate-file, validation, and amendment-preparation responsibilities.

Version records:
- `VERSION.md`, `00_GLOBAL/GOVERNANCE_INDEX.md`, this file.
- Version labels in unchanged-text files (`Version:` headers, the Phase 1, 4, and 7 rules, `OPERATING_STANDARDS.md`, `MACHINE_TRANSFER.md`, `PERMISSION_SEMANTICS.md`, `FEATURE_FLAG_OVERLAY.md`, `V0_7_LOCK_DECLARATION.md`, `EXECUTION_AUTHORIZATION_TEMPLATE.json`) now read v0.9.9. Their rules are unchanged.

Outside the package (same ticket): `docs/AUTONOMY_POLICY.md` (proposed to adopted), `docs/BRANCH_PROTECTION.md` (adopted settings), `Genesis Execution/governance/overrides/amendments.log.md` (new).

## Not Changed

- `Genesis Extension v0.9.8/` (byte-for-byte unchanged, reference-only).
- `Genesis Execution/governance/active.json`, `CODEOWNERS`, the workspace `AGENTS.md`, skills, workflows, runtime constants, the bootstrap manifest, and tests. TICKET-142 moves those after this amendment merges.
- The gate scripts and workflows from TICKET-133, repository settings, and Track B rules.

## Open Items

- EDH paths are not in the risk classifier. A follow-up amendment must close the gap.
- The automation identity for the future 1-approval target is not defined.
- The classifier does not read a ticket's self-change class, so a `governance` or `bootstrap` ticket whose pull request is rated low risk is held by Coordinator practice, not by an automated check.

## Activation

v0.9.9 is not the active package until TICKET-142 merges. Tickets that start before activation finish under the rules active when they started (Mid-Flight Rule in `SELF_APPLICATION.md`).
