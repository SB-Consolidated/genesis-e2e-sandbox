# Canonical Ticket Template

**Status:** Authoritative  
**Scope:** All Genesis Extension execution tickets

## Naming Rules

- Filename: `[TICKET-ID].md`
- Ticket ID format: `TICKET-NNN`
- Example: `TICKET-001.md`

## Required Sections

```markdown
# [TICKET-ID] - [Short Action Title]

## Objective
[One paragraph explaining the outcome and why it matters.]

## Scope
### In Scope
- [Deliverable]

### Out Of Scope
- [Explicit exclusion]

## Success Criteria
- [Machine-verifiable criterion]

## Files Impacted
- [path] (NEW|MODIFIED|DELETED)

## Governance And Constraints
- [Constraint]

## Revision Traceability
- Source Revision Spec: none | REVISION-SPEC-001
- Revision Type: none | corrective | additive | rollback | compliance
- Prior Evidence Impact: none | update completion evidence | invalidate prior evidence

## Dependency Declaration
- Execution Type: sequential | parallel
- Depends On: none | TICKET-001, TICKET-002

## Implementation Plan
1. [Step]
2. [Step]

## Completion Contract Requirements
- [Evidence requirement]

## Security Checklist
[Required when the ticket touches authentication, API routes, secrets or tenant data; omit otherwise. Mark each item `[x]` when met or `[x] Not applicable: <reason>`; an unmarked item fails validation (Amendment #2026-018).]
- [ ] Fails closed when a required secret is missing
- [ ] No hardcoded fallbacks for secrets, keys or credentials
- [ ] Authentication and authorization on every route
- [ ] Tenant scoping on every query and route that reads or writes tenant data
- [ ] No seeded admin accounts
- [ ] No debug routes
```

## Mandatory Content Rules

- Success criteria must be objectively testable.
- Files impacted must use `NEW`, `MODIFIED`, or `DELETED` markers.
- UI tickets must reference headless browser-test evidence requirements.
- Scope changes discovered during execution must be escalated, not silently absorbed.
- Founder-directed Phase 6 refinements must still be expressed as tickets using this template.
- Revision-generated tickets must complete the Revision Traceability section.
- Tickets that touch authentication, API routes, secrets or tenant data must include the Security Checklist section with every item addressed (Amendment #2026-014). A missing section, a missing item or an unmarked item is a validation error, not a warning: the ticket fails the Structure Gate and cannot move to 02_VERIFIED or 03_EXECUTING (Amendment #2026-018). A ticket touches these areas when its title, `scope_in` or In Scope names them, or its Files Impacted lists a path the validator classes as security-sensitive, or its front matter sets `security_scope: true`; that flag only widens detection and never switches it off.

---

## Coordinator Responsibilities When Creating Tickets

1. **Create .md file** in `[ProjectName]/Genesis Execution/tickets/01_DRAFT/` with proper naming
2. **Follow all sections** from this template (all sections are mandatory)
3. **Use plain Markdown** (no code fences required, can use code blocks if helpful)
4. **Be specific and measurable** � avoid vague language
5. **Declare success criteria** that are objectively verifiable
6. **Submit for validation** � move to 02_VERIFIED only after Intent Overseer approves

---

## Common Mistakes to Avoid

? Vague success criteria ("code should be good")
? Measurable criteria ("all tests pass, coverage > 85%, exit code 0")

? Mixed scope ("in scope and also some out-of-scope stuff")
? Clear separation (explicit In Scope and Out of Scope sections)

? Missing governance constraints ("just write the code")
? Explicit constraints ("no breaking changes, must maintain backward compatibility")

? No implementation plan ("just execute it")
? Step-by-step plan (clear steps that Execution Agent can follow)

? Unclear completion criteria ("it should work")
? Verifiable completion ("exit code 0, PR merged, commit SHA recorded")

---

## Validation Gates

All tickets must pass these gates before moving to 02_VERIFIED:

**Structure Gate:**
- All 9 mandatory sections present, plus the Security Checklist when the ticket touches authentication, API routes, secrets or tenant data, with every item marked `[x]` (met or not applicable with a reason); a missing or unmarked checklist blocks the gate (Amendment #2026-018)
- File is valid Markdown
- Ticket ID matches filename

**Clarity Gate:**
- Objective is one paragraph (not multi-page)
- Success Criteria are testable
- Implementation Plan is step-by-step
- No ambiguous terms ("might", "should", "maybe")

**Governance Gate:**
- Ticket does not violate current governance
- Constraints are clearly stated
- Completion Contract requirements are specified

**Scope Gate:**
- In Scope and Out of Scope are separate and clear
- No scope creep or ambiguity
- Files Impacted are listed

**Ticket passes all gates ? Intent Overseer moves to 02_VERIFIED ? Coordinator assigns to Execution Agent**

