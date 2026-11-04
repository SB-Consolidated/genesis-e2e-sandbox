# Screen Specification Format Reference

**Version:** 1.0 (v0.9.5)  
**Status:** Active  
**Last Updated:** January 28, 2026

## Purpose

This document defines the authoritative format for screen specifications created during Phase 2. Strategy Agent uses this as the template when generating `Specification.md` files for each screen.

**Location:** Each screen's specification is saved as:
```
Genesis Execution/specs/UX Specs/[Screen-ID]/Specification.md
```

**Example:** `Genesis Execution/specs/UX Specs/Screen-001-Login/Specification.md`

---

## 12-Section Specification Template

### Section 1: Screen Purpose
**What:** One-sentence summary of the screen's primary function  
**Example:**
```markdown
## Screen Purpose
This screen allows users to authenticate and access their account.
```

### Section 2: User Goals
**What:** Bulleted list of what users want to accomplish on this screen  
**Example:**
```markdown
## User Goals
- Log in with email and password
- Reset forgotten password
- Remember login credentials for future visits
- Access account securely
```

### Section 3: Layout & Hierarchy
**What:** Visual structure of the screen (top to bottom, left to right)  
**Example:**
```markdown
## Layout & Hierarchy
**Top Section:**
- Company logo (centered, top-left)
- "Welcome back" heading (large, centered)

**Main Content:**
- Login form (centered card, white background, shadow)
  - Email input field (full width)
  - Password input field (full width, show/hide toggle)
  - "Remember me" checkbox (left-aligned)
  - "Forgot password?" link (right-aligned)
  - "Log In" button (primary, full width)

**Bottom Section:**
- "Don't have an account? Sign up" link (centered)
```

### Section 4: Components & Elements
**What:** Detailed list of all UI components with specifications  
**Example:**
```markdown
## Components & Elements
**Email Input:**
- Type: text input
- Label: "Email address"
- Placeholder: "you@example.com"
- Validation: Email format required
- Error message: "Please enter a valid email address"

**Password Input:**
- Type: password input with visibility toggle
- Label: "Password"
- Placeholder: "Enter your password"
- Show/hide icon: Eye icon (right side)
- Min length: 8 characters

**Log In Button:**
- Label: "Log In"
- Style: Primary button (blue background, white text)
- State: Disabled until form valid
- Loading state: Spinner icon + "Logging in..." text
```

### Section 5: Interactions & Behaviors
**What:** How users interact with the screen and what happens  
**Example:**
```markdown
## Interactions & Behaviors
**Email Input Focus:**
- Interaction: User clicks email field
- Behavior: Field border changes to blue, placeholder disappears

**Form Submission:**
- Interaction: User clicks "Log In" button
- Behavior: 
  1. Button shows loading state
  2. API call to /auth/login with credentials
  3. On success: Redirect to Dashboard
  4. On error: Show error message below form

**Forgot Password Link:**
- Interaction: User clicks "Forgot password?"
- Behavior: Navigate to Password Reset screen
```

### Section 6: Data Requirements
**What:** What data is needed, where it comes from, and where it goes  
**Example:**
```markdown
## Data Requirements
**Input Data:**
- Email address (string, user-provided)
- Password (string, user-provided)
- Remember me (boolean, user-provided)

**API Endpoints:**
- POST /auth/login
  - Request body: { email, password, rememberMe }
  - Response: { token, user: { id, email, name } }

**State Management:**
- Store auth token in secure cookie
- Store user object in global state
- Persist "remember me" preference in localStorage
```

### Section 7: Validation & Error Handling
**What:** All validation rules and error scenarios  
**Example:**
```markdown
## Validation & Error Handling
**Field Validation:**
- Email: Must be valid email format (Regex: ^[^\s@]+@[^\s@]+\.[^\s@]+$)
- Password: Minimum 8 characters
- Real-time validation: Show errors on blur or form submission attempt

**Error Scenarios:**
- Invalid credentials: "Email or password is incorrect. Please try again."
- Account locked: "Your account has been locked. Contact support."
- Network error: "Unable to connect. Please check your internet connection."
- Server error: "Something went wrong. Please try again later."

**Error Display:**
- Show error message in red text below form
- Highlight invalid fields with red border
- Preserve user input (don't clear form on error)
```

### Section 8: Loading & Empty States
**What:** How the screen appears during loading and when no data exists  
**Example:**
```markdown
## Loading & Empty States
**Initial Load:**
- Show login form immediately (no loading spinner needed)
- Form is ready for input

**Form Submission (Loading):**
- Disable all form fields
- Show spinner in button
- Change button text to "Logging in..."
- Disable "Forgot password?" link

**No Empty States:**
- Login screen always shows form (no data dependency)
```

### Section 9: Responsive Behavior
**What:** How layout adapts to different screen sizes  
**Example:**
```markdown
## Responsive Behavior
**Desktop (>1024px):**
- Login card: 400px wide, centered
- Logo: 120px height
- Ample whitespace around card

**Tablet (768px-1024px):**
- Login card: 90% width, max 500px
- Logo: 100px height
- Reduced margins

**Mobile (<768px):**
- Login card: 100% width, no margins
- Full-height centered content
- Logo: 80px height
- Larger touch targets (min 44px)
- "Remember me" checkbox and "Forgot password?" stack vertically
```

### Section 10: Accessibility (a11y)
**What:** How screen supports users with disabilities  
**Example:**
```markdown
## Accessibility (a11y)
**Keyboard Navigation:**
- Tab order: Email → Password → Remember me → Forgot password → Log in button
- Enter key submits form from any field
- Escape key clears focus

**Screen Reader Support:**
- All form fields have aria-labels
- Error messages announced with aria-live="assertive"
- Form landmark with aria-label="Login form"
- Button states announced (loading, disabled)

**Visual Accessibility:**
- Minimum contrast ratio: 4.5:1 (text on background)
- Focus indicators: 2px blue outline on all interactive elements
- Error states: Color + icon (not color alone)
- Text size: Minimum 16px for inputs (prevents iOS zoom)
```

### Section 11: Success Criteria
**What:** Measurable criteria to verify screen is complete and correct  
**Example:**
```markdown
## Success Criteria
✅ User can log in with valid credentials  
✅ User sees error message for invalid credentials  
✅ "Remember me" persists across browser sessions  
✅ "Forgot password?" link navigates correctly  
✅ Form validates email format  
✅ Password can be shown/hidden  
✅ Loading state displays during API call  
✅ Screen is fully responsive (desktop, tablet, mobile)  
✅ Keyboard navigation works correctly  
✅ Screen reader announces all interactions  
✅ All Playwright tests pass  
```

### Section 12: Related Screens
**What:** Links to other screens this one connects to  
**Example:**
```markdown
## Related Screens
- **Screen-002-Dashboard:** Destination after successful login
- **Screen-003-Password-Reset:** Accessed via "Forgot password?" link
- **Screen-004-Sign-Up:** Accessed via "Sign up" link at bottom
```

---

## Specification Quality Checklist

When creating a screen specification, verify:

- [ ] All 12 sections are present and complete
- [ ] Screen purpose is clear and concise
- [ ] User goals are specific and actionable
- [ ] Layout describes visual hierarchy clearly
- [ ] All components have detailed specs (type, label, validation)
- [ ] Interactions describe both trigger and behavior
- [ ] Data requirements include API endpoints and formats
- [ ] Validation rules are specific with examples
- [ ] Error messages are user-friendly and actionable
- [ ] Loading states are explicitly defined
- [ ] Responsive behavior covers all breakpoints
- [ ] Accessibility requirements are comprehensive
- [ ] Success criteria are measurable and complete
- [ ] Related screens are linked for navigation context

---

## Common Patterns

### Form-Based Screens
- Always include field validation details
- Specify error message wording
- Define loading states for submission
- Include keyboard navigation requirements

### Data Display Screens
- Define empty state explicitly
- Specify loading skeleton or spinner
- Include pagination/infinite scroll details
- Define sort and filter behaviors

### Dashboard/Overview Screens
- Break down into sections/widgets
- Specify data sources for each widget
- Define refresh/reload behaviors
- Include responsive grid layout

---

## See Also

- **QUESTIONS_FORMAT.md** - Companion questions document format
- **UI_GOVERNANCE.md** - UI governance rules and standards
- **PHASE_2_RULES.md** - Phase 2 workflow and requirements

---

**Usage Note:** This format is enforced by Strategy Agent during Phase 2 screen generation. Extension validates that Specification.md files follow this structure before marking screens as complete.
