# Genesis v0.8 Governance Updates

**Date:** January 18, 2026  
**Authority:** Founder Decision  
**Status:** Implemented

---

## Summary of Changes from v0.7 to v0.8

### 1. Coordinator Role Redesign

**Previous (v0.7):**
- Coordinator: ChatGPT instance with NO filesystem access
- Could only plan work conceptually
- No actual environment interaction

**Updated (v0.8):**
- Coordinator: VS Code Copilot with FULL filesystem, GitHub, and log access
- Manages ticket workflow states (01_DRAFT → 02_VERIFIED → ... → CLOSED)
- Moves tickets between states
- Manages GitHub PR/branch lifecycle
- Writes to logs and decision trails
- **RESTRICTION:** Cannot execute ticket work (implementation only)

**File Updated:**
- `04_PHASE_4_ENVIRONMENT/STARTUP_ROLE_CONTRACTS.md` — Section 2

---

### 2. Execution Agent Clarification

**Previous (v0.7):**
- "Execution Role" with autonomous decision-making authority
- Could make phase transitions and state changes

**Updated (v0.8):**
- "Execution Agent" with escalation-first model
- **ALL** decisions must escalate to Coordinator
- Cannot move tickets between states
- Cannot make phase/workflow decisions
- Focus: Execute assigned work only

**File Updated:**
- `04_PHASE_4_ENVIRONMENT/STARTUP_ROLE_CONTRACTS.md` — Section 3

---

### 3. Intent Overseer Role Defined

**New (v0.8):**
- Validates tickets for structure, clarity, and governance alignment
- **Only role** that can move tickets from 01_DRAFT → 02_VERIFIED
- Checks ticket completion and proper format
- Independent authority (reports to Founder, not Coordinator)
- Can block phase transitions if governance violated

**New File:**
- `05_PHASE_5_EXECUTION/TICKET_VALIDATION_WORKFLOW.md`

**Files Updated:**
- `01_PHASE_1_INTENT/ROLE_MODEL.md` — Added Intent Overseer section

---

### 4. Governance Amendment Authority

**Previous (v0.7):**
- Strategy role "approves governance amendments"
- Unclear authority chain for amendments

**Updated (v0.8):**
- Founder: Approves amendment
- Founder: Issues explicit implementation authority to Strategy
- Strategy: Implements approved amendment ONLY
- Coordinator: Explicitly excluded from governance changes
- All changes logged in `governance/overrides/amendments.log.md`

**File Updated:**
- `00_GLOBAL/GENESIS_CONSTITUTION.md` — Section 9 (expanded)
- `01_PHASE_1_INTENT/ROLE_MODEL.md` — Strategy role definition

---

### 5. Ticket Workflow Formalized

**New (v0.8):**
Explicit ticket state machine with role responsibilities at each gate:

```
01_DRAFT          → [Intent Overseer validation] →
02_VERIFIED       → [Coordinator assignment] →
03_EXECUTING      → [Execution Agent work] →
04_MERGE_READY    → [Coordinator PR management] →
05_COMPLETE       → [Archive] →
CLOSED
```

**New File:**
- `05_PHASE_5_EXECUTION/TICKET_VALIDATION_WORKFLOW.md`

---

### 6. Initialization Tools Documented

**New (v0.8):**
- Command: `genesis-control-plane.initializeGenesis`
- Command: `genesis-control-plane.importGovernanceZip`
- Setup workflows for bootstrapping Genesis control plane
- Authority: Coordinator role only
- Audit trails in amendments.log.md

**New File:**
- `04_PHASE_4_ENVIRONMENT/INITIALIZATION_TOOLS.md`
---

## 6. Ticket Format Changed to Markdown Files

**Previous (v0.7):**
- Tickets delivered as single code block (fenced)
- No nested code blocks allowed
- Difficult to reference and version control

**Updated (v0.8):**
- Tickets are individual .md files in `Genesis Execution/tickets/01_DRAFT/`
- Named: `[CATEGORY]-[NUMBER]-[SHORT-TITLE].md`
- Plain Markdown format (no single-fenced requirement)
- Each ticket is version-controllable and searchable
- Can be moved through workflow states (01_DRAFT → 02_VERIFIED → ... → 05_COMPLETE)

**Files Updated/Created:**
- `05_PHASE_5_EXECUTION/TICKET_TEMPLATE.md` — Completely rewritten
- `05_PHASE_5_EXECUTION/COORDINATOR_TICKET_GUIDE.md` — New guide for creating tickets

---

## 7. Coordinator Ticket Creation Guide

**New (v0.8):**
- Step-by-step guide for Coordinator ticket creation
- Workflow from 01_DRAFT through 05_COMPLETE
- Self-review checklist before submission
- Escalation procedures
- Common ticket patterns by category (GOV, OPS, ENGINE, UI, LRN)
- Quality checklist

**New File:**
- `05_PHASE_5_EXECUTION/COORDINATOR_TICKET_GUIDE.md`
---

## Key Behavioral Changes

### Change 1: Coordinator Now Has Filesystem Access

**Impact:**
- Coordinator is no longer limited to "planning only"
- Coordinator actively manages the ticket system structure
- Coordinator writes to logs and status files
- Still cannot execute ticket work

**Implementation:**
- Use VS Code Copilot for Coordinator tasks
- Provide filesystem access to `Genesis Execution/tickets/` and logs

---

### Change 2: All Execution Decisions Escalate to Coordinator

**Impact:**
- Execution Agent cannot make independent phase/state decisions
- Removes risk of Agent autonomously changing workflow state
- Creates clear escalation point

**Implementation:**
- Execution Agent reports status to Coordinator
- Coordinator evaluates and makes state decisions
- All escalations logged

---

### Change 3: Intent Overseer is Gatekeeper for Draft→Verified

**Impact:**
- Ensures every ticket meets quality before execution
- Independent validation (not Coordinator's job)
- Can block tickets without Coordinator override

**Implementation:**
- Intent Overseer role explicitly owns DRAFT→VERIFIED transition
- Coordinator cannot bypass this gate
- Blocking decisions escalate to Founder

---

### Change 4: Founder Explicitly Authorizes Governance Changes

**Impact:**
- No silent governance amendments
- Founder approval is explicit and logged
- Strategy is implementer, not decision-maker

**Implementation:**
- GOV tickets require founder approval before execution
- Strategy receives explicit authority for each amendment
- Amendment logged with timestamp and authority reference

---

## Governance Documents Modified/Created

### Created (New in v0.8)

1. **INITIALIZATION_TOOLS.md** — Bootstrap commands and procedures
2. **TICKET_VALIDATION_WORKFLOW.md** — Detailed ticket state machine and role gates
3. **TICKET_TEMPLATE.md** — Completely rewritten for .md file format
4. **COORDINATOR_TICKET_GUIDE.md** — Step-by-step guide for Coordinator ticket creation

### Modified (Updated from v0.7)

1. **STARTUP_ROLE_CONTRACTS.md**
   - Section 2: Coordinator environment and capabilities expanded
   - Section 3: Execution Agent escalation model clarified

2. **TICKET_TEMPLATE.md**
   - Completely rewritten for Markdown file format
   - Tickets are individual .md files in `Genesis Execution/tickets/01_DRAFT/`
   - File naming: `[CATEGORY]-[NUMBER]-[SHORT-TITLE].md`
   - Removed single-fenced code block requirement
   - Includes example complete ticket (GOV-0001)

3. **ROLE_MODEL.md**
   - Updated Coordinator description (filesystem access, state management)
   - Added Execution Agent definition
   - Added Intent Overseer definition

4. **GENESIS_CONSTITUTION.md**
   - Section 9: Amendment authority chain clarified
   - Founder → Strategy explicit authorization model

---

## Unchanged Core Principles (Preserved from v0.7)

- Founder has absolute authority
- Governance is mandatory and machine-enforceable
- Tickets are the primary control surface
- Gates block progress until passed
- Completion contracts with evidence required
- Escalation protocols for ambiguity
- Auditable trails for all decisions

---

## Transition Impact

### For Coordinator Implementations
- Gain filesystem and GitHub access
- Assume responsibility for ticket state management
- Must log all state transitions
- Cannot make content/work decisions (escalate to Intent Overseer)

### For Execution Agent Implementations
- Must escalate all questions/blockers to Coordinator
- Cannot move tickets between states
- Focus on ticket execution only
- Report status, don't make workflow decisions

### For Intent Overseer Implementations
- New formal role in v0.8
- Gate-keeper for DRAFT→VERIFIED transitions
- Independent validation authority
- Can block tickets and escalate to Founder

### For Strategy Implementations
- Cannot propose governance changes unilaterally
- Must receive explicit founder authorization for each amendment
- Implementation authority is specific to approved amendment
- Still interprets founder intent for product decisions

### For Founder
- Maintain approval authority over all governance changes
- Provide explicit implementation authority to Strategy (one amendment at a time)
- Approve phase transitions
- Resolve irreducible conflicts

---

## Success Criteria for v0.8 Implementation

✅ Coordinator can manage ticket workflow states  
✅ Intent Overseer validates every ticket before execution  
✅ Execution Agent escalates all decisions to Coordinator  
✅ Founder approves all governance changes explicitly  
✅ Strategy implements approved amendments only  
✅ All role transitions logged in amendments.log.md  
✅ Initialization tools functional and documented  
✅ No silent governance violations or state changes  

---

## Questions or Clarifications?

For questions about v0.8 governance:
1. Refer to TICKET_VALIDATION_WORKFLOW.md for ticket state machine
2. Refer to STARTUP_ROLE_CONTRACTS.md for role environment boundaries
3. Refer to INITIALIZATION_TOOLS.md for setup procedures
4. Escalate governance conflicts to Founder via decision log
