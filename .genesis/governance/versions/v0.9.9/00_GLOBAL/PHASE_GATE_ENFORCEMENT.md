# Phase Gate Enforcement System

## Overview

Genesis governance enforces sequential phase progression through formal handoff documents. Phases cannot be skipped. Each phase must complete with evidence before the next phase can begin.

### Handoff Artifact Naming Matrix

| Artifact | File name pattern | Location | Owner (create → read/validate) |
| --- | --- | --- | --- |
| Phase 1 → 2 Gate | PHASE-1-COMPLETE-[TIMESTAMP].md | `[ProjectName]/Genesis Execution/handoffs/phase-gates/` | Strategy Agent → Strategy Agent (self-continue) |
| Phase 2 → 3 Gate | PHASE-2-COMPLETE-[TIMESTAMP].md | `[ProjectName]/Genesis Execution/handoffs/phase-gates/` | Strategy Agent → Intent Overseer |
| Phase 3 → 4 Gate | PHASE-3-COMPLETE-[TIMESTAMP].md | `[ProjectName]/Genesis Execution/handoffs/phase-gates/` | Intent Overseer → Coordinator |
| Validation Approved | VALIDATION-APPROVED-[TIMESTAMP].md | `[ProjectName]/Genesis Execution/handoffs/validation-approved/` | Intent Overseer → Coordinator |
| Validation Partial | VALIDATION-PARTIAL-[TIMESTAMP].md | `[ProjectName]/Genesis Execution/handoffs/validation-partial/` | Intent Overseer → Coordinator |
| Validation Rework | VALIDATION-REWORK-[TIMESTAMP].md | `[ProjectName]/Genesis Execution/handoffs/validation-rework/` | Intent Overseer → Coordinator |
| Ticket Validation Request | [TICKET-ID].md | `[ProjectName]/Genesis Execution/tickets/01_DRAFT/` | Coordinator → Intent Overseer |
| Ticket Validation Feedback (optional separate file) | [TICKET-ID]-FEEDBACK.md | `[ProjectName]/Genesis Execution/tickets/01_DRAFT/` | Intent Overseer → Coordinator |
| Verified Ticket | [TICKET-ID].md | `[ProjectName]/Genesis Execution/tickets/02_VERIFIED/` | Intent Overseer (moves) → Coordinator/Execution |
| Execution Authorization | execution-authorization.json | `[ProjectName]/Genesis Execution/governance/` | Coordinator → Execution Agent |
| Completion Contract | [TICKET-ID].contract.md | `[ProjectName]/Genesis Execution/tickets/completion-contracts/` | Execution Agent → Coordinator |

## Problem Solved

Without phase gate enforcement, projects were skipping from Phase 1 (Intent) directly to Phase 3/4 (Governance Review/Execution), bypassing Phase 2 (Specification). This violated the governance model which requires:
- Phase 1: Strategic intent and founder approval
- Phase 2: Detailed specifications and design freeze
- Phase 3: Governance review of specifications
- Phase 4+: Environment setup and execution

## Phase Gate Architecture

### Phase 1 → Phase 2 Gate

**Responsible Role:** Strategy Agent  
**Gate Document:** `Genesis Execution/handoffs/phase-gates/PHASE-1-COMPLETE-[TIMESTAMP].md`  
**Template:** HANDOFF_TEMPLATES.md section 7

**Requirements:**
- All Phase 1 outputs present and signed:
  - Project GENESIS_CONSTITUTION.md (or governance framework)
  - Project ROLE_MODEL.md
  - Genesis Execution/specs/Application Specs/STRATEGIC_DIRECTIVE_[NAME].md (strategic directive(s))
  - GitHub repository location documented
  - Initial project directory structure created (Genesis Execution/specs/, src/)
- No contradictions between constitution and directives
- Founder sign-off confirmation
- Phase 2 authorization statement

**Handoff Flow:**
1. Strategy Agent completes Phase 1 with founder approval
2. Strategy Agent creates PHASE-1-COMPLETE-[TIMESTAMP].md per template
3. Strategy Agent uses "Phase 1 Complete" handoff to continue into Phase 2 work
4. Strategy Agent begins Phase 2 specification per PHASE_2_RULES.md

**Governance Reference:** PHASE_1_RULES.md "Gate to Next Phase" section

---

### Phase 2 → Phase 3 Gate

**Responsible Role:** Strategy Agent  
**Gate Document:** `Genesis Execution/handoffs/phase-gates/PHASE-2-COMPLETE-[TIMESTAMP].md`  
**Template:** HANDOFF_TEMPLATES.md section 8

**Requirements:**
- Specification freeze confirmation with timestamp
- All specifications stored in project Genesis Execution/specs/ directory:
  - Genesis Execution/specs/UX Specs/ — UI/UX specifications and requirements
  - Genesis Execution/specs/UX Screens/ — Founder-designed screen wireframes and mockups
  - Genesis Execution/specs/Application Specs/ — Application-level specifications (Phase 1)
  - Genesis Execution/specs/technical/ — Technical specifications and requirements
  - Genesis Execution/specs/api/ — API specifications (if applicable)
  - Genesis Execution/specs/architecture/ — System architecture specifications
- All specifications traceable to Phase 1 intent
- UI governance policies applied consistently (UI_GOVERNANCE.md)
- Founder sign-off on specifications
- No unresolved clarifications with founder
- Phase 3 authorization statement

**Handoff Flow:**
1. Strategy Agent completes Phase 2 specifications and UX specs
2. Founder designs UX screens and places them in Genesis Execution/specs/UX Screens/
3. Strategy Agent freezes specifications with timestamp
4. Strategy Agent creates PHASE-2-COMPLETE-[TIMESTAMP].md per template
5. Strategy Agent uses "Phase 2 Complete" handoff to Intent Overseer
6. Intent Overseer performs CRITICAL check before validating any tickets:
   - Checks for existence of PHASE-2-COMPLETE-*.md file
   - Verifies specification freeze timestamp
   - Verifies traceability to Phase 1
   - BLOCKS all ticket validation if Phase 2 gate missing

**Governance Reference:** PHASE_2_RULES.md "Gate to Next Phase" section

---

## Enforcement Mechanisms

### Agent Handoffs

Each agent has updated handoff prompts that reference HANDOFF_TEMPLATES.md:

**Strategy Agent:**
- "Phase 1 Complete" handoff (references section 7)
  - Creates PHASE-1-COMPLETE-[TIMESTAMP].md
  - Hands off to Strategy (self) to begin Phase 2 work

- "Phase 2 Complete" handoff (references section 8)
  - Creates PHASE-2-COMPLETE-[TIMESTAMP].md
  - Hands off to Intent Overseer with gate document location

**Coordinator Agent:**
- Does NOT participate in Phase 2
- Begins work in Phase 5 (Execution) after Intent Overseer approves tickets

**Intent Overseer:**
- "Phase 3 Approved" handoff
  - First validates Phase 2 gate exists
  - Performs governance review per PHASE_3_RULES.md
  - Approves tickets for execution ONLY after Phase 2 gate confirmed

### Phase Rules Updates

**PHASE_1_RULES.md:**
- Updated "Gate to Next Phase" section
- Requires Strategy Agent to create phase gate handoff
- Strategy Agent proceeds to Phase 2 after gate document created

**PHASE_2_RULES.md:**
- Updated "Gate to Next Phase" section
- Requires Strategy Agent to create phase gate handoff
- Strategy must verify traceability to Phase 1
- Intent Overseer must check gate before Phase 3

### Intent Overseer Blocking Authority

**New Section: "CRITICAL: Phase Gate Validation (FIRST CHECK)"**

Intent Overseer has explicit blocking authority:
```
BLOCK ALL TICKET VALIDATION if Phase 2 gate missing
Report: "Phase 3 cannot begin. Phase 2 not complete."
```

This prevents:
- Skipping Phase 2 specifications
- Moving to execution without governance review
- Creating tickets before specifications frozen
- Bypassing phase progression sequence

---

## Directory Structure

```
Genesis Execution/
├── handoffs/
│   ├── validation-approved/     # Intent Overseer approvals
│   ├── validation-partial/      # Partial approvals
│   ├── validation-rework/       # Rework requests
│   └── phase-gates/            # Phase transition gates
│       ├── PHASE-1-COMPLETE-[TIMESTAMP].md
│       └── PHASE-2-COMPLETE-[TIMESTAMP].md
```

---

## Verification Process

### For Strategy Agent (Phase 1 Complete)

1. Confirm all Phase 1 outputs exist and are signed
2. Check for contradictions between documents
3. Verify founder approval documented
4. Create PHASE-1-COMPLETE-[TIMESTAMP].md with:
   - Verification checklist (all items checked)
   - Founder sign-off confirmation
   - Phase 2 authorization statement
5. Use "Phase 1 Complete" handoff to Coordinator

### For Coordinator (Phase 2 Complete)

1. Confirm all specifications complete and frozen
2. Verify traceability to Phase 1 intent
3. Document specification freeze timestamp
4. Confirm technical feasibility assessed
5. Create PHASE-2-COMPLETE-[TIMESTAMP].md with:
   - Specification freeze timestamp
   - Traceability verification
   - Technical feasibility confirmation
   - Phase 3 authorization statement
6. Use "Phase 2 Complete" handoff to Intent Overseer

### For Intent Overseer (Phase 3 Entry)

1. **FIRST CHECK:** Verify Phase 2 gate exists
   ```bash
   ls Genesis\ Execution/handoffs/phase-gates/PHASE-2-COMPLETE-*.md
   ```
2. If missing: BLOCK all ticket validation
3. If present: Verify freeze timestamp and traceability
4. Proceed with ticket validation per governance
5. Use "Phase 3 Approved" handoff when complete

---

## Failure Scenarios

### Scenario: Phase 2 Skipped

**Problem:** Project goes from Phase 1 intent directly to Phase 3/4 execution without specifications.

**Detection:**
- Intent Overseer checks for PHASE-2-COMPLETE-*.md
- File does not exist

**Response:**
- Intent Overseer blocks all ticket validation
- Reports to Coordinator: "Phase 2 not complete"
- Coordinator must complete specifications and create gate
- Process cannot continue until gate exists

**Prevention:**
- Intent Overseer performs gate check BEFORE validating ANY tickets
- Blocking authority prevents premature execution
- Handoff system makes phase progression explicit

### Scenario: Phase 1 Skipped

**Problem:** Project starts in Phase 2 without founder intent.

**Detection:**
- Coordinator checks for PHASE-1-COMPLETE-*.md before Phase 2 work
- File does not exist

**Response:**
- Coordinator escalates to Strategy Agent
- Strategy Agent works with founder to complete Phase 1
- Phase 1 gate created before Phase 2 begins

**Prevention:**
- Phase rules require gate verification
- Agent handoffs enforce sequence
- Cannot create Phase 2 gate without Phase 1 gate

---

## Testing Phase Gates

### Manual Test: Phase 1 → Phase 2

1. Start new project
2. Complete Phase 1 with founder
3. Strategy Agent creates PHASE-1-COMPLETE-[TIMESTAMP].md
4. Verify file exists: `ls Genesis\ Execution/handoffs/phase-gates/PHASE-1-COMPLETE-*.md`
5. Verify checklist complete: `cat Genesis\ Execution/handoffs/phase-gates/PHASE-1-COMPLETE-*.md`
6. Coordinator begins Phase 2 ONLY after verifying gate

### Manual Test: Phase 2 → Phase 3

1. Complete Phase 2 specifications
2. Freeze specifications with timestamp
3. Coordinator creates PHASE-2-COMPLETE-[TIMESTAMP].md
4. Verify file exists: `ls Genesis\ Execution/handoffs/phase-gates/PHASE-2-COMPLETE-*.md`
5. Verify traceability: `cat Genesis\ Execution/handoffs/phase-gates/PHASE-2-COMPLETE-*.md`
6. Intent Overseer checks gate BEFORE validating tickets
7. If gate missing, Intent Overseer BLOCKS validation

### Manual Test: Phase Skipping Prevention

1. Attempt to start Phase 3 without Phase 2 gate
2. Intent Overseer checks for PHASE-2-COMPLETE-*.md
3. File does not exist
4. Intent Overseer BLOCKS with message: "Phase 2 not complete"
5. Coordinator must complete Phase 2 and create gate
6. Process resumes after gate created

---

## Governance References

- **PHASE_1_RULES.md:** Phase 1 outputs and gate requirements
- **PHASE_2_RULES.md:** Specification freeze and gate requirements
- **PHASE_3_RULES.md:** Governance review process
- **HANDOFF_TEMPLATES.md:** Section 7 (Phase 1 gate), Section 8 (Phase 2 gate)
- **Strategy Agent/agent.md:** Phase 1 Complete handoff
- **Coordinator Agent/agent.md:** Phase 2 Complete handoff
- **Intent Overseer/agent.md:** Phase gate validation authority

---

## Version History

- **v0.9:** Phase gate enforcement system created
  - Added phase gate handoff templates (sections 7-8)
  - Updated agent handoffs with gate creation
  - Added Intent Overseer blocking authority
  - Updated PHASE_1_RULES.md and PHASE_2_RULES.md
  - Created PHASE_GATE_ENFORCEMENT.md documentation
