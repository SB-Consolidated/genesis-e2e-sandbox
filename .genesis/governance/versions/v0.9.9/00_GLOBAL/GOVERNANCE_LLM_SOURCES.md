```markdown
# LLM Authoritative Sources — Mandatory

**Status:** Enforced Standard  
**Authority:** Genesis Foundational Constitution, Operating Standards  
**Scope:** All LLM-related development, design, testing, and governance  
**Compliance Level:** CONSTITUTIONAL

---

## Purpose

This document establishes the **only permitted sources** for OpenAI API behavior, parameters, examples, and model capabilities within Genesis. Reliance on non-authoritative or marketing-level sources introduces drift, incorrect implementations, and test fragility.

**All LLM-related work must cite and align with these authoritative sources.**

---

## Authoritative Sources (MANDATORY)

The following URLs are the **ONLY** permitted sources for OpenAI API technical specifications:

### 1. Primary API Reference (Source of Truth)
**URL:** https://platform.openai.com/docs/api-reference/introduction

**Usage:** Complete API endpoint specifications, request/response schemas, parameter definitions, authentication, error codes.

**Status:** MANDATORY for all API integration work.

---

### 2. Platform Overview & Guides
**URL:** https://platform.openai.com/docs/overview

**Usage:** High-level platform concepts, best practices, usage patterns, rate limits, and system architecture guidance.

**Status:** MANDATORY for design and architecture decisions.

---

### 3. Quickstart (Getting Started)
**URL:** https://platform.openai.com/docs/quickstart

**Usage:** Initial setup, authentication patterns, basic integration examples.

**Status:** MANDATORY for onboarding and initial implementation.

---

### 4. Chat Completions Endpoint Reference
**URL:** https://platform.openai.com/docs/api-reference/chat

**Usage:** Detailed chat completions API specification, streaming, function calling, response formats, token usage.

**Status:** MANDATORY for all conversational AI implementations.

---

### 5. Models & Capabilities
**URL:** https://platform.openai.com/docs/models

**Usage:** Model names, capabilities, context windows, pricing, deprecation schedules, recommended use cases.

**Status:** MANDATORY for model selection and capability planning.

---

## Non-Authoritative Sources (EXPLICITLY DISALLOWED)

The following sources **MUST NOT** be used as technical references:

- ❌ https://openai.com/api/ (marketing-level, not technical)
- ❌ Blog posts, tutorials, or third-party documentation
- ❌ Stack Overflow answers or community forums
- ❌ Inferred behavior without official documentation citation
- ❌ Deprecated or sunset documentation versions
- ❌ ChatGPT conversational responses (not authoritative for API specs)

**Violation Consequence:** BLOCKING — tickets using disallowed sources fail governance gates.

---

## Enforcement Rules

### Rule 1: Explicit Citation Required
Every LLM-related ticket MUST include:
- Direct URL citations to the authoritative sources above
- Specific section references (e.g., "per Chat Completions API, temperature parameter")
- Version verification (confirm docs are current, not deprecated)

### Rule 2: Parameter Validation
All OpenAI API parameters used in code MUST:
- Appear in the official API reference documentation
- Use documented value ranges and types
- Include error handling for documented error codes

### Rule 3: Model Selection Justification
Model choices MUST be justified with:
- Citation from https://platform.openai.com/docs/models
- Explicit capability requirements matched to model specs
- Deprecation schedule awareness

### Rule 4: No Undocumented Behavior
Code MUST NOT rely on:
- Undocumented API parameters
- Inferred or observed behavior without official documentation
- Deprecated endpoints or parameters still technically functional

### Rule 5: Current Documentation Verification
At implementation time, Genesis MUST:
- Verify docs are current (not archived or deprecated)
- Check for model deprecations or API changes
- Update citations if documentation URLs change

---

## Quality Gate Integration

### LLM Source-of-Truth Gate (BLOCKING)
**When:** Before merge of any LLM-related PR

**Validates:**
- All LLM API calls cite authoritative documentation
- No disallowed sources referenced in code comments or tickets
- Parameters match current API reference specifications
- Models used are not deprecated

**Failure Conditions:**
- Use of undocumented parameters
- Reliance on deprecated endpoints
- Citations to disallowed sources
- Inferred behavior assumptions without documentation

**Evidence Required:**
- Direct links to authoritative docs in ticket and PR description
- Code comments citing specific API reference sections
- Confirmation that docs checked within 7 days of implementation

**Remediation:** Update code to align with authoritative docs; add proper citations; remove deprecated usage.

---

## Completion Contract Requirements

All LLM-related tickets MUST include in the Completion Contract:

1. **Documentation Alignment Evidence:**
   - List of authoritative docs consulted
   - Specific sections/parameters referenced
   - Confirmation that docs are current (not deprecated)

2. **Source Compliance Statement:**
   - Explicit confirmation: "All OpenAI API usage verified against official platform documentation"
   - Confirmation: "No disallowed sources used"

3. **Model Selection Justification:**
   - Model name and version
   - Capability requirements
   - Citation from https://platform.openai.com/docs/models

4. **Deprecation Awareness:**
   - Confirmation that models/endpoints are not deprecated
   - Plan for handling future deprecations if applicable

---

## Exception Process

No waivers permitted without explicit founder approval and documented justification in the ticket.

Exception requests MUST include:
- Business justification for non-standard approach
- Risk assessment of using undocumented features
- Mitigation plan if behavior changes
- Timeline for migration to documented approach

---

## References

- **Genesis Foundational Constitution:** Section on Platform Standards
- **Operating Standards:** LLM Development Standards (Section 6.7)
- **Governance Gates:** LLM Source-of-Truth Gate (Section 2.6)
- **Ticket Template:** LLM Requirements Section
- **Completion Contract Policy:** OpenAI Alignment Evidence

---

**Last Updated:** January 3, 2026  
**Authority:** GOV-OPENAI-DOCS-SOURCE-001  
**Next Review:** Upon OpenAI API major version change
```