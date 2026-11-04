# Ticket Lifecycle

**Status:** Authoritative  
**Authority:** Genesis Constitution, Phase 5 Rules

## 1. State Machine

```text
01_DRAFT -> 02_VERIFIED -> 03_EXECUTING -> 04_MERGE_READY -> 05_COMPLETE
```

- `01_DRAFT` is the canonical starting state.
- `00_BACKLOG` is obsolete.
- Folder location defines state.
- A ticket may exist in only one state folder at a time.

## 2. State Ownership

### 01_DRAFT -> 02_VERIFIED
- Actor: Intent Overseer only.
- Preconditions: ticket matches template, scope is clear, success criteria are testable, governance alignment confirmed.

### 02_VERIFIED -> 03_EXECUTING
- Actor: Coordinator-owned transition.
- Mechanism: Coordinator-controlled workflow or governed automation may perform the move.
- Preconditions: authorization written, dependency requirements satisfied, ticket selected for execution.

### 03_EXECUTING -> 04_MERGE_READY
- Actor: Coordinator-owned admission to review lane.
- Mechanism: governed automation may perform the move only after validating the required completion artifact.
- Preconditions: completion contract present, evidence complete, required gates passed.

### 04_MERGE_READY -> 05_COMPLETE
- Actor: Coordinator, acting through the governed ticket-closeout automation. The Coordinator owns the rule and may perform the move manually only under the fallback below.
- Mechanism: the ticket-closeout automation runs when a governed `ticket/TICKET-NNN-*` pull request merges into `main`. It reads every merge fact from the GitHub API and from `main`, never from manual input, and writes only the `04_MERGE_READY -> 05_COMPLETE` rename, the merge-complete evidence in the completion contract, the state-log line, and the ticket's removal from `execution-authorization.json`.
- Preconditions: unchanged (PR merged, required checks passed, remote ticket or hotfix branch deleted unless a documented exception exists, completion contract present, completion recorded), plus the Founder `approved-by-founder` label applied after the latest commit when `Merge eligibility`'s classification rates the merged pull request high risk or the ticket's Self-Change Class (`change_class`), read from the first parent of the squash commit (the base branch immediately before the pull request merged) and never from the pull request head, is governance or bootstrap. Only a pull request that classification rates low, for a ticket whose class is neither governance nor bootstrap, needs no label. A ticket whose class cannot be read counts as governance, including a ticket the pull request itself adds.
- Runtime: the automation must refuse this transition, change no file, and open an issue when any precondition or fact is missing, unreadable, or stale. It is idempotent: it never writes a second log line or evidence block.
- Fallback: after the automation has failed or refused, with the cause recorded in the Action's issue, the Coordinator may close the ticket by a manual closeout pull request (`ticket/TICKET-NNN-closeout`). The first remedy for any refusal is to fix the cause and re-run the Action. That pull request fails `Ticket ID unique` by design, so each use needs a recorded Founder waiver of that one check. `hotfix/*` branches are not closed by the automation.
- Transitional rule: until the automation is enabled, the Coordinator may also close a ticket manually under `ticket/TICKET-NNN-closeout`. "Enabled" means the Enablement Gate in `FOUNDER-DECISION-2026-10-21-002.md` is met and the Founder has set `TICKET_CLOSEOUT_ENABLED` to `true`. Each such manual closeout needs its own recorded Founder waiver of `Ticket ID unique`, decided per use and not given in advance. The transitional period ends when the automation is enabled; from then on only the failed-or-refused fallback above applies. This follows Decision 2 items 2 and 3 of `FOUNDER-DECISION-2026-10-23-001.md`.

## 3. Execution Agent Responsibilities

- Read the authorized ticket.
- Implement only the ticket scope.
- Run required gates.
- Produce completion contract.
- Report blockers using `issue.json`.

Execution Agent does not own lifecycle advancement, even if automation uses Execution Agent output as a trigger.

## 4. Completion Contract

Required path:

`Genesis Execution/tickets/completion-contracts/[TICKET-ID].contract.md`

Required contents:

- ticket ID and title
- branch and commit
- PR reference
- gate results
- success criteria verification
- files impacted
- artifact references
- explicit ready-for-review status marker

## 5. Ticket-State Log

Required path:

`Genesis Execution/tickets/ticket-state.log`

Required entry shape:

```text
[ISO-8601] [TICKET-NNN] OLD_STATE -> NEW_STATE [Actor] Reason
```

Entries written by the ticket-closeout automation use the actor `[Ticket Closeout Automation]` and cite the pull request number, the squash commit SHA, and the merger.

## 6. Issue-Guidance-Retry Loop

### Blocked Execution
- Create `Genesis Execution/issues/[ticket-id].issue.json`.
- Do not create `06_BLOCKED` or a blocker markdown ticket.

### Coordinator Response
- Provide `Genesis Execution/guidance/[ticket-id].guidance.json` for resolvable issues.
- Provide `Genesis Execution/escalation/[ticket-id].escalation.json` when founder input is required.

### Retry
- Resume the same ticket after guidance.
- Preserve retry context and evidence chain.

## 7. HOLD And Re-Review

- HOLD pauses action but does not introduce a new lifecycle state.
- Merge-ready re-review remains within the merge lane.
- Evidence defects may require additional execution work, but governance should preserve the same canonical state model.
