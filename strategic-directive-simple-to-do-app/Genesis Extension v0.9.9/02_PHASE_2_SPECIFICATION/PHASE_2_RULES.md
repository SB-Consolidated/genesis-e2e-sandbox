# Phase 2: Screen-by-Screen Review Process

## Overview
Phase 2 uses a structured, iterative review pattern where the Strategy Agent and Founder work through each primary screen specification collaboratively. The goal is to produce complete, reviewable UX specifications for every primary screen before entering governance review.

## Artifacts Structure

### Screen-Index.md
- **Location:** `Genesis Execution/specs/UX Specs/Screen-Index.md`
- **Purpose:** Master list of all screens with review status (canonical checklist format)
- **Format:** See **Screen Index Checklist Block (Canonical Format)** section for exact requirements
- **Example:**
	```markdown
	# UX Screens

	## Active Screens

	- [ ] Screen-001-Home-Search
	  Location: Genesis Execution/specs/UX Specs/Screen-001-Home-Search/

	- [x] Screen-002-Vehicle-Detail
	  Location: Genesis Execution/specs/UX Specs/Screen-002-Vehicle-Detail/

	- [ ] Screen-003-Trade-Confirmation
	  Location: Genesis Execution/specs/UX Specs/Screen-003-Trade-Confirmation/

	## Archived Screens

	- Screen-099-OldFeature
	  Location: Genesis Execution/specs/UX Specs/Screen-099-OldFeature/ (Archived: 2026-01-23)
	```

### Screen Folders
Each screen gets a dedicated folder: `Screen-{NNN}-{Name}/` (ID must match exactly)
- **Specification.md**: Complete screen specification including:
	- Screen purpose and user goals
	- Navigation flows (entry points, exit paths)
	- UI components and layout description
	- Data requirements (displayed/collected)
	- Interaction patterns and state changes
	- Validation rules
	- Error handling approach
	- Acceptance criteria
  
- **Questions.md**: Strategy Agent questions and clarifications:
	- Open questions needing founder input
	- Design alternatives for founder decision
	- Technical constraint questions
	- Clarifications on requirements

## Screen Numbering and Naming

### Canonical Requirements
- **Zero-padded numbering:** Screen-001, Screen-002, ... Screen-999 (three digits minimum)
- **ID format:** `Screen-NNN-{Name}` (example: `Screen-001-Home-Search`)
- **Name component:**
  - Describe primary screen purpose
  - Use hyphens only (no spaces, underscores, or special characters)
  - Use Pascal-Case-With-Hyphens (e.g., `Home-Search`, `Vehicle-Detail`, `Trade-Confirmation`)
- **Folder name MUST match ID exactly:** `Screen-001-Home-Search/` (not `screen-001-home-search/` or variations)
- **Consistency requirement:** Folder names in file system MUST match screen IDs in Screen-Index.md exactly

### Validation
- Tools and processes MUST enforce this format
- Any divergence (spaces, underscores, inconsistent naming) is a governance violation
- Canonical format enables machine-readable screen registry and tooling

---

## Screen Index Checklist Block (Canonical Format)

### Required Format
Every `Screen-Index.md` MUST include a checklist block in this exact format. This block is the contract that tools rely on:

```markdown
## Active Screens

- [ ] Screen-001-Home-Search
  Location: Genesis Execution/specs/UX Specs/Screen-001-Home-Search/

- [x] Screen-002-Vehicle-Detail
  Location: Genesis Execution/specs/UX Specs/Screen-002-Vehicle-Detail/

- [ ] Screen-003-Trade-Confirmation
  Location: Genesis Execution/specs/UX Specs/Screen-003-Trade-Confirmation/

## Archived Screens

- Screen-099-OldFeature
  Location: Genesis Execution/specs/UX Specs/Screen-099-OldFeature/ (Archived: 2026-01-23)
```

### Checklist Block Rules
- **One screen per line** with `- [ ]` or `- [x]` status marker
- **Do NOT alter the line structure:** Machine parsing requires exact format
- **Location line MUST follow immediately** after each screen entry (no blank lines)
- **Use `- [ ]`** for unchecked (not yet reviewed)
- **Use `- [x]`** for checked (reviewed/approved by founder)
- **Archived screens:** Move to "Archived Screens" section with archive date
- **Location format:** `Location: Genesis Execution/specs/UX Specs/Screen-NNN-Name/`

### Tolerance and Validation
- **Canonical checklist + location lines** are the contract that extends rely on
- Optional narrative sections are allowed elsewhere in the file, but the checklist block must follow the format above exactly
- **Do not change the checklist structure** even if readability suggestions arise
- Tools will parse and validate this block; any deviation breaks governance enforcement

---

## Phase 2 Workflow Steps

### Step 0: Batch Generate All Screens
**Agent:** Strategy Agent  
**Action:**
1. Review Phase 1 strategic directive from `Genesis Execution/specs/Application Specs/`
2. Identify all primary screens needed for the application
3. Create `Screen-Index.md` in `Genesis Execution/specs/UX Specs/`
4. Create the **Screen Index Checklist Block** (see canonical format above) with all screens in Active Screens section, marked unchecked `- [ ]`
5. Include Location line for each screen
6. **For EACH identified screen**, create folder matching the ID exactly: `Screen-NNN-{Name}/` with complete initial Specification.md and Questions.md
7. Ensure all screens are generated upfront to enable efficient batch review

**v0.9.5 Implementation:** Batch generation occurs in groups of **3 screens at a time** with automatic progression:
- **Step 0a:** Strategy Agent creates Screen-Index.md ONLY (no folders)
- **Step 0b:** Extension invokes Strategy Agent with batch of 3 screens from index
- Extension polls for completion (both Specification.md and Questions.md must exist)
- Process repeats until all screens generated
- Pause/resume supported via `pauseScreenGeneration` and `resumeScreenGeneration` commands

**Completion Criteria:** 
- Screen-Index.md exists with Screen Index Checklist Block (canonical format) containing all identified screens
- All screen folders exist with initial Specification.md and Questions.md files
- All screens marked unchecked `- [ ]` and ready for founder review

**Rationale:**
- **Holistic Analysis:** Strategy Agent can analyze all screens from Phase 1 directive upfront, ensuring consistency across the application
- **Efficient Batch Generation:** Generating all screens at once leverages full context; sequential generation causes unnecessary context switching
- **Founder-Ready:** All screens are visible and ready for iterative review; founder doesn't wait for sequential generation
- **Progress Visibility:** All screens appear in Phase Workflow UI from the start, improving transparency
- **Iterative Refinement:** Founder reviews and refines all screens iteratively (Step 1), rather than waiting for sequential creation

### Step 9 (Optional): Strategy Agent Screen Index Generation Prompt

**Purpose:** Strategy Agent may use this prompt to generate the initial Screen-Index.md with proper formatting, ensuring compliance with the canonical checklist format.

**Prompt:**
```
You are the Strategy Agent for Genesis governance. Generate all screens for this application in Step 0.

Requirements:
1. Use the exact canonical format with zero-padded screen numbers: Screen-001, Screen-002, etc.
2. Screen IDs must be formatted as: Screen-NNN-Name where Name uses hyphens and Pascal-Case (e.g., Screen-001-Home-Search)
3. Create the Screen Index Checklist Block exactly as specified in governance:
   - Each screen on one line with "- [ ]" or "- [x]"
   - Location line immediately following (no blank lines)
   - Format: "Location: Genesis Execution/specs/UX Specs/Screen-NNN-Name/"
4. All initial screens must be unchecked: "- [ ]"
5. Do NOT deviate from this format; tools depend on exact structure
6. **CRITICAL:** For EACH screen identified, create Screen-{NNN}-{Name}/ folder with complete initial Specification.md and Questions.md
7. Generate all screens upfront so Founder can review them iteratively in Step 1
8. Do NOT generate screens sequentially; generate all at once for holistic application analysis

Strategic Directive: [INCLUDE PHASE 1 STRATEGIC DIRECTIVE]

Generate all screens with Screen-Index.md, all Screen-NNN-Name/ folders, and all Specification.md + Questions.md files upfront using the canonical checklist format. This enables efficient batch generation followed by iterative founder review.
```

---

### Step 1: Iterative Review & Refinement
**Agent:** Strategy Agent + Founder  
**Action:** Iterative review and refinement of all pre-generated screens using Phase Workflow UI

**Prerequisites:** Step 0 complete; all screens generated with initial Specification.md and Questions.md

**For Each Screen:**
1. Founder reviews Specification.md and Questions.md via Phase Workflow UI
2. Founder provides feedback via UI textarea on clarity, completeness, and fit with strategic intent
3. Strategy Agent refines Specification.md and Questions.md based on founder feedback (iteration)
4. Founder re-reviews updated specifications
5. When satisfied with specification quality and all questions resolved, Founder marks screen as reviewed by updating checkbox to [x] in Screen-Index.md (canonical checklist block)
6. Move to next unchecked screen, repeat process

**Special Actions:**
- **Add Screen:** Founder can request new screen; Strategy Agent adds new entry to Screen-Index.md checklist block (with proper zero-padded ID and Location line) and creates matching folder
- **Delete Screen:** Founder can request screen removal; Strategy Agent moves entry to Archived Screens section with archive date
- **Unlock Screen:** Founder can uncheck (change [x] to [ ]) any screen in the checklist block to make changes after initial review

**Critical Requirement:** Always maintain exact canonical checklist format when adding/removing/updating screens in Screen-Index.md. Tools validate against this format.

**Completion Criteria:** All active screens have [x] checkboxes in Screen-Index.md canonical checklist block

### Step 2: Finalize Phase 2
**Agent:** Strategy Agent  
**Action:** When all screens reviewed and founder satisfied:
1. Create `PHASE-2-COMPLETE-[TIMESTAMP].md` in `Genesis Execution/handoffs/phase-gates/`
2. Include summary of all reviewed screens
3. Reference all Screen-{n}-{name}/ folders
4. Confirm readiness for Phase 3 Governance Review

**Completion Criteria:** PHASE-2-COMPLETE-[TIMESTAMP].md exists in phase-gates/

## Screen Status States

- **Not Reviewed:** `- [ ]` in Screen-Index.md (no checkbox)
- **Reviewed:** `- [x]` in Screen-Index.md (checked)
- **Archived:** Moved to "Archived Screens" section (deleted/removed)

## Governance Compliance

### Constitutional Requirements
- All screens must serve Phase 1 strategic intent
- Screen specifications must be complete before Phase 3 review
- Founder approval required for all screens (checkboxes)
- Strategy Agent responsible for specification quality

### Handoff Requirements
- Each screen must have complete Specification.md + Questions.md
- Screen-Index.md must reflect accurate status
- PHASE-2-COMPLETE gate required before Phase 3 entry
- All active screens must be checked before phase gate creation

## Role Responsibilities

**Strategy Agent:**
- Create Screen-Index.md from Phase 1 strategic directive
- Generate initial specifications and questions for each screen
- Iterate on specifications based on founder feedback
- Add/remove screens as requested by founder
- Create PHASE-2-COMPLETE gate when all screens approved

**Founder:**
- Review specifications and answer questions
- Provide feedback on screen functionality and flows
- Mark screens as reviewed when satisfied
- Decide when to add/delete screens
- Approve phase completion (authorize gate creation)

## Success Criteria

Phase 2 is complete when:
1. Screen-Index.md exists with all primary screens
2. All active screens have [x] in Screen-Index.md
3. All Screen-{n}-{name}/ folders have complete Specification.md + Questions.md
4. PHASE-2-COMPLETE-[TIMESTAMP].md exists in phase-gates/
5. (Optional) UX Screens/ folder has founder-designed mockups

## Tools and Automation

The Genesis Control Plane extension provides Phase Workflow UI for Phase 2:
- Interactive screen selector dropdown
- Side-by-side view of Specification.md and Questions.md
- Textarea for founder feedback
- Buttons: Update Screen, Mark Reviewed, Unlock, Add Screen, Delete Screen
- Progress tracking: "X/Y screens reviewed"
- Complete Phase 2 button (when all reviewed)

---

## Optional: Screen Index Template Snippet

**Purpose:** For governance documentation purposes, consider adding this snippet to the Genesis governance templates folder for copy/paste reference.

**File:** `governance/templates/Screen-Index-Template.md`

```markdown
# Screen Index Template

Copy this template structure when creating a new Screen-Index.md file. Follow the canonical format exactly.

## Active Screens

- [ ] Screen-001-{ScreenName}
  Location: Genesis Execution/specs/UX Specs/Screen-001-{ScreenName}/

- [ ] Screen-002-{ScreenName}
  Location: Genesis Execution/specs/UX Specs/Screen-002-{ScreenName}/

- [ ] Screen-003-{ScreenName}
  Location: Genesis Execution/specs/UX Specs/Screen-003-{ScreenName}/

## Archived Screens

(None at initialization)
```

**Notes:**
- Replace `{ScreenName}` with actual screen names in Pascal-Case-With-Hyphens format
- Use zero-padded numbers: Screen-001, Screen-002, etc.
- Keep Location lines exactly as shown (one blank line between entries is acceptable elsewhere, but Location lines must immediately follow screen entries with no blank line between them)
- Tools may auto-format index to maintain this structure

---

## Notes for Tooling

This governance document establishes the machine-readable contract for Screen Index files:

- **Canonical Format:** The Screen Index Checklist Block format is the contract. Any deviation breaks tool parsing.
- **Consistency:** Folder names and IDs must match exactly (case-sensitive on most file systems).
- **Tolerance:** Narrative text may vary, but the checklist structure is invariant.
- **Validation:** Tools should validate Screen-Index.md against the canonical format and alert on deviations.
- **Auto-formatting:** Tools may auto-format Screen-Index.md to maintain canonical structure without changing semantics.
