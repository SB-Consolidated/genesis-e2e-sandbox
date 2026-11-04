# Workspace Readiness Report

- Generated At: 2026-11-04T01:44:36.411Z
- Workspace Root: /workspace/genesis-e2e/app
- Ready: NO

## Checks
- genesisExecution: PASS
- repositoryConfig: PASS
- startInstructions: PASS
- workflowDirectory: PASS
- screenGenerationWorkflow: FAIL
- applicationCiWorkflow: PASS
- codeowners: FAIL
- reviewsDirectory: PASS
- ticketList: PASS
- revisionsDirectory: PASS
- commercialAccessEvidence: PASS
- bootstrapManifest: FAIL
- commercialEnvironmentSupported: FAIL
- gitRemote: PASS
- cleanWorkingTree: FAIL
- repositoryBinding: PASS
- privateRepoToken: PASS

## Issues
- [BOOTSTRAP_TARGET_MISSING] AGENTS.md: Restore AGENTS.md from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] Genesis Extension v0.9.9: Restore Genesis Extension v0.9.9 from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_HASH_MISMATCH] .github/workflows/genesis-application-ci.yml: Restore .github/workflows/genesis-application-ci.yml to the governed template content or intentionally preserve it as a tracked customer override.
- [BOOTSTRAP_TARGET_MISSING] .github/workflows/screen-generation.yml: Restore .github/workflows/screen-generation.yml from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .github/scripts/screen-build-agent.js: Restore .github/scripts/screen-build-agent.js from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] CODEOWNERS: Restore CODEOWNERS from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .github/CODEOWNERS: Restore .github/CODEOWNERS from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .gitignore: Restore .gitignore from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .githooks/pre-commit: Restore .githooks/pre-commit from the governed bootstrap manifest and re-run readiness.
- [BOOTSTRAP_TARGET_MISSING] .githooks/genesis-secret-scan.js: Restore .githooks/genesis-secret-scan.js from the governed bootstrap manifest and re-run readiness.
- CODEOWNERS is missing from the repository root or .github/CODEOWNERS.

## Warnings
- [COMMERCIAL_ENVIRONMENT_UNVERIFIED] Configure and validate the GitHub repository binding before paid commercial workflows proceed. Re-run workspace readiness after the repository contract is persisted.
- Working tree is not clean. Cloud workflow preflight will block until changes are committed or stashed.
## Repository Validation
- State: PASS
- Reason ID: PUBLIC_REPOSITORY_VALIDATED
- Repository: SB-Consolidated/genesis-e2e-sandbox
- Visibility: public
- Bound: YES
- Credential Present: NO
- Authenticated: YES
- Repository Accessible: YES
- Required Permissions: repo=YES, workflow=YES
- Remediation: None

