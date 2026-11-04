# Workspace Readiness Report

- Generated At: 2026-11-03T23:40:30.871Z
- Workspace Root: /workspace/genesis-e2e/app
- Ready: NO

## Checks
- genesisExecution: PASS
- repositoryConfig: PASS
- startInstructions: PASS
- workflowDirectory: FAIL
- screenGenerationWorkflow: FAIL
- applicationCiWorkflow: FAIL
- codeowners: FAIL
- reviewsDirectory: PASS
- ticketList: PASS
- revisionsDirectory: PASS
- commercialAccessEvidence: FAIL
- bootstrapManifest: FAIL
- commercialEnvironmentSupported: FAIL
- gitRemote: FAIL
- cleanWorkingTree: FAIL
- repositoryBinding: FAIL
- privateRepoToken: PASS

## Issues
- [BOOTSTRAP_TARGET_MISSING] AGENTS.md: Restore AGENTS.md from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] Genesis Extension v0.9.9: Restore Genesis Extension v0.9.9 from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .github/workflows/genesis-application-ci.yml: Restore .github/workflows/genesis-application-ci.yml from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .github/workflows/screen-generation.yml: Restore .github/workflows/screen-generation.yml from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .github/scripts/screen-build-agent.js: Restore .github/scripts/screen-build-agent.js from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] CODEOWNERS: Restore CODEOWNERS from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .github/CODEOWNERS: Restore .github/CODEOWNERS from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .gitignore: Restore .gitignore from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .githooks/pre-commit: Restore .githooks/pre-commit from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .githooks/genesis-secret-scan.js: Restore .githooks/genesis-secret-scan.js from the governed bootstrap manifest and re-run readiness.
- Git remote origin is not configured.
- [REPOSITORY_MISMATCH] Make the configured GitHub repository match the current git remote origin. Re-validate the repository binding before GitHub-backed operations proceed.
- .github/workflows is missing. Cloud-backed governed workflows are not installed.
- genesis-application-ci.yml is missing from .github/workflows.
- CODEOWNERS is missing from the repository root or .github/CODEOWNERS.

## Warnings
- Genesis Execution/logs/commercial-access/commercial-access.jsonl is missing. Commercial customer and usage evidence will appear after governed commercial flows run.
- [COMMERCIAL_ENVIRONMENT_UNVERIFIED] Configure and validate the GitHub repository binding before paid commercial workflows proceed. Re-run workspace readiness after the repository contract is persisted.
- Working tree is not clean. Cloud workflow preflight will block until changes are committed or stashed.
## Repository Validation
- State: FAIL
- Reason ID: REPOSITORY_MISMATCH
- Repository: SB-Consolidated/genesis-e2e-sandbox
- Visibility: public
- Bound: NO
- Credential Present: NO
- Authenticated: YES
- Repository Accessible: YES
- Required Permissions: repo=YES, workflow=YES
- Remediation: Make the configured GitHub repository match the current git remote origin. Re-validate the repository binding before GitHub-backed operations proceed.

