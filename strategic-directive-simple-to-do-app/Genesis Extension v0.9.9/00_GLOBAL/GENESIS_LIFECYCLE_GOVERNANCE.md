# GENESIS LIFECYCLE GOVERNANCE

**Version:** v0.7 — FINAL  
**Status:** LOCKED (Authoritative Baseline)  
**Applies To:** All future Genesis builds  
**Supersedes:** Genesis v0.6B and all prior variants

---

## GOVERNANCE PURPOSE

Genesis Lifecycle Governance exists to:

- Enable fast, correct execution
- Preserve founder intent and authority
- Eliminate execution deadlocks and inference traps
- Provide clear, phase-based permissions
- Ensure quality through explicit gates, not silence

**Governance is a facilitator, not a blocker.**

---

## GLOBAL GOVERNANCE PRINCIPLES (BINDING)

### Phase-Based Authority

What is allowed is determined by the current phase.

Once a phase is entered, actions explicitly allowed in that phase are permitted without additional authorization.

### Explicit Enablement Over Implicit Prohibition

Phases explicitly enable tools, behaviors, and decisions.

Actions not mentioned are not automatically forbidden unless explicitly restricted.

### Founder Authority Is Absolute

Founder confirmation advances phases.

Founder approval overrides process conflicts.

### Execution Is Expected

Governance may not block required quality gates (tests, PRs, merges).

Any rule that prevents execution of a mandated gate is invalid.

### UX ≠ UI

UX defines experience truth.

UI is an implementation detail with allowed discretion.

---

## PHASE 1 — Founder Intent Review, Confirmation, and Specification

### Purpose

Define what is being built and what is explicitly not being built.

### Authority

- **Founder:** Final authority
- **Strategy:** Structure and clarification

### Allowed Actions

- Founder discussion
- Clarifying questions
- Assumption surfacing
- Specification drafting

### Required Outputs

- Problem statement
- In-scope / out-of-scope definition
- Non-goals
- Success criteria
- Locked functional specification

### Gate to Phase 2

Founder explicitly confirms:

**"This is what I want built."**

---

## PHASE 2 — Project Planning, Screen Definition, Tool Selection, and Strategy Review

### Purpose

Define what will be built at the screen level and how it will be built, producing a complete, experience-anchored specification.

This phase creates the authoritative experience truth that anchors UX, build, and testing.

### Authority

- **Strategy:** Structures definitions and plans
- **Founder:** Confirms

### A. Major Screen Definition (REQUIRED)

For each major screen:

- Screen name
- Purpose / user outcome
- Primary and secondary user flows
- Key states (empty, loading, error, success)
- Critical interactions
- Explicit non-goals

### B. UX-Ready Screen Specifications (REQUIRED)

For each screen, produce a UX specification suitable for direct input into tools such as Uizard, defining:

- User goals
- Experience flows
- Interaction logic
- State transitions
- Validation rules
- Error and edge handling

**UX defines experience intent — not pixel-perfect UI.**

**Explicitly NOT locked:**

- Layout precision
- Styling
- Component libraries
- Visual hierarchy choices

### C. Tooling & Architecture Planning (REQUIRED)

- Framework selection
- State management approach
- Data flow assumptions
- Testing strategy
- Playwright required for UI flows
- Repository and branching strategy
- CI/CD intent

### Required Outputs (Hard Gate)

Phase 2 is complete only when:

- Screen Inventory is complete and founder-approved
- Screen Specification Pack exists (one per screen, UX-ready)
- Tooling & Delivery Plan is explicit
- Specs are declared "Ready for UX Generation"

### Gate to Phase 3

Founder explicitly confirms:

**"These screens and experience specs are authoritative."**

---

## PHASE 3 — Governance Review and Confirmation

### Purpose

Confirm the plan is executable, safe, and internally consistent.

### Authority

- **Coordinator:** Governance validation
- **Strategy:** Conflict resolution

### Allowed Actions

- Governance checks
- Risk identification
- Gate confirmation

### Forbidden

- Tool changes
- Scope expansion

### Required Outputs

- Governance sign-off
- Explicit list of enforced gates:
  - PR requirements
  - Auto-merge rules
  - Playwright enforcement
  - Review expectations

### Gate to Phase 4

Governance confirms:

**"This plan can be executed as written."**

---

## PHASE 4 — Environment Start-Up and Configuration

### Purpose

Create a working development environment.

### Authority

- **Execution:** Performs setup
- **Coordinator:** Validates compliance

### Explicitly Allowed / Required

- Repository initialization
- GitHub pushes
- Branch creation
- CI configuration
- Playwright installation
- Local runtime setup
- Baseline test execution

### Required Outputs

- Running local environment
- Passing baseline checks
- Connected, clean repository

### Gate to Phase 5

Environment runs locally

Tests execute successfully

---

## PHASE 5 — Build Planning and Execution

### Purpose

Implement features correctly and efficiently.

### Authority

- **Execution:** Implements
- **Coordinator:** Enforces gates

### Explicitly Required

- Ticket branches
- GitHub pull requests
- Playwright tests for UI changes
- Auto-merge (where allowed)
- Post-merge branch cleanup

### Explicitly Allowed

- UI layout adjustments
- Component selection
- Refactoring within scope
- Test expansion
- Performance improvements

### Explicitly Forbidden

- Changing user flows
- Removing required states
- Introducing new capabilities without Phase 2 revision

### Required Outputs

- Working features
- Test coverage
- Clean main branch

### Gate to Phase 6

All required gates passing and feature-ready for review.

---

## PHASE 6 — Founder Review & Fine Tuning

### Purpose

Apply human judgment and polish.

### Authority

- **Founder:** Directs
- **Execution:** Applies

### Allowed Actions

- UX tuning
- Copy refinement
- Behavioral adjustments
- Minor scope refinement within intent

### Required Outputs

- Founder-approved build

### Gate to Phase 7

Founder explicitly approves release.

---

## PHASE 7 — Production Release

### Purpose

Ship to production.

### Authority

- **Founder:** Authorizes
- **Execution:** Releases

### Explicitly Required

- Final test pass
- Versioning
- Release checklist
- Deployment

### Outputs

- Production release
- Release record

---

## PHASE AUTHORITY REFERENCE

| Role | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Phase 6 | Phase 7 |
|------|---------|---------|---------|---------|---------|---------|---------|
| Founder | FINAL | CONFIRM | APPROVE | OBSERVE | OBSERVE | DIRECT | AUTHORIZE |
| Strategy | SUPPORT | LEAD | SUPPORT | — | — | — | — |
| Coordinator | SUPPORT | SUPPORT | LEAD | VALIDATE | ENFORCE | SUPPORT | SUPPORT |
| Execution | — | — | — | SETUP | BUILD | APPLY | RELEASE |

---

## AMENDMENT RECORD

This governance document is v0.7 LOCKED. Future amendments require new version (v0.8+).

For amendment history, see `GENESIS_CONSTITUTION_AMENDMENTS.md`.
