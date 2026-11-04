# Extension Machine Transfer Standard

**Version:** v0.9.9  
**Status:** Authoritative  
**Track:** A

## Canonical Path

- Windows working clone: `C:\Dev\Genesis-Extension`
- GitHub: `https://github.com/SB-Consolidated/Genesis-Extension.git`
- Do not use `C:\Dev\Genesis Extension`. That folder is a different repository.

## Leave Protocol

1. Commit or stash. Do not leave required work only in the working tree.
2. Push the active `ticket/TICKET-NNN-short-slug` branch, or merge to `main` if the ticket is complete.
3. Record branch name and HEAD SHA in the ticket or a one-line resume receipt.
4. Do not commit `.genesis`, `.env*`, `node_modules`, or `dist`.
5. Copy secrets only over a secure channel.

## Resume Protocol

1. Fetch.
2. Checkout the same ticket branch, or `main` if idle.
3. Run `npm install` then `npm run compile`.
4. Launch the Extension Development Host from this clone.
5. If `.genesis` is missing, start a fresh local session. Do not invent a second source of truth.

## Forbidden

- Using `backup/*` as a working trunk
- Path-specific restore docs that disagree with this file
- Treating compiled `dist` as the portable artifact between machines
