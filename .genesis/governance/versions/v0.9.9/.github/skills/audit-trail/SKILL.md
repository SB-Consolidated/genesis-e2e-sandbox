---
name: audit-trail
description: Comprehensive decision and event logging workflow for Coordinator Agent to maintain governance audit trails, record ticket state transitions, and generate compliance reports
---

# Audit Trail Skill

**Owner:** Coordinator Agent  
**Authority:** Log all governance decisions and ticket workflows  
**Reference:** OPERATING_STANDARDS.md, TICKET_VALIDATION_WORKFLOW.md, GOVERNANCE_RESOLUTION_PRECEDENCE.md

---

## Purpose

The Audit Trail Skill provides a structured, consistent logging system for recording all significant governance events and decisions. This skill ensures complete auditability of the Genesis governance system.

**When to Use:**
- Every ticket state transition
- Every authorization decision
- Every escalation resolution
- Every PR merge
- Every governance event
- Every significant workflow decision

---

## Core Logging Principles

### Principle 1: Log Everything Significant
What gets logged:
- ✅ Ticket state transitions (01_DRAFT → 02_VERIFIED, etc.)
- ✅ Ticket creation and assignment
- ✅ PR creation, status changes, merges
- ✅ Authorization decisions
- ✅ Escalations and resolutions
- ✅ Governance amendments
- ✅ Blocking decisions (why ticket was blocked)
- ✅ Completion events
- ✅ Governance exceptions or overrides

What doesn't need logging:
- ❌ Internal thoughts or working notes
- ❌ Failed attempts (only final decisions)
- ❌ Chat conversations (only outcomes)

### Principle 2: Log Atomically
Each log entry is a single, complete event:
- One decision per entry
- Complete context in one entry
- No fragmentary logs
- All related information together

### Principle 3: Include Required Metadata
Every log entry MUST include:
- **Timestamp:** When did this happen?
- **Event Type:** What kind of event?
- **Ticket/Entity ID:** What is this about?
- **Decision/Action:** What was decided or done?
- **Rationale:** Why was this decided/done?
- **Authority:** Who approved this?
- **Reference:** Link to supporting documents/approvals

### Principle 4: Logs are Immutable
Once written, logs are never edited:
- ✅ Append new corrections/clarifications
- ❌ Don't modify existing entries
- If correction needed: Add new entry "Correction to log entry [timestamp]"

### Principle 5: Logs Enable Reconstruction
Anyone should be able to reconstruct workflow by reading logs:
- What tickets were created
- What decisions were made and why
- Who made each decision
- What happened to each ticket
- Where it is now

---

## Log Locations and Types

### Log 1: Ticket State Log
**File:** `Genesis Execution/tickets/ticket-state.log`  
**Purpose:** Track all ticket state transitions  
**Audience:** Coordinator, Intent Overseer, Execution Agent

**Format:**
```
- [TIMESTAMP] TICKET-ID: State Transition or Event
  Event: [event description]
  From State: [previous state]
  To State: [new state]
  Coordinator: [who made decision]
  Reason: [why this transition]
```

**Example Entries:**
```
- [2026-01-18T14:30:00Z] ENGINE-0042: Created and submitted for validation
  Event: New ticket submitted
  From State: N/A (new)
  To State: 01_DRAFT
  Coordinator: Brad DeMarco
  Reason: Strategic initiative to improve error handling

- [2026-01-18T15:45:00Z] ENGINE-0042: Validation passed
  Event: Intent Overseer approved ticket
  From State: 01_DRAFT
  To State: 02_VERIFIED
  Authority: Intent Overseer
  Reason: All gates passed, ticket is clear and complete

- [2026-01-18T16:00:00Z] ENGINE-0042: Assigned to Execution Agent
  Event: Ticket assignment
  From State: 02_VERIFIED
  To State: 03_EXECUTING
  Coordinator: Brad DeMarco
  Authorization: execution-authorization.json updated
  Reason: Ready for implementation

- [2026-01-18T17:30:00Z] ENGINE-0042: Execution complete, ready for merge
  Event: Execution Agent reported completion
  From State: 03_EXECUTING
  To State: 04_MERGE_READY
  Coordinator: Brad DeMarco
  Completion Evidence: [link to completion contract]
  Reason: All success criteria verified

- [2026-01-18T18:00:00Z] ENGINE-0042: Merged to main
  Event: PR merged and ticket complete
  From State: 04_MERGE_READY
  To State: 05_COMPLETE
  Coordinator: Brad DeMarco
  PR: #42
  Commit: [commit SHA]
  Reason: Merge checks passed, ready for production
```

### Log 2: Decision Log
**File:** `Genesis Execution/logs/decision.log`  
**Purpose:** Record significant decisions and rationale  
**Audience:** All agents, Founder, auditors

**Format:**
```
## Decision: [Date/Number]

**Decision:** [What was decided]

**Context:** [What led to this decision]

**Rationale:** [Why this decision was made]

**Authority:** [Who approved]

**Tickets Affected:** [related tickets]

**Implementation:** [What happens next]

**Status:** [In Progress / Complete]
```

**Example Entries:**
```
## Decision: 2026-01-18-001

**Decision:** Blocked ENGINE-0041 ticket due to scope creep

**Context:** Coordinator submitted ticket that tried to implement both
authentication AND authorization in single ticket.

**Rationale:** 
- Ticket violates single-responsibility principle
- Success criteria would be too complex
- Exceeds typical ticket scope
- Recommend splitting into two tickets

**Authority:** Intent Overseer validation gate

**Tickets Affected:** ENGINE-0041

**Implementation:** Return ticket to DRAFT, request split into:
- ENGINE-0041: Core authentication
- ENGINE-0043: Authorization layer

**Status:** In Progress (awaiting Coordinator revision)

---

## Decision: 2026-01-18-002

**Decision:** Escalated ENGINE-0039 due to scope ambiguity

**Context:** Execution Agent reported unclear acceptance criteria
for database migration ticket. Cannot proceed without clarification.

**Rationale:**
- Success criteria were too general ("database migration complete")
- No specific verification steps defined
- Execution Agent cannot verify completion
- Requires Coordinator clarification

**Authority:** Execution Agent escalation to Coordinator

**Tickets Affected:** ENGINE-0039

**Implementation:** 
1. Coordinator revises success criteria with specific checks
2. Ticket returns to 02_VERIFIED
3. Execution Agent proceeds with clear criteria

**Status:** In Progress (awaiting Coordinator response)
```

### Log 3: Governance Log
**File:** `Genesis Execution/logs/governance-events.log`  
**Purpose:** Record governance changes, amendments, exceptions  
**Audience:** All agents, auditors, Founder

**Format:**
```
- [TIMESTAMP] GOVERNANCE_EVENT: Description
  Type: [Amendment / Exception / Override / Clarification]
  Authority: [Who approved]
  Reference: [Document/ticket reference]
  Details: [Specific changes or decision]
```

**Example Entries:**
```
- [2026-01-18T15:00:00Z] GOVERNANCE_EVENT: Amendment implemented
  Type: Amendment #2026-001
  Authority: Founder approval
  Reference: STARTUP_ROLE_CONTRACTS.md Section 2
  Details: Coordinator role updated with filesystem write access
  Implemented By: Strategy Agent
  
- [2026-01-18T14:00:00Z] GOVERNANCE_EVENT: Exception granted
  Type: Override
  Authority: Founder decision
  Reference: Ticket GOV-0015
  Details: Allowed Execution Agent to escalate directly to Founder
          (normally escalates through Coordinator)
  Reason: Critical production issue requiring immediate decision
  Duration: Single ticket only
```

### Log 4: Amendment Log
**File:** `governance/overrides/amendments.log.md`  
**Purpose:** Track all governance amendments with full details  
**Audience:** All agents, auditors, historians

**Format:**
```markdown
## Amendment #YYYY-NNN

**Date:** [Date implemented]  
**Authority:** [Founder name/approval]  
**Status:** ✅ Implemented

**Amendment:** [One-line title]

**Rationale:** [Why this was needed]

**Documents Changed:**
- [Document 1]: [Specific changes]
- [Document 2]: [Specific changes]

**Verification:**
- [x] All documents updated
- [x] All agents notified
- [x] Git commit: [commit hash]

**Rollback Notes:** [How to reverse if needed]
```

---

## When to Log: Workflow Triggers

### Trigger 1: Ticket Creation
**What to Log:** New ticket submitted
**Where:** Ticket State Log
**Who:** Coordinator
**Metadata:** Ticket ID, WHY it was created, Coordinator name

### Trigger 2: Ticket Validation
**What to Log:** 
- Ticket approved → state change
- Ticket blocked → why it was blocked (reference specific gate failure)

**Where:** Ticket State Log + Decision Log
**Who:** Intent Overseer (approves), Coordinator (logs)
**Metadata:** Validation result, gate failures if any

### Trigger 3: Ticket Assignment
**What to Log:** Ticket assigned to Execution Agent
**Where:** Ticket State Log
**Who:** Coordinator
**Metadata:** Assigned ticket ID, Execution Agent, why (authorization ref)

### Trigger 4: Ticket Execution
**What to Log:**
- Execution started
- Execution complete with evidence
- Any blockers encountered

**Where:** Ticket State Log + Decision Log (if blocker escalated)
**Who:** Execution Agent or Coordinator (logs escalation)
**Metadata:** Ticket, evidence, completion contract verification

### Trigger 5: PR Lifecycle
**What to Log:**
- PR created → PR number, ticket reference
- PR status changes → waiting for review, checks failing, etc.
- PR merged → commit SHA, main branch updated
- Branch deleted → cleanup

**Where:** Ticket State Log
**Who:** Coordinator
**Metadata:** Ticket ID, PR number, status, commit SHA

### Trigger 6: Governance Amendment
**What to Log:** Amendment implemented
**Where:** Amendment Log + Governance Log
**Who:** Strategy Agent
**Metadata:** Amendment #, documents changed, authority, timestamp

### Trigger 7: Escalation Decision
**What to Log:** Blocker encountered and escalation needed
**Where:** Decision Log + Governance Log
**Who:** Agent encountering issue (escalating) + Coordinator (logs resolution)
**Metadata:** What was blocked, why, who escalated to, how resolved

---

## Log Entry Template

Use this template for consistency:

```
## Standard Entry Template

**Timestamp:** [ISO 8601 format: 2026-01-18T14:30:00Z]

**Event ID:** [TICKET-ID or EVENT-NUMBER]

**Event Type:** [State Transition / Decision / Amendment / Exception]

**Summary:** [One-line summary of what happened]

**Details:**
- From State: [previous state if applicable]
- To State: [new state if applicable]
- Ticket: [Ticket ID]
- Decision: [What was decided]
- Rationale: [Why]
- Authority: [Who approved]

**Reference:** [Link to related documents, approvals, evidence]

**Status:** [In Progress / Complete / Escalated]

**Next Steps:** [What happens next]
```

---

## Log Review and Audit

### Regular Review Schedule
- **Daily:** Coordinator reviews ticket state log for anomalies
- **Weekly:** Review decision log for patterns or concerns
- **Monthly:** Intent Overseer reviews for validation gate patterns
- **Quarterly:** Founder/auditor reviews governance log for compliance

### Audit Checklist
Every quarter, verify:
- [ ] All ticket state transitions are logged
- [ ] All decisions have rationale
- [ ] All authority claims are verified
- [ ] No unauthorized changes detected
- [ ] Governance amendments are properly logged
- [ ] Logs enable full workflow reconstruction
- [ ] No missing entries for significant events
- [ ] Timestamps are consistent and accurate

### Generating Reports
**Ticket Lifecycle Report:**
```
Query ticket state log:
- How many tickets created this quarter
- How many completed successfully
- Average time to completion
- Validation gate pass/fail rates
- Blockers and their resolution time
```

**Decision Pattern Report:**
```
Query decision log:
- Most common decision types
- Who makes which decisions
- Decision authority patterns
- Recurring issues or blockers
```

**Governance Amendment Report:**
```
Query amendment log:
- How many amendments implemented
- Amendment categories
- Who approved each amendment
- Implementation timeline
```

---

## Compliance Requirements

### Log Retention
- **Retention Period:** Minimum 3 years
- **Backup:** Daily backups to ensure availability
- **Access:** Read-only access for auditors
- **Immutability:** Once written, cannot be modified

### Log Integrity
- All entries timestamped (cannot be backdated)
- All entries signed with agent/person authority
- Git commit history as backup proof
- No deletion (only append corrections)

### Privacy Considerations
- Logs may contain sensitive decisions
- Access restricted to authorized personnel
- No logs published outside project
- Founder approval required for external audit access

---

## Success Indicators

You are maintaining audit trails well when:
- ✅ Every ticket transition is logged
- ✅ Every decision has clear rationale
- ✅ Every authority claim is verified
- ✅ Logs enable complete workflow reconstruction
- ✅ No significant events are missing
- ✅ Timestamps are accurate and consistent
- ✅ Logs are immutable and backed up
- ✅ Auditors can verify governance compliance
- ✅ Patterns reveal process improvements
- ✅ No unauthorized changes go undetected

---

## References

**Authority:**
- OPERATING_STANDARDS.md (Mandatory logging rules)
- GOVERNANCE_RESOLUTION_PRECEDENCE.md (Logging priority)

**Procedures:**
- TICKET_VALIDATION_WORKFLOW.md (When to log state changes)
- DECISION_INTERRUPT_PROTOCOL.md (When to log escalations)
- COMPLETION_CONTRACT_POLICY.md (Evidence for completion logging)

**Documentation:**
- COORDINATOR_TICKET_GUIDE.md (Coordinator workflow)
- STARTUP_ROLE_CONTRACTS.md Section 2 (Coordinator authority)

---

**Version:** 0.8  
**Status:** Active  
**Last Updated:** January 18, 2026  
**Authority:** Operating Standards, Governance Resolution Precedence
