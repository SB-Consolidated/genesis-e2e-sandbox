---
name: ticket-validation
description: Comprehensive ticket validation workflow for Intent Overseer to verify structure, clarity, governance alignment, and quality gates before moving tickets from 01_DRAFT to 02_VERIFIED
---

# Ticket Validation Skill

**Owner:** Intent Overseer  
**Authority:** Exclusive gatekeeper for DRAFT → VERIFIED transition  
**Reference:** TICKET_VALIDATION_WORKFLOW.md, TICKET_TEMPLATE.md, OPERATING_STANDARDS.md

---

## Purpose

The Ticket Validation Skill provides a structured, repeatable workflow for validating Genesis tickets before execution. This skill ensures all tickets meet quality standards and align with governance before proceeding to implementation.

**When to Use:** Every ticket submitted in 01_DRAFT state must pass through this validation workflow before Intent Overseer can move it to 02_VERIFIED.

---

## Validation Gates (In Order)

### Gate 1: Structure Validation
Verify ticket has correct format and all mandatory sections.

**Checklist:**
- [ ] Filename format: `[CATEGORY]-[NUMBER].md` (e.g., ENGINE-0042)
- [ ] File location: `Genesis Execution/tickets/01_DRAFT/`
- [ ] All 9 mandatory sections present
- [ ] Valid Markdown formatting (no syntax errors)
- [ ] YAML-like metadata block at top (if applicable)

**Success:** Proceed to Gate 2  
**Failure:** Block ticket, request structural fixes

**Common Issues:**
- Wrong filename (missing category or number)
- Sections out of order or missing
- Markdown formatting errors

---

### Gate 2: Clarity Validation
Ensure ticket is clear and understandable for non-experts to execute.

**Checklist:**
- [ ] Objective (WHY) is one clear paragraph
- [ ] Name field is action-oriented one-liner
- [ ] Success Criteria are specific and testable
- [ ] Implementation Plan is step-by-step (not vague)
- [ ] No ambiguous language: "might", "should", "hopefully", "probably", "attempt"
- [ ] All technical terms explained
- [ ] References to files are clear

**Success Criteria Examples:**
- ✅ "Achieve 95% test coverage in src/ directory (verify with `npm test`)"
- ✅ "All error messages display within 2 seconds of trigger"
- ❌ "Improve performance" (too vague)
- ❌ "Try to make it better" (no success criteria)

**Success:** Proceed to Gate 3  
**Failure:** Block ticket, request clarity improvements

**Common Issues:**
- Success criteria are subjective ("look good", "be better")
- Implementation plan is too high-level
- Objective unclear about WHY this ticket matters

---

### Gate 3: Governance Compliance Validation
Verify ticket aligns with Genesis governance and has no violations.

**Checklist:**
- [ ] No governance violations detected
- [ ] All constraints from OPERATING_STANDARDS.md followed
- [ ] For GOV tickets: Founder approval explicitly referenced
- [ ] For GOV tickets: Amendment authority chain verified (Founder → Strategy → Coordinator)
- [ ] No escalation of authority outside defined roles
- [ ] Files Impacted marked correctly: (NEW), (MODIFIED), (DELETED)
- [ ] Ticket respects existing governance documents
- [ ] No circular dependencies with other tickets

**Governance Reference Points:**
- GENESIS_CONSTITUTION.md Section 5 (Roles & Authority)
- ROLE_MODEL.md (role definitions)
- OPERATING_STANDARDS.md (mandatory rules)
- GOVERNANCE_GATES.md (quality gates per phase)

**Success:** Proceed to Gate 4  
**Failure:** Block ticket, reference specific governance violation

**Common Issues:**
- GOV ticket lacks founder approval reference
- Ticket violates existing governance
- Authority chain is broken (e.g., Coordinator trying to do Strategy work)

---

### Gate 4: Scope Validation
Ensure ticket scope is clear and complete without scope creep.

**Checklist:**
- [ ] In Scope and Out of Scope sections separated and clear
- [ ] Files Impacted list includes all affected files
- [ ] All dependencies clearly stated
- [ ] No hidden assumptions about other work
- [ ] Scope is realistic for one ticket
- [ ] Out of Scope doesn't include critical prerequisites

**Scope Examples:**
```
IN SCOPE:
- Create authentication endpoint
- Add password hashing
- Generate JWT tokens

OUT OF SCOPE:
- Frontend authentication UI (separate ticket)
- Email verification (future ticket)
- OAuth integration (future phase)
```

**Success:** Proceed to Gate 5  
**Failure:** Block ticket, request scope clarification

**Common Issues:**
- Scope too large (should be multiple tickets)
- Prerequisites marked as "out of scope"
- Dependencies not clearly stated

---

### Gate 5: Success Criteria Validation
Verify success criteria are machine-verifiable, not subjective.

**Checklist:**
- [ ] All success criteria are machine-verifiable
- [ ] Include specific verification commands (e.g., `npm test`, `git log`, file checks)
- [ ] Success criteria are testable by Coordinator during merge review
- [ ] No subjective criteria ("clean code", "well-written", "professional")
- [ ] Verification can be automated (CI/CD checks)
- [ ] Each criterion has clear pass/fail condition

**Success Criteria Examples:**
- ✅ Test coverage ≥ 95% (verify: `npm test --coverage`)
- ✅ All TypeScript errors resolved (verify: `npx tsc`)
- ✅ PR passes all CI checks (verify: GitHub PR status)
- ✅ Linting passes (verify: `npm run lint`)
- ✅ No merge conflicts (verify: git merge-base)
- ❌ "Code is clean"
- ❌ "Solution is elegant"
- ❌ "Everything looks good"

**Success:** Proceed to Gate 6  
**Failure:** Block ticket, request objective success criteria

**Common Issues:**
- Criteria are subjective assessments
- No way to verify without human judgment
- Verification steps not included

---

### Gate 6: Completeness Validation
Ensure ticket has all information needed for execution.

**Checklist:**
- [ ] Objective clearly explains WHY
- [ ] Scope clearly explains WHAT
- [ ] Success Criteria clearly define DONE
- [ ] Implementation Plan explains HOW (step-by-step)
- [ ] Files Impacted lists all affected files
- [ ] Completion Contract specifies required evidence
- [ ] All sections have sufficient detail
- [ ] No critical information missing
- [ ] No "to be determined" or placeholders

**Completion Contract Requirements:**
- Must specify what evidence Coordinator needs to verify completion
- Examples: "Pass all tests", "PR merged", "commit SHA", "screenshots"

**Success:** Ticket is APPROVED ✅  
**Failure:** Block ticket, request missing information

**Common Issues:**
- Completion contract is empty or vague
- Implementation plan is too abstract
- Missing critical context for execution

---

## Validation Decision Tree

```
Ticket submitted → Structure valid?
                   ↓ NO → Block (request fixes)
                   ↓ YES
                   ↓
              Clarity valid?
                   ↓ NO → Block (request clarity)
                   ↓ YES
                   ↓
         Governance compliant?
                   ↓ NO → Block (governance violation)
                   ↓ YES
                   ↓
              Scope valid?
                   ↓ NO → Block (clarify scope)
                   ↓ YES
                   ↓
         Success criteria verifiable?
                   ↓ NO → Block (make objective)
                   ↓ YES
                   ↓
           Ticket complete?
                   ↓ NO → Block (fill gaps)
                   ↓ YES
                   ↓
              APPROVE ✅
         Move to 02_VERIFIED
```

---

## Feedback Template

When blocking a ticket, provide clear feedback:

```markdown
## Ticket Review: [TICKET-ID]

**Status:** 🚫 BLOCKED - Requires Revision

**Issues Found:**

1. [Gate]: [Specific issue]
   - What: [What's wrong]
   - Why: [Why this matters]
   - Fix: [How to fix it]
   - Reference: [Document reference]

2. [Gate]: [Specific issue]
   - ...

**Process:**
1. Revise ticket based on feedback
2. Update file in Genesis Execution/tickets/01_DRAFT/
3. Resubmit to Intent Overseer for validation
4. Iterate until APPROVED

**Questions:**
Contact Coordinator if you need clarification on any feedback.
```

---

## Common Rejection Patterns

### Pattern: Scope Creep
**Issue:** Ticket tries to do too much  
**Fix:** Break into multiple tickets  
**Example:** "Create user auth system, add email verification, integrate OAuth" → Should be 3 tickets

### Pattern: Vague Success Criteria
**Issue:** No way to verify completion  
**Fix:** Add specific, measurable criteria  
**Example:** "Should work well" → "Test coverage ≥ 95%, all CI checks pass"

### Pattern: Governance Violation
**Issue:** Ticket bypasses approval chains or authority boundaries  
**Fix:** Reference correct approvals and respect authority  
**Example:** "Update governance" without founder approval → Get founder approval first

### Pattern: Missing Prerequisites
**Issue:** Requires other work that's out of scope  
**Fix:** Make dependencies explicit or adjust scope  
**Example:** "Frontend requires API endpoints" → Ensure API ticket exists and completes first

### Pattern: Unclear Objective
**Issue:** Purpose and why are not clear  
**Fix:** Write one clear paragraph explaining business value  
**Example:** "Add logging" → "Add comprehensive error logging to track issues in production (improves debugging by 80%)"

---

## Success Indicators

You are validating tickets well when:
- ✅ Most tickets pass on first submission
- ✅ Rejections are specific and actionable
- ✅ Rejections reference governance documents
- ✅ Tickets are clear enough for Execution Agent to understand
- ✅ Success criteria are verifiable and testable
- ✅ Governance violations are caught consistently
- ✅ No tickets proceed without evidence of completion

---

## References

**Authority:**
- GENESIS_CONSTITUTION.md Section 5 (Intent Overseer Authority)
- ROLE_MODEL.md (Intent Overseer Role Definition)

**Standards:**
- TICKET_TEMPLATE.md (mandatory structure)
- TICKET_VALIDATION_WORKFLOW.md (state machine)
- OPERATING_STANDARDS.md (governance rules)
- GOVERNANCE_GATES.md (quality gates)

**Execution:**
- COORDINATOR_TICKET_GUIDE.md (Coordinator's view of process)
- DECISION_INTERRUPT_PROTOCOL.md (escalation procedures)

---

**Version:** 0.8  
**Status:** Active  
**Last Updated:** January 18, 2026  
**Authority:** Genesis Constitution, Operating Standards
