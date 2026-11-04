---
phase: 4
step: 0b
status: complete
created_by: Strategy Agent
created_at: 2026-11-03T23:18:55.364Z
---

# Environment Requirements - Technology Stack Specification

**Project:** Simple To-Do App
**Analysis Date:** 2026-11-03T23:18:55.364Z
**Analyzed By:** Strategy Agent

## 1. Project Summary

**Application Type:** Full-Stack Web App (single-page UI + local Node.js API)

**Platform Targets:**
- [x] Web (Browser)
- [ ] iOS
- [ ] Android
- [ ] Windows Desktop
- [ ] macOS Desktop
- [ ] Linux Desktop

**Key Requirements:**
- Single-page, mobile-friendly task workflow with inline add, complete/reopen, and delete actions.
- No separate add/detail routes; completed tasks must sink below active tasks; delete uses no confirmation.
- Local-first persistence with minimal complexity (JSON file or equivalent), no authentication, no cloud dependencies.

## 2. Frontend Stack

### Framework
**Selected:** Vanilla TypeScript + semantic HTML/CSS (no framework) vN/A
**Justification:** Phase 1 explicitly prefers plain HTML with minimal architecture overhead. Phase 2 screens define a compact single-page interaction model that does not need component-framework complexity.

### Build Tool
**Selected:** Vite v8.3.5
**Justification:** Fast local dev server, straightforward static build pipeline, and strong TypeScript integration while preserving a lightweight frontend.

### UI Component Library (if applicable)
**Selected:** None
**Version:** N/A
**Justification:** The UI scope is intentionally small (input, list rows, checkboxes, delete icon, inline status). Custom semantic markup avoids unnecessary dependency weight.

### State Management
**Selected:** Native browser state + localStorage sync (no external state library)
**Version:** N/A
**Justification:** App state is a single task list with simple ordering rules. External state libraries add complexity without delivering meaningful benefit for this scope.

### Routing
**Selected:** No client router (single route only)
**Version:** N/A
**Justification:** Founder-approved UX removes separate `#/add` and detail routes. A router is unnecessary and would conflict with current screen intent.

## 3. Backend Stack (if applicable)

### Runtime/Framework
**Selected:** Node.js built-in `node:http` server
**Version:** Node.js v24.22.1
**Justification:** Aligns with Phase 1 preference for a simple Node.js HTTP server. Built-in modules keep the stack minimal, auditable, and easy to maintain.

### Database
**Selected:** Local JSON file storage (`data/tasks.json`)
**Version:** N/A
**Justification:** Explicitly matches strategic directive constraints (local persistence, no external DB, single-user local runtime).

### ORM/Database Client
**Selected:** None
**Version:** N/A
**Justification:** JSON file persistence does not require ORM abstraction; direct file I/O is sufficient and simpler.

### API Architecture
**Selected:** REST-style JSON endpoints
**Justification:** Required operations are CRUD-like and map cleanly to small HTTP handlers (`GET/POST/PATCH/DELETE`) without schema-overhead frameworks.

## 4. Authentication & Security

**Selected:** No authentication layer for MVP; security hardening via Helmet v8.3.0 if/when Express middleware is introduced
**Version:** N/A for auth, Helmet v8.3.0 for optional hardening
**Justification:** Phase 1 explicitly excludes user accounts/authentication. Security focus should be input validation, output escaping, safe file writes, and local runtime boundaries.

## 5. Development Tools

### Language
**Selected:** TypeScript v7.0.2
**Justification:** Type safety for task models and API contracts, strong IDE support, and maintainability for governed long-term evolution.

### Package Manager
**Selected:** npm
**Version:** 11.21.1
**Justification:** Native Node ecosystem default, zero extra tooling setup, and reliable CI/CD support.

### Linting & Formatting
**Selected:**
- ESLint v10.14.0
- Prettier v3.9.10
**Justification:** Enforces consistent coding standards and formatting across Strategy-to-Execution handoffs.

### Testing Framework
**Selected:**
- Unit Tests: Vitest v5.1.0
- E2E Tests: Playwright v1.64.1
**Justification:** Vitest is fast and Vite-native for logic coverage; Playwright aligns with governance requirements for deterministic, headless UI validation.

## 6. Deployment & Infrastructure

### Hosting Platform
**Selected:** Local single-machine runtime (no cloud hosting in MVP)
**Justification:** Phase 1 scope is local-only usage with minimal operational overhead and no production cloud mandate.

### CI/CD
**Selected:** GitHub Actions
**Justification:** Direct repository integration, traceable governance evidence, and straightforward automation for lint/test gates.

## 7. Additional Services (if needed)

### File Storage
**Selected:** Local filesystem (`data/tasks.json`)
**Justification:** Matches local-first persistence requirements and avoids cloud service dependencies.

### Email Service
**Selected:** None
**Justification:** No email workflows in Phase 1/2 requirements.

### Analytics
**Selected:** None
**Justification:** No analytics requirements in founder directive; keeping scope narrow reduces privacy and maintenance burden.

## 8. Environment Configuration

### Required Environment Variables
```bash
# Runtime
NODE_ENV=development|production
PORT=3000

# Local persistence
TASKS_FILE_PATH=./data/tasks.json
```

## 9. Initial Dependencies

### package.json (estimated)
```json
{
  "dependencies": {},
  "devDependencies": {
    "typescript": "7.0.2",
    "vite": "8.3.5",
    "eslint": "10.14.0",
    "prettier": "3.9.10",
    "vitest": "5.1.0",
    "@playwright/test": "1.64.1"
  }
}
```

## 10. Technology Stack Summary

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Frontend Framework | Vanilla TypeScript + HTML/CSS | N/A | Single-page UI implementation |
| Build Tool | Vite | 8.3.5 | Development server and bundling |
| Backend | Node.js built-in HTTP server | 24.22.1 | API and local persistence orchestration |
| Database | Local JSON file | N/A | Task persistence |
| Authentication | None (MVP) | N/A | Out of scope per founder directive |
| Testing | Vitest + Playwright | 5.1.0 + 1.64.1 | Unit and E2E quality validation |
| Deployment | Local runtime + GitHub Actions CI | N/A | Local operation and automated checks |

## 11. Compatibility Verification

- [✅] All tools compatible with each other
- [✅] All versions are current/supported (Jan 2026)
- [✅] Stack aligns with project requirements from Phase 1-2
- [✅] Stack is production-ready (no experimental features)
- [✅] Stack supports team size and expertise level

Compatibility notes:
- Vite v8.3.5, Vitest v5.1.0, and TypeScript v7.0.2 are aligned for modern ESM-first workflows.
- Playwright v1.64.1 supports deterministic headless execution required by governance.
- Node.js v24.22.1 + npm 11.21.1 supports the selected toolchain and local server model.
- No router/state/UI framework dependencies are needed due to single-page, low-complexity UX scope.

## 12. Next Steps Authorization

✅ **APPROVED** - Technology stack analysis complete.

**Ready for Phase 4 Step 0c:** Detailed Configuration Generation

The following will be auto-generated based on this specification:
- package.json with exact dependencies
- tsconfig.json for TypeScript
- .env.example with required variables
- Configuration files for chosen tools


---
## Approval
- **Status:** LOCKED
- **Locked By:** Founder
- **Locked At:** 2026-11-03T23:22:30.756Z
- **Locked Phase:** Phase 4 - Environment Setup
---
