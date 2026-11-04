# Questions Document Format Reference

**Version:** 1.0 (v0.9.5)  
**Status:** Active  
**Last Updated:** January 28, 2026

## Purpose

This document defines the authoritative format for questions documents created during Phase 2. Strategy Agent uses this as the template when generating `Questions.md` files for each screen.

**Location:** Each screen's questions document is saved as:
```
Genesis Execution/specs/UX Specs/[Screen-ID]/Questions.md
```

**Example:** `Genesis Execution/specs/UX Specs/Screen-001-Login/Questions.md`

---

## 4-Category Questions Template

### Purpose

Questions documents identify ambiguities, missing details, and decision points that require Founder input before ticket creation. They complement the Specification.md by surfacing uncertainties.

### Structure

Each Questions.md contains **exactly 4 categories:**
1. **UX/Design Questions**
2. **Technical Questions**
3. **Business Logic Questions**
4. **Edge Cases & Error Handling**

---

## Category 1: UX/Design Questions

**What:** Questions about user interface, visual design, and user experience that are not specified in available materials.

**Format:**
```markdown
## UX/Design Questions

1. **[Component] - [Specific Question]**
   - Context: [Why this matters]
   - Options: [If applicable, list 2-3 options]
   - Impact: [What depends on this answer]

2. **[Component] - [Specific Question]**
   ...
```

**Example:**
```markdown
## UX/Design Questions

1. **Login Button - Brand Color**
   - Context: Specification says "primary button" but brand color not defined in governance
   - Options: 
     - Option A: Use blue (#0066CC)
     - Option B: Use green (#00AA00)
     - Option C: Provide hex code
   - Impact: Affects all primary buttons across application

2. **Form Layout - Spacing**
   - Context: Space between form fields not specified
   - Question: What is the standard spacing between form elements?
   - Impact: Consistency across all forms

3. **Mobile View - Logo Placement**
   - Context: Desktop shows logo top-left, mobile behavior not specified
   - Question: Should logo be centered or left-aligned on mobile?
   - Impact: Mobile header layout for all screens
```

**Categories Covered:**
- Visual design (colors, typography, spacing, sizing)
- Component styling (borders, shadows, hover states)
- Animation and transitions
- Responsive breakpoints
- Iconography choices

---

## Category 2: Technical Questions

**What:** Questions about technical implementation, architecture decisions, and technology choices that are not documented in governance.

**Format:**
```markdown
## Technical Questions

1. **[Area] - [Technical Decision Needed]**
   - Context: [Why this is uncertain]
   - Options: [Technical approaches]
   - Trade-offs: [Pros/cons of each option]
```

**Example:**
```markdown
## Technical Questions

1. **Authentication - Token Storage**
   - Context: Specification requires "store auth token in secure cookie" but doesn't specify cookie attributes
   - Questions:
     - Should cookie be httpOnly? (recommended for security)
     - Should cookie use sameSite=strict or sameSite=lax?
     - What should expiration be for "remember me" vs. regular login?
   - Trade-offs: Strict security vs. convenience

2. **Password Validation - Client vs. Server**
   - Context: Validation rules defined but not where they should be enforced
   - Question: Should password validation occur on client-side only, server-side only, or both?
   - Options:
     - Client-only: Faster feedback, less secure
     - Server-only: More secure, slower UX
     - Both (recommended): Best UX + security
   - Impact: Validation strategy for all forms

3. **API Error Handling - Retry Logic**
   - Context: Network errors mentioned but retry behavior not specified
   - Question: Should failed API calls be automatically retried?
   - Options:
     - No retry: User must click again
     - Retry once after 1 second
     - Retry with exponential backoff (3 attempts)
   - Impact: Resilience strategy for all API calls
```

**Categories Covered:**
- State management approach
- API communication patterns
- Data caching strategies
- Security implementations
- Performance optimization
- Third-party library choices

---

## Category 3: Business Logic Questions

**What:** Questions about business rules, user flows, data rules, and feature behavior that are not defined in specifications.

**Format:**
```markdown
## Business Logic Questions

1. **[Feature] - [Business Rule Question]**
   - Context: [What's unclear about the rule]
   - Question: [Specific decision needed]
   - Impact: [Who/what is affected]
```

**Example:**
```markdown
## Business Logic Questions

1. **Login Attempts - Account Locking**
   - Context: Error handling mentions "account locked" but trigger not specified
   - Question: After how many failed login attempts should an account be locked?
   - Options:
     - 3 attempts (strict security)
     - 5 attempts (balanced)
     - 10 attempts (lenient)
   - Impact: Security vs. user convenience trade-off

2. **Remember Me - Duration**
   - Context: "Remember me" feature mentioned but duration not specified
   - Question: How long should the "remember me" session last?
   - Options:
     - 7 days (common for financial apps)
     - 30 days (common for productivity apps)
     - 90 days (less secure but convenient)
   - Impact: User convenience vs. security policy

3. **Password Reset Link - Email Content**
   - Context: Specification says "Forgot password?" navigates to reset screen but process not defined
   - Questions:
     - Should reset happen via email link or in-app?
     - How long should reset link be valid?
     - Should user be notified if someone requests reset for their account?
   - Impact: Password reset workflow and security

4. **First-Time Login - Redirect**
   - Context: Specification says "redirect to Dashboard" after login
   - Question: Should first-time users be redirected to onboarding instead of dashboard?
   - Impact: User onboarding flow
```

**Categories Covered:**
- User permissions and access control
- Data validation and business rules
- Workflow sequences and state transitions
- Feature toggling and rollout
- Notification and alert triggers

---

## Category 4: Edge Cases & Error Handling

**What:** Questions about uncommon scenarios, error states, and boundary conditions that are not addressed in specifications.

**Format:**
```markdown
## Edge Cases & Error Handling

1. **[Scenario] - [Edge Case Question]**
   - Scenario: [Describe the unusual situation]
   - Question: [How should system behave]
   - Current Spec: [What spec says, if anything]
   - Needs Clarification: [What's unclear]
```

**Example:**
```markdown
## Edge Cases & Error Handling

1. **Already Logged In - Behavior**
   - Scenario: User navigates to login screen while already authenticated
   - Question: Should they be automatically redirected to dashboard, or allowed to log in as different user?
   - Impact: Multi-account support and UX flow

2. **Slow Network - Timeout**
   - Scenario: API call takes longer than expected
   - Question: After how long should request timeout and show error?
   - Options:
     - 10 seconds (fast timeout)
     - 30 seconds (balanced)
     - 60 seconds (patient)
   - Current Spec: Not mentioned
   - Impact: User experience on slow connections

3. **Special Characters in Email - Validation**
   - Scenario: User enters email with unusual but valid characters (e.g., user+tag@example.com)
   - Question: Should all RFC-5322 compliant emails be accepted, or use stricter validation?
   - Current Spec: "Valid email format" (not specific)
   - Needs Clarification: Define "valid email" precisely

4. **Browser Back Button - Session State**
   - Scenario: User clicks back button after logging in
   - Question: Should they return to login screen (logged out) or stay logged in?
   - Impact: Browser navigation behavior

5. **Multiple Tabs - Session Sync**
   - Scenario: User logs out in one tab, other tabs are still open
   - Question: Should all tabs detect logout and redirect to login?
   - Options:
     - No sync: Each tab independent
     - Full sync: Logout in one tab logs out all tabs
   - Impact: Multi-tab session management

6. **Account Deleted - Login Attempt**
   - Scenario: User tries to log in to account that has been deleted
   - Question: What error message should be shown?
   - Options:
     - Generic: "Invalid credentials" (more secure, reveals nothing)
     - Specific: "This account has been deleted" (more user-friendly, less secure)
   - Security Consideration: Prevents account enumeration if generic
```

**Categories Covered:**
- Boundary conditions (empty, null, maximum values)
- Concurrent access scenarios
- Network and system failures
- Browser compatibility issues
- Accessibility edge cases
- Security attack vectors

---

## Questions Quality Checklist

When creating a Questions.md, verify:

- [ ] All 4 categories are present
- [ ] Each question is specific and answerable
- [ ] Context is provided for why question matters
- [ ] Options are included when multiple choices exist
- [ ] Impact is described (who/what is affected)
- [ ] Questions are grouped logically within categories
- [ ] No duplicate questions across categories
- [ ] Questions identify genuine ambiguities (not just restating spec)
- [ ] Technical questions include trade-offs
- [ ] Business logic questions reference user impact
- [ ] Edge cases are realistic and relevant

---

## Question Formulation Guidelines

### Good Questions
✅ Specific and answerable  
✅ Include context and impact  
✅ Provide options when multiple approaches exist  
✅ Identify genuine ambiguities  
✅ Focus on decisions needed for implementation  

**Example Good Question:**
```markdown
**Login Button - Loading State Animation**
- Context: Specification says show spinner during API call
- Question: Should spinner be inline in button or overlay entire form?
- Options:
  - Inline: Button shows spinner + "Logging in..." (keeps context visible)
  - Overlay: Full-screen spinner (prevents other interactions)
- Impact: Consistency with other loading states across app
```

### Bad Questions
❌ Too vague or open-ended  
❌ Missing context  
❌ Already answered in specifications  
❌ Asking for implementation details that are developer choice  

**Example Bad Question:**
```markdown
**Login - How to implement?**
- Question: How should we implement the login feature?
```
*(Too vague, no context, no specific decision point)*

---

## When Questions Are Needed

### Always Create Questions When:
- Specification uses vague terms ("user-friendly", "fast", "secure") without metrics
- Design choices not specified (colors, spacing, animations)
- Business rules not documented (timeouts, limits, validation rules)
- Error scenarios not addressed
- Edge cases not considered
- Multiple valid approaches exist without preference stated

### No Questions Needed When:
- Specification is complete and unambiguous
- All design decisions are documented
- Business rules are clearly defined
- Error handling is comprehensive
- Edge cases are addressed
- Only one reasonable implementation approach

**Note:** Even if specification seems complete, always include at least a few questions to surface potential oversights. An empty Questions.md suggests incomplete analysis.

---

## Founder Response Process

### How Founder Answers

1. **Founder reviews Questions.md**
2. **Founder provides answers directly in the file:**
   ```markdown
   ## UX/Design Questions
   
   1. **Login Button - Brand Color**
      - Context: ...
      - Options: ...
      - **ANSWER:** Use blue (#0066CC). This is our primary brand color per brand guidelines.
   ```
3. **Founder saves updated Questions.md**
4. **Strategy Agent incorporates answers into next specification iteration or ticket creation**

### Answer Quality

**Good Answers:**
- Clear and specific
- Include rationale
- Provide exact values (not "use blue", but "use #0066CC")
- Reference policies or guidelines when applicable

**Example:**
```markdown
**ANSWER:** After 5 failed login attempts, lock account for 15 minutes. This balances security (prevents brute force) with user convenience (allows typo correction). Notify user via email when account is locked.
```

---

## See Also

- **SPECIFICATION_FORMAT.md** - Companion specification document format
- **UI_GOVERNANCE.md** - UI governance rules and standards
- **PHASE_2_RULES.md** - Phase 2 workflow and requirements
- **STRATEGIC_DIRECTIVE_TEMPLATE.md** - Phase 1 directive format

---

**Usage Note:** This format is enforced by Strategy Agent during Phase 2 screen generation. Extension validates that Questions.md files follow this structure before marking screens as complete. Founder must answer all questions before tickets can be generated for the screen.
