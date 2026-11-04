# Genesis v0.9.5 — Phase 3: Governance Review

## Purpose

Phase 3 validates that Phase 2 specifications are constitutionally sound, operationally feasible, and compliant with governance gates. This phase enforces the **decision interrupt protocol** and governance gate checkpoints (see `GOVERNANCE_GATES.md`, `DECISION_INTERRUPT_PROTOCOL.md`). No specification passes to Phase 4 without Phase 3 gate clearance.

Phase 3 is the **enforcement layer**: ambiguities are surfaced and resolved before execution begins. If specifications fail gates, they return to Phase 2 for revision.

**v0.9.5 Enhancement:** Phase 3 now features **automated governance validation** via GovernanceValidationService, replacing manual gate review with systematic checks and HTML reporting.

## Authority

- **Founder** — Final authority on constitutional violations or strategic realignment (invoked via decision interrupt protocol)
- **Strategy** — Reviews specifications against Phase 1 intent and `GENESIS_CONSTITUTION.md`
- **Coordinator** — Chairs gate reviews and manages decision interrupt escalations
- **Execution** — Validates operational feasibility (no blockers to Phase 4–5 execution)

## Explicitly Allowed

- Gate-by-gate review of Phase 2 specifications against `GOVERNANCE_GATES.md`
- Invocation of `DECISION_INTERRUPT_PROTOCOL.md` if specifications violate constitution or gates
- Specification revision requests returned to Phase 2
- Tool intelligence and UI behavior gate reviews (see `TOOL_INTELLIGENCE_GATE.md`, `UI_BEHAVIOR_GATE.md`, `UI_BEHAVIOR_GATE_POLICY.md`)
- Founder escalation if gates cannot be resolved at Strategy/Execution level
- Generation of gate clearance artifacts

## Explicitly Required
- Direction Required: No execution actions permitted in this phase. Direction occurs only through the phase gate confirmations defined in 00_GLOBAL/PERMISSION_SEMANTICS.md.

- All governance gates from `GOVERNANCE_GATES.md` must be reviewed and documented
- Each gate clearance must be signed by appropriate authority (Strategy, Execution, or Founder)
- Any decision interrupt must be recorded in `DECISION_INTERRUPT_PROTOCOL.md` format
- Tool intelligence validation using `TOOL_INTELLIGENCE_GATE.md` criteria
- UI behavior validation using `UI_BEHAVIOR_GATE.md` and `UI_BEHAVIOR_GATE_POLICY.md` standards
- LLM decision sources validated against `GOVERNANCE_LLM_SOURCES.md` if applicable
- Resolution precedence followed per `GOVERNANCE_RESOLUTION_PRECEDENCE.md`

## Explicitly Forbidden

- Modification of frozen Phase 2 specifications without return to Phase 2 for revision
- Skipping any required governance gate
- Founder override of gates without documented decision interrupt
- Introduction of Phase 4 (environment) or Phase 5 (execution) concerns into gate reviews
- Unresolved ambiguities passed forward to Phase 4

## Required Outputs

- Gate review documentation: each gate evaluated and signed off
- Decision interrupt log (if any escalations occurred)
- Specification revisions (returned to Phase 2, with Phase 2 confirmation on re-entry)
- Phase 3 clearance certification signed by Strategy and Execution leads
- **v0.9.5:** HTML validation report (if using automated validation)

## Automated Governance Validation (v0.9.5)

### GovernanceValidationService

**Purpose:** Automates Phase 3 governance validation with systematic checks and HTML reporting, reducing manual review time and ensuring consistent enforcement.

**Activation:** User clicks "✓ Start Validation" button on Phase 3 Step 0 in Phase Workflow UI.

**Validation Checks:**

1. **Phase 1 Outputs Validation:**
   - Strategic directive exists in `Genesis Execution/specs/Application Specs/`
   - File has required frontmatter (phaseGate, phase, role, status)
   - Strategic directive is marked complete

2. **Phase 2 Outputs Validation:**
   - Screen-Index.md exists in `Genesis Execution/specs/UX Specs/`
   - Screen-Index.md has valid checklist format
   - All screens listed have corresponding folders
   - Each screen folder contains both Specification.md and Questions.md
   - All screen files have required frontmatter

3. **Folder Structure Validation:**
   - Genesis Execution directory structure complete:
     - governance/ (with active.json)
     - specs/UX Specs/
     - specs/Application Specs/
     - tickets/ (with 5 lifecycle folders)
     - handoffs/ (with 4 validation folders + phase-gates/)
     - tickets/completion-contractsontracts/
     - issues/ (v0.9.5)
     - guidance/ (v0.9.5)
     - escalation/ (v0.9.5)

4. **Gate Documents Validation:**
   - Phase 1 completion gate exists
   - Phase 2 completion gate exists

**Validation Report:**

- **HTML Format:** Displays in webview panel
- **Sections:**
  - Summary (total checks, passed, failed, warnings)
  - Error table (critical failures blocking Phase 4)
  - Warning table (non-blocking issues for review)
  - Success confirmation (if all checks pass)

**Automated Gate Creation:**

- **If all checks pass:** Service automatically creates `PHASE-3-COMPLETE-[TIMESTAMP].md` gate in `Genesis Execution/handoffs/phase-gates/`
- **If checks fail:** Escalates to Intent Overseer with detailed failure summary for manual review

**Benefits:**
- ✅ Faster validation (seconds vs. minutes)
- ✅ Consistent enforcement (no human error)
- ✅ Clear error reporting (specific file paths and issues)
- ✅ Automatic gate creation (when all pass)
- ✅ Escalation to manual review (when needed)

## Gate to Next Phase

**Phase 3 → Phase 4 Gate:**

**Intent Overseer** must create phase gate handoff per HANDOFF_TEMPLATES.md section 9:
- File: `Genesis Execution/handoffs/phase-gates/PHASE-3-COMPLETE-[TIMESTAMP].md`
- Contains: Governance review results and gate clearances
- Includes: Constitutional compliance confirmation
- Authorizes: Phase 4 (Environment Setup) to begin

Coordinator confirms: *"All governance gates have been reviewed and cleared. Phase 2 specifications pass constitutional review and are approved for Phase 4 environment setup."*

Strategy verifies:
- ✓ All gates documented and signed
- ✓ No open decision interrupts
- ✓ Phase 2 specifications remain frozen
- ✓ Execution lead confirms no operational blockers
- ✓ **GitHub repository location confirmed and accessible**
- ✓ **Phase 3 completion handoff exists in Genesis Execution/handoffs/phase-gates/**

**Upon confirmation, proceed to Phase 4: Environment Start-Up.**
