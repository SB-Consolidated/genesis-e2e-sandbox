# Execution Orchestrator - 13 Atomic Micro-Steps

**Version:** 1.0 (v0.9.5)  
**Status:** Active  
**Last Updated:** January 28, 2026

## Purpose

ExecutionOrchestrator is the automation engine for Phase 5 Step 2 (Implementation). It replaces the monolithic TicketImplementationService with a granular, file-based state machine that orchestrates ticket execution through 13 discrete micro-steps.

**Key Innovation:** File-based completion detection (not time-based polling) enables reliable resume after crashes and precise workflow control.

---

## Architecture Overview

### Design Principles

1. **Atomic Micro-Steps:** Each step is independently executable and verifiable
2. **File-Based State:** Files are deterministic state markers (not time)
3. **Smart Resume:** System can restart mid-execution without losing progress
4. **Parallel Execution:** Multiple tickets can execute simultaneously (dependency-aware)
5. **Three-Tier Resolution:** Technical → Clarification → Business/Design escalation
6. **No Manual Intervention:** Fully automated from authorization to merge

### State Detection Priority

**For tickets in 03_EXECUTING/:**
- Priority 1: Check for issue file → Agent encountered blocker after execution
- Priority 2: Check for completion contract → Agent finished successfully
- Priority 3: No files found → Execution interrupted, will re-execute

**For tickets in 04_MERGE_READY/:**
- Priority 1: Check for merge confirmation → Coordinator already merged
- Priority 2: No confirmation → Need Coordinator to merge

---

## The 13 Micro-Steps

### Step 2.0: Verify Environment & Ticket Inventory

**Purpose:** Pre-flight check before starting execution cycle

**Actions:**
1. Check for tickets in `Genesis Execution/tickets/02_VERIFIED/` (ready for assignment)
2. Verify Genesis Execution directory structure exists
3. Validate DEPENDENCY-MATRIX.json present (if required)
4. Check for stale authorization files from previous sessions

**Completion Signal:** Directory structure valid + tickets found (or none available)

**Error Handling:**
- Missing directories → Create them (per BOOTSTRAP.md)
- No VERIFIED tickets → Log info, wait for next cycle
- Malformed dependency matrix → Log error, request Coordinator fix

---

### Step 2.0b: Resolve Coordinator Blocker Issues

**Purpose:** Clear stale blockers before new assignments

**Actions:**
1. Check for tickets with existing issue files from previous sessions
2. For each stale issue:
   - Invoke Coordinator with issue context
   - Wait for guidance or escalation file
   - Process per standard resolution loop
3. Clear all stale blockers before proceeding to authorization

**Completion Signal:** No issue files remain unresolved

**Why This Step:**
- Prevents accumulation of unresolved blockers
- Ensures clean state before new ticket assignments
- Coordinator can batch-resolve related issues

---

### Step 2.1: Authorize Next Ticket(s) - Dependency-Aware

**Purpose:** Determine which tickets can be assigned based on dependencies and type constraints

**Actions:**
1. Read `DEPENDENCY-MATRIX.json`
2. For each ticket in `02_VERIFIED/`:
   - Check dependencies array
   - Verify ALL dependency ticket IDs are in `05_COMPLETE/`
   - Apply type constraints:
     - **Sequential:** Only one sequential ticket in `03_EXECUTING/` at a time
     - **Parallel:** Multiple parallel tickets can execute simultaneously
   - Add to assignment queue if eligible
3. Create `Genesis Execution/governance/execution-authorization.json` with ALL assignable tickets

**Authorization File Format:**
```json
{
  "authorized_tickets": ["TICKET-002", "TICKET-003"],
  "authorizedBy": "Coordinator Agent",
  "authorized_at": "2026-01-28T10:00:00Z",
  "scope": "Phase 5 implementation per TICKET_LIFECYCLE.md",
  "dependency_check": {
    "TICKET-002": {
      "dependencies": ["TICKET-001"],
      "dependencies_met": true,
      "type": "sequential"
    },
    "TICKET-003": {
      "dependencies": ["TICKET-001"],
      "dependencies_met": true,
      "type": "parallel"
    }
  }
}
```

**Completion Signal:** `execution-authorization.json` created with at least one ticket

**Parallel Execution Example:**
- Ticket A (sequential, no deps) → Assign immediately
- After A completes:
  - Ticket B (parallel, deps=[A]) → Assign
  - Ticket C (parallel, deps=[A]) → Assign simultaneously
  - Both B and C execute in parallel!

---

### Step 2.2: Prepare Context (with retry tracking)

**Purpose:** Gather all information needed for Execution Agent invocation

**Actions:**
1. Read ticket file from `02_VERIFIED/[TICKET-ID].md`
2. Check for existing guidance file (retry scenario)
3. Check for existing execution context (preserves retry count)
4. Create or update `execution-context-[TICKET-ID].json`

**Execution Context Format:**
```json
{
  "ticket_id": "TICKET-002",
  "retry_count": 0,
  "guidance_path": null,
  "contract_path": "Genesis Execution/contracts/completion/CC-TICKET-002.md",
  "started_at": "2026-01-28T10:05:00Z",
  "last_retry_at": null,
  "issue_history": []
}
```

**Completion Signal:** Context file created, all paths resolved

**Retry Preservation:**
- If context file exists from previous session → Read and preserve retry_count
- If fresh execution → Initialize retry_count = 0
- If guidance file exists → Include path in context for agent reference

---

### Step 2.3: Invoke Execution Agent

**Purpose:** Open Copilot Edits with ticket and initiate implementation

**Actions:**
1. Move ticket from `02_VERIFIED/` to `03_EXECUTING/`
2. Append transition to `ticket-state.log`
3. Open Copilot Edits with:
   - Ticket file path (not pasted content)
   - Guidance file path (if retry scenario)
   - Execution context for awareness
4. Agent implements:
   - Creates branch
   - Writes code
   - Runs tests
   - Creates PR
   - Creates completion contract: `CC-[TICKET-ID].md`
   - Moves ticket to `04_MERGE_READY/`
5. OR Agent creates issue file if blocked

**Completion Signal:** Agent session ends (file or issue created)

**No Polling Here:** This step only invokes the agent. Detection happens in Step 2.4.

---

### Step 2.4: Poll for Completion Contract

**Purpose:** Detect when Execution Agent finishes (success or blocked)

**Actions:**
1. **Priority 1 Check:** Look for `Genesis Execution/issues/[TICKET-ID].issue.json`
   - If exists → Jump to Step 2.10 (Issue Detection)
2. **Priority 2 Check:** Look for `Genesis Execution/contracts/completion/CC-[TICKET-ID].md`
   - If exists → Proceed to Step 2.5 (Validation)
3. **No Files Found:**
   - Continue polling (every 5 seconds)
   - No timeout → Wait indefinitely until file appears

**Completion Signal:** Issue file OR completion contract detected

**File-Based Detection (Not Time):**
- Files are deterministic state markers
- No arbitrary timeouts that cause false failures
- Agent can take as long as needed
- System knows exactly when agent is done

---

### Step 2.5: Validate Completion Contract

**Purpose:** Verify completion contract meets all requirements

**Actions:**
1. Read `CC-[TICKET-ID].md`
2. Check for required marker: `Status: READY_FOR_REVIEW`
3. Verify all required sections present:
   - Ticket Reference
   - Branch & Commit
   - Pull Request
   - Quality Gates (all PASS)
   - Success Criteria (all verified)
   - Files Impacted
   - Test Results
   - Evidence
4. Validate PR URL is accessible
5. Validate branch exists

**Completion Signal:** All validation checks pass

**If Invalid Contract:**
- Log specific validation failures
- Jump to Step 2.5b (Request Coordinator Fix)

**Why Extension Validates:**
- Consistent validation logic across all tickets
- Coordinator doesn't need to re-verify format
- Extension can enforce strict schema

---

### Step 2.5b: Request Coordinator Fix (invalid contract)

**Purpose:** Handle invalid completion contracts without failing ticket

**Actions:**
1. Create synthetic issue file with validation failures:
```json
{
  "ticketId": "TICKET-002",
  "description": "Completion contract validation failed: Missing 'Status: READY_FOR_REVIEW' marker. Quality Gates section incomplete.",
  "timestamp": "2026-01-28T10:30:00Z",
  "reportedBy": "ExecutionOrchestrator (automated validation)",
  "category": "technical_blocker"
}
```
2. Invoke Coordinator to analyze and provide guidance
3. Wait for guidance file
4. Loop back to Step 2.13 (Retry with Guidance)

**Completion Signal:** Guidance file created with correction instructions

**Why This Step:**
- Prevents ticket from getting stuck
- Coordinator can provide specific correction guidance
- Maintains automated flow (no manual intervention)

---

### Step 2.6: Move to MERGE_READY

**Purpose:** Signal ticket is ready for merge review

**Actions:**
1. Move ticket from `03_EXECUTING/` to `04_MERGE_READY/`
2. Append transition to `ticket-state.log`:
```
2026-01-28T10:35:00Z | TICKET-002 | 03_EXECUTING → 04_MERGE_READY | ExecutionOrchestrator
```
3. Update execution context with merge_ready_at timestamp

**Completion Signal:** Ticket file in `04_MERGE_READY/` folder

**Note:** Ticket physically moves (not copied) to maintain single source of truth

---

### Step 2.7: Merge via Coordinator

**Purpose:** Review completion contract and merge PR

**Actions:**
1. Invoke Coordinator with:
   - Completion contract path
   - PR URL
   - Ticket path
2. Coordinator reviews:
   - Verifies evidence (branch, commit, PR)
   - Checks all gates PASS
   - Reviews files impacted
   - Validates success criteria met
3. If approved:
   - Track B: Coordinator merges PR via GitHub API
   - Track A (v0.9.9): Coordinator enables auto-merge; GitHub merges once required checks pass, and a high-risk PR also waits for the Founder's `approved-by-founder` label (Coordinator never applies it). Coordinator records the merge when it is observed.
   - Coordinator deletes remote branch
   - Coordinator creates merge confirmation: `MERGE-[TICKET-ID].json`
4. If rejected:
   - Coordinator creates guidance with specific corrections needed
   - Loop back to Step 2.13 (Retry with Guidance)

**Merge Confirmation Format:**
```json
{
  "ticket_id": "TICKET-002",
  "pr_url": "https://github.com/org/repo/pull/123",
  "merged_at": "2026-01-28T10:40:00Z",
  "merge_commit": "abc123def456",
  "merged_by": "Coordinator Agent",
  "branch_deleted": true
}
```

**Completion Signal:** `MERGE-[TICKET-ID].json` exists

**Why Coordinator Owns The Merge Lane:**
- Human-level review of completion contract
- Verifies governance compliance
- Authority over the merge lane per GENESIS_CONSTITUTION.md (Track A merges are risk-tiered per PR_MERGE_POLICY.md)
- Can reject and provide guidance if issues found

---

### Step 2.8: Move to COMPLETE

**Purpose:** Mark ticket as fully complete

**Actions:**
1. Move ticket from `04_MERGE_READY/` to `05_COMPLETE/`
2. Append final transition to `ticket-state.log`:
```
2026-01-28T10:45:00Z | TICKET-002 | 04_MERGE_READY → 05_COMPLETE | ExecutionOrchestrator
```
3. Update DEPENDENCY-MATRIX.json ticket status (if tracked)
4. Signal to orchestrator that this ticket is now a satisfied dependency for other tickets

**Completion Signal:** Ticket file in `05_COMPLETE/` folder

**Cascading Effect:**
- Other tickets waiting on this ticket's dependencies can now be assigned
- Enables parallel execution of newly-unblocked tickets

---

### Step 2.9: Cleanup Authorization

**Purpose:** Remove temporary files and clean up state

**Actions:**
1. Remove ticket from `execution-authorization.json`
2. Delete `execution-context-[TICKET-ID].json`
3. Delete `MERGE-[TICKET-ID].json` (no longer needed)
4. Archive completion contract (move to archive/ or leave in completion/)
5. Clean up any temporary files created during execution

**Completion Signal:** All temporary files removed

**Why Cleanup:**
- Prevents accumulation of stale files
- Keeps workspace clean
- Removes completed tickets from authorization tracking
- Preserves only permanent artifacts (completion contracts, logs)

---

### Step 2.10: Issue Detection → Coordinator Analysis

**Purpose:** Handle Execution Agent blockers with three-tier resolution

**Actions:**
1. Detect `Genesis Execution/issues/[TICKET-ID].issue.json`
2. Read issue file to understand blocker
3. Invoke Coordinator with issue context
4. Coordinator analyzes using three-tier criteria:
   - **Tier 1 (Technical):** Create guidance directly
   - **Tier 2 (Clarification):** Create guidance directly
   - **Tier 3 (Business/Design):** Create escalation file
5. Wait for guidance OR escalation file

**Issue File Format:**
```json
{
  "ticketId": "TICKET-002",
  "description": "Unable to determine OAuth2 callback URL - not specified in ticket or environment variables",
  "timestamp": "2026-01-28T10:15:00Z",
  "reportedBy": "Execution Agent",
  "category": "clarification_needed"
}
```

**Completion Signal:** Guidance file OR escalation file created

**Branching:**
- If guidance file → Jump to Step 2.13 (Retry with Guidance)
- If escalation file → Jump to Step 2.11 (Founder Dialog)

---

### Step 2.11: Escalation → Founder Dialog

**Purpose:** Obtain Founder decision for business/design questions

**Actions:**
1. Detect `Genesis Execution/escalation/[TICKET-ID].escalation.json`
2. Parse escalation file
3. Show Founder dialog with:
   - Question
   - Options (2-3 choices)
   - Context
   - Free-form answer option
4. Founder provides decision
5. Create guidance file with Founder's answer:
```json
{
  "ticketId": "TICKET-002",
  "issueDescription": "Performance vs feature completeness decision",
  "guidance": "Founder Decision: Prioritize performance for MVP. Implement with 30-second polling instead of real-time WebSockets. Real-time updates can be added in Phase 2 if user feedback demands it. This aligns with our 'fast initial launch' strategy.",
  "timestamp": "2026-01-28T10:50:00Z",
  "providedBy": "Coordinator Agent (Founder decision)",
  "requires_founder": false
}
```
6. Delete escalation file
7. Jump to Step 2.13 (Retry with Guidance)

**Escalation File Format:**
```json
{
  "ticket_id": "TICKET-002",
  "issue_description": "Real-time updates require 3x more API calls, causing performance issues",
  "question": "Should we prioritize performance or feature completeness?",
  "options": [
    "Option A: Prioritize performance - use 30-second polling",
    "Option B: Prioritize features - implement WebSockets with caching"
  ],
  "context": "WebSockets add 2 weeks to timeline and 40% server cost increase",
  "requires_founder": true,
  "timestamp": "2026-01-28T10:45:00Z",
  "escalated_by": "Coordinator Agent"
}
```

**Completion Signal:** Guidance file created, escalation file deleted

**Why Founder Dialog:**
- Only Founder can make business/design decisions
- Clear options presented for quick decision
- Context provides all necessary information
- Decision captured in guidance for audit trail

---

### Step 2.13: Retry with Guidance

**Purpose:** Deliver guidance to Execution Agent and retry implementation

**Actions:**
1. Detect `Genesis Execution/guidance/[TICKET-ID].guidance.json`
2. Read guidance file
3. Update execution context:
   - Increment retry_count
   - Set guidance_path
   - Set last_retry_at timestamp
   - Append to issue_history
4. Re-invoke Execution Agent (Step 2.3) with:
   - Ticket path
   - **Guidance path** (attached for context)
   - Execution context (shows retry count)
5. Delete issue file (resolved by guidance)
6. Delete guidance file (consumed by agent)
7. Loop back to Step 2.4 (Poll for Completion Contract)

**Updated Context After Retry:**
```json
{
  "ticket_id": "TICKET-002",
  "retry_count": 1,
  "guidance_path": "Genesis Execution/guidance/TICKET-002.guidance.json",
  "contract_path": "Genesis Execution/contracts/completion/CC-TICKET-002.md",
  "started_at": "2026-01-28T10:05:00Z",
  "last_retry_at": "2026-01-28T10:55:00Z",
  "issue_history": [
    {
      "issue": "Unclear OAuth2 callback URL",
      "guidance": "Use /auth/callback endpoint per architecture docs",
      "timestamp": "2026-01-28T10:50:00Z"
    }
  ]
}
```

**Completion Signal:** Agent re-invoked with guidance attached

**Max Retries:**
- Track retry_count in context
- If exceeds threshold (e.g., 5 retries) → Escalate to Founder manually
- Prevents infinite retry loops

---

## Smart Resume Logic

### Resume After System Crash/Restart

**On Orchestrator Startup:**

1. **Scan 03_EXECUTING/ (tickets in progress):**
   ```
   For each ticket in 03_EXECUTING/:
     Priority 1: Check for issue file
       → If exists: Jump to Step 2.10 (Issue Detection)
     
     Priority 2: Check for completion contract
       → If exists: Agent already finished, jump to Step 2.5 (Validate Contract)
     
     Priority 3: No files found
       → Execution interrupted, will re-execute in main loop (Step 2.3)
       → Read execution context to preserve retry_count
   ```

2. **Scan 04_MERGE_READY/ (tickets awaiting merge):**
   ```
   For each ticket in 04_MERGE_READY/:
     Priority 1: Check for merge confirmation (MERGE-[TICKET-ID].json)
       → If exists: Coordinator already merged, jump to Step 2.8 (Move to COMPLETE)
     
     Priority 2: No confirmation
       → Need Coordinator to merge, jump to Step 2.7 (Merge via Coordinator)
   ```

3. **Preserve Retry State:**
   ```
   For each ticket with execution-context-[TICKET-ID].json:
     Read context file
     Preserve retry_count across restart
     Resume from appropriate step based on current state
   ```

**Key Benefits:**
- No lost progress on crash
- Retry counts preserved
- Duplicate work avoided
- Deterministic resume behavior

---

## File Artifact Reference

### State Marker Files

| File | Location | Purpose | Created By | Deleted By |
|------|----------|---------|------------|------------|
| `[TICKET-ID].contract.md` | `tickets/completion-contracts/` | Completion contract | Execution Agent | Never (archived) |
| `[TICKET-ID].issue.json` | `issues/` | Blocker report | Execution Agent | Orchestrator (after guidance) |
| `[TICKET-ID].guidance.json` | `guidance/` | Resolution guidance | Coordinator | Orchestrator (after retry) |
| `[TICKET-ID].escalation.json` | `escalation/` | Founder escalation | Coordinator | Orchestrator (after Founder response) |
| `MERGE-[TICKET-ID].json` | `tickets/completion-contracts/` | Merge confirmation | Coordinator | Orchestrator (cleanup) |
| `execution-context-[TICKET-ID].json` | `contracts/completion/` | Retry state tracking | Orchestrator | Orchestrator (cleanup) |
| `execution-authorization.json` | `governance/` | Batch authorization | Coordinator | Orchestrator (per ticket) |

### State Detection Matrix

| Ticket Location | Priority 1 Check | Priority 2 Check | Priority 3 Action |
|----------------|-----------------|-----------------|------------------|
| `03_EXECUTING/` | Issue file exists → Step 2.10 | Contract exists → Step 2.5 | No files → Re-execute Step 2.3 |
| `04_MERGE_READY/` | Merge confirmation → Step 2.8 | No confirmation → Step 2.7 | N/A |

---

## Error Handling

### Malformed Files

**Issue:** JSON file is invalid or corrupted

**Handling:**
1. Log error with file path and parse error
2. Move malformed file to `logs/errors/` with timestamp
3. Create synthetic issue file requesting Coordinator to recreate
4. Continue processing other tickets

### Missing Dependencies

**Issue:** Ticket lists dependency that doesn't exist in DEPENDENCY-MATRIX.json

**Handling:**
1. Log error with ticket ID and missing dependency
2. Mark ticket as blocked
3. Notify Coordinator to fix dependency matrix
4. Skip ticket in this cycle, retry next cycle

### Max Retries Exceeded

**Issue:** Ticket has been retried 5+ times without success

**Handling:**
1. Log warning with ticket ID and retry history
2. Create escalation file to Founder with full context
3. Pause ticket processing until Founder responds
4. Continue processing other tickets

### Merge Failure

**Issue:** Coordinator reports PR merge failed (conflicts, CI failure, etc.)

**Handling:**
1. Coordinator creates guidance with specific fix instructions
2. Orchestrator delivers guidance to Execution Agent
3. Agent fixes issues and updates PR
4. Loop back to merge review

---

## Performance Optimization

### Parallel Execution

**Simultaneous Ticket Processing:**
- Multiple parallel-type tickets can execute concurrently
- No artificial limit on parallel count (dependencies enforce natural limits)
- Sequential-type tickets execute one at a time

**Example:**
```
Round 1: TICKET-001 (sequential, no deps) → Assign
Round 2: TICKET-002 (parallel, deps=[001]) + TICKET-003 (parallel, deps=[001]) → Assign both
Round 3: TICKET-004 (parallel, deps=[001]) + TICKET-005 (parallel, deps=[001]) → Assign both
Result: 4 tickets executing simultaneously in rounds 2+3!
```

### Efficient Polling

**File-Based Detection (Not Time-Based):**
- Check for file existence (fast filesystem operation)
- No arbitrary timeouts
- No unnecessary re-invocations
- Agent can take as long as needed

**Polling Interval:**
- 5 seconds between checks
- Adjustable based on system load
- No CPU waste (just file stat calls)

---

## Governance Compliance

### GENESIS_CONSTITUTION.md Alignment
- Coordinator has exclusive authority over authorization (Step 2.1)
- Execution Agent implements tickets as assigned (Step 2.3)
- Founder makes business/design decisions (Step 2.11)
- Intent Overseer validates tickets before execution (not in this workflow)

### TICKET_LIFECYCLE.md Alignment
- State machine strictly enforced (folder transitions)
- No copies, only moves
- All transitions logged to ticket-state.log
- Completion contracts required before merge

### PHASE_GATE_ENFORCEMENT.md Alignment
- Phase 5 execution within existing gates
- No new phases introduced
- Dependency checking occurs within existing workflow
- Gate compliance maintained

---

## Migration from v0.9.4

### Breaking Changes
**NONE** - Fully backward compatible

### New Features
- 13 atomic micro-steps (vs monolithic implementation)
- File-based completion detection (vs time-based)
- Smart resume with contract-based state (vs restart-from-scratch)
- Three-tier escalation (vs ad-hoc escalation)
- Parallel execution support (vs sequential only)

### Adoption Path
1. Update to v0.9.5 governance package
2. No project changes required
3. Existing tickets continue processing
4. New features available immediately

---

## See Also

- **PHASE_5_RULES.md** - Phase 5 workflow overview
- **DEPENDENCY_MATRIX_SPECIFICATION.md** - Dependency-aware authorization
- **ISSUE_RESOLUTION_PROTOCOL.md** - Three-tier resolution details
- **COMPLETION_CONTRACT_TEMPLATE.md** - Contract format and requirements
- **TICKET_LIFECYCLE.md** - State machine and folder transitions

---

## Summary

ExecutionOrchestrator transforms Phase 5 execution from a monolithic, time-based workflow into a precise, file-based state machine with 13 atomic micro-steps. This enables:

✅ **Reliable Resume** - Contract-based state detection prevents lost progress  
✅ **Parallel Execution** - Multiple tickets simultaneously when dependencies allow  
✅ **Smart Escalation** - Three-tier resolution with Founder dialog for business decisions  
✅ **Zero Manual Intervention** - Fully automated from authorization to merge  
✅ **Precise Control** - Each micro-step independently verifiable  
✅ **Audit Trail** - Every state transition logged and file-based  

**Production Ready:** All 13 micro-steps fully implemented and tested in Genesis Control Plane v0.9.5.
