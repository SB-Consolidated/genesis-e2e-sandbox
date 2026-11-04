# Dependency Matrix Specification

**Version:** 1.1  
**Status:** Active

## Purpose

The dependency matrix defines which verified tickets may be authorized together and which must wait.

## Canonical Location

`Genesis Execution/tickets/DEPENDENCY-MATRIX.json`

## Canonical Shape

```json
{
  "version": "1.1",
  "tickets": [
    {
      "id": "TICKET-001",
      "name": "Bootstrap governance artifacts",
      "dependencies": [],
      "executionType": "sequential"
    },
    {
      "id": "TICKET-002",
      "name": "Implement review panel",
      "dependencies": ["TICKET-001"],
      "executionType": "parallel"
    }
  ]
}
```

## Rules

- `id` must use `TICKET-NNN`.
- `dependencies` is an array of ticket IDs.
- `executionType` is `sequential` or `parallel`.
- A ticket is assignable only when all dependencies are in `05_COMPLETE`.
- At most one `sequential` ticket may be active in `03_EXECUTING` at a time.
- Multiple `parallel` tickets may be authorized together when dependencies are satisfied.

## Coordinator Obligations

- Create or refresh the matrix after drafting tickets.
- Use the matrix when writing authorization.
- Log dependency-based assignment reasoning when authorizing tickets.
const assignableTickets = [];

for (const ticketFile of verifiedTickets) {
  const ticketId = extractTicketId(ticketFile); // "Ticket-001"
  const ticketInfo = matrix.tickets.find(t => t.id === ticketId);
  
  // Check dependencies
  const allDependenciesMet = ticketInfo.dependencies.every(depId => 
    completeTickets.includes(`${depId}.md`)
  );
  
  if (!allDependenciesMet) {
    // Ticket is BLOCKED
    continue;
  }
  
  // Check type constraints
  if (ticketInfo.type === "sequential") {
    const sequentialInProgress = executingTickets.some(execFile => {
      const execId = extractTicketId(execFile);
      const execInfo = matrix.tickets.find(t => t.id === execId);
      return execInfo.type === "sequential";
    });
    
    if (sequentialInProgress) {
      // Ticket must WAIT (another sequential ticket running)
      continue;
    }
  }
  
  // Ticket is ASSIGNABLE
  assignableTickets.push(ticketId);
}
```

#### Step 4: Assign All Eligible Tickets
```typescript
for (const ticketId of assignableTickets) {
  createExecutionAuthorization(ticketId);
  logAssignment(ticketId, dependencyStatus);
}
```

---

## Example Scenarios

### Example 1: Sequential Chain
**Scenario:** Each ticket depends on the previous one. All are sequential.

**Matrix:**
```json
{
  "version": "1.0",
  "tickets": [
    {
      "id": "Ticket-001",
      "name": "Create database schema",
      "dependencies": [],
      "type": "sequential"
    },
    {
      "id": "Ticket-002",
      "name": "Seed initial data",
      "dependencies": ["Ticket-001"],
      "type": "sequential"
    },
    {
      "id": "Ticket-003",
      "name": "Create API endpoints",
      "dependencies": ["Ticket-002"],
      "type": "sequential"
    }
  ]
}
```

**Execution Flow:**
1. **Round 1:** Assign Ticket-001 only
2. Wait for Ticket-001 to reach 05_COMPLETE/
3. **Round 2:** Assign Ticket-002 only
4. Wait for Ticket-002 to reach 05_COMPLETE/
5. **Round 3:** Assign Ticket-003 only
6. Wait for Ticket-003 to reach 05_COMPLETE/
7. **Complete**

---

### Example 2: Parallel Split
**Scenario:** One setup ticket, then two independent features that can run simultaneously.

**Matrix:**
```json
{
  "version": "1.0",
  "tickets": [
    {
      "id": "Ticket-001",
      "name": "Setup project structure",
      "dependencies": [],
      "type": "sequential"
    },
    {
      "id": "Ticket-002",
      "name": "Create user profile page",
      "dependencies": ["Ticket-001"],
      "type": "parallel"
    },
    {
      "id": "Ticket-003",
      "name": "Create product listing page",
      "dependencies": ["Ticket-001"],
      "type": "parallel"
    },
    {
      "id": "Ticket-004",
      "name": "Create navigation bar",
      "dependencies": ["Ticket-002", "Ticket-003"],
      "type": "sequential"
    }
  ]
}
```

**Execution Flow:**
1. **Round 1:** Assign Ticket-001 only (sequential, no dependencies)
2. Wait for Ticket-001 to reach 05_COMPLETE/
3. **Round 2:** Assign BOTH Ticket-002 AND Ticket-003 simultaneously (parallel, dependencies met)
4. Wait for BOTH to reach 05_COMPLETE/
5. **Round 3:** Assign Ticket-004 only (sequential, all dependencies met)
6. Wait for Ticket-004 to reach 05_COMPLETE/
7. **Complete**

**Key Insight:** Tickets 002 and 003 execute in parallel, saving time.

---

### Example 3: Mixed Dependencies
**Scenario:** Complex dependency graph with multiple paths.

**Matrix:**
```json
{
  "version": "1.0",
  "tickets": [
    {
      "id": "Ticket-001",
      "name": "Setup database",
      "dependencies": [],
      "type": "sequential"
    },
    {
      "id": "Ticket-002",
      "name": "Create User model",
      "dependencies": ["Ticket-001"],
      "type": "parallel"
    },
    {
      "id": "Ticket-003",
      "name": "Create Product model",
      "dependencies": ["Ticket-001"],
      "type": "parallel"
    },
    {
      "id": "Ticket-004",
      "name": "Create Order model",
      "dependencies": ["Ticket-001"],
      "type": "parallel"
    },
    {
      "id": "Ticket-005",
      "name": "User-Product relations",
      "dependencies": ["Ticket-002", "Ticket-003"],
      "type": "sequential"
    },
    {
      "id": "Ticket-006",
      "name": "Order-Product relations",
      "dependencies": ["Ticket-003", "Ticket-004"],
      "type": "sequential"
    }
  ]
}
```

**Execution Flow:**
1. **Round 1:** Assign Ticket-001 only
2. **Round 2:** Assign Ticket-002, Ticket-003, Ticket-004 simultaneously (all parallel, all depend on 001)
3. Wait for all three to complete
4. **Round 3:** Assign Ticket-005 only (sequential, depends on 002+003)
5. Wait for Ticket-005 to complete
6. **Round 4:** Assign Ticket-006 only (sequential, depends on 003+004, but 005 is also sequential so must wait)
7. Wait for Ticket-006 to complete
8. **Complete**

---

## Validation Rules

### Matrix-Level Validation

1. **Well-Formed JSON**
   - File must parse as valid JSON
   - No syntax errors

2. **Required Fields Present**
   - `version` field exists
   - `tickets` array exists

3. **Version Compatibility**
   - `version` is a known value (currently "1.0")

### Ticket-Level Validation

1. **Required Fields**
   - `id` present and non-empty
   - `name` present and non-empty
   - `dependencies` array present (can be empty)
   - `type` present and valid

2. **ID Uniqueness**
   - No duplicate ticket IDs in the matrix
   - Each ticket appears exactly once

3. **Dependency Validity**
   - All ticket IDs in `dependencies` arrays exist in the matrix
   - No ticket depends on itself (`"Ticket-001"` cannot list `"Ticket-001"` in dependencies)

4. **Type Validity**
   - `type` is either `"sequential"` or `"parallel"`
   - No other values allowed

### Circular Dependency Detection

**Circular dependencies are forbidden:**

```json
// ❌ INVALID: Ticket-001 → Ticket-002 → Ticket-001
{
  "tickets": [
    { "id": "Ticket-001", "dependencies": ["Ticket-002"] },
    { "id": "Ticket-002", "dependencies": ["Ticket-001"] }
  ]
}

// ❌ INVALID: Ticket-001 → Ticket-002 → Ticket-003 → Ticket-001
{
  "tickets": [
    { "id": "Ticket-001", "dependencies": ["Ticket-003"] },
    { "id": "Ticket-002", "dependencies": ["Ticket-001"] },
    { "id": "Ticket-003", "dependencies": ["Ticket-002"] }
  ]
}
```

**Detection Algorithm:**
```typescript
function detectCircularDependencies(matrix) {
  for (const ticket of matrix.tickets) {
    const visited = new Set();
    const stack = [ticket.id];
    
    while (stack.length > 0) {
      const currentId = stack.pop();
      
      if (visited.has(currentId)) {
        throw new Error(`Circular dependency detected involving ${ticket.id}`);
      }
      
      visited.add(currentId);
      
      const current = matrix.tickets.find(t => t.id === currentId);
      stack.push(...current.dependencies);
    }
  }
}
```

---

## Error Handling

### Missing Dependency Ticket ID

**Scenario:** Dependency references a ticket that doesn't exist.

```json
{
  "tickets": [
    {
      "id": "Ticket-001",
      "dependencies": ["Ticket-999"],  // ❌ Ticket-999 doesn't exist
      "type": "sequential"
    }
  ]
}
```

**Error Response:**
```
ERROR: Dependency validation failed
Ticket-001 depends on Ticket-999, but Ticket-999 does not exist in the matrix.
```

**Resolution:** Add the missing ticket or remove the invalid dependency.

---

### Circular Dependency

**Scenario:** Tickets depend on each other in a cycle.

```json
{
  "tickets": [
    { "id": "Ticket-001", "dependencies": ["Ticket-002"] },
    { "id": "Ticket-002", "dependencies": ["Ticket-001"] }
  ]
}
```

**Error Response:**
```
ERROR: Circular dependency detected
Cycle: Ticket-001 → Ticket-002 → Ticket-001
```

**Resolution:** Refactor dependencies to break the cycle. One ticket must be independent or depend on a third ticket.

---

### Malformed JSON

**Scenario:** JSON syntax error in the file.

```json
{
  "version": "1.0",
  "tickets": [
    {
      "id": "Ticket-001",
      "dependencies": [],
      "type": "sequential"  // ❌ Missing comma
    }
    {
      "id": "Ticket-002",
      "dependencies": [],
      "type": "parallel"
    }
  ]
}
```

**Error Response:**
```
ERROR: Failed to parse DEPENDENCY-MATRIX.json
SyntaxError: Unexpected token { in JSON at position 123
```

**Resolution:** Fix JSON syntax error (add missing comma).

---

### Invalid Execution Type

**Scenario:** Unknown value for `type` field.

```json
{
  "id": "Ticket-001",
  "dependencies": [],
  "type": "async"  // ❌ Invalid value
}
```

**Error Response:**
```
ERROR: Invalid execution type for Ticket-001
Expected "sequential" or "parallel", got "async"
```

**Resolution:** Change `type` to `"sequential"` or `"parallel"`.

---

## Integration Points

### Created By: Coordinator Agent (Step 0)

**Trigger:** After ticket generation completes, before validation.

**Process:**
1. Read all ticket files in `01_DRAFT/`
2. Analyze technical dependencies (API contracts, data models, authentication requirements)
3. Identify execution constraints (infrastructure changes, shared resources)
4. Create DEPENDENCY-MATRIX.json in `Genesis Execution/tickets/`
5. Log creation in decision-log.md

**Coordinator Responsibilities:**
- Accurate dependency analysis
- Appropriate execution type designation
- No circular dependencies
- All tickets represented in matrix

---

### Read By: Coordinator Agent (Step 2 Authorization)

**Trigger:** Before creating execution-authorization.json.

**Process:**
1. Read DEPENDENCY-MATRIX.json from disk
2. For each ticket in `02_VERIFIED/`, check dependencies
3. Identify all assignable tickets (dependencies met, type constraints satisfied)
4. Create execution-authorization.json with all assignable ticket IDs
5. Include `dependency_check` object for observability

**Coordinator Responsibilities:**
- Correct dependency resolution
- Type constraint enforcement
- Assignment of ALL eligible tickets (not just one)
- Dependency status logging

---

### Referenced By: execution-authorization.json

**Optional Enhancement:** Include dependency status in authorization file for transparency.

**Example:**
```json
{
  "authorizationId": "auth-2026-01-26-001",
  "authorizedBy": "Coordinator Agent",
  "timestamp": "2026-01-26T14:30:00Z",
  "tickets": [
    {
      "id": "Ticket-002",
      "executionOrder": 1,
      "dependency_check": {
        "dependencies": ["Ticket-001"],
        "status": "ALL_MET",
        "verified_at": "2026-01-26T14:30:00Z"
      }
    },
    {
      "id": "Ticket-003",
      "executionOrder": 1,
      "dependency_check": {
        "dependencies": ["Ticket-001"],
        "status": "ALL_MET",
        "verified_at": "2026-01-26T14:30:00Z"
      }
    }
  ]
}
```

---

### Logged In: ticket-state.log

**Entry Format:**
```
2026-01-26T14:30:00Z | Ticket-002 | 02_VERIFIED → 03_EXECUTING | Coordinator | Dependencies: Ticket-001 (COMPLETE)
```

---

## Governance Compliance

### GENESIS_CONSTITUTION.md Alignment

- **Authority Model:** Coordinator Agent has exclusive authority over ticket authorization (unchanged)
- **Execution Agent:** Continues to implement tickets as assigned (unchanged)
- **Dependency Matrix:** Adds explicit governance control over execution order

### PHASE_GATE_ENFORCEMENT.md Alignment

- **Phase 5 Gates:** Dependency checking occurs within existing Phase 5 gates
- **No New Phase:** Dependency matrix is part of existing Step 0 and Step 2 workflows
- **Gate Compliance:** All existing gates remain enforced

### TICKET_LIFECYCLE.md Alignment

- **State Machine:** Unchanged (01_DRAFT → 02_VERIFIED → 03_EXECUTING → 04_MERGE_READY → 05_COMPLETE)
- **Folder Transitions:** Unchanged
- **Dependency Checking:** Occurs before 02_VERIFIED → 03_EXECUTING transition

### OPERATING_STANDARDS.md Alignment

- **Explicit Over Implicit:** Dependency matrix makes implicit dependencies explicit
- **Automation:** Supports existing automation workflows
- **Audit Trail:** Adds dependency verification to ticket-state.log

---

## Future Enhancements

### Version 1.1 (Potential)
- **Conditional Dependencies:** "Ticket A OR Ticket B" (either one satisfies)
- **Soft Dependencies:** "Preferred but not required"
- **Resource Constraints:** Max parallel tickets based on resources

### Version 2.0 (Potential)
- **Dynamic Priorities:** Recalculate execution order based on runtime data
- **Dependency Visualization:** Graph rendering in UI
- **Dependency Impact Analysis:** "What blocks if Ticket X fails?"

---

## Summary

The Dependency Matrix is a governance-driven solution for preventing out-of-order execution failures in Genesis workflows. By explicitly declaring dependencies and execution types, it enables:

1. **Safe Parallel Execution:** Multiple tickets simultaneously when dependencies allow
2. **Cascade Prevention:** Blocked tickets wait for prerequisites
3. **Explicit Audit Trail:** Dependency verification logged for every assignment
4. **Backward Compatibility:** v0.9.4 workflows continue to work

**Key Files:**
- **This Specification:** DEPENDENCY_MATRIX_SPECIFICATION.md
- **Phase 5 Rules:** PHASE_5_RULES.md (Dependency Matrix section)
- **Coordinator Role:** Coordinator Agent/agent.md (Execution Order Management)

**Key Concepts:**
- **Sequential Type:** One at a time (infrastructure, shared resources)
- **Parallel Type:** Multiple simultaneously (independent features)
- **Dependencies Array:** Explicit prerequisite ticket IDs
- **Assignment Algorithm:** Check dependencies → verify type constraints → assign all eligible

**Success Criteria:**
- Zero out-of-order failures
- Parallel execution when safe
- 100% dependency enforcement compliance
