```markdown
# Governance Resolution & Precedence

**Status:** Authoritative Resolver
**Authority:** Genesis Foundational Constitution and Amendments
**Scope:** All Genesis governance documents in v0.6A

---

## Canonical Precedence Hierarchy

1. Founder Intent (explicit, time-stamped directive)
2. Genesis Foundational Constitution
3. Constitution Amendments
4. Governance Resolution & Precedence (this document — conflict resolution rules)
5. Operating Standards
6. Governance Gates and Policies (including enforcement protocols)
7. Role Protocols (e.g., Decision Interrupt, Coordinator procedures)
8. Templates and Artifacts (e.g., TICKET_TEMPLATE.md, Completion Contract)
9. Indices and Non-binding Guidance (e.g., GOVERNANCE_INDEX.md, Learning Logs)

If two sources at the same tier conflict, apply Ambiguity Resolution below.

---

## Role Authority Boundaries

- **Strategy:** Defines intent and prioritization; may authorize or revoke strategic direction; cannot bypass hard constraints without Founder override.
- **Coordinator:** Orchestrates execution, issues clarification requests, sets pause status at Ticket-Level; cannot modify constraints; ensures evidence and gates.
- **Execution:** Implements authorized work; may propose remediation; cannot self-authorize or expand scope.

Role escalation path for unresolved decisions: `Execution → Coordinator → Strategy → Founder`.

---

## Authorization Lifecycle States

- **Authorized:** Execution may proceed within declared scope and constraints.
- **Authorized-but-Paused:** Execution is paused pending resolution at declared scope (Ticket-Level default). Evidence collection and diagnostics may continue; no merges or code changes that alter governed artifacts.
- **Revoked:** Execution authorization removed; work must stop and re-authorize before any further changes.

State transitions must be recorded in the authoritative artifact (e.g., `execution-authorization.json`) and referenced in the affected ticket.

---

## Ambiguity Resolution Protocol

When ambiguity or policy conflict is detected:
1. Execution enters **Authorized-but-Paused** state at **Ticket-Level** scope (default).
2. Coordinator issues a clarification using `CLARIFICATION_REQUEST_TEMPLATE.md`.
3. Escalate per role path if unresolved.
4. Resume only when a binding resolution is recorded referencing the governing tier.

For foundational authority shifts (e.g., "AUTHORITATIVE & REPLACING PRIOR") the pause scope may be elevated to **Role-Level** or **System-Level** per the Halt Scopes section.

---

## Halt Scopes and Defaulting Rule

- **Ticket-Level:** Pause applies only to the identified ticket. This is the default when scope is unspecified.
- **Role-Level:** Pause applies to all tickets owned by or impacting a specific role/domain (e.g., UI execution).
- **System-Level:** Pause applies to all tickets across the system due to foundational contradictions or integrity risk.

When a statement implies a halt without explicit scope, interpret as: 
"Execution enters Authorized-but-Paused state at Ticket-Level scope (default)."

---

## UX Authority Split (Constraint vs Guidance)

- **UX Constraints (Hard Gates):** Non-negotiable rules that block merge on failure (e.g., data sourcing integrity, accessibility minimums, deterministic E2E). Violations trigger Authorized-but-Paused at Ticket-Level by default.
- **UX Guidance (Non-Blocking):** Recommended practices that do not block merge; record deviations with rationale.

All gating clauses must use the standardized halt semantics defined here.

---

## Bootstrap Rules and Exit Criteria

If a bootstrap phase is declared:
- **Start Definition:** Bootstrap begins when the repository lacks minimum governance artifacts or deterministic start scripts.
- **Non-Relaxable Constraints:** Constitution, Amendments, and Operating Standards remain binding in bootstrap.
- **Exit Criteria:** Recorded evidence that startup contract passes (e.g., `start:check`), main branch protections are enforced, and governance documents in this v0.6A set are present.

Bootstrap may not override precedence hierarchy; contradictions must trigger Authorized-but-Paused at Ticket-Level with escalation.

---

## Conflict Resolution Statement

All governance conflicts and precedence questions are resolved by this document. Wherever a document-level conflict exists, cite this file and apply the hierarchy and protocols herein.

```