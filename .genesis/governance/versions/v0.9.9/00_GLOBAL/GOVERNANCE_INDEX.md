# Genesis Governance Index

**Current Version:** v0.9.9 (see [VERSION.md](../VERSION.md) for version history; v0.9.9 becomes the active package when TICKET-142 merges)  
**Status:** Active (v0.9.8 until TICKET-142 merges)  
**Phase Structure Source:** v0.7  
**Agent Model Source:** v0.8

---

## How to Use This Governance

Genesis operates as a **phased lifecycle** with clear stage gates. Each phase has distinct authority, permissions, and outputs. To navigate this governance:

1. **Check version information** — Read [VERSION.md](../VERSION.md) to understand v0.9 architecture
2. **Identify your current phase** — Find it in the Phase Structure below
3. **Read the phase rules** — Start with PHASE_X_RULES.md to understand authority and constraints
4. **Know your role** — If you're an agent, read your role-specific agent.md file
5. **Respect the gates** — Phase transitions require explicit handoff documents; skipping gates is a governance violation

**Critical principle:** Phase entry determines authority and permission. Work outside your assigned phase requires founder approval via decision interrupt protocol.

---

## Phase Structure

### **Phase 1: Founder Intent**
- **Purpose:** Establish strategic foundation, governance principles, and role model
- **Rules:** [PHASE_1_RULES.md](01_PHASE_1_INTENT/PHASE_1_RULES.md)
- **Key Governing Documents:**
  - `GENESIS_CONSTITUTION.md` — Foundational governance framework
  - `ROLE_MODEL.md` — Role structure and expectations
  - `BOOTSTRAP.md` — Operational context narrative
  - `STRATEGIC_DIRECTIVE_TEMPLATE.md` — Founder strategic directives

### **Phase 2: Screen Definition & UX Specification**
- **Purpose:** Define UI/UX specifications and acceptance criteria for Phase 3 review
- **Rules:** [PHASE_2_RULES.md](02_PHASE_2_SPECIFICATION/PHASE_2_RULES.md)
- **Key Governing Documents:**
  - `UI_GOVERNANCE.md` — UI policy and decision framework
  - Phase 1 governing documents (reference authority)

### **Phase 3: Governance Review**
- **Purpose:** Validate Phase 2 specifications against governance gates and constitutional principles
- **Rules:** [PHASE_3_RULES.md](03_PHASE_3_GOVERNANCE_REVIEW/PHASE_3_RULES.md)
- **Key Governing Documents:**
  - `GOVERNANCE_GATES.md` — Gate criteria and validation checkpoints
  - `DECISION_INTERRUPT_PROTOCOL.md` — Escalation framework
  - `TOOL_INTELLIGENCE_GATE.md` — Tool validation criteria
  - `UI_BEHAVIOR_GATE.md` & `UI_BEHAVIOR_GATE_POLICY.md` — UI validation standards
  - `GOVERNANCE_RESOLUTION_PRECEDENCE.md` — Decision authority hierarchy
  - `GOVERNANCE_LLM_SOURCES.md` — LLM decision authority sources

### **Phase 4: Environment Start-Up**
- **Purpose:** Provision environment, onboard team, execute startup checklist
- **Rules:** [PHASE_4_RULES.md](04_PHASE_4_ENVIRONMENT/PHASE_4_RULES.md)
- **Key Governing Documents:**
  - `STARTUP_ROLE_CONTRACTS.md` — Role contracts and expectations
  - `START_EVERYTHING.md` — Startup sequence checklist
  - `OPERATING_STANDARDS.md` — Operational procedures (applies to all phases)
  - Phase 1 governing documents (role model reference)

### **Phase 5: Build & Execution**
- **Purpose:** Implement Phase 2 specifications; manage work, tickets, and code review
- **Rules:** [PHASE_5_RULES.md](05_PHASE_5_EXECUTION/PHASE_5_RULES.md)
- **Key Governing Documents:**
  - `TICKET_TEMPLATE.md` — Work ticket format
  - `TICKET_GENERATION_PROTOCOL.md` — Automated batch ticket creation protocol
  - `TICKET_LIFECYCLE.md` — Ticket state management
  - `PR_MERGE_POLICY.md` — Code review and merge procedures
  - `CODEBASE_MANAGEMENT.md` — Dual-track branch, CI, and merge rules
  - `EXECUTION_AUTHORIZATION_TEMPLATE.json` — Authorization schema
  - `CLARIFICATION_REQUEST_TEMPLATE.md` — Specification clarification requests
  - `OPERATING_STANDARDS.md` — Operational compliance

### **Phase 6: Founder Review & Fine Tuning**
- **Purpose:** Founder validation of Phase 5 deliverables; refinement cycle
- **Rules:** [PHASE_6_RULES.md](06_PHASE_6_FOUNDER_REVIEW/PHASE_6_RULES.md)
- **Key Governing Documents:**
  - `GENESIS_CONSTITUTION.md` & `GENESIS_CONSTITUTION_AMENDMENTS.md` — May be amended based on Phase 5 learnings
  - `STRATEGIC_DIRECTIVE_TEMPLATE.md` — Founder feedback recorded as directives
  - All prior phase documents (reference validation)

### **Phase 7: Production Release**
- **Purpose:** Deploy to production, validate operational stability, hand off to maintenance
- **Rules:** [PHASE_7_RULES.md](07_PHASE_7_RELEASE/PHASE_7_RULES.md)
- **Key Governing Documents:**
  - `OPERATING_STANDARDS.md` — Production operational compliance
  - Phase 5 deliverables (frozen; Phase 6 refinements integrated)

---

## Global Governance (All Phases)

### Cross-Phase Authorities

The following documents establish governance that applies **across all phases** and are referenced throughout:

- **`VERSION.md`** — Version declaration and architecture explanation (v0.9 current, incorporating v0.7 phases + v0.8 agents)
- **`GOVERNANCE_V0.9.9_CHANGES.md`** — Record of the v0.9.9 Track A risk-tiered merge policy amendment, with Founder authority and date
- **`GENESIS_CONSTITUTION.md`** — Constitutional foundation; any phase activity conflicting with constitution requires founder decision interrupt
- **`GOVERNANCE_RESOLUTION_PRECEDENCE.md`** — Authority hierarchy for resolving disagreements
- **`OPERATING_STANDARDS.md`** — Baseline operational procedures applicable to all phases
- **`GOVERNANCE_LLM_SOURCES.md`** — Authoritative sources for LLM-based decisions (if applicable)

### Critical Process Documents

- **`DECISION_INTERRUPT_PROTOCOL.md`** — Used across all phases to escalate blockers to founder
- **`GOVERNANCE_GATES.md`** — Primary enforcement layer in Phase 3; referenced throughout lifecycle
- **`PHASE_GATE_ENFORCEMENT.md`** — Phase transition enforcement system; prevents phase skipping through formal handoff gate
- **`CODEBASE_MANAGEMENT.md`** — Dual-track SDLC for the extension and generated applications
- **`PR_MERGE_POLICY.md`** — Single statement of the Track A risk-tiered merge policy (Phase 5 folder)
- **`SELF_APPLICATION.md`** — Recursive Track A autonomy ladder
- **`MACHINE_TRANSFER.md`** — Desktop-to-laptop transfer for Track As
- **`ARTIFACT_NAMING_AND_HANDOFF_STANDARD.md`** — Canonical naming, location, branch, and handoff standard across all phases

---

## Source Baseline

Source baseline: genesis-v0.6B.zip (extracted and redistributed per founder-approved mapping)

**All files listed above are v0.6B governance documents integrated into v0.7 phase structure.**
