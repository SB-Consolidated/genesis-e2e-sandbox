# Genesis Governance v0.9.6 Changes

**Version:** v0.9.6  
**Date:** January 31, 2026  
**Previous Version:** v0.9.5  
**Status:** Active Development

---

## Overview

Genesis v0.9.6 focuses on **file structure standardization** and **UI enhancements** to improve reliability and user experience. The primary change standardizes completion contract paths across all documentation and code to eliminate file detection failures.

---

## Major Changes

### 1. File Structure Standardization - Completion Contracts ✅

**Problem:** Completion contract paths were inconsistent between code implementation and governance documentation:
- **Code Implementation:** `tickets/completion-contracts/[TICKET-ID].contract.md`
- **Governance Documentation:** `contracts/completion/CC-[TICKET-ID].md`

This mismatch caused file detection failures where agents would create files following the governance spec, but the system would poll a different location.

**Solution:** Standardized all references to match the code implementation:
- **New Location:** `Genesis Execution/tickets/completion-contracts/`
- **New Naming:** `[TICKET-ID].contract.md` (no CC- prefix)
- **Example:** `ENGINE-0042.contract.md`

**Files Updated:**
- ✅ `VERSION.md` - Updated version to v0.9.6 with changelog
- ✅ `00_GLOBAL/PHASE_GATE_ENFORCEMENT.md` - Updated completion contract table entry
- ✅ `05_PHASE_5_EXECUTION/COMPLETION_CONTRACT_TEMPLATE.md` - Updated header and instructions
- ✅ `05_PHASE_5_EXECUTION/COORDINATOR_COMPLETION_EXPECTATIONS.md` - Updated references and examples
- ✅ `05_PHASE_5_EXECUTION/TICKET_TEMPLATE.md` - Updated location and naming convention
- ✅ `05_PHASE_5_EXECUTION/TICKET_LIFECYCLE.md` - Updated creation and requirements sections
- ✅ `05_PHASE_5_EXECUTION/HANDOFF_TEMPLATES.md` - Updated table, template header, message, and folder structure
- ✅ `05_PHASE_5_EXECUTION/PHASE_5_RULES.md` - Updated all references throughout
- ✅ `05_PHASE_5_EXECUTION/EXECUTION_ORCHESTRATOR.md` - Updated JSON examples and lifecycle table
- ✅ `05_PHASE_5_EXECUTION/PR_MERGE_POLICY.md` - Updated documentation location

**Impact:**
- All initialization code creates consistent folder structure
- Validation checks correct location
- Documentation reflects actual implementation
- Agents can now follow governance and have files detected properly

---

### 2. Phase Navigation Control Enhancement ✅

**Code Implementation:** PhaseWorkflowPanel.ts (v0.9.6)

**Change:** Added user navigation tracking to prevent automatic phase switching when user manually navigates to explore different phases.

**Details:**
- Added `_userNavigatedToPhase` flag
- Flag automatically clears when user navigates to the detected active phase
- Allows users to explore other phases without being forced back

---

### 3. Deterministic Phase Gate Creation (Phases 1 & 2) ✅

**Code Implementation:** PhaseWorkflowPanel.ts (v0.9.6)

**Change:** Phase 1 and Phase 2 gate files now created directly by extension instead of relying on Strategy Agent.

**Details:**
- Removed dependency on Strategy Agent for gate creation
- Added `_createPhaseGateFile(phase, data)` method using templates
- Improves reliability and consistency across all phase transitions

---

### 4. Phase 5 Step 0 Completion Accuracy ✅

**Code Implementation:** PhaseWorkflowPanel.ts (v0.9.6)

**Change:** Step 0 (Ticket Generation) no longer shows complete when only `ticket_list.json` exists.

**Details:**
- Now requires actual ticket `.md` files in `01_DRAFT` or `02_VERIFIED` folders
- Added `_getTicketGenerationStatus()` method
- Displays accurate progress messages like "🔄 Creating ticket files (0/5)"
- Prevents premature phase progression

---

### 5. Guidance System Action Classification ✅

**Code Implementation:** TicketImplementationService.ts (v0.9.6)

**Change:** Enhanced guidance system to distinguish between actions requiring Coordinator execution vs. Execution Agent execution.

**8-Step Enhanced Flow:**
1. Execution reports issue → creates ISSUE.md
2. System detects issue → triggers handler
3. Request Coordinator guidance with actionBy instruction
4. System polls for guidance file → GUIDANCE.json
5. ✨ Check actionBy field (DECISION POINT)
   - If "EXECUTION": Send instructions to Execution Agent
   - If "COORDINATOR": Send action request to Coordinator
6. Send appropriate prompt based on actionBy
7. Poll for appropriate completion file
8. Verify issue resolved → continue

**Details:**
- Added `actionBy: 'EXECUTION' | 'COORDINATOR'` field to GuidanceInfo
- Complete rewrite of retry logic with branching paths
- New completion contract: `coordinator_action_complete.json` in `guidance/`
- Proper routing based on guidance classification

---

### 6. Coordinator Action Completion Path Fix ✅

**Code Implementation:** TicketImplementationService.ts (v0.9.6)

**Change:** Fixed broken Coordinator action completion polling.

**Details:**
- Previous implementation polled non-existent `03_IMPLEMENTING/` folder
- Now uses `guidance/${ticket.id}.action-complete.json`
- Aligns with existing issue/guidance pattern
- All guidance-related files now in one folder

---

### 7. Branch Deletion Added to Merge Workflow ✅

**Code Implementation:** TicketImplementationService.ts (v0.9.6)

**Change:** Added explicit branch deletion step to merge workflow prompts.

**Details:**
- Governance requires branch deletion as BLOCKING requirement
- Previous prompts omitted this step entirely
- Now includes: "3. Merge PR, 4. Delete branch, 5. Verify deletion, 6. Move to COMPLETE"
- Added CRITICAL warning that branch deletion is mandatory

---

## Breaking Changes

### ⚠️ Completion Contract Path Migration Required

If you have existing projects using v0.9.5 or earlier:

**Old Structure:**
```
Genesis Execution/
  contracts/
    completion/
      CC-TICKET-001.md
      CC-ENGINE-0042.md
```

**New Structure:**
```
Genesis Execution/
  tickets/
    completion-contracts/
      TICKET-001.contract.md
      ENGINE-0042.contract.md
```

**Migration Script:**
```powershell
# Migrate existing completion contracts
$oldPath = "Genesis Execution/contracts/completion"
$newPath = "Genesis Execution/tickets/completion-contracts"

if (Test-Path $oldPath) {
    New-Item -ItemType Directory -Force -Path $newPath
    Get-ChildItem "$oldPath/CC-*.md" | ForEach-Object {
        $newName = $_.Name -replace '^CC-', '' -replace '\.md$', '.contract.md'
        Move-Item $_.FullName "$newPath/$newName"
    }
    Remove-Item $oldPath -Recurse -Force
}
```

---

## Governance Version Updates

All Phase 5 governance files now reference v0.9.6:
- COMPLETION_CONTRACT_TEMPLATE.md - Version updated to 0.9.6
- All path references updated to new standardized format

---

## Testing & Validation

### Required Testing Before Production Use

1. **Fresh Project Initialization**
   - Verify folder structure created correctly
   - Check `tickets/completion-contracts/` folder exists
   - Confirm no `contracts/completion/` folder created

2. **Ticket Completion Flow**
   - Verify Execution Agent creates `[TICKET-ID].contract.md` in correct location
   - Confirm system detects completion contracts
   - Validate Coordinator can read and process contracts

3. **Phase Navigation**
   - Test manual phase navigation
   - Verify system doesn't auto-switch during exploration
   - Confirm auto-switch resumes when navigating to active phase

4. **Guidance Action Classification**
   - Test Coordinator action path
   - Test Execution Agent instruction path
   - Verify appropriate completion files detected

---

## Documentation Status

### ✅ Completed
- All governance files in Genesis v0.9.6 updated
- VERSION.md updated with v0.9.6 changelog
- GOVERNANCE_V0.9.6_CHANGES.md created (this file)

### ⚠️ Code Updates Required (Separate from Governance)
The following code files were already aligned with the new standard in the control plane:
- PhaseWorkflowPanel.ts (line 504, 538)
- governance.ts (line 70, 129)
- GovernanceValidationService.ts (line 227)
- TicketImplementationService.ts (multiple locations)
- Agent role contracts (Execution Agent, Coordinator Agent)

These files should be using Genesis v0.9.6 governance in production.

---

## Known Issues & Future Work

### Under Investigation
- **Phase 5 Continuous Execution:** System may pause between sub-steps requiring manual "Resume Implementation" - debugging in progress

### Proposed for Future Versions
- **File Completion Validation:** Content validation, size stability monitoring, completion marker patterns
- **Enhanced Dependency Tracking:** More sophisticated dependency graph visualization

---

## Compatibility

- **Backwards Compatible:** No (requires migration script for existing projects)
- **Minimum Extension Version:** Requires updated PhaseWorkflowPanel.ts and TicketImplementationService.ts
- **Required Dependencies:** None

---

## References

- **Development Tracking:** `V0.9.6_GOVERNANCE_DEVELOPMENT.md` (Genesis Control Plane)
- **Previous Version:** `GOVERNANCE_V0.9.5_CHANGES.md`
- **Version History:** `VERSION.md`

---

**Document Status:** Complete  
**Last Updated:** January 31, 2026
