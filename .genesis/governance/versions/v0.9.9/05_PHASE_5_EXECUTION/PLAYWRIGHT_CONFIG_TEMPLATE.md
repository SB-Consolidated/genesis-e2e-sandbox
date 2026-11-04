# Playwright Config Template

**Version:** v0.9.7  
**Status:** Recommended Baseline

## Purpose

This template provides a governed default `playwright.config.ts` baseline for enterprise projects created or managed under Genesis governance.

## Baseline Template

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  workers: process.env.CI ? 4 : '50%',
  retries: process.env.CI ? 2 : 0,
  maxFailures: 1,
  reporter: process.env.CI ? [['html'], ['list']] : [['list']],
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});
```

## Governance Notes

- During defect isolation, prefer `workers: 1`, `retries: 0`, and `maxFailures: 1` until the first real failure is fixed.
- Reduce `workers` to `1` for shared-state suites.
- Use Playwright serial mode for tests that depend on ordering or shared mutable environments.
- Keep `headless: true` for all governed completion evidence.
- Pair worker parallelism with CI sharding when the suite becomes large enough to threaten merge feedback time.
- Do not rerun the full suite until the failing spec or failing grep target has passed locally.