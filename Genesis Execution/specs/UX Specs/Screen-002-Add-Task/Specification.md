# Screen-002-Add-Task — Specification

## Screen Overview
- Screen Name: Inline Add Task
- Purpose: This is the quick-add control used at the top of the single-page task list. It lets a user create a task without leaving the main screen or navigating to a separate route.
- User Goals:
  - Add a task in one step
  - Submit with Enter without using a mouse
  - Keep the task flow lightweight and mobile-friendly
  - Continue adding multiple tasks in sequence without friction
- Priority: Critical

## Navigation Flows
- Entry Points:
  - The field is presented at the top of the single task-list page
  - There is no separate `#/add` route
- Exit Paths:
  - After a successful add, the user stays on the same page and the new task appears in the list
- Deep Links:
  - None; the create flow is embedded directly into the main screen

## UI Components and Layout
**Inline Add Row:**
- Positioned at the top of the task list, directly above the tasks
- Contains a single text input and an Add button
- Keeps the design simple, touch-friendly, and easy to use on mobile

**Input Field:**
- Placeholder: "Add a task"
- Clear visual focus state
- Large enough touch target for mobile use
- Pressing Enter submits the form

**Add Button:**
- Simple compact action button next to the input
- Enabled when the trimmed task text is not empty
- Button text remains straightforward and easy to understand

## Data Requirements
**Input Data:**
- `title` as a trimmed string
- Must be non-empty before submission

**Data Displayed:**
- No separate detail or confirmation screen is shown
- The newly created task appears immediately in the list

**Data Sources:**
- Local app state or local storage is acceptable for this simple single-page app

## Interactions and State Changes
**Typing:**
- User types in the input field at the top of the list
- Empty input stays disabled until a value is entered

**Submit via Enter or Button:**
- User presses Enter in the input or taps the Add button
- The app trims whitespace and ignores empty submissions
- On success, the new task is added to the list immediately and the input clears
- The user remains on the same page after the task is added

**Validation Feedback:**
- If the input is empty or only whitespace, the add action is ignored or shows a concise inline message
- The user can immediately retry without leaving the screen

## Validation Rules
- Task title must be trimmed and non-empty before adding
- No separate route or confirmation flow is required
- The app must submit on Enter and remain simple for mobile use

## Error Handling
- Empty input should not create a task
- A failed save should show a lightweight inline error and leave text available for correction
- The user can retry directly on the same screen

## Acceptance Criteria
- The add field sits at the top of the task list
- There is no separate `#/add` route
- Pressing Enter submits the task
- The task is added immediately to the list without leaving the page
- The input clears after a successful add
- The design remains usable and comfortable on mobile devices
- The interaction remains simple and low-friction

## Related Screens
- This add control is part of the main task list experience in Screen-001-Task-List
- No separate add screen is part of this design

## Accessibility
- Input and button must be keyboard accessible
- Touch targets should be large enough for mobile use
- The control should have a clear focus state and a semantic label
- Validation messages should be announced appropriately when shown