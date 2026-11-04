# Playwright Testing Requirements

**Status:** Blocking  
**Authority:** UI_GOVERNANCE.md, PHASE_5_RULES.md  
**Scope:** All UI and browser-driven tickets

## Required Rule

Completion evidence for UI work must come from non-interactive browser automation.

- Headless execution is mandatory for completion evidence.
- `--headed`, `--debug`, and `--ui` are not acceptable completion evidence.
- Browser-driven founder review may add supplemental evidence in Phase 6, but it does not replace headless gate evidence.

## Parallel Worker Policy

Parallel Playwright execution is allowed and recommended for enterprise-scale suites when tests are isolated and deterministic.

### Required Rules

- Multiple workers may be used for governed completion evidence.
- Worker parallelism is allowed only for tests that do not share mutable state, shared credentials, shared files, or ordering assumptions.
- Tests that mutate shared environments, shared accounts, or global fixtures must run serially.
- CI should use a fixed, governed worker count rather than machine-maximum concurrency for merge-blocking evidence.
- Large suites may use sharding across CI jobs in addition to worker parallelism.

### Recommended Enterprise Defaults

- Local development: `--workers=50%` or another bounded team standard.
- CI merge gate: `--workers=2` or `--workers=4` unless the project documents a stricter baseline.
- Shared-state or critical workflow suites: `workers: 1` or serial mode for the affected suite.

### Fail-Fast Debugging Policy

- When investigating a failure, use `--max-failures=1`.
- Keep `retries=0` while isolating the first defect.
- Rerun only the failing spec file or `--grep` target until that defect is resolved.
- Do not rerun the entire E2E suite twice without a code, config, or test-selection change.
- If the same failure repeats, inspect the owning component or route before another full command run.

### Determinism Controls

- Use worker-scoped fixtures or isolated test data per worker.
- Separate authentication state and artifact output by worker when reuse would cause collisions.
- Do not rely on test ordering for governed completion evidence.
- If flakiness appears only under parallel execution, treat that as a test defect to fix rather than weakening the governance gate.

## Allowed Evidence

- Headless Playwright output
- Saved traces, screenshots, videos, and reports produced non-interactively
- Browser-run evidence captured by governed tooling in founder review
- Parallel or sharded headless runs when the project-defined determinism rules are satisfied

## Blockers

- Manual-only testing claims
- Headed-only evidence
- Browser tooling that requires ad hoc human intervention to prove ticket completion
- Parallel runs that depend on shared mutable state or non-deterministic ordering

## Quick Reference Commands

### Use These Commands

```bash
# Default headless
npx playwright test

# Fail fast while debugging a real defect
npx playwright test --headed=false --workers=1 --max-failures=1

# Narrow to one spec while fixing the first failure
npx playwright test tests/e2e/client-discovery-detail.spec.ts --headed=false --workers=1 --max-failures=1

# Narrow to one known failing title
npx playwright test --grep "unknown live client ids still show the not-found state" --headed=false --workers=1 --max-failures=1

# Explicit headless
npx playwright test --headed=false

# Fixed CI worker count
npx playwright test --headed=false --workers=4

# Serial shared-state suite
npx playwright test tests/ui/shared-state/ --headed=false --workers=1

# Sharded CI slice
npx playwright test --headed=false --workers=2 --shard=1/4
```

### Never Use These Commands For Completion

```bash
npx playwright test --headed
npx playwright test --headed=true
npx playwright test --debug
npx playwright test --ui
```

## Governance References

- UI_GOVERNANCE.md
- PHASE_5_RULES.md
- TICKET_TEMPLATE.md
- COMPLETION_CONTRACT_TEMPLATE.md
- COORDINATOR_COMPLETION_EXPECTATIONS.md

## Canonical Config Snippet

Use this as the default enterprise baseline for governed application suites:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
	fullyParallel: true,
	workers: process.env.CI ? 4 : '50%',
	retries: process.env.CI ? 2 : 0,
	use: {
		headless: true,
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'retain-on-failure'
	}
});
```

- Override `workers` to `1` for shared-state suites.
- Use serial mode for test groups that mutate shared state.
- Prefer CI sharding for very large suites.
- Add `maxFailures: 1` when the goal is defect isolation rather than full-suite evidence capture.

## Summary

All Playwright tests used for governed completion must run in headless mode with no manual intervention, and any worker parallelism must preserve deterministic results.
