```markdown
# Tool Intelligence Gate (Governance Protocol)

**Status:** Active Protocol (Installation-Scoped)  
**Authority:** Genesis Foundational Constitution

## Purpose
Ensure Genesis aligns with current capabilities, constraints, and recommended patterns of tools in use. Findings are snapshots tied to the installation date and MUST be refreshed when triggers occur.

## Triggers
- Project bootstrap
- New tool introduced
- Major tool version change
- Repeated unexplained failures in a tool domain

## Required Steps (Do Not Skip)
1. For each tool:
   - Visit https://context7.com/
   - Review latest capabilities, limitations, recommended patterns
   - Identify:
     - Deprecated/discouraged practices
     - Newly recommended approaches
     - Known failure modes or setup traps
2. Compare against Genesis assumptions and implementation.
3. Produce a structured per-tool summary:
   - Tool name + version context
   - Key findings (Context7 + official docs)
   - Alignment status: Aligned / Requires adjustment / Requires new governance rule
   - Concrete actions
4. Persist results:
   - Create a snapshot in `docs/tooling/TOOL_SNAPSHOT_<YYYY-MM-DD>.md`
   - Update `docs/LEARNING_LOG.md` with: gate executed, snapshot filename, actions taken, open governance rules

## Evidence & Blocking Rule
- Evidence: Snapshot file + Learning Log entry.
- Blocking: If gate is triggered and no current snapshot exists (or is stale), implementation is blocked until refreshed.

## Persistence Model
- Findings are NOT evergreen truth.
- Findings are INSTALLATION-SCOPED and TIME-STAMPED.
- Snapshots must be refreshed when triggers occur.

## References
- Context7: https://context7.com/
- React: https://react.dev/
- React Router: https://reactrouter.com/
- Vite: https://vitejs.dev/
- Playwright: https://playwright.dev/
- GitHub Copilot: https://github.com/features/copilot
```