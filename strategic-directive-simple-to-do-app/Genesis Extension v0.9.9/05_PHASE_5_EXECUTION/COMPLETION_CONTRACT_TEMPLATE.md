# Completion Contract Template

**Purpose:** Evidence of ticket completion and readiness for merge

```markdown
# Completion Contract: [TICKET-ID]

## Branch And PR
- Branch: ticket/[TICKET-ID]
- Commit SHA: [sha]
- PR URL: [url]

## Quality Gates
- Build: PASS|FAIL
- Tests: PASS|FAIL
- Lint or type checks: PASS|FAIL
- Browser tests for UI work: PASS|FAIL

## Success Criteria Verification
- [criterion]: [evidence]

## Files Impacted
- [path] (NEW|MODIFIED|DELETED)

## Artifacts
- [logs, screenshots, traces, report links]

## Branch Cleanup Evidence
- Remote branch deleted: YES|NO

## Status Marker
Status: READY_FOR_REVIEW
```

UI tickets must include explicit headless browser-test evidence.

Acceptance evidence must not rest on stubs or fakes (Amendment #2026-013):

- A success criterion that claims an integration with an external system is accepted only with real integration evidence (a run, log or recorded response from the real system) or an explicit `DEMO` label on that criterion; a stub, mock or fake does not count as integration evidence.
- A criterion or claim that data is durable is accepted only when the data is written to a real persistent store; an in-memory map, a mock or a fixture file is not durable.
- Production code paths contain no test hooks (test-only flags, switches, fake injections or bypasses reachable outside the test suite).

### Self-Review Checklist

Before handing off to Coordinator, verify:

- [ ] All quality gates show ✅ with evidence
- [ ] Every success criterion has verification evidence
- [ ] All files impacted are listed with accurate markers
- [ ] Screenshots/artifacts are included and readable
- [ ] PR URL is accessible and checks are passing
- [ ] Commit SHA is correct (full 40 characters)
- [ ] Declaration boxes are all checked
- [ ] No placeholder text like [TODO] or [FILL IN] remains
- [ ] No success criterion rests on a stub or fake: integrations have real integration evidence or a `DEMO` label, durable claims name the persistent store, and production paths contain no test hooks

### For Coordinator Agent

When receiving completion contract:

1. **Read contract:** Verify all sections present
2. **Check quality gates:** All must be ✅ with evidence
3. **Verify success criteria:** Each has specific verification
4. **Review PR:** Check CI/CD status, conflicts, readiness
5. **Compare files:** Actual vs. ticket's Files Impacted
6. **If complete:** Move ticket to 04_MERGE_READY and log transition
7. **If incomplete:** Return to Execution Agent with specific issues

---

## Common Issues and Fixes

### Issue: Gate Evidence Missing
❌ **Bad:**
```
- ✅ Unit Tests: All pass
```

✅ **Good:**
```
- ✅ Unit Tests: All pass (exit code 0)

Evidence:
$ npm test
✓ 45 tests passed (0 failed)
  Test Suites: 5 passed, 5 total
  Tests:       45 passed, 45 total
  Snapshots:   0 total
  Time:        8.234s
```

### Issue: Success Criteria Vague
❌ **Bad:**
```
- ✅ Feature works correctly
  Verification: Tested it
```

✅ **Good:**
```
- ✅ Login form submits valid credentials and redirects to dashboard
  Verification: Playwright test passes in headless mode
  Command: npx playwright test tests/auth/login.spec.ts
  Result: All assertions passed, redirect confirmed
```

### Issue: Files Impacted Incomplete
❌ **Bad:**
```
Files Impacted (Actual):
- Some files were changed
```

✅ **Good:**
```
Files Impacted (Actual):
- src/components/LoginForm.tsx (MODIFIED) - Added validation logic
- tests/auth/login.spec.ts (NEW) - Playwright tests for login flow
- src/styles/auth.css (MODIFIED) - Updated button styles

Diff Summary:
+234 lines added
-12 lines removed
3 files changed
```

---

## References

**Related Documents:**
- TICKET_TEMPLATE.md — Ticket structure and Success Criteria
- HANDOFF_TEMPLATES.md — All handoff formats
- PR_MERGE_POLICY.md — PR requirements
- TICKET_VALIDATION_WORKFLOW.md — Ticket lifecycle

**Governance:**
- STARTUP_ROLE_CONTRACTS.md — Section 3 (Execution Agent responsibilities)
- OPERATING_STANDARDS.md — Quality standards

---

## Version History

- **0.9** (2026-01-20): Initial completion contract template with comprehensive examples
