````markdown
# Genesis Bootstrap System — Authoritative

## Overview

The Genesis bootstrap system ensures deterministic first-run initialization from a clean state. It eliminates hidden setup steps, prevents incorrect partial setups, and guarantees that "System Ready" actually means ready.

## Repository Structure

Genesis projects maintain a clear separation between governance and project content:

```
project-root/
├── Genesis Execution/                          # Governance control plane (documents only)
│   ├── governance/                    # All governance documents and versions
│   │   ├── versions/                  # Versioned governance document sets
│   │   │   └── genesis-v0.9/          # Current governance version
│   │   ├── overrides/                 # Governance amendments and overrides
│   │   │   └── amendments.log.md      # Audit trail of governance changes
│   │   ├── active.json                # Currently active governance version reference
│   │   └── execution-authorization.json  # Execution authorization state tracking
│   └── bootstrap/                     # Bootstrap initialization tracking
│       └── state.json                 # Bootstrap completion state
│
├── [ProjectName]/                     # All project-specific content
│   ├── Genesis Execution/             # Governance execution artifacts
│   │   ├── governance/                # Execution governance files
│   │   │   └── execution-authorization.json  # Current execution authorization
│   │   ├── tickets/                   # Work tickets managed through lifecycle
│   │   │   ├── 01_DRAFT/              # Newly created tickets awaiting validation
│   │   │   ├── 02_VERIFIED/           # Intent Overseer approved tickets
│   │   │   ├── 03_EXECUTING/          # Tickets currently being worked on
│   │   │   ├── 04_MERGE_READY/        # Completed work pending PR merge
│   │   │   └── 05_COMPLETE/           # Fully completed and merged tickets
│   │   ├── issues/                    # Execution Agent blocker reports (v0.9.5)
│   │   ├── guidance/                  # Coordinator guidance responses (v0.9.5)
│   │   ├── escalation/                # Coordinator escalations to Founder (v0.9.5)
│   │   ├── handoffs/                  # Validation handoff documents
│   │   │   ├── validation-approved/   # All tickets approved handoffs
│   │   │   ├── validation-partial/    # Partial approval handoffs
│   │   │   ├── validation-rework/     # All rework required handoffs
│   │   │   └── phase-gates/           # Phase transition gate handoffs
│   │   ├── contracts/                 # Execution contracts and commitments
│   │   │   └── completion/            # Completion contracts with evidence
│   │   ├── packets/                   # Work packet definitions and bundling
│   │   ├── logs/                      # Execution logs and audit trails
│   │   │   ├── blockers/              # Blocker escalation documents (deprecated v0.9.5)
│   │   │   ├── ticket-state.log       # Ticket state transitions
│   │   │   ├── decision.log           # Coordinator decisions
│   │   │   └── governance-events.log  # Governance events
│   │   └── cache/                     # Temporary execution cache data
│   │
│   ├── docs/                          # Project documentation
│   │   ├── strategic/                 # Strategic directives and founder intent (Phase 1)
│   │   ├── architecture/              # Architecture decisions and diagrams
│   │   ├── api/                       # API documentation
│   │   ├── user-guides/               # End-user documentation
│   │   └── deployment/                # Deployment guides and procedures
│   │
│   ├── Genesis Execution/             # Governance execution and specs (continued below)
│   │   └── specs/                     # All project specifications (Phase 2 outputs - in-process)
│   │       ├── UX Screens/            # Screen designs and wireframes (founder-designed)
│   │       ├── UX Specs/              # UI/UX specifications and requirements
│   │       ├── Application Specs/     # Application-level specifications (Phase 1 directives)
│   │       ├── technical/             # Technical specifications and requirements
│   │       ├── api/                   # API specifications (OpenAPI, GraphQL schemas)
│   │       └── architecture/          # System architecture specifications
│   │
│   ├── design/                        # Design assets (Figma exports, design tokens, etc.)
│   ├── src/                           # Application source code
│   ├── tests/                         # Application tests (unit, integration, e2e)
│   ├── scripts/                       # Build, deployment, and utility scripts
│   ├── config/                        # Environment configuration files
│   └── assets/                        # Static assets (images, fonts, styles)
│
├── .github/                           # GitHub workflows and actions (optional)
└── README.md                          # Repository root documentation
```

## Bootstrap Start Definition
Bootstrap begins when the repository lacks minimum governance artifacts or deterministic startup validation. Indicators:
- `Genesis Execution/bootstrap/state.json` absent or not `status: "complete"`
- Required governance set under `governance/genesis-v0.9/` missing
- Project directory structure not initialized
- Startup contract not present or not referenced by orchestrator

## Non-Relaxable Constraints
Bootstrap does not relax governance:
- Constitution and Amendments remain binding
- Operating Standards and Gates remain binding
- Standardized halt semantics apply: contradictions trigger Authorized-but-Paused at Ticket-Level (default)

## Exit Criteria
Bootstrap exits when all are true:
- `Genesis Execution/bootstrap/state.json` exists with `status: "complete"` and required steps verified
- `governance/genesis-v0.6A/` contains the indexed documents in GOVERNANCE_INDEX.md
- `scripts/start-everything.ps1` references `Genesis Execution/start-everything.contract.json`
- `npm run start:check` passes cleanly on local environment

## Bootstrap State Model

Bootstrap state is tracked in `Genesis Execution/bootstrap/state.json`:

```json
{
  "status": "complete",
  "completedAt": "2025-12-22T00:00:00Z",
  "steps": {
    "repositoryVerified": true,
    "genesisStructureCreated": true,
    "specInitialized": true,
    "toolingVerified": true
  },
  "version": "1.0.0"
}
```

### Status Values

- **`not-started`**: No bootstrap state file exists
- **`in-progress`**: Bootstrap is running but not complete
- **`complete`**: All bootstrap steps successful, system ready

### Required Steps

1. **Repository Verified**: Confirms git repository exists and is functional
2. **Genesis Structure Created**: All `Genesis Execution/` directories present
3. **Spec Initialized**: `spec.json` created with valid defaults
4. **Tooling Verified**: Node.js, npm, and git available (ollama optional)

## First-Run Experience

### One-Command Bootstrap

```bash
npm run genesis:init
```

This command:
1. Checks if already bootstrapped (exits early if `-Force` not passed)
2. Verifies git repository exists
3. Creates required `Genesis Execution/` directory structure
4. Initializes `spec.json` with defaults
5. Verifies required tooling (node, npm, git)
6. Persists bootstrap state to `Genesis Execution/bootstrap/state.json`
7. Marks bootstrap as `complete`

### Bootstrap Gate

The `bootstrap-gate.ps1` preflight check:
- **PASS**: Bootstrap status is `complete` and all required steps verified
- **FAIL**: No bootstrap state, incomplete, or corrupted state file

When failing, provides explicit remediation:

```
FAIL: Bootstrap not complete
Run the following command to initialize Genesis:
  npm run genesis:init
```

## UI Integration

### SystemStatus Component

Detects bootstrap state on mount:
- **Bootstrap Required**: Shows error state, blocks system ready
- **Bootstrap Complete**: Shows gate count and system health

### Dashboard Screen

When bootstrap incomplete:
- Displays "Bootstrap Required" section
- Shows ordered bootstrap steps
- Provides copy-only `npm run genesis:init` command
- Explains what bootstrap accomplishes

## Governance Guarantees

- **No Silent Failures**: Bootstrap failures are explicit and surfaced in UI
- **No Implicit State**: All state creation is auditable
- **No Background Auto-Setup**: User must explicitly run `npm run genesis:init`
- **No Partial States**: Bootstrap is atomic - either complete or incomplete
- **Blocking by Design**: Preflight fails until bootstrap complete

## v0.9.5: Automated Environment Setup

### EnvironmentSetupService

**Purpose:** Automates Phase 4 environment setup with repository validation and connection establishment, reducing manual configuration errors.

**Activation:** User clicks "🚀 Start Environment Setup" button on Phase 4 Step 0 in Phase Workflow UI.

**Setup Workflow:**

**Step 0a-1: Repository Information Prompt**
- Opens Custom Agent with pre-filled prompt requesting repository details:
  - Repository owner (GitHub username or organization)
  - Repository name
  - Repository visibility (public/private)
- Strategy Agent provides information from Phase 1 directive
- User confirms or corrects information

**Step 0a-2: Repository Validation**
- Extension validates repository accessibility:
  - Checks GitHub authentication token (prompts if missing)
  - Verifies repository exists and is accessible
  - Tests read/write permissions
  - Validates branch access

**Success Path:**
- Stores repository connection details in workspace state
- Creates Phase 4 setup complete marker
- Proceeds to next phase

**Escalation Path:**
- If repository not accessible or authentication fails:
  - Creates `REPOSITORY_CONNECTION_BLOCKED.md` in `Genesis Execution/escalation/`
  - Escalation contains: error details, required actions, resolution steps
  - Founder dialog appears with escalation details
  - User resolves issue (adds token, fixes permissions, etc.)
  - Retry validation after resolution

**Directory Structure Created:**
- `Genesis Execution/escalation/` - For environment setup escalations
- All Phase 5 directories (if not already present):
  - `issues/`, `guidance/`, `tickets/completion-contracts/`, etc.

**Benefits:**
- ✅ Automated repository validation (vs. manual connection testing)
- ✅ Clear error messages (specific resolution steps)
- ✅ Escalation protocol (structured problem reporting)
- ✅ Token management (secure storage and reuse)
- ✅ Early problem detection (before Phase 5 execution begins)

## Re-Bootstrap

If bootstrap state is corrupted or structure is damaged:

```bash
npm run genesis:init -Force
```

This re-runs all steps and overwrites existing bootstrap state.

## Windows-First Design

- PowerShell scripts for all bootstrap operations
- `ExecutionPolicy Bypass` for script execution
- Proper path handling with backslashes
- Error messages formatted for Windows terminals

## Verification Commands

```bash
# Check bootstrap status
Get-Content Genesis Execution/bootstrap/state.json | ConvertFrom-Json

# Verify all gates (including bootstrap-gate)
npm run preflight

# Test first-run experience
Remove-Item -Recurse -Force Genesis Execution/bootstrap
npm run genesis:init
npm run preflight
```

## Exit Codes

- **0**: Bootstrap complete, all checks pass
- **1**: Bootstrap failed or incomplete, remediation required

## Learning LRN/0008

**Bootstrap State Must Be Explicit and Auditable**

Implicit state creation (auto-setup, background initialization) creates governance gaps. Explicit bootstrap:
- Makes setup steps visible
- Enables audit trail
- Prevents race conditions
- Allows deterministic testing
- Ensures reproducible environments

Genesis bootstrap is a one-time, explicit, auditable operation that must complete before the system can operate.

````