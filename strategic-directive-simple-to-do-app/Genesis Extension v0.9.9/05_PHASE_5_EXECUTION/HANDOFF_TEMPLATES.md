# Handoff Templates And Locations

**Version:** 0.9.7

## Canonical Artifacts

- Phase gate handoffs live in `Genesis Execution/handoffs/phase-gates/`.
- Validation handoffs live in `Genesis Execution/handoffs/validation-*/`.
- Execution authorization lives in `Genesis Execution/governance/execution-authorization.json`.
- Completion contracts live in `Genesis Execution/tickets/completion-contracts/`.
- Phase 6 revision handoffs live in `Genesis Execution/handoffs/revision-spec/`.

## Phase 6 Revision Handoff

- Revision request intake: `Genesis Execution/revisions/requests/REVISION-REQUEST-[TIMESTAMP].md`
- Approved revision spec: `Genesis Execution/revisions/specs/REVISION-SPEC-[NNN].md`
- Ticket drafting handoff: `Genesis Execution/handoffs/revision-spec/REVISION-SPEC-HANDOFF-[TIMESTAMP].md`

### Revision Spec Handoff Template

**File:** `[ProjectName]/Genesis Execution/handoffs/revision-spec/REVISION-SPEC-HANDOFF-[TIMESTAMP].md`

```markdown
# Revision Spec Ready For Ticket Generation: [TIMESTAMP]

**Prepared By:** Coordinator Agent  
**Revision Spec:** REVISION-SPEC-[NNN]  
**Source Request:** REVISION-REQUEST-[TIMESTAMP]  
**Status:** READY FOR PHASE 5 TICKET DRAFTING

---

## Change Summary

- [Concise summary of requested Phase 6 changes]

## Classification

- Change Type: [corrective | additive | rollback | compliance]
- Scope Class: [local refinement | cross-ticket refinement | upstream phase amendment]
- Risk Class: [low | medium | high | release-blocking]

## Required Upstream Updates

- [None or list of amended Phase 1/2/3/4/6 artifacts]

## Ticketing Instructions

1. Draft new or amended `TICKET-NNN` artifacts in `Genesis Execution/tickets/01_DRAFT/`
2. Reference `REVISION-SPEC-[NNN]` in each ticket's Revision Traceability section
3. Update `DEPENDENCY-MATRIX.json` for any sequencing changes
4. Submit all drafted tickets to Intent Overseer for normal validation

## Evidence Impact

- [Describe whether prior completion evidence remains valid or must be replaced]

## References

- `Genesis Execution/revisions/requests/REVISION-REQUEST-[TIMESTAMP].md`
- `Genesis Execution/revisions/specs/REVISION-SPEC-[NNN].md`
- `Genesis Extension v0.9.7/06_PHASE_6_FOUNDER_REVIEW/PHASE_6_RULES.md`
```

## Ticket Handoff Rules

- Draft ticket submitted for validation: `Genesis Execution/tickets/01_DRAFT/[TICKET-ID].md`
- Approved ticket: `Genesis Execution/tickets/02_VERIFIED/[TICKET-ID].md`
- Authorized execution uses the canonical authorization artifact, not ad hoc chat approval.
- All examples and filenames must use `TICKET-NNN`.
- TICKET_TEMPLATE.md — Required ticket structure
```

### Template 3c: Validation Rework

**File:** `[ProjectName]/Genesis Execution/handoffs/validation-rework/VALIDATION-REWORK-[TIMESTAMP].md`

```markdown
# Validation Rework Required: [TIMESTAMP]

**Validator:** Intent Overseer  
**Date:** [ISO 8601 timestamp]  
**Status:** ALL REQUIRE REWORK

---

## Summary

All submitted tickets require rework before they can be approved.

**Total Tickets Validated:** [X]  
**Approved:** 0  
**Requires Rework:** [X]

---

## Tickets Requiring Rework

### [TICKET-ID-1]: [Ticket Name]

**Status:** ❌ BLOCKED  
**Location:** `[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID-1].md`

**Issues Identified:**

1. **[Section Name]**  
   **Problem:** [Specific description]  
   **Required Fix:** [Actionable correction]

2. **[Section Name]**  
   **Problem:** [Specific description]  
   **Required Fix:** [Actionable correction]

**Severity:** [CRITICAL / HIGH / MEDIUM]  
**Feedback File:** `[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID-1]-FEEDBACK.md`

---

### [TICKET-ID-2]: [Ticket Name]

**Status:** ❌ BLOCKED  
**Location:** `[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID-2].md`

**Issues:** [Brief summary]  
**Severity:** [Level]  
**Feedback File:** `[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID-2]-FEEDBACK.md`

---

## Common Issues Across Tickets

[If multiple tickets have similar issues, summarize here]

**Pattern:** [Description of recurring issue]  
**Guidance:** [General guidance for Coordinator to fix across tickets]

---

## Next Steps for Coordinator

1. Review individual feedback files for each ticket
2. Revise tickets per specific feedback
3. Address common issues across all tickets
4. Resubmit for validation when corrections complete
5. Do NOT proceed to execution until tickets are VERIFIED

---

## References

- Individual feedback files in 01_DRAFT folder for each ticket
- TICKET_VALIDATION_WORKFLOW.md — Validation process
- TICKET_TEMPLATE.md — Required ticket structure
- COORDINATOR_TICKET_GUIDE.md — Ticket creation best practices
```

---

### Individual Ticket Feedback Format

For each rejected ticket, Intent Overseer also creates a detailed feedback file:

**File:** `[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID]-FEEDBACK.md`

```markdown
# Validation Feedback: [TICKET-ID]

**Validator:** Intent Overseer  
**Date:** [ISO 8601 timestamp]  
**Status:** BLOCKED

---

## Issues Identified

### Issue 1: [Section Name - e.g., Success Criteria]

**Problem:**
[Specific description of what is wrong]

**Current Content:**
```
[Quote the problematic section from ticket]
```

**Required Fix:**
[Specific actionable correction needed]

**Example:**
```
[Show example of correct format]
```

---

### Issue 2: [Another Section]

[Same format as above]

---

## Next Steps

1. Coordinator must revise ticket per feedback above
2. Resubmit for validation when corrections complete
3. Do NOT proceed to execution without VERIFIED status

---

## References

- TICKET_TEMPLATE.md — Required ticket structure
- TICKET_VALIDATION_WORKFLOW.md — Validation checklist
- [Any other relevant governance documents]
```

### Handoff Flows

**3a. All Tickets Approved:**
```
Intent Overseer → Coordinator

Handoff Message:
"All tickets validated and approved. Validation summary in 
Genesis Execution/handoffs/validation-approved/VALIDATION-APPROVED-[TIMESTAMP].md.
All tickets moved to 02_VERIFIED and ready for execution assignment."
```

**3b. Partial Approval:**
```
Intent Overseer → Coordinator

Handoff Message:
"Validation complete with partial approval. Summary in 
Genesis Execution/handoffs/validation-partial/VALIDATION-PARTIAL-[TIMESTAMP].md.
Some tickets in 02_VERIFIED (ready), others in 01_DRAFT (require rework with feedback)."
```

**3c. All Require Rework:**
```
Intent Overseer → Coordinator

Handoff Message:
"All tickets require rework. Validation summary in 
Genesis Execution/handoffs/validation-rework/VALIDATION-REWORK-[TIMESTAMP].md.
All tickets remain in 01_DRAFT with detailed feedback files. 
Review feedback, revise, and resubmit."
```

```markdown
---
VALIDATION FEEDBACK (Intent Overseer)
Date: [ISO 8601 timestamp]
Status: BLOCKED

Issues:
1. [Specific issue with ticket section]
   - Location: [Section name]
   - Problem: [What is wrong]
   - Required fix: [What needs to change]

2. [Another issue]
   - Location: [Section name]
   - Problem: [What is wrong]
   - Required fix: [What needs to change]

Revise and resubmit when corrected.
---

[Original ticket content below]
```

### Format (Separate File - Alternative)

**File:** `[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID]-FEEDBACK.md`

```markdown
# Validation Feedback: [TICKET-ID]

**Validator:** Intent Overseer  
**Date:** [ISO 8601 timestamp]  
**Status:** BLOCKED

---

## Issues Identified

### Issue 1: [Section Name - e.g., Success Criteria]

**Problem:**
[Specific description of what is wrong]

**Current Content:**
```
[Quote the problematic section from ticket]
```

**Required Fix:**
[Specific actionable correction needed]

**Example:**
```
[Show example of correct format]
```

---

### Issue 2: [Another Section]

[Same format as above]

---

## Next Steps

1. Coordinator must revise ticket per feedback above
2. Resubmit for validation when corrections complete
3. Do NOT proceed to execution without VERIFIED status

---

## References

- TICKET_TEMPLATE.md — Required ticket structure
- TICKET_VALIDATION_WORKFLOW.md — Validation checklist
- [Any other relevant governance documents]
```

### Handoff Flow

```
Intent Overseer → Coordinator

Handoff Message:
"Ticket [TICKET-ID] rejected. Validation feedback provided in 
[ProjectName]/Genesis Execution/tickets/01_DRAFT/[TICKET-ID]-FEEDBACK.md. 
Please revise per feedback and resubmit."
```

---

## 4. Completion Contract

**Purpose:** Execution Agent provides evidence of ticket completion  
**Location:** `[ProjectName]/Genesis Execution/tickets/completion-contracts/[TICKET-ID].contract.md`  
**Owner:** Execution Agent (create), Coordinator Agent (review)

### Template

```markdown
# Completion Contract: [TICKET-ID]

**Ticket Name:** [One-line ticket summary]  
**Execution Agent:** [Agent identifier]  
**Completion Date:** [ISO 8601 timestamp]

---

## Branch Information

**Branch Name:** `ticket/[TICKET-ID]`  
**Commit SHA:** `[full 40-character SHA]`  
**PR URL:** [GitHub PR URL]

---

## Quality Gates

- ✅ **Linter:** No errors, no warnings
- ✅ **Type Check:** TypeScript compilation successful
- ✅ **Unit Tests:** All pass (exit code 0)
- ✅ **Integration Tests:** All pass
- ✅ **Playwright Tests (UI only):** All pass in headless mode
- ✅ **Build:** Successful with no errors
- ✅ **Coverage:** [X]% (threshold: [Y]%)

**Gate Results Evidence:**
```
[Terminal output showing all gates passed with timestamps]
```

---

## Success Criteria Verification

Copy each criterion from ticket and provide verification evidence:

- ✅ **[Criterion 1 from ticket]:** [Specific verification evidence - command output, screenshot, test result]
- ✅ **[Criterion 2 from ticket]:** [Specific verification evidence]
- ✅ **[Criterion 3 from ticket]:** [Specific verification evidence]

---

## Files Impacted (Actual)

List all files modified during implementation with actual changes:

- `path/to/file1.tsx` (MODIFIED) - [Brief description of changes made]
- `path/to/file2.spec.ts` (NEW) - [Brief description of what was added]
- `path/to/file3.md` (DELETED) - [Reason for deletion]

**Diff Summary:**
```
+[X] lines added
-[Y] lines removed
[Z] files changed
```

**Verification:**
```bash
git diff --stat main...ticket/[TICKET-ID]
```

---

## Screenshots/Artifacts

### Test Results
```
[Screenshot or paste of test passing with timestamps]
```

### Playwright Test Results (if UI ticket)
```
[Screenshot of Playwright HTML report showing all tests pass in headless mode]
npx playwright test --reporter=html
```

### PR Checks
```
[Screenshot showing all CI/CD checks passed]
```

### Product Documentation References (if applicable)
```
- Consulted: [Product documentation URL]
- Context7 Citation: [Citation ID or reference]
- Version used: [Product version number]
```

---

## Declaration

I declare that:
- ✅ All implementation work is complete per ticket specification
- ✅ All success criteria have been met and verified with evidence above
- ✅ All quality gates pass without errors or warnings
- ✅ The pull request is ready for Coordinator review
- ✅ No governance constraints were violated during implementation
- ✅ All product documentation was consulted for external dependencies
- ✅ All files listed in "Files Impacted" match the ticket specification

**Ready for transition to MERGE_READY.**

---

**Execution Agent Signature:** [Agent identifier]  
**Date:** [ISO 8601 timestamp]
```

### Handoff Flow

```
Execution Agent → Coordinator

Handoff Message:
"Ticket work complete. Completion contract available at 
[ProjectName]/Genesis Execution/tickets/completion-contracts/[TICKET-ID].contract.md 
with all evidence and success criteria verification. Ready for your review 
and transition to MERGE_READY."
```

---

## 5. Blocker Escalation

**Purpose:** Execution Agent escalates blocking issues  
**Location:** `[ProjectName]/Genesis Execution/logs/blockers/BLOCKER-[TICKET-ID]-[TIMESTAMP].md`  
**Owner:** Execution Agent (create), Coordinator Agent (resolve)

### Template

```markdown
# Blocker Escalation: [TICKET-ID]

**Execution Agent:** [Agent identifier]  
**Date:** [ISO 8601 timestamp]  
**Status:** BLOCKED

---

## Ticket Information

**Ticket ID:** [TICKET-ID]  
**Ticket Name:** [One-line summary]  
**Current State:** 03_EXECUTING

---

## Blocker Type

[Select ONE]:
- [ ] Ticket Ambiguity (unclear success criteria or implementation steps)
- [ ] Governance Conflict (ticket violates governance or constraints conflict)
- [ ] Authorization Question (unclear authorization or ticket ID mismatch)
- [ ] Out of Scope (work needed not in Files Impacted or Implementation Plan)
- [ ] Technical Blocker (unresolvable technical issue, missing credentials, external dependency)

---

## Blocker Description

[Clear, specific description of what is blocking progress]

**Specific Issue:**
[Detailed explanation]

**Context:**
[What was being attempted when blocker was encountered]

**Evidence:**
```
[Command output, error message, or relevant code showing the blocker]
```

---

## Required Action

[Exact action needed from Coordinator to unblock]

**Question for Coordinator:**
[Specific question that needs answering]

OR

**Decision Needed:**
[Specific decision that Coordinator must make]

---

## Attempted Resolutions

[What was tried to resolve this independently]

1. **Attempt:** [What was tried]  
   **Result:** [Why it didn't work]

2. **Attempt:** [What was tried]  
   **Result:** [Why it didn't work]

---

## Impact

**Execution Status:** Paused on ticket [TICKET-ID] until resolved  
**Other Tickets Blocked:** [List any dependent tickets that cannot proceed]

---

## References

- **Ticket:** `[ProjectName]/Genesis Execution/tickets/03_EXECUTING/[TICKET-ID].md`
- **Governance:** [Cite relevant governance documents if applicable]
- **Documentation:** [Cite product documentation if applicable]

---

**Awaiting Coordinator resolution.**
```

### Handoff Flow

```
Execution Agent → Coordinator

Handoff Message:
"Execution blocked on ticket [TICKET-ID]. Blocker type: [Ambiguity/Governance Conflict/Authorization/Out of Scope/Technical]. 
Details in [ProjectName]/Genesis Execution/logs/blockers/BLOCKER-[TICKET-ID]-[TIMESTAMP].md. 
Required action: [brief summary]. Awaiting your decision to proceed."
```

---

## 6. Strategic Decision | Strategy Agent | Coordinator | Varies by phase | §6 |
| Phase 1→2 Gate | Strategy Agent | Coordinator | `Genesis Execution/handoffs/phase-gates/PHASE-1-COMPLETE-[TS].md` | §7 |
| Phase 2→3 Gate | Coordinator | Intent Overseer | `Genesis Execution/handoffs/phase-gates/PHASE-2-COMPLETE-[TS].md` | §8 |

---

## 7. Phase 1→2 Gate: Intent Complete

**Purpose:** Strategy Agent confirms Phase 1 (Intent) is complete and authorizes Phase 2 (Specification)  
**Location:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-1-COMPLETE-[TIMESTAMP].md`  
**Owner:** Strategy Agent (create and proceed to Phase 2)

### Template

**File:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-1-COMPLETE-[TIMESTAMP].md`

```markdown
# Phase 1 Complete: Intent Established

**Date:** [ISO 8601 timestamp]  
**Strategy Agent:** [Agent identifier]  
**Founder Sign-Off:** ✅ APPROVED

---

## Phase 1 Verification

### Required Outputs Status

- ✅ **GENESIS_CONSTITUTION.md** — Founder approved
- ✅ **ROLE_MODEL.md** — Founder-approved roles and authority structure
- ✅ **Strategic Directive(s)** — Created using STRATEGIC_DIRECTIVE_TEMPLATE.md
- ✅ **Project Repository** — Location documented

### Strategic Directive Summary

**Project Name:** [Name]  
**Purpose:** [Brief summary]  
**Key Features:** [List core features]  
**Success Metrics:** [How we measure success]  
**Out of Scope:** [What we won't build]

**Strategic Directive Location:** `[ProjectName]/01_PHASE_1_INTENT/STRATEGIC-DIRECTIVE-[NAME].md`

---

## Verification Checklist

- ✅ All Phase 1 outputs present and complete
- ✅ No contradictions between constitution and directives
- ✅ Founder has signed off on strategic direction
- ✅ Phase 2 acceptance criteria defined
- ✅ Repository location confirmed

---

## Phase 2 Authorization

**Status:** AUTHORIZED TO PROCEED

**Phase 2 Objectives:**
- Create detailed specifications from strategic directives
- Define UI/UX screen definitions and flows
- Document behavioral requirements per UI_GOVERNANCE.md
- Establish acceptance criteria for governance review

**Next Steps for Strategy Agent:**
1. Create this Phase 1 completion handoff document
2. Validate all Phase 1 outputs are accessible
3. Proceed to Phase 2 specification work per PHASE_2_RULES.md
4. Do NOT proceed to Phase 3 without Phase 2 completion gate

---

## References

- PHASE_1_RULES.md — Phase 1 requirements
- STRATEGIC_DIRECTIVE_TEMPLATE.md — Strategic directive format
- GENESIS_CONSTITUTION.md — Governance framework
- ROLE_MODEL.md — Role definitions

---

**Phase 1 Complete. Ready for Phase 2 Specification.**
```

### Handoff Flow

```
Strategy Agent → Strategy Agent (self-continuation)

Handoff Message:
"Phase 1 (Intent) complete. All strategic directives documented and founder approved. 
Phase gate handoff created at Genesis Execution/handoffs/phase-gates/PHASE-1-COMPLETE-[TIMESTAMP].md.
Proceeding to Phase 2 (Specification) work per PHASE_2_RULES.md."
```

---

## 8. Phase 2→3 Gate: Screen-by-Screen Review Complete

**Purpose:** Documents completion of Phase 2 screen specification review and founder approval of all UX screens  
**Location:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-2-COMPLETE-[TIMESTAMP].md`  
**Owner:** Strategy Agent (create after founder approval), Intent Overseer (validate and proceed)

### Template

**File:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-2-COMPLETE-[TIMESTAMP].md`

```markdown
# Phase 2 Complete: UX Specification Review

**Phase:** 2 - Specification  
**Status:** PHASE_2_COMPLETE  
**Completion Date:** [ISO-8601 timestamp]  
**Approved By:** Founder  
**Strategy Agent:** [Agent identifier]

## Summary
All UX screen specifications have been reviewed and approved by the founder. Each screen has been specified with complete functionality, flows, data requirements, and acceptance criteria.

## Screens Reviewed and Approved

### Active Screens
1. ✅ Screen-01-Login - User authentication
2. ✅ Screen-02-Dashboard - Main application overview
3. ✅ Screen-03-Settings - User preferences and configuration
4. ✅ Screen-04-Profile - User profile management
[... list all screens from Screen-Index.md with checkmarks]

**Total Active Screens:** [count]

### Archived Screens
- Screen-99-FeatureName - Removed on [date] (Reason: [brief explanation])
[... list any archived screens]

## Deliverables Completed

### Screen Specifications
- [x] Screen-Index.md with all active screens marked reviewed
- [x] All Screen-{n}-{name}/ folders created
- [x] Each screen has complete Specification.md
- [x] Each screen has Questions.md (all questions resolved)

### Optional UX Artifacts
- [ ] UX Screens/ folder with founder-designed mockups
- [ ] Wireframes or prototypes
- [ ] Design system documentation

## Phase 2 Artifacts Location
```
Genesis Execution/specs/UX Specs/
   Screen-Index.md                    ✓ Complete
   Screen-01-Login/
      Specification.md                 ✓ Reviewed
      Questions.md                     ✓ Resolved
   Screen-02-Dashboard/
      Specification.md                 ✓ Reviewed
      Questions.md                     ✓ Resolved
   [... all other screens]
```

## Readiness for Phase 3
- All screens have been specified and approved by founder
- Screen functionalities align with Phase 1 strategic directive
- Data models and API contracts identified in specifications
- User flows documented for all primary screens
- Ready for Governance Review per PHASE_3_RULES.md

## Handoff to Phase 3
Intent Overseer should review:
- Constitutional compliance of screen specifications
- Tool intelligence requirements for each screen
- UI behavior governance (per UI_GOVERNANCE.md)
- Phase 2 completion criteria met

**Next Phase:** Phase 3 - Governance Review  
**Phase Gate Status:** APPROVED  
**Authorization:** Founder approval confirmed via Phase Workflow UI
```

### Usage Notes
- Strategy Agent creates this after all screens in Screen-Index.md are checked [x]
- Founder must explicitly authorize phase completion via "Complete Phase 2" button
- This gate authorizes Intent Overseer to begin Phase 3 Governance Review
- If changes needed after gate creation, founder must work with Intent Overseer per governance amendment process

### Handoff Flow

```
Strategy Agent → Intent Overseer

Handoff Message:
"Phase 2 (Specification) complete. All screens reviewed via the screen-by-screen workflow; Screen-Index.md shows all active screens checked. Phase gate handoff in Genesis Execution/handoffs/phase-gates/PHASE-2-COMPLETE-[TIMESTAMP].md. Please perform Phase 3 Governance Review per PHASE_3_RULES.md before any execution begins."
```

---

## 9. Phase 3→4 Gate: Governance Review Complete

**Purpose:** Intent Overseer confirms Phase 3 (Governance Review) is complete and authorizes Phase 4 (Environment Setup)  
**Location:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-3-COMPLETE-[TIMESTAMP].md`  
**Owner:** Intent Overseer (create), Coordinator Agent (validate and proceed)

### Template

**File:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-3-COMPLETE-[TIMESTAMP].md`

```markdown
# Phase 3 Complete: Governance Review Passed

**Date:** [ISO 8601 timestamp]  
**Intent Overseer:** [Agent identifier]  
**Governance Status:** ✅ APPROVED

---

## Phase 3 Verification

### Governance Gates Status

- ✅ **Constitutional Review** — No violations of GENESIS_CONSTITUTION.md
- ✅ **Tool Intelligence Gate** — Tool selections validated per TOOL_INTELLIGENCE_GATE.md
- ✅ **UI Behavior Gate** — UI specifications comply with UI_BEHAVIOR_GATE.md
- ✅ **Decision Interrupts** — All resolved or documented
- ✅ **Traceability** — All specs traceable to Phase 1 intent

### Gate Review Summary

**Total Gates Reviewed:** [X]  
**Issues Found:** [0 or list]  
**Decision Interrupts:** [0 or list with resolutions]

**Governance Review Documentation:** `[ProjectName]/Genesis Execution/logs/governance-review-[TIMESTAMP].md`

---

## Verification Checklist

- ✅ All governance gates passed
- ✅ No open decision interrupts
- ✅ Phase 2 specifications remain frozen
- ✅ Technical feasibility confirmed by Execution lead
- ✅ No constitutional violations detected

---

## Phase 4 Authorization

**Status:** AUTHORIZED TO PROCEED

**Phase 4 Objectives:**
- Set up development environment per BOOTSTRAP.md
- Execute START_EVERYTHING.md checklist
- Onboard team per STARTUP_ROLE_CONTRACTS.md
- Prepare for Phase 5 execution

**Next Steps for Coordinator:**
1. Review this Phase 3 completion handoff
2. Begin Phase 4 environment setup per PHASE_4_RULES.md
3. Complete all startup contracts and checklists
4. Confirm environment readiness before Phase 5

---

## References

- PHASE_3_RULES.md — Phase 3 requirements
- GOVERNANCE_GATES.md — Gate validation criteria
- TOOL_INTELLIGENCE_GATE.md — Tool validation
- UI_BEHAVIOR_GATE.md — UI validation
- DECISION_INTERRUPT_PROTOCOL.md — Escalation process

---

**Phase 3 Complete. Ready for Phase 4 Environment Setup.**
```

### Handoff Flow

```
Intent Overseer → Coordinator

Handoff Message:
"Phase 3 Governance Review complete. All specifications approved and compliant with governance.
Phase gate handoff in Genesis Execution/handoffs/phase-gates/PHASE-3-COMPLETE-[TIMESTAMP].md.
You may proceed to Phase 4 (Environment Setup) and Phase 5 (Execution). Create tickets per specifications."
```

---

## 10. Phase 4→5 Gate: Environment Ready

**Purpose:** Coordinator confirms Phase 4 (Environment Setup) is complete and authorizes Phase 5 (Execution)  
**Location:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-4-COMPLETE-[TIMESTAMP].md`  
**Owner:** Coordinator Agent (create), All Agents (acknowledge)

### Template

**File:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-4-COMPLETE-[TIMESTAMP].md`

```markdown
# Phase 4 Complete: Environment Ready for Execution

**Date:** [ISO 8601 timestamp]  
**Coordinator Agent:** [Agent identifier]  
**Environment Status:** ✅ OPERATIONAL

---

## Phase 4 Verification

### Environment Readiness Status

- ✅ **GitHub Repository** — Initialized and accessible
- ✅ **Genesis Execution Structure** — All directories created
- ✅ **Role Contracts** — All agents onboarded per STARTUP_ROLE_CONTRACTS.md
- ✅ **Startup Checklist** — START_EVERYTHING.md completed
- ✅ **Team Understanding** — All agents confirm governance understanding

### Team Confirmation

**Strategy Agent:** ✅ Ready  
**Coordinator Agent:** ✅ Ready  
**Execution Agent:** ✅ Ready  
**Intent Overseer:** ✅ Ready

---

## Verification Checklist

- ✅ Environment health check passed
- ✅ All team members assigned per ROLE_MODEL.md
- ✅ Role contracts signed and acknowledged
- ✅ Genesis Execution/ directory structure complete
- ✅ No unresolved dependencies or blockers

---

## Phase 5 Authorization

**Status:** AUTHORIZED TO PROCEED

**Phase 5 Objectives:**
- Execute tickets per Phase 2 specifications
- Follow ticket workflow: DRAFT → VERIFIED → EXECUTING → MERGE_READY → COMPLETE
- Maintain completion contracts and blocker escalation
- All UI tickets pass Playwright headless tests

**First Steps for Coordinator:**
1. Create tickets from Phase 2 specifications using TICKET_TEMPLATE.md
2. Submit tickets to Intent Overseer for validation
3. Upon validation, assign tickets to Execution Agent
4. Monitor completion contracts and evidence

---

## References

- PHASE_4_RULES.md — Phase 4 requirements
- BOOTSTRAP.md — Environment setup
- START_EVERYTHING.md — Startup checklist
- STARTUP_ROLE_CONTRACTS.md — Role contracts
- TICKET_LIFECYCLE.md — Phase 5 ticket workflow

---

**Phase 4 Complete. Ready for Phase 5 Execution.**
```

### Handoff Flow

```
Coordinator → All Agents

Handoff Message:
"Phase 4 Environment Setup complete. All systems operational and team ready.
Phase gate handoff in Genesis Execution/handoffs/phase-gates/PHASE-4-COMPLETE-[TIMESTAMP].md.
Phase 5 (Build & Execution) is now authorized. Coordinator will begin creating tickets from specifications."
```

---

## 11. Phase 5→6 Gate: Implementation Complete

**Purpose:** Coordinator confirms Phase 5 (Execution) is complete and requests Phase 6 (Founder Review)  
**Location:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-5-COMPLETE-[TIMESTAMP].md`  
**Owner:** Coordinator Agent (create), Strategy Agent (validate), Founder (authorize Phase 6)

### Template

**File:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-5-COMPLETE-[TIMESTAMP].md`

```markdown
# Phase 5 Complete: Implementation Ready for Founder Review

**Date:** [ISO 8601 timestamp]  
**Coordinator Agent:** [Agent identifier]  
**Implementation Status:** ✅ COMPLETE

---

## Phase 5 Verification

### Implementation Completeness

- ✅ **All Specifications Implemented** — Every Phase 2 spec has completed ticket
- ✅ **All Tickets Complete** — All tickets in 05_COMPLETE state
- ✅ **All PRs Merged** — No open or pending pull requests
- ✅ **Quality Gates Passed** — All tests, builds, linting successful
- ✅ **Playwright Tests** — All UI tickets passed headless E2E tests

### Deliverables Summary

**Total Tickets:** [X]  
**Total Commits:** [X]  
**Total PRs Merged:** [X]  
**Test Coverage:** [X%]

**Implementation Location:** `[Repository URL]` on branch `[branch name]`

---

## Compliance Verification

- ✅ All work follows TICKET_LIFECYCLE.md
- ✅ All completion contracts generated and verified
- ✅ No bypassed governance gates
- ✅ PR_MERGE_POLICY.md followed for all merges
- ✅ OPERATING_STANDARDS.md compliance confirmed

---

## Phase 6 Authorization Request

**Status:** READY FOR FOUNDER REVIEW

**Phase 6 Objectives:**
- Founder reviews implementation against Phase 1 intent
- Founder tests deliverables and provides feedback
- Refinement requests follow **Phase 5 governance** (ticketed, validated, completion contracts)
- Founder provides final approval or requests changes

**Next Steps for Founder:**
1. Review implementation in [Repository URL]
2. Test features against Phase 1 strategic directive
3. Provide feedback via Coordinator (who creates refinement tickets)
4. Approve for Phase 7 release OR request refinements

**Note for Coordinator:** Any founder refinement requests MUST follow Phase 5 governance:
- Create tickets using TICKET_TEMPLATE.md
- Submit to Intent Overseer for validation
- Execute with completion contracts
- Playwright headless for UI changes

---

## References

- PHASE_5_RULES.md — Phase 5 requirements
- PHASE_6_RULES.md — Founder review process
- TICKET_LIFECYCLE.md — Ticket workflow
- Phase 1 Strategic Directive — Original intent

---

**Phase 5 Complete. Ready for Phase 6 Founder Review.**
```

### Handoff Flow

```
Coordinator → Strategy Agent → Founder

Handoff Message:
"Phase 5 implementation complete. All Phase 2 specifications delivered and tested.
Phase gate handoff in Genesis Execution/handoffs/phase-gates/PHASE-5-COMPLETE-[TIMESTAMP].md.
Request founder review per PHASE_6_RULES.md. Founder feedback will be implemented via Phase 5 governance (tickets, validation, completion contracts)."
```

---

## 12. Phase 6→7 Gate: Founder Approval for Release

**Purpose:** Founder confirms Phase 6 (Review) is complete and authorizes Phase 7 (Production Release)  
**Location:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-6-COMPLETE-[TIMESTAMP].md`  
**Owner:** Founder (approve), Strategy Agent (document), Coordinator Agent (execute)

### Template

**File:** `[ProjectName]/Genesis Execution/handoffs/phase-gates/PHASE-6-COMPLETE-[TIMESTAMP].md`

```markdown
# Phase 6 Complete: Founder Approval for Production Release

**Date:** [ISO 8601 timestamp]  
**Founder:** [Name]  
**Approval Status:** ✅ APPROVED FOR RELEASE

---

## Phase 6 Verification

### Founder Review Results

- ✅ **Intent Alignment** — Implementation matches Phase 1 strategic directive
- ✅ **Feature Completeness** — All required features delivered
- ✅ **Quality Acceptable** — No blocking issues or concerns
- ✅ **Refinements Complete** — All founder feedback implemented (if any)
- ✅ **Ready for Production** — Confident in release decision

### Refinement Summary (if applicable)

**Total Refinement Tickets:** [0 or X]  
**All Refinement Tickets Complete:** [✅ or N/A]  
**Final Review Date:** [Date]

---

## Founder Sign-Off

**Statement:**
"I have reviewed the Phase 5 implementation and all Phase 6 refinements. The deliverable meets my original intent from Phase 1 and satisfies the Phase 2 specifications. I approve this for Phase 7 production release."

**Founder Signature:** [Name]  
**Date:** [ISO 8601 timestamp]

---

## Phase 7 Authorization

**Status:** AUTHORIZED FOR PRODUCTION RELEASE

**Phase 7 Objectives:**
- Deploy to production environment
- Validate operational stability
- Monitor live performance
- Hand off to ongoing maintenance

**Next Steps for Coordinator:**
1. Review this Phase 6 completion handoff
2. Execute Phase 7 deployment per PHASE_7_RULES.md
3. Validate production operational health
4. Obtain final founder confirmation of live system

---

## References

- PHASE_6_RULES.md — Founder review requirements
- PHASE_7_RULES.md — Release procedures
- Phase 1 Strategic Directive — Original intent
- OPERATING_STANDARDS.md — Production standards

---

**Phase 6 Complete. Ready for Phase 7 Production Release.**
```

### Handoff Flow

```
Founder → Strategy Agent → Coordinator

Handoff Message:
"Phase 6 founder review complete. Implementation approved for production release.
Phase gate handoff in Genesis Execution/handoffs/phase-gates/PHASE-6-COMPLETE-[TIMESTAMP].md.
Proceed to Phase 7 (Production Release) per PHASE_7_RULES.md."
```

---

## 6. Strategic Decision Implementation

**Purpose:** Strategy Agent provides decisions for Coordinator to implement  
**Location:** Varies by phase (Phase 1: Strategic Directives, Phase 2: Specifications, etc.)  
**Owner:** Strategy Agent (create), Coordinator Agent (implement)

### Handoff Flow

```
Strategy Agent → Coordinator

Handoff Message:
"Strategic decision documented in [Location/Document.md]. 
Key decisions: [brief summary]. Please create tickets to implement this strategic direction."
```

---

## Directory Structure

Ensure these directories exist for handoff documents:

```
[ProjectName]/
└── Genesis Execution/
    ├── governance/
    │   └── execution-authorization.json       # Current execution authorization
    ├── handoffs/
    │   ├── validation-approved/               # All tickets approved handoffs
    │   │   └── VALIDATION-APPROVED-[TS].md
    │   ├── validation-partial/                # Partial approval handoffs
    │   │   └── VALIDATION-PARTIAL-[TS].md
    │   ├── validation-rework/                 # All rework handoffs
    │   │   └── VALIDATION-REWORK-[TS].md
    │   └── phase-gates/                       # Phase transition gates
    │       ├── PHASE-1-COMPLETE-[TS].md
    │       ├── PHASE-2-COMPLETE-[TS].md
    │       ├── PHASE-3-COMPLETE-[TS].md
    │       ├── PHASE-4-COMPLETE-[TS].md
    │       ├── PHASE-5-COMPLETE-[TS].md
    │       └── PHASE-6-COMPLETE-[TS].md
    ├── tickets/
    │   ├── 01_DRAFT/                          # Tickets awaiting validation
    │   │   └── [TICKET-ID]-FEEDBACK.md        # Validation feedback (optional)
    │   ├── 02_VERIFIED/                       # Validated tickets ready for execution
    │   ├── 03_EXECUTING/                      # Tickets currently in progress
    │   ├── 04_MERGE_READY/                    # Completed tickets ready to merge
    │   └── 05_COMPLETE/                       # Merged and complete tickets
    │   └── completion-contracts/              # Completion contracts
    │       └── [TICKET-ID].contract.md
    └── logs/
        ├── blockers/                          # Blocker escalation files
        ├── ticket-state.log                   # Ticket state transitions
        └── decision.log                       # Coordinator decisions
```

---

## Handoff Summary Table

| Handoff | From | To | Document Location | Template Section |
|---------|------|----|--------------------|------------------|
| **Execution Handoffs** |
| Execution Authorization | Coordinator | Execution Agent | `Genesis Execution/governance/execution-authorization.json` | §1 |
| Ticket Validation Request | Coordinator | Intent Overseer | `Genesis Execution/tickets/01_DRAFT/[TICKET-ID].md` | §2 |
| Validation: All Approved | Intent Overseer | Coordinator | `Genesis Execution/handoffs/validation-approved/[TS].md` | §3a |
| Validation: Partial | Intent Overseer | Coordinator | `Genesis Execution/handoffs/validation-partial/[TS].md` | §3b |
| Validation: All Rework | Intent Overseer | Coordinator | `Genesis Execution/handoffs/validation-rework/[TS].md` | §3c |
| Completion Contract | Execution Agent | Coordinator | `Genesis Execution/tickets/completion-contracts/[TICKET-ID].contract.md` | §4 |
| Blocker Escalation | Execution Agent | Coordinator | `Genesis Execution/logs/blockers/BLOCKER-[TICKET-ID]-[TS].md` | §5 |
| Strategic Decision | Strategy Agent | Coordinator | Varies by phase | §6 |
| **Phase Gate Handoffs** |
| Phase 1→2 Gate (Intent Complete) | Strategy Agent | Coordinator | `Genesis Execution/handoffs/phase-gates/PHASE-1-COMPLETE-[TS].md` | §7 |
| Phase 2→3 Gate (Spec Complete) | Coordinator | Intent Overseer | `Genesis Execution/handoffs/phase-gates/PHASE-2-COMPLETE-[TS].md` | §8 |
| Phase 3→4 Gate (Governance Complete) | Intent Overseer | Coordinator | `Genesis Execution/handoffs/phase-gates/PHASE-3-COMPLETE-[TS].md` | §9 |
| Phase 4→5 Gate (Environment Ready) | Coordinator | All Agents | `Genesis Execution/handoffs/phase-gates/PHASE-4-COMPLETE-[TS].md` | §10 |
| Phase 5→6 Gate (Implementation Complete) | Coordinator | Strategy/Founder | `Genesis Execution/handoffs/phase-gates/PHASE-5-COMPLETE-[TS].md` | §11 |
| Phase 6→7 Gate (Founder Approval) | Founder/Strategy | Coordinator | `Genesis Execution/handoffs/phase-gates/PHASE-6-COMPLETE-[TS].md` | §12 |

---

## References

**Core Templates:**
- TICKET_TEMPLATE.md — Ticket structure
- EXECUTION_AUTHORIZATION_TEMPLATE.json — Authorization format
- CLARIFICATION_REQUEST_TEMPLATE.md — Clarification escalations

**Workflows:**
- TICKET_VALIDATION_WORKFLOW.md — Validation process
- TICKET_LIFECYCLE.md — Full ticket lifecycle

**Governance:**
- GENESIS_CONSTITUTION.md — Authority model
- ROLE_MODEL.md — Role definitions
- STARTUP_ROLE_CONTRACTS.md — Role contracts

---

## Version History

- **0.9** (2026-01-20): Initial comprehensive handoff templates document
