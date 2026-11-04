# Screen-001-Task-List — Specification

## Screen Overview
- Screen Name: Task List
- Purpose: This screen is the single-page home view for managing a simple list of tasks. It is optimized for quick entry, fast completion, and low-friction deletion on mobile and desktop screens.
- User Goals:
  - Add a task from the top of the page without leaving the screen
  - Review open work at a glance
  - Mark tasks complete or reopen them directly from the list
  - Delete tasks immediately with the smallest possible interaction
  - Keep completed items visually separated at the bottom of the list
- Priority: Critical

## Navigation Flows
- Entry Points:
  - App loads directly to the task list on the root page
  - No separate route exists for task creation or task detail
- Exit Paths:
  - Users remain on the same page for all task-related actions
  - No `#/add` route, no separate detail screen, and no task detail navigation
- Deep Links:
  - None. This is a single-page app and all functionality lives on one screen.

## UI Components and Layout
**Top Section (Header):**
- App title: "Tasks" or equivalent concise label
- Inline add field directly beneath the header
- Add field includes a text input and an Add action button

**Task List Area:**
- Single vertical list of task rows
- Each row contains: checkbox → task title → delete icon button
- Open tasks appear above completed tasks
- Completed tasks render with muted styling and are placed at the bottom of the list
- Mobile-first layout with touch-friendly controls and generous spacing

**Delete Icon:**
- A compact delete action appears on each row
- No confirmation dialog is shown
- The interaction should be immediate and lightweight, matching a quick task app

**Status/Feedback Area:**
- A small live region may announce successful actions or errors, but the UI remains intentionally simple

## Data Requirements
**Task Object:**
```json
{
  "id": "string",
  "title": "string",
  "completed": false,
  "createdAt": "ISO 8601 string",
  "updatedAt": "ISO 8601 string"
}
```

**Data Displayed:**
- Task title
- Completed state
- Ordered list with open tasks first and completed tasks at the bottom

**Data Collected:**
- New task text from the inline add field

**Data Sources:**
- Browser-local state or localStorage is acceptable for this simple single-page app
- No separate detail-screen state is required

## Interactions and State Changes
**Add Task:**
- User types into the top input and presses Add or Enter
- New task is added to the list immediately
- New tasks appear as active tasks unless marked complete

**Toggle Complete:**
- User checks or unchecks the task checkbox directly in the list
- Completing a task moves it beneath the active tasks
- Reopening a task returns it to the active group

**Delete Task:**
- User taps the delete icon on a row
- The task is removed immediately
- No confirmation modal or confirmation step is required

**Completed Tasks Ordering:**
- Tasks are sorted so all incomplete tasks appear first
- Completed tasks sink to the bottom of the list
- This ordering persists after changes such as completion toggles and new additions

## Validation Rules
- Task title must be non-empty after trimming whitespace
- Empty input should not create a task
- Completed state is stored as a boolean
- Delete actions do not require confirmation
- No route-based add or detail flows are allowed

## Error Handling
- If the form is submitted with an empty title, show inline validation or ignore the action
- If a task cannot be saved or deleted, show a lightweight error message in the UI
- Recover with another edit or retry without leaving the page

## Acceptance Criteria
- The app is a single page with no separate add route and no separate task detail screen
- There is a visible add field at the top of the screen
- Each task row includes a checkbox and a delete icon
- Deleting a task does not show any confirmation dialog
- Completed tasks are visually distinct and appear at the bottom of the list
- Mobile layout is comfortable at small widths and remains usable on larger screens
- Task actions are fast, obvious, and do not require navigation away from the main list

## Related Screens
- This screen contains all task management logic for the app
- There is no Screen-002-Add-Task route and no Screen-003-Task-Detail route in this design

## Accessibility
- Input, checkbox, and delete control must be keyboard accessible
- Touch targets should be large enough for mobile use
- Completed items must still be readable and distinguished visually without relying only on color
- The list should remain usable with clear focus states and semantic form labels