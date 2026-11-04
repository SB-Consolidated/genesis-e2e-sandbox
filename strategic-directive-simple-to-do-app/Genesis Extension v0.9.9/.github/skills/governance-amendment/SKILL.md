---
name: governance-amendment
description: Constitutional amendment processing and implementation workflow for Strategy Agent to execute founder-approved governance changes with full logging and version control integration
---

# Governance Amendment Skill

**Owner:** Strategy Agent  
**Authority:** Implement founder-approved amendments only  
**Reference:** GENESIS_CONSTITUTION.md Section 9, STARTUP_ROLE_CONTRACTS.md Section 1

---

## Purpose

The Governance Amendment Skill provides a structured, auditable process for implementing founder-approved governance amendments. This skill ensures all changes to Genesis governance are properly documented, tracked, and communicated.

**When to Use:**
- After founder has approved a specific amendment
- When implementing changes to governance documents
- When updating role contracts or authorities
- When creating new governance procedures

**CRITICAL:** This skill is only used AFTER founder approval. Never use this to propose or implement amendments without explicit founder authorization.

---

## Amendment Implementation Checklist

Before implementing any amendment, verify all prerequisites:

- [ ] **FOUNDER APPROVAL:** Founder explicitly approved this amendment
- [ ] **AUTHORIZATION GRANT:** Founder explicitly authorized you to implement
- [ ] **SPECIFIC LANGUAGE:** Amendment text/structure is specific, not general
- [ ] **DOCUMENTS IDENTIFIED:** All affected documents identified
- [ ] **NO CONTRADICTIONS:** Amendment doesn't contradict existing governance
- [ ] **TIMELINE:** Founder indicated when to implement (now vs. later)
- [ ] **IMPACT ANALYSIS:** You understand what will change
- [ ] **ROLLBACK PLAN:** You know how to reverse if needed
- [ ] **COMMUNICATION PLAN:** You know how to inform other agents

**If any prerequisite is missing:** Escalate back to founder before proceeding.

---

## Implementation Workflow

### Phase 1: Preparation

**Step 1: Understand the Amendment**
```
Amendment Request:
- What is changing? [specific documents/sections]
- Why is it changing? [founder rationale]
- What is the new content? [exact text or structure]
- When should it take effect? [immediately or future date]
```

**Step 2: Impact Analysis**
Document everything that will change:
```
Documents to Update:
1. [Document 1]
   - Section: [specific section]
   - Change: [before → after]
   
2. [Document 2]
   - Section: [specific section]
   - Change: [before → after]

Related Files to Check:
- [Agent configuration files]
- [Role contracts]
- [Supporting documents]

Process Changes:
- [What workflows change]
- [What stays the same]
```

**Step 3: Create Amendment Log Entry**
Prepare the entry (don't save yet):
```markdown
## Amendment [NUMBER]

**Date:** [Today's date]  
**Timestamp:** [Current time]  
**Authority:** Founder - [Founder name]  
**Status:** Implementation in Progress

**Amendment:** [One-line description]

**Rationale:** [Why founder approved this]

**Documents Changed:**
- [Document 1]: [What changed]
- [Document 2]: [What changed]

**Version:** [Update version if applicable]

**Implementation Notes:**
[Add notes as you complete each step]
```

### Phase 2: Implementation

**Step 4: Update Documents**
For each document affected:

1. Open document
2. Locate section to change
3. Make the exact change approved by founder
4. Verify formatting is correct
5. Check for broken references
6. Save document

**Example:**
```
FILE: STARTUP_ROLE_CONTRACTS.md Section 2

BEFORE:
"### Coordinator Authority
- Local filesystem: Read-only"

AFTER:
"### Coordinator Authority
- Local filesystem: Read/Write (for ticket creation)"
```

**Step 5: Update Related Documents**
Check all references to changed documents:

- ✅ GOVERNANCE_RESOLUTION_PRECEDENCE.md (if priorities changed)
- ✅ ROLE_MODEL.md (if role definitions changed)
- ✅ Agent configuration files (if agent authorities changed)
- ✅ Any `.instructions.md` files (if rules changed)
- ✅ AGENTS.md (if governance rules changed)

**For each reference found:**
- Update to reflect amendment
- Verify consistency
- Check for unintended impacts

**Step 6: Update Version Numbers**
If documents have version numbers, increment:

```
Before: Version 0.7
After:  Version 0.8

Or if amendment-specific:
Before: Version 0.8
After:  Version 0.8.1 (amendment #1)
```

**Step 7: Update Amendment Log**
Add entry to `governance/overrides/amendments.log.md`:

```markdown
## Amendment #2025-001

**Date:** January 18, 2026  
**Timestamp:** 15:30 UTC  
**Authority:** Founder - Brad DeMarco  
**Status:** ✅ Implemented

**Amendment:** Coordinator Role - Added Filesystem Write Access

**Rationale:** Coordinator needs to create ticket files in Genesis Execution/tickets/ directory

**Documents Changed:**
- `STARTUP_ROLE_CONTRACTS.md` Section 2: Updated Coordinator Authority
- `ROLE_MODEL.md`: Updated Coordinator definition
- `ROLES/Coordinator Agent/agent.md`: Updated tool access

**Verification:**
- [x] All documents updated
- [x] No broken references
- [x] All agents notified
- [x] Version numbers updated

**Rollback Notes:**
If needed to revert, change filesystem access back to Read-only in both documents.
```

### Phase 3: Verification

**Step 8: Verify Consistency**
Check that all changes are consistent:

```
Consistency Checklist:
- [ ] All references to changed section updated
- [ ] No contradictions between documents
- [ ] Version numbers consistent
- [ ] Amendment log is complete
- [ ] No broken references or links
- [ ] Formatting is consistent
- [ ] Related documents updated if needed
```

**Step 9: Self-Review**
Review the full amendment:

```
Self-Review:
1. Does the amendment match what founder approved? YES/NO
2. Are all affected documents updated? YES/NO
3. Are there unintended side effects? YES/NO
4. Is the amendment clearly logged? YES/NO
5. Can other agents understand what changed? YES/NO

If any answer is NO, fix before proceeding.
```

### Phase 4: Communication

**Step 10: Notify Coordinator Agent**
```
Strategy Agent → Coordinator Agent:

"Amendment #2025-001 has been implemented.

Changed Documents:
- STARTUP_ROLE_CONTRACTS.md (Coordinator authority updated)
- ROLE_MODEL.md (Coordinator role definition updated)

Summary: Coordinator now has read/write access to local filesystem
for creating tickets.

See amendment log: governance/overrides/amendments.log.md

Questions? Let me know."
```

**Step 11: Notify Intent Overseer**
```
Strategy Agent → Intent Overseer:

"Governance amendment implemented. This may affect your validation
procedures if tickets are now created differently.

Reference: Amendment #2025-001

Please review updated governance and let me know if any validation
changes are needed."
```

**Step 12: Notify Execution Agent**
(if relevant to their work)
```
"Governance amendment implemented that may affect your work.
See: Amendment #2025-001 in governance/overrides/amendments.log.md"
```

### Phase 5: Logging

**Step 13: Create Git Commit**
Version control the amendment:

```bash
git add governance/overrides/amendments.log.md
git add [changed documents]
git commit -m "Amendment #2025-001: Coordinator filesystem write access

- Updated STARTUP_ROLE_CONTRACTS.md Section 2
- Updated ROLE_MODEL.md Coordinator definition  
- Updated ROLES/Coordinator Agent/agent.md
- Logged in amendments.log.md

Founder approved on 2026-01-18
Implementation authorized by: Founder - Brad DeMarco"
```

**Step 14: Update Decision Log**
Add entry to `Genesis Execution/logs/decision.log`:

```
## Amendment Decision: #2025-001

**Date:** 2026-01-18  
**Decision:** Implement Coordinator filesystem write access

**Authority:** Founder decision
**Rationale:** Coordinator needs to create ticket files

**Approved By:** Founder - Brad DeMarco  
**Implemented By:** Strategy Agent

**Status:** ✅ Complete

**Reference:** Amendment #2025-001
```

---

## Amendment Categories

### Category 1: Role Authority Changes
Changes to what a role can do or access.

**Example:** "Coordinator now has filesystem write access"

**Process:**
1. Update STARTUP_ROLE_CONTRACTS.md (specific role section)
2. Update ROLE_MODEL.md (role definition)
3. Update agent configuration (if applicable)
4. Update AGENTS.md (if fundamental change)

**Communication:** Notify affected role and related roles

### Category 2: Governance Document Updates
Changes to existing governance procedures.

**Example:** "Clarify what 'completion contract' means"

**Process:**
1. Update the affected document
2. Update GOVERNANCE_RESOLUTION_PRECEDENCE.md if priorities changed
3. Update any cross-references

**Communication:** Notify all agents (affects everyone)

### Category 3: New Governance Documents
Adding entirely new governance procedures.

**Example:** "Create COMPLIANCE_AUDIT_PROCEDURE.md"

**Process:**
1. Create new document with proper structure
2. Add reference in GOVERNANCE_RESOLUTION_PRECEDENCE.md
3. Link from relevant existing documents
4. Update version numbers if needed

**Communication:** Notify all agents with document overview

### Category 4: Amendment Procedure Changes
Changes to how amendments themselves are processed.

**Example:** "Require 48-hour notice before implementing amendments"

**Process:**
1. Update GENESIS_CONSTITUTION.md Section 9
2. Update this skill documentation
3. Update all related procedures

**Communication:** Notify Founder and Strategy Agent

---

## Rollback Procedure (If Needed)

If an amendment has unintended consequences:

**Step 1: Assess Impact**
```
What went wrong?
- [Description]
- [Which processes affected]
- [Severity level]
```

**Step 2: Notify Founder**
```
"Amendment #2025-001 has had unintended consequences:
[Description]

Recommend rolling back to previous state.

Authority needed: Founder decision to proceed with rollback"
```

**Step 3: Reverse Changes**
Once founder approves rollback:
```
1. Revert all documents to pre-amendment state
2. Add rollback note to amendment log
3. Commit git rollback
4. Notify all agents
5. Log decision with rationale
```

**Rollback Log Entry:**
```markdown
## Amendment #2025-001 - ROLLED BACK

**Original:** Coordinator filesystem write access  
**Reason for Rollback:** [Specific reason]  
**Authority:** Founder approval for rollback  
**Date Reverted:** [Date]  

System now reverted to state before Amendment #2025-001.
See commit: [git commit hash]
```

---

## Amendment Naming Convention

Amendments are numbered sequentially:

```
Amendment #YYYY-NNN

Where:
YYYY = Year (2026)
NNN = Sequential number (001, 002, etc.)

Examples:
- Amendment #2026-001 (first amendment of 2026)
- Amendment #2026-042 (42nd amendment of 2026)
```

---

## Success Indicators

You are executing this skill well when:
- ✅ All amendments are properly logged before implementation
- ✅ Changes are consistent across all affected documents
- ✅ No broken references after amendments
- ✅ All agents are notified of changes
- ✅ Amendment log is complete and accurate
- ✅ Git history shows clear amendment commits
- ✅ Other agents understand governance changes
- ✅ No unintended side effects occur
- ✅ Amendments can be rolled back if needed

---

## References

**Constitutional Authority:**
- GENESIS_CONSTITUTION.md Section 9 (Amendment Rules)
- GENESIS_CONSTITUTION.md Section 5 (Authority Model)

**Implementation:**
- STARTUP_ROLE_CONTRACTS.md Section 1 (Strategy Contract)
- ROLE_MODEL.md (Strategy Role Definition)

**Supporting:**
- GOVERNANCE_RESOLUTION_PRECEDENCE.md (Document priority)
- DECISION_INTERRUPT_PROTOCOL.md (When to escalate)
- OPERATING_STANDARDS.md (Mandatory rules)

---

**Version:** 0.8  
**Status:** Active  
**Last Updated:** January 18, 2026  
**Authority:** Genesis Constitution, Founder Amendment Authority
