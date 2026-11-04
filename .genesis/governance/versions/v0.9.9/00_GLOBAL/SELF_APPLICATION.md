# Self-Application And Autonomy Ladder

**Version:** v0.9.9  
**Status:** Authoritative  
**Authority:** GENESIS_CONSTITUTION.md, CODEBASE_MANAGEMENT.md, PERMISSION_SEMANTICS.md

## Recursion Rule

Genesis may change Genesis only by treating `Genesis-Extension` as a Genesis-managed product.

Any self-improvement must follow:

```text
revision request -> revision spec when required -> TICKET-NNN -> ticket/* branch -> gates -> PR -> merge -> branch delete
```

If a change cannot be expressed that way, it is an ungoverned edit.

## Self-Change Classes

Every Track A ticket must declare one class:

- `product` — extension behavior or UI
- `governance` — policy, constitution, or role contracts
- `tooling` — CI, skills, prompts, workflows
- `bootstrap` — the process that enforces the process

## Autonomy Classes

Standing authorization is granted by class, not by a general self-edit privilege.

| Class | Allowed | Merge |
| --- | --- | --- |
| 0 | Propose revision request or draft ticket only | No |
| 1 | Draft and validate tickets | No |
| 2 | Implement on a ticket branch, open PR, fill completion contract | Human merge |
| 3 | Auto-merge Track A tickets on the Class 3 allowlist after gates pass | Squash only |
| 4 | Search for improvements and open Class 0/1 artifacts | No self-merge |

Default for new Track A work is Class 2 after a revision spec exists. Class 3 is the default for Track A tickets of self-change class `product` or `tooling` whose pull request the classifier rates low risk. Default for constitution, commercial, auth, and merge-policy work is Class 0.

## Class 3 Allowlist

A Track A pull request is on the Class 3 allowlist when the `Merge eligibility` check rates it low risk (rules in `docs/AUTONOMY_POLICY.md`, logic in `.github/scripts/pr-gates.js`) and its ticket's self-change class is `product` or `tooling`. There is no separate list of tickets. Unknown, truncated, or unreadable inputs are high risk and are not on the allowlist.

## Deny List

Class 3 auto-merge is forbidden for:

- `governance`
- `bootstrap`
- commercial, auth, or EDH changes
- CODEOWNERS-protected paths unless Founder approval is recorded
- any change that weakens merge gates
- force-push or history rewrite on `main`

The `approved-by-founder` label, applied by a Founder login after the latest commit, is the recorded Founder approval that lifts the CODEOWNERS-protected-paths entry. It does not lift the `governance`, `bootstrap`, commercial, auth, or EDH entries, and it does not permit force-push or history rewrite on `main`.

Raising an autonomy class is a Founder-approved governance amendment. Agents may not raise their own class, including by editing gate files such as `.github/scripts/pr-gates.js`, the merge-gate workflows, `docs/AUTONOMY_POLICY.md`, or `docs/BRANCH_PROTECTION.md`.

### Open Gap: EDH Classification

EDH paths are not yet in the risk classifier. The deny list still names EDH changes, but until EDH paths are added to the classifier, an EDH change outside the high-risk paths can be rated low risk. The Founder has accepted this gap. A follow-up amendment must close it.

## Mid-Flight Rule

A ticket that changes how tickets work must complete under the rules that were active when it started. New rules apply to the next ticket.

## Kill Switch

Founder may pause execution authorization or force autonomy Class <= 1. Agents must read `execution-authorization.json` before acting.

## Portability Invariant

A recursive change is incomplete if it leaves machine transfer broken: path assumptions, unpushed state, or secrets committed to git.
