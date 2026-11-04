# Phase 7: Release

**Version:** v0.9.9

## Purpose

Phase 7 performs release actions only after founder approval.

## Rules

- Release follows successful Phase 6 founder approval.
- No new implementation scope is introduced in Phase 7.
- Release evidence must reference the completed governed ticket and review trail.
- Each release becomes the operational baseline for subsequent enterprise maintenance and future governed change.
- Post-release defects, enhancement requests, compliance changes, and scale-driven changes must start a new governed cycle rather than modifying production scope informally.
- Release records should preserve version context, support impact, rollback posture, and links to the tickets and revision specs that produced the released baseline.
- Track B releases promote the immutable artifact or tag built from `main`. Recompiling between environments is forbidden.
- Rollback redeploys the previous artifact or tag. It does not rebuild from mixed local state.
- Track A releases package from a `main` SHA after required extension CI has passed.
