# Genesis Governance v0.9.5 Changes

**Release Date:** January 26, 2026  
**Status:** Active Development

## Summary

Genesis v0.9.5 introduces intelligent ticket dependency management with explicit dependency declaration and parallel execution support. This solves a critical production issue where tickets could be assigned out of order, causing cascade failures.

## Problem Statement

**v0.9.4 Issue:** Tickets were assigned based only on executionOrder priority (1, 2, 3...). If Ticket-002 (order 2) failed but Ticket-003 (order 3) was already in progress and depended on Ticket-002, this caused cascade failures. No formal dependency checking existed - only informal analysis documented in decision logs.

**Real-World Scenario:**
1. Coordinator assigns Ticket-002 (Create User API, order 2)
2. Coordinator assigns Ticket-003 (Dashboard UI using User API, order 3)
3. Ticket-002 encounters blocker and fails
4. Ticket-003 is already executing and fails (missing User API dependency)
5. Cascade of failures, wasted execution time

## Solution: Dependency Matrix System

v0.9.5 introduces explicit dependency declaration with support for parallel execution:

1. **Coordinator analyzes dependencies** after ticket generation (Step 0)
2. **Creates DEPENDENCY-MATRIX.json** with explicit dependencies array per ticket
3. **Authorization checks dependencies** before assignment (Step 2)
4. **Parallel execution** when safe (multiple tickets if type=parallel and dependencies met)

## Files Changed

### New Files
1. **DEPENDENCY_MATRIX_SPECIFICATION.md** (470 lines)
   - Complete governance specification
   - File format, execution types, assignment algorithm
   - Example scenarios, validation rules, error handling

### Modified Files
1. **VERSION.md**
   - Updated current version to v0.9.5
   - Added v0.9.5 release section with full details

2. **PHASE_5_RULES.md**
   - Added "Dependency Matrix (Step 0 - Post-Generation)" section
   - Updated "Phase 1: Authorization" to "Dependency-Aware"

3. **Coordinator Agent/agent.md**
   - Replaced "Execution Order Management" section (95 lines)
   - Added "Dependency Matrix Management (v0.9.5)" section
   - Added dependency-aware assignment algorithm with Round 1/Round 2/Round 3 examples

## Technical Specifications

### Dependency Matrix Format

```json
{
  "version": "1.0",
  "tickets": [
    {
      "id": "Ticket-001",
      "name": "Brief ticket description",
      "dependencies": [],
      "type": "sequential"
    }
  ]
}
```

### Execution Types

- **sequential**: Only one sequential ticket executes at a time (for infrastructure changes, schema migrations, shared resources)
- **parallel**: Multiple parallel tickets can execute simultaneously (for independent features, different components)

### Assignment Algorithm

1. Read DEPENDENCY-MATRIX.json
2. For each ticket in 02_VERIFIED/:
   - Check dependencies array
   - Verify ALL dependency ticket IDs are in 05_COMPLETE/
   - Check type constraints (sequential vs parallel)
   - Add to assignment queue if eligible
3. Assign all eligible tickets (can be multiple if parallel)

## Workflow Changes

### Step 0: Ticket Generation ✅ ENHANCED
- **After tickets created:** Coordinator analyzes dependencies
- **Output:** DEPENDENCY-MATRIX.json in Genesis Execution/tickets/
- **Button:** "Analyze Dependencies" added to completion dialog

### Step 1: Validation ✅ NO CHANGE
- Intent Overseer validation unchanged

### Step 2: Implementation 🔄 ENHANCED
- **Authorization:** Coordinator reads dependency matrix before assignment
- **Authorization:** Can assign multiple tickets simultaneously (parallel execution)
- **Execution:** Execution Agent receives dependency status context
- **Issue Resolution:** Coordinator considers dependency graph in guidance

## Success Metrics

✅ Zero out-of-order execution failures  
✅ Parallel execution when safe (2+ tickets simultaneously)  
✅ Dependency cascade prevention (blocked tickets wait)  
✅ Explicit dependency audit trail  
✅ 100% dependency enforcement compliance  

## Breaking Changes

**NONE** - Fully backward compatible with v0.9.4 workflows.

## Migration Path

Projects using v0.9.4 can upgrade to v0.9.5 with no code changes:

1. Replace governance package (zip extract)
2. Run Step 0 (ticket generation)
3. Click "Analyze Dependencies" button (new)
4. Proceed with Step 1 and Step 2 as normal

Existing execution-authorization.json format unchanged (optional dependency_check object added for observability).

## Example: Before vs After

**Before (v0.9.4):**
- Ticket-001 assigned (order 1)
- Ticket-002 assigned (order 2, depends on 001)
- Ticket-003 assigned (order 3, depends on 001)
- If 002 fails, 003 may already be in progress → cascade failure

**After (v0.9.5):**
- Round 1: Assign Ticket-001 only
- Round 2: Assign Ticket-002 AND Ticket-003 simultaneously (parallel, dependencies met)
- Round 3: Assign Ticket-004 (after 002 and 003 complete)
- If 002 fails, 003 continues (independent), 004 waits (blocked)

## References

- **DEPENDENCY_MATRIX_SPECIFICATION.md**: Complete specification
- **PHASE_5_RULES.md**: Phase 5 workflow rules
- **Coordinator Agent/agent.md**: Role-based instructions
- **PHASE_5_COMPARISON_v0.9.4_vs_v0.9.5.md**: Detailed comparison document (extension repo)
