```markdown
# Genesis Governance Gates — Authoritative

## Overview

Governance gates are modular, executable checks that enforce Genesis quality standards at key workflow points. Gates run via `npm run start:check` or `scripts/start-check.ps1`.

**Philosophy:** Gates are **hard blocks**—they must pass before work proceeds. This ensures correctness over speed and prevents "incomplete ticket" drift.

---

## Gate Categories

### 1. **Repository Hygiene Gates** (Always Active)

#### Start Everything Gate
- **When:** On every preflight run
- **Validates:** Startup contract exists, is valid, and environment satisfies declared tool version ranges; orchestrator loads the contract
- **Script:** `scripts/preflight/start-everything-gate.ps1`
- **Evidence Required:**
  - `Genesis Execution/start-everything.contract.json` present and valid
  - `start-everything.ps1` references the contract file
  - Tool version ranges satisfied (node, npm, git; gh optional)
- **Remediation:** `npm run start:everything:update`

#### Bootstrap Gate
- **When:** Before any operation, on every preflight run
- **Validates:** Genesis first-run initialization is complete
- **Script:** `scripts/preflight/bootstrap-gate.ps1`
- **Evidence Required:**
  - `Genesis Execution/bootstrap/state.json` exists with `status: "complete"`
  - All required bootstrap steps verified: `repositoryVerified`, `genesisStructureCreated`, `specInitialized`, `toolingVerified`
  - Critical `Genesis Execution/` directories present: specs, artifacts, contracts, config
- **Remediation:** `npm run genesis:init`
- **Philosophy:** No operation can proceed until Genesis is properly initialized. This prevents partial setups and hidden configuration drift.

#### Clean Tree Gate
- **When:** Before any PR merge, before declaring ticket complete
- **Validates:** No build artifacts, node_modules, or sensitive files tracked in git
- **Script:** `scripts/preflight/clean-tree-gate.ps1`
- **Evidence Required:** Clean `git status` output (only source files tracked)

#### Repo Readiness Gate
- **When:** Bootstrap, major version upgrades
- **Validates:** Required governance documents exist in declared governance directory
- **Script:** `scripts/preflight/repo-readiness-gate.ps1`
- **Evidence Required:** Presence of constitution, operating standards, role model, decision protocol, gates, and templates

#### Startup Contract Gate (OPS-0004)
- **When:** On first run and preflight, before any work proceeds
- **Validates:**
  - Repo settings: `allow_auto_merge` enabled, branch protection present on `main`, required approving reviews per track (Track A: 0 now, target 1 from an automation identity; Track B: minimum 1)
  - PR policy: Auto-merge REQUIRED for PRs targeting `main`
  - Local environment: Node/npm available; `Genesis Execution/bootstrap/state.json` complete
- **Script:** `scripts/preflight/start-check.ps1` (startup checks section)
- **Evidence Required:**
  - `gh api repos/<owner>/<repo>` shows `allow_auto_merge: true`
  - `gh api repos/<owner>/<repo>/branches/main/protection` returns protection config; `required_pull_request_reviews.required_approving_review_count` is 0 for Track A and `>= 1` for Track B
  - `node --version` and `npm --version` succeed
  - `Genesis Execution/bootstrap/state.json` has `status: "complete"`
- **Failure Output:** Explicit remediation to enable auto-merge and configure branch protection (and, for Track B, require 1 review); install Node/npm; run `npm run genesis:init`

#### Min-Approving-Review-Required Gate (Governance-Mandatory)
- **When:** On preflight runs; validated as part of startup contract gate
- **Validates:**
  - Track A: branch protection on main requires 0 approving reviews now. The future target is 1 approving review issued by an automation identity. The identity is not defined, and adopting the target needs a later governance amendment. The Founder label governs high-risk pull requests (see `PR_MERGE_POLICY.md`).
  - Track B: branch protection on main requires minimum 1 approving review before merge (unchanged).
- **Script:** `scripts/preflight/start-check.ps1` (startup-contract section)
- **Evidence Required:**
  - `gh api repos/[OWNER]/[REPO]/branches/main/protection` returns `required_pull_request_reviews.required_approving_review_count` equal to 0 (Track A) or `>= 1` (Track B)
- **Failure Output:** Track B: "Branch protection on main does not require ≥1 approving review. Update protection via GH CLI to set `required_approving_review_count: 1`". Track A: report any value other than 0 until the automation-identity amendment exists.
- **Philosophy:** Track B: auto-merge without review creates governance gaps. Minimum one approval ensures governance review occurs before auto-merge proceeds. Approving review is issued by an approved automation identity. Track A: review is risk-tiered; low-risk pull requests need no review and high-risk pull requests need the Founder label, which is the recorded Founder approval.

#### Branch Naming Validation Gate (Governance-Mandatory)
- **When:** Before merging any PR to main
- **Validates:** PR head branch matches canonical branching model: `ticket/TICKET-NNN-short-slug` or `hotfix/TICKET-NNN-short-slug`
  - Ticket ID: `TICKET-NNN`
  - short-slug: optional lowercase hyphenated slug
- **Script:** `scripts/preflight/branch-naming-validation-gate.ps1`
- **Evidence Required:**
  - PR head branch name matches pattern: `^(ticket|hotfix)/TICKET-\d{3}(-[a-z0-9]+)*$`
  - No `chore/`, `feature/`, `bugfix/`, `backup/`, or other non-compliant prefixes
- **Failure Remediation:**
  - Close non-compliant PR
  - Create new branch with correct naming from main
  - Cherry-pick required commits
  - Open new PR from compliant branch
  - See Ticket Template and Governance Gates for complete procedure

---

### 2. **Tool Intelligence Gate** (Installation-Scoped)

#### Tool Snapshot Gate
- **When:** Bootstrap, environment changes, quarterly refresh
- **Validates:** Tool versions are captured in `tooling/TOOL_SNAPSHOT_<date>.md`
- **Script:** `scripts/preflight/tool-intelligence-gate.ps1`
- **Evidence Required:**
  - Snapshot file exists with current date (or within 90 days for existing installations)
  - Node, npm, git, gh CLI versions documented
  - Learning log references the snapshot filename (not version numbers directly)

**Critical Rule:** Learning logs must NEVER embed "latest" tool versions as permanent truth. They reference the snapshot file, which is installation-scoped and refreshable.

---

### 3. **Completion Contract Gate** (Ticket Workflows)

#### Ticket Structure Gate (GOV-0010)
- **When:** On ticket creation, before implementation begins
- **Validates:**
  - Ticket matches canonical [TICKET_TEMPLATE.md](TICKET_TEMPLATE.md) structure
  - All mandatory sections present (Objective, Scope, Success Criteria, etc.)
  - Auto-merge requirement is explicit: PRs to `main` MUST enable auto-merge
  - Completion Contract section exists (will be filled at completion)
  - No placeholder or informal ticket descriptions
- **Script:** `scripts/preflight/ticket-structure-gate.ps1`
- **Evidence Required:** Valid ticket document matching template
- **Failure Output:** Lists missing sections and structural violations

**Philosophy:** Correct ticket structure precedes implementation. Governance is not optional.

#### Ticket Completion Gate
- **When:** Before declaring ticket complete
- **Validates:**
  - Branch exists and pushed to origin
  - PR created with proper title/description
  - No merge conflicts
  - All preflight gates pass on branch
  - Completion contract generated with verification evidence
  - Auto-merge enabled on PR to `main` (manual merge is exception-only and requires user approval)
- **Script:** `scripts/preflight/completion-contract-gate.ps1`
- **Evidence Required:** Completion contract markdown with:
  - Branch name
  - PR number
  - Gate pass results
  - Auto-merge status (ENABLED required)
  - Automerge confirmation

#### Auto-Merge Required Gate (GOV-0002)
- **When:** On PRs targeting `main`, before merge
- **Validates:** GitHub auto-merge is enabled on the PR (auto-merge request present)
- **Script:** `scripts/preflight/auto-merge-required-gate.ps1` (enforced via `start:check`)
- **Evidence Required:** `gh pr view --json autoMergeRequest` returns a non-null value
- **Failure Output:** Actionable remediation to enable auto-merge via GH CLI

**Track A scope:** auto-merge is enabled on all pull requests to `main`. For a high-risk pull request, the `Merge eligibility` check holds the merge until the Founder applies the `approved-by-founder` label, so enabling auto-merge does not bypass Founder approval. For a pull request whose ticket class is `governance` or `bootstrap`, request auto-merge only after the Founder has approved it (see `PR_MERGE_POLICY.md`).

#### Track A Merge Eligibility And Ticket ID Gates
- **When:** On every Track A pull request to `main`
- **Validates:**
  - `Merge eligibility`: classifies the pull request as low or high risk from its changed files and, for high risk, requires the `approved-by-founder` label applied by a Founder login after the latest commit. Unknown inputs fail closed as high risk.
  - `Ticket ID unique`: a `ticket/*` or `hotfix/*` branch must not reuse a `TICKET-NNN` that is already completed or already has artifacts on `main` that the pull request does not update.
- **Scripts:** `.github/scripts/pr-gates.js`, `.github/workflows/merge-eligibility.yml`, `.github/workflows/ticket-id-unique.yml`
- **Evidence Required:** Both checks report success on the pull request.

**Philosophy:** Deterministic merges through governed auto-merge eliminate ambiguity and ensure standard execution.

**Failure Mode Prevented:** "Ticket marked done but branch not merged" syndrome

#### Ticket Language Gate (OPS-0026)
- **When:** On ticket branches (`ticket/<ID>-<short-name>`), enforces state-based completion language
- **Validates:**
  - Completion Contract contains `Ticket State:` field with valid lifecycle state
  - Blocks completion language (`complete`, `done`, `finished`, `verified`, `merged`, `all gates passing`) until state = `MERGE_READY`
  - Enforces strict lifecycle progression: `DRAFT` → `EXECUTING` → `VERIFYING` → `MERGE_READY` → `MERGED`
- **Script:** `scripts/preflight/ticket-language-gate.ps1`
- **Evidence Required:** Ticket State field in completion contract matching work phase
- **Failure Output:** Lists forbidden terms found and remediation (update state or remove language)
- **Lifecycle States:**
  - `DRAFT`: Initial planning, no implementation yet
  - `EXECUTING`: Active code changes in progress
  - `VERIFYING`: Implementation complete, running preflight and validation
  - `MERGE_READY`: All gates pass, ready for merge (completion language permitted)
  - `MERGED`: PR merged to main, post-merge verification complete

**Philosophy:** Prevents "all gates passing" claims before work is actually complete. Temporal correctness enforced via explicit state transitions.

#### Ticket Lifecycle Enforcement Gate (OPS-0006)
- **When:** On ticket branches (`ticket/<ID>-<short-name>`), before declaring done
- **Validates:**
  - Branch naming convention is followed
  - Canonical Completion Contract path exists: `Genesis Execution/tickets/completion-contracts/<TICKET-ID>.contract.md`
  - Required fields present: Branch, Commit, PR, Base Branch, Merge Status
  - Auto-merge declaration: `ENABLED` or `NOT ENABLED` (with rationale)
  - PR existence verified via `gh pr view` (fallback to format validation)
  - No banned "optional" language present (central list in `scripts/governance/banned-optional-phrases.txt`)
  - If `MERGED`, post-merge verification evidence present (`Pulled latest main`, `Re-ran preflight on main`)
- **Script:** `scripts/preflight/ticket-lifecycle-gate.ps1`
- **Evidence Required:** Canonical contract file with all fields and no banned language
- **Failure Output:** Actionable remediation text with exact missing fields or violations

---

### 4. **UI Gates** (Optional—Only for Repos with UI)

#### Renderer Smoke Gate (Fast)
- **When:** Any UI-affecting change, local preflight, and CI
- **Validates:** UI renderer surfaces real content (no placeholders) via vitest/jsdom
- **Script:** `scripts/preflight/ui-gate.ps1`
- **Evidence Required:** Passing `npm run genesis:test`

#### Runtime Render & Console Cleanliness Gate
- **When:** Any ticket touching UI code (`ui/src/pages/*`, routing, navigation, shared layouts)
- **Validates:**
  - No uncaught exceptions during rendering (pageerror events)
  - No console.error calls during Playwright execution
  - Known-instability warnings (duplicate keys, hydration mismatches) are blocked unless explicitly waived
- **Motivation:** Ticket [BUG-INTENT-RUNTIME-CRASH-001](https://github.com/SB-Consolidated/Genesis-v0.4/pull/13) demonstrated production crashes can slip through without console enforcement. This gate codifies zero-tolerance for runtime instability.
- **Script:** Test harness at `ui/tests/setup.ts` extends Playwright with automatic console detection
- **Blocking Criteria:**
  - **Runtime Render (MANDATORY):** ANY `pageerror` (uncaught exception) during Playwright execution → TEST FAILS → TICKET BLOCKED
  - **Console Cleanliness (MANDATORY):** ANY `console.error` during Playwright execution → TEST FAILS → TICKET BLOCKED
  - **Console Warnings (CONDITIONAL):** `console.warn` allowed ONLY if not a known-instability class OR explicitly waived by founder
  - **Known-Instability Warnings (BLOCKING unless waived):**
    - Duplicate React key warnings ("Encountered two children with the same key...")
    - Hydration mismatch warnings (SSR/client inconsistency)
    - React hook order warnings ("Rendered more hooks than during the previous render")
    - Any warning indicating unstable UI identity or non-deterministic rendering
  - **Smoke Coverage Requirement (MANDATORY for screen-touching tickets):**
    - Playwright smoke test MUST cover: app load, navigation to impacted screen(s), assertion that screen renders (stable selector), verification no console errors/pageerrors occurred
    - Non-waivable (except by explicit founder approval)
- **Waiver Policy:**
  - Console warnings in known-instability class require founder approval to merge
  - Waiver documentation MUST include: exact warning string/pattern, root cause analysis, why immediate fix is not viable, mitigation plan with timeline, approval statement from founder
  - Waivers recorded in Completion Contract and tracked for follow-up remediation
- **Evidence Required:** Passing `npm run ui:test:smoke` and `npm run ui:test` with no console errors or pageerrors
- **Blocking:** Yes—if ANY criterion fails without approved waiver, ticket is blocked
- **Post-Merge Enforcement:** Any merged ticket introducing console errors/pageerrors triggers immediate hotfix ticket with priority escalation

#### E2E Correctness Gate (Playwright)
- **When:** PR contains UI changes, before release; part of standard preflight
- **Validates:**
  - Playwright E2E tests pass in headless mode
  - Electron app launches and navigation works (2+ page transitions)
  - Persisted content from Genesis Execution/specs/ loads and renders correctly
  - Founder chat and spec preview display seeded fixture content
  - No forbidden UI markers ("placeholder", "TODO", "coming soon", etc.) in rendered content
  - Stable selectors (data-testid) used for navigation and content validation
  - Console cleanliness enforced via `ui/tests/setup.ts`
**Key Properties:**
- Fixtures stored in `tests/fixtures/genesis-specs/` with seeded chat, spec.md, and spec.json
- Backup/restore of existing Genesis Execution/specs/ during test execution (safe for CI)
- Runs in <5 minutes on typical dev machine
- Timeout per test: 60 seconds; per assertion: 5 seconds

**Enable/Disable:**
- E2E gate runs automatically when Playwright is installed and gate script present
- Disable by removing `scripts/preflight/e2e-gate.ps1` (optional)
- Can be skipped locally with: `npm run e2e` (run directly without preflight)

**Snapshot Documentation:**
- See Playwright Installation Snapshot for version information and driver compatibility
---

### 2.6 **LLM Source-of-Truth Gate** (GOV-OPENAI-DOCS-SOURCE-001)

**Purpose:** Ensure all LLM-related development aligns with official OpenAI Platform documentation

- **When:** Before merge of any PR containing LLM integration or OpenAI API usage
- **Validates:**
  - All OpenAI API calls cite authoritative documentation
  - No disallowed sources (marketing pages, third-party tutorials, inferred behavior)
  - Parameters match current API reference specifications
  - Models used are not deprecated
  - Ticket includes explicit documentation citations
- **Script:** Manual verification during PR review (automated checks in future governance tooling)
- **Evidence Required:**
  - Direct links to https://platform.openai.com/docs/api-reference/* in ticket/PR description
  - Code comments citing specific API reference sections
  - Confirmation that documentation checked within 7 days of implementation
  - Model selection justified with citation from https://platform.openai.com/docs/models
- **Failure Conditions:**
  - Use of undocumented parameters
  - Reliance on deprecated endpoints
  - Citations to disallowed sources (openai.com/api/, blogs, Stack Overflow)
  - Inferred API behavior without official documentation
- **Remediation:** Update code to align with authoritative docs; add proper citations; remove deprecated usage
- **Authority:** GOVERNANCE_LLM_SOURCES.md (authoritative source registry)
- **Compliance Level:** BLOCKING — no waivers without founder approval

**Authoritative Sources (MANDATORY):**
1. https://platform.openai.com/docs/api-reference/introduction
2. https://platform.openai.com/docs/overview
3. https://platform.openai.com/docs/quickstart
4. https://platform.openai.com/docs/api-reference/chat
5. https://platform.openai.com/docs/models

**See:** GOVERNANCE_LLM_SOURCES.md for complete enforcement rules and exception process
```