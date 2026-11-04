# Simple To-Do App

This project ships with a deterministic local quality gate for Phase 5 execution evidence.

## Local gate

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm test
npm run ui:e2e
```

For the single-command sequence used in CI and local preflight:

```bash
npm run quality
```

## CI checks

The GitHub Actions workflow runs the same gate sequence on pull requests and pushes to `main`, and it fails if any command exits non-zero.

## Notes

- `npm run ui:e2e` runs in headless Playwright mode by default.
- The app remains intentionally scoped to the MVP task list and does not add feature work beyond the quality gate and execution process.
