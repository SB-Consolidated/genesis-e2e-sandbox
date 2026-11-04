# Simple To-Do App

This project ships with a deterministic local quality gate for Phase 5 execution evidence and a supported startup path for local review.

## Local development

Use the single supported startup command:

```bash
npm run dev
```

This starts both services together:

- API: http://127.0.0.1:3000/health
- UI: http://127.0.0.1:5173/

The UI automatically proxies `/api` requests to the local backend, so review and local validation work without manual startup steps.

## Production startup

Use the production path for the built app:

```bash
npm start
```

This runs the build, starts the API, and serves the generated frontend on:

- UI: http://127.0.0.1:4173/
- API: http://127.0.0.1:3000/health

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
