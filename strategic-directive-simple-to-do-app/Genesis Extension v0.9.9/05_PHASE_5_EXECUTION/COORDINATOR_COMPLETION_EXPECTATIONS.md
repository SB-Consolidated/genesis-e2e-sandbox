# Coordinator Completion Expectations

## Required Before Accepting Merge Readiness

- Completion contract exists at `Genesis Execution/tickets/completion-contracts/[TICKET-ID].contract.md`.
- Success criteria are verified with evidence.
- PR exists and all required checks pass.
- UI tickets include headless browser-test evidence.

## Required Before Marking Complete

- PR is merged.
- Required CI checks passed.
- Remote ticket or hotfix branch is deleted or a documented exception exists.
- Completion contract exists at `Genesis Execution/tickets/completion-contracts/[TICKET-ID].contract.md`.
- `ticket-state.log` contains the completion entry.
- Authorization is updated to remove or close the completed ticket.
- Runtime merge-complete validation must pass before `04_MERGE_READY -> 05_COMPLETE`. The ticket-closeout automation performs this validation at runtime and refuses on any gap.

## Preferred Review Surfaces

- GitHub PR tooling
- Read-only MCP inspection
- Copilot code review or skills for evidence review

These surfaces support review; they do not replace Coordinator ownership of the merge-lane decision.

### Mistake 3: Marking Complete Before Branch Deletion
❌ **WRONG:**
```
PR merged → Move to COMPLETE
```

✅ **CORRECT:**
```
PR merged → Verify branch deleted with git ls-remote
Branch deleted → THEN move to COMPLETE
```

### Mistake 4: Accepting Incomplete Completion Contracts
❌ **WRONG:**
```
Completion contract says:
"Quality Gates:
- Build: PASS
- Tests: [not filled in]
- Lint: PASS"

Coordinator: "Good enough" → moves to MERGE_READY
```

✅ **CORRECT:**
```
Completion contract incomplete → BLOCK

Coordinator: "Tests gate not verified. Cannot move to MERGE_READY until ALL gates show PASS or FAIL with evidence."
```

### Mistake 5: Skipping UI Playwright Requirements
❌ **WRONG:**
```
UI ticket completion contract:
"Quality Gates:
- Build: PASS
- Tests: PASS  [but no Playwright headless mentioned]"

Coordinator: accepts and moves to MERGE_READY
```

✅ **CORRECT:**
```
UI ticket MUST have:
"Quality Gates:
- Build: PASS
- Tests: PASS
- Playwright Headless: PASS ✅
  Output: All 15 tests passed in headless Chrome"

If missing → BLOCK with: "UI ticket requires Playwright headless test evidence"
```

---

## Evidence Standards

### What "PASS" Means

**Acceptable Evidence:**
```
Quality Gates:
- Build: ✅ PASS
  Command: npm run build
  Output: Build completed successfully, 0 errors, 0 warnings
  
- Tests: ✅ PASS
  Command: npm test
  Output: 42 tests passed, 0 failed, coverage 87%
  
- Playwright (UI tickets): ✅ PASS
  Command: npx playwright test --headed=false
  Output: 15 tests passed in headless Chrome, 0 failures
```

**Unacceptable Evidence:**
```
Quality Gates:
- Build: PASS  [no command, no output]
- Tests: "they passed"  [no evidence]
- Playwright: "I ran them"  [no command, no results]
```

### What "Verified" Means for Success Criteria

**Acceptable:**
```
Success Criteria:
✅ Login form renders with email and password fields
   Verified: Screenshot shows form with both fields, playwright test confirms elements exist
   
✅ Form submits to /api/auth/login
   Verified: Network tab screenshot shows POST to /api/auth/login, test intercepts and validates request
```

**Unacceptable:**
```
Success Criteria:
✅ Login form works
   [no verification method, no evidence]
```

---

## Quick Reference: State Transition Checklist

### EXECUTING → MERGE_READY
- [ ] Read completion contract file
- [ ] All quality gates show PASS with evidence
- [ ] All success criteria checked with verification
- [ ] PR exists and URL in contract
- [ ] CI/CD checks passing
- [ ] No merge conflicts
- [ ] UI tickets have Playwright headless evidence
- [ ] Move ticket file with `mv` command
- [ ] Verify old location empty
- [ ] Verify new location has file
- [ ] Log transition with timestamp

### MERGE_READY → COMPLETE
- [ ] Re-verify PR still mergeable
- [ ] Confirm the PR merged: GitHub auto-merge after required checks pass (Track A high-risk PRs also need the Founder's `approved-by-founder` label, which Coordinator never applies), or a manual merge with recorded Founder approval
- [ ] Verify PR state is MERGED
- [ ] Verify ticket branch deleted with `git ls-remote`
- [ ] If branch exists, delete it
- [ ] Re-verify branch deleted
- [ ] Move ticket file with `mv` command
- [ ] Verify old location empty
- [ ] Verify new location has file
- [ ] Remove from execution-authorization.json
- [ ] Log completion with PR number and timestamp

---

## Governance References

- **TICKET_LIFECYCLE.md:** Authoritative lifecycle states and file movement rules
- **PR_MERGE_POLICY.md:** Branch deletion requirements and merge procedures
- **COMPLETION_CONTRACT_TEMPLATE.md:** Required evidence format
- **HANDOFF_TEMPLATES.md:** Section 4 - Completion contract handoff
- **Coordinator Agent/agent.md:** Full role authority and procedures

---

## When in Doubt

### If Completion Contract Seems Incomplete:
**BLOCK and ask for specific evidence.**

Example:
```
"Completion contract CC-UI-015.md blocked. Missing evidence:
1. Playwright headless test output - provide command and results
2. Success criterion #3 not verified - provide verification method
3. Screenshot for login form - provide artifact

Resubmit when complete."
```

### If PR Checks Failing:
**BLOCK and document specific failures.**

Example:
```
"Ticket UI-015 blocked from MERGE_READY. PR checks failing:
- ESLint: 3 errors in LoginForm.tsx (lines 42, 67, 89)
- Playwright: 2 tests failing (auth/login.spec.ts)

Fix issues and resubmit completion contract."
```

### If Branch Not Deleted After Merge:
**BLOCK from COMPLETE and require deletion.**

Example:
```
"Ticket UI-015 blocked from COMPLETE. Branch still exists:
$ git ls-remote origin ticket/UI-015-*
abc123def refs/heads/ticket/UI-015-login-form

Per PR_MERGE_POLICY.md, ticket branch MUST be deleted.
Delete branch: git push origin --delete ticket/UI-015-login-form
Then resubmit for COMPLETE."
```

---

**Remember:** Your role is to enforce quality gates and completion standards. Better to block and ask for evidence than to accept incomplete work.
