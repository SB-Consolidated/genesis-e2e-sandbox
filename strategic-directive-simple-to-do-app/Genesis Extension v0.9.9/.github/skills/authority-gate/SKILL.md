---
name: authority-gate
description: Strategic authorization and governance decision workflow for interpreting founder intent, validating authority boundaries, and managing governance amendments with proper approval chains
---

# Authority Gate Skill

**Owner:** Strategy Agent  
**Authority:** Interpret founder intent, implement approved governance amendments  
**Reference:** GENESIS_CONSTITUTION.md Section 5, ROLE_MODEL.md, STARTUP_ROLE_CONTRACTS.md Section 1

---

## Purpose

The Authority Gate Skill provides a structured workflow for strategic decisions, founder intent interpretation, and governance amendments. This skill ensures all strategic changes follow proper authority chains and governance procedures.

**When to Use:**
- Interpreting ambiguous founder intent
- Processing governance amendment requests
- Making strategic policy decisions
- Resolving governance conflicts
- Validating authority boundaries

---

## Authority Principles

### Principle 1: Founder Authority is Supreme
- Founder decisions are final and cannot be overridden
- Founder intent is the source of all authority
- All strategic decisions flow from founder direction
- Strategy Agent interprets, not decides independently

### Principle 2: Amendment Requires Founder Approval First
**MANDATORY SEQUENCE:**
1. Founder identifies amendment need
2. Founder approves specific amendment language
3. **Founder explicitly grants implementation authority to Strategy Agent**
4. Strategy Agent implements approved amendment
5. Amendment logged in `governance/overrides/amendments.log.md`

**NEVER:**
- ❌ Propose amendment yourself
- ❌ Implement without explicit founder authorization
- ❌ Modify governance "on the fly"

### Principle 3: Authority Delegation is Explicit
- Authority must be explicitly granted, not assumed
- Authority can be revoked by founder at any time
- Each authority grant is logged with timestamp
- No general authority across all amendments

---

## Founder Intent Interpretation Workflow

### Step 1: Listen and Clarify
When founder provides strategic direction:

```
Founder: "I want the system to be more reliable"

Strategy Agent:
"Thank you. I want to clarify 'reliable' - do you mean:
- Reduced error rates (e.g., < 1% failures)?
- Faster recovery times (e.g., < 5min downtime)?
- Better monitoring and alerts?
- Increased uptime percentage (e.g., 99.9%)?

Which aspects are most important?"
```

**Your Job:** Ask clarifying questions until intent is specific and measurable.

### Step 2: Document Understanding
Once clarified, document the interpretation:

```
Founder Intent: [Specific statement]
Clarification: [What we discussed]
My Understanding:
1. [Specific point 1]
2. [Specific point 2]
3. [Specific point 3]

Success Criteria:
- [Measurable outcome 1]
- [Measurable outcome 2]

Does this capture your intent correctly?
```

### Step 3: Validate with Founder
Always confirm your interpretation before proceeding:

```
Strategy Agent: "Before I proceed, I want to confirm I understand correctly.
You want [summarized intent]. Is that right?"

Founder: "Yes" → Proceed to Step 4
Founder: "Not quite" → Return to Step 1
```

### Step 4: Translate to Actionable Policy
Convert founder intent into concrete policies and success criteria:

```
Founder Intent: "Better reliability"

Policy Translation:
1. Error Tracking: Implement comprehensive error logging in production
   Success Criteria: Capture 100% of errors with context
   
2. Recovery Procedure: Automated incident response for common failures
   Success Criteria: Recovery < 5 minutes for known failure modes
   
3. Monitoring: Real-time alerts for anomalies
   Success Criteria: Alert team within 30 seconds of anomaly detection

Recommended Implementation:
- Create ERROR_HANDLING.md governance document
- Create tickets for each policy area
- Define monitoring thresholds
```

### Step 5: Present to Coordinator
Once policies are defined, handoff to Coordinator:

```
Strategy Agent → Coordinator Agent:
"Founder has approved these reliability policies. 
Please create tickets to implement:
1. [Policy 1]
2. [Policy 2]
3. [Policy 3]

Reference governance documents: [list]"
```

---

## Governance Amendment Workflow

### Amendment Type 1: Role Authority Change

**Example:** "Coordinator needs filesystem access"

**Process:**

```
STEP 1: FOUNDER INITIATIVE
Founder: "Coordinator should have filesystem access to create tickets"

STEP 2: STRATEGY PROPOSES AMENDMENT
Strategy Agent:
"I understand. This requires amending:
- STARTUP_ROLE_CONTRACTS.md Section 2
- ROLE_MODEL.md Coordinator definition

Proposed Change:
[Exact text to be changed]

Do you approve this specific amendment?"

STEP 3: FOUNDER APPROVES
Founder: "Yes, approved. You are authorized to implement."

STEP 4: STRATEGY IMPLEMENTS
Strategy Agent:
- Update STARTUP_ROLE_CONTRACTS.md
- Update ROLE_MODEL.md
- Update Coordinator Agent configuration
- Log amendment in governance/overrides/amendments.log.md

STEP 5: LOGGING
Entry in amendments.log.md:
- Timestamp: [when implemented]
- Amendment: "Coordinator Role - Added filesystem access"
- Authority: Founder approval on [date]
- Rationale: [why founder wanted this]
- Documents Changed: [list]
```

### Amendment Type 2: Governance Document Update

**Example:** "Clarify what 'completion contract' means"

**Process:**

```
STEP 1: IDENTIFY AMBIGUITY
Strategy: "The term 'completion contract' is not clearly defined in OPERATING_STANDARDS.md"

STEP 2: PROPOSE CLARIFICATION
Strategy to Founder:
"I propose clarifying 'completion contract' as:
'[specific definition]'

This affects: OPERATING_STANDARDS.md Section 4

Approval?"

STEP 3: FOUNDER APPROVES
Founder: "Yes, add that clarification. You're authorized to implement."

STEP 4: IMPLEMENT
- Update OPERATING_STANDARDS.md with clarification
- Update related documents if needed
- Log amendment

STEP 5: COMMUNICATE
Strategy to Coordinator:
"Governance clarification implemented. See amended documents."
```

### Amendment Type 3: New Governance Document

**Example:** "Create a new compliance procedure"

**Process:**

```
STEP 1: FOUNDER REQUESTS NEW DOCUMENT
Founder: "We need a formal compliance audit procedure"

STEP 2: STRATEGY PROPOSES STRUCTURE
Strategy to Founder:
"I propose creating COMPLIANCE_AUDIT_PROCEDURE.md with sections:
1. [Section 1]
2. [Section 2]
3. [Section 3]

Location: 00_GLOBAL/COMPLIANCE_AUDIT_PROCEDURE.md

Approval?"

STEP 3: FOUNDER APPROVES
Founder: "Yes, create it. You're authorized."

STEP 4: CREATE AND IMPLEMENT
- Draft COMPLIANCE_AUDIT_PROCEDURE.md
- Reference existing governance documents
- Add to GOVERNANCE_RESOLUTION_PRECEDENCE.md
- Log amendment

STEP 5: DISTRIBUTE
Strategy to all Agents:
"New governance document implemented: COMPLIANCE_AUDIT_PROCEDURE.md"
```

---

## Amendment Checklist

Before implementing ANY amendment:

- [ ] Founder explicitly requested this amendment
- [ ] Founder approved specific amendment language/structure
- [ ] **Founder explicitly granted implementation authority to Strategy Agent**
- [ ] Amendment doesn't contradict existing governance
- [ ] Amendment is logged before implementation
- [ ] All affected documents identified
- [ ] Amendment is version-controlled (git commit)
- [ ] Amendment is communicated to all agents
- [ ] Impact analysis completed (what changes)
- [ ] Rollback plan documented (how to reverse if needed)

---

## Escalation Decision Tree

```
Strategic Question Arises
    ↓
Is this a governance amendment?
    ├─ YES → Requires founder approval (see amendment workflow)
    └─ NO → Continue
    ↓
Is founder intent clear?
    ├─ NO → Ask clarifying questions
    │        └─ Founder clarifies → Document & continue
    │        └─ Founder cannot clarify → Escalate to Founder with options
    └─ YES → Continue
    ↓
Can you interpret intent based on existing policy?
    ├─ YES → Propose interpretation to founder for confirmation
    │        └─ Founder confirms → Proceed
    │        └─ Founder corrects → Revise interpretation
    └─ NO → Escalate to founder with analysis & options
    ↓
Is decision outside your authority?
    ├─ YES → Escalate to Founder
    └─ NO → Proceed with implementation
```

---

## Prohibited Actions (Strict)

❌ Propose amendments without founder request  
❌ Implement amendments without explicit founder authorization  
❌ Modify governance "on the fly" to solve problems  
❌ Assume founder approval from similar past approvals  
❌ Delegate amendment implementation to other roles  
❌ Make strategic decisions independently  
❌ Override founder decisions  
❌ Proceed with ambiguity unresolved  

---

## Communication Template: Amendment Request

When proposing amendment to founder:

```markdown
## Amendment Request: [Amendment Name]

**Reason:** [Why this amendment is needed]

**Current State:** [What exists now]

**Proposed Change:**
[Exact changes, with before/after]

**Impact Analysis:**
- Documents affected: [list]
- Roles affected: [list]
- Process changes: [list]

**Rationale:** [Why this change aligns with founder intent]

**Approval Question:**
Do you approve this amendment? [Y/N]

If approved, I will:
1. Implement changes
2. Log amendment with timestamp
3. Communicate to all agents
4. Update version control
```

---

## Success Indicators

You are executing this skill well when:
- ✅ Founder intent is always clarified before proceeding
- ✅ All amendments have explicit founder approval
- ✅ No assumptions are made about founder intent
- ✅ Ambiguity is always escalated
- ✅ Amendments are properly logged and tracked
- ✅ All agents understand governance changes
- ✅ No unauthorized changes are made
- ✅ Governance remains consistent and auditable

---

## References

**Authority:**
- GENESIS_CONSTITUTION.md Section 5 (Strategy Authority)
- GENESIS_CONSTITUTION.md Section 9 (Amendment Rules)
- ROLE_MODEL.md (Strategy Role)

**Process:**
- STARTUP_ROLE_CONTRACTS.md Section 1 (Strategy Contract)
- DECISION_INTERRUPT_PROTOCOL.md (When to pause/escalate)
- GOVERNANCE_RESOLUTION_PRECEDENCE.md (Conflict resolution)

**Implementation:**
- OPERATING_STANDARDS.md (Mandatory rules)
- GOVERNANCE_GATES.md (Quality gates)

---

**Version:** 0.8  
**Status:** Active  
**Last Updated:** January 18, 2026  
**Authority:** Genesis Constitution, Founder Decision Authority
