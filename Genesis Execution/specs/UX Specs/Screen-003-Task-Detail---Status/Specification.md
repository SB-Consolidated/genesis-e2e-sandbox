# Screen-003-Task-Detail --- Status — Specification

## Screen Overview
- Screen Name: Task Status (Inline)
- Purpose: This screen is intentionally minimal. The app does not use a separate detail route; instead, task status is either folded into the task list or kept as a tiny inline status panel attached to the row or list itself.
- User Goals:
  - Quickly see if a task is complete or open
  - Toggle a task's status from the same single-page workflow
  - Delete a task immediately with the row action
  - Keep the interface simple, low-friction, and mobile friendly
- Priority: Medium

## Navigation Flows
- Entry Points:
  - Users remain on the single task-list page and interact with the row or inline status area directly
  - No separate detail screen route is used
- Exit Paths:
  - The user stays in the main list view after toggling or deleting
- Deep Links:
  - None. This is intentionally not a separate route-based detail screen.

## UI Components and Layout
**Task Row Status:**
- Each task row can include a compact status indicator such as "Done" or a subtle completed styling
- Completed tasks are visually muted and placed at the bottom of the list

**Optional Inline Status Panel:**
- If a task status details panel is used, it appears inline within the current list view and not as a separate page
- The panel is minimal: task title, completion state, and a delete action
- No navigation to a distinct route is required

**Delete Action:**
- Inline delete icon on each task row
- Immediate deletion with no confirmation dialog

## Data Requirements
**Display Data:**
- Task title
- Completion state
- Ordering state: incomplete tasks first, completed tasks last

**Interaction Data:**
- A simple completion toggle from the list
- No separate task record view or deep-link requirement

## Interactions and State Changes
**Toggle Complete:**
- User checks or unchecks the task checkbox directly from the list
- Completed tasks move to the bottom of the list
- Reopening a task moves it back into the active list above completed items

**Delete Task:**
- User taps the delete icon on the row
- The task is removed instantly without any confirmation step

**Optional Inline Status:**
- If a minimal status panel is used, it updates immediately as the list state changes and does not require route navigation

## Validation Rules
- The app must remain single-page and simple
- Completed tasks must sink to the bottom of the list
- Delete actions must not require confirmation
- No separate detail screen or detail route is allowed in this design

## Error Handling
- If a status update fails, the UI should revert to the last valid state and show a brief inline message
- If deletion fails, the row remains and the user can try again without leaving the page

## Acceptance Criteria
- There is no separate detail screen or `#/task/...` route
- The task list remains the primary and only screen
- The delete action is an icon with no confirmation prompt
- Completed tasks appear below incomplete tasks
- The interface remains simple, quick, and mobile friendly
- If a minimal status affordance is used, it is inline and lightweight

## Related Screens
- Screen-001-Task-List is the main single-page experience
- This screen is folded into the list behavior rather than treated as a standalone page

## Accessibility
- Controls remain keyboard accessible and large enough for touch input
- Completed tasks remain readable with visible separation, not only color alone
- The list may present status cues inline without creating extra navigation burden