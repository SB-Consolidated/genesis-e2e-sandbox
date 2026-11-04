# Screen-001-Task-List — Questions

## Founder Decisions (Resolved)

1. **Single-page app**
   - Decision: The task app remains on one page only.
   - Outcome: No separate add route is used and no `#/add` flow is required.
   - This removes the need for a dedicated add screen and keeps the interface lightweight.

2. **Add field at the top**
   - Decision: The task input sits at the top of the list view as the primary creation control.
   - Outcome: Users add tasks inline without leaving the main screen.

3. **Delete action is an icon with no confirmation**
   - Decision: Each task row includes a delete icon and deletion is immediate.
   - Outcome: No confirmation modal or undo step is included.

4. **Completed tasks sink to the bottom**
   - Decision: Incomplete tasks remain above completed tasks.
   - Outcome: The list prioritizes active work while keeping finished items visible but secondary.

5. **No detail screen**
   - Decision: The app does not include a separate task detail view.
   - Outcome: Clicking into a task is not part of the design; task management happens directly from the list.

## Remaining Status
- No unresolved product questions remain for this screen.
- The founder’s feedback resolves the routing, add flow, delete behavior, and ordering decisions for the task list UX.
- The specification should be treated as the source of truth for implementation and review.