# START_EVERYTHING

Workspace: strategic-directive-simple-to-do-app

## Readiness
- Confirm Genesis Execution/config/repository.json is present and validated.
- Confirm .github/workflows/genesis-application-ci.yml is installed.
- Confirm .github/workflows/screen-generation.yml is installed.
- Confirm .github/scripts/screen-build-agent.js is installed.
- Confirm CODEOWNERS and .github/CODEOWNERS are present.
- Confirm .gitignore holds the Genesis hygiene patterns and git uses .githooks (core.hooksPath) for the Genesis secret scan.
- Confirm Genesis Extension v0.9.9/ is installed.

## Startup
- Start the generated application using the framework-specific command defined for the target repository.
- Re-run workspace readiness after bootstrap changes or dependency updates.
