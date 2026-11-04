# Genesis v0.9.7 Roadmap Status

**Status Date:** 2026-08-07  
**Scope:** Extension roadmap status across implemented, partial, drift, and planned items

## Status Legend

- `Complete` — implemented and reflected in the current extension codebase
- `Partial` — implemented in part, but still requires governance alignment, cleanup, or validation hardening
- `Drift` — implemented or documented inconsistently with the current governance standard
- `Planned` — still a roadmap item, not yet fully implemented in the extension

## Roadmap Status Table

| Area | Status | Current State | What Remains |
| --- | --- | --- | --- |
| VS Code engine floor | Complete | Extension floor raised to 1.131+ | Reassess only when future platform features require it |
| Phase 6 persisted revision artifacts | Complete | Screen-level revision request/spec/handoff persistence exists | Keep aligned with canonical naming and approval rules |
| Phase 6 artifact opening | Complete | Review studio opens persisted revision artifacts directly | No immediate gap |
| Root governance surfaces | Complete | Workspace-level Copilot instructions, skill baselines, and MCP baseline added | Expand only as governance-aware tooling matures |
| Browser review host policy | Complete | Browser review domain policy enforcement exists | Add richer deterministic evidence capture later |
| Read-only vs governed-write tool separation | Complete | Tool mode separation exists for governed LM surfaces | Extend role-based policy across additional workflows |
| Audit export baseline | Complete | Local audit bundle export baseline exists | Add enterprise destinations later |
| Workspace readiness reporting | Complete | Readiness checks for target-repository onboarding exist | Broaden checks as onboarding flows mature |
| Session-aware chat/runtime routing | Complete | Session-aware opening and fallback routing exists | Expand governed multi-session grouping and isolation |
| Playwright enterprise policy baseline | Complete | Governance docs cover headless, workers, sharding, and serial exceptions | Keep application templates and docs aligned |
| Fail-fast execution control | Complete | Phase 5 automation now pauses on first real blocker and avoids blind wait loops | Add regression tests if needed |
| Screen-level Phase 6 to Phase 5 re-entry | Complete | Screen comments produce revision artifacts and governed draft tickets | Keep aligned with naming and handoff standards |
| Workspace-level Phase 6 re-entry intake | Partial | UI and artifact/ticket flow are present locally in the review studio | Align naming, approval gating, and classification to governance before considering complete |
| Founder-defined change type after initial creation | Planned | Discussed and conceptually modeled | Add founder-facing request type plus governance normalization fields |
| Canonical artifact/branch/handoff standard | Complete | Formalized in `00_GLOBAL/ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md` | Correct conflicting docs and runtime prompts |
| Governance doc consistency for handoffs and locations | Drift | Some docs still reference old owners or old paths | Normalize docs to the new authoritative standard |
| Completion contract path in execution prompt | Drift | Execution prompt still references old `contracts/completion` path | Update runtime prompt and any stale docs |
| Governance-aware review skill expansion | Planned | Baseline skill structure exists | Add richer governed review skills and review-safe automation |
| Richer read-only MCP review capabilities | Planned | Basic governed inspection exists | Add more review-safe artifact, PR, and log inspection tools |
| Enterprise observability integrations | Planned | Local export baseline exists | Map audit/session records into SIEM, Purview, or equivalent |
| Worktree and session operating conventions | Planned | Session-aware capability exists in baseline form | Formalize binding, naming, isolation, and evidence persistence rules |

## Immediate Remaining Work

1. Normalize governance documents to the canonical artifact, branch, and handoff standard.
2. Fix stale runtime references to legacy completion-contract locations.
3. Decide and document founder-defined change type handling in Phase 6 intake.
4. Align the workspace-level Phase 6 re-entry implementation to approved governance before treating it as complete.
5. Run focused validation after the governance-alignment edits.

## Recommended Next Test Pass

After the remaining governance-alignment edits are complete, validate:

1. `npm run compile`
2. Focused tests covering browser governance, session-aware routing, and Phase 6 review flows
3. Manual Phase 6 review studio exercise for revision artifact generation and Phase 5 re-entry behavior
