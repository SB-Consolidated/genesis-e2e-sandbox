```markdown
# Genesis Foundational Constitution — Amendments

**Status:** Binding Amendment to Genesis Foundational Constitution  
**Purpose:** Incorporate real-world execution learnings into enforceable governance, operating standards, and escalation rules. These amendments refine how Genesis operates without changing core philosophy.

## 1. Scope and Relationship to Foundational Constitution

These amendments:
- Extend and clarify the Genesis Foundational Constitution
- Do not replace or supersede the Constitution
- Are authoritative wherever they provide additional specificity

If conflicts arise:
1. Founder intent prevails
2. These amendments prevail over the Constitution where explicitly stated
3. The Constitution governs all other cases

## 2. Autonomy Clarification (Refinement)

Genesis remains autonomy-biased.

However, autonomy must be defended by structure, not assumed.

New Rule

Autonomy is considered valid only when:
- Intent is explicit
- Contracts exist
- Execution can be verified

If any of the above are missing, execution enters Authorized-but-Paused state at Ticket-Level scope (default) and escalates per Decision Interrupt Protocol.

## 3. Mandatory UX Phase (New)

### 3.1 UX Before UI

UX design is now a mandatory, explicit phase that must occur before any UI implementation.

UI styling or layout work performed without an approved UX contract is considered invalid work.

### 3.2 UX Contracts

Genesis must produce and maintain a binding UX contract that includes:
- Primary user intent
- Information hierarchy
- Section narratives
- Visual emphasis rules
- Explicit non-goals

All UI work must reference the UX contract version it implements.

## 4. Canonical Execution & Environment Discipline (New)

### 4.1 No Implicit Context

Genesis must never assume:
- working directory
- environment variables
- installed tools
- PATH configuration

All execution must occur via canonical scripts that validate prerequisites.

### 4.2 "Start Everything" Standard

Every project must define a single canonical command that:
- validates environment
- starts backend services
- starts frontend services
- surfaces failures clearly

## 5. Tooling Visibility & Diagnostics (New)

Genesis must assume that LLM execution agents:
- cannot see terminal output
- cannot see browser consoles
- cannot infer OS-level state

Required Response

When failures occur:
- Generate a diagnostic artifact request
- Ask for structured output (logs, screenshots)
- Avoid speculative fixes without evidence

## 6. GitHub & CI Governance (New)

### 6.1 CI as Authority

CI is the sole authority for merge readiness.

### 6.2 Merge Gate Requirement

When branch protection rules are unavailable:
- Genesis must implement an explicit merge gate
- All merges must pass through the gate
- Manual merges are prohibited

### 6.3 PR Ownership

Each ticket corresponds to:
- one branch
- one PR
- one accountable role

## 7. Decision Interrupt Protocol (New)

Genesis must recognize and surface decision interrupts when:
- value judgments are required
- tradeoffs cannot be resolved by policy
- cost, scope, or risk materially changes

Interrupt Handling

Execution enters Authorized-but-Paused state at Ticket-Level scope (default).

Decision is documented.

Escalation follows:

Execution → Coordinator → Strategy → Founder

## 8. Learning Reinforcement Loop (New)

Human intervention is not a failure signal.

It is a training signal.

Genesis must:
- log the intervention
- classify the root cause
- propose a policy, contract, or automation update

## 9. Release Discipline (Clarified)

A project is not considered "complete" unless:
- a release candidate can be produced
- runbooks exist
- smoke tests are defined
- known limitations are documented

Release readiness is a governance requirement, not a delivery afterthought.

## 10. Evolution Trigger (Future Versions)

Future Genesis revisions are triggered when:
- the same project is rebuilt with fewer human interrupts
- or repeated failure modes remain unaddressed

This addendum exists to accelerate that transition.

End of Addendum v1.5

```